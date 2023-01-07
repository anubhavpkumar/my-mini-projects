import time
import os
from queue_client import Client_Queue

client_queue = Client_Queue(9002)

def run():
    url_queue_length = client_queue.get_queue_length()
    print ('Total URLs in URL Queue: ', url_queue_length)
    time.sleep(2)
    run()

run()