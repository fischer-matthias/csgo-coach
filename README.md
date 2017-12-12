# CSGO Coach
 is an game-integrated stratbook application for csgo clans.

## Features
- Strat collection for each map with different tasks for every user via markdown/wysiwyg editor
- Live game integration with visualization of player loadout and round history
- Visualization of round-tasks for an specific player during the execute

## Technical implementation
Every client needs to set a specific counter-strike config file, 
so that the csgo client is able to send necessary player-informations to the server-application(backend).
At the otherside a nodejs application collects, processes and sends the data to an angular application(frontend).

## Server-configuration file
**\server\config.js :**
```
const CONFIG = {
    
    WEB_SERVER_URL: 'http://localhost',
    WEB_SERVER_PORT: 4200,
    WEB_SERVER_INDEX_PATH: '/app/dist/',

    STEAM_API_KEY: 'xxx',
    SESSION_SECRET: 'xxx',

    MONGODB_HOST: '127.0.0.1',
    MONGODB_PORT: '21497',
    MONGODB_USER: 'csgocoach',
    MONGODB_PASS: 'xxx',
    MONGODB_NAME: 'csgocoach',
    
    LOGGING_ENABLED: true
};

module.exports = CONFIG;
```

## Used sources
- [Steam csgo api](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)
- [nodejs](https://nodejs.org/en/)
- [socket.io](https://socket.io/)
- [angular](https://angular.io/)
