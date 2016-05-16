\connect feed;
/*

	Input after being processed from HOBOLogger
	The data in these tables are aggregates of the loggers
	There may be multiple loggers in the building which are processed and used together
	to form a single column

*/
CREATE TABLE log(
	address char(10),
	logged timestamp,
	kitchen int,
	plugload int,
	lights int,
	solar int,
	ev int,
	hvac int,
	instahot int
);

CREATE TABLE daily(
	address char(10),
	day timestamp;
	kitchen int,
	plugload int,
	lights int,
	solar int,
	ev int,
	hvac int,
	instahot int
);


CREATE TABLE monthly(
	address char(10),
  month timestamp,
	kitchen int,
	plugload int,
	lights int,
	solar int,
	ev int,
	hvac int,
	instahot int

);
