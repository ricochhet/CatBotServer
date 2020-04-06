const Server = require('./server/server');
const server = new Server();

server.run(8080, {
  handleErrors: true
});
