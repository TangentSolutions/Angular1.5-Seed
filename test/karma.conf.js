module.exports = function (config) {
    config.set({
        basePath: '../src',

        frameworks: [
            'jspm',
            'jasmine'
        ],

        preprocessors: {
            'modules/**/*.spec.js': ['babel'],
            'modules/**/!(*.spec).js': ['babel', 'coverage']
        },

        babelPreprocessor: {options: {stage: 1, sourceMap: 'inline'}},

        jspm: {
            config: 'config.js',
            loadFiles: ['index.js', 'modules/**/*.js'],
            serveFiles: ['modules/**/*.+(js|html|css)'],
            stripExtension: true
        },

        reporters: ['dots', 'coverage'],

        coverageReporter: {
            instrumenters: {isparta: require('isparta')},
            instrumenter: {'modules/**/*.js': 'isparta'},
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
