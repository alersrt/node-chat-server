# Simple chat

This is the simple chat-server worked via websocket. The server has the next features:

- supporting of conversations in channels
- private messages
- authentication via social networks

## Protocol description

### Text messages

User's message in websocket has the next format:

```json
{
  "target": "username",
  "message": "message"
}
```

In `target` field need to specify channel or username according to the next rules:
- channel specified via `#` as `#channelname`
- user specified via `@` as `@username`

Channel's and user's names can't to contain special symbols of course.

### Server events

Server can send messages with the next format:

```json
{
  "id": "dbcf5b4a-c0ef-4ddf-8885-f7b6c0631471",
  "event": "JOIN"
}
```

Field `event` can accept such values as `JOIN` and `LEFT`. 