from buildings import buildings
import requests, csv, os

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
            data = data[-20::]
            #somewhere here need to split last few lines of files
            #need to somewhere define default values also
            newest = open( serial_num + "_n.csv", 'wb' )

            old_data = open( serial_num+"_o.csv", 'r')
            w = csv.writer(newest)

            for old, new in zip(old_data, data):
                if old[1] == new[1]:
                    continue
                else:
                    w.writerow(new.split(','))

            newest.close()
            old_data.close()

            newest = open( serial_num+ "_n.csv", 'r')

            #processing data
            for row in newest:
                line = row.split(',')
                print row
                print line
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
                query += " WHERE building = '" + b + "' AND timestamp = '" + line[1] +"';"
                print("query: %s" % query)

            newest.close()
            os.system("rm -f"+ serial_num + "_o.csv")
            os.system("mv "+ serial_num + "_n.csv "+ serial_num + "_o.csv")
                    # UPDATE table SET s.usecase[u]
                        # print(row[c+2])
            #     channels = [for c in usecases[usecase] ]
        #         for channel in usecases[usecase]:
                    #  for line in data:
                    #      row = line.split(',')
                    #      print(row)
                    #      print(row[channel])
