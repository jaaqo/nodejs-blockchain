const Block = require('./block.js');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {
    let ch = chain || this.chain;
    let isValid = true;

    if (JSON.stringify(ch[0]) !== JSON.stringify(Block.genesis()))
      isValid = false;

    for (let i = 1; i < ch.length; i++) {
      const block = ch[i];
      const lastBlock = ch[i - 1];

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== Block.blockHash(block)
      ) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log('Received chain is not longer than the current chain');
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log('Received chain is invalid');
      return;
    }

    console.log('Replacing the current chain with the new chain');
    this.chain = newChain;
  }
}

module.exports = Blockchain;
