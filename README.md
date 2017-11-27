# CSGO Coach
This webpage is an game-integrated stratbook for csgo clans. 
This application can collect all your strats and shows the different task for every team member in the live game.
Also this application includes a live visualization of the current loadout of every member and shows statistics to every team member.

## Technical implementation
Every client needs to set a specific counter-strike config file, 
so that the csgo client send necessary player-informations to the web-application.
At the otherside a nodejs application collects and processes the data.
An angular application is responsible for the visualization of the provided data.
