# CSGO Coach Server

## How to configure the csgo-client
Create the following config file in the config directory of counterstrike, 
for example `D:\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg\gamestate_integration_csgo-coach.cfg`.
This file should contain these lines:
```
"CSGO Coach"
{
 "uri" "http://127.0.0.1:3000"
 "timeout" "5.0"
 "buffer"  "0.1"
 "throttle" "0.5"
 "heartbeat" "60.0"
 "auth"
 {
   "token" "Q79v5tcxVQ8u"
 }
 "data"
 {
   "provider"                 "1"
   "map"                      "1"
   "round"                    "1"
   "player_id"                "1"
   "player_state"             "1"      
   "allplayers_state"         "1"      
   "allplayers_match_stats"   "1"  
   "allplayers_weapons"       "1"      
  }
}
```

## How to start the server
1. Install dependencies with the command `npm i` or `npm install`
2. Configure the servers in the config.js
3. Start the servers with the command `node index.js`

## Dependencies
- [nodejs with npm](https://nodejs.org/en/)

## Used sources
- [CSGO Game integration guide](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)
