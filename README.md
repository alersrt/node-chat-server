# Simple chat

This is the simple chat-server worked via websocket. The server has the next features:

- supporting of conversations in channels
- private messages
- authentication via social networks

## Certificates

You should generate certs with help of the next command (should be run in root dir of the project):
```
$ mkdir -p ssl && openssl req -nodes -new -x509 -keyout ssl/server.key -out ssl/server.cert
```

## Environment variables

- `FACEBOOK_CLIENT_ID` - identifier of the facebook's application
- `FACEBOOK_CLIENT_SECRET` - facebook's application token
- `FACEBOOK_CALLBACK_URL` - valid OAuth redirect URI, default value is `https://localhost:8081/auth/facebook/callback`
- `CS_POSTGRES_URL` - url for PostgreSQL database, default value is `jdbc:postgresql://localhost:5432/testdb`
- `CS_POSTGRES_USERNAME` - username of the database, default value is `postgres`
- `CS_POSTGRES_PASSWORD` - password for this username, default value is `postgres`

## Protocol description

### Commands

User can to send special messages for executing of some actions such as create channel, join to there etc. For example:

```json
{
  "type": "command",
  "action": "create",
  "target": "#main"
}
```

Field `action` has the next values: `create`, `destroy`, `join`, `leave` for channels.

### Text messages

User's message in websocket has the next format:

```json
{
  "type": "message",
  "target": "username",
  "message": "message"
}
```

In `target` field need to specify channel or username according to the next rules:
- channel specified via `#` as `#channelname`
- user specified via `@` as `@username`

Channel's and user's names can't to contain special symbols of course.

### Server events

Server can send events' messages with the next format:

```json
{
  "type": "event",
  "emitter": "participant",
  "identifier": "dbcf5b4a-c0ef-4ddf-8885-f7b6c0631471",
  "event": "join"
}
```

When `emitter` field is:
- `participant` then `event` has value of `join` or `left`
- `channel` then `event` is `create` or `destroy`

## Order of user's flow

### 1. Create channel

Some user created a channel:

```json
{
  "type": "command",
  "action": "create",
  "target": "#main"
}
```

Server responses to all clients of the server: 

```json
{
  "type": "event",
  "emitter": "channel",
  "identifier": "#main",
  "event": "create"
}
```

### 2. Join into channel

User wants to join into channel:

```json
{
  "type": "command",
  "action": "join",
  "target": "#main"
}
```

Server responds to all channel's participants:

```json
{
  "type": "event",
  "emitter": "participant",
  "identifier": "dbcf5b4a-c0ef-4ddf-8885-f7b6c0631471",
  "event": "join"
}
```

### 3. Send message to channel

User sends message into channel:

```json
{
  "type": "message",
  "target": "#main",
  "message": "Hello guys!"
}
```

Server broadcasts this message to all channel's participants.

```json
{
  "type": "message",
  "emitter": "participant",
  "target": "#main",
  "identifier": "dbcf5b4a-c0ef-4ddf-8885-f7b6c0631471",
  "message": "Hello guys!"
}
```

This server's answer needs for client side.

### 4. Channel leaving

User leaves the specified channel:

```json
{
  "type": "command",
  "action": "leave",
  "target": "#main"
}
```

Server notify other participants of the channel about this event:

```json
{
  "type": "event",
  "emitter": "participant",
  "identifier": "dbcf5b4a-c0ef-4ddf-8885-f7b6c0631471",
  "event": "left"
}
```

### 5. Channel destroying

Somebody destroys channel:

```json
{
  "type": "command",
  "action": "destroy",
  "target": "#main"
}
```

and server notifies all connected clients about it:

```json
{
  "type": "event",
  "emitter": "channel",
  "identifier": "#main",
  "event": "destroy"
}
```