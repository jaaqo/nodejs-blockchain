const express = require('express');
const Blockchain = require('../blockchain');
const bodyParser = require('body-parser');
const P2PServer = require('./p2p-server.js');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const blockchain = new Blockchain();

const p2pServer = new P2PServer(blockchain);
p2pServer.listen();

const app = express();
app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.post('/mine', (req, res) => {
  const block = blockchain.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  res.redirect('/blocks');
  p2pServer.syncChain();
});

app.listen(HTTP_PORT, () => {
  console.log(`listening on port ${HTTP_PORT}`);
});
