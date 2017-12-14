# CSGO Coach
 is a game-integrated stratbook application for csgo clans.

## Features
- [ ] Strat collection for each map with different tasks for every user via markdown/wysiwyg editor
- [ ] Live game integration with visualization of player loadout and round history
- [ ] Visualization of round-tasks for an specific player during the execute

## Possible features
- Enemy economy tracker [#8](https://github.com/matze6633/csgo-coach/issues/8)
- Bomb time [#9](https://github.com/matze6633/csgo-coach/issues/9)

## Technical implementation
Every client needs to set a specific counter-strike config file, 
so that the csgo client is able to send necessary player-informations to the server-application(backend).
At the otherside a nodejs application collects, processes and sends the data to an angular application(frontend).

![alt text](https://github.com/matze6633/csgo-coach/blob/master/docs/overview.png "tech-overview")

## Server-configuration file
A server-configuration file is necessary to start the server application. Security is the reason that the file is not available in the git repository, so you have to create your own configuration file:

**\server\config.js :**
```
const CONFIG = {
    
    WEB_SERVER_URL: 'http://csgo-coach',
    WEB_SERVER_PORT: 4200,
    WEB_SERVER_INDEX_PATH: '/wherever/the/bundled/files/are',

    STEAM_API_KEY: 'highly_secure_secret',
    SESSION_SECRET: 'highly_secure_secret',

    MONGODB_HOST: '192.168.178.84',
    MONGODB_PORT: '21111',
    MONGODB_USER: 'mongo_user',
    MONGODB_PASS: 'highly_secure_password',
    MONGODB_NAME: 'database_name',
    
    LOGGING_ENABLED: true
};

module.exports = CONFIG;
```

## Credits
- [Valve dev](https://developer.valvesoftware.com/wiki/Main_Page) (Steam auth / Game integration)

- [nodejs](https://nodejs.org/en/) (Backend)
- [express.io](https://expressjs.com/) (simple Http server)
- [socket.io](https://socket.io/) (websocket connection)

- [angular](https://angular.io/) (Frontend)
- [angular material](https://material.angular.io/) (mobile friendly ui elements)

- [mongodb](https://www.mongodb.com/) (Database)

- [Liquid Wiki](http://wiki.teamliquid.net/) (Weapon icons)

