import json
import csv, time
import requests #, psycopg2
import os


#serials = [ 10459715 ] #hobologgers serial numbers


# app = Celery('tasks', backend='amqp', broker='localhost')
#sched = BlockingScheduler()

# @app.task
#@sched.scheduled_job('Data_pull', minute=0, second=5)	# should run 5 seconds after every hour
#def scheduled_job():
def main():
	eat_first = 1	# a stupid bool that lets us eat the first line of each file we diff
	current = time.strftime("%H")
	for serial in serials:
		print("making network request")
		#loop for each serial number
		req = requests.get("http://webservice.hobolink.com/rest/public/devices/"+str(serial)+"/data_files/latest/txt")
		print("network request done")
		#header in csv is seperated by a row of hyphens, so need to find row of hyphens and split it up
		data = req.content.split("------------")
		#now need to strip out extra quotations and returns and newlines
		data = data[1].strip('"').strip().split('\r\n')
		#name each csv by serial number
		f_latest = open( str(serial) + "_" + str(current) + ".csv", 'wt')
		try:
			w = csv.writer(f_latest)
			data.pop()
			w.writerow(["#", "PacificDateTime", "kitchen", "plugload", "light", "solar", "ev", "hvac", "instahot"]);
			for line in data[1:]:
				print line.split(",")
				#w.writerow(line.split(","))
		finally:
			f_latest.close()

# 		filename1 = str(serial) +"_"+str(current)+".csv"
# 		filename2 = str(serial)+"_"+str(int(current) - 1)+".csv"
# 		recent_f  = open(filename1, "r")
# 		last_f = open(filename2, "r")
# 		try:
# 			recent = csv.reader(recent_f)
# 			last = csv.reader(last_f)
# 			#new = filecmp.cmp("./"+filename1, "./"+filename2)
# 			os.system("diff "+ filename1 + " "  + filename2 + " > newdata.txt")
# 			datafile = open("newdata.txt", "r")
# 		  	for line in datafile:
# 		  		if eat_first == 1:
# 		  			eat_first = 0
# 		  		else:
# 					pass
# #					print line.strip().strip("<").strip().split(",")
#
# 		finally:
# 			recent_f.close()
# 			last_f.close()

		return

if __name__ == "__main__":
	main()
