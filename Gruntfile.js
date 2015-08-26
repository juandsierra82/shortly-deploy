module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      //your code here
      blah: {
        src: ['./public/client/*.js'],
        dest: './public/client/build/production.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec' //nyan, xunit, html-cov, dot, min, markdown
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      //your code here
      dist: {
        src: './public/client/build/production.js',
        dest: './public/client/build/production.min.js'
      }
    },

    jshint: {
      files: [
        // Add filespec list here
        'app/**/*.js', 'public/client/**/*.js', '*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      //your code here
        target: {
          files: [{
            expand: true,
            cwd: 'public/',
            src: ['style.css'],
            dest: 'public/client/build/',
            ext: '.min.css',
            extDot: 'first'
          }]
        }
    },



    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ],
        options: {
          spawn: false
        }
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin'],
        options: {
          spawn: false
        }
      },
      server: {
        //your code here
        files: [
        'public/**/*.js'
        ],
        task: ['jshint'],
        options: {
          spawn: false
        }
      }
    },

    shell: {
      prodServer: {
        command: 'git push heroku master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
    //your code here
  ]);

  grunt.registerTask('build', [
    //your code here
    'concat', 'uglify', 'jshint', 'cssmin'
  ]);

  //can be used to auto-deploy.
  grunt.registerTask('upload', function(n) {
    //Grunt options are ways to customize tasks.  Research ways to use them.
    if(grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
     'shell'
  ]);



};
