const port = !!process.env.CHAT_SERVER_PORT ? process.env.CHAT_SERVER_PORT : 8081;

const uuid = require('uuid/v4');
const WebSocket = require('ws');
const {event} = require('./events');

const connections = require('./core/ConnectionList');
const channels = require('./core/ChannelList');

const ws = new WebSocket.Server({port: port, path: '/chat'});

channels.create('main');

ws.broadcast = (channel, data) => channels.getParticipants(channel).forEach(participant => {
  let client = connections.get(participant.id);

  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(data));
  }
});

ws.on('connection', async (socket) => {
  socket.id = uuid();
  connections.add(socket);
  ws.broadcast('main', {id: socket.id, event: event.participant.JOIN});

  socket.on('close', async () => {
    connections.remove(socket.id);
    ws.broadcast('main', {id: socket.id, event: event.participant.LEFT});
  });

  socket.on('message', async (data) => {
    ws.broadcast('main', socket.id + ': ' + data);
  });
});

module.exports.server = ws;