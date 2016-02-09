#!/bin/py
import os, sys 
import requests
import csv
"""
Benchmarking for the HOBOlink REST API 

""" 
#header in csv is seperated by a row of hyphens, so need to find row of hyphens and split it up
req = requests.get("http://webservice.hobolink.com/rest/public/devices/10459715/data_files/latest/txt") 
csv = req.content.split("----")
print(csv) 
#for line in req.content:
#	print(line) 
#in_txt = csv.reader(req.content)

#curl http://webservice.hobolink.com/public/devices/10459715/data_files/latest/txt > API.csv 
