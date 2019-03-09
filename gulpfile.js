var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync");
var notify = require("gulp-notify");

gulp.task('default', ['sass', 'browser-sync', 'watch', 'reload']);

//sassを監視して変換処理させるやーつ
gulp.task('watch', () => {
    gulp.watch(['./sass/**'], () => {
        gulp.start(['sass']);
    });
});


//ブラウザ表示
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: "./" //サーバーになるルートディレクトリ
        }
    });
    //ファイルの監視
    //ファイルが変わったらリロード
    gulp.watch("./js/**/*.js",  ['reload']);
    gulp.watch("./html/**/*.html",      ['reload']);
});

//sassをcssに変換
gulp.task("sass", () => {
    gulp.src("./sass/**/*scss")
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream())
});

//ブラウザリロード処理
gulp.task('reload', () => {
    browserSync.reload();
});