var join = require('path').join;
var util = require('gulp-util');

module.exports = {
    autoprefixer: {
        browsers: [
            'last 2 versions',
            'Android 4',
            'IE 9',
            'iOS >= 7'
        ]
    },
    browserify: {
        entry: 'app.js'
    },
    browserSync: {
        server: {
            baseDir: './',
            proxy: 'frondforever.dev'
        }
    },
    production: !!util.env.production,
    sass: {
        errLogToConsole: true
    },
    scripts: {
        dist: join('dist', 'scripts'),
        src: join('src', 'scripts')
    },
    styles: {
        dist: join('dist', 'styles'),
        src: join('src', 'styles')
    }
};
