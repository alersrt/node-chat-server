const uuid = require('uuid/v4');

const WebSocket = require('ws');
const host = !!process.env.CHAT_SERVER_HOST
    ? process.env.CHAT_SERVER_HOST
    : 'ws://localhost/chat';
const port = !!process.env.CHAT_SERVER_PORT
    ? process.env.CHAT_SERVER_PORT
    : 8081;
const ws = new WebSocket.Server({port: port});

const connections = new function() {
  const list = {};

  this.add = (id, socket) => list[id] = socket;
  this.remove = (id) => delete list[id];
  this.get = (id) => list[id];
};

ws.broadcast = (data) => ws.clients.forEach(client => client.send(data));

ws.on('connection', async (socket, request) => {
  let id = uuid();

  socket.id = id;
  connections.add(id, socket);
  ws.broadcast('participant [' + id + '] has join');

  socket.on('close', async (code, reason) => {
    connections.remove(id);
    ws.broadcast('participant [' + id + '] has left (code: ' + code + ')');
  });

  socket.on('message', async (data) => {
    ws.broadcast(id + ': ' + data);
  });
});

