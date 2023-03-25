import hash from "object-hash";

type Block = {
  data: string;
  nonce: number;
  prevHash: string;
  key: string;
  hash: string;
  nextBlock: Block | null;
};

class Blockchain {
  blockchainName: string;
  lastZeroCount: number;
  lastHash: string;
  nonce: number;
  lastBlock: Block;

  constructor(blockchainName: string, lastZeroCount: number = 2) {
    this.blockchainName = blockchainName;
    this.lastZeroCount = lastZeroCount;
    this.lastHash = "";
    this.nonce = 0;
  }

  getRandomString(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  checkIfDataObjectHashSolved(dataObjectHash: string) {
    const dataObjectHashArray = dataObjectHash
      .split("")
      .slice(0, this.lastZeroCount);
    return !dataObjectHashArray.find((x: string) => x != "0");
  }

  addBlock(data: string) {
    while (1) {
      const randomKey = this.getRandomString(10);
      const dataObject = {
        nonce: this.nonce,
        data,
        prevHash: this.lastHash,
        key: randomKey,
      };
      const dataObjectHash = hash(dataObject);
      const isSolved = this.checkIfDataObjectHashSolved(dataObjectHash);
      if (isSolved) {
        const newBlock: Block = {};
      }
    }
  }
}
