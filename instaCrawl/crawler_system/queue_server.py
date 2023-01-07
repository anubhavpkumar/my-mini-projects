import socket

class QueueServer ():
    def __init__(self):
        self.url_queue = []
    
    def get_from_queue(self):
        if (len(self.url_queue) > 0):
            return bytes(self.url_queue.pop(0) , 'utf-8')
        return bytes('null', 'utf-8')
    
    def push_to_queue(self, message):
        self.url_queue.append(message)
    
    def get_length(self):
        return str(len(self.url_queue))
        
## constants 
port_number = 9002
stream_seperator = '##'
data_seperator = '~~'
get_header = 'GET'
post_header = 'POST'
meta_header = 'META'

def main():
    s = socket.socket()
    s.bind(('localhost', port_number))
    s.listen(5)
    queueServer = QueueServer() 
    while(True):
        c,addr = s.accept()
        print('Received connection')
        data = c.recv(1024).decode()
        messages = data.split(stream_seperator)
        for message in messages:
            message_split = message.split(data_seperator)
            message_header = message_split[0]
            message_body = message_split[1] if len(message_split) > 1 else ''
            if (message_header == get_header):
                c.send(queueServer.get_from_queue())
            elif (message_header == post_header):
                queueServer.push_to_queue(message_body)
            elif (message_header == meta_header):
                c.send(bytes(queueServer.get_length(), 'utf-8'))
        
main()