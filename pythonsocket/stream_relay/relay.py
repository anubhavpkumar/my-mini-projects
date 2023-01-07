import socket
import threading


class SocketRelay:
    def __init__(self, listener_port_number):
        self.s_in = socket.socket()
        self.s_in.bind(('localhost', listener_port_number))
        self.s_in.listen(5)

        self.s_out = socket.socket()
        self.s_out.bind(('localhost', listener_port_number + 500))
        self.s_out.listen(5)
    
        self.is_feeder_connected = False
        
        feeder_attachment_thread = threading.Thread(target=self.attach_feeder, args=())
        fetcher_attachment_thread = threading.Thread(target=self.attach_fetcher, args=())
        
        feeder_attachment_thread.start()
        fetcher_attachment_thread.start()
        
        feeder_attachment_thread.join()
        fetcher_attachment_thread.join()
        
        self.start_relaying()
        
    def attach_feeder(self):
        sock, addr = self.s_in.accept()
        self.feeder_socket = sock
        print ('Feeder Attached')
        return None
    
    def attach_fetcher(self):
        sock, addr = self.s_out.accept()
        self.fetcher_socket = sock
        print ('Fetcher Attached')
        return None
    
    def start_relaying(self):
        print('Relaying Has started')
        while True:
            data = self.feeder_socket.recv(1024)
            if (len(data) > 1):
                self.fetcher_socket.send(data)
