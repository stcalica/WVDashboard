from celery import Celery


app = Celery('tasks', broker='')
serials = [] #hobologgers serial numbers 

@app.task
def HOBOgrab():
	#loop for each serial number 
	req = requests.get("http://webservice.hobolink.com/rest/public/devices/10459715/data_files/latest/txt") 
	#header in csv is seperated by a row of hyphens, so need to find row of hyphens and split it up
	data = req.content.split("------------")
	#now need to strip out extra quotations and returns and newlines 
	data = data[1].strip('"').strip().split('\r\n')
	#name each csv by serial number
	f_latest = open("csvonly.csv", 'wt')
	try:
		w = csv.writer(f_latest)
		data.pop()
		w.writerow(["#", "PacificDateTime", "channel1", "channel2", "channel3", "channel4", "channel5", "channel6", "channel7", "channel8", "channel9", "channel10", "channel11", "channel12", "channel13", "channel14", "channel15"])
		for line in data[1:]: 
			w.writerow(line.split(",")) 
	finally:
		f.close()

	try:
		r = csv.read(f_old) 
	finally:
	#diff against old file
	#insert new lines into database 

	return 

	  
