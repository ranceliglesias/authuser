module.exports = function(app, passport) {
  // Show the home page
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  // Show the profile page
  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', {
      user: req.user
    });
  });

  // Logout of profile
  app.get('/logout', (req, res) => {
    res.redirect('/');
    });

  // Local Strategy
  app.get('/login', (req, res) => {
    res.render('login.ejs', {message: req.flash('loginMessage')});
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

// Show the form
  app.get('/signup', (req, res) => {
    res.render('signup.ejs', {message: req.flash('signupMessage')});
  });

// signem up
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // Facebook Strategy
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'}));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/',
  }));

};

// Check is Loogedin
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
