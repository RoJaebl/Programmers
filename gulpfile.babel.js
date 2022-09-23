import { deleteAsync } from "del";
import gulp from "gulp";
import webServer from "gulp-webserver";
import gulpBro from "gulp-bro";
import gulpUglify from "gulp-uglify";
import jsMin from "uglifyify"; // gulp-uglify를 사용한다면 사용안해도 된다.
import babelify from "babelify";

// routes
const routes = {
  del: "build",
  server: "build",
  html: {
    watch: "src/**/*.html",
    src: "src/index.html",
    dest: "build",
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/index.js",
    dest: "build/js",
  },
};

// task
const watch = () => {
  gulp.watch(routes.js.watch, js);
  gulp.watch(routes.html.watch, html);
};

const clear = () => deleteAsync([routes.del]);

const server = () =>
  gulp.src(routes.server).pipe(webServer({ livereload: true, open: true }));

const html = () => gulp.src(routes.html.src).pipe(gulp.dest(routes.html.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      // transform에서 bebal compiler를 주어 vanilla JS로 변환 후 gulp-bro로 Common JS으로 변환하여 모든 브라우저가 인식하는 코드로 변환된다.
      gulpBro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          // ["uglifyify", {global:true}] // gulp-uglify를 사용안한다면 추가한다.
        ],
      })
    )
    // js파일 크기를 줄이기위한 변환 함수이다.
    .pipe(gulpUglify())
    .pipe(gulp.dest(routes.js.dest));

// series
const prepare = gulp.series([clear]);
const assets = gulp.series([html, js]);
const postDev = gulp.series([server, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, postDev]);
