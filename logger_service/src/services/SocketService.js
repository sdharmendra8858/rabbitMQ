const socketIo = require('socket.io');

class SocketService {
   constructor(server) {
     this.io = socketIo(server);
     this.io.on('connection', socket => {
       console.log('socket connection established')
   });
 } 

  emiter(event, body) {
    console.log("----- Socket event -----");
    if(body)
      this.io.emit(event, body);
  }
}

module.exports = SocketService; 