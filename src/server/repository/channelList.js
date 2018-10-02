module.exports.channels = new function() {
  const channels = [];

  this.create = async function(id) {
    channels.push({id: id, participants: []});
  };

  this.destroy = async function(id) {
    channels.splice(channels.findIndex(channel => channel.id === id), 1);
  };

  this.getParticipants = async function(id) {
    return channels.filter(channel => channel.id === id)[0].participants;
  };

  this.join = async function(channelId, clientId) {
    let participants = await this.getParticipants(channelId);
    participants.push({id: clientId});
  };

  this.leave = async function(channelId, clientId) {
    let participants = await this.getParticipants(channelId);
    participants.splice(participants.findIndex(participant => participant.id === clientId), 1);
  };
};