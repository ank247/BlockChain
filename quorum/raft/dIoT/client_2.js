
const net = require('net');

const client = net.createConnection(1235, '0.0.0.1', () => {
      console.log("Server connected");
});

client.on('data', () => {
  client.write('Hello!');
});
