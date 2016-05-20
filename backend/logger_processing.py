from buildings import buildings
import requests, csv

for b in buildings:
    for s in buildings[b]["serials"]:
        serials = s
        print(serials)
        for serial_num in serials:
            print(serial_num)
            usecases = serials[serial_num] #dictionary with serial_num giving back the value which is also a dictionary
            req = requests.get("http://webservice.hobolink.com/rest/public/devices/"+str(serial_num)+"/data_files/latest/txt")
            data = req.content.split("------------")
            #now need to strip out extra quotations and returns and newlines
            data = data[1].strip('"').strip().split('\r\n')
            #somewhere here need to split last few lines of files
            #need to somewhere define default values also
            #should do this across all data
            for row in data[1:3]:
                line = row.split(',')
                #printing a new entry to database
                #two possible ones?
                print("IF NOT EXISTS (SELECT * FROM table WHERE building = '" + b + "' AND timestamp = '"
                    + line[1] +"') INSERT INTO table(building, timestamp) VALUES (" + b +", " + line[1] + ");")
                # print("INSERT INTO table(building, timestamp) VALUES("+ b +", " + line[1] +")"
                #     + " WHERE NOT EXISTS ( SELECT * FROM table WHERE building = '" + b + "' AND timestamp = '" + line[1]+"';")
                query = "UPDATE table SET "
                for u in usecases:
                    print("usecase: %s" % u)
                    value = 0
                    for c in usecases[u]:
                        print("channel: %s" % c)
                        value += float(line[c+1])
                    print("total value is: %s" % value)
                    query += u + "=" + u + "+" + str(value) + ", "

                query = query[:-2]
                query += " WHERE timestamp = '" + line[1] +"';"
                print("query: %s" % query)
                    # UPDATE table SET s.usecase[u]
                        # print(row[c+2])
            #     channels = [for c in usecases[usecase] ]
        #         for channel in usecases[usecase]:
                    #  for line in data:
                    #      row = line.split(',')
                    #      print(row)
                    #      print(row[channel])
