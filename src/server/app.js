const {channels} = require('./repository/channelList');
const uuid = require('uuid/v4');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportFacebook = require('./auth/facebook');
const port = 8081;

const app = express();
const expressWs = require('express-ws')(app);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(bodyParser.json());
app.use(session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
    },
));
app.use(passport.initialize());
app.use(passport.session());

let fbRouter = express.Router();

fbRouter.get('/facebook', passportFacebook.authenticate('facebook'));

fbRouter.get('/facebook/callback', passportFacebook.authenticate('facebook', {failureRedirect: '/auth/facebook'}),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

app.use('/auth', fbRouter);

channels.create('main');

let emptyRouter = express.Router().ws('/', (ws, req) => {});
let chatRouter = express.Router().ws('/:chatId', async (ws, req) => {
  let chatId = req.params.chatId;
  channels.join(chatId, req.sessionId);

  ws.on('message', async (data) => {
    let participants = await channels.getParticipants(chatId);
    expressWs.getWss().clients.forEach(client => {
      if (!!participants.find(participant => participant.id === client.id)) {
        client.send(data);
      }
    });
  });
});

app.use('/chat', emptyRouter, chatRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});