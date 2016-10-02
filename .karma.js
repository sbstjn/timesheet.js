module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [
      "Chrome"
    ],
    frameworks: [
      'browserify',
      'jasmine'
    ],
    files: [
      'src/**/*.js',
      'test/**/*.js'
    ],
    exclude: [

    ],
    preprocessors: {
      'src/**/*.js': [
        'browserify'
      ],
      'test/**/*.js': [
        'browserify'
      ]
    },
    browserify: {
      debug: false,
      transform: [
        'babelify'
      ]
    }
  });
};
