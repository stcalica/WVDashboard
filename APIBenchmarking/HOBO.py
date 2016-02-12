#!/bin/py
import os, sys 
import requests
import csv
"""
Benchmarking for the HOBOlink REST API 

""" 
#header in csv is seperated by a row of hyphens, so need to find row of hyphens and split it up
req = requests.get("http://webservice.hobolink.com/rest/public/devices/10459715/data_files/latest/txt") 
data = req.content.split("------------")

print(data[1])

#sensor_data = csv.reader(data[1])
#create csv file with date as title
#open the file then write out to it 


#print sensor_data.list_dialects()

#for row in sensor_data: 
#	print row 

#curl http://webservice.hobolink.com/public/devices/10459715/data_files/latest/txt > API.csv 
