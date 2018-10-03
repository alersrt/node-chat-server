const uuid = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const https = require('https');
const jwt = require('jsonwebtoken');
const express = require('express');
const passport = require('./auth/facebook');
const port = 8081;

const app = express();
const httpsServer = https
    .createServer({
      key: fs.readFileSync(path.resolve(__dirname, '../../ssl/server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, '../../ssl/server.cert')),
    }, app);
const expressWs = require('express-ws')(app, httpsServer);

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook', {session: false}));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/error',
      session: false,
    }),
    (req, res) => {
      if (!req.user) {
        return res.sendStatus(401);
      }
      let token = jwt.sign({id: req.user.id}, 'my-secret', {expiresIn: 60 * 120});
      res.setHeader('x-auth-token', token);
      res.status(200).send({id: req.user.id});
    });

app.ws('/chat', (ws, req) => {});
app.ws('/chat/:chatId', async (ws, req) => {
  ws.on('message', async (data) => {
  });
});

httpsServer.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});