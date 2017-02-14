module.exports = {
  preventUnauthorizedAccess: function(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/');
  },

  redirectToUserIfSignedIn: function(req, res, next) {
    if (!req.isAuthenticated())
      return next();

    res.redirect('/user');
  }
};
