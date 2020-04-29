const gulp = require('gulp'),
	favicons = require('gulp-favicons'),
	nunjucks = require('gulp-nunjucks'),
	data = require('gulp-data'),
	htmlbeautify = require('gulp-html-beautify'),
	sass = require('gulp-sass'),
	browserSyncLib = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	cssnano = require('gulp-cssnano'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	path = require('path'),
	fontgen = require('gulp-fontgen');

const conf = {
	path: {
		src: path.resolve('./src'),
		build: path.resolve('./public'),
	},
	project: {
		name: 'IPBA',
		description: '',
	},
	js: [
		path.resolve('./src/js/main.js'),
	],
	assetsDirs: [
		'fonts',
		'i',
		'img',
		'vendor',
	],
};

function src(filepath) {
	return gulp.src(path.resolve(conf.path.src, filepath));
}

function dest(filepath) {
	return gulp.dest(path.resolve(conf.path.build, filepath));
}

function faviconPrepare(cb) {
	return src('favicon.png')
		.pipe(favicons({
			appName: conf.project.name,
			appShortName: conf.project.name,
			appDescription: conf.project.description,
			developerName: 'Zenetix Digital Production',
			developerURL: 'http://zenetix.com.ua/',
			path: '/favicon/',
			scope: '/',
			html: 'favicon.html',
			pipeHTML: true,
			replace: true,
			background: "#fff",
			theme_color: "#fff",
		}))
		.pipe(dest('favicon'))
}

function faviconMove(cb) {
	return gulp.src(path.resolve(conf.path.build, './favicon/favicon.html'))
		.pipe(gulp.dest(path.resolve(conf.path.src, './html'), { overwrite: true }));
}

function htmlPrepareProd() {
	return src('./*.html')
		.pipe(data(() => ({
			project: conf.project.name,
		})))
		.pipe(nunjucks.compile({}, {
			filters: {
				version: (v) => v + '_' + (new Date().getTime() / 1000) + '',
			}
		}))
		.pipe(htmlbeautify({
			indent_size: 2
		}))
		.pipe(dest('./'));
}

function htmlPrepareDev() {
	return src('./*.html')
		.pipe(data(() => ({
			project: conf.project.name,
		})))
		.pipe(nunjucks.compile({}, {
			filters: {
				version: (v) => v,
			}
		}))
		.pipe(dest('./'))
		.pipe(browserSyncLib.reload({ stream: true }));
}

function scssPrepareDev() {
	return src('scss/main.scss')
		.pipe(sass())
		.pipe(dest('css'))
		.pipe(browserSyncLib.reload({ stream: true }));
}

function scssPrepareProd() {
	return src('scss/main.scss')
		.pipe(sass())
		.pipe(autoprefixer(['last 4 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(cssnano())
		.pipe(dest('css'));
}

function jsPrepareDev() {
	return gulp.src(conf.js)
		.pipe(concat('main.js'))
		.pipe(dest('js'))
		.pipe(browserSyncLib.reload({ stream: true }))
}

function jsPrepareProd() {
	return gulp.src(conf.js)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(dest('js'));
}

function browserSync() {
	return browserSyncLib({
		server: {
			baseDir: path.resolve(conf.path.build)
		},
		notify: false
	});
}

const assetsTasks = conf.assetsDirs
	.map(dirname => {
		let out = {
			key: dirname,
			taskName: `assetsPrepare_${dirname}`,
		};
		out[out.taskName] = () => src(`./${dirname}/*`).pipe(dest(`./${dirname}`));
		return out;
	});

function watch() {
	assetsTasks.forEach(t => {
		gulp.watch(path.resolve(conf.path.src, `./${t.key}/*`), gulp.parallel(t[t.taskName]));
	});
	gulp.watch(path.resolve(conf.path.src, './**/*.scss'), gulp.parallel(scssPrepareDev));
	gulp.watch(path.resolve(conf.path.src, './**/*.html'), gulp.parallel(htmlPrepareDev));
	gulp.watch(path.resolve(conf.path.src, './**/*.js'), gulp.parallel(jsPrepareDev));
}

if (process.env.NODE_ENV === 'production') {
	exports.build = gulp.series(
		gulp.parallel(
			scssPrepareProd,
			jsPrepareProd,
			...assetsTasks.map(t => t[t.taskName]),
			gulp.series(
				faviconPrepare,
				faviconMove,
				htmlPrepareProd
			)
		)
	);
} else {
	exports.build = gulp.series(
		gulp.parallel(
			scssPrepareDev,
			htmlPrepareDev,
			jsPrepareDev,
			...assetsTasks.map(t => t[t.taskName]),
		),
		gulp.parallel(
			watch,
			browserSync
		)
	);
}

gulp.task('fontgen', function () {
	return gulp.src("./src/*.{ttf,otf}")
		.pipe(fontgen({
			dest: "./public/fonts"
		}));
});

gulp.task('default', ['fontgen']);
