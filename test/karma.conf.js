// Karma configuration
// Generated on Thu Aug 18 2016 22:12:59 GMT+0200 (SAST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../src',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jspm',
      'jasmine'
    ],

        files: [
          '../node_modules/babel-core/browser-polyfill.js'
        ],

        preprocessors: {
          'modules/**/!(*.spec).js': ['babel', 'coverage']
        },

        babelPreprocessor: { options: { stage: 0, sourceMap: 'inline' } },

        jspm: {
          config: 'config.js',
          loadFiles: ['index.js', 'modules/**/*.js'],
          serveFiles: ['modules/**/*.+(js|html|css)'],
          stripExtension: true
        },

        proxies: {
          '/modules/': '/base/modules/',
          '/jspm_packages/': '/base/jspm_packages/'
        },

        reporters: ['dots', 'coverage'],

        coverageReporter: {
          instrumenters: { isparta : require('isparta') },
          instrumenter: { 'modules/**/*.js': 'isparta' },
          dir: '../coverage/',
          reporters: [
            {type: 'html'},
            {type: 'json'},
            {type: 'lcov'},
             {type: 'text-summary'}
          ]
        },

        browsers: ['PhantomJS'],
        singleRun : false,
        browserNoActivityTimeout: 75000
  })
}
