import socket
import cv2

c = socket.socket()

c.connect(('localhost', 6000))

# while (True):
#     message_to_send = input('Enter a message to send !!\n')
#     if (message_to_send == 'DISCON'):
#         c.close()
#     else:
#         c.send(bytes(message_to_send, 'utf-8'))

# define a video capture object
vid = cv2.VideoCapture(0)

#c.send(bytes('Sending Test Data','utf-8'))
while True:
    ret, frame = vid.read()
    frame_str = str(frame)
    print ('Sending : ' + frame_str)
    c.send(bytes(frame_str, 'utf-8'))