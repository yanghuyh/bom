var gulp = require('gulp');
var load = require('gulp-load-plugins')();
var browser = require('browser-sync').create()

gulp.task('js',function(done){
	gulp.src('./src/js/*.js')
	.pipe(load.babel({
		'presets':['@babel/env']
	}))
	.pipe(load.uglify())
	.pipe(gulp.dest('./dist/js/'))
	done()
})
gulp.task('sass',function(done){
	gulp.src('./src/css/index.scss')
	.pipe(load.sass())
	.pipe(load.rename('index.css'))
	.pipe(gulp.dest('./dist/css/'))
	done()
})

gulp.task('css',function(done){
	gulp.src('./src/css/*.css')
	.pipe(load.minifyCss())
	.pipe(gulp.dest('./dist/css/'))
	done()
})
gulp.task('das',function(done){
	gulp.src('./src/css/iconfont.css')
	.pipe(load.minifyCss())
	.pipe(load.rename('iconfont.css'))
	.pipe(gulp.dest('./dist/css/'))
	done()
})
gulp.task('html',function(done){
	gulp.src('./src/*.html')
	.pipe(load.minifyHtml())	
	.pipe(gulp.dest('./dist/'))
	done()
})

gulp.task('image',function(done){
	gulp.src('./src/img/**')
	.pipe(gulp.dest('./dist/img/'))
	done()
})

gulp.task('server',gulp.series(gulp.parallel('html','sass','image','js','css','das'),function(done){

	browser.init({
		server:'./dist/',
		port:80
	})

	gulp.watch('./src/',gulp.series(gulp.parallel('html','sass','image','js','css','das'),function(done){
		browser.reload()
		done()
	}))
	
	done()
}))