'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    var exec = require('child_process').exec;
    var cb = this.async();
    exec('npm install', {cwd: '.'}, function(err, stdout, stderr) {
      console.log(stdout);
      cb();
    });
  });
};
