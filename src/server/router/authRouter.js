const passportFacebook = require('../auth/facebook');
const express = require('express');

let fbRouter = express.Router();

fbRouter.get('/facebook', passportFacebook.authenticate('facebook'));

fbRouter.get('/facebook/callback', passportFacebook.authenticate(
    'facebook',
    {failureRedirect: '/'},
));

module.exports = fbRouter;