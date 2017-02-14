var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var authy = require('./authy');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // local-signup
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    var userSubmitted = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password_confirm: req.body.password_confirm,
      countryCode: req.body["authy-countries"],
      phone: req.body["authy-cellphone"]
    };

    // validation rules for expressValidator
    req.assert('first_name', 'First Name field is required').notEmpty();
    req.assert('authy-countries', 'Country Code field is required').notEmpty();
    req.assert('authy-cellphone', 'Mobile Phone field is required').notEmpty();
    req.assert('email', 'E-mail field is required').notEmpty();
    req.assert('email', 'A valid E-mail is required').isEmail();
    req.assert('password', 'Password field is required').notEmpty();
    req.assert('password_confirm', 'Confirm Password field is required').notEmpty();

    var errors = req.validationErrors();

    // if form validation fails;
    if (errors) {
      const flashMsg =[];
      errors.forEach(err => {
        flashMsg.push(err.msg);
      });

      var flashMsgHtml = flashMsg.join("<br />");
      return done(null, false, req.flash('signupMessage', flashMsgHtml));
    }

    // if password confirmation fails;
    if (password !== userSubmitted.password_confirm) {
      return done(null, false, req.flash('signupMessage', 'Typo! Password mismatch.'));
    }

    process.nextTick(function() {
      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err)
            return done(err);

        if (user) {
            return done(null, false, req.flash('signupMessage', 'Oops! This e-mail is already taken.'));
        } else {
          // register user @authy
          authy.registerUser(email, userSubmitted.phone, userSubmitted.countryCode, function(err, res) {
            if (err) {
              console.log(err);
              return done(null, false, req.flash('signupMessage', 'Oh! Registering with `Authy` has failed.'));
            }

            // if there is no user with that email
            // create the user
            var newUser = new User();
            // set the user's local credentials
            newUser.first_name = userSubmitted.first_name;
            newUser.last_name = userSubmitted.last_name;
            newUser.countryCode = userSubmitted.countryCode;
            newUser.phone = userSubmitted.phone;
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.authyId = res.user.id;

            // save the user
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          });
        }
      });
    });
  }));

  // llocal-signin
  passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    var verificationCode = req.body.verificationCode;

    // validation rules for expressValidator
    req.assert('email', 'E-mail field is required').notEmpty();
    req.assert('email', 'A valid E-mail is required').isEmail();
    req.assert('password', 'Passowrd field is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
      const flashMsg =[];
      errors.forEach(err => {
        flashMsg.push(err.msg);
      });

      var flashMsgHtml = flashMsg.join("<br />");
      return done(null, false, req.flash('signinMessage', flashMsgHtml));
    }

    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err)
        return done(err);

      if (!user)
        return done(null, false, req.flash('signinMessage', 'Ah! You must be new.., Please create an account before sign in.'));

      // if the user is found but the password is incorrect
      if (!user.validPassword(password))
        return done(null, false, req.flash('signinMessage', 'Oops! Incorrect password.'));

      // verify authy
      authy.verifyToken(user.authyId, verificationCode, function(err, res) {
        if (err) {
          return done(null, false, req.flash('signinMessage', 'Oops! User verification is failed.'));
        }

        return done(null, user);
      });
    });
  }));
};
