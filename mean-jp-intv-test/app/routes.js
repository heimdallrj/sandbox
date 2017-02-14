var middlewares = require('./middlewares');
var actions = require('./actions/user');
var authy = require('../app/actions/authy');

module.exports = function(app, passport) {
  app.get('/',
    middlewares.redirectToUserIfSignedIn,
    function(req, res) {
      res.render('index', { message: req.flash('signupMessage') });
    }
  );

  // sign-up
  app.post('/',
    passport.authenticate('local-signup',
    {
      successRedirect: '/sign-in',
      failureRedirect: '/',
      failureFlash: true
    })
  );

  // sign in
  app.get('/sign-in',
    middlewares.redirectToUserIfSignedIn,
    function(req, res) {
      res.render('sign-in', { message: req.flash('signinMessage') }); 
    }
  );

  app.post('/sign-in', function(req, res) {
    // validate request
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
      res.render('sign-in', { message: flashMsgHtml });
    }

    // validate user
    actions.getUserByEmail(req.body.email, function(err, user) {
      if (err) {
        res.render('sign-in', { message: 'Ah! You must be new.., Please create an account before sign in.' });
      }

      if (user && user.authyId) {
        if (!user.validPassword(req.body.password)) {
          res.render('sign-in', { message: 'Oops! Incorrect password.' });
        } else {

          authy.sendSMS(user.authyId, function(err) {
            if (err) {
              res.render('sign-in', { message: 'Verification SMS sending has failed.' });
            }

            req.session['email'] = req.body.email;
            req.session['password'] = req.body.password;
            req.session['phone'] = user.phone;

            res.redirect('/sign-in/verify');
          });

        }

      } else {
        res.render('sign-in', { message: 'Oops! Invalid User.' });
      }
    });
  });

  app.get('/sign-in/verify',
    middlewares.redirectToUserIfSignedIn,
    function(req, res) {
      res.render('verify-login', {
        email_field: req.session.email,
        password_field: req.session.password,
        phone_field: req.session.phone
      });
    }
  );

  app.post('/sign-in/verify',
    passport.authenticate('local-signin', {
      successRedirect: '/user',
      failureRedirect: '/sign-in',
      failureFlash: true
    })
  );

  app.get('/user',
    middlewares.preventUnauthorizedAccess,
    function(req, res) {
      var data = {
        name: req.user.first_name + ' ' + req.user.last_name,
        avatar: actions.getAvatarByEmail(req.user.local.email)
      };

      res.render('user', { data : data }); 
    }
  );

  // logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};
