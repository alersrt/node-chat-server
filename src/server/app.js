const uuid = require('uuid/v4');
const express = require('express');
const passport = require('passport');
const port = 8081;

const app = express();
const expressWs = require('express-ws')(app);

const auth = require('./router/authRouter');

app.use(passport.initialize());
app.use(passport.session());

let emptyRouter = express.Router().ws('/', (ws, req) => {});

app.use('/auth', auth);

let chatRouter = express.Router().ws('/:chatId', async (ws, req) => {
  ws.on('message', async (data) => {

  });
});

app.use('/chat', emptyRouter, chatRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});