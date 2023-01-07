import socket
import threading

global number_of_concurrent_connections
number_of_concurrent_connections = 10

def connection_handler (client_socket, addr):
    global number_of_concurrent_connections
    wait_for_message_threshold = 100
    wait_loop_count = 0
    ip_str = str(addr[0])
    port_str = str(addr[1])
    while True:
        client_data = client_socket.recv(10)
        client_data_str = str(client_data)
        if (len(client_data_str) > 3):
            wait_loop_count = 0
            print('Received from ' + ip_str + ' on port ' + port_str + ": " + client_data_str)
        else:
            wait_loop_count = wait_loop_count + 1
            if (wait_loop_count == wait_for_message_threshold):
                number_of_concurrent_connections = number_of_concurrent_connections + 1
                print('Disconnected from ' + port_str)
                break

s = socket.socket()
s.bind(('localhost', 5009))
s.listen(5)

while True:
    c, addr = s.accept()
    if (number_of_concurrent_connections > 0):
        temp_thread = threading.Thread(target=connection_handler, args=(c, addr))
        temp_thread.start()
        number_of_concurrent_connections = number_of_concurrent_connections - 1