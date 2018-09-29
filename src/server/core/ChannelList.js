module.exports = new function() {
  const channels = [];

  this.create = function(name) {
    channels.push({name: name, participants: []});
  };

  this.destroy = function(name) {
    channels.splice(channels.findIndex(channel => channel.name === name), 1);
  };

  this.getParticipants = function(name) {
    return channels.filter(channel => channel.name === name)[0].participants;
  };

  this.join = function(channelName, clientId) {
    this.getParticipants(channelName).push({id: clientId});
  };

  this.left = function(channelName, clientId) {
    this.getParticipants(channelName)
        .splice(this.getParticipants(channelName).findIndex(participant => participant.id === clientId), 1);
  };
};