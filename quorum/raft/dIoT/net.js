
const net = require('net');

const server = net.createServer((socket) => {
      socket.connect(1234, '0.0.0.0', () => {
        console.log("client connected with: 0.0.0.0:1234 /n");
      });
});

const server1 = net.createServer((socket) => {
      socket.connect(1235, '0.0.0.1', () => {
        console.log("client connected with: 0.0.0.1:1235 /n");
      });
});

server.on('end', () => {
          ;
});

server.listen(1234);
server1.listen(1235);
