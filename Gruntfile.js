module.exports = function(grunt) {
	'use strict';

	var fs = require('fs');

	grunt.initConfig({
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'dist/timesheet.min.js': ['source/javascripts/timesheet.js']
				}
			}
		},
		sass: {
			gh: {
				options: {
					style: 'compressed'
				},
				files: {
					'gh-pages/styles/style.css': 'source/stylesheets/style.sass'
				}
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'dist/timesheet.min.css': 'source/stylesheets/timesheet.sass',
					'dist/timesheet-white.min.css': 'source/stylesheets/timesheet-white.sass'
				}
			}
		},
		jshint: {
			all: {
				src: [
					'source/javascripts/*.js'
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
		express: {
			options: {
				port: 8080
			},
			dev: {
				options: {
					script: __dirname + '/serve.js'
				}
			}
		},
		watch: {
			scripts: {
				files: 'source/javascripts/*.js',
				tasks: ['simplemocha', 'jshint', 'uglify'],
				options: {
					interrupt: true,
				}
			},
			styles: {
				files: 'source/stylesheets/*.sass',
				tasks: ['sass'],
				options: {
					interrupt: true,
				}
			}
		},
		haml: {
			gh: {
				files: {
					'gh-pages/index.html': 'source/index.haml'
				},
				options: {
					context: {
						code: fs.readFileSync(__dirname + '/source/snippets/example-date.js')
					}
				}
			}
		},
		copy: {
			gh: {
				files: [
					{expand: false, src: __dirname + '/source/javascripts/lib.js', 				 dest: __dirname + '/gh-pages/script/lib.js'},
					{expand: false, src: __dirname + '/source/javascripts/main.js',				dest: __dirname + '/gh-pages/script/main.js'},
					{expand: false, src: __dirname + '/dist/timesheet.min.js',			      dest: __dirname + '/gh-pages/script/timesheet.min.js'},
					{expand: false, src: __dirname + '/dist/timesheet.min.css', 					 dest: __dirname + '/gh-pages/styles/timesheet.css'},
					{expand: false, src: __dirname + '/dist/timesheet-white.min.css',			dest: __dirname + '/gh-pages/styles/timesheet-white.css'},
					{expand: false, src: __dirname + '/dist/timesheet.min.css.map', 			 dest: __dirname + '/gh-pages/styles/timesheet.css.map'},
					{expand: false, src: __dirname + '/dist/timesheet-white.min.css.map',	dest: __dirname + '/gh-pages/styles/timesheet-white.css.map'}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.loadNpmTasks('grunt-express-server');

	grunt.loadNpmTasks('grunt-haml');

	// Default task
	grunt.registerTask('default', 	['build']);
	grunt.registerTask('build', 		['simplemocha', 'jshint', 'uglify', 'sass']);
	grunt.registerTask('server', 		['express:dev', 'watch' ])
	grunt.registerTask('gh', 				['build', 'haml:gh', 'sass:gh', 'copy:gh']);

};
