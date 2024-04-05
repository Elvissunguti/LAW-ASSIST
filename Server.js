const express = require('express');
const https = require('https');
const fs = require('fs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./src/Backend/Model/User');
const cors = require("cors");
const config = require('./src/Backend/Config/Config');


const app = express();
const PORT = process.env.PORT || 8080;


mongoose.connect(config.mongodbURI, 
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(cors());
app.use(express.json());
app.use(session({ secret: 'SECRET_KEY', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with Google OAuth 2.0
passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }, (err, user) => {
      if (err) return done(err);
      if (user) {
        // User already exists, return user
        return done(null, user);
      } else {
        // Create new user
        const newUser = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          chatHistory: []
        });
        newUser.save((err) => {
          if (err) return done(err);
          return done(null, newUser);
        });
      }
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


app.get('/auth/google',
       passport.authenticate('google', { scope: ['profile', 'email'] })
   );

app.get('/auth/google/callback',
       passport.authenticate('google', { failureRedirect: '/' }),
       (req, res) => {
           // Redirect after successful authentication
           res.redirect('/dashboard');
       }
   );
app.get('/logout', (req, res) => {
       req.logout();
       res.redirect('/');
   });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

