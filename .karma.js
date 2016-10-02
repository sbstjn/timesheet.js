module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [
      "PhantomJS"
    ],
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
        'coverage'
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
