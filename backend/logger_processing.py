from buildings import buildings
import requests, csv, os
import psycopg2




try:
    conn = psycopg2.connect("dbname='feed' user='postgres' host='postgres' password='postgres'")
except:
    print "I am unable to connect to the database"


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
            req = requests.get("http://webservice.hobolink.com/rest/public/devices/"+str(serial_num)+"/data_files/latest/txt")
            data = req.content.split("------------")
            #now need to strip out extra quotations and returns and newlines
            data = data[1].strip('"').strip().split('\r\n')
            data = (data[-20::]) #gets the last 20 lines/minutes
            data  = [d.split(",") for d in data ]

            for d in data:
                index = d[0]
                date = d[1]
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
                query = "INSERT INTO BUILDINGS(" + str(index) +", "+str(b)+", "+str(date)+", "+str(kitchen)+", "+str(plugs)+" , "+str(lights)+", "+str(solar)+", "+str(ev)+", "+str(hvac)+", "+str(instahot)+")"
                print query
