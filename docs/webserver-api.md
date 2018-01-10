# Webserver - API

## Insecure routes
```
/                       get  <> static files
/api/csgo/              post <> csgo game integration input

/api/steam/authenticate get  <> redirect to steam-auth
/api/steam/verify       get  <> callback from steam-auth
/api/steam/status       get  <> status of current session
/api/steam/logout       get  <> delete current session
```

## Secure routes
```
/api/team/              put  <> creates or updates a specific team
/api/team/:id           get  <> get specific team  
/api/team/              get  <> get all teams for the specific user

/api/room/:name         get  <> gets a room token to create a socket.io connection
```
