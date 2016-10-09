browsers = [
  //"Chrome",
  "PhantomJS"
];

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: browsers,
    frameworks: [
      'browserify',
      'jasmine'
    ],
    files: [
      'src/**/*.js'
    ],
    exclude: [

    ],
    preprocessors: {
      'src/**/*.js': [
        'browserify',
        'sourcemap',
        'coverage'
      ]
    },
    browserify: {
      debug: false,
      transform: [
        'babelify'
      ]
    },
    reporters: [
      'progress',
      'coverage',
      // 'coveralls'
    ],
    coverageReporter: {
      instrumenters: { isparta : require('isparta') },
      instrumenter: {
        '**/*.js': 'isparta'
      },

      reporters: [
        {
          type: 'text',
          dir: '.cover',
          subdir: normalizationBrowserName
        },
        {
          type: 'html',
          dir: '.cover',
          subdir: normalizationBrowserName
        }
      ]
    }

  });
};

function normalizationBrowserName(browser) {
  return browser.toLowerCase().split(/[ /-]/)[0];
}
