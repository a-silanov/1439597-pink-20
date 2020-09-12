const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webpic = require("gulp-webp");
const renameitem = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const del = require("del");
const htmlmin = require('gulp-htmlmin');


// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

const webp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webpic({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.styles = styles;
exports.images = images;
exports.webp = webp;

const copy = () => {
  return gulp.src ([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
};

exports.copy=copy

// Sprite

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(renameitem("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

const clean = () => {
  return del("build");
};

exports.clean = clean;


// Server

const server = () => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html")).on("change", sync.reload);
}

exports.server = server;

//Html

const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"));
}

exports.html = html



// Watcher
//
//const watcher = () => {
//  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
//  gulp.watch("source/*.html").on("change", sync.reload);
//}

// exports.watcher = watcher;

exports.default = gulp.series(
  styles, server
);

const build = gulp.series(clean, copy, styles, html, images, webp, sprite);

exports.build = build

const start = gulp.series(build,server);

exports.start = start
