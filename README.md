# CSGO Coach
This webpage is an game-integrated stratbook for csgo clans.

## Features
- Strat collection for each map with different tasks for every user via markdown
- Live game integration with visualization of player loadout and round history
- Visualization of round-tasks for an specific player during the execute

## Technical implementation
Every client needs to set a specific counter-strike config file, 
so that the csgo client send necessary player-informations to the web-application.
At the otherside a nodejs application collects and processes the data.
An angular application is responsible for the visualization of the provided data.

## Used sources
- [Steam csgo api](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)
