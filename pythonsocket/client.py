import socket

c = socket.socket()

c.connect(('localhost', 5009))

while (True):
    message_to_send = input('Enter a message to send !!\n')
    if (message_to_send == 'DISCON'):
        c.close()
    else:
        c.send(bytes(message_to_send, 'utf-8'))