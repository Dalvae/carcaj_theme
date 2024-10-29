const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const tar = require("tar");

const CONFIG = {
  backupDir: "./backup",
  tempDir: "./temp",
};

async function setup() {
  try {
    console.log("🚀 Iniciando setup del entorno de desarrollo...");

    // [Pasos 1-8 se mantienen igual...]
    if (fs.existsSync(CONFIG.tempDir)) {
      console.log("🧹 Limpiando directorio temporal anterior...");
      fs.rmSync(CONFIG.tempDir, { recursive: true, force: true });
    }
    fs.mkdirSync(CONFIG.tempDir);

    if (!fs.existsSync(CONFIG.backupDir)) {
      throw new Error(`No se encontró el directorio ${CONFIG.backupDir}`);
    }

    const backupFile = fs
      .readdirSync(CONFIG.backupDir)
      .find((file) => file.endsWith(".tar.gz"));

    if (!backupFile) {
      throw new Error(
        "No se encontró archivo de backup .tar.gz en la carpeta backup/"
      );
    }

    console.log("📦 Extrayendo backup...");
    await tar.x({
      file: path.join(CONFIG.backupDir, backupFile),
      cwd: CONFIG.tempDir,
    });

    const backupDir = path.join(
      CONFIG.tempDir,
      path.basename(backupFile, ".tar.gz")
    );
    console.log(`📂 Backup extraído en: ${backupDir}`);

    const requiredPaths = {
      mysql: path.join(backupDir, "mysql"),
      uploads: path.join(backupDir, "homedir/public_html/wp-content/uploads"),
      plugins: path.join(backupDir, "homedir/public_html/wp-content/plugins"),
    };

    const absolutePaths = {};
    for (const [key, relativePath] of Object.entries(requiredPaths)) {
      absolutePaths[key] = path.resolve(process.cwd(), relativePath);
      if (!fs.existsSync(absolutePaths[key])) {
        throw new Error(
          `No se encontró el directorio ${key} en el backup: ${absolutePaths[key]}`
        );
      }
    }

    const sqlFile = fs
      .readdirSync(absolutePaths.mysql)
      .find((file) => file.endsWith(".sql"));

    if (!sqlFile) {
      throw new Error("No se encontró archivo SQL en el backup");
    }
    console.log(`💾 Encontrado archivo SQL: ${sqlFile}`);

    console.log("📝 Actualizando configuración de wp-env...");
    const wpEnvConfig = JSON.parse(fs.readFileSync(".wp-env.json", "utf8"));

    // Actualizar configuración para usar el prefijo de tabla correcto
    wpEnvConfig.config = {
      ...wpEnvConfig.config,
      table_prefix: "wpyl_", // Añadir el prefijo correcto
    };

    wpEnvConfig.mappings = {
      ...wpEnvConfig.mappings,
      "wp-content/uploads": absolutePaths.uploads,
      "wp-content/plugins": absolutePaths.plugins,
      temp: path.resolve(process.cwd(), CONFIG.tempDir),
    };

    fs.writeFileSync(".wp-env.json", JSON.stringify(wpEnvConfig, null, 2));
    console.log("✨ Configuración guardada en .wp-env.json");

    try {
      console.log("🛑 Deteniendo instancia anterior de wp-env...");
      execSync("wp-env stop", { stdio: "inherit" });
    } catch (error) {
      console.log("No había instancia previa corriendo.");
    }

    console.log("🌍 Iniciando WordPress...");
    execSync("wp-env start", { stdio: "inherit" });

    console.log("⏳ Esperando a que MySQL esté disponible...");
    await new Promise((resolve) => setTimeout(resolve, 10000));

    console.log("💾 Importando base de datos...");
    try {
      // Resetear la base de datos con el prefijo correcto
      execSync("wp-env run cli -- wp db reset --yes", { stdio: "inherit" });

      // Importar el backup
      const dbCommand = `wp-env run cli -- wp db import /var/www/html/temp/${path.basename(
        backupDir
      )}/mysql/${sqlFile}`;
      console.log(`Ejecutando: ${dbCommand}`);
      execSync(dbCommand, { stdio: "inherit" });

      // Verificar el prefijo de tabla actual
      console.log("🔍 Verificando prefijo de tabla...");
      execSync("wp-env run cli -- wp db prefix", { stdio: "inherit" });

      // Actualizar URLs usando el prefijo correcto
      console.log("🔄 Actualizando URLs en la base de datos...");
      execSync(
        'wp-env run cli -- wp search-replace "http://carcaj.cl" "http://localhost:8888" --all-tables --precise',
        { stdio: "inherit" }
      );
    } catch (error) {
      console.error(
        "Error durante la importación de la base de datos:",
        error.message
      );
      throw error;
    }

    console.log("🔄 Actualizando configuración del tema...");
    const wpCommands = [
      ["wp-env", "run", "cli", "--", "wp", "theme", "activate", "carcaj"],
      [
        "wp-env",
        "run",
        "cli",
        "--",
        "wp",
        "option",
        "update",
        "home",
        "http://localhost:8888",
      ],
      [
        "wp-env",
        "run",
        "cli",
        "--",
        "wp",
        "option",
        "update",
        "siteurl",
        "http://localhost:8888",
      ],
      ["wp-env", "run", "cli", "--", "wp", "cache", "flush"],
    ];

    for (const cmd of wpCommands) {
      execSync(cmd.join(" "), { stdio: "inherit" });
    }

    console.log("🔍 Verificando configuración final...");
    const verifyCommands = [
      ["wp-env", "run", "cli", "--", "wp", "db", "prefix"],
      ["wp-env", "run", "cli", "--", "wp", "theme", "status", "carcaj"],
      ["wp-env", "run", "cli", "--", "wp", "option", "get", "home"],
      ["wp-env", "run", "cli", "--", "wp", "option", "get", "siteurl"],
    ];

    for (const cmd of verifyCommands) {
      execSync(cmd.join(" "), { stdio: "inherit" });
    }

    console.log("\n✅ Setup completado!");
    console.log("📱 Sitio disponible en: http://localhost:8888");
    console.log("👤 Usuario: admin");
    console.log("🔑 Contraseña: password");
  } catch (error) {
    console.error("❌ Error durante el setup:", error.message);
    if (error.stdout) console.error(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
    process.exit(1);
  }
}

setup();
