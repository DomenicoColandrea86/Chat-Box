
module.exports = function(grunt) {

    // always use strict mode
    'use strict';

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // compass and scss preprocessor for all the awesome mixins
        compass: {
            dev: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },

        // autoprefixer css postprocessor for healthy css
        autoprefixer: {
            dev: {
                files: {
                    'public/style/css/style.css': 'public/style/css/style.css'
                }
            }
        },


        // minify css after autoprefixer does its thing
        cssmin: {
            build: {
                files: {
                    'public/style/css/style.css': [ 'public/style/css/style.css' ]
                }
            }
        },

        // watch for changes and trigger compass, autoprefixer, jshint, uglify and livereload
        watch: {
            options: {
                livereload: true,
            },
            compass: {
                files: ['public/style/scss/**/*.{scss,sass}'],
                tasks: ['compass', 'autoprefixer', 'cssmin']
            },
            livereload: {
                files: ['public/index.html', 'public/views/*.html', 'public/img/**/*.{png,jpg,jpeg,gif,webp,svg}']
            }
        }

    });

    // default task "watch task"
    grunt.registerTask('default', ['watch']);

};
