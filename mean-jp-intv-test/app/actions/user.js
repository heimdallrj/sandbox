var User = require('../models/user');
var gravatar = require('gravatar');

module.exports = {
  getUserByEmail: function(email, cb) {
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) {
        return cb(err);
      }
      return cb(false, user);
    });    
  },

  getAvatarByEmail: function(email) {
    return gravatar.url(email);
  }
};
