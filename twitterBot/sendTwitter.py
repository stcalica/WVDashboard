from twython import Twython
import json
from apscheduler.schedulers.blocking import BlockingScheduler
import logging

logging.basicConfig(filename="output.log", level=logging.DEBUG)
sched = BlockingScheduler()

@sched.scheduled_job('cron', hour='9,19')
def task():
    APP_KEY = "lF79UQiDsP4kUSRlsg1cW3N9g"
    APP_SECRET = "0nIBU4KJcCXCfZKcWKkQZ8bUPcRpl2gc6kAkmDvc5Rq5998X3K"
    ACCESS_TOKEN = "737898701939716100-JaDquL9VV8O7i8OnVjQd6KSYrq98AtR"
    ACCESS_TOKEN_SECRET = "dgvNfhklbUac2MmWQwT3LHKPk04EJWUzJLSkEMQaZM2Aa"

    darkVarderLink = "https://www.youtube.com/watch?v=-bzWSJG93P8"
    eyeOfTigerLink = "https://www.youtube.com/watch?v=btPJPFnesV4"

    energyKey = []
    zneKey = []
    addressKey = []
    differenceVal = []

    twitter = Twython(APP_KEY, APP_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET)

    #Get Winner and update according Flag
    jsonData = '[{"energy_sum_week":0,"zne_sum_week":90,"address":"215"},{"energy_sum_week":0,"zne_sum_week":90,"address":"1590"},{"energy_sum_week":10,"zne_sum_week":90,"address":"1605"},{"energy_sum_week":130,"zne_sum_week":90,"address":"1715"}]'
    jdata = json.loads(jsonData)
    for d in jdata:
        for key, value in d.iteritems():
            if(key == "energy_sum_week"):
                energyKey.append(value)
            elif(key == "zne_sum_week"):
                zneKey.append(value)
            else:
                addressKey.append(value)

    for x in range(len(energyKey)):
        differenceVal.append(zneKey[x] - energyKey[x])

    winnerIndex = differenceVal.index(max(differenceVal))
    winnerAddress = addressKey[winnerIndex];
    twitter.update_status(status='The winner is ' + winnerAddress +' Street\n' + eyeOfTigerLink)


#END OF TASK FUNCTION
sched.start()
