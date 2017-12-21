# Webserver - API

## Insecure routes
```
/                   get  <> static files
/csgo/              post <> csgo game integration input

/steam/authenticate get  <> redirect to steam-auth
/steam/verify       get  <> callback from steam-auth
/steam/status       get  <> status of current session
/steam/logout       get  <> delete current session
```

## Secure routes
```
/api/team/          put  <> creates or updates a specific team
/api/team/:id       get  <> get specific team  
/api/team/          get  <> get all teams for the specific user
```