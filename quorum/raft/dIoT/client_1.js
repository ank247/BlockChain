

const net = require('net');

const client = net.createConnection(1234, '0.0.0.0', () => {
      console.log("Server connected");
});

client.on('data', () => {
  client.write('Hello!');
});
