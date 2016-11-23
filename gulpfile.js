const
    gulp = require('gulp')
    , copy = require('gulp-copy')
    , rev = require('gulp-rev')
    , del = require('del')
    , inject = require('gulp-inject')
    , webpack = require('webpack')
    , shell = require('gulp-shell');

gulp.task('clean-static-content', () => {
    return del.sync([
        'public'
    ]);
});

gulp.task('copy-static-content', () => {
    return gulp.src([
        'node_modules/materialize-css/dist/css/materialize.min.css',
        'node_modules/materialize-css/dist/js/materialize.min.js'], {base : 'node_modules/materialize-css/dist/'})
        .pipe(rev())
        .pipe(gulp.dest('public'));
});

gulp.task('run-webpack', shell.task([
    'npm run build'
]));

gulp.task('html-static-inject', ['clean-static-content', 'copy-static-content', 'run-webpack'], () => {
    return gulp.src('front-end/index.html')
        .pipe(inject(gulp.src([
            'public/**/*'
        ], {read : false}), {
            addRootSlash : false,
            ignorePath : ['public']
        }))
        .pipe(gulp.dest('public'));
});

