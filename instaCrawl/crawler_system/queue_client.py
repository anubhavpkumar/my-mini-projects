import socket

## constants 
stream_seperator = '##'
data_seperator = '~~'
get_header = 'GET'
post_header = 'POST'
meta_header = 'META'


class Client_Queue():
    def __init__(self, server_port_number):
        self.port_number = server_port_number
        self.connect()
        
    
    def connect(self):
        self.c = socket.socket()
        self.c.connect(('localhost', self.port_number))
        
    def compose_message_post(self, message):
        return post_header+data_seperator+message+stream_seperator
    
    def compose_message_get(self):
        return get_header

    def compose_message_meta(self):
        return meta_header
    
    def push_to_queue(self, message):
        self.connect()
        composed_message = self.compose_message_post(message)
        self.c.send(bytes(composed_message, 'utf-8'))
        self.c.close()
    
    def pull_from_queue(self):
        self.connect()
        composed_message = self.compose_message_get()
        self.c.send(bytes(composed_message, 'utf-8'))
        data = self.c.recv(1024).decode()
        self.c.close()
        return data
    
    def get_queue_length(self):
        self.connect()
        composed_message = self.compose_message_meta()
        self.c.send(bytes(composed_message, 'utf-8'))
        data = self.c.recv(1024)
        self.c.close()
        print('Length data: ', data)
        return data