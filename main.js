const Server = require('./server/webserver');
const server = new Server();

server.run(8080, {
  handleErrors: true
});
