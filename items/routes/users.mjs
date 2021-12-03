import express  from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import * as usersModel from '../models/verifyUser.mjs';

const LocalStrategy = passportLocal.Strategy;
var router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('login',{
    title: 'Login',
      message: req.flash('error'),
      error: req.body
      });
});

 router.post('/login', passport.authenticate('local',
     { successRedirect: '/',
         failureRedirect: '/users/login',
         failureFlash: true
               }));

  router.get('/logout', (req, resp, next) => {
    req.session.destroy();
    req.logout();
    resp.clearCookie('itemscookie');
    resp.redirect('/');
  });

  passport.use(new LocalStrategy ( async (username, password, done) => {
    console.log('Trying to login', username);
    try {
      let resp = await usersModel.check(username, password),
          check = resp.data;

      if (check !== 'Invalid username/password!') {
        console.log('The user has logged in! line 67', username);
        done(null, {id: check.username, username: check.username});
      }
      else {
        done(null, false, {message: 'Invalid username/password!' });
      }
    }
    catch (e) {
      done(e);
    }
  }))

  passport.serializeUser((user, done)=> {
    try {
      console.log('serialize user', user);
      done(null, user.username);
    } catch (e) {
      done(e);
    }
  });
  
  passport.deserializeUser(async (username, done) => {
    try {
      console.log('deserialize user', username);
      let resp = await usersModel.find(username);
      done(null, resp.data);
    } catch (e) {
      done(e,false);
    }
  });

function authenticate(req, resp, next) {
    try {
        console.log('Authenticating user', req.user);
        if (req.user) {
            console.log('The user logged in! line 46', req.user);
            next();
        } else {
            console.log('Login failed. line 49');
            resp.redirect('/users/login')
        }
    } catch (e) {
        next(e);
    }
}

  function initPassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
  };

export {router, authenticate, initPassport};
