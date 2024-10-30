const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const cached = require("gulp-cached");
const cleanCSS = require("gulp-clean-css");
const sass = require("gulp-dart-sass");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const postcss = require("gulp-postcss");
const postcssPresetEnv = require("postcss-preset-env");
const babel = require("gulp-babel");
const debug = require("gulp-debug");
const purgecss = require("gulp-purgecss");

// Configuración de rutas
const paths = {
  scripts: {
    // Archivos fuente (los que queremos observar)
    src: [
      "js/**/*.js",
      "!js/lib/**",
      "!js/main.js",
      "!js/main.min.js",
      "!js/**/*.min.js",
      "!js/**/*.map",
    ],
    dest: "js",
    // Archivos a ignorar
    ignore: ["js/main.js", "js/main.min.js", "js/**/*.min.js", "js/**/*.map"],
    dest: "js",
  },
  styles: {
    src: ["css/**/*.scss"],
    ignore: ["css/**/*.min.css", "css/**/*.map"],
    dest: "css",
  },
};

// Manejo de errores
const errorHandler = (title) => ({
  errorHandler: notify.onError({
    title: title || "Error de Compilación",
    message: "<%= error.message %>",
    sound: false,
  }),
});

// Tarea de scripts
const scripts = () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(plumber(errorHandler("Error de JavaScript")))
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                browsers: ["last 2 versions", "ie >= 11"],
              },
              modules: false,
            },
          ],
        ],
      })
    )
    .pipe(concat("main.js"))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rename({ suffix: ".min" }))
    .pipe(
      terser({
        compress: {
          drop_console: process.env.NODE_ENV === "production",
          drop_debugger: true,
        },
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream({ match: "**/*.js" }));
};

// Tarea de estilos
const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(plumber(errorHandler("Error de SCSS")))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" })) // Solo usa gulp-dart-sass directamente
    .pipe(postcss([postcssPresetEnv()]))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cleanCSS({ compatibility: "ie11" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream({ match: "**/*.css" }));
};

// Tarea de limpieza de caché
const clear = (done) => {
  cached.caches = {};
  done();
};

// Tarea del servidor de desarrollo
const serve = (done) => {
  browserSync.init({
    proxy: "localhost:8888",
    open: true, // Cambia a true para ver si abre el navegador
    notify: true, // Cambia a true para ver las notificaciones
    files: [
      // Especifica explícitamente los archivos a observar
      "css/**/*.css",
      "js/**/*.js",
      "**/*.php",
    ],
    logLevel: "debug",
    reloadDelay: 0,
    reloadDebounce: 0,
    injectChanges: true,
  });

  // Watchers mejorados que ignoran archivos generados
  gulp.watch(paths.styles.src, styles);

  gulp.watch(paths.scripts.src, scripts);

  gulp.watch("**/*.php").on("change", browserSync.reload);

  done();
};

// Exportar tareas
exports.scripts = scripts;
exports.styles = styles;
exports.clear = clear;
exports.serve = serve;

// Tarea de desarrollo
exports.dev = gulp.series(clear, gulp.parallel(styles, scripts), serve);

// Tarea de construcción
exports.build = gulp.series(clear, gulp.parallel(styles, scripts));

// Tarea por defecto
exports.default = exports.dev;
