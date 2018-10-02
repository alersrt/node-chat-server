const {expect} = require('chai');
const WebSocket = require('ws');

require('../server/app');

const ws1 = new WebSocket('ws://localhost:8081/chat/main');
const ws2 = new WebSocket('ws://localhost:8081/chat/main');
const ws3 = new WebSocket('ws://localhost:8081/chat');

ws1.on('message', async (dataTransfer) => {
  console.log('WS1 ===> ' + dataTransfer);
});

ws2.on('message', async (dataTransfer) => {
  console.log('WS2 ===> ' + dataTransfer);
});

ws3.on('message', async (dataTransfer) => {
  console.log('WS3 ===> ' + dataTransfer);
});

ws1.on('open', async () => {
  ws1.send('Hello, w2!');
});

ws2.on('open', async () => {
  ws2.send('Hello, w1!');
});