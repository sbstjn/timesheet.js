browsers = [
  //"Chrome",
  "PhantomJS"
];

module.exports = function(config) {
  config.set({
    singleRun: false,
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
      ]
    },
    browserify: {
      debug: false,
      transform: [
        'babelify'
      ]
    },
    reporters: [
      'progress'
    ]
  });
};
