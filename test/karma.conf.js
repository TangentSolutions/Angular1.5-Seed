module.exports = function (config) {
    config.set({
        basePath: '../src',

        frameworks: [
            'jspm',
            'jasmine'
        ],

        preprocessors: {
            '!(*jspm_packages)/**/*.spec.js': ['babel'],
            '!(*jspm_packages)/**/!(*.spec).js': ['babel', 'coverage']
        },

        babelPreprocessor: {options: {stage: 1, sourceMap: 'inline'}},

        jspm: {
            config: 'config.js',
            loadFiles: ['index.js', 'core/**/*.spec.js', '!(*jspm_packages)/**/*.js'],
            serveFiles: ['!(*jspm_packages)/**/*.+(js|html|css)'],
            stripExtension: true
        },

        reporters: ['dots', 'coverage'],

        coverageReporter: {
            instrumenters: {isparta: require('isparta')},
            instrumenter: {'!(*jspm_packages)/**/*.js': 'isparta'},
            dir: '../test/coverage/',
            reporters: [
                {type: 'html'},
                {type: 'json'},
                {type: 'lcov'},
                {type: 'text-summary'}
            ]
        },

        browsers: ['PhantomJS'],
        singleRun: true,
        browserNoActivityTimeout: 75000
    })
}
