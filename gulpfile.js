const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const imagemin = gulp("gulp-imagemin");
const cache = require("gulp-cache");
const minifycss = require("gulp-minify-css");
const sass = require("gulp-sass")(require("sass")); // Actualizado para usar la última versión de gulp-sass

gulp.task("images", function () {
  return gulp
    .src("img/**/*")
    .pipe(
      cache(
        imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
      )
    )
    .pipe(gulp.dest("img/"));
});

gulp.task("styles", function () {
  return gulp
    .src(["css/*.scss"])
    .pipe(
      plumber({
        errorHandler: function (error) {
          console.log(error.message);
          this.emit("end");
        },
      })
    )
    .pipe(sass())
    .pipe(autoprefixer({ overrideBrowserslist: "last 2 versions" })) // Actualizado para la nueva sintaxis
    .pipe(gulp.dest("css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(minifycss())
    .pipe(gulp.dest("css/"));
});

gulp.task("scripts", function () {
  return gulp
    .src("js/**/*.js")
    .pipe(
      plumber({
        errorHandler: function (error) {
          console.log(error.message);
          this.emit("end");
        },
      })
    )
    .pipe(concat("main.js"))
    .pipe(gulp.dest("js/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest("js/"));
});

gulp.task("dev", function () {
  gulp.watch("css/**/*.scss", gulp.series("styles")); // Actualizado para usar gulp.series
  //gulp.watch("js/**/*.js", gulp.series("scripts"));
});

gulp.task("build", gulp.series("styles", "images"), function () {}); // Actualizado para usar gulp.seriesgul
