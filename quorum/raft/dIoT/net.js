
const net = require('net');

const server = net.createServer((socket) => {
      socket.connect(1234, '0.0.0.0', () => {
        console.log("server connected: 0.0.0.0:1234 /n");
      });
});

server.on('end', () => {
          ;
});

server.listen();
