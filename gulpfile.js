var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

gulp.task('clean', function() {
  return gulp.src(['dist/*'], {read:false})
    .pipe(plugins.clean());
});

gulp.task('buildJS', function(){
	gulp.src(['src/**/*.js'])
		.pipe(plugins.uglify())
		.pipe(plugins.rename({extname: '.min.js'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('buildCSS', function(){
	gulp.src(['src/**/*.css'])
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename({extname: '.min.css'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('buildHTML', function(){
	gulp.src(['src/**/*.html'])
		.pipe(plugins.minifyHtml({empty: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('serve', ['buildJS', 'buildCSS', 'buildHTML'], function() {
  browserSync.init({
    server: {
      baseDir: './dist',
      routes: {
        "/node_modules": "node_modules",
        "/img": "img"
      }
    }
  });
  gulp.watch('src/**/*.js', ['buildJS']);
  gulp.watch('src/**/*.css', ['buildCSS']);
  gulp.watch('src/**/*.html', ['buildHTML']);
  gulp.watch(['**/*.html', '**/*.css', '**/*.js'], {cwd: './dist'}, browserSync.reload);
});

gulp.task('default', ['clean', 'serve'], function(){
});

gulp.task('zip', function(){
  return gulp.src(['src/*', 'img/*', 'gulpfile.js', 'package.json'], {base: '.'})
    .pipe(plugins.zip('archive.zip'))
    .pipe(gulp.dest('dist'));
});
