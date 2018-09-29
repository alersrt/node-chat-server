module.exports = new function() {
  const list = [];

  this.add = (socket) => list.push(socket);
  this.remove = (id) => list.splice(list.findIndex(client => client.id === id), 1);
  this.get = (id) => list.filter(client => client.id === id)[0];
  this.getAll = () => list;
};