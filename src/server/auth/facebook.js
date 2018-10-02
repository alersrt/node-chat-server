const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
    },
    function(accessToken, refreshToken, profile, done) {

    },
));

module.exports = passport;