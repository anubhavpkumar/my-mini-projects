import socket
import numpy as np
import cv2
import json
import re

s = socket.socket()
s.connect(('localhost', 6500))

while (True):
    data = s.recv(1024)
    decoded_data = data.decode('utf-8')
    print (decoded_data)
    decoded_data = json.loads(re.sub("\s+", ",", decoded_data.strip()))
    frame = np.array(decoded_data)
    print(decoded_data)
    #frame = np.array(list(decoded_data), dtype=int)
    cv2.imshow('frame', decoded_data)
    cv2.waitkey(0)