

// wrapper responsible for broadcasting various messages to the connected sockets

// exports sendToSelf function
module.exports.sendToSelf = function(socket, method, data) {
  	socket.emit(method, data);
}

// exports sendToAllConnectedClients function
module.exports.sendToAllConnectedClients = function(io, method, data) {
  	io.sockets.emit(method, data);
}

// exports sendToAllClientsInRoom function
module.exports.sendToAllClientsInRoom = function(io, room, method, data) {
  	io.sockets.in(room).emit(method, data);
}