
var utils = require('./utils');
module.exports.purge = function purge(s, action) {
  
  if (people[s.id].inroom) { //user is in a room
    var room = rooms[people[s.id].inroom]; //get room from rooms object
    if (s.id === room.owner) { //given user is the owner of the room
      if (action === 'disconnect') { //handle the disconnect event
        utils.sendToAllClientsInRoom(io, s.room, 'sendChatMessage', {name: 'ChatBot', message: 'The owner has disconnected.'});
        var socketids = [];
        for (var i=0; i<sockets.length; i++) {
          socketids.push(sockets[i].id);
          if(_.contains((socketids)), room.people) {
            sockets[i].leave(room.name);
          }
        }
        if(_.contains((room.people)), s.id) {
          for (var i=0; i<room.people.length; i++) {
            people[room.people[i]].inroom = null;
            people[room.people[i]].roomname = null;
          }
        }
        room.people = 0;
        delete rooms[people[s.id].owns]; //delete the room
        delete people[s.id]; //delete user from people collection
        delete chatHistory[room.name]; //delete the chat history
        totalPeopleOnline = _.size(people);
        totalRooms = _.size(rooms);
        utils.sendToAllConnectedClients(io, 'updateRoomsCount', {count: totalRooms});
        utils.sendToAllConnectedClients(io, 'updatePeopleCount', {count: totalPeopleOnline});
        utils.sendToAllConnectedClients(io,'listAvailableChatRooms', rooms);
        var o = _.findWhere(sockets, {'id': s.id}); //needle for socket in sockets object
        sockets = _.without(sockets, o); //remove needle socket
        utils.sendToAllConnectedClients(io, 'updateUserDetail', people);
        utils.sendToSelf(s, 'sendUserDetail', people[s.id]);
      } else if (action === 'deleteRoom') { //room owner removes owned room
        utils.sendToAllClientsInRoom(io, s.room, 'sendChatMessage', {name: 'ChatBot', message: 'The owner has removed the room.'});
        var socketids = [];
        for (var i=0; i<sockets.length; i++) {
          socketids.push(sockets[i].id);
          if(_.contains((socketids)), room.people) {
            sockets[i].leave(room.name);
          }
        }
        if(_.contains((room.people)), s.id) {
          for (var i=0; i<room.people.length; i++) {
            people[room.people[i]].inroom = null;
            people[room.people[i]].roomname = null;
          }
        }
        delete rooms[people[s.id].owns];
        people[s.id].owns = null;
        people[s.id].roomname = null;
        room.people = 0;
        delete chatHistory[room.name]; //delete the chat history
        totalRooms = _.size(rooms);
        utils.sendToAllConnectedClients(io, 'updateRoomsCount', {count: totalRooms});
        utils.sendToAllConnectedClients(io,'listAvailableChatRooms', rooms);
        utils.sendToAllConnectedClients(io, 'updateUserDetail', people);
        utils.sendToSelf(s, 'sendUserDetail', people[s.id]);
      } else if (action === 'leaveRoom') { //room owner leaves room
        utils.sendToAllClientsInRoom(io, s.room, 'sendChatMessage', {name: 'ChatBot', message: 'The owner has left the room.'});
        var socketids = [];
        for (var i=0; i<sockets.length; i++) {
          socketids.push(sockets[i].id);
          if(_.contains((socketids)), room.people) {
            sockets[i].leave(room.name);
          }
        }
        if(_.contains((room.people)), s.id) {
          for (var i=0; i<room.people.length; i++) {
            people[room.people[i]].inroom = null;
            people[room.people[i]].roomname = null;
          }
        }
        delete rooms[people[s.id].owns];
        people[s.id].owns = null;
        people[s.id].roomname = null;
        room.people = 0;
        delete chatHistory[room.name]; //delete the chat history
        totalRooms = _.size(rooms);
        utils.sendToAllConnectedClients(io, 'updateRoomsCount', {count: totalRooms});
        utils.sendToAllConnectedClients(io,'listAvailableChatRooms', rooms);
        utils.sendToAllConnectedClients(io, 'updateUserDetail', people);
        utils.sendToSelf(s, 'sendUserDetail', people[s.id]);
      }
    } else {//user in room but does not own room
      if (action === 'disconnect') {
        utils.sendToAllClientsInRoom(io, s.room, 'sendChatMessage', {name: 'ChatBot', message: people[s.id].name + " has left the server."});
        if (_.contains((room.people), s.id)) {
          var personIndex = room.people.indexOf(s.id);
          room.people.splice(personIndex, 1);
          s.leave(room.name);
        }
        delete people[s.id];
        totalPeopleOnline = _.size(people);
        utils.sendToAllConnectedClients(io, 'updatePeopleCount', {count: totalPeopleOnline});
        var o = _.findWhere(sockets, {'id': s.id});
        sockets = _.without(sockets, o);
        utils.sendToAllConnectedClients(io, 'updateUserDetail', people);
        utils.sendToSelf(s, 'sendUserDetail', people[s.id]);
      } else if (action === 'deleteRoom') {
        utils.sendToSelf(s, 'sendChatMessage', {name: 'ChatBot', message: 'Only the owner can remove a room'});
      } else if (action === 'leaveRoom') {
        if (_.contains((room.people), s.id)) {
          var personIndex = room.people.indexOf(s.id);
          room.people.splice(personIndex, 1);
          people[s.id].inroom = null;
          people[s.id].roomname = null;
          utils.sendToAllClientsInRoom(io, s.room, 'sendChatMessage', {name: 'ChatBot', message: people[s.id].name + " has left the room."});
          s.leave(room.name);
          utils.sendToAllConnectedClients(io, 'updateUserDetail', people);
          utils.sendToSelf(s, 'sendUserDetail', people[s.id]);
        }
      }
    }
  } else {//The user isn't in a room, but maybe he just disconnected, handle the scenario:
  if (action === 'disconnect') {
    utils.sendToAllConnectedClients(io, 'sendChatMessage', {name: 'ChatBot', message: people[s.id].name + " disconnected from the server."});
    delete people[s.id];
    totalPeopleOnline = _.size(people);
    utils.sendToAllConnectedClients(io, 'updatePeopleCount', {count: totalPeopleOnline});
    var o = _.findWhere(sockets, {'id': s.id});
    sockets = _.without(sockets, o);
    utils.sendToAllConnectedClients(io, 'updateUserDetail', people);
    utils.sendToSelf(s, 'sendUserDetail', people[s.id]);
    } else if (action === 'leaveRoom') {
      utils.sendToSelf(s, 'sendChatMessage', {name: 'ChatBot', message: 'You\'re not part of the room.'});
    } else if (action === 'deleteRoom') {
      utils.sendToSelf(s, 'sendChatMessage', {name: 'ChatBot', message: 'You can\'t do that'});
    }
  }
};