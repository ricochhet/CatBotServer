const Server = require('./api/server');
const server = new Server();
server.run(8080, {
  handleErrors: true,
  adminDashboard: false
});