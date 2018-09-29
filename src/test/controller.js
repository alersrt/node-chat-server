const {expect} = require('chai');
const WebSocket = require('ws');

const {server} = require('../server/controller');

const ws1 = new WebSocket('ws://localhost:8081/chat');
const ws2 = new WebSocket('ws://localhost:8081/chat');

ws1.on('message', async (dataTransfer) => {
  let data;
  try {
    data = JSON.parse(dataTransfer);
  } catch {
    data = dataTransfer;
  }
  console.log(data);
  typeof data !== 'object' ? expect(data).to.include('Hello') : null;
});

ws2.on('message', async (dataTransfer) => {
  let data;
  try {
    data = JSON.parse(dataTransfer);
  } catch {
    data = dataTransfer;
  }
  console.log(data);
  typeof data !== 'object' ? expect(data).to.include('Hello') : null;
});

ws1.on('open', async () => {
  ws1.send(JSON.stringify({target: '#main', message: 'Hello, w2!'}));
});

ws2.on('open', async () => {
  ws2.send(JSON.stringify({target: '#main', message: 'Hello, w1!'}));
});