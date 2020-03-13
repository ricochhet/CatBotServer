class AdminRoute {
  constructor(manager) {
    this.manager = manager;
  }

  route(accounts_map) {
    const self = this;
    this.manager.addRoute('/admin', 'admin/login.ejs', function(
      render,
      req,
      res
    ) {
      res.render(render);
    });

    this.manager.addExtendedRoute(
      '/admin/dashboard',
      'admin/dashboard.ejs',
      function(render, req, res, authObject) {
        res.render(render);
      },
      self.manager.addAuthUtil
    );

    this.manager.addPost('/admin/logout', function(req, res) {
      delete req.session.user_id;
      res.redirect('/');
    });

    this.manager.addPost('/admin/login', function(req, res) {
      const username = req.body.username;
      const password = req.body.password;

      for (let [k, v] of accounts_map) {
        const account = accounts_map.get(k);
        if (account.username == username && account.password == password) {
          req.session.user_id = username;
          res.redirect('/admin/dashboard');
          break;
        } else {
          res.redirect('/');
        }
      }
    });
  }
}

module.exports = new AdminRoute();
