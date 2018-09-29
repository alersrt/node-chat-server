module.exports.channels = new function() {
  const channels = [];

  this.create = async function(name) {
    channels.push({name: name, participants: []});
  };

  this.destroy = async function(name) {
    channels.splice(channels.findIndex(channel => channel.name === name), 1);
  };

  this.getParticipants = async function(name) {
    return channels.filter(channel => channel.name === name)[0].participants;
  };

  this.join = async function(channelName, clientId) {
    let participants = await this.getParticipants(channelName);
    participants.push({id: clientId});
  };

  this.leave = async function(channelName, clientId) {
    let participants = await this.getParticipants(channelName);
    participants.splice(participants.findIndex(participant => participant.id === clientId), 1);
  };
};