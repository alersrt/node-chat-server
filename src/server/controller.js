const port = !!process.env.CHAT_SERVER_PORT ? process.env.CHAT_SERVER_PORT : 8081;

const uuid = require('uuid/v4');
const WebSocket = require('ws');
const {event} = require('./constants');

const {connections} = require('./core/ConnectionList');
const {channels} = require('./core/ChannelList');

const ws = new WebSocket.Server({port: port, path: '/chat'});

channels.create('main');

ws.broadcast = async (channel, data) => {
  let participants = await channels.getParticipants(channel);

  participants.forEach(async (participant) => {
    let client = await connections.get(participant.id);

    if (client.readyState === WebSocket.OPEN) {
      typeof data === 'object' ? client.send(JSON.stringify(data)) : client.send(data);
    }
  });
};

ws.on('connection', async (socket) => {
  socket.id = uuid();
  await connections.add(socket);
  await channels.join('main', socket.id);
  ws.broadcast('main', {id: socket.id, event: event.participant.JOIN});

  socket.on('close', async () => {
    await connections.remove(socket.id);
    await channels.leave('main', socket.id);
    ws.broadcast('main', {id: socket.id, event: event.participant.LEFT});
  });

  socket.on('message', async (dataTransfer) => {
    let data = JSON.parse(dataTransfer);
    let target = data.target;
    if (target.startsWith('#')) {
      ws.broadcast(target.substr(1), socket.id + ': ' + data.message);
    }
    if (target.startsWith('@')) {
      let socket = await connections.get(target.substr(1));
      socket.send(data.message);
    }
  });
});

module.exports.server = ws;