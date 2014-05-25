module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'dist/timesheet.js': ['source/javascripts/timesheet.bubble.js', 'source/javascripts/timesheet.js']
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'dist/timesheet.css': 'source/stylesheets/timesheet.css.sass'
        }
      }
    },
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
          'test/*.js',
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

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task
  grunt.registerTask('default', ['simplemocha', 'jshint']);

  // Build task
  grunt.registerTask('build', ['uglify', 'sass']);
};
