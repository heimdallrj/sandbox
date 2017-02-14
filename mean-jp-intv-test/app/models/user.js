var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  countryCode: String,
  phone: String,
  local: {
    email: String,
    password : String,
  },
  verificationCode: String,
  authyId: String,
});

// hashing
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// password validation
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// verification code
userSchema.methods.validVerificationCode = function(code) {
  return code === this.verificationCode;
};

module.exports = mongoose.model('User', userSchema);
