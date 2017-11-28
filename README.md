# CSGO Coach
 is an game-integrated stratbook for csgo clans.

## Features
- Strat collection for each map with different tasks for every user via markdown/wysiwyg editor
- Live game integration with visualization of player loadout and round history
- Visualization of round-tasks for an specific player during the execute

## Technical implementation
Every client needs to set a specific counter-strike config file, 
so that the csgo client is able to send necessary player-informations to the server-application(backend).
At the otherside a nodejs application collects, processes and sends the data to an angular application(frontend).

## Used sources
- [Steam csgo api](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)
- [nodejs](https://nodejs.org/en/)
- [socket.io](https://socket.io/)
- [angular](https://angular.io/)
