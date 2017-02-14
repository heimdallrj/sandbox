var authy = require('authy')('ZHj4Ll4t3has9R3gpmCF94PZ6l9CAwK8');

module.exports = {
  registerUser: function(email, phone, cc, cb) {
    authy.register_user(email, phone, cc, function (err, res) {
      if (err) {
        return cb(err);
      }
      return cb(false, res);
    });
  },

  sendSMS: function(authyUserId, cb) {
    authy.request_sms(authyUserId, function (err, res) {
      if (err) {
        return cb(err);
      }
      return cb(false, res);      
    });    
  },

  verifyToken: function(authyUserId, token, cb) {
    authy.verify(authyUserId, token, function (err, res) {
      if (err) {
        return cb(err);
      }
      return cb(false, res);     
    });
  }
};
