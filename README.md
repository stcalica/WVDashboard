# WVDashboard
Senior Design Project Energy Feedback for West Village in Davis, CA


Don't forget to use the virtualenv to handle dependencies! 

	source ./env/bin/activate

and

	deactivate 

when finished!

Installing requirements:


	pip install -r requirements.txt 
  	--dont use sudo in this case! Or it will install to your computer's native enviroment and not the virtual one!




Runnning: 

	cd dashboard/
	python runserver.py

Currently there is no database, but that will be added soon!

Dockerized: 

Docker uses internal DNS to set host names of links in docker-compose.yml 

just use postgres to connect. Tuts coming soon! 
