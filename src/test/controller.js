const {expect} = require('chai');
const WebSocket = require('ws');

describe('Integration test', async () => {
  const {server} = require('../server/controller');

  const ws1 = new WebSocket('ws://localhost:8081/chat');
  const ws2 = new WebSocket('ws://localhost:8081/chat');

  it('Check messages exchanges', async () => {

    ws1.on('message', async (data) => {
      return expect(data).to.include('Hello, w1!');
    });

    ws2.on('message', async (data) => {
      return expect(data).to.include('Hello, w2!');
    });

    ws1.send('Hello, w2!');
    ws2.send('Hello, w1');

    server.close();
  });
});