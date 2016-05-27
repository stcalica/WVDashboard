\connect feed;
/*

	Input after being processed from HOBOLogger
	The data in these tables are aggregates of the loggers
	There may be multiple loggers in the building which are processed and used together
	to form a single column

*/

CREATE TABLE log(
	id int,
	address char(10),
	logged timestamp,
	kitchen real,
	plugload real,
	lights real,
	solar real,
	ev real,
	hvac real,
	instahot real
);


CREATE TABLE hourly_goal(
	weekof timestamp,
	goal real
);


CREATE TABLE daily_goal(
	weekof timestamp,
	goal real
);
