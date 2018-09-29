# Simple chat

This is the simple chat-server worked via websocked. The server has the next features:

- supporting of conversations in channels
- private messages
- authentication via social networks

## Protocol description

Message in websocket has the next format:

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