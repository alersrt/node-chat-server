const {expect} = require('chai');
const WebSocket = require('ws');

const {server} = require('../server/controller');

const ws1 = new WebSocket('ws://localhost:8081/chat');
const ws2 = new WebSocket('ws://localhost:8081/chat');

ws1.on('message', async (dataTransfer) => {
  console.log('WS1 ===> ' + dataTransfer);
});

ws2.on('message', async (dataTransfer) => {
  console.log('WS2 ===> ' + dataTransfer);
});

ws1.on('open', async () => {
  ws1.send(JSON.stringify({target: '#main', message: 'Hello, w2!'}));
});

ws2.on('open', async () => {
  ws2.send(JSON.stringify({target: '#main', message: 'Hello, w1!'}));
});