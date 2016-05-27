from buildings import buildings
import csv, os
import psycopg2

global last_row

#conn = psycopg2.connect("dbname='feed' user='postgres' host='localhost' password='barry1'")

try:
    conn = psycopg2.connect("dbname='feed' user='postgres' host='localhost' password='barry1'")
    cur = conn.cursor()
except:
    print "I am unable to connect to the database"
#pull last twenty lines and prepare them to check against the new pool of data

for b in buildings:
    print b
    for s in buildings[b]["serials"]:
        serials = s
        print(serials)
        for serial_num in serials:
            print serial_num
            usecases = serials[serial_num] #dictionary with serial_num giving back the value which is also a dictionary
            print(usecases)
            #store the channels for each use
            light_channels = usecases['lights']
            kitchen_channels = usecases['kitchen']
            solar_channels = usecases['solar']
            ev_channels = usecases['ev']
            plugs_channels= usecases['plugs']
            old_csv = open("Tobias Experiment 1_577.csv")
            csvReader = csv.reader(old_csv)
            data = list(csvReader)
            data = data[154:]
  #          data = data[1].strip('"').strip().split('\r\n')
  #          data = (data[-20::]) #gets the last 20 lines/minutes
  #         data  = [d.split(",") for d in data ]

            for d in data:
                print d
                index = d[0]
                print index
                date = d[1]
                print index
                lights = 0
                ev = 0
                solar = 0
                plugs = 0
                kitchen = 0
                hvac = 0
                instahot = 0
                for i in light_channels:
                        print("i: " + str(i))
                        lights += float(d[i+1])
                        print("Lights :" + str(lights))
                for i in kitchen_channels:
                        print("i: " + str(i))
                        kitchen +=  float(d[i+1])
                        print("Kitchen :" + str(kitchen))

                for i in ev_channels:
                        print("i: " + str(i))
                        ev += float(d[i+1])
                        print("EV :" + str(ev))

                for i in plugs_channels:
                        print("i: " + str(i))
                        plugs += float(d[i+1])
                        print("Plugs :" + str(plugs))

                for i in solar_channels:
                        print("i: " + str(i))
                        solar += float(d[i+1])
                        print("solar :" + str(solar))

                print("lights: " + str(lights))
                print("solar: " + str(solar))
                print("kitchen: " + str(kitchen))
                print("ev: " + str(ev))
                print("plugs: " + str(plugs))
                query = "INSERT INTO log VALUES (" + "\'" + str(b)+ "\'" + ", "+ "\'" +str(date)+ "\'" +", "+ str(kitchen)+ ", " + str(plugs) + " , "  + str(lights) + ", " + str(solar) + ", " + str(ev) + ", " + str(hvac)  + ", " + str(instahot) + ", " + str(index) + ")" + ";"
                print query
                cur.execute(query)
                conn.commit()
