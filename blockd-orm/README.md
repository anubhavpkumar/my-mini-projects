# Blockd-ORM

Blockd-ORM is a blockchain backed ORM service.

## Abstract
In this project, we aggregate the write queries and create a single transaction file. The transaction file is encrypted and then sent to Miners for mining. Once the mining is done successfully, the block gets added to the blockchain and then the transactions gets applied on the underlying database. For the purpose of POC, the underlying database is chosen to be `sqlite`. Upon a successful demonstration of POC, other database like MySQL, Elastic Search and MongoDB would be supported. 

## Services involved in the project
**1. Core Database (Core)**
Core database contains the master database. It recevies the write transactions from the users and queues it up. Upon reaching the queue length threshold or the first message timing threshold the Core Database creates the transaction file and sends it to the Mine Controller. 

**2. Mine Controller (Master)**
Mine controller or Master is responsible for maintaining the pool of miners and serving their poll requests. Mine Controller receives the transaction file from the Core Service and sends it to the miners. Miners responds with the hash upon successful mining and Master verifies it. If the hash is correct, the Master adds it to the master blockchain and responds the core to apply the transactions onto the database. 

**3. Miners**
Miners polls the master for receiving transaction files if they are generated. Upon receiving the miners starts mining the hash. Once mined, the miners responds the hash to the Master. Upon receiving success from the master, the Miners adds the block to its blockchain

**4. Auditor**
The auditor keeps a track of all the miner's blockchains and the master's blockchain. If the Master Blockchain is not in consistent with atleast 51% of Miner's blockchain, it raises an alarm to the master and the mining gets suspended until restarted manually. 
