const gulp = require("gulp");
const ts = require("gulp-typescript");
const nodemon = require("gulp-nodemon");
const clean = require("gulp-clean");
const fs = require("fs");
//clean js
gulp.task("clean", () => {
  return gulp.src("./lib", { allowEmpty: true }).pipe(clean());
});
//transpile ts
gulp.task("transpile", () => {
  return gulp
    .src("./src/**/*.ts")
    .pipe(
      ts({
        lib: ["es5", "es6", "DOM"],
        target: "es5",
        module: "commonjs",
        moduleResolution: "node",
        emitDecoratorMetadata: true,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        experimentalDecorators: true,
        sourceMap: true,
        noImplicitAny: true,
        strict: true,
        outDir: "./lib",
        strictPropertyInitialization: false,
        downlevelIteration: true,
      })
    )
    .pipe(gulp.dest("lib"));
});
// create empty folders
gulp.task("folders", () => {
  return gulp
    .src("*.*", { read: false })
    .pipe(gulp.dest("lib/ftp"))
    .pipe(gulp.dest("lib/csv"));
  // .pipe(gulp.dest('lib/anotherNewFolder'))
});
//start
gulp.task("start", () => {
  nodemon({
    script: "./lib/index.js",
    ext: "ts",
    tasks: ["transpile"],
  });
});
// default
gulp.task("default", gulp.series("clean", "transpile", "folders", "start"));
