const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const FACEBOOK_CALLBACK_URL = !!process.env.FACEBOOK_CALLBACK_URL
    ? process.env.FACEBOOK_CALLBACK_URL
    : 'https://localhost:8081/auth/facebook/callback';

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const userService = require('../service/userService')('facebook');

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    let user = await userService.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(new FacebookStrategy({
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: FACEBOOK_CALLBACK_URL,
    },
    async function(accessToken, refreshToken, profile, done) {
      try {
        let user = await userService.findOrCreate(profile.id, profile);
        done(null, user);
      } catch (error) {
        done(error);
      }
    },
));

module.exports = passport;