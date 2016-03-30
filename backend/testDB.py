import csv, time 
import requests, psycopg2
import os
		


try:

	conn = psycopg2.connect("dbname='postgres' user='postgres' host='postgres'")
	cur = conn.cursor() 
	query = "INSERT INTO BUILDINGS(0"+ ", "+str(ndata[0])+", "+date_format+", "+time_format+", "+str(ndata[2])+" , "+str(ndata[3])+", "+str(ndata[4])+", "+str(ndata[5])+" , "+str(ndata[6])+" , "+str(ndata[7])+")"
	cur.execute(query) #queries go in here

except:
	print("Could not conect") 	
