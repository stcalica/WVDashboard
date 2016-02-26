from dashboard import app
from flask import render_template
from flask import request
import requests

@app.route('/')
def index():
	#req = requests.request() 	
	#curl http://webservice.hobolink.com/public/devices/10459715/data_files/latest/txt > API.csv 
	#can make dict of values and just return as a var in render_templates, lik good 'ol django
	return render_template('index.html')


####################
#  Rest API Code 
###################


#fetch by a date params: building
def fetch_by_date():
return 

#fetch by channel, params: watts, channel number
def fetch_by_channel():
return 


#fetches by building params: fetch by channel 
def fetch_by_building(): 
return
