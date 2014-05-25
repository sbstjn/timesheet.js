module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      all: {
        src: [
          'source/javascripts/*.js',
          'source/javascripts/**/*.js.erb'
        ],
        options: {
          jshintrc: '.jshintrc'
        }
      }
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        grep: '',
        ui: 'tdd',
        reporter: 'spec'
      },
      all: { src: ['test/**/*.js'] }
    },
    watch: {
      scripts: {
        files: [
          '.jshintrc',
          'Gruntfile.js',
          'source/**/*.js',
          'source/**/*.js.erb',
          '.jshint'
        ],
        tasks: ['simplemocha', 'jshint'],
        options: {
          interrupt: true,
        },
      },
    }
  });

  // For this to work, you need to have run `npm install grunt-simple-mocha`
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Add a default task. This is optional, of course :)
  grunt.registerTask('default', ['simplemocha', 'jshint', 'watch']);
};
