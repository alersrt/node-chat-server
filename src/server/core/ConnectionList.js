module.exports.connections = new function() {
  const list = [];

  this.add = async (socket) => list.push(socket);
  this.remove = async (id) => list.splice(list.findIndex(client => client.id === id), 1);
  this.get = async (id) => list.filter(client => client.id === id)[0];
  this.getAll = async () => list;
};