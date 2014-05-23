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
    watch: {
      scripts: {
        files: [
          '.jshintrc',
          'Gruntfile.js',
          'source/**/*.js',
          'source/**/*.js.erb',
          '.jshint'
        ],
        tasks: ['jshint'],
        options: {
          interrupt: true,
        },
      },
    }
  });

  // For this to work, you need to have run `npm install grunt-simple-mocha`
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Add a default task. This is optional, of course :)
  grunt.registerTask('default', ['jshint', 'watch']);
};
