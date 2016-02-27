from celery import Celery
import time, filecmp, requests
import csv 

serials = [ 10459715 ] #hobologgers serial numbers 

def main():
	for serial in serials: 
		#loop for each serial number 
		req = requests.get("http://webservice.hobolink.com/rest/public/devices/10459715/data_files/latest/txt") 
		#header in csv is seperated by a row of hyphens, so need to find row of hyphens and split it up
		data = req.content.split("------------")
		#now need to strip out extra quotations and returns and newlines 
		data = data[1].strip('"').strip().split('\r\n')
		#name each csv by serial number
		f_latest = open( str(serial) + "_" + str(time.time()) + ".csv", 'wt')
		try:
			w = csv.writer(f_latest)
			data.pop()
			w.writerow(["#", "PacificDateTime", "channel1", "channel2", "channel3", "channel4", "channel5", "channel6", "channel7", "channel8", "channel9", "channel10", "channel11", "channel12", "channel13", "channel14", "channel15"])
			for line in data[1:]: 
				w.writerow(line.split(",")) 
		finally:
			f_latest.close()

		try:
			filename1 = serial +"_"+str(time.time())+".csv" 
			filename2 = serial+"_"+str((time.time()*60*60*60))+".csv"
			recent_f  = open(filename1, "r")
			last_f = open(filename2, "r")	 
			recent = csv.reader(recent_f) 
			last = csv.reader(last_f) 
			new = filecmp.cmp("./"+filename1, "./"+filename2) 
			recent_f.close()
			last_f.close() 
			print new
		#diff against old file
		#insert new lines into database 
	return	

if __name__ == "__main__":
	main() 
