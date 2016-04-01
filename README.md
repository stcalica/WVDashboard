# WVDashboard
Senior Design Project Energy Feedback for West Village in Davis, CA
--UPDATED MARCH 31st -- 


Using Docker means to test something we can do it if it is local. But to run docker and have these moving components means to change the names to the containersspecified in the Dockerfile 


--UPDATED MARCH 21st--

We made this project way more exciting!

First make sure you have the Docker Engine installed and that the Dockerfile and docker-compose.yml 
is in the root directory of the project. 

Now just do 
	
	docker-compose up 

and the docker images will be built and the containers will be strung together. 

Visit your localhost and check that the website is running, 
also make sure the rabbitmq server and postgresql server is running using 
	
	docker-compose up

and check to see that the status is up. 

Now the volumes are attached to the containers, which means that any changes to the files will create
changes to the docker container running.  


Dockerized: 

Docker uses internal DNS to set host names of links in docker-compose.yml 

just use postgres to connect. Tuts coming soon! 
