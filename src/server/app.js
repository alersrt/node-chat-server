const {channels} = require('./repository/channelList');
const uuid = require('uuid/v4');
const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const port = 8081;

channels.create('main');

let emptyRouter = express.Router().ws('/', (ws, req) => {});
let chatRouter = express.Router().ws('/:chatId', async (ws, req) => {
  ws.id = uuid();
  let chatId = req.params.chatId;
  channels.join(chatId, ws.id);

  ws.on('message', async (data) => {
    let participants = await channels.getParticipants(chatId);
    expressWs.getWss().clients.forEach(client => {
      if (participants.find(participant => participant.id === client.id)) {
        client.send(data);
      }
    });
  });
});

app.use('/chat', emptyRouter, chatRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});