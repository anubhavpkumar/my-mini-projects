from queue_client import Client_Queue

client_queue = Client_Queue()

client_queue.push_to_queue('Anubhav Kumar')
client_queue.push_to_queue('Neha Chanchal')
data = client_queue.pull_from_queue()
data = client_queue.pull_from_queue()
length = client_queue.get_queue_length()
print('Length: ', length)
data = client_queue.pull_from_queue()
print(data)
client_queue.push_to_queue('Anshu Yadav')
length = client_queue.get_queue_length()
print('Length: ', length)
client_queue.push_to_queue('Bala')
length = client_queue.get_queue_length()
print('Length: ', length)

