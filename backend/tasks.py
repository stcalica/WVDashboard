import csv, time 
import requests #, psycopg2
import os

from celery import Celery #allow celery to run this as an app

serials = [ 10459715 ] #hobologgers serial numbers

app = Celery('tasks', backend='amqp', broker='localhost')

@app.task
def main():
	eat_first = 1	# a stupid bool that lets us eat the first line of each file we diff
	current = time.strftime("%H") 
	for serial in serials: 
		#loop for each serial number 
		req = requests.get("http://webservice.hobolink.com/rest/public/devices/"+str(serial)+"/data_files/latest/txt") 
		#header in csv is seperated by a row of hyphens, so need to find row of hyphens and split it up
		data = req.content.split("------------")
		#now need to strip out extra quotations and returns and newlines 
		data = data[1].strip('"').strip().split('\r\n')
		#name each csv by serial number
		f_latest = open( str(serial) + "_" + str(current) + ".csv", 'wt')
		try:
			w = csv.writer(f_latest)
			data.pop()
			w.writerow(["#", "PacificDateTime", "channel1", "channel2", "channel3", "channel4", "channel5", "channel6", "channel7", "channel8", "channel9", "channel10", "channel11", "channel12", "channel13", "channel14", "channel15"])
			for line in data[1:]:
				#print line 
				w.writerow(line.split(",")) 
		finally:
			f_latest.close()

		filename1 = str(serial) +"_"+str(current)+".csv" 
		filename2 = str(serial)+"_"+str(int(current) - 1)+".csv"
		recent_f  = open(filename1, "r")
		last_f = open(filename2, "r")	 
		try:
			recent = csv.reader(recent_f) 
			last = csv.reader(last_f) 
			#new = filecmp.cmp("./"+filename1, "./"+filename2) 
			os.system("diff "+ filename1 + " "  + filename2 + " > newdata.txt")
			datafile = open("newdata.txt", "r")
		  	for line in datafile:
		  		if eat_first == 1:
		  			eat_first = 0
		  		else:
					pass
#					print line.strip().strip("<").strip().split(",") 	 
			
		finally:
			recent_f.close()
			last_f.close()

 	try: 
		datafile = open("newdata.txt", "r")
		#for line in datafile: 
		#		ndata = line.strip().strip("<").strip(">").strip().split(",") 	 
		#		print ndata	

#		conn = psycopg2.connect("dbname='westvillage' user='kyle' host='localhost:5432' password='barry1'")
#		cur = conn.cursor() 	
	except:
		print "\n\tUnable to Connect\n"
	for line in datafile:
		ndata = line.strip().strip("<").strip(">").strip().split(",") 	
		if len(ndata) < 7:
			continue 
		#need to split up the date and format that along with the time
		# Date then Time is in ndata[1]

		# Format the Date to "YEAR-MONTH-DAY"
		d_and_t = ndata[1].split(" ")
		if(len(d_and_t) < 2):
			continue
		date_temp = d_and_t[0].split("/")
		temp = date_temp[0]
		date_temp[0] = "20"+str(date_temp[2])
		date_temp[2] = date_temp[1]
		date_temp[1] = temp
		#If the month only has one digit, make it 2
		if(len(date_temp[1]) == 1):
			date_temp[1] = "0" + str(date_temp[1])
		#If the day only has one digit, make it 2
		if(len(date_temp[2]) == 1):
			date_temp[2] = "0" + str(date_temp[2])
		#Put the whole thing into one string variable
		date_format = str(date_temp[0])+ "-" + str(date_temp[1])+ "-" + str(date_temp[2])

		#The Time is already formatted optimally as "HOUR:MINUTE:SECOND"
		time_format = str(d_and_t[1])

		query = "INSERT INTO BUILDINGS(" + "0" +", "+str(ndata[0])+", "+date_format+", "+time_format+", "+str(ndata[2])+" , "+str(ndata[3])+", "+str(ndata[4])+", "+str(ndata[5])+" , "+str(ndata[6])+" , "+str(ndata[7])+")"
		print query
	"""	try:
			#fetchall to get number
			row_num = len(cur.fetchall())
			#cur.execute(query) #queries go in here
		except Exception as e:
			print e
			print "\n\tCouldn't insert query\n"
	"""
			
	return

if __name__ == "__main__":
	main() 
