'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
<<<<<<< HEAD
    env: {
	dev: {
		NODE_ENV: 'development'		
	     }
	, prod:
		{	 

		NODE_ENV: 'production'

		}
	},
     
  });

//create dev task
  grunt.registerTask('default', ['install']) 
  grunt.registerTask('install', 'install the backend and frontend dependencies', function() {
=======

    // auto_install: {
    //   local: {},
      // subdir: {
      //   options: {
      //     cwd: 'subdir',
      //     stdout: true,
      //     stderr: true,
      //     failOnError: true,
      //     npm: '--production'
      //   }
      // }
    // }

    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // }
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  // Handles 'npm install' and 'bower install' **** DOESN'T WORK ****
  // grunt.loadNpmTasks('grunt-auto-install');

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);

  // Test task
  // grunt.registerTask('default', function() {
  //   grunt.log.write('Logging some stuff...').ok();
  // });

  // Does 'npm install' (which does bower install)
  grunt.registerTask('default', 'install the backend and frontend dependencies', function() {
>>>>>>> a4ed6ddb0ff7206893ff284fc17118a6150f7098
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('npm install', {cwd: '.'}, function(err, stdout, stderr) {
      console.log(stdout);
      cb();
    });
  });
<<<<<<< HEAD
=======

  grunt.registerTask('start', 'install the backend and frontend dependencies', function() {
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('npm start', {cwd: '.'}, function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      // console.log(err);
      cb();
    });
  });
>>>>>>> a4ed6ddb0ff7206893ff284fc17118a6150f7098
};
