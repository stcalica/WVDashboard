######################################################################
# This is a log of my (Bradley Singer's) process to implement the tasks
# listed in grunt_tasks.txt using grunt.
######################################################################

#######
# Implementing 'npm install' and 'bower install':
#######

Turns out this is a common task and there is a full tutorial on it
on the npm website (https://www.npmjs.com/package/grunt-auto-install).

The tutorial requires downloading the a plugin called "grunt-auto-install"
using the command:

$ npm install grunt-auto-install --save-dev

This might mean that downloading the plugin has to be added to the docker
dependencies or whatever.

#######
# Implementing 'npm start':
#######