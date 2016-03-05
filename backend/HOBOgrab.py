import csv, time 
import requests, psycopg2
import os

serials = [ 10459715 ] #hobologgers serial numbers 

def main():
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
		print ndata
		if len(ndata) < 7:
			continue 
		#need to split up the date and format that along with the time  
		query = "INSERT INTO BUILDINGS(" + "0" +", "+str(ndata[0])+", "+str(ndata[1])+", "+str(ndata[2])+" , "+str(ndata[3])+", "+str(ndata[4])+", "+str(ndata[5])+" , "+str(ndata[6])+" , "+str(ndata[7])+")"
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
