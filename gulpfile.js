var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');

gulp.task('default', () => {
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT:8000
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', () => {
		console.log('\x1b[33m%s\x1b[0m ', '\n+++Restarting+++\n');
	})

});

gulp.task('test', function() {
	gulp.src('tests/*.js', {read: false})
			.pipe(gulpMocha({reporter: 'nyan'}))
});
