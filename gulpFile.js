
const gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps');

const path = {
  publicDir: './client/assets',
};

gulp.task('sass', () => {
  gulp.src(`${path.publicDir}/css/style.scss`)
    .pipe(sass())
    .pipe(gulp.dest('build/css/'));
});

gulp.task('js', () => {
  gulp.src(`${path.publicDir}/js/**.js`)
    .pipe(gulp.dest('build/js/'));
});

gulp.task('roboto', () => {
  gulp.src(`${path.publicDir}/fonts/roboto/**`)
    .pipe(gulp.dest('build/fonts/roboto/'));
});

gulp.task('fonts', () => {
  gulp.src(`${path.publicDir}/fonts/*.*`)
    .pipe(gulp.dest('build/fonts/'));
});

gulp.task('uploads', () => {
  gulp.src(`${path.publicDir}/uploads/**`)
    .pipe(gulp.dest('build/uploads'));
});

gulp.task('favicon', () => {
  gulp.src(`${path.publicDir}/*.ico`)
    .pipe(gulp.dest('build/'));
});

gulp.task('manifest', () => {
  gulp.src(`${path.publicDir}/manifest.json`)
    .pipe(gulp.dest('build/'));
});

gulp.task('css', () => gulp.src(`${path.publicDir}/css/*.css`)
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: [
      `${path.publicDir}/scss/**`,
      `${path.publicDir}/less/**`
    ]
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('build/css')));

gulp.task('default', ['uploads', 'favicon', 'manifest']);

