import os
import sys
import requests
import random
from queue_client import Client_Queue
import time
directory_name = 'anubhav'

print ('Creating directory if does not exists')
isExist = os.path.exists(directory_name)
if not isExist:
   os.makedirs(directory_name)
   print("The new directory is created!")

null_counter = 0
while (True):
    queue_client = Client_Queue(9002)
    url = queue_client.pull_from_queue()
    if (url == 'null'):
        null_counter = null_counter + 1
        time.sleep(10000)
        if (null_counter == 10):
            sys.exit()
        continue
    null_counter = 0
    page = requests.get(url)
    f_ext = os.path.splitext(url)[-1]
    f_name = './'+directory_name+'/picture-'+str(random.getrandbits(32))+'.jpg'
    with open(f_name, 'wb') as f:
        f.write(page.content)