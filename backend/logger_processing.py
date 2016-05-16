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
            for usecase in usecases:
                 print("usecase : %s" % (usecase)) #each
                 print("using channels: \n")
            #     channels = [for c in usecases[usecase] ]
        #         for channel in usecases[usecase]:
                    #  for line in data:
                    #      row = line.split(',')
                    #      print(row)
                    #      print(row[channel])
