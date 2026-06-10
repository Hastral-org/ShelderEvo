//#region META
/*: 
 * @plugindesc [Tier_1] v1.4.1 Shelder Evolution Core plugin
 * @author MaTheRaptor
 * @target MZ
 * 
 * @help
 * This plugin serves as the core initialization and runtime functions for our series 
 * of plugins designed for the Shelder Evolution series.
 * 
 * Current features:
 * - "MAGPIE" code structure that emulates an AI server
 * - "HIMS system" function prototype to quickly setup game systems from template
 * - "HIMS console" custom UI for logging and messaging with the user
 * - "Game_Creature" function prototype to handle individual creature functions
 * - "Game_Group" function prototype to handle group of creatures functions
 * - "PDL manager" system to handle custom data hooked up to $gameSystem database
 * - "SECore" runtime and utility functions
 * - User can start a new game and SECore will initialize all the necessary scaffolding
 * - User can access a territory and SECore will handle scene transition and data hookup
 * - Territory Deck is a CGC actor1 zone not directly accessible to the user
 * - (addon for Theo.StackingStates) incremental removal of the state stack
 * 
 * Planned features:
 * - Full territory scene handling
 * - Enemy handling
 * - Update of PDL data 
 * - decouple of Territory Deck from actor1 zone
 * 
 * 
 * v 1.4.1 - plugin structure redesign
 * 
 * v 1.4.0 - PDL overhaul
 * - added new classes Creature_Pool, Territory_Pool, and Game_Region
 * - added hash library for creatures and territories
 * - moved territory pools inside regions
 * - fixed: bloated PDL code
 * 
 * v 1.3.3 - fixed: HIMS and MAGPIE code not in MAGPIE.js
 * 
 * v 1.3.2 
 * - fixed plugin parameters not working
 * - fixed SECore.timeOfDay not setting "night" correctly
 * 
 * v 1.3.1
 * - updated plugin structure with tidier dictionary and plugin parameters
 * 
 * v A.1.3.0 
 * - work towards prototype 3
 * - switched back to Myth Atelier CGC plugin with many fixes and improvements
 * - added MAGPIE utility plugin
 * - added EquipCGC addon
 * - added clockWindow addon
 * - added EnemyInfoWindow addon
 * - added CGC stateInfoWindow fix
 * - added framework for a future BattleCore addon
 * 
 * v A.1.0.1 working towards Prototype 2 : switching away from Myth Atelier CGC plugin
 * - spawnEnemy function in Battle Scene only 
 * 
 * v A.1.0.0 Prototype 1 : failed to deploy on itch.io web version due to unknown error
 * 
 * v A.0.9
 * - added expansion to Theo.StackingStates to handle incremental removal of the state stack
 * - fixed creature spawn routine
 * 
 * v A.0.8
 * - bug fixes and clean up
 * - implemented a working Game_Battler expansion function that refreshes habitat states
 * - SE.spawnEnemy is starting to work, but there are a few bugs still
 * 
 * v A.0.7
 * - code overhaul
 * - removed AI-generated code
 * - major rewrite of the entire structure
 * - mimicking RPG Maker prototyping functions
 * - hooking up to $gameSystem database manager for PDL
 * - initial implementation of custom classes of game functions to modularize the code
 * - partial transfer of SECore functions to prototype functions for granular access
 * - 
 * 
 * v A.0.6
 * - code overhaul
 * - removed most AI-generated functions -- they weren't working -- except the day suffix function and a few other utilities
 * - first implementation of the PDL Manager structure
 * - fixed initialization code
 * - added placeholders for future code
 * - integrated code structure as SECore and PDLManager
 * 
 * v A.0.5
 * - code rewrite
 * - help and parameters sections cleanup
 * - SEtimer moved to GameLoopTimer common event 
 * - setDate function moved to GameLoopTimer script call
 * - Calendar system is referenced by the above-mentioned script call
 * - check for currentCalendar
 * - change Day/Month/Year/YearDay according to Calendar
 * - check for LeapMonth
 * - check for LeapYear
 * - update isLeapMonth / isLeapYear switches
 * - update NewYearsEve / NewYearsDay switches
 * 
 * v A.0.4
 * - code rewrite 
 * - help and parameters sections rewrite
 * - variables and switches get initialized when needed
 * - variables and switches can be adjusted in parameters
 * 
 * v A.0.3
 * - cleaning of unneeded code
 * - cleaning of plugin help section
 * - debugging
 * 
 * v A.0.2
 * - consolidation of core + timesystem plugins
 * 
 * v A.0.1
 * - rewrite of the time system code
 * 
 * 
 * @command SetTimeScale
 * @text Change Time Scale
 * @desc Changes the current Time scale
 * 
 * @arg newTimeScale
 * @type select
 * @option Compressed
 * @value 60
 * @option 1 hour days
 * @value 24
 * @option 4 hours days
 * @value 6
 * @option Real-time
 * @value 1
 * @default Compressed
 * @desc Game Seconds for each playtime second 
 * 
 * @command SetCalendar
 * @text Change time and calendar system
 * @desc Changes the current timing and calendar system
 * 
 * @arg newCalendar
 * @type select
 * @option Gregorian calendar (Earth standard)
 * @value 0
 * @option Sabi calendar (Shelder standard)
 * @value 1
 * @desc Choose the desired time and calendar system
 * 
 * @param Core settings
 * 
 * @param TIME
 * @text Time System
 * @parent Core settings
 * @type struct<TIME>
 * 
 * @param proceduralSpawn
 * @Text Procedural Spawn
 * @parent Core settings
 * @desc Toggle procedural spawn system ON or OFF
 * @type boolean
 * @default true
 * 
 * @param Core Dictionary
 * 
 * @param cVar
 * @text Variables
 * @parent Core Dictionary
 * @type struct<cVar>
 * 
 * @param Switches
 * @parent Core Dictionary
 * @type struct<switches>
 * 
 * @param CommonEvents
 * @parent Core Dictionary
 * @type struct<CE>
 * 
 * @param Skills
 * @parent Core Dictionary
 * 
 * @param commonSkills
 * @parent Skills
 * @type struct<cSkills>
 * 
 * 
 * @param States
 * @parent Core Dictionary
 * 
 * @param blocks
 * @text Block states
 * @parent States
 * @type struct<blocks>
 * 
 * @param injuries
 * @text Injury states
 * @parent States
 * @type struct<injuries>
 * 
 * @param moves
 * @text Move states
 * @parent States
 * @type struct<moves>
 * 
 * @param moods
 * @text Mood states
 * @parent States
 * @type struct<moods>
 * 
 * @param postures
 * @parent States
 * @text Posture states
 * @type struct<postures>
 * 
 * @param morale
 * @parent States
 * @text Morale states
 * @type struct<morale>
 * 
 * @param habCombos
 * @parent States
 * @text Hab Combo states
 * @type struct<habCombos>
 * 
 * @param buffs
 * @parent States
 * @text Buff states
 * @type struct<buffs>
 * 
 * @param combos
 * @parent States
 * @text Combo states
 * @type struct<combos>
 * 
 * @param Core Windows
 * 
 * @param SEclock
 * @parent Core Windows
 * @text Clock Window
 * @desc Settings for the Clock Window
 * @type struct<clock>
 * 
 * @param mapCursor
 * @parent Core Windows
 * @text Map Cursor
 * @desc Settings for the Map cursor
 * @type struct<mapcursor>
 * 
 * @param Core Utilities
 * 
 * @param SEdice
 * @text Dice
 * @parent Core Utilities
 * @desc Settings for the Dice
 * @type struct<dice>
 * 
 * @param CGC integration
 * 
 * @param zoneTerritoryId
 * @parent CGC integration
 * @text Territory
 * @desc Id of the Terriytory deck
 * @type number
 * @default 2
 * 
 * @param zoneWildId
 * @parent CGC integration
 * @text Wild
 * @desc ID of the Wild Zone
 * @type number
 * @default 3
 * 
 * @param ICV
 * @parent CGC integration
 * @text Independent Card Variables
 * @desc IDs of common ICV used
 * @type struct<ICV>
 */
/*~struct~TIME:
 * 
 * 
 * @param TimeScale
 * @text Time Scale
 * @type select
 * @option Compressed
 * @value 60
 * @option 1 hour days
 * @value 24
 * @option 4 hours days
 * @value 6
 * @option Real-time
 * @value 1
 * @default 60
 * @desc Game Seconds for each playtime second 
 * 
 * @param DefaultCalendar
 * @text Default Calendar
 * @type select
 * @option Gregorian calendar (Earth standard)
 * @value 0
 * @option Sabi calendar (Shelder standard)
 * @value 1
 * @default 1
 * @desc Choose the desired time and calendar system 
 * 
 * @param calendar
 * @text Current Calendar 
 * @desc Variable used to store the current calendar
 * @type variable
 * @default 140
 * 
 * @param timesystem
 * @text TimeSystem 
 * @desc Variable used to store the current timesystem
 * @type variable
 * @default 141
 * 
 * @param days
 * @text Days 
 * @desc Variable used to store the days in the current month
 * @type variable
 * @default 142
 * 
 * @param months
 * @text Months 
 * @desc Variable used to store the months in the current year
 * @type variable
 * @default 143
 * 
 * @param leapYear
 * @text Leap Year 
 * @desc Variable used to store the current leap year accumulator
 * @type variable
 * @default 144
 * 
 * @param leapMonth
 * @text Leap Month 
 * @desc Variable used to store the leap month
 * @type variable
 * @default 145
 * 
 * @param gameDay
 * @text GameDay 
 * @desc Variable used to store the current GameDay accumulator
 * @type variable
 * @default 132
 * 
 * @param epoch
 * @text Epoch 
 * @desc Variable used to store the current Epoch accumulator
 * @type variable
 * @default 129
 * 
 * @param yearDay
 * @text YearDay 
 * @desc Variable used to store the current day in the year accumulator
 * @type variable
 * @default 139
 * 
 * @param second
 * @text Second 
 * @desc Variable used to store the current Second
 * @type variable
 * @default 121
 * 
 * @param minute
 * @text Minute 
 * @desc Variable used to store the current Minute
 * @type variable
 * @default 122
 * 
 * @param hour
 * @text Hour 
 * @desc Variable used to store the current Hour
 * @type variable
 * @default 123
 * 
 * @param day
 * @text Day 
 * @desc Variable used to store the current Day
 * @type variable
 * @default 124
 * 
 * @param month
 * @text Month 
 * @desc Variable used to store the current Month
 * @type variable
 * @default 125
 * 
 * @param year
 * @text Year 
 * @desc Variable used to store the current Year
 * @type variable
 * @default 126
 * 
 * @param ToD
 * @text Current Time of Day 
 * @desc Variable used to store the current phase of the day
 * @type variable
 * @default 128
 * 
 * @param leap
 * @text Leap 
 * @desc Variable used to store the current leap accumulator
 * @type variable
 * @default 131
 * 
 * @param seasonID
 * @text Season ID 
 * @desc Variable used to store the ID of the current Season
 * @type variable
 * @default 133
 * 
 * @param dayName
 * @text Day Name 
 * @desc Variable used to store the name of the current Day
 * @type variable
 * @default 146
 * 
 * @param monthName
 * @text Month Name 
 * @desc Variable used to store the name of the current Month
 * @type variable
 * @default 147
 * 
 * @param sunrise
 * @text Sunrise 
 * @desc Variable used to store the current sunrise data
 * @type variable
 * @default 134
 * 
 * @param sunset
 * @text Sunset 
 * @desc Variable used to store the current sunset data
 * @type variable
 * @default 135
 * 
 * @param season
 * @text Season
 * @desc Variable used to store the name of the current Season
 * @type variable
 * @default 137
 * 
 * @param seasonalDelay
 * @text Seasonal Delay
 * @desc Variable used to store the seasonal delay data
 * @type variable
 * @default 148
 * 
 * @param isLeapMonth
 * @text Leap Month trigger
 * @desc Switch used to trigger the Leap Month event
 * @type switch
 * @default 121
 * 
 * @param newYearsEve
 * @text New Year's Eve trigger
 * @desc Switch used to trigger the New Year's Eve event
 * @type switch
 * @default 123
 * 
 * @param newYearsDay
 * @text New Year's Day trigger
 * @desc Switch used to trigger the New Year's Day event
 * @type switch
 * @default 124
 * 
 * @param isLeapYear
 * @text Leap Year trigger
 * @desc Switch used to trigger the Leap Year event
 * @type switch
 * @default 125
 * 
 * @param newDay
 * @text New Day trigger
 * @desc Switch used to trigger the New Day event
 * @type switch
 * @default 126
 * 
 * @param newMonth
 * @text New Month trigger
 * @desc Switch used to trigger the New Month event
 * @type switch
 * @default 127
 * 
 * @param newYear
 * @text New Year trigger
 * @desc Switch used to trigger the New Year event
 * @type switch
 * @default 128
 * 
 * @param seasonChange
 * @text Season Change trigger
 * @desc Switch used to trigger the Season Change event
 * @type switch
 * @default 129
 * 
 * @param SuperTICK
 * @text SuperTICK
 * @desc Switch used to trigger the Minute TICK event
 * @type switch
 * @default 131
 * 
 * @param MegaTICK
 * @text MegaTICK
 * @desc Switch used to trigger the Hour TICK event
 * @type switch
 * @default 132
 * 
 * @param dayCycle
 * @text Day Cycle trigger
 * @desc Switch used to trigger the time of Day cycling
 * @type 133
 * @default 133
 * 
 * @param dawn
 * @text Dawn phase
 * @desc Switch used to trigger the Dawn phase
 * @type switch
 * @default 136
 * 
 * @param morning
 * @text Morning phase
 * @desc Switch used to trigger the Day phase
 * @type switch
 * @default 137
 * 
 * @param afternoon
 * @text Afternoon phase
 * @desc Switch used to trigger the afternoon phase
 * @type switch
 * @default 138
 * 
 * @param dusk
 * @text Dusk trigger
 * @desc Switch used to trigger the Dusk phase
 * @type switch
 * @default 139
 * 
 * @param night
 * @text Night trigger
 * @desc Switch used to trigger the Night phase
 * @type switch
 * @default 140
 * 
 * @param isTime
 * @text Time trigger
 * @desc Switch used to trigger the passage of time
 * @type switch
 * @default 120
 */

/*~struct~cVar:
 * 
 * @param map
 * @text Current Map Variable ID
 * @type variable
 * @desc Select the variable that stores the current map ID
 * @default 10
 * 
 * @param error
 * @text Error Message
 * @desc Variable used to store the message of the current Error being looked up
 * @type variable
 * @default 19
 * 
 * @param lastActor
 * @text Last Actor
 * @desc Variable used to store the ID of the current actor being looked up
 * @type variable
 * @default 39
 * 
 * @param territoryID
 * @text Current Territory ID Variable
 * @type variable
 * @desc Select the variable to store the current Territory ID
 * @default 61
 * 
 * @param fertility
 * @text Current Fertility Variable
 * @type variable
 * @desc Select the variable to store the current Fertility value
 * @default 47
 * 
 * @param biome
 * @text Current Biome Variable
 * @type variable
 * @desc Select the variable to store the current Biome ID
 * @default 48
 * 
 * @param habitatID
 * @text Current Habitat Variable ID
 * @type variable
 * @desc Select the variable to store Current Habitat ID
 * @default 50
 * 
 * @param lastEnemy
 * @text Last Enemy Summon
 * @desc Variable used to store the last enemy summoned
 * @type variable
 * @default 66
 * 
 * @param characterID
 * @text CharacterID
 * @desc Variable used to store the ID of the current character being looked up
 * @type variable
 * @default 67
 * 
 * @param discard
 * @text Last Discarded Card
 * @desc Variable used to store the ID of the latest discarded card
 * @type variable
 * @default 68
 * 
 * @param reclaimAmount
 * @text Reclaim Amount
 * @desc Variable used to store the amount of cards to discard during a reclaim 
 * phase
 * @default 69
 * 
 * @param turn
 * @text Turn Counter
 * @desc Variable used to store the current turn accumulator
 * @type variable
 * @default 80
 * 
 * @param lastItem
 * @text Last Item
 * @desc Variable used to store the ID of the latest Item being looked up
 * @type variable
 * @default 89
 * 
 * @param creatureStats
 * @text Creature Stats
 * @desc Variable used to store the stats of the current Creature being looked up
 * @type variable
 * @default 112
 */

/*~struct~switches:
 * 
 * @param metaUrgency
 * @text Meta Urgency
 * @desc Switch used to inhibit functions that advance time (eg. Sleep)
 * @default 12
 * 
 * @param escape
 * @text Escape
 * @desc Switch used to trigger the Escape event
 * @type switch
 * @default 19
 * 
 * @param HabitatChange
 * @text Habitat Change Switch ID
 * @type switch
 * @desc Select the switch that triggers habitat data update
 * @default 53
 * 
 * @param TerritoryChange
 * @text Trigger Switch ID
 * @type switch
 * @desc Select the switch that triggers territory data fetch
 * @default 54
 * 
 * @param enemySpawn
 * @text Enemy Spawn
 * @desc Switch used to trigger the Enemy spawn event
 * @type switch
 * @default 66
 * 
 * @param darkScreen
 * @text Dark Screen
 * @desc Switch used to trigger a dark Screen, useful for scene load
 * @type switch
 * @default 110
 */

/*~struct~CE:
 * 
 * @param reclaim
 * @type common_event
 * @default 31
 * 
 * @param lightsON
 * @type common_event
 * @default 141
 * 
 * @param lightsOFF
 * @type common_event
 * @default 142
 */

/*~struct~cSkills:
 * 
 * @param instinct
 * @type skill
 * @default 8
 * 
 * @param sleep
 * @type skill
 * @default 2
 * 
 * @param emote
 * @type skill
 * @default 7 
 * 
 * @param rest
 * @type skill
 * @default 1
 * 
 * @param pass
 * @type skill
 * @default 9
 * 
 * @param escape
 * @type skill
 * @default 12
 * 
 * @param seekNRG
 * @type skill
 * @default 21
 * 
 * @param purgeGut
 * @type skill
 * @default 22
 * 
 * @param seekWater
 * @type skill
 * @default 23
 * 
 * @param seekMeat
 * @type skill
 * @default 24
 * 
 * @param seekShelter
 * @type skill
 * @default 25
 * 
 * @param purgeBladder
 * @type skill
 * @default 27
 * 
 * @param migrate
 * @type skill
 * @default 28
 * 
 * @param seekSleep
 * @type skill
 * @default 29
 * 
 * @param scratch
 * @type skill
 * @default 97
 * 
 * @param bite
 * @type skill
 * @default 98
 * 
 * @param explore
 * @type skill
 * @default 101
 * 
 * @param retreat
 * @type skill
 * @default 102
 * 
 * @param pounce
 * @type skill
 * @default 103
 * 
 * @param forage
 * @type skill
 * @default 105
 * 
 * @param position
 * @type skill
 * @default 108
 * 
 * @param maneuver
 * @type skill
 * @default 109
 * 
 * @param quickScan
 * @type skill
 * @default 121
 * 
 * @param basicScan
 * @type skill
 * @default 125
 */

/*~struct~blocks:
 * 
 * @param comfort
 * @type state
 * @default 2
 * 
 * @param immortal
 * @type state
 * @default 3
 */

/*~struct~injuries:
 * 
 * @param fat
 * @type state
 * @default 112
 * 
 * @param stimulant
 * @type state
 * @default 113
 * 
 * @param fatigue
 * @type state
 * @default 114
 * 
 * @param hunger
 * @type state
 * @default 115
 * 
 * @param thirst
 * @type state
 * @default 116
 * 
 * @param poison
 * @type state
 * @default 117
 * 
 * @param bruise
 * @type state
 * @default 151
 * 
 * @param bleed
 * @type state
 * @default 152
 * 
 * @param laceration
 * @type state
 * @default 153
 * 
 * @param fracture
 * @type state
 * @default 154
 * 
 * @param strain
 * @type state
 * @default 155
 * 
 * @param internal
 * @type state
 * @default 156
 * 
 * @param scar
 * @type state
 * @default 157
 * 
 * @param maim
 * @type state
 * @default 158
 * 
 * @param dismember
 * @type state
 * @default 159
 * 
 * @param fatal
 * @type state
 * @default 160
 */

/*~struct~moves:
 * 
 * @param unconscious
 * @type state
 * @default 14
 * 
 * @param sleeping
 * @type state
 * @default 15
 * 
 * @param resting
 * @type state
 * @default 16
 * 
 * @param walking
 * @type state
 * @default 34
 * 
 * @param sneaking
 * @type state
 * @default 39
 * 
 * @param trotting
 * @type state
 * @default 46
 * 
 * @param running
 * @type state
 * @default 47
 * 
 * @param sprinting
 * @type state
 * @default 48
 * 
 * @param searching
 * @type state
 * @default 49
 * 
 * @param browsing
 * @type state
 * @default 50
 * 
 * @param startled
 * @type state
 * @default 129
 */

/*~struct~moods:
 * 
 * @param bored
 * @type state
 * @default 40
 * 
 * @param confident
 * @type state
 * @default 41
 * 
 * @param joyful
 * @type state
 * @default 42
 * 
 * @param angry
 * @type state
 * @default 43
 * 
 * @param scared
 * @type state
 * @default 44
 * 
 * @param sad
 * @type state
 * @default 45
 */

/*~struct~postures:
 * 
 * @param protective
 * @type state
 * @default 19
 * 
 * @param prey
 * @type state
 * @default 20
 * 
 * @param evasive
 * @type state
 * @default 21
 * 
 * @param aggressive
 * @type state
 * @default 25
 * 
 * @param predator
 * @type state
 * @default 26
 * 
 * @param neutral
 * @type state
 * @default 27
 * 
 * @param alert
 * @type state
 * @default 38
 * 
 * @param groggy
 * @type state
 * @default 37
 * 
 * @param drowsy
 * @type state
 * @default 57
 */

/*~struct~morale:
 * 
 * @param encouraged
 * @type state
 * @default 51
 * 
 * @param aggravated
 * @type state
 * @default 52
 * 
 * @param satisfied
 * @type state
 * @default 53
 * 
 * @param stressed
 * @type state
 * @default 54
 * 
 * @param discouraged
 * @type state
 * @default 55
 * 
 * @param relieved
 * @type state
 * @default 56
 */

/*~struct~habCombos:
 * 
 * @param mass
 * @type state[]
 * @default [85,89]
 * 
 * @param aggro
 * @type state[]
 * @default [86,90]
 * 
 * @param dex
 * @type state[]
 * @default [87,91]
 * 
 * @param sen
 * @type state[]
 * @default [88,92]
 */

/*~struct~buffs:
 * 
 * @param MASS
 * @type state[]
 * @default [101,105,130,134]
 * 
 * @param AGGRO
 * @type state[]
 * @default [102,106,131,135]
 * 
 * @param DEX
 * @type state[]
 * @default [103,107,132,136]
 * 
 * @param SEN
 * @type state[]
 * @default [104,108,133,137]
 */

/*~struct~combos:
 * 
 * @param m
 * @type state
 * @default 31
 * 
 * @param a
 * @type state
 * @default 32
 * 
 * @param d
 * @type state
 * @default 33
 * 
 * @param s
 * @type state
 * @default 34
 */

/*~struct~clock:
 * 
 * @param x
 * @text Clock X
 * @desc Screen position X of the clock window, starting from the right (set [infinity] to right align)
 * @default Infinity
 * 
 * @param y
 * @text Clock Y
 * @desc Screen position Y of the clock window
 * @type number
 * @default 0
 * 
 * @param width
 * @text Clock Width
 * @desc Screen width of the clock window
 * @type number
 * @default 200
 * 
 * @param ToDswitch
 * @text Time of Day switch
 * @desc Switch to trigger the ToD display
 * @type switch
 * @default 111
 * 
 * @param ToD
 * @text Default ToD state
 * @desc Choose starting ToD switch state
 * @type boolean
 * @default true
 * 
 * @param ToDicon
 * @text Time of Day icon
 * @desc Set the icons for time of day (dawn, day, dusk, night)
 * @type icon[]
 * @default [284,285,285,286,287]
 * 
 * @param digitalSwitch
 * @text Digital switch
 * @desc Switch to trigger the Digital display
 * @type switch
 * @default 112
 * 
 * @param digital
 * @text Default Digital state
 * @desc Choose starting Digital clock state
 * @type boolean
 * @default true
 * 
 * @param blank
 * @type icon
 * @desc The icon for the blank digit
 * @default 308
 * 
 * @param digits
 * @type icon[]
 * @desc Digits icons from 0 to 9
 * @default [309,310,311,312,313,314,315,316,317,318]
 * 
 * @param separator
 * @type icon
 * @desc The icon for the separator digit
 * @default 319
 */

/*~struct~mapcursor:
 * 
 * @param onMap
 * @text On Map trigger
 * @desc Switch used to trigger the map Cursor
 * @type switch
 * @default 113
 * 
 * @param idle
 * @text Idle trigger
 * @desc Switch used to trigger the idle animation
 * @type switch
 * @default 114
 * 
 * @param move
 * @text Move trigger
 * @desc Switch used to trigger the move animation
 * @type switch
 * @default 115
 * 
 * @param select
 * @text Select trigger
 * @desc Switch used to trigger the selection animation
 * @type switch
 * @default 116
 * 
 * @param selected
 * @text Selected trigger
 * @desc Switch used to trigger the selected animation
 * @type switch
 * @default 117
 */

/*~struct~dice:
 * 
 * @param standard
 * @type number
 * @default 6
 * 
 * @param advanced
 * @type number
 * @default 12
 * 
 * @param hard
 * @type number
 * @default 18
 * 
 * @param rarity
 * @type number
 * @default 24
 * 
 * @param suitable
 * @type number
 * @default 6
 * 
 * @param weighted
 * @type number
 * @default 6
 * 
 * @param common
 * @type number 
 * @default 6
 * 
 * @param uncommon
 * @type number
 * @default 12
 * 
 * @param rare
 * @type number
 * @default 18
 * 
 * @param unique
 * @type number
 * @default 24
 */

/*~struct~ICV:
 * 
 * @param cardMeatVar
 * @type number
 * @default 3
 * 
 * @param cardFatVar
 * @type number
 * @default 4
 * 
 * @param cardBonesVar
 * @type number
 * @default 5
 * 
 * @param cardSpeciesVar
 * @type number
 * @default 6
 * 
 * @param habitatIdVar
 * @type number
 * @default 0
 * 
 * @param habitatResourcesVar
 * @type number
 * @default 1
 * 
 * @param habitatItemsVar
 * @type number
 * @default 2
 */

//#endregion





//-----------------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.5.1";
MAGPIE.HIMS = MAGPIE.HIMS || {};
MAGPIE.HIMS.version = MAGPIE.HIMS.version || "0.1.5";
MAGPIE.SE = {};
MAGPIE.SE.version = "0.4.0";
MAGPIE.SE.Core = {};
const SECore = MAGPIE.SE.Core;
SECore.version = "1.4.1";
var Imported = Imported || {};
Imported.SE = true;
Imported.HIMS = true;
MAGPIE.CBE = {};
MAGPIE.PDL = {};
const CBE = MAGPIE.CBE;
const PDL = MAGPIE.PDL;
//#region plugin parameters

SECore.pluginName = "ShelderEvo_Core";
SECore.parameters = PluginManager.parameters(SECore.pluginName) || {};

//SETTINGS
const DefaultCalendar = Number(SECore.parameters['DefaultCalendar']);
PDL._proceduralSpawn = Boolean(SECore.parameters['proceduralSpawn']) || true;
//#region VARIABLES
//#region common
//#endregion
	//#region TIME
/**
 * @property {Number} TimeScale 60
 * @property {Number} DefaultCalendar 1
 * @property {Number} calendar 140
 * @property {Number} timesystem 141
 * @property {Number} days 142
 * @property {Number} months 143
 * @property {Number} leapYear 144
 * @property {Number} leapMonth 145
 * @property {Number} gameDay 132
 * @property {Number} epoch 129
 * @property {Number} yearDay 139
 * @property {Number} second 121
 * @property {Number} minute 122
 * @property {Number} hour 123
 * @property {Number} day 124
 * @property {Number} month 125
 * @property {Number} year 126
 * @property {Number} ToD 128
 * @property {Number} leap 131
 * @property {Number} seasonID 133
 * @property {Number} dayName 146
 * @property {Number} monthName 147
 * @property {Number} sunrise 134
 * @property {Number} sunset 135
 * @property {Number} season 137
 * @property {Number} seasonalDelay 148
 * @property {Number} isLeapMonth 121
 * @property {Number} newYearsEve 123
 * @property {Number} newYearsDay 124
 * @property {Number} isLeapYear 125
 * @property {Number} newDay 126
 * @property {Number} newMonth 127
 * @property {Number} newYear 128
 * @property {Number} seasonChange 129
 * @property {Number} SuperTICK 131
 * @property {Number} MegaTICK 132
 * @property {Number} dayCycle 133
 * @property {Number} dawn switch 136
 * @property {Number} morning switch 137
 * @property {Number} afternoon switch 138
 * @property {Number} dusk switch 139
 * @property {Number} night switch 140
 * @property {Number} isTime 120
 */
const TIME = {}
TIME.TimeScale = TIME.TimeScale || 60;
TIME.DefaultCalendar = TIME.DefaultCalendar || 1;
TIME.calendar = TIME.calendar || 140;
TIME.timesystem = TIME.timesystem || 141;
TIME.days = TIME.days || 142;
TIME.months = TIME.months || 143;
TIME.leapYear = TIME.leapYear || 144;
TIME.leapMonth = TIME.leapMonth || 145
TIME.gameday = TIME.gameday || 132;
TIME.epoch = TIME.epoch || 129;
TIME.yearDay = TIME.yearDay || 139;
TIME.second = TIME.second || 121;
TIME.minute = TIME.minute || 122;
TIME.hour = TIME.hour || 123;
TIME.day = TIME.day || 124;
TIME.month = TIME.month || 125;
TIME.year = TIME.year || 126;
TIME.ToD = TIME.ToD || 128;
TIME.leap = TIME.leap || 131;
TIME.seasonID = TIME.seasonID || 133;
TIME.dayName = TIME.dayName || 146;
TIME.monthName = TIME.monthName || 147;
TIME.sunrise = TIME.sunrise || 134;
TIME.sunset = TIME.sunset || 135;
TIME.season = TIME.season || 137;
TIME.seasonalDelay = TIME.seasonalDelay || 148;
TIME.isLeapMonth = TIME.isLeapMonth || 121;
TIME.newYearsEve = TIME.newYearsEve || 123;
TIME.newYearsDay = TIME.newYearsDay || 124;
TIME.isLeapYear = TIME.isLeapYear || 125;
TIME.newDay = TIME.newDay || 126;
TIME.newMonth = TIME.newMonth || 127;
TIME.newYear = TIME.newYear || 128;
TIME.seasonChange = TIME.seasonChange || 129;
TIME.SuperTICK = TIME.SuperTICK || 131;
TIME.MegaTICK = TIME.MegaTICK || 132;
TIME.dayCycle = TIME.dayCycle || 133;
TIME.dawn = TIME.dawn || 136;
TIME.morning = TIME.morning || 137;
TIME.afternoon = TIME.afternoon || 138;
TIME.dusk = TIME.dusk || 139;
TIME.night = TIME.night || 140; 
TIME.initialEpoch = TIME.initialEpoch || 311;
//#endregion
	//#region cVar
const cVar = MAGGIE.parseStructObj(SECore.parameters.cVar);
cVar.map = cVar.map || 10;
cVar.error = cVar.error || 19
cVar.lastActor = cVar.lastActor || 39;
cVar.currentMap = cVar.currentMap || 46;
cVar.fertility = cVar.fertility || 47
cVar.biome = cVar.biome || 48
cVar.territory = cVar.territory || 49;
cVar.habitatID = cVar.habitatID || 50
cVar.territoryID = cVar.territoryID || 61;
cVar.characterID = cVar.characterID || 67;
cVar.discard = cVar.discard || 68
cVar.lastEnemy = cVar.lastEnemy = 66;
cVar.reclaimAmount = cVar.reclaimAmount || 69;
cVar.turn = cVar.turn || 80;
cVar.lastItem = cVar.lastItem || 89;
cVar.characterStats = cVar.characterStats || 112;
cVar.calendar = cVar.calendar || 140;
//#endregion
//#endregion
//#region SWITCHES
//#region cSwitch
/**
 * @property {Number} metaUrgency 12
 * @property {Number} escape 59
 * @property {Number} habitatChange 53
 * @property {Number} territoryChange 54
 * @property {Number} enemySpawn 66
 * @property {Number} darkScreen 110
 */
const cSwitch = MAGGIE.parseStructObj(SECore.parameters.Switches);
cSwitch.CEbusy = cSwitch.CEbusy || 1;
cSwitch.GameInit = cSwitch.GameInit || 4;
cSwitch.playerLock = cSwitch.playerLock || 5;
cSwitch.newGame = cSwitch.newGame || 7;
cSwitch.metaUrgency = cSwitch.metaUrgency || 12;
cSwitch.win = cSwitch.win || 14;
cSwitch.abort = cSwitch.abort || 15;
cSwitch.lose = cSwitch.lose || 16;
cSwitch.death = cSwitch.death || 17;
cSwitch.ko = cSwitch.ko || 18;
cSwitch.escape = cSwitch.escape || 19;
cSwitch.battleStarted = cSwitch.battleStarted || 21;
cSwitch.battleEnded = cSwitch.battleEnded || 24;
cSwitch.challenging = cSwitch.challenging || 25;
cSwitch.firstTurn = cSwitch.firstTurn || 38;
cSwitch.discard = cSwitch.discard || 39;
cSwitch.reclaim = cSwitch.reclaim || 40;
cSwitch.escape = cSwitch.escape || 59;
cSwitch.habitatChange = cSwitch.habitatChange || 53;
cSwitch.territoryChange = cSwitch.territoryChange || 54;
cSwitch.stateIconHide = cSwitch.stateIconHide || 82;
cSwitch.usedItem = cSwitch.usedItem || 98;
cSwitch.boughtItem = cSwitch.boughtItem || 99;
cSwitch.soldItem = cSwitch.soldItem || 100;
cSwitch.darkScreen = cSwitch.darkScreen || 110;
//#endregion
//#region CBE switches
/**
 * @class MAGPIE.CBE
 * @desc CBE switches {@link CBE.manager}
 */
MAGPIE.CBE.condition = {};
MAGPIE.CBE.condition.isPartner = MAGPIE.CBE.condition.isPartner || 41;
MAGPIE.CBE.condition.isFollower = MAGPIE.CBE.condition.isFollower || 42;
MAGPIE.CBE.condition.isAlly = MAGPIE.CBE.condition.isAlly || 43;
MAGPIE.CBE.condition.isFriend = MAGPIE.CBE.condition.isFriend || 44;
MAGPIE.CBE.condition.isContact = MAGPIE.CBE.condition.isContact || 45;
MAGPIE.CBE.condition.isNeutral = MAGPIE.CBE.condition.isNeutral || 46;
MAGPIE.CBE.condition.isUnfriendly = MAGPIE.CBE.condition.isUnfriendly || 47;
MAGPIE.CBE.condition.isEnemy = MAGPIE.CBE.condition.isEnemy || 48;
MAGPIE.CBE.condition.isNemesis = MAGPIE.CBE.condition.isNemesis || 49;
MAGPIE.CBE.condition.isThreat = MAGPIE.CBE.condition.isThreat || 50;
MAGPIE.CBE.condition.isNPCcontact = MAGPIE.CBE.condition.isNPCcontact || 51;
MAGPIE.CBE.condition.isNPC = MAGPIE.CBE.condition.isNPC || 52;
MAGPIE.CBE.condition.keepMessage = MAGPIE.CBE.condition.keepMessage || 60;
MAGPIE.CBE.condition.switchA = MAGPIE.CBE.condition.switchA || 61;
MAGPIE.CBE.condition.switchB = MAGPIE.CBE.condition.switchB || 62;
MAGPIE.CBE.condition.switchC = MAGPIE.CBE.condition.switchC || 63;
MAGPIE.CBE.condition.switchD = MAGPIE.CBE.condition.switchD || 64;
MAGPIE.CBE.condition.tutorial = MAGPIE.CBE.condition.tutorial || 65;
MAGPIE.CBE.condition.enemySpawn = MAGPIE.CBE.condition.enemySpawn || 66;
MAGPIE.CBE.condition.switchE = MAGPIE.CBE.condition.switchE || 67;
MAGPIE.CBE.condition.switchF = MAGPIE.CBE.condition.switchF || 68;
MAGPIE.CBE.condition.switchG = MAGPIE.CBE.condition.switchG || 69;
//#endregion
//#region PDL switches
/**
 * @class MAGPIE.PDL
 * 
 */
MAGPIE.PDL.newOffspring = MAGPIE.PDL.newOffspring || 101;
//#endregion
//#region mapCursor
/**
 * @property {Number} onMap switch 113
 * @property {Number} idle switch 114
 * @property {Number} move switch 115
 * @property {Number} select switch 116
 * @property {Number} selected switch 117
 * 
 */
const mapCursor = MAGGIE.parseStructObj(SECore.parameters['mapCursor']);
mapCursor.onMap = mapCursor.onMap || 113;
mapCursor.idle = mapCursor.idle || 114;
mapCursor.move = mapCursor.move || 115;
mapCursor.select = mapCursor.select || 116;
mapCursor.selected = mapCursor.selected || 117;
//#endregion
//#endregion
//#region CUSTOM_VARIABLES
/**
 * @class SEclock
 * @desc icons: {
 * blank: 308,
 * digits: [309,310,311,312,313,314,315,316,317,318],separator: 319,},
 * @desc ToDswitch: 111,
 * @desc digitalSwitch: 112,
 * @desc ToD: true,
 * @desc digital: true,
 * @desc ToDicon: {
 * dawn: 284,
 * day: 285,
 * dusk: 286,
 * night: 287},
 * @desc x: Infinity,
 * @desc y: 0,
 * @desc width: 200
 * @desc }
 */
var SEclock = MAGGIE.parseStructObj(SECore.parameters['SEclock']);
SEclock.digits = MAGGIE.parseArr(SECore.parameters.SEclock, "digits");
SEclock.ToDicon = MAGGIE.parseArr(SECore.parameters.SEclock, "ToDicon");
SEclock.x = eval(JSON.parse(SECore.parameters.SEclock)["x"]) || Infinity;
SEclock.ToD = Boolean(JSON.parse(SECore.parameters.SEclock)["ToD"]) || true;
SEclock.digital = Boolean(JSON.parse(SECore.parameters.SEclock)["digital"]) || true;
SEclock.ToDswitch = SEclock.ToDswitch || 111;
SEclock.digitalSwitch = SEclock.digitalSwitch || 112;
const currentMapIDcall = SECore.parameters['currentMapIDcall'] || "$gameMap.mapId()";
var currentTerritory = 0;
var currentMap = 0;
const System_playerX = SECore.parameters['System_playerX'] || "$gamePlayer.x";
const System_playerY = SECore.parameters['System_playerY'] || "$gamePlayer.y";
//#region SEdice
/**
 * @property {Number} standard standard die
 * @property {Number} advanced double dice
 * @property {Number} hard 3D6
 * @property {Number} rarity 4D6
 * @property {Number} suitable D6
 * @property {Number} weighted standard weight
 * @property {Number} common common weight (6)
 * @property {Number} uncommon uncommon weight (12)
 * @property {Number} rare rare weight (24)
 * @property {Number} unique unique weight (48)
 */
const SEdice = MAGGIE.parseStructObj(SECore.parameters['SEdice']) || {};
SEdice.standard = SEdice.standard || 6;
SEdice.advanced = SEdice.advanced || 12;
SEdice.hard = SEdice.hard || 18;
SEdice.rarity = SEdice.rarity || 24;
SEdice.suitable = SEdice.suitable || 6;
SEdice.weighted = SEdice.weighted || 6;
SEdice.common = SEdice.common || 6;
SEdice.uncommon = SEdice.uncommon || 12;
SEdice.rare = SEdice.rare || 24;
SEdice.unique = SEdice.unique || 48;
//#endregion
const humidities = {
		dry: 1,
		arid: 2,
		humid: 3,
		damp: 4,
		wet: 5
	};
const climates = {
	glacial: -3, 
	frigid: -2,
	cold: -1,
	mild: 0,
	warm: 1,
	hot: 2,
	torrid: 3
};
//#region Instincts
/** @class Instincts
 * @property {String} SURVIVE - "surviveSkills"
 * @property {String} COMPETE - "competeSkills"
 * @property {String} INTERACT - "interactSkills"
 * @property {String} ADAPT - "adaptSkills"
 * @property {String} META - "metaSkills"
 */
const Instincts = {};
Instincts.SURVIVE = "surviveSkills";
Instincts.COMPETE = "competeSkills";
Instincts.INTERACT = "interactSkills";
Instincts.ADAPT = "adaptSkills";
Instincts.META = "metaSkills";
//#endregion
const zoneWildId = Number(SECore.parameters['zoneWildId']);
const zoneTerritoryId = Number(SECore.parameters['zoneTerritoryId']);
//#region keyboardIcons
const keyboardIcons = {};
keyboardIcons.ENTER = {};
keyboardIcons.ENTER.IDLE = 426;
keyboardIcons.ENTER.PRESS = 427;
keyboardIcons.UP = {};
keyboardIcons.UP.IDLE = 442;
keyboardIcons.UP.PRESS = 443;
keyboardIcons.LEFT = {};
keyboardIcons.LEFT.IDLE = 440;
keyboardIcons.LEFT.PRESS = 441;
keyboardIcons.DOWN = {};
keyboardIcons.DOWN.IDLE = 444;
keyboardIcons.DOWN.PRESS = 445;
keyboardIcons.RIGHT = {};
keyboardIcons.RIGHT.IDLE = 446;
keyboardIcons.RIGHT.PRESS = 447;
keyboardIcons.X = {};
keyboardIcons.X.IDLE = 398;
keyboardIcons.X.PRESS = 399;
keyboardIcons.PAGEUP = {};
keyboardIcons.PAGEUP.IDLE = 504;
keyboardIcons.PAGEUP.PRESS = 505;
keyboardIcons.PAGEDOWN = {};
keyboardIcons.PAGEDOWN.IDLE = 506;
keyboardIcons.PAGEDOWN.PRESS = 507;
//#endregion
//#endregion
//#region INDEPENDENT CARD VARIABLES
/**
 * @property {Number} cardMeatVar 3
 * @property {Number} cardFatVar 4
 * @property {Number} cardBoneVar 5
 * @property {Number} cardSpeciesVar 6
 * @property {Number} habitatIdVar 0
 * @property {Number} habitatResourcesVar 1
 * @property {Number} habitatItemsVar 2
 * 
 */
const ICV = MAGGIE.parseStructObj(SECore.parameters['ICV']);
//#endregion
//#region DATABASE IDs
//#region CommonEvents
/**
 * @property {Number} reclaim 31
 * @property {Number} lightsON 141
 * @property {Number} lightsOFF 142
 */
const CE = MAGGIE.parseStructObj(SECore.parameters['CommonEvents']) || {};
CE.gameLoad = CE.gameLoad || 11;
CE.reclaim = CE.reclaim || 31;
CE.lightsON = CE.lightsON || 141;
CE.lightsOFF = CE.lightsOFF || 142;
//#endregion
//#region blocks
/**
 * @property {Number} comfort 2
 * @property {Number} immortal 3
 */
const blocks = MAGGIE.parseStructObj(SECore.parameters.blocks) || {};
blocks.comfort = blocks.comfort || 2;
blocks.immortal = blocks.immortal || 3;
//#endregion
//#region injuries
/**
 * @constant {obj} injuries state IDs of all the injuries
 * @property {Number} fat 112
 * @property {Number} stimulant 113
 * @property {Number} fatigue 114
 * @property {Number} hunger 115
 * @property {Number} thirst 116
 * @property {Number} poison 117
 * @property {Number} bruise 151
 * @property {Number} bleed 152
 * @property {Number} laceration 153
 * @property {Number} fracture 154
 * @property {Number} strain 155
 * @property {Number} internal 156
 * @property {Number} scar 157
 * @property {Number} maim 158
 * @property {Number} dismember 159
 * @property {Number} fatal 160
 * 
 */
const injuries = MAGGIE.parseStructObj(SECore.parameters['injuries']) || {};
injuries.fatigue = injuries.fatigue || 114;
injuries.hunger = injuries.hunger || 115;
injuries.thirst = injuries.thirst || 116;
injuries.poison = injuries.poison || 117;
injuries.bruise = injuries.bruise || 151;
injuries.bleed = injuries.bleed || 152;
injuries.laceration = injuries.laceration || 153;
injuries.fracture = injuries.fracture || 154;
injuries.strain = injuries.strain || 155;
injuries.internal = injuries.internal || 156;
injuries.scar = injuries.scar || 157;
injuries.maim = injuries.maim || 158;
injuries.dismember = injuries.dismember || 159;
injuries.fatal = injuries.fatal || 160; 
//#endregion
/**
 * @property {Number} sleeping 15
 * @property {Number} resting 16
 * @property {Number} walking 34
 * @property {Number} sneaking 39
 * @property {Number} trotting 46
 * @property {Number} running 47
 * @property {Number} sprinting 48
 * @property {Number} searching 49
 * @property {Number} browsing 50
 * @property {Number} startled 129
 * 
 */
const moves = MAGGIE.parseStructObj(SECore.parameters['moves']);
/**
 * @desc Common Skills
 * @property {Number} instinct 8
 * @property {Number} sleep 2
 * @property {Number} emote 7
 * @property {Number} rest 1
 * @property {Number} pass 9
 * @property {Number} escape 12
 * @property {Number} seekNRG 21
 * @property {Number} purgeGut 22
 * @property {Number} seekWater 23
 * @property {Number} seekMeat 24
 * @property {Number} seekShelter 25
 * @property {Number} purgeBladder 27
 * @property {Number} migrate 28
 * @property {Number} seekSleep 29
 * @property {Number} scratch 97
 * @property {Number} bite 98
 * @property {Number} explore 101
 * @property {Number} retreat 102
 * @property {Number} pounce 103
 * @property {Number} forage 105
 * @property {Number} position 108
 * @property {Number} maneuver 109
 * @property {Number} quickScan 121
 * @property {Number} basicScan 125
 * 
 */
const cSkills = MAGGIE.parseStructObj(SECore.parameters.commonSkills);
/**
 * 
 * @property {Number} bored 40
 * @property {Number} confident 41
 * @property {Number} joyful 42
 * @property {Number} angry 43
 * @property {Number} scared 44
 * @property {Number} sad 45
 * 
 */
const moods = MAGGIE.parseStructObj(SECore.parameters['moods']);
const moodStates = {
	bored: 40,
	confident: 41,
	joyful: 42,
	angry: 43,
	scared: 44,
	sad: 45,
	warning: "deprecated"
};
/**
 * @property {Number} protective 19
 * @property {Number} prey 20
 * @property {Number} evasive 21
 * @property {Number} aggressive 25
 * @property {Number} predator 26
 * @property {Number} neutral 27
 * @property {Number} alert 38
 * @property {Number} groggy 37
 * 
 */
const postures = MAGGIE.parseStructObj(SECore.parameters['postures']);
const postureStates = {
	protective: 19,
	prey: 20,
	evasive: 21,
	aggressive: 25,
	predator: 26,
	neutral: 27,
	alert: 38,
	groggy: 37,
	drowsy: 57,
	warning: "deprecated"
};
/**
 * @class morale
 * @property {Number} encouraged 51
 * @property {Number} aggravated 52
 * @property {Number} satisfied 53
 * @property {Number} stressed 54
 * @property {Number} discouraged 55
 * @property {Number} relieved 56
 */
const morale = MAGGIE.parseStructObj(SECore.parameters['morale']);
/**
 * @property {Array} mass [85,89]
 * @property {Array} aggro [86,90]
 * @property {Array} dex [87,91]
 * @property {Array} sen [88,92]
 * 
 */
const habCombos = MAGGIE.parseStructArr(SECore.parameters['habCombos']);
const SEtemp = {
	message: "",
	map: {},
	territory: {},
	lastItem: 0
};
/**
 * @desc parameter 0: Buffs | 1: Debuffs | 2: UP | 3: DOWN
 * @property {Number} MASS - [101,105,130,134]
 * @property {Number} AGGRO - [102,106,131,135]
 * @property {Number} DEX - [103,107,132,135]
 * @property {Number} SEN - [104,108,133,137]
 */
const pBuffs = MAGGIE.parseStructArr(SECore.parameters['buffs']);
/**
 * @property {Number} m 31
 * @property {Number} a 32
 * @property {Number} d 33
 * @property {Number} s 34
 * 
 */
const combos = MAGGIE.parseStructObj(SECore.parameters['combos']);
combos.m = combos.m || 31;
combos.a = combos.a || 32;
combos.d = combos.d || 33;
combos.s = combos.s || 34;
//#endregion
//#endregion
//#endregion





//-----------------------------------------------------------------------------------
//#region time systems

function Time_System(name = "")
{
	this.name = name;
	this.Year = 0;
}

Time_System.prototype.addMonth = function(name = "", days = 1)
{
	this[name] = days;
	this.Year += days;
}

Time_System.prototype.addLeap = function(LeapYear = 0, LeapMonth = 1)
{
	this.LeapYear = LeapYear;
	this.LeapMonth = LeapMonth;
}

Time_System.prototype.setup = function(LeapYear = 0, LeapMonth = 1, months = [])
{
	months.forEach(month => this.addMonth(Object.keys(month)[0], Object.values(month)[0]));
	this.addLeap(LeapYear, LeapMonth)
	return this
}

Time_System.prototype.months = function()
{
	return Object.keys(this).length - 4
}

Time_System.prototype.monthList = function()
{
	let list = [];
	for(let i = 0; i < this.months(); i++)
	{
		let monthName = Object.keys(this)[i + 2];
		let monthDays = Object.values(this)[i + 2];
		let month = {};
		month[monthName] = monthDays;
		list.push(month)
	}
	return list
}

Time_System.prototype.monthsDays = function()
{
	let list = []
	for(let i = 0; i < this.months(); i++)
	{
		let monthDays = Object.values(this)[i + 2];
		list.push(monthDays);
	}
	return list
}

Time_System.prototype.yearDayToMonth = function(yearDay)
{
	let days = 0;
	let list = this.monthsDays();
	for(let i = 0; i < list.length; i++)
	{
		days += list[i]
		if(yearDay < days) return i + 1
	}
}

Time_System.prototype.dayCounter = function(month)
{
	let days = 0;
	let list = this.monthsDays();
	for(let i = 0; i < list.length; i++)
	{
		days += list[i];
		if(i === month) return days
	}
}

Time_System.prototype.convertYearDay = function(yearDay)
{
	let month = this.yearDayToMonth(yearDay);
	let day = yearDay - this.dayCounter(month);
	return [month, day]
}


const timesystem = {
	gregorian: {}, sabi: {}
};
timesystem.gregorian = new Time_System("Gregorian");
let gregorianMonths = [
	{January: 31},
	{February: 28},
	{March: 31},
	{April: 30},
	{May: 31},
	{June: 30},
	{July: 31},
	{August: 31},
	{September: 30},
	{October: 31},
	{November: 30},
	{December: 31}
];
timesystem.gregorian.setup(4,2,gregorianMonths);

// {
// 	name: "Gregorian",
// 	Year: 365,
// 	January: 31,
// 	February: 28,
// 	March: 31,
// 	April: 30,
// 	May: 31,
// 	June: 30,
// 	July: 31,
// 	August: 31,
// 	September: 30,
// 	October: 31,
// 	November: 30,
// 	December: 31,
// 	LeapYear: 4,
// 	LeapMonth: 2
// };

// Sabi calendar (Shelder)
let sabiMonths = [
	{January: 24},
	{February: 24},
	{March: 25},
	{April: 24},
	{May: 24},
	{June: 25},
	{July: 24},
	{August: 24},
	{September: 25},
	{October: 24},
	{November: 24},
	{December: 25}
]
timesystem.sabi = new Time_System("Sabi");
timesystem.sabi.setup(8, 12, sabiMonths);

// {
// 	name: "Sabi",
// 	Days: 292,
// 	January: 24,
// 	February: 24,
// 	March: 25,
// 	April: 24,
// 	May: 24,
// 	June: 25,
// 	July: 24,
// 	August: 24,
// 	September: 25,
// 	October: 24,
// 	November: 24,
// 	December: 25,
// 	LeapYear: 8,
// 	LeapMonth: 12
// };



var Second = 0;
var Minute = 0;
var Hour = 0;
var Day = 0;
var Month = 0;
var Year = 0;
var epoch = 0;
var Sunrise = 6;
var Sunset = 19;
var Days = 0;
var YearDay = 0;
var GameDay = 1;
var currentCalendar = 0;
var clockWin = {};



/**
 * @desc function to set Calendar
 * @param {Number} Calendar check {@link timesystem}
 * @param {Number} GameDay 
 * @param {Number} Day 
 * @param {Number} Month 
 * @param {Number} Year 
 * @param {Number} Hour 
 */
SECore.setCalendar = function (Calendar, gameday = 1, day = 1, month = 1, year = 1, hour = 1) {
	$gameVariables.setValue(cVar.calendar, timesystem[Calendar]);
	let LeapYear = timesystem[Calendar].LeapYear;
	$gameVariables.setValue(TIME.leapYear, LeapYear);
	let LeapMonth = timesystem[Calendar].LeapMonth;
	$gameVariables.setValue(TIME.leapMonth, LeapMonth);
	currentCalendar = timesystem[Calendar];
	let CalendarLength = Object.keys(timesystem[Calendar]).length;
	let Months = CalendarLength - 4;
	SECore.setupSeason();
	$gameVariables.setValue(TIME.months, Months);
	$gameVariables.setValue(TIME.gameDay, gameday);
	$gameVariables.setValue(TIME.day, day);
	$gameVariables.setValue(TIME.month, month);
	$gameVariables.setValue(TIME.year, year);
	$gameVariables.setValue(TIME.hour, hour);
	$gameVariables.setValue(TIME.epoch, SECore.epoch());
	$gameVariables.setValue(TIME.yearDay, SECore.yearDay());
	GameDay = $gameVariables.value(TIME.gameDay);
	Day = $gameVariables.value(TIME.day);
	Month = $gameVariables.value(TIME.month);
	Year = $gameVariables.value(TIME.year);
	Hour = $gameVariables.value(TIME.hour);
	Minute = $gameVariables.value(TIME.minute);
	Second = $gameVariables.value(TIME.second);
	epoch = $gameVariables.value(TIME.epoch);
	YearDay = $gameVariables.value(TIME.yearDay);
	Days = Object.values(currentCalendar)[Month + 2];
	$gameVariables.setValue(TIME.days, Days);
	MAGPIE.console.Log(`Calendar set to ${currentCalendar.name}.`);
	return currentCalendar.name
};

SECore.epoch = function()
{
	return TIME.initialEpoch + Year
}

SECore.yearDay = function()
{
	yearDay = 0;
	for(let i = 1; i < Month; i++)
	{
		yearDay += Object.values(currentCalendar)[i + 2]
	}
	yearDay += Day;
	$gameVariables.setValue(TIME.yearDay, this.yearDay);
	return yearDay
}

SECore.setupSeason = function()
{
	let season = SECore.season(SECore.yearDay());
	let results = SECore.getSeasonalChanges(season);
	results.season = season;
	return results
}

SECore.getSeasonalChanges = function(season) {
	Sunrise = 7;
	Sunset = 18;
	switch (season) {
		case "winter":
			Sunrise += 2;
			Sunset -= 2;
			break;
		case "spring":

			break;
		case "summer":
			Sunrise -= 2;
			Sunset += 2;
			break;
		case "autumn":

			break;
	}
	return {sunrise: Sunrise,sunset: Sunset}
}

SECore.switchSeason = function(seasonName, seasonID)
{
	$gameVariables.setValue(TIME.season, seasonName);
	$gameVariables.setValue(TIME.seasonID, seasonID);
	return seasonName
}

SECore.season = function(yearDay) {
	let seasonalDelay = $gameVariables.value(TIME.seasonalDelay) || 15;
	let YearDays = currentCalendar.Days; 
	let seasonDays = Math.floor(YearDays / 4);
	if(yearDay < seasonDays - seasonalDelay || yearDay > (seasonDays * 4) - seasonalDelay)
	{
		return SECore.switchSeason("winter", 1)
	} else if(yearDay < (seasonDays * 2) - seasonalDelay) return SECore.switchSeason("spring", 2) 
		else if(yearDay < seasonDays * 3 - seasonalDelay) return SECore.switchSeason("summer", 3)
			else return SECore.switchSeason("autumn", 4)
}

//function to convert current month number to its name
SECore.getMonthName = function() {
		let Month = $gameVariables.value(TIME.month);
		let MonthName = Object.keys(currentCalendar)[Month + 2];
		$gameVariables.setValue(TIME.monthName, MonthName);
		return MonthName
};

//function to get the number of days in current month
SECore.getMonthDays = function() {
		let Month = $gameVariables.value(TIME.month);
		Days = Object.values(currentCalendar)[Month];
		$gameVariables.setValue(TIME.days, Days);
		return Days
};
//#endregion











//-----------------------------------------------------------------------------------
//#region SECore utilities






//#region Clock
/**
 * 
 * {@link Game_Party.prototype.clock}
 */
SECore.clock = function()
{
	//$gameParty.clock();
	Second = $gameVariables.value(TIME.second);
	Minute = $gameVariables.value(TIME.minute);
	Hour = $gameVariables.value(TIME.hour);
	$gameVariables.setValue(TIME.second,Second + TIME.TimeScale);
	//TICK
	if($gameVariables.value(TIME.second) < 60) {
		return false
	};
	//SuperTICK 
	$gameSwitches.setValue(TIME.SuperTICK, true);
	$gameVariables.setValue(TIME.second,0);
	$gameVariables.setValue(TIME.minute,Minute + 1);
	$gameSwitches.setValue(TIME.SuperTICK,false);
	if($gameVariables.value(TIME.minute) > 1) {
		$gameSwitches.setValue(TIME.MegaTICK,false);
	};
	if($gameVariables.value(TIME.minute) < 60) {
		return
	};
	//MegaTICK
	$gameSwitches.setValue(TIME.MegaTICK, true);
	$gameVariables.setValue(TIME.minute,0);
	$gameVariables.setValue(TIME.hour,Hour + 1);
	SECore.getSeasonalChanges($gameVariables.value(TIME.season));
	SECore.timeOfDay($gameVariables.value(TIME.hour), $gameVariables.value(TIME.minute), Sunrise, Sunset);
	if($gameVariables.value(TIME.hour) < 24) {
		return false
	}
	//NEWDAY
	$gameVariables.setValue(TIME.hour,0);
	$gameSwitches.setValue(TIME.newDay,true);
	$gameVariables.setValue(TIME.day,Day + 1);
	$gameVariables.setValue(TIME.yearDay,YearDay + 1);
	$gameVariables.setValue(TIME.gameDay,GameDay + 1);
	SECore.season(YearDay, currentCalendar);
	SECore.getMonthDays();
	let Days = $gameVariables.value(TIME.days);
	if(Day > 1 && Day < Days) {
		return $gameSwitches.setValue(TIME.newMonth,false)
	} else if(Day > Days) {
		return SECore.newMonth();
	};
	//END_OF_MONTH
	//LEAP YEAR?
	if($gameSwitches.value(TIME.isLeapYear) && $gameSwitches.value(TIME.isLeapMonth)) {
		$gameSwitches.setValue(TIME.isLeapMonth,false);
		return
	};
	
	$gameSwitches.setValue(TIME.newYearsEve,true);
}

SECore.clockDigits = function() {
	let digits = [];
	Hour = $gameVariables.value(TIME.hour);
	Minute = $gameVariables.value(TIME.minute);
	if(Hour < 10) {
		digits[0] = 0;
		digits[1] = Hour;
	} else {
		digits[0] = Math.floor(Hour / 10);
		//digits[1] = Hour - (digits[0] * 10);
		digits[1] = Hour % 10;
	};
	if(Minute < 10) {
		digits[2] = 0;
		digits[3] = Minute;
	} else {
		digits[2] = Math.floor(Minute / 10);
		digits[3] = Minute % 10;
	}
	return digits
}

SECore.newMonth = function() 
{
	let Months = $gameVariables.value(TIME.months);
	$gameSwitches.setValue(TIME.newMonth,true);
	$gameVariables.setValue(TIME.day,1);
	$gameVariables.setValue(TIME.month,Month + 1);
	if(Month > 1 && Month < Months) {
		if(Month == $gameVariables.value(TIME.LeapMonth)) {
			$gameSwitches.setValue(TIME.isLeapMonth,true)
		};
		return $gameSwitches.setValue(TIME.newYear,false)
	} else if(Month > Months) {
		return SECore.newYear()
	};
}

SECore.newYear = function() 
{
	$gameSwitches.setValue(TIME.newYear,true);
	$gameVariables.setValue(TIME.month,1);
	$gameVariables.setValue(TIME.year,Year + 1);
	$gameVariables.setValue(TIME.yearDay,1);
	if($gameVariables.value(TIME.leap) < $gameVariables.value(TIME.leapYear)) {
		return $gameSwitches.setValue(TIME.isLeapYear,false)
	};
	return $gameSwitches.setValue(TIME.isLeapYear,true)
}



SECore.selectedTime = function(selectedHour, selectedMinute)
{
	return selectedHour + (selectedMinute / 60)
}

SECore.timeOfDay = function(hour, minute, sunrise, sunset) {
	let time = SECore.selectedTime(hour, minute);
	if(time > sunrise - 1 && time < sunrise + 1) return SECore.switchToD(TIME.dawn)
	if(time > sunrise && time < 12) return SECore.switchToD(TIME.morning)
	if(time > 12 && time < sunset - 1) return SECore.switchToD(TIME.afternoon)
	if(time > sunset - 1 && time < sunset + 1) return SECore.switchToD(TIME.dusk)
	if(time > sunset + 1 || time < sunrise - 1) return SECore.switchToD(TIME.night)
}

SECore.switchToD = function(ToD)
{
	let ToDs = [TIME.dawn, TIME.morning, TIME.afternoon, TIME.dusk, TIME.night];
	ToDs.remove(ToD);
	ToDs.forEach(e => $gameSwitches.setValue(e, false));
	$gameSwitches.setValue(ToD, true);
	let ToDname = $dataSystem.switches[ToD];
	$gameVariables.setValue(TIME.ToD, ToD);
	return ToDname 
}

SECore.timeOfDayIcon = function() {
	let ToD = SECore.timeOfDay(Hour,Minute,Sunrise,Sunset)
	switch (ToD) {
		case "dawn":
			return SEclock.ToDicon[0]
		case "morning":
			return SEclock.ToDicon[1]
		case "afternoon":
			return SEclock.ToDicon[2]
		case "dusk":
			return SEclock.ToDicon[3]
		case "night":
			return SEclock.ToDicon[4]
	}
}


SECore.today = function() 
{
	if($gameSystem?._initialized && $gameMap?.mapId())
	{
		return $gameVariables.value(TIME.gameDay)
	}
}

SECore.here = function()
{
	if($gameSystem?._initialized && $gameMap?.mapId() > 0)
	{
		return currentTerritory
	}
}


//#endregion






//#region Scene

SECore.sceneLoad = function()
{
	SECore.season($gameVariables.value(TIME.season), $gameVariables.value(TIME.calendar));
	SECore.getSeasonalChanges(SECore.season());
	SECore.timeOfDay(Hour, Sunrise, Sunset);
}

//#endregion






//#region Territory
/**
 * 
 * @desc Territory Management
 */
SECore.getCoords = function() {
	var playerX = eval(System_playerX);
	var playerY = eval(System_playerY);
	var coordsFromCoords = Number("" + playerX + playerY);
	console.log("Current Map coordinates: " + coordsFromCoords);
	return coordsFromCoords;
};
// SECore.getTerritoryID = function() {
// 	let coordsFromCoords = SECore.getCoords();
// 	let currentMapID = eval(currentMapIDcall);
// 	let territoryID = territory.findIndex(t => t.mapID == currentMapID && t.coords == coordsFromCoords)
// 	console.log("Territory ID: " + territoryID);
// 	return territoryID
// };





SECore.attemptDice = function(dX, bonus, attempt) {
	if(SECore.die(dX) + bonus == dX) {
		eval(attempt);
		return true
	} else {
		return false
	}
};



SECore.TerritorySceneCleanup = function() {
		//
};
//#endregion







//#region Habitat

SECore.lastIsType = function(zoneId = 3, type = "")
{
	let result = SECore.lastInXzone(zoneId);
	if(result == undefined)
	{
		return false
	};
	let card = $dataSkills[result._skillId];
	if(card == undefined)
	{
		return false
	};
	if(card.meta.hasOwnProperty(type))
	{
		return true
	} else {
		return false
	}
}

/**
 * @class SECore.lastInWild()
 * @returns {obj} Card (add "._skillId" to get ID)
 */
SECore.lastInWild = function()
{
	return SECore.lastInXzone(zoneWildId)
}

/**
 * 
 * @param {Number} zoneId 
 * @returns {obj} Card (add "._skillId" to get ID)
 */
SECore.lastInXzone = function(zoneId = 2)
{
	let card = $gameParty.leader()._extraZones[zoneId]._data[SECore.XzoneSize(zoneId) - 1];
	if(card == undefined)
	{
		return
	} else {
		return card
	}
}

SECore.XzoneSize = function(zoneId)
{
	return $gameParty.leader()._extraZones[zoneId].length
}

SECore.lastInTerritory = function() {
	return SECore.lastInXzone(zoneTerritoryId)
};

SECore.getHabitats = function()
{
	let pool = [];
	$dataSkills.forEach((element) => pool.push(element));
	pool.shift();
	let habitats = pool.filter((element) => element.meta.hasOwnProperty("habitat"));
	if(habitats.length > 0) {
			PDL.init._habitatsLoaded = true; 
			return habitats
		} else {
			console.log("Unable to load habitats!");
			return false
		}
}

SECore.getHabitatStates = function() 
{
	console.log("Loading habitatStates...");
	let pool = [];
	$dataStates.forEach((element) => pool.push(element));
	pool.shift();
	let states = pool.filter((element) => element.meta.hasOwnProperty("habitat"));
	if(states.length > 0)
	{
		console.log(states.length + " records found and added to PDL database.");
		return states
	} else {
		console.log("Unable to load habitatStates!");
		return false
	}
}

SECore.getResources = function()
{
	console.log("Loading resources...");
	let pool = [];
	$dataItems.forEach((element) => pool.push(element));
	pool.shift();
	let resources = pool.filter((element) => element.meta.hasOwnProperty("resource"));
	if(resources.length > 0)
	{
		console.log(resources.length + " records found and added to PDL database.");
		return resources
	} else {
		console.log("Unable to load resources!");
		return false
	}
}

/**
 * 
 * @param {array} data
 * @param {string} filter 
 * @param {boolean} shift1st 
 * @returns {array} 
 */
SECore.getFilterData = function(data, filter, shift1st = true)
{
	console.log("Loading " + filter + "...");
	let pool = [];
	data.forEach((element) => pool.push(element));
	if(shift1st) {
	pool.shift();
	};
	let results = pool.filter((element) => element.meta.hasOwnProperty(filter));
	if(results.length > 0)
	{
		console.log(results.length + " records found and added to PDL database.");
		return results
	} else {
		console.log("No records found!");
		return false
	}
}

SECore.refreshHabitatResources = function(lastHabitat, lootTaken) {
	let resourceTaken = habitat[lastHabitat]._resources.findIndex(lootTaken);
	habitat[lastHabitat]._resources.splice(resourceTaken, 1)
};



SECore.getSpecies = function()
{
	let data = SECore.getFilterData($dataSkills,"species",true);
	results = [];
	data.forEach(e => results.push(e))
	//results.forEach((element) => species.push(new Game_Species(element.id)))
	return results
}

SECore.explore = function(skillCard, stateId) {
	SECore.initHabitat(skillCard);
	user.refreshHabitat(skillCard, stateId);
};

SECore.initHabitat = function() {
	let habitatCard = SECore.lastInWild();
	let habitatID = habitatCard.var[0];
	let habitat = {};
	if(habitatID > 0) {
		habitat = currentTerritory._habitats.find(h => h._habitatId === habitatID);
		return habitat.fromCard();
	}
	habitatID = "" + Year + "-" + Month + "-" + Day + "-" + Hour + "-" + Minute;
	habitatCard.var[0] = habitatID;
	habitatCard.var[1] = [];
	habitatCard.var[2] = [];
};
//#endregion






//#region Battler & Creature



SECore.getActors = function()
{
	let actors = [];
	$gameActors._data.forEach((a) => actors.push(a));
	return actors
}

//@audit SECore.spawnCreature()
SECore.spawnCreature = function(creatureID = -1, speciesID, encounter = false, creatureLevel = 0)
{
	let territoryID = currentTerritory._territoryID;
	let creature = PDL.createCreature(speciesID);
	if(creatureLevel == 0) 
	{
		creatureLevel = SECore.die(100);
	};
	let creatureID = creature._creatureID;
	creature._territoryID = territoryID;
	let creatureCardID = SECore.lastInWild()?.var[0];
	if(creatureCardID) creatureCardID = creatureID;
	creature.initCreature(creatureID, speciesID, creatureLevel);
	if(encounter || SECore.die(6) < 2) return creature.spawnEnemy(creatureID)
	return creature
}

SECore.initCreature = function(speciesID)
{
	let creatureID = SECore.lastInWild().var[0] || 0;
	$gameSwitches.setValue(cVar.lastEnemy, true);
	$gameVariables.setValue(cVar.characterID, creatureID); 
	$gameVariables.setValue(cVar.discard, speciesID);
}

SECore.discard = function()
{
	if ($gameActors.actor($gameVariables.value(cVar.lastActor)).mp < user.mmp) return true
		else return false
}

//#endregion






//#region message
SECore.message = {};

SECore.message.loading = function(message, queue)
{
	let editedMessage = `\\>${message}\\|\\^`;
	$gameMessage.setBackground(2);
	$gameMessage.setPositionType(2);
	let dot = ".";
	let bar = "|";
	let barCount = queue;
	let dotCount = 10 - queue;
	let loadbar = "";
	for(let i = 0; i < barCount; i++)
	{
		loadbar += bar;
	}
	for(let i = 0; i < dotCount; i++)
	{
		loadbar += dot;
	}
	$gameMessage.setSpeakerName("Loading" + loadbar);
	$gameMessage.add(editedMessage);
	$gameMap._interpreter.setWaitMode('message');
}

SECore.message.Log = function(message)
{
	$gameMessage.setBackground(2);
	$gameMessage.setPositionType(2);
	$gameMessage.add(message + "\\|\\^");
	return message
}

SECore.message.battleSimple = function(text = "")
{
	let message = `\\>${text}\\|\\^`
	$gameMessage.add(message);
	$gameTroop._interpreter.setWaitMode("message");
}

SECore.battleLoot = function()
{
	let item = $gameVariables.value(cVar.lastItem);
	if(item < 1)
	{
		return SECore.message.battleSimple("Could not find anything!")
	};
	$gameParty.gainItem($dataItems[item], 1);
	SECore.message.gainedItem(item);
	$gameVariables.setValue(cVar.lastItem, 0);
}

SECore.message.gainedItem = function(item)
{
	currentTerritory.biome.fertilityCost();
	let message = `\\>1x \\c[11]\\itic[${item}] acquired!\\|\\|\\>`;
	AudioManager.playSe($cgmzTemp.getSoundID("item"))
	$gameMessage.add(message);
	$gameTroop._interpreter.setWaitMode('message');
}


//#endregion





//#region procedural generation & dice
SECore.generateID = function(collection) {
	let genID = 0;
	let result = collection.findIndex((element) => element == undefined)
	if(result > 0) {
		genID = result;
	} else {
		genID = collection.length;
	};
	return genID;
};

SECore.generateNumbers = function(range, amount)
{
	let array = [];
	for(var i = 0; i < amount; i++)
	{
		array.push(SECore.die(range));
	}
	return array
}

/**
 * 
 * @param {array} array 
 * @returns {array} shuffled
 */
SECore.shuffle = function(array) {
	let currentIndex = array.length;
	while (currentIndex != 0) {
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [
					array[randomIndex], array[currentIndex]];
	}
	return array;
};

SECore.pickCardfromArray = function(array)
{
	if(array.length < 1)
	{
		return
	} else if(array.length < 2)
	{
		return array[0]
	} else {
		return SECore.shuffle(array)[0]
	}
}
SECore.filterSuitableCards = function(cardsToFilter, cardsToLookFor)
{
	if(cardsToFilter < 1)
	{
		return
	} else if(cardsToFilter < 2 && cardsToLookFor.find((c) => c == cardsToFilter[0]._skillId))
	{
		return [cardsToFilter[0]._skillId]
	}
	let results = [];
	for(var i = 0; i < cardsToLookFor.length; i++)
	{
		results.push(cardsToFilter.find((c) => c._skillId == cardsToLookFor[i]));
	}
	return results
}

SECore.die = function(dX) {
	let die = Math.ceil(Math.random() * dX)
	console.log("SECore.die() = " + die);
	return die
};

SECore.pickOne = function(number) {
	let result = Math.ceil(Math.random() * number)
	return result
};

SECore.pickArray = function(array)
{
	return array[SECore.die(array.length)]
}

/**
 * @desc pick a random value within the range between two values in an array
 * @param {array} array [lowerNumber,higherNumber]
 * @returns {Number} 
 */
SECore.rangeArray = function(array)
{
	let diff = Math.abs(array[0] - array[1]);
	return array[0] + Math.floor(Math.random() * diff)
}

SECore.setRange = function(minimum, inputNumber, maximum) {
	return Math.max(minimum, Math.min(inputNumber, maximum));
}

SECore.d6in3 = function(element) {
	switch(SECore.die(6)) {
	case 1:
	case 2:
		return element[0];
	case 3:
	case 4:
		return element[1];
	case 5:
	case 6:
		return element[2]
	}
};

SECore.randomSeed = function(item, dX, results) {
	let seed = SECore.die(dX);
	if(seed == dX) {
		results.push(item);
	}
};

SECore.weightedSeed = function(item, dX, weight, results) {
	for(var i = 0; i < weight; i++) {
		if(SECore.die(dX) == dX) {
			results.push(item)
		}
	}
	return results
};

SECore.forageSeed = function(array, dX, weight, results) {
	for(var i = 0; i < weight; i++) {
		if(SECore.die(dX) == dX) {
			array.forEach((b) => results.push(b))
		}
	}
	return results
};

SECore.fertilitySeed = function(item, fertility, weight, results, seeds = []) {
	if(fertility > 0) {
		SECore.weightedSeed(item, SEdice.weighted, weight, results);
		SECore.randomSeed(seeds[SECore.die(seeds.length - 1)], 6, results);
		fertility-- 
	} else {
		return
	}
};

SECore.getIndexFromValue = function(myArray, searchTerm, property) {
		console.log("Searching array with " + property + " matching " + searchTerm + "...");
		for(var i = 0, len = myArray.length; i < len; i++) {
				if (myArray[i].property === searchTerm) {
					var match = i--;
				}
		}
		if(match > 0) {
			console.log("Result: " + match);
			return match
		} else {
			console.log("Unable to find a match")
			return null
		}
};

/**
 * @desc pick a suitable value in the mode range of the provided means
 * @param {array} lowerMean [lowerNumber,higherNumber]
 * @param {array} Median [lowerNumber,higherNumber]
 * @param {array} higherMean [lowerNumber,higherNumber]
 * @returns {Number}
 */
SECore.modeRange = function(lowerMean, Median, higherMean)
{
	let result = SECore.die(4);
	switch (result) {
		case 1:
			result = SECore.rangeArray(lowerMean);
			break;
		case 2:
		case 3:
			result = SECore.rangeArray(Median);
			break;
		case 4:
			result = SECore.rangeArray(higherMean);
			break;
	}
	return result
}
//#endregion





//#region referencing & filtering


SECore.filterIndex = function(myArray, searchTerm, property) {
	console.log("Filtering " + property + " of array by " + searchTerm + "...");
	let matches = []
	for(var i = 0, len = myArray.length; i < len; i++) {
		if(myArray[i].property == searchTerm) {
			matches.push(i);
		}
	}
	if(matches.length > 0) {
		console.log(matches + " matches found.");
		return matches
	} else {
		console.log("Unable to find matches");
		return null
	}
};

SECore.matchIndex = function(match1, match2) {
	console.log("Looking for matches between results...")
	let matches = [];
	for(var i = 0; i < match1.length; i++) {
		for(var b = 0; b < match2.length; b++) {
			if(match1[i] == match2[b]) {
			matches.push(match1[i]);
			}
		}
	}
	if(matches > 0) {
		console.log(matches.length + " matches found.");
		return matches
	} else {
		console.log("Unable to find matches");
		return null
	}
};

SECore.findFilteredIndex = function(myArray, searchTerm1, property1, searchTerm2, property2) {
	var searchTerm = searchTerm1;
	var property = property1;
	let match1 = SECore.filterIndex(myArray, searchTerm, property);
	var searchTerm = searchTerm2;
	var property = property2;
	let match2 = SECore.filterIndex(myArray, searchTerm, property);
	return SECore.matchIndex(match1, match2)
};
//#endregion

//#endregion






//-----------------------------------------------------------------------------------
//#region plugin commands
PluginManager.registerCommand(SECore.pluginName, "SetTimeScale", args => {
		currentOption = args.newTimeScale;
		console.log("Time scale changed to: " + currentOption); // For debugging
});

PluginManager.registerCommand(SECore.pluginName, "SetCalendar", args => {
		currentOption = args.newCalendar;
		console.log("Calendar changed to: " + currentOption); // For debugging
});
//#endregion






//-----------------------------------------------------------------------------------
//#region Game System
SECore.Game_System_initialize = Game_System.prototype.initialize;
PDL.init = {};
var $dataHabitats = [];
var $dataHabitatStates = [];
var $dataResources = [];
var $dataSpecies = [];
var creature = $PDL.creature;
var habitat = $PDL.habitat;
var gameEvent = $PDL.event;
var exp = $PDL.exp;
var species = $PDL.species;

/**
 * {@link initPDL()}
 */
Game_System.prototype.initialize = function() {
	SECore.Game_System_initialize.call(this);
	this.initSECoreSettings();
	this.initPDL(); 
	this._initialized = true;
};

Game_System.prototype.initSECoreSettings = function() {
		//
};

Game_System.prototype.initPDL = function() {
	$dataHabitats = SECore.getHabitats();
	$dataHabitatStates = SECore.getHabitatStates();
	$dataResources = SECore.getResources();
	$dataSpecies = SECore.getSpecies();
	PDL._loaded = true;
};




//#endregion





//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//#region PDLManager
//-----------------------------------------------------------------------------------
MAGPIE.PDL.manager = {};
const PDLM = {};





//-----------------------------------------------------------------------------------
//#region creature
function creatures(creatureID)
{
	if((Number(creatureID) > -1) == false) 
	{
		MAGPIE.console.Log("Invalid creature ID!");
		return false
	}
	let hash = Math.floor(creatureID / 1000);
	let pos = creatureID % 1000;
	return $PDL.creature[hash].members[pos]
}

PDL.assignCreatureSlot = function()
{
	let pool = $PDL.creature;
	if(pool.length < 1) pool.push(new Creature_Pool(0));
	let hash = pool.findIndex(e => e.available);
	let slot = pool[hash].nextSlot;
	if(slot < 1000) {
		pool[hash].nextSlot++;
		return (hash * 1000) + slot
	} else {
		pool[hash].available = false;
		pool[hash + 1] = new Creature_Pool(hash + 1);
		pool[hash + 1].nextSlot++
		return ((hash + 1) *1000) + 0
	}
}

PDL.createCreature = function(species = 300, archetype = "undefined", genealogy = "undefined", 
nickName = "undefined", firstName = "undefined", lastName = "undefined")
{
	let pool = $PDL.creature;
	let ID = PDL.assignCreatureSlot();
	let slot1 = Math.floor(ID / 1000);
	let slot2 = ID % 1000;
	pool[slot1].members[slot2] = new Game_Creature(ID, species, archetype, genealogy, nickName, firstName, lastName);
	return creatures(ID)
}

function Creature_Pool(hash)
{
	this.hash = hash;
	this.available = true;
	this.nextSlot = 0;
	this.members = [];
}

//#endregion







//-----------------------------------------------------------------------------------
//#region Biomes







//#region CLIMATE
/**
 * @property {Number} GLACIAL -3
 * @property {Number} FRIGID -2
 * @property {Number} COLD -1
 * @property {Number} MILD 0
 * @property {Number} WARM 1
 * @property {Number} HOT 2
 * @property {Number} TORRID 3
 */
const CLIMATE = {};
CLIMATE.VOID = -10;
CLIMATE.GLACIAL = -3;
CLIMATE.FRIGID = -2;
CLIMATE.COLD = -1;
CLIMATE.MILD = 0;
CLIMATE.WARM = 1;
CLIMATE.HOT = 2;
CLIMATE.TORRID = 3;
//#endregion
//#region HUMIDITY
/**
 * @property {Number} DRY 1
 * @property {Number} ARID 2
 * @property {Number} HUMID 3
 * @property {Number} DAMP 4
 * @property {Number} WET 5
 * @property {Number} SOAK 6
 */
const HUMIDITY = {};
HUMIDITY.VOID = 0;
HUMIDITY.DRY = 1;
HUMIDITY.ARID = 2;
HUMIDITY.HUMID = 3;
HUMIDITY.DAMP = 4;
HUMIDITY.WET = 5;
HUMIDITY.SOAK = 6;
//#endregion
//#region HABITAT
/**
 * @property {String} SHRUB
 * @property {String} MEADOW
 * @property {String} TREE
 * @property {String} REEDS
 * @property {String} UNDERGROWTH
 * @property {String} POND
 */
const HABITAT = {};
HABITAT.SHRUB = "shrub"
HABITAT.MEADOW = "meadow";
HABITAT.TREE = "tree";
HABITAT.REEDS = "reeds";
HABITAT.UNDERGROWTH = "undergrowth";
HABITAT.POND = "pond";
//#endregion
//#region BATTLEBACK
const BATTLEBACK = {};
BATTLEBACK.STEPPE = 0;
BATTLEBACK.WOODS = 1;
BATTLEBACK.FOREST = 2;
BATTLEBACK.SWAMP = 3;
BATTLEBACK.WOODS = 4;
BATTLEBACK.LSO = 5;
//#endregion
//#region Biome
const BIOME = {}; 
BIOME.ENEMY = {};
BIOME.ENEMY.STEPPE = 1;
BIOME.ENEMY.WOODS = 1;
BIOME.ENEMY.FOREST = 1;
BIOME.ENEMY.SWAMP = 1;
BIOME.ENEMY.LSO = 1;
//#endregion
//#region Prototype

/**
 * 
 * @param {String} name lowerCase
 * @param {Number} clim CLIMATE.CLIMATE {@link CLIMATE}
 * @param {Number} hum HUMIDITY.HUMIDITY {@link HUMIDITY}
 * @param {Number} bb BATTLEBACK.BATTLEBACK
 * @param {Number} fert 0-100
 * @param {Number} cHab HABITAT.HABITAT
 * @param {Number} uncHab HABITAT.HABITAT
 * @param {Number} rHab HABITAT.HABITAT
 * @param {Number} unHab HABITAT.HABITAT
 * @param {Number} enID HABITAT.ENEMY.HABITAT
 */
function Biome(name = "", clim = 0, hum = 0, bb = 0, fert = 0, cHab = "", uncHab = "", rHab = "", unHab = "", enID = 0)
{
	this.initialize(name, clim, hum, bb, fert, cHab, uncHab, rHab, unHab, enID);
}

Biome.prototype.initialize = function(name, clim, hum, bb, fert, cHab, uncHab, rHab, unHab, enID)
{
	this.name = name;
	this.climate = clim;
	this.humidity = hum;
	this.battleback = bb;
	this._fertility = fert;
	this.commonHabitat = cHab;
	this.uncommonHabitat = uncHab;
	this.rareHabitat = rHab;
	this.uniqueHabitat = unHab;
	this.enemyID = enID;
	return this
}

Biome.prototype.setEnemy = function() {
	$gameTroop.members()[0].transform(this.enemyID); //Game_Territory
	$gameTroop.makeUniqueNames(); 
}

Biome.prototype.fertilityCost = function() {
	let chosenResource = $gameVariables.value(cVar.lastItem);
	if(chosenResource < 1)
	{
		return
	};
	let cost = Number($dataItems[chosenResource].meta?.NRG);
	this._fertility -= cost;
	return cost
};
//#endregion

//#region definitions
BIOME.STEPPE = new Biome("steppe", CLIMATE.MILD, HUMIDITY.ARID, BATTLEBACK.STEPPE, HABITAT.SHRUB, 
	HABITAT.MEADOW, HABITAT.TREE, HABITAT.REEDS, BIOME.ENEMY.STEPPE);
BIOME.WOODS = new Biome("woods", CLIMATE.MILD, HUMIDITY.HUMID, BATTLEBACK.WOODS, HABITAT.TREE, 
	HABITAT.SHRUB, HABITAT.UNDERGROWTH, HABITAT.MEADOW, BIOME.ENEMY.WOODS);
BIOME.FOREST = new Biome("forest", CLIMATE.MILD, HUMIDITY.DAMP, BATTLEBACK.FOREST, HABITAT.TREE, HABITAT.UNDERGROWTH,
	HABITAT.MEADOW, HABITAT.SHRUB, BIOME.ENEMY.FOREST);
BIOME.SWAMP = new Biome("swamp", CLIMATE.MILD, HUMIDITY.WET, BATTLEBACK.SWAMP, 
	HABITAT.REEDS, HABITAT.POND, HABITAT.SHRUB, HABITAT.TREE, BIOME.ENEMY.SWAMP);
BIOME.LOW_ORBIT_HABITABLE = new Biome("LSO", CLIMATE.VOID, HUMIDITY.VOID, BATTLEBACK.LSO, [], [], [], [], BIOME.ENEMY.LSO);



//#endregion

//#endregion







//-----------------------------------------------------------------------------------
//#region territory

PDLM.POI = {};
PDLM.POI.GENERIC = 0;
PDLM.POI.ORBITAL_STATION = 10;


// #region init
/**
 * @property {Number} territoryID auto-generated
 * @property {Number} mapID 
 * @property {Array} coords x,y
 * @property {String} POIname 
 * @property {Enumerator} POItype
 * @property {obj} biome {@link BIOME}
 * @property {Number} InitialFertility 0-100
 * @property {Array} seeds 
 * 
 */
function Game_Territory(territoryID, mapID = 0, coords = [0,0], POIname = "", 
	POItype = "", biome = {}, InitialFertility = 100, seeds = [])
{
	this.initialize(territoryID, mapID, coords, POIname, POItype, biome, InitialFertility, seeds)
};

Game_Territory.prototype.initialize = function(territoryID, mapID, coords, POIname, POItype, biome, InitialFertility, seeds) 
{
	this._territoryID = territoryID;
	this._mapID = mapID;
	this._coords = coords;
	this._POIname = POIname;
	this._POItype = POItype;
	this._biome = biome;
	this._fertility = InitialFertility;
	this._seeds = seeds;
	this._habitats = [];
	this._resources = [];
	this._inhabitants = [];
	this._events = [];
	this._exps = [];
	this._deck = [];
	this._wild = [];
	this._battleback = this._biome?.battleback;
	this._init = true;
	this._isValid = false;
};

Game_Territory.prototype.generateDeck = function() { //@audit-issue generateDeck needs rewrite
	//
};

Game_Territory.prototype.generateHabitats = function() {
	try {
		//HIMS.consoleMessage(consoleUser, consoleLog, "Starting Habitat generation...")
		let plausibleHabitats = this.generatePlausibleHabitats();
		let humidity = this.humidity();
		//let humidityID = humidities.findIndex(t => t.name == humidity)
		//let humiditySeed = humidities[humidityID].seed;
		let fertilizedHabitats = [];
		console.log("Seeding habitats to Territory...");
		plausibleHabitats.forEach((element) => SECore.fertilitySeed(element, this._fertility, humiditySeed, fertilizedHabitats, this._seeds));
		if(fertilizedHabitats.length > 0) {
			console.log("Habitats seeded.")
		return fertilizedHabitats
		} else {
			console.log("Unable to complete generation; quitting...");
			return false
		}
	} catch (error) {
		console.log(error)
		return false
	}
};

Game_Territory.prototype.suitableHabitats = function() {
	return $dataHabitats.filter((element) => eval(element.meta.biomes).filter((element) => element == this._biome))
};

Game_Territory.prototype.generatePlausibleHabitats = function() {
	try {
		console.log("Generating plausible habitats...")
		let suitableHabitats = this.suitableHabitats();
		if(suitableHabitats.length < 1) {
			console.log("No suitable habitats.");
			return false
		};
		let biome = this._biome;
		let commonHabitat = biome.commonHabitat || [];
		let uncommonHabitat = biome.uncommonHabitat || [];
		let rareHabitat = biome.rareHabitat || [];
		let uniqueHabitat = biome.uniqueHabitat || [];
		console.log("Common habitat: " + commonHabitat);
		console.log("Uncommon habitat: " + uncommonHabitat);
		console.log("Rare habitat: " + rareHabitat);
		console.log("Unique habitat: " + uniqueHabitat);
		console.log("Estimating plausible habitats..."); 
		let plausibleHabitats = [];
		SECore.weightedSeed(commonHabitat, SEdice.common, SEdice.weighted, plausibleHabitats);
		SECore.weightedSeed(uncommonHabitat, SEdice.uncommon, SEdice.weighted, plausibleHabitats);
		SECore.weightedSeed(rareHabitat, SEdice.rare, SEdice.weighted, plausibleHabitats);
		SECore.weightedSeed(uniqueHabitat, SEdice.unique, SEdice.weighted, plausibleHabitats);
		if(plausibleHabitats.length > 0) {
			console.log(plausibleHabitats.length + " plausible habitats seeded.");
			return plausibleHabitats
		} else {
			console.log("Unable to generate plausible habitats.")
			return false
		}
	} catch (error) {
		console.error(error);
		return false
	}
};

Game_Territory.prototype.explore = function()
{
	if(this._deck.length < 1)
	{
		this.redeck();
	}
	this._wild.push(this._deck.pop());
	let lastWild = this._wild[this._wild.length - 1];
	this.spawnController(lastWild);
	return lastWild._skillId
}



Game_Territory.prototype.redeck = function()
{
	this._wild.forEach((element) => this._deck.push(element));
	this._wild = [];
	SECore.shuffle(this._deck);
}

Game_Territory.prototype.spawnController = function(lastWild)
{
	if(lastWild.meta.hasOwnProperty("habitat"))
	{
		let candidates = this.getCreaturesInHabitat(lastWild);
		if (candidates.length > 1)
		{
			SECore.shuffle(candidates);
			return candidates[0]
		} else if (candidates.length > 0)
		{
			return candidates[0]
		};
	}
}

Game_Territory.prototype.getCreaturesInHabitat = function(currentHab)
{
	return this._inhabitants.filter((element) => element._habitat == currentHab)
}



//@follow-up Game_Territory
//#endregion





//#region meta
Game_Territory.prototype.proceduralSpawn = function()
{
	if(!PDL._proceduralSpawn) {
		return false
	};
	
}

Game_Territory.prototype.creatureController = function()
{
	if(this._inhabitants.length < 1) {
		return false
	}
	this._inhabitants.forEach((element) => {
		element.processBGturn();
	})
	//check and process each creature idle state
	//decide what stuff is relevant to player and play it
}

Game_Territory.prototype.loadDeck = function() {
	if(this._deck.length < 1) {
		this.generateDeck()
	} else {
		this._isValid = true
	};
	if(!this._isValid) {
		$gameMessage.add("\\>Territory deck invalid.\\|\\^");
		$gameTroop._interpreter.setWaitMode("message");
		return false
	};
	let leader = $gameParty.leader();
	this._deck.forEach(c => $gameParty.leader().addCardToZone(c, "territory"));
	leader.refresh();
	leader.shuffleZone("territory");
	return true
};

Game_Territory.prototype.saveDeck = function() {
	let leader = $gameParty.leader();
	let deck = leader._extraZones[zoneTerritoryId]._data;
	let wild = leader._extraZones[zoneWildId]._data;
	this._deck = [];
	deck.forEach((element) => this._deck.push(element._skillId)); 
	wild.forEach((element) => this._deck.push(element._skillId));
	let habitats = this._deck.filter(c => $dataSkills[c].meta?.habitat);
	habitats?.forEach(h => this._habitats?.find(c => c._habitatId === h.var[0])?.fromCard(h.var));
	let message = "\\>Territory deck saved with " + this._deck.length + " cards.\\|\\^";
	$gameMessage.add(message);
	$gameTroop._interpreter.setWaitMode("message");
}; 

function Territory_Pool(hash)
{
	this.hash = hash;
	this.available = true;
	this.nextSlot = 0;
	this.members = [];
}

SECore.startChallenge = function()
{
	let territory = $gameVariables.value(cVar.territory);
	if(territory.loadDeck()) return true
		else 
	{
		MAGPIE.console.Log("SECore.startChallenge() Error: invalid challenge");
		BattleManager.abort();
		return false
	}
}
//#endregion









//-----------------------------------------------------------------------------------
//#region Game_Region

function Game_Region(mapID, name)
{
	this.initialize(mapID, name);
}

Game_Region.prototype.initialize = function(mapID, name)
{
	this._mapID = mapID;
	this._name = name;
	this._territory = [];
	this._territory[0] = new Territory_Pool(0);
	return this
}

Game_Region.prototype.territory = function(territoryID)
{
	if((Number(territoryID) > -1) == false) 
	{
		MAGPIE.console.Log("Invalid territory ID!");
		return false
	}
	let hash = Math.floor(territoryID / 500);
	let pos = territoryID % 500;
	return this._territory[hash].members[pos]
}

Game_Region.prototype.territoryByName = function(territoryName)
{
	for(let i = 0; i < this._territory.length; i++)
	{
		let result = this._territory[i].members.find(m => m._POIname == territoryName);
		if(!result) {} else {return result}
	}
}

Game_Region.prototype.assignSlot = function()
{
	let hash = this._territory.findIndex(e => e.available);
	let slot = this._territory[hash].nextSlot;
	if(slot < 500) {
		this._territory[hash].nextSlot++;
		return (hash * 500) + slot
	} else {
		this._territory[hash].available = false;
		this._territory[hash + 1] = new Territory_Pool(hash + 1);
		this._territory[hash + 1].nextSlot++
		return ((hash + 1) * 500) + 0
	}
}

/**
 *
 * @param {Array} coords x,y
 * @param {String} POIname 
 * @param {Enumerator} POItype 
 * @param {Enumerator} biome {@link BIOME}
 * @param {Number} InitialFertility 0-100 
 * @param {Array} seeds 
 * @returns 
 */
Game_Region.createTerritory = {};
Game_Region.prototype.createTerritory = function(coords = [0,0], POIname = "", 
	POItype = "", biome = {}, InitialFertility = 100, seeds = [])
{
	if(!coords) coords = SECore.getCoords();
	let ID = this.assignSlot();
	let slot1 = Math.floor(ID / 500);
	let slot2 = ID % 500;
	this._territory[slot1].members[slot2] = new Game_Territory(ID, this._mapID, coords, POIname, 
	POItype, biome, InitialFertility, seeds);
	let territory = this._territory[slot1].members[slot2];
	return territory
}

Game_Region.prototype.initTerritoryScene = function(territory) {
	if(!territory) {
		let x = eval(System_playerX);
		let y = eval(System_playerY);
		let POItype = undefined;
		let biome = undefined;
		let fertility = 100;
		let seeds = [];
		territory = this.createTerritory([x, y], `${x}-${y}`, POItype, biome, fertility, seeds);
	};
	try {
		this.enterTerritory(territory._territoryID); 
		return true
	} catch (error) {
		console.error(error); 
		return false};
};

Game_Region.prototype.enterTerritory = function(territoryID) {
	currentTerritory = this.territory(territoryID);
	$gameVariables.setValue(cVar.territory, currentTerritory);
	$gameVariables.setValue(cVar.territoryID, currentTerritory._territoryID)
	let canLoad = true;
	if(canLoad) {
		return true
	} else {
		return false
	}
};

Game_Region.prototype.exitTerritory = function()
{
	this.territory(currentTerritory._territoryID).saveDeck();
	$gameParty.members().forEach(actor => {
		actor.gainHp(actor.mhp); 
		actor.gainMp(actor.mmp)
	})
}

SECore.enterTerritory = function()
{
	try {
		return currentMap.enterTerritory(currentTerritory._territoryID);
	} catch (error) {
		return false
	} 
}

SECore.exitTerritory = function()
{
	let territory = $gameVariables.value(cVar.territory);
	return territory.exitTerritory()
}

SECore.regionInit = function(container = {}, regionName, mapID = eval(currentMapIDcall))
{
	let region = new Game_Region(mapID, regionName);
	container.push(region);
	return region
}

SECore.addShelderRegion = function(regionName = "", mapID = eval(currentMapIDcall))
{
	return $PDL.map[0].system.planet[3]._regions[mapID] = new Game_Region(mapID, regionName)
}

//#endregion







//-----------------------------------------------------------------------------------
//#region Game_Celestial

function Game_Celestial(mapID, name)
{
	this.initialize(mapID, name)
}

Game_Celestial.prototype.initialize = function(mapID, name, Emass = 1)
{
	this._mapID = mapID;
	this._name = name;
	this._regions = [];
	this._orbits = [];
	this._Emass = Emass;
}

Game_Celestial.prototype.pushRegion = function(mapID, name = "")
{
	return this._regions.push(new Game_Region(mapID, name))
}

Game_Celestial.prototype.regionByID = function(mapID)
{
	return this._regions.find(r => r._mapID === mapID)
}

Game_Celestial.prototype.regionByName = function(regionName) 
{
	return this._regions.find(r => r._name == regionName)
}

Game_Celestial.prototype.scaleOrbit = function(apo)
{
	return this._Emass * apo
}

Game_Celestial.prototype.orbitByMapID = function(mapID)
{
	return this._orbits.find(o => o._mapID === mapID)
}

Game_Celestial.prototype.orbitByName = function(name)
{
	return this._orbits.find(o => o._name == name)
}

Game_Celestial.prototype.lowOrbits = function()
{
	return this._orbits.filter(o => o._ap < this.scaleOrbit(2000))
}

Game_Celestial.prototype.midObirts = function()
{
	return this._orbits.filter(o => o._ap > this.scaleOrbit(2000) && o._ap < this.scaleOrbit(35000))
}

Game_Celestial.prototype.highOrbits = function()
{
	return this._orbits.filter(o => o._ap > this.scaleOrbit(35000))
}

function Game_Planet(mapID, name)
{
	this.initialize(mapID, name);
}

Game_Planet.prototype = Object.create(Game_Celestial.prototype);
Game_Planet.prototype.constructor = Game_Planet;

Game_Planet.prototype.initialize = function(mapID, name)
{
	Game_Celestial.prototype.initialize.call(this, mapID, name);
	this.moon = [];
}

function Game_Moon(mapID = undefined, name = "")
{
	this.initialize(mapID, name);
}
Game_Moon.prototype = Object.create(Game_Celestial.prototype);
Game_Moon.prototype.constructor = Game_Moon;
Game_Moon.prototype.initialize = function(mapID, name)
{
	Game_Celestial.prototype.initialize.call(this, mapID, name);
}

function Game_Orbit(mapID = 0, name = "", parent)
{
	this.initialize(mapID, name, parent);
}

Game_Orbit.prototype = Object.create(Game_Region.prototype);
Game_Orbit.prototype.constructor = Game_Orbit;
Game_Orbit.prototype.initialize = function(mapID, name, parent)
{
	Game_Region.prototype.initialize.call(this, mapID, name);
	this._ap = 0;
	this._pe = 0;
	this._inc = 0;
	this._ecc = 0;
	this._parent = parent;
	return this
}

Game_Orbit.prototype.setupOrbit = function(apo, peri, inc)
{
	this._ap = apo;
	this._pe = peri;
	this._inc = inc;
	return this
}

function Game_Star(mapID, name)
{
	this.initialize(mapID, name);
}
Game_Star.prototype = Object.create(Game_Celestial.prototype);
Game_Star.prototype.constructor = Game_Star;
Game_Star.prototype.initialize = function(mapID, name)
{
	Game_Celestial.prototype.initialize.call(this, mapID, name);
	return this.system = new Game_StarSystem(mapID, name + " system", name)
}

function Game_StarSystem(mapID, name, parent)
{
	this.initialize(mapID, name, parent)
}

Game_StarSystem.prototype = Object.create(Game_Region.prototype);
Game_StarSystem.prototype.constructor = Game_StarSystem;
Game_StarSystem.prototype.initialize = function(mapID, name, parent)
{
	Game_Region.prototype.initialize.call(this, mapID, name);
	this._star = parent;
	this.planet = [];
}

Game_StarSystem.prototype.star = function()
{
	return $PDL.map?.find(s => s?._name == this._star)
}



//#endregion




//#endregion










//-----------------------------------------------------------------------------------
//#region Components






//#region Structure

function Game_Structure(name)
{
	this.initialize(name)
}

Game_Structure.prototype = Object.create(LinkedList.prototype);
Game_Structure.prototype.constructor = Game_Structure;
Game_Structure.prototype.initialize = function(name)
{
	let firstNode = new Game_Deck();
	this._name = name;
	return LinkedList.prototype.initialize.call(this, firstNode)
}

//@audit-issue pushRoom() doesn't work: will prevent saving
Game_Structure.prototype.pushRoom = function(deck = new Game_Deck(), doors = []) 
{
	if(this?._doors && this?._doors?.length > 0) doors = this._doors;
	let room = this.pushNode({deck: deck, doors: doors});
	this._doors = [];
	return room
}

Game_Structure.prototype.addDoor = function(name)
{
	if(!this?._doors) this._doors = [];
	return this._doors.push(name)
}


//#endregion






//#region Deck

function Game_Deck()
{
	this.initialize(...arguments);
}

Game_Deck.prototype.initialize = function()
{
	this._cards = [];
}

Game_Deck.prototype.load = function()
{
	if(this._cards.length < 1) this.generate();
	let leader = $gameParty.leader();
	this._cards.forEach(c => leader.addCardToZone(c, "territory"));
	leader.refresh();
	leader.shuffleZone("territory");
	this._cards = [];
}

Game_Deck.prototype.generate = function()
{
	//
}

Game_Deck.prototype.save = function()
{
	let leader = $gameParty.leader();
	let deck = leader._extraZones[zoneTerritoryId]._data;
	let wild = leader._extraZones[zoneWildId]._data;
	this._cards = [];
	deck.forEach((element) => this._cards.push(element._skillId)); 
	wild.forEach((element) => this._cards.push(element._skillId));
	let habitats = this._cards.filter(c => $dataSkills[c].meta?.habitat);
	habitats?.forEach(h => this._habitats?.find(c => c._habitatId === h.var[0])?.fromCard(h.var));
	let message = "Territory deck saved with " + this._cards.length + " cards.";
	$gameMessage.add(message);
	$gameTroop._interpreter.setWaitMode("message");
}

Game_Habitat

//#endregion

//#endregion








//-----------------------------------------------------------------------------------
//#region predefinitions

setupShelSystem = function()
{
	$PDL.map[0] = new Game_Star(0, "Shel");
	$PDL.map[0].system.planet[3] = new Game_Planet(3, "Shelder");
	let Shelder = $PDL.map[0].system.planet[3];
	{
		Shelder.moon[0] = new Game_Moon(6, "Shelyn");
		{
			Shelder.moon[0]._orbits.push(new Game_Orbit(7, "LMO1", "Moon"));
			let Moon = Shelder.moon[0];
			/**
			 * {@link Game_Region.createTerritory()}
			 */
			let Hestia_Station = Moon.orbitByName("LMO1").createTerritory([26,7], "Hestia_Station", PDLM.POI.ORBITAL_STATION,
				BIOME.LOW_ORBIT_HABITABLE, 0, []);
			Hestia_Station._structure = new Game_Structure("Hestia_Station");
		}
		Shelder._orbits.push(new Game_Orbit(4, "LSO1", "Shelder"));
		Shelder.orbitByName("LSO1").setupOrbit(400,400,57);
	}
}

//#endregion








//-----------------------------------------------------------------------------------
//#region Species

PDL.initSpecies = function()
{
	let species = $PDL.species;
	$dataSpecies.forEach(s => species.push(new Game_Species(s.id)))
}

//#endregion








//-----------------------------------------------------------------------------------
//#region event
PDLM.EVENT = {};
PDLM.EVENT.POI = 0;
PDLM.EVENT.POI_GENERIC = 1;




//#region gameEvent
function PDL_Event(mapID = 2, eventID = 0, name = "", type = PDLM.EVENT)
{
	this.initialize(mapID, eventID, name, type);
}

PDL_Event.prototype.initialize = function(mapID, eventID, name, type)
{
	this._mapID = mapID;
	this._eventID = eventID;
	this._name = name;
	this._type = type;
}

PDL_Event.prototype.getCurrentIndex = function()
{
	return $dataMap.events.filter(e => e != null)
	.findIndex(r => r.name == this._name)
}

/**
 * @desc Spawn event to x,y coords
 * @param {String} type 'xy' spawns on a specific x,y location | 'regions' spawns on a rangom region in the data specified
 * @param {Array} data [x,y] if using 'xy' type above | [id,id,id,id,id] if using 'regions' above
 * @param {String} overlap 'all' event will spawn on top of anything | 
 * 'terrain' event will spawn blocking terrain but not chars | 
 * 'chars' event will spawn on events/player but not terrain
 * @param {Boolean} save true means events will be saved and stay; on the map if the player leaves. false means the event
 * will disappear when player leaves the map.
 */
PDL_Event.prototype.spawn = function(type = 'xy', data = [0,0], overlap = 'all', save = true)
{
	Galv.SPAWN.event(this._eventID,type,data,overlap,save);
	let last = $dataMap.events.length - 1;
	return this._index = $dataMap.events[last] 
}

PDL_Event.prototype.changeImageSheet = function(image = "", page = 0)
{
	this._index.pages[page].image.characterName = image;
}

PDL_Event.prototype.setupImageCharacter = function(page = 0, index = 0, direction = 2, pattern = 1)
{
	let image = this._index.pages[page].image;
	image.characterIndex = index;
	image.direction = direction;
	image.pattern = pattern;
}

function PDL_EventPOI(mapID = 0, index = 0, name = "", type = PDLM.EVENT.POI)
{
	this.initialize(mapID, index, name, type);
}
PDL_EventPOI.prototype = Object.create(PDL_Event.prototype);
PDL_EventPOI.prototype.constructor = PDL_EventPOI;
PDL_EventPOI.prototype.initialize = function(mapID, index, name, type)
{
	PDL_EventPOI.prototype.initialize.call(this, mapID, index, name, type);
	this.setupPOI();
}

PDL_EventPOI.prototype.setupPOI = function(POIname = "", POInickName = "", POItype = PDLM.EVENT.POI_GENERIC)
{
	this._POIname = POIname;
	this._POInickName = POInickName;
	this._eventID = POItype;
}

PDL_EventPOI.prototype.setupDestination = function(POImapID, POIx, POIy)
{
	this._POImapID = POImapID;
	this._POIx = POIx;
	this._POIy = POIy;
}

PDL_EventPOI.prototype.deployFromTemplate = function(x, y, POImapID = 0, POIx = 0, POIy = 0)
{
	this.setupDestination(POImapID, POIx, POIy);
	let index = this.spawn('xy', [x,y], 'all', true);
	let page = $dataMap.events[index].pages[1];
	page.list[1].parameters = ["event_text : " + this._POInickName];
	page.list[3].parameters = [`let message = ${this._POInickName};`];
	page.list[9].parameters = [`$gameVariables.setValue(61, ${this._POImapID})`];
	page.list[10].parameters = [`$gameVariables.setValue(36, ${this._POIx});`];
	page.list[11].parameters = [`$gameVariables.setValue(37, ${this._POIy});`];
}
//#endregion







//#region Meta event

PDLM.META = {};
PDLM.META.EVENT = [];
PDLM.META.SCALE = {};
PDLM.META.SCALE.EON = {name: "Eon", desc: "Several hundred million years to two billion years"};
PDLM.META.SCALE.ERA = {name: "Era", desc: "Tens to hundreds of millions of years"};
PDLM.META.SCALE.PERIOD = {name: "Period", desc: "Millions of years to tens of millions of years"};
PDLM.META.SCALE.EPOCH = {name: "Epoch", desc: "Hundreds of thousands of years to tens of millions of years"};
PDLM.META.SCALE.SUBEPOCH = {name: "Sub-Epoch", desc: "Thousands of years to millions of years"};
PDLM.META.SCALE.AGE = {name: "Age", desc: "Thousands of years to millions of years"};
PDLM.META.SCALE.SUBAGE = {name: "Sub-Age", desc: "Years to thousands of years"};
PDLM.META.SCALE.EARLY = -1;
PDLM.META.SCALE.LATE = 1;
PDLM.META.SCALE.MYA = -1000000;
PDLM.META.SCALE.GYA = -1000000000;
PDLM.META.URGENCY = {PEACE: 0, WARNING: 1, ALERT: 2, LOCKDOWN: 3, MAX: 4};
PDLM.META.GRAVITY = {TRIVIAL: 0, IMPORTANT: 1, CRITICAL: 3, SEVERE: 4, EXISTENTIAL: 5};
PDLM.META.AMBIGUITY = {UNIVERSAL: 0, AMBIGUOUS: 1, CONTESTED: 2, SECRET: 3, TOPSECRET: 4};

function Event_Meta(name)
{
	this.initialize(name);
}

Event_Meta.prototype.initialize = function(name)
{
	this.name = name;
	this.content = {};
}

Event_Meta.prototype.convertEpoch = function(epoch = 0, calendar = -1)
{
	if(Math.abs(epoch) > 1000000) return false
	let year = Math.abs(Math.floor(epoch))
	let before = false;
	if(epoch < 0) before = true;
	let selectedCalendar;
	if(calendar < 0) 
	{
		selectedCalendar = currentCalendar;
	}
	else
	{
		selectedCalendar = timesystem[calendar];
	}
	let days = Math.floor(Math.abs(epoch % Math.floor(epoch)) * selectedCalendar.Year);
	let month = selectedCalendar.yearDayToMonth(days);
	let day = selectedCalendar.convertYearDay(month);
	return new Game_Date(calendar, before, year, month, day)
}


/**
 * 
 * @param {Enumerator} type PDLM.META.SCALE 
 * @param {String} name Time name (simple)
 * @param {Number} start year (negative for before 0)
 * @param {Number} end year (negative for before 0; must be higher than start)
 */
Event_Meta.prototype.addGeologicTime = function(type = "", name = "", start = 0, end = 0)
{
	this[name] = new Event_Geologic(type, name, start, end);
}

function Event_Geologic(type = "", name = "", start = 0, end = 0)
{
	this.initialize(type, name, start, end)
}

Event_Geologic.prototype = Object.create(Event_Meta.prototype);
Event_Geologic.prototype.constructor = Event_Geologic;
Event_Geologic.prototype.initialize = function(type, name, start, end)
{
	Event_Meta.prototype.initialize.call(this, name);
	this.type = type;
	this.start = start;
	this.end = end;
}

Event_Geologic.prototype.MYa = function()
{
	if(start > 0) return false
	let start = Math.floor(this.start / 1000000);
	let end = Math.floor(this.end / 1000000);
	return [start,end]
}

Event_Geologic.prototype.textMYaStart = function()
{
	return `${this.MYa()[0]} MYa`;
}

Event_Geologic.prototype.textMYaEnd = function()
{
	return `${this.MYa()[1]} MYa`
}

class Game_Date
{
	constructor(calendar = 0, before = false, year = 0, month = 1, day = 1, hour = 0, minute = 0)
	{
		this.calendar = calendar;
		this.before = before;
		this.year = year;
		this.month = month;
		this.day = day;
		this.hour = hour;
		this.minute = minute;
	}

	set year(newYear)
	{
		if(typeof newYear === "number")
		{
			this._year = newYear;
		}
		else
		{
			console.error("Year must be a number");
		}
	}

	set month(newMonth)
	{
		if(newMonth > 0)
		{
			this._month = newMonth;
		}
		else
		{
			console.error(`Month must be a non-negative number`)
		}
	}

	set day(newDay)
	{
		if(newDay > 0)
		{
			this._day = newDay;
		}
		else
		{
			console.error("Day must be set to non-negative number")
		}
	}

	get year()
	{
		return this._year
	}

	get month()
	{
		return this._month
	}

	get day()
	{
		return this._day
	}
	
}


function Event_Historic(name = "", epoch = 0, urgency, gravity, ambiguity, location)
{
	this.initialize(name, epoch, urgency, gravity, ambiguity, location);
}

Event_Historic.prototype = Object.create(Event_Meta.prototype);
Event_Historic.prototype.constructor = Event_Historic;
Event_Historic.prototype.initialize = function(name, epoch, urgency, gravity, ambiguity, location)
{
	Event_Meta.prototype.initialize.call(this, name);
	this.epoch = epoch;
	this.urgency = urgency;
	this.gravity = gravity;
	this.ambiguity = ambiguity;
	this.location = location;
}



//#endregion





//#endregion















//#endregion






//-----------------------------------------------------------------------------------
//#region CBE Manager
/**
 * {@link MAGPIE.CBE.condition}
 */
MAGPIE.CBE.manager = {}; 
MAGPIE.CBE.branch = [];





//#region Utilities

CBE.generateID = function(ID, collection)
{
	if(ID > 0)
	{
		if(collection[ID] != undefined)
		{
			return ID
		}
	}
	let index = collection.findIndex((element) => element == undefined);
	if(index > 0)
	{
		return index
	}
	return collection.length
}

CBE.getTroop = function()
{
	let enemies = [];
	let troop = $gameTroop._enemies;
	troop.forEach((element) => enemies.push(element));
	enemies.shift();
	return enemies
}

CBE.isFieldClear = function()
{
	if(CBE.getTroop().find((element) => element.isAppeared())) 
	{
		return false
	} else {
		return true
	}
}


//#endregion






//#region Init



//#endregion





//#region Meta

CBE.metaSleep = function()
{
	//recover members
	//advance time
	//update PDL
}

CBE.habitatCombo = function(subject, action, habitatId) 
{
	let meta = $dataStates[habitatId].meta;
	let habMass = eval(meta.habMass);
	let habAggro = eval(meta.habAggro);
	let habDex = eval(meta.habDex);
	let habSen = eval(meta.habSen);
	if(action == "add")
	{
		CBE.bulkAddState(subject, habCombos.mass, habMass);
		CBE.bulkAddState(subject, habCombos.aggro, habAggro);
		CBE.bulkAddState(subject, habCombos.dex, habDex);
		CBE.bulkAddState(subject, habCombos.sen, habSen);
	}
	if(action == "remove")
	{
		CBE.bulkRemoveState(subject, habCombos.mass, habMass);
		CBE.bulkRemoveState(subject, habCombos.aggro, habAggro);
		CBE.bulkRemoveState(subject, habCombos.dex, habDex);
		CBE.bulkRemoveState(subject, habCombos.sen, habSen);
	}
}

CBE.bulkAddState = function(subject, states, amount)
{
	let stateId = 0;
	if(amount > 0)
	{
		stateId = states[0]
	} else {
		stateId = states[1]
	};
	for(var i = 0; i < Math.abs(amount); i++)
	{
		subject.addState(stateId);
	}
}

CBE.bulkRemoveState = function(subject, states, amount)
{
	let stateId = 0;
	if(amount > 0)
	{
		stateId = states[0]
	} else {
		stateId = states[1]
	};
	for(var i = 0; i < Math.abs(amount); i++)
	{
		subject.removeState(stateId);
	}
}

//#endregion





//#region Battle
CBE.keywordCommon = {
	addBleedTarget: "b.addState(inuries.bleed)"
}

CBE.keywordAction = {
	sharpteeth: CBE.keywordCommon["addBleedTarget"],
	claws: CBE.keywordCommon["addBleedTarget"]
}

/**
 * @desc Spawns a group of enemies of the same species with a suitable level
 * @param {Number} speciesID 
 * @param {Number} amount 
 */
CBE.spawnSpeciesGroup = function(speciesID, amount)
{
	// let data = species.find((element) => element._speciesID == speciesID);
	// let juvies = eval(data.meta.juvenile[0]);
	// let subs = eval(data.meta.adolescent[0]);
	// let adults = eval(data.meta.adult[0]);
	// let elders = eval(data.meta.adult[1]);
	// let lowerMean = [juvies,subs];
	// let Median = [subs,adults];
	// let higherMean = [adults,elders];
	// let extra = 0;
	// if(amount > 7)
	// {
	//   extra = amount - 7;
	//   amount = 7;
	// };
	// for(var i = 0; i < amount; i++)
	// {
	//   SECore.spawnEnemy(0, speciesID, SECore.modeRange(lowerMean,Median,higherMean))
	// }
	// return extra @audit-issue spawnSpeciesGroup
	let extra = 0;
	if(amount > 7) {
		extra = amount - 7;
		amount = 7;
	};
	for(var i = 0; i < amount; i++)
	{
		SECore.spawnCreature(speciesID, true)
	}
	return extra
}

//#endregion





//#region CBE_Branch

function CBE_Branch(name, firstNode = "")
{
	this.initialize(name, firstNode);
}

CBE_Branch.prototype = Object.create(LinkedList.prototype);
CBE_Branch.prototype.constructor = CBE_Branch;
CBE_Branch.prototype.initialize = function(name, firstNode)
{
	LinkedList.prototype.initialize.call(this, firstNode);
	this._name = name;
}

CBE_Branch.prototype.newEvent = function(eventName = "", eventDesc = "", eventId = undefined)
{
	let event = new HIMS_Event(eventName, eventDesc, eventId);
	this.pushNode(event);
	return event
}

CBE_Branch.prototype.linkEvent = function(event)
{
	return this.pushNode(event)
}

CBE_Branch.prototype.check = function(event)
{
	let check = this.head.value;
	if(event === check || event == check?._name) return this.shiftNode()
		else return false
}

CBE_Branch.prototype.pushClosedNode = function(nodeName = "")
{
	let node = this.pushNode({_name: nodeName, type: HIMS.EVENT.NODE_CLOSED, _choices: this?._choices});
	this._choices = [];
	this.length += 1;
	return node
}

CBE_Branch.prototype.addChoice = function(choiceName, choiceDesc, switchName = undefined)
{
	if(!this?._choices || this?._choices?.length < 1) this._choices = [];
	let event = new HIMS_Event(choiceName, choiceDesc, HIMS.EVENT.CHOICE);
	this._choices.push(event);
	if(switchName) event.addSwitch(switchName);
	return event
}

CBE_Branch.prototype.checkChoice = function(choiceName)
{
	if(!this.head?.value?._choices) return false
	let choice = this.head?.value?._choices.find(c => c._name == choiceName);
	if(!choice) return false
	choice?._switches[0]?.turnON();
	if(!this?._choices) this._choices = [];
	this._choices.push(choice);
	return this.shiftNode()
}




//#endregion






//#endregion






//-----------------------------------------------------------------------------------
//#region Game_Species

function Game_Species()
{
	this.initialize(...arguments)
}
Game_Species.prototype.initialize = function(speciesID = "")
{
	this._speciesID = speciesID;
	this.genus = "undefined";
	this.species = "undefined";
	this._physique = "undefined";
	this._traits = [];
	this._Ptraits = [];
	this._evo = "undefined";
	this._parent = "undefined";
	this.surviveSkills = [];
	this.competeSkills = [];
	this.adaptSkills = [];
	this.interactSkills = [];
	this.metaSkills = [];
	this._genealogies = [];
	this.setup();
}


Game_Species.prototype.setup = function()
{
	if(this.skillCard() == undefined){
		return
	};
	this.genus = this.skillCard().meta.genus;
	this.species = this.skillCard().meta.species;
	this._physique = this.getPhysiqueFromCard();
	this.getTraits();
	this.getPtraitsFromPhysique();
	this.getPtraitsFromTraits();
	this._evo = eval(this.skillCard().meta.evo);
	this.surviveSkills = this.getInstinct(Instincts.SURVIVE);
	this.competeSkills = this.getInstinct(Instincts.COMPETE);
	this.interactSkills = this.getInstinct(Instincts.INTERACT);
	this.adaptSkills = this.getInstinct(Instincts.ADAPT);
	this.metaSkills = this.getInstinct(Instincts.META);
}

Game_Species.prototype.name = function()
{
	return this.genus + " " + this.species
}

Game_Species.prototype.skillCard = function() 
{
	return $dataSkills[this._speciesID]
}

Game_Species.prototype.getPhysiqueFromCard = function()
{
	return Number(this.skillCard().meta.physique);
}

Game_Species.prototype.physique = function()
{
	return $dataArmors[this._physique]
}

Game_Species.prototype.getTraits = function()
{
	let physique = this.physique().meta.physique;
	$dataArmors.filter(a => a !== null && a.meta?.[physique])
		.forEach(e => this._traits.push(e.id));
}

Game_Species.prototype.getPhysiqueTraits = function()
{
	return eval(this.physique().meta?.traitsPhysique)
}

Game_Species.prototype.getPtraitsFromPhysique = function()
{
	if(!this.physique().meta.hasOwnProperty("Ptraits"))
	{
		return
	};
	eval(this.physique().meta.Ptraits).forEach((element) => this._Ptraits.push(element))
}

Game_Species.prototype.getPtraitsFromTraits = function()
{
	//let Ptraits = this._Ptraits;
	//this.traitsWithPtraits().forEach((t) => SECore.extractPtraits(t).forEach((p) => Ptraits.push(p)))
	this.traitsWithPtraits().forEach(t => SECore.getMetaPool($dataArmors[t], "Ptraits").forEach(e => this._Ptraits.push(e)));
}

Game_Species.prototype.traitsWithPtraits = function()
{
	return this._traits.filter((t) => $dataArmors[t].meta?.["Ptraits"])
}

SECore.getMetaPool = function(element, property)
{
	let pool = element.meta[property];
	return eval(pool)
}

Game_Species.prototype.hasTrait = function(trait)
{
	return this.skillCard().meta.hasOwnProperty(trait)
}

Game_Species.prototype.getTraitValue = function(trait = "")
{
	let meta = this.skillCard().meta;
	if(meta.hasOwnProperty(trait))
	{return eval(meta[trait])} else {return []}
}

/**
 * 
 * @param {property} type Instincts {SURVIVE,COMPETE,INTERACT,ADAPT,META}
 * @returns {array} skills by instinct type
 */
Game_Species.prototype.getInstinct = function(type)
{
	return this.getTraitValue(type)
}

Game_Species.prototype.children = function() {
	return $PDL.species.filter((element) => element._parent = this._speciesID)
};

Game_Species.prototype.getGrowthStage = function(totalGrowth) //@audit getGrowthStage
{
	let meta = this.skillCard().meta
	if(totalGrowth < eval(meta.juvenile)[0] * this._evo)
	{
		return ["infant",eval(meta.infant)]
	} else if(totalGrowth < eval(meta.adolescent)[0] * this._evo)
	{
		return ["juvenile",eval(meta.juvenile)[1]]
	} else if(totalGrowth < eval(meta.adult)[0] * this._evo)
	{
		return ["adolescent",eval(meta.adolescent)[1]]
	} else if (totalGrowth < eval(meta.adult)[1] * this._evo)
	{
		return ["adult",eval(meta.adult)[2]]
	} else {
		return ["elder",eval(meta.adult)[2]]
	}
}

Game_Species.prototype.isHerbivore = function()
{
	let digestion = this._traits.find((element) => element.meta.hasOwnProperty("digestion")).meta.digestion;
	if(digestion == "herbivore")
		{
			return true
		} else {
			return false
		}
}

Game_Species.prototype.isCarnivore = function()
{
	let digestion = this._traits.find((element) => element.meta.hasOwnProperty("digestion")).meta.digestion;
	if(digestion == "carnivore")
	{
		return true
	} else {
		return false
	}
}

Game_Species.prototype.seekPlant = function(resourcePool)
{
	let fibers = resourcePool.filter((element) => $dataItems[element].meta.hasOwnProperty("fiber"));
	if(fibers.length > 1)
	{
		return fibers.sort((a,b) => Number($dataItems[b].meta.tp) - Number($dataItems[a].meta.tp))[0]
	} else if (fibers.length > 0) {
		return fibers[0]
	} else {
		return false
	}
}

Game_Species.prototype.seekMeat = function(resourcePool)
{
	let meat = resourcePool.filter((element) => $dataItems[element].meta.hasOwnProperty("meat"));
	if(meat.length > 1)
	{
		return meat.sort((a,b) => Number($dataItems[b].meta.tp) - Number($dataItems[a].meta.tp))[0]
	} else if (meat.length > 0) {
		return meat[0]
	} else {
		return false
	}
}


//#endregion






//#region Game_Genealogy @audit genealogy

function Game_Genealogy()
{
	this.initialize(...arguments);
}

Game_Genealogy.prototype.initialize = function(creatureID, motherId = null, fatherId = null)
{
	this._id = creatureID;
	this._mother = motherId;
	this._father = fatherId;
	this._childrenIds = [];
}

Game_Genealogy.prototype.mother = function()
{
	return creatures(this._mother)
}

Game_Genealogy.prototype.setupParents = function()
{
	if(this._mother == null)
	{
		return false
	}
	let children = creatures(this._mother)._genealogy._childrenIds;
	if(!children.includes(this._id))
	{
		children.push(this._id)
	}
	if(this._father == null)
	{
		return
	}
	children = creatures(this._father)._genealogy._childrenIds;
	if(!children.includes(this._id))
	{
		children.push(this._id)
	}
}

Game_Genealogy.prototype.thisCreature = function()
{
	return creaturs(this._id)
}

Game_Genealogy.prototype.addChild = function(childId, fatherId)
{
	if(this.thisCreature()._sex != "female")
	{
		return false
	};
	this._childrenIds.push(childId);
	let creature = creatures(childId);
	creature._genealogy._mother = this._id;
	creature._genealogy._father = fatherId;
	return creature._genealogy
}

Game_Genealogy.prototype.father = function()
{
	return creatures(this._father)
}

Game_Genealogy.prototype.children = function()
{
	return this._childrenIds
}

Game_Genealogy.prototype.siblings = function()
{
	if(this._mother == null)
	{
		$gameMessage.add("Genealogy error: invalid parents.")
	};
	let results = []
	this.mother()._genealogy.children().filter(c => c !== this._id).forEach(r => results.push(creatures(r)));
	return results
}





//#endregion





//-----------------------------------------------------------------------------------
//#region Game_Creature



MAGPIE.PDL.ARCHETYPE = {};
MAGPIE.PDL.ARCHETYPE.PROTAGONIST = 0;
MAGPIE.PDL.ARCHETYPE.ANTAGONIST = 1;
MAGPIE.PDL.ARCHETYPE.SUPPORT = 2;
MAGPIE.PDL.ARCHETYPE.EXTRA = 3;
MAGPIE.PDL.ARCHETYPE.DISPOSABLE = 4;
MAGPIE.PDL.CREATURE_TYPE = {};
MAGPIE.PDL.CREATURE_TYPE.DISPOSABLE = -1;
MAGPIE.PDL.CREATURE_TYPE.PLAYER = 0;
MAGPIE.PDL.CREATURE_TYPE.DIGIMIND = 1;
MAGPIE.PDL.CREATURE_TYPE.FREE = 2;
MAGPIE.PDL.CREATURE_TYPE.WILD = 3;
MAGPIE.PDL.CREATURE_TEMPLATE = {};
MAGPIE.PDL.CREATURE_TEMPLATE.DEFAULT = 300;
MAGPIE.PDL.CREATURE_SEX = {};
MAGPIE.PDL.CREATURE_SEX.MALE = "Male";
MAGPIE.PDL.CREATURE_SEX.FEMALE = "Female";
MAGPIE.PDL.CREATURE_SEX.UNDEFINED = "undefined";
MAGPIE.PDL.CREATURE_SEX.INTERSEX = "Intersex";

//#region Creature basics
function Game_Creature() 
{
	this.initialize(...arguments);
}
Game_Creature.prototype.initialize = function(
	creatureID = 0, speciesID = MAGPIE.PDL.CREATURE_TEMPLATE.DEFAULT, type = -1, genealogy = "undefined", 
	nickName = "undefined", lastName = "undefined", firstName = "undefined", birthDay = 0, tags = [], 
	archetype = MAGPIE.PDL.ARCHETYPE.DISPOSABLE, traits = [], exp = [], friends = [], enemies = [], 
	territoryID = 0, wants = [], needs = [], resources = [], 
	enemyID = 4, sex = MAGPIE.PDL.CREATURE_SEX.UNDEFINED, deck = []) 
{
	this._creatureID = creatureID;
	this._speciesID = speciesID;
	this._speciesIndex;
	this._type = type;
	this._isValid = true;
	this._isSpawned = false;
	this._isAlive = true;
	this._isActor = false;
	this._birthDay = birthDay;
	this._territoryID = territoryID;
	this._level = 0;
	this._sex = sex;
	this._nickName = nickName;
	this._mhp = 0;
	this._mass = 1;
	this._aggro = 1;
	this._dex = 1;
	this._sen = 1;
	this._evo = 1;
	this._sta = 1;
	this._diet = 1;
	this._stealth = 0;
	this._genealogy = genealogy;
	this._lastName = lastName;
	this._firstName = firstName;
	this._archetype = archetype;
	this._tags = tags;
	this._wants = wants;
	this._needs = needs;
	this._resources = resources;
	this._states = [];
	this._ideas = [];
	this.instinct = {};
	this.surviveSkills = [];
	this.competeSkills = [];
	this.interactSkills = [];
	this.adaptSkills = [];
	this.metaSkills = [];
	this._traits = traits;
	this._exp = exp;
	this._friends = friends;
	this._enemies = enemies;
	this._growth;
	this._growthStage;
	this._habitat;
	this._HabitatState;
	this._enemyID = enemyID;
	this._deck = deck;
	this._param = [this._mhp, this._sta, this._aggro, this._mass, this._sen, this._dex, 0, 0, 0, 0, this._diet];
	this._gameday = "undefined";
	if(this._speciesID > 0) {
		this.setupCreature();
		this.getTraitsFromSpecies()
	};
	return creatures(creatureID)
}

Game_Creature.prototype.setupCreature = function()
{
	if(this._birthDay != 0) {
		this._level = this.initLevel();
	};
	this._speciesIndex = $PDL.species.indexOf(this.getSpecies());
	this.surviveSkills = this.getInstinct(Instincts.SURVIVE);
	this.competeSkills = this.getInstinct(Instincts.COMPETE);
	this.interactSkills = this.getInstinct(Instincts.INTERACT);
	this.adaptSkills = this.getInstinct(Instincts.ADAPT);
	this.metaSkills = this.getInstinct(Instincts.META);
	this._genealogy = new Game_Genealogy(this._creatureID);
	let message = `New ${this.species()?.name} creature with ID ${this._creatureID} created`;
	MAGPIE.console.Log(message);
}

Game_Creature.prototype.getSpecies = function()
{
	return $PDL.species.find((s) => s._speciesID === this._speciesID)
}

Game_Creature.prototype.species = function()
{
	return species[this._speciesIndex]
}

Game_Creature.prototype._spawn = function()
{
	if(this.isActor)
	{
		return SECore.getActors().find((c) => c._creatureID === this._creatureID)
	}
	if(!this._isSpawned)
	{
		return false
	} else if(SceneManager.isCurrentScene(Scene_Battle))
	{
		return BattleManager.allBattleMembers().find((member) => member._creatureID === this._creatureID)
	}
}

/**
 * @desc 
 * @param {string} archetype "protagonist" | "antagonist" | "support" | "extra" | "disposable"
 */
Game_Creature.prototype.setupArchetype = function(archetype)
{
	switch (archetype) {
		case "undefined":
			break;
		case "protagonist":
			this._archetype = "protagonist";
			break;
		case "antagonist":
			this._archetype = "antagonist";
			break;
		case "support":
			this._archetype = "support";
			break;
		case "extra":
			this._archetype = "extra";
			break;
		case "disposable":
			this._archetype = "disposable";
			break;
	};
}

Game_Creature.prototype.getTraitsFromSpecies = function()
{
	if(this.species() == undefined)
	{
		return
	}
	let traits = this.species()._Ptraits;
	if(traits.length < 1) 
	{
		return
	};
	traits.forEach((element) => this._traits.push(element))
}



Game_Creature.prototype.getInstinct = function(type)
{
	return this.species()[type];
}

Game_Creature.prototype.instinct = function(type)
{
	let skills = this[type];
	if(skills.length < 1) 
	{
		return
	};
	let skill = SECore.shuffle(skills)[0];
	let targetIndex = null;
	if(this._isSpawned)
	{
		this._spawn.forceAction(skill, targetIndex);
		BattleManager.forceAction(this._spawn())
		$gameTroop._interpreter.setWaitMode('action');
	} else {
		//pushAction_notSpawned
	}
}

Game_Creature.prototype.growth = function() {
	if(this._growth == "undefined")
			{
				return this._growth = this._level * this._evo
			}
}

Game_Creature.prototype.gainGrowth = function(amount) 
{
	this._growth += amount;
	this._gameday = $gameVariables.value(TIME.gameDay);
	if(this._growth > this._evo)
	{
		this.gainLevel(1);
	}
}

Game_Creature.prototype.totalGrowth = function()
{
	return this._growth + (this._level * this._evo)
}

Game_Creature.prototype.gainLevel = function(amount) 
{
	this._growth = 0;
	this._level += amount;
	let calcStage = this.species().getGrowthStage(this.totalGrowth());
	let stageName = calcStage[0]
	let maxMass = calcStage[1];
	if(this._growthStage != stageName)
		{
			return this.grow(stageName, maxMass);
		}
}

Game_Creature.prototype.maxMass = function() 
{
	return this.species().getGrowthStage(this.totalGrowth())[1]
}

Game_Creature.prototype.grow = function(stageName)
{
	this._growthStage = stageName;
	return this._growthStage
}


Game_Creature.prototype.initLevel = function() {
	try {  
		if(!this._skillCard || this._skillCard.id < 1) {
			console.log("Game_Creature.level() failed! Creature species invalid.");
			this._isValid = false;
			return false
		}
		if(this._level != "undefined" || this._level > 0) {
			this.growth();
			this._growthStage = this.species().getGrowthStage(this.totalGrowth());
			this._isValid = true;
			return this._level
		}
		console.log("Fetching creature level...");
		if(GameDay > this._birthDay) {
			let creatureSkill = this._skillCard;
			this._evo = Number(creatureSkill.meta.evo);
			this._level = Math.ceil((GameDay - this._birthDay) / this._evo);
			console.log("Creature level: " + this._level);
			this.growth();
			this._isValid = true
			return this._level
		} else { 
			console.log("Creature level not set; possible reason: creature is not alive.");
			return false
		}
	} catch (error) {
		console.log("Game_Creature.level() error!")
		this._isValid = false
		console.error(error)
		return false
	}
};

Game_Creature.prototype.traits = function() 
{
	return this.species()._Ptraits
}

Game_Creature.prototype.spawnEnemy = function() {
	let spawnStates = this._states || [];
	spawnStates.push(71, 72, 73, 74);
	// var enemyID = Number($dataSkills[creatureSkill].meta.enemy);
	let nextEnemy = $gameTroop.aliveMembers().length;
	let enemyID = this._enemyID;
	$gameTroop.members()[nextEnemy].appear();
	$gameTroop.members()[nextEnemy].gainHp(1);
	$gameTroop.members()[nextEnemy].transform(enemyID);
	let newSpawn = $gameTroop.aliveMembers().length - 1;
	let newCreature = $gameTroop.members()[newSpawn];
	newCreature._name = this.species().name();
	$gameTroop.makeUniqueNames();
	newCreature.initCreature(this._creatureID);
	newCreature.setupClass(Number($dataEnemies[enemyID].meta.ClassId));
	newCreature.changeExp(this._growth);
	newCreature.addParam(1, this._sta - 1);
	newCreature.addParam(2, this._aggro - 1);
	newCreature.addParam(3, this._mass - 1);
	newCreature.addParam(4, this._sen - 1);
	newCreature.addParam(5, this._dex - 1);
	newCreature.addParam(0, this._mhp);
	newCreature.addParam(10, this._diet);
	newCreature.recoverAll();
	newCreature.setTp(newCreature.mtp);
	if(newCreature.tpRate() < 20) {
		spawnStates.push(injuries.hunger);
	};
	for(var i = 0; i < spawnStates.length - 1; i++) {
		newCreature.addState(spawnStates[i])
	};
	newCreature.addState(blocks.immortal);
	newCreature._habitat = this._habitat || "undefined";
	newCreature._habitatState = this._habitatState || "undefined";
	if(newCreature._habitatState > 0) {
		newCreature.addState(newCreature._habitatState);
	};
	
	this._gameday = $gameVariables.value(TIME.gameDay);
	this._isSpawned = true;
	return true
}; 


Game_Creature.prototype.skillCard = function() {
	if(this._speciesID != "undefined" && this._speciesID > 0) {
		this._skillCard = $dataSkills[this._speciesID];
		return this._skillCard
	} else { 
		console.log("Unable to set parameters: creature species invalid.");
		this._isValid = false
		return "undefined"
	}
};

Game_Creature.prototype.generateParams = function() {
	this.initLevel();
	if(this._sex == "undefined") {this._sex = SECore.die(2) < 2 ? "Male" : "Female";};
	this._skillCard = this.skillCard();
	if(this._traits.length < 1) 
	{
		this._traits = this.traits()
	};
	if(this._level < 1) {
		return false
	};
	if(this._level > 0 && this._skillCard != "undefined") {
		this._isValid = true;
	}
	if(!this._isValid) {
		return false
	} 
	let creatureSkill = this._skillCard;
	let params = [];
	params.mass = eval(creatureSkill.meta.mass) || [1,1,1];
	params.aggro = eval(creatureSkill.meta.aggro) || [1,1,1];
	params.dex = eval(creatureSkill.meta.dex) || [1,1,1];
	params.sen = eval(creatureSkill.meta.sen) || [1,1,1];
	params.sta = eval(creatureSkill.meta.sta) || 1;
	this._enemyID = eval(creatureSkill.meta.enemy) || null;
	this._evo = eval(creatureSkill.meta.evo) || 1;
	this._diet = this.diet();
	this._mass = SECore.d6in3(params.mass);
	this._aggro = SECore.d6in3(params.aggro);
	this._dex = SECore.d6in3(params.dex);
	this._sen = SECore.d6in3(params.sen);
	this._sta = params.sta;
	let hpBump = Math.max(this._traits.length, 1);
	let hpExtra = Math.min(35, Math.floor(Math.random() * 10) * (this._aggro + this._dex + this._sen));
	this._mhp = Math.min(hpBump + hpExtra, 100);
}
Game_Creature.prototype.diet = function() {
			let diet = eval(this._skillCard.meta.diet) || 0;
		if(diet > 0) {
			this._diet = diet;
		} else {
			this._diet = (this._mass + this._aggro + this._dex + this._sen) * this._sta;
		}
		return this._diet
};

Game_Creature.prototype.hasTrait = function(trait = "") 
{
	return this._traits.includes(trait)
}

Game_Creature.prototype.getTraitValue = function(trait = "")
{
	if(this._traits.includes(trait))
	{
		return this._traits[trait]
	} else {
		return false
	}
}

/**
 * 
 * {@link SECore.spawnEnemy()}
 */
Game_Creature.prototype.initCreature = function(creatureID, speciesID, creatureLevel = 0) {
	if(speciesID == 0) {
		//@todo design a function to pick suitable species for territory
		MAGPIE.console.Log("Game_Creature.spawnCreature() failed! Creature species invalid.");
		return false
	};
	let creature = creatures(creatureID);
	creature.skillCard();
	this._nickName = creature._skillCard._name;
	if(creatureLevel > 0) {
		creature._level = creatureLevel;
	} else {
		creature.level();
	};
	this._nickName = this._skillCard.name;
	if(this._mhp < 2) {
		this.generateParams();
		if(!this._isValid) {
			MAGPIE.console.Log("Aborting Game_Creature.spawnEnemy()...");
			return false
		}
	};
};
//#endregion





//#region CBE.creature

Game_Creature.prototype.checkResources = function()
{
	if(this._resources.length < 1)
	{
		return false
	}
	let resourcePool = this._resources.filter((element) => $dataItems[element].meta.hasOwnProperty("resource"));
	if (resourcePool.length > 0) {
		return resourcePool
	}
}

Game_Creature.prototype.hasResource = function()
{
	if(this.checkResources().length > 0) {
		return true
	} else {
		return false
	}
}

Game_Creature.prototype.checkResourcesForNRG = function()
{
	let resourcePool = this.checkResources();
	if(resourcePool.length < 1)
	{
		return false
	} else if (resourcePool.length < 2) {
		return resourcePool[0]
	}
	if(this.species().isHerbivore())
	{
		let plant = this.species().seekPlant(resourcePool);
		if(plant != false) {
			return plant
		}
	}
	if(this.species().isCarnivore())
	{
		let meat = this.species().seekMeat(resourcePool);
		if(meat != false) {
			return meat
		} 
	}
	resourcePool.sort((a,b) => $dataItems[b].meta.tp - $dataItems[a].meta.tp)
	return resourcePool[0]
}

Game_Creature.prototype.seekNRG = function()
{
	let resources = this.checkResourcesForNRG();
	if(resources != false)
	{
		return resources
	} else {
		this._wants.push(new Game_Quest(this._creatureID,"isStateAffected(115)","seekNRG()","tpRate == 1","1 - this.tpRate",100))
	}
}

Game_Creature.prototype.seekWater = function()
{
	let resources = this.checkResources();
	let pool = resources.filter((element) => $dataItems[element].meta.hasOwnProperty("water"))
	if(pool.length > 0)
	{
		return pool[0]
	} else {
		this._wants.push(new Game_Quest(this._creatureID,"isStateAffected(inuries.thirst)","seekWater()","stateStack(inuries.thirst)",100))
	}
}

Game_Creature.prototype.seekSleep = function()
{
	if(this._isSpawned)
	{
		this._spawn().pushSkill(sleepSkillId);
	} else {
		this._states.push(moves.sleeping);
	}
	//check suitability of sleep
	//if yes, sleep
	//if no, seek better suitability
}

/**
 * 
 * @param {property} type Instincts {SURVIVE,COMPETE,INTERACT,ADAPT,META}
 * @returns {array} [SkillId]
 */
Game_Creature.prototype.getIdeas = function(type)
{
	if(this.mp < 1)
	{
		return
	};
	let skills = this[type];
	if(skills.length > 0) {
		skills.forEach((element) => this._ideas.push(element))
	};
	return this._ideas
}

/**
 * 
 * @param {property} type Instincts {SURVIVE,COMPETE,INTERACT,ADAPT,META}
 * @returns {Number} skillId
 */

Game_Creature.prototype.pushIdea = function() //@audit Creature.pushIdea()
{
	if(this._ideas.length < 1)
	{
		return
	}
	let index = SECore.die(this._ideas.length) - 1;
	let skill = this._ideas[index];
	this._ideas.splice(index, 1);
	if($dataSkills[skill].mpCost > this.mp) 
	{
		return skill
	};
	if(this._isSpawned)
	{
		this._spawn().pushSkill(skill)
	}
}

Game_Creature.prototype.tiredness = function()
{
	return this._spawn().stateStack(injuries.fatigue)
}
Game_Creature.prototype.explore = function()
{
	if(this._isSpawned)
	{
		this._spawn().explore();
	} else {
		this._habitat = territory[this._territoryID].explore();
		this._habitatState = eval($dataSkills[this._habitat].meta.stateId);
	}
}

Game_Creature.prototype.forage = function() 
{
	//
}

Game_Creature.prototype.processBGturn = function()
{
	if($gameSwitches.value(TIME.newDay) && this._gameday != $gameVariables.value(TIME.gameDay))
	{
		this._gameday = $gameVariables.value(TIME.gameDay);
		this.gainGrowth(1);
		this._states.push(injuries.hunger);
	}
	if(this._states.includes(injuries.hunger))
	{
		this.seekNRG();
	}
	let dailyQuest = this.nextDailyQuest();
	if(dailyQuest)
	{
		return dailyQuest.assignMission()
	};
	//check idle state
	//check other states
	//check quest
	//check relevance to player
}

Game_Creature.prototype.consumeResource = function(resource) {
	
	this._resources.splice(this._resources.findIndex(resource),1);
	let item = $dataItems[resource].meta.tp;
	this._NRG += eval(item);
	let digest = 1;
	if(item.meta.hasOwnProperty("fiber"))
	{
		digest + eval(item.meta.fiber);
	};
	for (var i = 0; i < digest; i++) {
		this._states.push(167);
	}
	this._states.push(166);
	if(this._NRG < this._diet) {
		return
	}
	this._states.remove(injuries.hunger);
}

Game_Creature.prototype.states = function()
{
	if(this._isSpawned) this._states = this._spawn()._states;
	return this._states
}

Game_Creature.prototype.mood = function()
{
	if(this._states.length < 1) return
	let mood = []; //extract {@link moods}
	return mood
}

Game_Quest.prototype.checkSubject = function()
{
	return eval(this.user.subject)
}

Game_Quest.prototype.selfCheck = function()
{
	this.user.forage();
	if(!this.user.hasResource())
	{
		this.user.explore();
		return false
	}
}

Game_Quest.prototype.seekNRG = function()
{
	this.selfCheck();
	let pool = this.user.checkResourcesForNRG();
	if(pool.length > 0)
	{
		return this.user.consumeResource(pool[0])
	} else {
		return false
	}
}

Game_Quest.prototype.seekWater = function()
{
	this.selfCheck();
	let pool = this.checkResourcesForWater();
	if(pool.length > 0)
	{
		return this.user.consumeResource(pool[0])
	} else {
		return false
	}
}

Game_Quest.prototype.checkResourcesForWater = function()
{
	let resourcePool = this.user.checkResources();
	if(resourcePool.length < 1)
	{
		return false
	}
	let pool = resourcePool.filter((element) => $dataItems[element].meta.hasOwnProperty("water"));
	if(pool.length < 1)
	{
		return false
	} else {
		return pool[0]
	}
}

Game_Quest.prototype.assignMission = function()
{
	return this.type
}

Game_Creature.prototype.getDailyQuests = function() 
{
	return this._wants.filter((element) => element.urgency == 100)
}

Game_Creature.prototype.nextDailyQuest = function()
{
	let quests = this.getDailyQuests();
	if(quests.length > 1)
	{
		return this.getDailyQuests().sort((a,b) => b.gravity - a.gravity)[0]
	} else if(quests.length > 0) {
		return quests[0]
	} else {
		return false
	}
}

Game_Creature.prototype.nextQuest = function()
{
	if(this._wants.length > 1)
	{
	return this._wants.sort((a,b) => b.urgency - a.urgency)[0]
	} else if (this._wants.length > 0)
	{
		return this._wants[0]
	} else {
		return false
	}
}

Game_Creature.prototype.biggestWant = function()
{
	if(this._wants.length > 1)
	{
		return this._wants.sort((a,b) => b.gravity - a.gravity)[0]
	} else if(this._wants.length > 0) {
		return this._wants[0]
	} else {
		return false
	}
}

Game_Creature.prototype.assignAction = function()
{
	//
}

Game_Creature.prototype.scanTerritory = function() 
{
	let pool = currentTerritory._inhabitants;
	pool.remove((element) => element._creatureID == this._creatureID);
	pool.remove((element) => element._isSpawned);
	this._targetPool = [];
	pool.forEach((element) => {
		if(this.scanCreature(element))
		{
			this._targetPool.push(element)
		}
	});
	return this._targetPool
}

Game_Creature.prototype.scanSkill = function()
{
	let bonus = 0;
	return this._sen + bonus
}

Game_Creature.prototype.scanCreature = function(target)
{
	let visibility = this.scanSkill() - target.visibility();
	if(visibility < 1) {
		return false
	} else {
		return true
	}
}

Game_Creature.prototype.visibility = function()
{
	let currentHab = $dataStates[this._habitatState];
	let cover = Number(currentHab.meta.PTAdd3);
	let visibility = Number(currentHab.meta.PTAdd4);
	let stealth = cover - (this._mass + visibility);
	return this._stealth + stealth
}

/**
 * {@link CBE.keywordAction}
 * @param {string} keyword 
 * @returns {eval}
 */
Game_Action.prototype.keywordTrait = function(keyword)
{
	if(!a.creature.hasTrait(keyword)) {
		return false
	};
	return eval(CBE.keywordAction[keyword])
}

Game_Action.prototype.combo = function(type)
{
	//
} 


//#endregion

//#endregion




//-----------------------------------------------------------------------------------
//#region Game_Quest

//#region Quest definitions

const gameQuest = {
	types: []
}





//#endregion

/**
 * @param subject motivating state, eg. user.isStateAffected(115)
 * @param type seek | slay | reach | protect | endure
 * @param objective condition to eval true, eg. user.tpRate == 1
 * @param gravity rate 0 to 1, eg. 1 - user.tpRate
 * @param urgency number 100 for "daily" and 1 to 99 for everything else
 */
function Game_Quest()
{
	this.initialize(...argument);
}

/**
 * @param subject user.isStateAffected(115)
 * @param type seek
 * @param objective user.tpRate == 1
 * @param gravity 1 - user.tpRate
 * @param urgency day
 */
Game_Quest.prototype.initialize = function(creatureID, subject, type, objective, gravity, urgency) 
{
	this._creatureID = creatureID;
	this.user = creatures(this._creatureID);
	this.subject = subject;
	this.type = type;
	this.objective = objective;
	this.gravity = gravity;
	this.urgency = urgency;
	this._progress = "undefined";
}

//#endregion





//-----------------------------------------------------------------------------------
//#region Battler expansion





//#region init

var customGuardSkill = 2; //default
var restSkillId = 8; //standard rest
var sleepSkillId = 2; //standard sleep (to also exit)

SECore.battlerExpand = Game_Battler.prototype.initialize

Game_Battler.prototype.initialize = function() {
	SECore.battlerExpand.call(this);
	this._habitat = undefined;
	this._habitatState = undefined;
	this._stateStack = 0;
	this._creatureID = undefined;
	this._NRG = 0;
	this._health = 0;
	//this._maxCom = battler_initMaxCom;
	this._stress = 0;
	this._sex = MAGPIE.PDL.CREATURE_SEX.UNDEFINED;
	this._speciesID = undefined;
	this._speciesIndex = undefined;
}

Game_Battler.prototype.skillCard = function() {
	if(this.hasOwnProperty("_speciesID") && this._speciesID) {
		return $dataSkills[this._speciesID]
	}
}

Game_Battler.prototype.initCreature = function(creatureID) 
{
	this._creatureID = creatureID;
	this._speciesID = this.creature()._speciesID;
	this._sex = this.creature()._sex;
	this._speciesIndex = species.indexOf(this.getSpecies());
}

Game_Battler.prototype.creature = function()
{
	return creatures(this._creatureID)
}

Game_Battler.prototype.getSpecies = function()
{
	return species.find((s) => s._speciesID === this._speciesID)
}

Game_Battler.prototype.species = function()
{
	return species[this._speciesIndex]
}

Game_Battler.prototype.class = function() {
	return eval(this.skillCard().meta.class)
}
//#endregion





//#region meta
Game_Battler.prototype.refreshHabitat = function() {
	if($gameParty.leader()._extraZones[zoneWildId].length < 1)
	{
		return false
	};
	let lastHabitatCard = $dataSkills[SECore.lastInWild()._skillId];
	if(!lastHabitatCard.meta?.habitat) {
		return false
	};
	this._habitat = lastHabitatCard._skilldId;
	this._habitatState = eval(lastHabitatCard.meta.stateId);
	let incompatibleHabitats = $dataHabitatStates.filter((element) => element.id != this._habitatState);
	incompatibleHabitats.forEach((element) => this.removeState(element.id));
	this.addState(this._habitatState);
}; 

Game_Battler.prototype.creatureEscape = function() 
{
	this.addState(injuries.fatigue);
	this.unspawn();
	if($gameParty.aliveMembers() < 1) {
		$gameTemp.reserveCommonEvent(35);
		$gameTemp.reserveCommonEvent(42);
	};
	BattleManager.updateTurn()
}

Game_Battler.prototype.unspawn = function() {
	let ID = this._creatureID;
	let creature = creatures(ID);
	creature._states = this._states;
	this.recoverAll();
	this.updateParams();
	creature._isSpawned = false;
	this.escape();
	this.clearParamPlus();
	this.transform(1);
	if(this.creature()._archetype == "disposable") 
	{
		creature = undefined;
	};
};

Game_Battler.prototype.exertion = function(mpRate)
{
	//if(this.creature.hasTrait("endurance")) {mpRate - 1};
	if(mpRate < 1) return
	if(this.isActor() && this.mp > 0)
	{
		this._exert = true;
		this._exertAmount = Math.max(mpRate, Math.min(mpRate,this.handSize));
		mpRate > this.handSize ? this.gainHp(this.handSize - mpRate) : 0;
	};
	for(let i = 0; i < mpRate; i++)
	{
		this.mp > 0 ? this.gainMp(-1) : this.gainHp(-1);
	}
}

Game_Battler.prototype.updateParams = function() {
	let body = creatures(this._creatureID);
	body._mhp = this.mhp;
	body._mmp = this.mmp;
	body._mass = this.def;
	body._aggro = this.atk;
	body._dex = this.mdf;
	body._sen = this.mat;
	body._diet = this.mtp;
	body._stealth = this.luk;
	body._NRG = this.tp;
	body._level = this._level;
	return [this.mhp, this.mmp, this.atk, this.def, this.mat, this.mdf, this.luk, this.tp, this._level, this.mtp]
};

Game_Battler.prototype.migrate = function(territoryID) {
	this.unspawn();
	return creatures(this._creatureID)._territoryID = territoryID
};

Game_Battler.prototype.newDayReset = function()
{
	let today = $gameVariables.value(TIME.gameDay); //battler.newDayReset()
	let newday = $gameSwitches.value(TIME.newDay) //battler.newDayReset()
	let creature = creatures(this._creatureID);
	if(newday && creature._gameday != today) 
	{
		this.addState(injuries.hunger);
		this.gainExp(1);
		creature.gainGrowth(1); //Game_Creature.prototype.gainGrowth
	}; // @audit test: cannot read property "_gameday" of undefined
}

Game_Battler.prototype.trackingScan = function(scanPool)
{
	let trackPool = [];
	scanPool.forEach((p) => {
		p.addCom(-this.mat);
		if(p.com() < 1) {
			trackPool.push(p)
		};
	});
	return trackPool
}

Game_Battler.prototype.basicScan = function()
{
	let pool = this.creature().scanTerritory();
	if(pool.length < 1)
	{
		return false
	}
	this.addState(postures.alert);
	
}

//#endregion





//#region parameters

Game_Battler.prototype.com = function()
{
	return this.stateStack(2)
}

Game_Battler.prototype.addCom = function(amount)
{
	for(var i = 0; i < Math.abs(amount); i++)
	{
		if(amount > 0) {
			if(this.com() >= this._maxCom) {return};
			this.addState(2)
		} else {
			if(this.com() > 0)
			{this.removeState(2)}
		}
	}
	if(this.com() >= this._maxCom) {
		this.setCom(this._maxCom)
	}
}

Game_Battler.prototype.setCom = function(target)
{
	let amount = target - this.com;
	this.addCom(amount);
}

Game_Battler.prototype.getBonusMalus = function(param) {
	return this.paramBasePlus(param) - creatures(this._creatureID)._param[param]
};

Game_Battler.prototype.getParamDiff = function(param) {
	return Math.abs(this.getBonusMalus(param))
};

//#endregion





//#region Action

Game_Battler.prototype.changeState = function(statePool, newState) 
{
	Object.values(statePool).filter(e => e != newState).forEach(e => this.removeState(e))
}

Game_Battler.prototype.wakeUp = function()
{
	this.addState(postures.groggy);
	this.removeState(postures.drowsy);
	this.removeState(injuries.bruise);
	this.removeState(155);
	this.recovery(12, 152);
	this.recovery(24, 153);
	this.recovery(48, 156);
	this.recovery(96, 154);
}

Game_Battler.prototype.iterate = function(dX, bonus, action) {
	console.log("Battler.iterate()...");
	if(SECore.die(dX) + bonus >= dX) {   //Battler.iterate
		return eval(action)
	} else {
		console.log("Attempt failed.");
		return false
	}
};

Game_Battler.prototype.delayedIterate = function(dX, bonus, action, delay) {
	console.log("Battler.delayedIterate()...");
	this._count = this._count || 0;
	if(this._count < delay) {
		$gameVariables.setValue(cVar.turn, this._count + 1);
		return
	} else {
		this._count = 0;
		console.log("activate!")
	};
	if(SECore.die(dX) + bonus >= dX) {   //Battler.iterate
		eval(action);
		return
	}
};

Game_Battler.prototype.explore = function() {
	let leader = $gameParty.leader();
	if(leader._extraZones[zoneTerritoryId].length < 1)
	{
		return false
	};
	leader.moveCards(1,"territory","wild");
}

Game_Battler.prototype.pushUseItem = function(item)
{
	let act = new Game_Action(this,true);
	act.setItem(item);
	this._actions.push(act);
}

Game_Battler.prototype.pushSkill = function(skillId) {
	let action = new Game_Action(this, true);
	action.setSkill(skillId);
	this._actions.push(action);
	if(this.isActor()) {
		SceneManager._scene._skillWindow.deactivate();
		BattleManager.selectNextCommand();
	}
	return this._actions[0]
}

Game_Battler.prototype.skillChance = function(dX, bonus, skillId) {
	if(this.isActor())
	{
		return false
	}
	if(SECore.die(dX) + bonus >= dX) {
		this.pushSkill(skillId)
		return true
	} else {
		return false
	}
}

Game_Battler.prototype.emote = function()
{
	let emoteStates = this._states.filter((element) => $dataStates[element].meta.hasOwnProperty("emoteState")) || [];
	let emote = [this._speciesID, this._sex, this._level, this.def, emoteStates];
	currentTerritory._exps.push(new Game_Exp(currentTerritory._territoryID, "message", emote, "trivial"));
	return
}

Game_Battler.prototype.redeck = function()
{
	this.addState(injuries.fatigue);
	this.setHp(this.mhp);
}

Game_Battler.prototype.evalChance = function(dX, bonus, callback) {
	console.log(bonus)
	if(SECore.die(dX) + bonus >= dX) return callback()
	console.log("Battler.evalChance() dice fail.");
}

Game_Battler.prototype.comboBuff = function(stateId, amount)
{
	if(amount < 1 || amount == undefined) 
	{
		return false
	}
	for(var i = 0; i < amount; i++)
	{
		this.addState(stateId)
	}
}

Game_Battler.prototype.instinct = function(type)
{
	let skills = this.species()[type];
	if(skills.length < 1)
	{
		return cSkills.pass
	}
	return skills[SECore.die(skills.length) - 1]
}

Game_Battler.prototype.combo = function(type) //@audit Battler.combo(type)
{
	if(this.mp < 1)
	{
		return 9
	};
	let skills = this.species()[type];
	if(skills.length < 1)
	{
		return 9
	};
	let skill = SECore.shuffle(skills)[0];
	if(!this.isActor())
	{
		return skill
	}
	let actor = this.creature._spawn;
	if(this.isActor())
	{
		return 9
	}
	let hand = actor.cardHand._data
	let results = SECore.filterSuitableCards(hand, skills);
	let card = SECore.pickCardfromArray(results);
	this.passiveCard(card);
	//this.pushSkill(card);
	return card
}

Game_Battler.prototype.passiveCard = function(skillId = undefined)
{
	if(!this.isActor()) return false
	if(!skillId || this.handSize < 1) return 9
	let hand = this.cardHand._data
	let index = hand.findIndex((c) => c._skillId === skillId);
	if(index < 0) return false
	this.moveCard(index, hand, this._cardDiscard);
	return true
}

Game_Battler.prototype.aTypeTrait = function(keyword = "")
{
	if(this.creature()._traits.includes(keyword))
	{
		return true
	} else {
		return false
	}
}

Game_Battler.prototype.react = function()
{
	if(!this?._react) return false
	if(!this.isActor()) return this.pushSkill(this._react)
	let index = this?._cardHand._data?.findIndex(c => c.isType("Impact"))
	if(index < 0) return false
	let card = this._cardHand._data[index];
	this.passiveCard(card);
	return this.pushSkill(card._skillId);
}

Game_Battler.prototype.pushSkillType = function(skillType = false)
{
	switch (skillType) {
		case false:
			return false
		case "Block":
			this.pushSkill(combos.m);
			break;
		case "Impact":
			this.pushSkill(combos.a);
			break;
		case "Move":
			this.pushSkill(combos.d);
			break;
		case "Emote":
			this.pushSkill(combos.s);
			break;
	}
}

//#endregion





//#region metabolism

Game_Battler.prototype.fiberDigest = function()
{
	let digestion = creatures(this._creatureID)._traits.find((element) => element.meta.hasOwnProperty("digestion")).meta.digestion;
	if(digestion == "herbivore")
	{
		return false
	} else if(digestion == "omnivore")
	{
		return this.gainHp(-1)
	} else {
		return this.gainHp(-2)
	}
}

Game_Battler.prototype.metabolism = function() {
	if(this.isStateAffected(injuries.fatigue)) {
		let fatigue = this.hp;
		if(this.tp > fatigue) {
			this.gainTp(-fatigue);
			this.removeState(injuries.fatigue)
		};
	}
	if(this.tpRate() == 1) {
		if(!this.isStateAffected(injuries.hunger)) {
			this.addState(injuries.fat)
		};
		this.setTp(0)
	};
	if(this.tp == 0 && this.isStateAffected(injuries.fat)) {
	this.removeState(injuries.fat);
	this.setTp(this.mtp)
	};
}

Game_Battler.prototype.forage = function() { //@audit test: Battler.forage()
	if(!this.canForage()){
		return
	};
	let card = $dataSkills[SECore.lastInWild()._skillId];
	let commonLoot = eval(card.meta.commonLoot) || []; 
	let uncommonLoot = eval(card.meta.uncommonLoot) || []; 
	let rareLoot = eval(card.meta.rareLoot) || []; 
	let uniqueLoot = eval(card.meta.uniqueLoot) || []; 
	let array = [];
	if(commonLoot.length > 0) {
		var commonPick = [];
		SECore.forageSeed(commonLoot,SEdice.common,SEdice.weighted,commonPick);
		if(commonPick.length > 0) {
			let die = SECore.die(commonPick.length - 1);
			array.push(commonPick[die])
		}
	}; 
	if(uncommonLoot.length > 0) {
		var uncommonPick = [];
		SECore.forageSeed(uncommonLoot,SEdice.uncommon,SEdice.weighted,uncommonPick);
		if(uncommonPick.length > 0) {
			let die = SECore.die(uncommonPick.length - 1);
			array.push(uncommonPick[die])
		}
	}; 
	if(rareLoot.length > 0) {
		var rarePick = [];
		SECore.forageSeed(rareLoot,SEdice.rare,SEdice.weighted,rarePick); 
		if(rarePick.length > 0) {
			let die = SECore.die(uncommonPick.length - 1);
			array.push(rarePick[die])
		}
	}; 
	if(uniqueLoot.length > 0) {
		var uniquePick = [];
		SECore.forageSeed(uniqueLoot,SEdice.unique,SEdice.weighted,uniquePick); 
		if(uniquePick.length > 0) {
			let die = SECore.die(uniquePick.length - 1);
			array.push(uniquePick[die])
		}
	}; 
	if(array.length < 1 || array[0] == 0) {
		$gameMessage.add("Error 1: No loot found.");
		return
	};
	if(!this.isActor()) {
		let pick = items[SECore.die(items.length - 1)]
		this.pushUseItem(pick);
		return
	};
	let items = array;
	let choices = items.map(item => $dataItems[item].name);
	array.push("false"); 
	choices.push(":: Not interested ::"); 
	$gameMessage.setPositionType(1);
	$gameMessage.add("Loot found:");
	$gameMessage.setChoices(choices, choices.length - 1, choices.length - 1)
	$gameMessage.setChoicePositionType(2)
	$gameMessage.setChoiceCallback(n => ($gameVariables.setValue(cVar.lastItem, array[n])));
	$gameTroop._interpreter.setWaitMode("message");
};

Game_Battler.prototype.canForage = function() {
	if(SECore.lastIsType(zoneWildId, "habitat"))
	{
		return true
	} else {
		return false
	}
}

Game_Battler.prototype.recovery = function(dX, stateId) {
	return SECore.attemptDice(dX, user.removeState(stateId))
};

//#endregion






//-----------------------------------------------------------------------------------
//#region Game_Actor EX



Game_Actor.prototype.ammoReload = function(ammoId, amount, SE = false) //@audit test: ammoReload
{
	let battle = SceneManager.isCurrentScene(Scene_Battle);
	for(var i = 0; i < amount; i++)
	{ 
		if(SE != false)
		{
			AudioManager.playSe($cgmzTemp.getSoundID(SE))
		};
		if(battle)
		{
			if(this.handSize < this.mmp) {
				this.addCardToZone(ammoId,"hand");
				this.gainMp(1);
				return
			};
		}
		this.addCardToZone(ammoId,"deck");
		this.gainHp(1);
	}
}


Game_Actor.prototype.magReload = function(ammoId, magazineId, amount, SE = false)
{
	let fail = "$gameParty.gainItem($dataItems[ammoId],amount)";
	let mag = 0
	if(!SceneManager.isCurrentScene(Scene_Battle))
	{
		mag = this._cardDeck._data.find((card) => card._skilldId = magazineId);  
	} else if(this.handSize > 0) {
		mag = this._cardHand._data.find((card) => card.id == magazineId);
	} else { return eval(fail) };
	if(mag == undefined) {
		return eval(fail)
	}
	for(var i = 0; i < amount; i++)
	{
		mag.var[0] += 1;
		AudioManager.playSe($cgmzTemp.getSoundID(SE))
	}
}

Game_Actor.prototype.saveDeck = function() 
{
	this.forceAction(4);
	BattleManager.forceAction(this);
	BattleManager.selectNextCommand();
}

Game_Battler.prototype.reclaim = function(amount, cardId)
{
	if(!this.isActor()) 
	{
		return
	};
	if(this.handSize < amount + $dataSkills[cardId].mpCost)
	{
		return
	};
	this._reclaimAmount = amount;
	$gameVariables.setValue(cVar.lastActor, this);
	$gameTemp.reserveCommonEvent(CE.reclaim);
}

Game_Actor.prototype.getSlots = function(Ptrait6 = false, Ptrait7 = false)
{
	let physique = this.species()._physique;
	let traits = this.species().getPhysiqueTraits();
	let Ptraits = this.species()._traits;
	$gameParty.gainItem($dataArmors[physique], 1);
	Ptraits.forEach(t => $gameParty.gainItem($dataArmors[t], 1)); //@audit Actor.getSlots()
	traits.forEach(t => $gameParty.gainItem($dataArmors[t], 1));
	if(Ptrait6)
	{
		$gameParty.gainItem($dataArmors[Ptrait6], 1);
		Ptraits.push(Ptrait6);
	};
	if(Ptrait7)
	{
		$gameParty.gainItem($dataArmors[Ptrait7], 1);
		Ptraits.push(Ptrait7);
	};
	let physiqueSlot = this.equipSlots().indexOf(2);
	for(var i = 0; i < traits.length; i++)
	{
		this.changeEquipById(physiqueSlot + 2 + i, traits[i]);
	};
	let PtraitSlot = this.equipSlots().indexOf(3);
	for(var i = 0; i < Ptraits.length; i++)
	{
		this.changeEquipById(PtraitSlot + 1 + i, Ptraits[i]);
	};
	this.changeEquipById(physiqueSlot + 1, physique);
}

Game_Actor.prototype.reaction = function(skillId)
{
	if(!this.passiveCard(skillId)) return false
	return this.pushSkill(skillId)
}





//#endregion







//#region Actor command EX


// Window_ActorCommand.prototype.addSkillCommands = function() {
//     const skillTypes = this._actor.skillTypes();
//     for (const stypeId of skillTypes) {
//         const name = $dataSystem.skillTypes[stypeId];
//         if(!this._actor.isSkillTypeSealed())
//           {this.addCommand(name, "skill", true, stypeId)};
//     }
// };

// Window_ActorCommand.prototype.addBlockCommand = function() {
//   const name = $dataSystem.skillTypes[8];
//   this.addCommand(name, "skill", true, 8);
// };

// Window_SkillType.prototype.makeCommandList = function() {
//     if (this._actor) {
//             const name = $dataSystem.skillTypes[8];
//             this.addCommand(name, "skill", true, 8);
//         }
// };

/*//_SECore_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList
Window_ActorCommand.prototype.makeCommandList = function() {
		//_SECore_ActorCommand_makeCommandList.call(this)
		if (this._actor) {
				this.addAttackCommand();
				//this.addSkillCommands();
				//this.addGuardCommand();
				this.addCardsCommand();
				//this.addItemCommand();
				this.addEquipCommand();
				this.addAbortCommand();
		}
};

Game_BattlerBase.prototype.guardSkillId = function() {
		return customGuardSkill;
};

Window_ActorCommand.prototype.addAttackCommand = function() {
		this.addCommand("Instinct", "attack", true);
};

Window_ActorCommand.prototype.addCardsCommand = function() {
				this.addCommand("Cards", "skill", true, 1);
};

Window_ActorCommand.prototype.addAbortCommand = function() {
	this.addCommand("Snooze off", "guard", this._actor.canGuard());
};
*/
//#endregion






//#region Custom Windows





//#region clockWindow
SECore._Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
/**
 * {@link SEclock}
 */
SEclock.meta = {name: "Clock_Window"};

Scene_Map.prototype.createAllWindows = function() {
	//SECore._Scene_Map_createAllWindows.call(this)
	this.createMapNameWindow();
	this.createClockWindow();
	Scene_Message.prototype.createAllWindows.call(this);
}

SECore._Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;

Scene_Battle.prototype.createAllWindows = function() {
		SECore._Scene_Battle_createAllWindows.call(this);
		this.createClockWindow();
};

function Window_Timer()
{
	this.initialize.apply(this, arguments);
}

Window_Timer.prototype = Object.create(Window_Base.prototype);
Window_Timer.prototype.constructor = Window_Timer;

Window_Timer.prototype.initialize = function(rect) {
		Window_Base.prototype.initialize.call(this, rect)
		this._index = -1;
		this._ToDicon = null;
		this._hourDigit1 = null;
		this._hourDigit2 = null;
		this._minuteDigit1 = null;
		this._minuteDigit2 = null;
		this._separator = true;
		this._ToD_x = 0;
		this._hourDigit1_x = 30;
		this._hourDigit2_x = 60;
		this._separator_x = 90;
		this._minuteDigit1_x = 120;
		this._minuteDigit2_x = 150;
		this._digit_y = 0;
		this._ToD_y = 0;
};

Window_Timer.prototype.updateClock = function() 
{
	//Window_Base.prototype.update.call(this);
	this._ToDicon = SECore.timeOfDayIcon()
	this._hourDigit1 = SEclock.digits[SECore.clockDigits()[0]];
	this._hourDigit2 = SEclock.digits[SECore.clockDigits()[1]];
	this._minuteDigit1 = SEclock.digits[SECore.clockDigits()[2]];
	this._minuteDigit2 = SEclock.digits[SECore.clockDigits()[3]];
	this.separator = SEclock.separator;
	this.blank = SEclock.blank;
	if(!this._separator)
	{
		this._separator = true
	} else {
		this._separator = false
	};
	if(!$gameSwitches.value(SEclock.ToDswitch) && !$gameSwitches.value(SEclock.digitalSwitch)) {
		this.hide()
		return false
	} else {
		this.show();
		this.createContents();
	}
	if($gameSwitches.value(SEclock.ToDswitch)) 
	{
		this.drawIcon(this._ToDicon,this._ToD_x,this._ToD_y);
	}
	if($gameSwitches.value(SEclock.digitalSwitch)) {
		this.drawIcon(this._hourDigit1,this._hourDigit1_x,this._digit_y);
		this.drawIcon(this._hourDigit2,this._hourDigit2_x,this._digit_y);
		if(this._separator) {
			this.drawIcon(this.separator,this._separator_x,this._digit_y);
		} else {
			this.drawIcon(this.blank,this._separator_x,this._digit_y)
		}
		this.drawIcon(this._minuteDigit1,this._minuteDigit1_x,this._digit_y);
		this.drawIcon(this._minuteDigit2,this._minuteDigit2_x,this._digit_y);
	}
}

/**
 * {@link SEclock()}
 */
Scene_Map.prototype.createClockWindow = function() 
{
	const rect = this.clockWindowRect();
	this._clockWindow = new Window_Timer(rect);
	this.addWindow(this._clockWindow);
}

Scene_Map.prototype.clockWindowRect = function()
{
	const wx = Math.min(Graphics.boxWidth - SEclock.width, SEclock.x);
	const wy = SEclock.y;
	const ww = SEclock.width;
	const wh = this.calcWindowHeight(1, false);
	return new Rectangle(wx, wy, ww, wh);
}

Scene_Battle.prototype.createClockWindow = function() 
{
	const rect = this.clockWindowRect();
	this._clockWindow = new Window_Timer(rect);
	this.addWindow(this._clockWindow);
}

Scene_Battle.prototype.clockWindowRect = function()
{
	const wx = Graphics.boxWidth - 200;
	const wy = 0;
	const ww = 200;
	const wh = this.calcWindowHeight(1, false);
	return new Rectangle(wx, wy, ww, wh);
}

/**
 * {@link SEclock()}
 */
Game_Party.prototype.clock = function() {
	clockWin = SceneManager._scene._clockWindow;
	// if(SceneManager.isCurrentScene(Scene_Map)) {
		
	// };
	clockWin.updateClock()
}

//#endregion

//#endregion







//#region CGCSkillWindow edit

//SceneManager._scene._skillWindow.hide();


//#endregion






//Edit Game_Enemy to handle changing enemy name

Game_Enemy.prototype.name = function() {
	if(this._name == "undefined") {
		return this.originalName() + (this._plural ? this._letter : "");
	} else {
		return this._name + (this._plural ? this._letter : "");
	}
};


//@audit enemy.isDead()
Game_Enemy.prototype.isDead = function() {
	if(!this.isStateAffected(9)) {
		return false
	};
	this.removeState(3);
	creatures(this._creatureID)._isDead = true;
	let skillCard = ""; //carcass
	$gameParty.leader().addCardToZone(skillCard, "wild");
	let wildCardID = $gameParty.leader()._extraZones[zoneWildId].getSkillIds().length - 1
	let wildCard = $gameParty.leader()._extraZones[zoneWildId].getAllCards()[wildCardID]
	$gameParty.leader()._extraZones[zoneWildId].getAllCards()[wildCard].var[ICV.cardMeatVar] = this._def * (this._atk + this._mdf + this._mat);
	$gameParty.leader()._extraZones[zoneWildId].getAllCards()[wildCard].var[ICV.cardFatVar] = this.stateStack(112) * this._def;
	$gameParty.leader()._extraZones[zoneWildId].getAllCards()[wildCard].var[ICV.cardBoneVar] = this._def;
	$gameParty.leader()._extraZones[zoneWildId].getAllCards()[wildCard].var[ICV.cardSpeciesVar] = this._speciesID;
	this.die();
};


//#region Theo Stacking States

SECore.stackingStatesEX = Game_Battler.prototype.removeState

Game_Battler.prototype.removeState = function(stateId) {
		if (this.isStateAffected(stateId)) {
				if (stateId === this.deathStateId()) {
						this.revive();
				}
				let stack = this.stateStack(stateId);
				this.eraseState(stateId);
				this.refresh();
				this._result.pushRemovedState(stateId);
				if($dataStates[stateId].meta.hasOwnProperty("inc") && stack > 1) {
					for(var i = 1; i < stack; i++) {
						this.addState(stateId)
					}
				}
		}
};

Game_Battler.prototype.clearStateStack = function(stateId) {
	let stack = this.stateStack(stateId);
	for(var i = 0; i < stack; i++) {
		this.removeState(stateId)
	}
};

Game_Battler.prototype.getSex = function() {
	return creatures(this._creatureID)._sex
};

//#endregion
//#endregion





//-----------------------------------------------------------------------------------
//#region Game_Keyword
// function Game_Keyword()
// {
//   this.initialize(...arguments);
// }

// Game_Keyword.prototype.initialize = function(name)
// {
//   this._name = name;
// }

const bKword = {
	bleed: "b.result().hpDamage > 0 ? b.addState(injuries.bleed) : 0"
};


//#endregion




//-----------------------------------------------------------------------------------
//#region Game_Archetype

// function Game_Archetype()
// {
//   this.initialize(...arguments);
// }

// Game_Archetype.prototype.initialize = function(name)
// {
//   this._name = name;
// }

// function Game_ArchetypeTrait()
// {
//   this.initialize(...arguments);
// }

// Game_ArchetypeTrait.prototype = Object.create(Game_Archetype.prototype);
// Game_ArchetypeTrait.prototype.constructor = Game_ArchetypeTrait;

// Game_ArchetypeTrait.prototype.initialize = function(name) {
//     Game_Archetype.prototype.initialize.call(this, name);
//     this._isTrait = true;
// };


// const GameArchetypes = {
//   claws: new Game_ArchetypeTrait("claws")
// };


//#endregion





//#region Game_Card

// function Game_Card()
// {
//   this.initialize(...arguments)
// };

// /**
//  * 
//  * @param type creature | habitat | skill | event | exp
//  */

// Game_Card.prototype.initialize = function(skillId)
// {
//   this._cardId = SECore.generateID(gameCard);
//   this._skillId = skillId;
//   this.var = [];
// }



//#endregion





//#region Game_Group
function Game_Group() 
{
	this.initialize(...arguments)
};

Game_Group.prototype.initialize = function(groupID = 0) {
	this._members = [];
	this._groupID = groupID;
	this._territoryID = "undefined";
	this._name = "undefined";
	this._states = [];
};

Game_Group.prototype.groupSize = function() {
	return this._members.length
};

Game_Group.prototype.groupMass = function() {
	let mass = [];
	for(var i = 0; i < this.groupSize(); i++) {
		mass.push(this._members[i]._mass);
	};
	return mass.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
};

//#endregion











//#region Game_Habitat

function Game_Habitat(territoryID, habitatID = 0, skillId = 0, resources = [], items = [])
{
	this._territoryID = territoryID;
	this._habitatId = habitatID;
	this._skillId = skillId;
	this._resources = resources;
	this._items = items;
	this.initialize(...arguments);
}

Game_Habitat.prototype.initialize = function()
{
	//
}

Game_Habitat.prototype.skillCard = function()
{
	return $dataSkills[this._skillId]
}

Game_Habitat.prototype.territory = function()
{
	return territory[this._territoryID]
}

Game_Habitat.prototype.toCard = function()
{
	return [this._habitatId,this._resources,this._items]
}

Game_Habitat.prototype.fromCard = function(cardVar)
{
	this._habitatId = cardVar[0];
	this._resources = cardVar[1];
	this._items = cardVar[2];
	return cardVar
}



//#endregion





//#region Events

//#endregion





//#region Characters

SECore.generateSuitableGenealogy = function (territoryID, speciesID) {
	//filter genealogy by speciesID and TerritoryID
	//weigh seed by population and pick random
	return suitableGenealogy
};

SECore.generateSuitableNickName = function(territoryID, genealogy, archetype, level, sex) {
	//filter Nicknames by territoryID, genealogy, archetype, level, and sex
	//weigh seed to least used Nicknames in territoryID
	return suitableNickName 
};

SECore.generateSuitableBirthday = function(speciesID, level) {
	//level * speciesID.LvlEvo * speciesID.mass
	return suitableBirthday
};

SECore.generateSuitableExps = function (territoryID, genealogy, archetype, level) {
	//filter $dataSkills by meta archetype and suitableLevel
	//weigh results towards matching archetype in territoryID and matching genealogy
	return suitableExps
};

SECore.generateSuitableFriendlyBonds = function(territoryID, genealogy, archetype, level) {
	//weigh friend exps towards archetype,  matching characters in territoryID, matching characters by genealogy, and matching characters by level  
	return suitableFriendlyBonds
};

SECore.generateSuitableEnemyBonds = function(territoryID, genealogy, archetype, level) {
	//weigh enemy exps towards archetype,  matching characters in territoryID, matching characters
	//by genealogy, and matching characters by level  
	return suitableEnemyBonds
};

SECore.generateSuitableWants = function(territoryID, genealogy, archetype, level) {
	//weigh wants towards matching wants by territoryID, matching wants by genealogy, 
	//matching wants by archetype, and matching wants by level
	return suitableWants
};
//#endregion







