const Blockchain = require('./index.js');
const Block = require('./block.js');

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain2 = new Blockchain();
  });

  it('starts with genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds new block', () => {
    const data = 'foo';
    blockchain.addBlock(data);
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(data);
  });

  it('validates a valid chain', () => {
    blockchain2.addBlock('foo');

    expect(blockchain2.isValidChain()).toBe(true);
  });

  it('invalidates a chain with invalid genesis block', () => {
    blockchain2.chain[0].data = 'corrupted';

    expect(blockchain2.isValidChain()).toBe(false);
  });

  it('invalidates a chain with corrupt data', () => {
    blockchain2.addBlock('foobar');

    blockchain2.chain[1].data = 'not foobar';

    expect(blockchain2.isValidChain()).toBe(false);
  });

  it('replaces the chain with valid chain', () => {
    blockchain2.addBlock('fooo');
    blockchain.replaceChain(blockchain2.chain);

    expect(blockchain.chain).toEqual(blockchain2.chain);
  });

  it('does not replace the chain with a one with less than or equal to chain', () => {
    blockchain.addBlock('fooo');
    blockchain.replaceChain(blockchain2.chain);

    expect(blockchain.chain).not.toEqual(blockchain2.chain);
  });
});
