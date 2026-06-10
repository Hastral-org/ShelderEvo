//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [TIER_1] v0.36.0 ShelderEvo_sheldex 
 * @author Matheraptor
 * @url https://matheraptor.itch.io/
 * 
 * @help
 * main entry point
 * 
 * -----------------------------------------------------------------------
 * FEATURES
 * -----------------------------------------------------------------------
 * - [x] "terminal" feel Nodejs CLI for firmware boot, login, and update
 * - [ ] 
 * 
 * -----------------------------------------------------------------------
 * CHANGELOG
 * -----------------------------------------------------------------------
 * v0.36.0 2026 06 07
 * - baseline working setup
 * 
 * v0.34.0 2026 06 06
 * - initial build
 */
//#endregion
//========================================================================
/**
 * @namespace 
 * @author Matheraptor
 * @version 0.36.0
 * @desc 
 */
//========================================================================
//#region - INDEX
//========================================================================
var MAGPIE = {};
MAGPIE.meta = {
	name: "M.A.G.P.I.E.",
	desc: "",
	version: [0,36,0],
	firmwareName: "MAGPIE",
	firmwareDate: "20260607"
}
MAGPIE.SHELDEREVO = {}
MAGPIE.SHELDEREVO.meta = {
	name: "M.A.G.P.I.E. Shelder Evolution",
	desc: "",
	version: MAGPIE.meta.version,
	firmwareName: "main",
	firmwareDate: MAGPIE.meta.firmwareDate
}
MAGPIE.SHELDEX = {};
MAGPIE.SHELDEX.meta = {
	name: "M.A.G.P.I.E. Shelder Evolution NWjs desktop client app",
	version: MAGPIE.meta.version,
	desc: "",
	firmwareName: "sheldex",
	firmwareDate: MAGPIE.meta.firmwareDate
}
// MAGPIE.app.sheldex.pluginName = MAGPIE.app.sheldex.meta.firmwareName;
MAGPIE.SYS = {}
MAGPIE.DATA = {};
//#endregion
//========================================================================
/**
 * @name 
 * @desc 
 * @typedef {Number} percentage %
 * @typedef {Number} coefficient 
 * @typedef {Number} index array[index]
 * @typedef {index} variable_index
 * @typedef {index} switch_index
 * @typedef {index} ce_index common event index
 * @typedef {index} state_index
 * @typedef {Number} entityID Date.now() at creation
 * @typedef {Number} skillID
 * @typedef {Number} stateID
 * @typedef {state_index} injury_index
 * @typedef {state_index} move_index
 * @typedef {state_index} mood_index
 * @typedef {state_index} posture_index
 * @typedef {state_index} morale_index
 * @typedef {state_index} resource_index
 * @typedef {state_index} growth_index
 * @typedef {[state_index, state_index]} habitat_combo
 * @typedef {[state_index, state_index, state_index, state_index]} buff
 * @typedef {{m: state_index, a: state_index, d: state_index, s: state_index}} combo
 * @typedef {index} ICV
 * @typedef {Number} creature_level
 * @typedef {Number} equip_slot
 *
 */
//========================================================================
// #region - KEY
//========================================================================
MAGPIE.KEY = {};
MAGPIE.KEY.meta = {
	name: "M.A.G.P.I.E. Key dictionary",
	desc: "",
	version: [0,35,0]
}
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > CGC
//------------------------------------------------------------------------
MAGPIE.KEY.CGC = {};
MAGPIE.KEY.CGC.ZONE = {};
/** @type {Enumerator<index>} */
MAGPIE.KEY.CGC.ZONE.INJURY = 0;
/** @type {Enumerator<index>} */
MAGPIE.KEY.CGC.ZONE.PERMANENT = 1;
/** @type {Enumerator<index>} */
MAGPIE.KEY.CGC.ZONE.TERRITORY = 2;
/** @type {Enumerator<index>} */
MAGPIE.KEY.CGC.ZONE.WILD = 3;
MAGPIE.KEY.CGC.CARD = {};
MAGPIE.KEY.CGC.CARD.ACTOR_SPRITE = {};
/** @type {Enumerator<Number>} */
MAGPIE.KEY.CGC.CARD.ACTOR_SPRITE.OFFSET_X = 168;
/** @type {Enumerator<Number>} */
MAGPIE.KEY.CGC.CARD.ACTOR_SPRITE.OFFSET_Y = 6;
/** @type {Enumerator<Number>} */
MAGPIE.KEY.CGC.CARD.ACTOR_SPRITE.X = 132;
MAGPIE.KEY.CGC.CARD.BATTLER_SPRITE = {}
/** @type {Enumerator<Number>} */
MAGPIE.KEY.CGC.CARD.BATTLER_SPRITE.W = 240;
/** @type {Enumerator<Number>} */
MAGPIE.KEY.CGC.CARD.BATTLER_SPRITE.H = 328;
/** @type {Enumerator<Number>} */
MAGPIE.KEY.CGC.MAX_DECK_SIZE = 100;
/** @desc CGC Independent Card Variables */
MAGPIE.KEY.CGC.ICV = {}
MAGPIE.KEY.CGC.ICV.meta = {isSettings: true}
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.CREATURE_ID = 0
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.SPECIES_ID = 1
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.CREATURE_RESOURCE = 2
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.CREATURE_ITEM = 3
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.HABITAT_ID = 0
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.HABITAT_RESOURCE = 2
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.HABITAT_ITEM = 3
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.ENTITY_ID = 0
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.ENTITY_NAME = 1
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.ENTITY_TYPE = 2
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.ENTITY_DESC = 3
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.EXP_ID = 0
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.EXP_NAME = 1
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.EXP_TYPE = 2
/** @type {Enumerator<ICV>} */
MAGPIE.KEY.CGC.ICV.EXP_DESC = 3
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Dice
//------------------------------------------------------------------------
MAGPIE.KEY.DICE = {}
/** @type {Enumerator<Number>} */
MAGPIE.KEY.DICE.STANDARD = 6
/** @type {Enumerator<Number>} */
MAGPIE.KEY.DICE.DOUBLE = 12
/** @type {Enumerator<Number>} */
MAGPIE.KEY.DICE.HARD = 18
/** @type {Enumerator<Number>} */
MAGPIE.KEY.DICE.RARITY = 24
/** @type {Enumerator<Number>} */
MAGPIE.KEY.DICE.SUITABLE = 6
/** @type {Enumerator<Number>} */
MAGPIE.KEY.DICE.WEIGHTED = 6
/** @type {Enumerator<Number>} */
MAGPIE.KEY.DICE.COMMON = 6
/** @type {Enumerator<Number>} */
MAGPIE.KEY.DICE.UNCOMMON = 12
/** @type {Enumerator<Number>} */
MAGPIE.KEY.DICE.RARE = 24
/** @type {Enumerator<Number>} */
MAGPIE.KEY.DICE.UNIQUE = 48
/** @type {Enumerator<Number>} */
MAGPIE.KEY.DICE.RAREST = 96
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Vars
//------------------------------------------------------------------------
MAGPIE.KEY.VARIABLES = {}
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.PLAYER_X = 8
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.PLAYER_Y = 9
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.CURRENT_MAP = 10
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.ACTOR_ID = 11
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.SCREEN_SIZE_X = 12
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.SCREEN_SIZE_Y = 13
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.DEFAULT_BLEND_MODE = 14
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.DEFAULT_OPACITY = 15
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.SPRITE_ZOOM = 16
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.MAGPIE_PIN = 17
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.MESSAGE_TEXT = 19
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.PLAYTHROUGHS = 20
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.RANDOM_LOOT_BAG = 21
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.PLAYER_DECK = 22
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.PLAYER_RESERVE = 23
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.STAMINA_CARDS = 24
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.PLAYER_WASTE = 25
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.PLAYER_INJURY = 26
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.PLAYER_ZONE = 27
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.CURRENT_CREATURE = 28
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.PLAYER_QUEUE = 29
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.PLAYER_STAMINA = 30
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.RECLAIM = 35
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.SELECTED_X = 36
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.SELECTED_Y = 37
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.PARTY_ID = 38
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.LAST_ACTOR = 39
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.ADOPTION = 40
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.ALIVE_CHARACTERS = 41
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.DEAD_CHARACTERS = 42
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.EXTRA_CHARACTERS = 43
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.LOCATION = 46
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.FERTILITY = 47
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.BIOME = 48
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.TERRITORY = 49
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.HABITAT_ID = 50
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.QUEST_LOG = 59
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.QUEST_PROMPT = 60
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.TERRITORY_ID = 61
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.TERRITORY_DISCARD = 62
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.CARD_TO_DRAW = 64
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.DRAWN_CARDS = 65
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.LAST_SUMMON = 66
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.CHARACTER_ID = 67
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.LAST_DISCARD = 68
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.RECLAIM_AMOUNT = 69
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.HABITAT_LOOT = 75
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.CHOICE = 86
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.FERTILITY_COST = 87
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.LAST_ITEM_FOUND = 89
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.LAST_ITEM_USED = 90
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.CREATURE_STATS = 112
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.POI = 181
/**
 * 
 * @type {Enumerator<Number>}
 */
MAGPIE.KEY.VARIABLES.TIMESCALE = 60
/** @type {Enumerator<Number>} */
MAGPIE.KEY.VARIABLES.DEFAULT_CALENDAR = 1
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.CALENDAR = 140
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.TIMESYSTEM = 141
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.DAYS = 142
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.MONTHS = 143
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.LEAP_YEAR = 144
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.LEAP_MONTH = 145
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.GAMEDAY = 132
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.EPOCH = 129
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.YEARDAY = 139
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.SECOND = 121
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.MINUTE = 122
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.HOUR = 123
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.DAY = 124
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.MONTH = 125
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.YEAR = 126
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.TOD = 128
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.LEAP = 131
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.SEASON_ID = 133
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.MONTH_NAME = 147
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.SUNRISE = 134
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.SUNSET = 135
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.SEASON = 137
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.SEASONAL_DELAY = 148
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.INITIAL_EPOCH = 311
/**
 * 
 * 
 */
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.MAP = 10
/** @type {variable_index} */
MAGPIE.KEY.VARIABLES.ERROR = 19

// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Switches
//------------------------------------------------------------------------
MAGPIE.KEY.SWITCHES = {};
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.CE_BUSY = 1
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.GAME_INIT = 4
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.PLAYER_LOCK = 5
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.NEWGAME = 7
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.META_URGENCY = 12
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.WIN = 14
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.ABORT = 15
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.LOSE = 16
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.DEATH = 17
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.KO = 18
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.ESCAPE = 19
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.BATTLE_STARTED = 21
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.BATTLE_ENDED = 24
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.BATTLING = 25
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.FIRST_TURN = 38
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.DISCARD = 39
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.RECLAIM = 40
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_PARTNER = 41
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_FOLLOWER = 42
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_ALLY = 43
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_FRIEND = 44
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_CONTACT = 45
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_NEUTRAL = 46
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_UNFRIENDLY = 47
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_ENEMY = 48
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_NEMESIS = 49
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_THREAT = 50
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_NPC_CONTACT = 51
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_NPC = 52
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.HABITAT_CHANGE = 53
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.TERRITORY_CHANGE = 54
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.KEEP_MESSAGE = 60
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.A = 61
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.B = 62
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.C = 63
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.D = 64
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.TUTORIAL = 65
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.ENEMY_SPAWN = 66
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.E = 67
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.F = 68
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.G = 69
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.STATE_ICON_HIDE = 82
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.USED_ITEM = 98
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.BOUGHT_ITEM = 99
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.SOLD_ITEM = 100
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.NEW_OFFSPRING = 101
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.CLOCK_DATE = 108
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.CLOCK_WEATHER = 109
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.DARK_SCREEN = 110
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.CLOCK_TOD = 111
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.CLOCK_DIGITAL = 112
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.ON_MAP = 113
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.MAP_IDLE = 114
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.MAP_MOVE = 115
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.TERRITORY_SELECT = 116
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.TERRITORY_SELECTED = 117
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.PLAYTIME = 118
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.PAUSE_TINT = 119
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_TIME = 120
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.SEASONAL = 130
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.DAY_CYCLE = 133
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.EXTERNAL = 134
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_LEAP_MONTH = 121
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.NEWDAY = 126
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.NEWMONTH = 127
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.NEWYEAR = 128
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.SEASON_CHANGE = 129
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.SUPER_TICK = 131
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.MEGA_TICK = 132
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.DAYCYCLE = 133
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_DAWN = 136
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_MORNING = 137
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_AFTERNOON = 138
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_DUSK = 139
/** @type {switch_index} */
MAGPIE.KEY.SWITCHES.IS_NIGHT = 140
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > C.E.
//------------------------------------------------------------------------
/** @desc Common Events */
MAGPIE.KEY.CE = {}
/** @type {ce_index} */
MAGPIE.KEY.CE.RECLAIM = 31
/** @type {ce_index} */
MAGPIE.KEY.CE.PASS = 9
/** @type {ce_index} */
MAGPIE.KEY.CE.SPAWN_ENEMY = 66
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > States
//------------------------------------------------------------------------
/** @desc Database states repository */
MAGPIE.KEY.STATES = {}
/** @type {state_index} */
MAGPIE.KEY.STATES.IMMORTAL = 3
/** @type {state_index} */
MAGPIE.KEY.STATES.TIRED = 6
/** @type {state_index} */
MAGPIE.KEY.STATES.SLEEPING = 15
/** @type {injury_index} */
MAGPIE.KEY.STATES.FAT = 112
/** @type {injury_index} */
MAGPIE.KEY.STATES.STIMULANT = 113
/** @type {injury_index} */
MAGPIE.KEY.STATES.FATIGUE = 114
/** @type {injury_index} */
MAGPIE.KEY.STATES.HUNGER = 115
/** @type {injury_index} */
MAGPIE.KEY.STATES.THIRST = 116
/** @type {injury_index} */
MAGPIE.KEY.STATES.POISON = 117
/** @type {injury_index} */
MAGPIE.KEY.STATES.BLEEDING = 118
/** @type {injury_index} */
MAGPIE.KEY.STATES.EXERTION = 119
/** @type {injury_index} */
MAGPIE.KEY.STATES.BRUISE = 151
/** @type {injury_index} */
MAGPIE.KEY.STATES.BLEED = 152
/** @type {injury_index} */
MAGPIE.KEY.STATES.LACERATION = 153
/** @type {injury_index} */
MAGPIE.KEY.STATES.FRACTURE = 154
/** @type {injury_index} */
MAGPIE.KEY.STATES.STRAIN = 155
/** @type {injury_index} */
MAGPIE.KEY.STATES.INTERNAL = 156
/** @type {injury_index} */
MAGPIE.KEY.STATES.SCAR = 157
/** @type {injury_index} */
MAGPIE.KEY.STATES.MAIM = 158
/** @type {injury_index} */
MAGPIE.KEY.STATES.DISMEMBER = 159
/** @type {state_index} */
MAGPIE.KEY.STATES.FATAL = 160
/** @type {move_index} */
MAGPIE.KEY.STATES.UNCONSCIOUS = 14
/** @type {move_index} */
MAGPIE.KEY.STATES.SLEEPING = 15
/** @type {move_index} */
MAGPIE.KEY.STATES.RESTING = 16
/** @type {move_index} */
MAGPIE.KEY.STATES.WALKING = 34
/** @type {move_index} */
MAGPIE.KEY.STATES.SNEAKING = 39
/** @type {move_index} */
MAGPIE.KEY.STATES.TROTTING = 46
/** @type {move_index} */
MAGPIE.KEY.STATES.RUNNING = 47
/** @type {move_index} */
MAGPIE.KEY.STATES.SPRINTING = 48
/** @type {move_index} */
MAGPIE.KEY.STATES.SEARCHING = 49
/** @type {move_index} */
MAGPIE.KEY.STATES.BROWSING = 50
/** @type {move_index} */
MAGPIE.KEY.STATES.STARTLED = 129
/** @type {mood_index} */
MAGPIE.KEY.STATES.BORED = 40
/** @type {mood_index} */
MAGPIE.KEY.STATES.CONFIDENT = 41
/** @type {mood_index} */
MAGPIE.KEY.STATES.JOYFUL = 42
/** @type {mood_index} */
MAGPIE.KEY.STATES.ANGRY = 43
/** @type {mood_index} */
MAGPIE.KEY.STATES.SCARED = 44
/** @type {mood_index} */
MAGPIE.KEY.STATES.SAD = 45
/** @type {morale_index} */
MAGPIE.KEY.STATES.ENCOURAGED = 51
/** @type {morale_index} */
MAGPIE.KEY.STATES.AGGRAVATED = 52
/** @type {morale_index} */
MAGPIE.KEY.STATES.SATISFIED = 53
/** @type {morale_index} */
MAGPIE.KEY.STATES.STRESSED = 54
/** @type {morale_index} */
MAGPIE.KEY.STATES.DISCOURAGED = 55
/** @type {morale_index} */
MAGPIE.KEY.STATES.RELIEVED = 56
/** @type {posture_index} */
MAGPIE.KEY.STATES.PROTECTIVE = 19
/** @type {posture_index} */
MAGPIE.KEY.STATES.PREY = 20
/** @type {posture_index} */
MAGPIE.KEY.STATES.EVASIVE = 21
/** @type {posture_index} */
MAGPIE.KEY.STATES.AGGRESSIVE = 22
/** @type {posture_index} */
MAGPIE.KEY.STATES.PREDATOR = 26
/** @type {posture_index} */
MAGPIE.KEY.STATES.NEUTRAL = 27
/** @type {posture_index} */
MAGPIE.KEY.STATES.GROGGY = 37
/** @type {posture_index} */
MAGPIE.KEY.STATES.ALERT = 38
/** @type {posture_index} */
MAGPIE.KEY.STATES.DROWSY = 57
/** @desc state resources */
MAGPIE.KEY.STATES.RESOURCE = {}
/** @type {resource_index} */
MAGPIE.KEY.STATES.RESOURCE.MASS = 71
 /** @type {resource_index} */
MAGPIE.KEY.STATES.RESOURCE.AGGRO = 72
/** @type {resource_index} */
MAGPIE.KEY.STATES.RESOURCE.DEX = 73
/** @type {resource_index} */
MAGPIE.KEY.STATES.RESOURCE.SEN = 74
/** @type {[resource_index, resource_index, resource_index]} */
MAGPIE.KEY.STATES.RESOURCE.STA_STATES = [75,77,78]
/** @type {resource_index} */
MAGPIE.KEY.STATES.RESOURCE.STA_MID = 77
/** @type {resource_index} */
MAGPIE.KEY.STATES.RESOURCE.STA_LOW = 78
/** @type {resource_index} */
MAGPIE.KEY.STATES.RESOURCE.NRG = 76
/** @type {[resource_index, resource_index, resource_index, resource_index, resource_index]} */
MAGPIE.KEY.STATES.RESOURCE.NRG_STATES = [76,79,80,81,82]
/** @type {resource_index} */
MAGPIE.KEY.STATES.RESOURCE.NRG_HIGH = 79
/** @type {resource_index} */
MAGPIE.KEY.STATES.RESOURCE.NRG_MID = 80
/** @type {resource_index} */
MAGPIE.KEY.STATES.RESOURCE.NRG_LOW = 81
/** @type {resource_index} */
MAGPIE.KEY.STATES.RESOURCE.NRG_NONE = 82
/** @type {resource_index[]} */
MAGPIE.KEY.STATES.RESOURCE.ALL = [
	MAGPIE.KEY.STATES.RESOURCE.MASS,
	MAGPIE.KEY.STATES.RESOURCE.AGGRO,
	MAGPIE.KEY.STATES.RESOURCE.DEX,
	MAGPIE.KEY.STATES.RESOURCE.SEN,
	...MAGPIE.KEY.STATES.RESOURCE.STA_STATES,
	...MAGPIE.KEY.STATES.RESOURCE.NRG_STATES
]
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Armor
//------------------------------------------------------------------------
/**
 * @typedef {index} armor_index
 */
MAGPIE.KEY.ARMOR = {};
/** @type {armor_index} */
MAGPIE.KEY.ARMOR.EMBRYO = 1;
/** @type {armor_index} */
MAGPIE.KEY.ARMOR.INFANT = 2
/** @type {armor_index} */
MAGPIE.KEY.ARMOR.JUVENILE = 3
/** @type {armor_index} */
MAGPIE.KEY.ARMOR.ADOLESCENT = 4
/** @type {armor_index} */
MAGPIE.KEY.ARMOR.ADULT = 5
/** @type {armor_index} */
MAGPIE.KEY.ARMOR.ELDER = 6
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Growth
//------------------------------------------------------------------------
/** @desc Creature growth stats */
MAGPIE.KEY.GROWTH = {}
/**
 * @typedef {[armor_index, growth_level, growth_level]} growth_stage
 */
/** @type {growth_stage} */
MAGPIE.KEY.GROWTH.EMBRYO = [MAGPIE.KEY.ARMOR.EMBRYO, 0, 1]
/** @type {growth_stage} */
MAGPIE.KEY.GROWTH.INFANT = [MAGPIE.KEY.ARMOR.INFANT, 0, 0.2]
/** @type {growth_stage} */
MAGPIE.KEY.GROWTH.JUVENILE = [MAGPIE.KEY.ARMOR.JUVENILE, 0.2, 0.5]
/** @type {creature_level} */
MAGPIE.KEY.GROWTH.ADOLESCENT = [MAGPIE.KEY.ARMOR.ADOLESCENT, 0.5, 0.8]
/** @type {creature_level} */
MAGPIE.KEY.GROWTH.ADULT = [MAGPIE.KEY.ARMOR.ADULT, 0.8, 1]
/** @type {creature_level} */
MAGPIE.KEY.GROWTH.ELDER = [MAGPIE.KEY.ARMOR.ELDER, 1, Infinity]
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Skills
//------------------------------------------------------------------------
/** @typedef {index} skill_index */
MAGPIE.KEY.SKILL = {}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * @audit appropriate setup?
 */
//------------------------------------------------------------------------
// #region > Equip
//------------------------------------------------------------------------
/** @desc Database Equip slot */
MAGPIE.KEY.EQUIP = {}
/** @type {equip_slot} */
MAGPIE.KEY.EQUIP.TOOL = 1
/** @type {equip_slot} */
MAGPIE.KEY.EQUIP.PHYSIQUE = 2
/** @type {equip_slot} */
MAGPIE.KEY.EQUIP.METABOLISM = 3
/** @type {equip_slot} */
MAGPIE.KEY.EQUIP.EVOLUTION = 4
/** @type {equip_slot} */
MAGPIE.KEY.EQUIP.GROWTH = 5
/** @type {equip_slot} */
MAGPIE.KEY.EQUIP.TRAIT = 6
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.TOOL = 1
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.PHYSIQUE = 2
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.GROWTH = 3
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.HEAD = 4
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.CHEST = 5
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.ARMS = 6
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.HIPS = 7
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.LEGS = 8
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.MUTATION_1 = 9
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.MUTATION_2 = 10
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.MUTATION_3 = 11
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.RESOURCE = 12
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.EQUIPMENT = 13
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.CARRY = 14
// /** @type {equip_slot} */
// MAGPIE.KEY.EQUIP.MOUNT = 15
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * @typedef {Number} element_index
 */
//------------------------------------------------------------------------
// #region > Element
//------------------------------------------------------------------------
MAGPIE.KEY.ELEMENT = {}
/** @type {element_index} */
MAGPIE.KEY.ELEMENT.BLUNT = 1
/** @type {element_index} */
MAGPIE.KEY.ELEMENT.SHARP = 2
/** @type {element_index} */
MAGPIE.KEY.ELEMENT.PIERCE = 3
/** @type {element_index} */
MAGPIE.KEY.ELEMENT.SHOCK = 4
/** @type {element_index} */
MAGPIE.KEY.ELEMENT.BURN = 5
/** @type {element_index} */
MAGPIE.KEY.ELEMENT.FREEZE = 6
/** @type {element_index} */
MAGPIE.KEY.ELEMENT.GRAVITY = 7
/** @type {element_index} */
MAGPIE.KEY.ELEMENT.CHEMICAL = 8
/** @type {element_index} */
MAGPIE.KEY.ELEMENT.BIOLOGICAL = 9
/** @type {element_index} */
MAGPIE.KEY.ELEMENT.RADIOACTIVE = 10
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * @typedef {Number} skill_type
 */
//------------------------------------------------------------------------
// #region > Skill Type
//------------------------------------------------------------------------
MAGPIE.KEY.SKILL_TYPE = {}
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.TRAIT = 1
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.RESOURCE = 2
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.CREATURE = 3
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.EXP = 4
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.HABITAT = 5
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.RECOVERY = 6
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.REACTION = 7
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.BLOCK = 8
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.IMPACT = 9
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.MOVE = 10
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.EMOTE = 11
/** @type {skill_type} */
MAGPIE.KEY.SKILL_TYPE.COUNTERBLOCK = 12
/** @type {skill_type} @audit appropriate name? */
MAGPIE.KEY.SKILL_TYPE.COUNTERSTRESS = 13
/** @type {skill_type} @audit appropriate name? */
MAGPIE.KEY.SKILL_TYPE.COUNTERCOMFORT = 14
/** @type {skill_type} @audit appropriate name? */
MAGPIE.KEY.SKILL_TYPE.COUNTEREMOTE = 15
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * @typedef {Number} weapon_type
 */
//------------------------------------------------------------------------
// #region > Weap. Type
//------------------------------------------------------------------------
MAGPIE.KEY.WEAPON_TYPE = {}
/** @type {weapon_type} */
MAGPIE.KEY.WEAPON_TYPE.BLUNT = 1
/** @type {weapon_type} */
MAGPIE.KEY.WEAPON_TYPE.SHARP = 2
/** @type {weapon_type} */
MAGPIE.KEY.WEAPON_TYPE.PIERCE = 3
/** @type {weapon_type} */
MAGPIE.KEY.WEAPON_TYPE.SHOCK = 4
/** @type {weapon_type} */
MAGPIE.KEY.WEAPON_TYPE.RESOURCE = 5
/** @type {weapon_type} */
MAGPIE.KEY.WEAPON_TYPE.TOOL = 6
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * @typedef {Number} armor_type
 * 
 */
//------------------------------------------------------------------------
// #region > Armor type
//------------------------------------------------------------------------
MAGPIE.KEY.ARMOR_TYPE = {}
/** @type {armor_type} */
MAGPIE.KEY.ARMOR_TYPE.PHYSIQUE = 1
/** @type {armor_type} */
MAGPIE.KEY.ARMOR_TYPE.PELAGE = 2
/** @type {armor_type} */
MAGPIE.KEY.ARMOR_TYPE.RESOURCE = 3
/** @type {armor_type} */
MAGPIE.KEY.ARMOR_TYPE.ARTIFACT = 4
/** @type {armor_type} */
MAGPIE.KEY.ARMOR_TYPE.ACCESSORY = 5
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * @typedef {Number} icon_index
 * @typedef {[icon_index, icon_index]} keyboard_icons [IDLE, PRESSED]
 */
//------------------------------------------------------------------------
// #region > Icons
//------------------------------------------------------------------------
MAGPIE.KEY.ICONS = {}
/** @type {Number[]} @audit what is this for? */
MAGPIE.KEY.ICONS.CLASS = [null, 251, 251, 251, 251]
/** @type {keyboard_icons} */
MAGPIE.KEY.ICONS_KEYBOARD_ENTER = [429,427]
/** @type {keyboard_icons} */
MAGPIE.KEY.ICONS_KEYBOARD_UP = [442,443]
/** @type {keyboard_icons} */
MAGPIE.KEY.ICONS_KEYBOARD_LEFT = [440,441]
/** @type {keyboard_icons} */
MAGPIE.KEY.ICONS_KEYBOARD_DOWN = [444,445]
/** @type {keyboard_icons} */
MAGPIE.KEY.ICONS_KEYBOARD_RIGHT = [446,447]
/** @type {keyboard_icons} */
MAGPIE.KEY.ICONS_KEYBOARD_X = [398, 399]
/** @type {keyboard_icons} */
MAGPIE.KEY.ICONS_KEYBOARD_PAGEUP = [504,505]
/** @type {keyboard_icons} */
MAGPIE.KEY.ICONS_KEYBOARD_PAGEDOWN = [506,507]
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Balloons
//------------------------------------------------------------------------
MAGPIE.KEY.BALLOON = {}
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.EXCLAMATION = 1
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.QUESTION = 2
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.MUSIC = 3
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.HEART = 4
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.CROSSED = 5
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.DROP = 6
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.FRUSTRATION = 7
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.SPEECH = 8
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.BULB = 9
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.SLEEP = 10
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.BLOCK = 11
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.IMPACT = 12
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.MOVE = 13
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.EMOTE = 14
/** @type {icon_index} */
MAGPIE.KEY.BALLOON.REST = 15
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Meta
//------------------------------------------------------------------------
MAGPIE.KEY.META = {}
MAGPIE.KEY.META.POI = 0
MAGPIE.KEY.META.POI_GENERIC = 1
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * @todo geography enums
 */
//------------------------------------------------------------------------
// #region > Geography
//------------------------------------------------------------------------
MAGPIE.KEY.GEO = {}
/**
 * @desc climate repository
 * @typedef {index} climate_index
 * @typedef {coefficient} climate_coefficient
 */
MAGPIE.KEY.GEO.CLIMATE = {}
/** @type {climate_coefficient} */
MAGPIE.KEY.GEO.CLIMATE.VOID = -10;
/** @type {climate_coefficient} */
MAGPIE.KEY.GEO.CLIMATE.GLACIAL = -3
/** @type {climate_coefficient} */
MAGPIE.KEY.GEO.CLIMATE.FRIGID = -2
/** @type {climate_coefficient} */
MAGPIE.KEY.GEO.CLIMATE.COLD = -1
/** @type {climate_coefficient} */
MAGPIE.KEY.GEO.CLIMATE.MILD = 0
/** @type {climate_coefficient} */
MAGPIE.KEY.GEO.CLIMATE.WARM = 1
/** @type {climate_coefficient} */
MAGPIE.KEY.GEO.CLIMATE.HOT = 2
/** @type {climate_coefficient} */
MAGPIE.KEY.GEO.CLIMATE.TORRID = 3
/** @typedef {coefficient} humidity_coefficient*/
MAGPIE.KEY.GEO.HUMIDITY = {}
/** @type {humidity_coefficient} */
MAGPIE.KEY.GEO.HUMIDITY.VOID = 0
/** @type {humidity_coefficient} */
MAGPIE.KEY.GEO.HUMIDITY.DRY = 1
/** @type {humidity_coefficient} */
MAGPIE.KEY.GEO.HUMIDITY.ARID = 2
/** @type {humidity_coefficient} */
MAGPIE.KEY.GEO.HUMIDITY.HUMID = 3
/** @type {humidity_coefficient} */
MAGPIE.KEY.GEO.HUMIDITY.DAMP = 4
/** @type {humidity_coefficient} */
MAGPIE.KEY.GEO.HUMIDITY.WET = 5
/** @type {humidity_coefficient} */
MAGPIE.KEY.GEO.HUMIDITY.SOAK = 6
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * @todo enemy templates
 */
//------------------------------------------------------------------------
// #region > Enemy
//------------------------------------------------------------------------
/** @typedef {index} enemy_index */
MAGPIE.KEY.ENEMY = {}
/** @type {enemy_index} */
MAGPIE.KEY.ENEMY.TEMPLATE = 5
/** @type {enemy_index} */
MAGPIE.KEY.ENEMY.STEPPE = MAGPIE.KEY.ENEMY.TEMPLATE
/** @type {enemy_index} */
MAGPIE.KEY.ENEMY.WOODS = MAGPIE.KEY.ENEMY.TEMPLATE
/** @type {enemy_index} */
MAGPIE.KEY.ENEMY.FOREST = MAGPIE.KEY.ENEMY.TEMPLATE
/** @type {enemy_index} */
MAGPIE.KEY.ENEMY.SWAMP = MAGPIE.KEY.ENEMY.TEMPLATE
/** @type {enemy_index} */
MAGPIE.KEY.ENEMY.LSO = MAGPIE.KEY.ENEMY.TEMPLATE
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Troop
//------------------------------------------------------------------------
/** @typedef {index} troop_index */
MAGPIE.KEY.TROOP = {}
/** @type {troop_index} */
MAGPIE.KEY.TROOP.TEMPLATE = 1
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Habitat
//------------------------------------------------------------------------
/** @typedef {[state_index, skill_index]} habitat_index */
MAGPIE.KEY.HABITAT = {}
/** @type {habitat_index} */
MAGPIE.KEY.HABITAT.SHRUB_1 = 	[201,901]
/** @type {habitat_index} */
MAGPIE.KEY.HABITAT.MEADOW_1 = 	[202,902]
/** @type {habitat_index} */
MAGPIE.KEY.HABITAT.MEADOW_2 = 	[203,903]
/** @type {habitat_index} */
MAGPIE.KEY.HABITAT.MEADOW_3 = 	[204,904]
/** @type {habitat_index} */
MAGPIE.KEY.HABITAT.MEADOW_4 = 	[205,905]
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * @typedef {Number} biomeID
 * @typedef {{
 * name: String,
 * climate: climate_index,
 * humidity: humidity_index,
 * battleback: battleback_index,
 * commonHabitat: habitat_index,
 * uncommonHabitat: habitat_index,
 * rareHabitat: habitat_index,
 * uniqueHabitat: habitat_index,
 * enemyID: enemyID
 * }} biome_data
 * @todo biomeIDs
 */
//------------------------------------------------------------------------
// #region > Biome
//------------------------------------------------------------------------
MAGPIE.KEY.BIOME = {}
/** @type {biome_data} */
MAGPIE.KEY.BIOME.STEPPE = {
	name: "steppe",
	climate: MAGPIE.KEY.GEO.CLIMATE.MILD,
	humidity: MAGPIE.KEY.GEO.HUMIDITY.ARID,
	battleback: "steppe",
	commonHabitat: [
		MAGPIE.KEY.HABITAT.SHRUB_1
	],
	uncommonHabitat: [
		MAGPIE.KEY.HABITAT.MEADOW_1,
		MAGPIE.KEY.HABITAT.MEADOW_2
	],
	rareHabitat: [
		MAGPIE.KEY.HABITAT.TREE_1
	],
	uniqueHabitat: [
		MAGPIE.KEY.HABITAT.REEDS_1
	],
	enemyID: MAGPIE.KEY.ENEMY.STEPPE
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * @todo history
 */
//------------------------------------------------------------------------
// #region > history
//------------------------------------------------------------------------
MAGPIE.KEY.HISTORY = {}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Dextrous
//------------------------------------------------------------------------
MAGPIE.KEY.DEXTROUS = {}
MAGPIE.KEY.DEXTROUS.EXPORT = {}
/** @type {Enumerator<percentage>} */
MAGPIE.KEY.DEXTROUS.EXPORT.CGC = 115;
/** @type {Enumerator<percentage>} */
MAGPIE.KEY.DEXTROUS.EXPORT.SV_ACTORS = 97.5
// #endregion
//------------------------------------------------------------------------
/**
 * 
 * @desc back to {@link }
 *
 */
//========================================================================
// #endregion - 
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//========================================================================
// #region - SHELDEX
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Console
//------------------------------------------------------------------------
MAGPIE.SHELDEX.CONSOLE_GREEN = "#7EFF00"
MAGPIE.SHELDEX.CONSOLE_RED = "#ff073a"
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Enums
//------------------------------------------------------------------------
/** @returns {Object} */
SHELDEX.prototype.enumeratePostures = function()
{
	console.log("[SHELDEX] enumerating postures... ")
	this.postures = {
		protective: MAGPIE.KEY.STATES.PROTECTIVE,
		prey: MAGPIE.KEY.STATES.PREY,
		evasive: MAGPIE.KEY.STATES.EVASIVE,
		aggressive: MAGPIE.KEY.STATES.AGGRESSIVE,
		predator: MAGPIE.KEY.STATES.PREDATOR,
		neutral: MAGPIE.KEY.STATES.NEUTRAL,
		alert: MAGPIE.KEY.STATES.ALERT,
		groggy: MAGPIE.KEY.STATES.GROGGY,
		drowsy: MAGPIE.KEY.STATES.DROWSY
	}
	console.log(`[SHELDEX] ${Object.keys(this.postures).length}x postures enumerated.`)
	return this.postures
}
/** @returns {Object} */
SHELDEX.prototype.enumerateMoves = function()
{
	console.log("[SHELDEX] enumerating moves...")
	this.moves = {
		sleeping: MAGPIE.KEY.STATES.SLEEPING,
		resting: MAGPIE.KEY.STATES.RESTING,
		walking: MAGPIE.KEY.STATES.WALKING,
		sneaking: MAGPIE.KEY.STATES.SNEAKING,
		trotting: MAGPIE.KEY.STATES.TROTTING,
		running: MAGPIE.KEY.STATES.RUNNING,
		sprinting: MAGPIE.KEY.STATES.SPRINTING,
		searching: MAGPIE.KEY.STATES.SEARCHING,
		browsing: MAGPIE.KEY.STATES.BROWSING,
		startled: MAGPIE.KEY.STATES.STARTLED
	}
	console.log(`[SHELDEX] ${Object.keys(this.moves).length}x moves enumerated.`)
	return this.moves
}
/**
 * @returns {Object}
 */
SHELDEX.prototype.enumerateMoods = function()
{
	console.log("[SHELDEX] enumerating moods...")
	this.moods = {
		bored: MAGPIE.KEY.STATES.BORED,
		confident: MAGPIE.KEY.STATES.CONFIDENT,
		joyful: MAGPIE.KEY.STATES.JOYFUL,
		angry: MAGPIE.KEY.STATES.ANGRY,
		scared: MAGPIE.KEY.STATES.SCARED,
		sad: MAGPIE.KEY.STATES.SAD
	}
	console.log(`[SHELDEX] ${Object.keys(this.moods).length}x moods enumerated.`)
	return this.moods
}
SHELDEX.prototype.enumerateMorales = function()
{
	console.log("[SHELDEX] enumerating morales...")
	this.morales = {
		encouraged: MAGPIE.KEY.STATES.ENCOURAGED,
		aggravated: MAGPIE.KEY.STATES.AGGRAVATED,
		satistied: MAGPIE.KEY.STATES.SATISFIED,
		stressed: MAGPIE.KEY.STATES.STRESSED,
		discouraged: MAGPIE.KEY.STATES.DISCOURAGED,
		relieved: MAGPIE.KEY.STATES.RELIEVED
	}
	console.log(`[SHELDEX] ${Object.keys(this.morales).length}x morales enumerated.`)
	return this.morales
}
/**
 * 
 */
SHELDEX.prototype.enumerate = function()
{
	this.enumeratePostures()
	this.enumerateMoods()
	this.enumerateMorales()
	this.enumerateMoves()
}
// #endregion
//------------------------------------------------------------------------
/**
 * 
 * @desc back to {@link }
 *
 */
//========================================================================
// #endregion - 
//========================================================================
/**
 * @name 
 * @desc 
 * @typedef {{
 * variables: variables_repository,
 * switches: switches_repository
 * }} sheldex_data
 * @typedef {Object} variables_repository
 * @typedef {Object} switches_repository
 * 
 */
//========================================================================
// #region - SYSTEM
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > proto
//------------------------------------------------------------------------
/**
 * 
 * @param {sheldex_data} data 
 * @returns {new SHELDEX}
 */
function SHELDEX(data)
{
	this.initialize(data)
}
SHELDEX.prototype.initialize = function(data)
{
	this.isInit = true;
	this.isActive = false;
	this.variables = data?.variables;
	this.switches = data?.switches;
}
/**
 * @todo SHELDEX sync
 * @returns {Boolean}
 */
SHELDEX.prototype.isSynced = function()
{
	return SE_CLI.KEY
}
// #endregion
//------------------------------------------------------------------------
/**
 * 
 * @desc back to {@link }
 *
 */
//========================================================================
// #endregion - 
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//========================================================================
// #region - UTILS
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Bios
//------------------------------------------------------------------------
/**
 * @typedef {String} version "vMAJOR.MINOR.PATCH"
 * @param {[Number,Number,Number]} version 
 * @returns {version}
 */
MAGPIE.printVersion = function(version)
{
	const v = version
	return `v${v[0]}.${v[1]}.${v[2]}`
}
/**
 * 
 * @returns {String} file.js
 */
MAGPIE.firmwareFile = function()
{
	return `${MAGPIE.app.sheldex.meta.firmwareName}.js`
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Rmmz
//------------------------------------------------------------------------

// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//========================================================================
// #region - BOOT
//========================================================================
/**
 * @name 
 * @desc 
 * @typedef {{
 * name: String,
 * desc: String,
 * version: version,
 * firmwareName: String,
 * firmwareDate: String
 * }} HIMS_data
 */
//------------------------------------------------------------------------
// #region > System
//------------------------------------------------------------------------
MAGPIE.SYS._gameSystem_initialize = Game_System.prototype.initialize;
/**
 * @param {HIMS_data} data
 * @returns {new HIMS}
 */
function HIMS(data)
{
	this.initialize(data)
}
HIMS.meta = MAGPIE.SHELDEREVO.meta
HIMS.prototype.initialize = function(data)
{
	this.isInit = true;
	this.meta = HIMS.meta
	HIMS.boot()
}
HIMS.prototype.boot = HIMS.boot;
Game_System.prototype.initialize = function()
{
	MAGPIE.SYS._gameSystem_initialize.call(this);
	$HIMS = new HIMS();
}
HIMS.boot = function()
{
	$seData = new SE_DATA();
	$seEntity = new SE_ENTITY();
	$sePlayer = new SE_PLAYER();
	$seTime = new SE_TIME()
	$metastate = new SE_METASTATE()
	$seSocket = new SE_SOCKET()
	$sheldex = new SHELDEX();
	$PDL = new MAGPIE_PDL();
	$CBE = new MAGPIE_CBE();
	$CGC = new MAGPIE_CGC()
	const systems = [
		HIMS.settings(),
		HIMS.data(),
		HIMS.systems(),
		HIMS.UI(),
	]
	if(HIMS.systemsCheck(systems))
		console.log(`${HIMS.meta.name} initialized!`)
	else
		console.warn(`${HIMS.meta.name} initialization fail!`)
}
/**
 * @typedef {String} hex_color e.g. #ff073a
 * @param {{
 * color: hex_color,
 * weight: String,
 * background: String,
 * family: String,
 * padding: String
 * }} options
 * @returns {Boolean}
 */
HIMS.consoleCSS = function(options)
{
	const color = options?.color || "white";
	const weight = options?.weight || "bold";
	const bg = options?.background || "black";
	const family =  options?.family || "monospace";
	const padding = options?.padding || "0px";
 	return `color: ${color}; font-weight: ${weight}; background-color: ${bg}; font-family: ${family}; padding: ${padding}`
}
/**
 * 
 * @param {String} message 
 * @param {Boolean} status 
 * @param {Number} length 
 * @returns {Boolean}
 */
HIMS.consoleGO = function (message = "", status = false, length = 100)
{
	const resultText = status ? "GO!" : "NO GO!";
	const dotsAmount = length - message.length - resultText.length
	let dots = ""
	for(let i = 0; i < dotsAmount; i++)
	{
		dots += "."
	}
	const color = status ? MAGPIE.SHELDEX.CONSOLE_GREEN : MAGPIE.SHELDEX.CONSOLE_RED;
	const css = HIMS.consoleCSS({color: color})
	console.log(`%c${message}${dots}${resultText}`, css)
	return status
}
/**
 * 
 * @param {Boolean[]} array 
 * @returns {Boolean}
 */
HIMS.systemsCheck = function(array)
{
	return !array.some(x => !x)
}
HIMS.settings = function(status = false)
{
	return HIMS.consoleGO("Settings", status)
}
HIMS.data = function()
{
	const status = HIMS.consoleGO("SHELDEX", $sheldex?.isSynced());
	return HIMS.consoleGO("HIMS.Data", status)
}
HIMS.systems = function(status = true)
{
	return HIMS.consoleGO("Systems", status)
}
HIMS.UI = function(status = true)
{
	return HIMS.consoleGO("UI", status)
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Data
//------------------------------------------------------------------------
/**
 * @static 
 * @returns {new SE_DATA}
 */
function SE_DATA()
{
	this.initialize(...arguments)
}
SE_DATA.prototype.initialize = function()
{
	this.isInit = true;
	this.isActive = false;
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Entity
//------------------------------------------------------------------------
/**
 * @static
 * @returns {new SE_ENTITY}
 */
function SE_ENTITY()
{
	this.initialize(...arguments)
}
SE_ENTITY.prototype.initialize = function()
{
	this.isInit = true;
	this.isActive = false;
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Player
//------------------------------------------------------------------------
/**
 * @static
 * @returns {new SE_PLAYER}
 */
function SE_PLAYER()
{
	this.initialize(...arguments)
}
SE_PLAYER.prototype.initialize = function()
{
	this.isInit = true;
	this.isActive = false;
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Socket
//------------------------------------------------------------------------
/**
 * @static
 * @returns {new SE_SOCKET}
 */
function SE_SOCKET()
{
	this.initialize(...arguments)
}
SE_SOCKET.prototype.initialize = function()
{
	this.isInit = true;
	this.isActive = false;
	/** @type {Object} @desc 'socket.io socket */
	this.data = null;
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > TIme
//------------------------------------------------------------------------
/**
 * @static
 * @returns {new SE_TIME}
 */
function SE_TIME()
{
	this.initialize(...arguments)
}
SE_TIME.prototype.initialize = function()
{
	this.isInit = true;
	this.isActive = false;
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Metastate
//------------------------------------------------------------------------
/**
 * @static
 * @returns {new SE_METASTATE}
 */
function SE_METASTATE()
{
	this.initialize(...arguments)
}
SE_METASTATE.prototype.initialize = function()
{
	this.isInit = true;
	this.isActive = false;
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Terminal
//------------------------------------------------------------------------
/**
 * @static
 * @returns {new SE_TERMINAL}
 */
function SE_TERMINAL()
{
	this.initialize(...arguments)
}
SE_TERMINAL.prototype.initialize = function()
{
	this.isInit = true;
	this.isActive = false;
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 */
//------------------------------------------------------------------------
// #region > Save
//------------------------------------------------------------------------
/** @type {HIMS} */
var $HIMS = null;
/** @type {SE_DATA} */
var $seData = null;
/** @type {SE_ENTITY} */
var $seEntity = null;
/** @type {SE_PLAYER} */
var $sePlayer = null;
/** @type {SE_TIME} */
var $seTime = null;
/** @type {SE_METASTATE} */
var $metastate = null;
/** @type {SE_SOCKET} */
var $seSocket = null;
/** @type {SHELDEX} */
var $sheldex = null;
/** @type {MAGPIE_PDL} */
var $PDL = null
/** @type {MAGPIE_CBE} */
var $CBE = null
/** @type {MAGPIE_CGC} */
var $CGC = null
// MAGPIE.DATA._createSave = DataManager.createGameObjects;
// DataManager.createGameObjects = function()
// {
// 	MAGPIE.DATA._createSave.call(this);
// 	$HIMS = new HIMS();
// 	$seEntity = new SE_ENTITY();
// 	$sePlayer = new SE_PLAYER();
// 	$seTime = new SE_TIME()
// 	$metastate = new SE_METASTATE()
// 	$seSocket = new SE_SOCKET()
// 	$sheldex = new SHELDEX();
// 	$PDL = new MAGPIE_PDL();
// 	$CBE = new MAGPIE_CBE();
// 	$CGC = new MAGPIE_CGC()
// }
MAGPIE.DATA._newGameContents = function()
{
	//
}
// MAGPIE.DATA._makeSave = DataManager.makeSaveContents;
// DataManager.makeSaveContents = function()
// {
// 	const contents = MAGPIE.DATA._makeSave.call(this);
// 	contents.ShelderEvo = {
// 		$HIMS,
// 		$seData,
// 		$seEntity,
// 		$sePlayer,
// 		$seTime,
// 		$metastate,
// 		$seSocket,
// 		$seCalendar,
// 		$sheldex,
// 		$PDL,
// 		$CBE,
// 		$CGC
// 	}
// 	return contents
// }
// MAGPIE.DATA._loadSave = DataManager.extractSaveContents;
// DataManager.extractSaveContents = function(contents)
// {
// 	MAGPIE.DATA._loadSave.call(this, contents)
// 	const SE = contents.ShelderEvo;
// 	$HIMS = SE.$HIMS;
// 	$seData = SE.$seData;
// 	$seEntity = SE.$seEntity
// 	$sePlayer = SE.$sePlayer
// 	$seTime = SE.$seTime
// 	$metastate = SE.$metastate
// 	$seSocket = SE.$seSocket
// 	$sheldex = SE.$sheldex
// 	$PDL = SE.$PDL
// 	$CBE = SE.$CBE
// 	$CGC = SE.$CGC
// }
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
*/
//------------------------------------------------------------------------
// #region > New Game
//------------------------------------------------------------------------
MAGPIE.start = function()
{
	//
}

// #endregion
//------------------------------------------------------------------------
/**
 * 
 * @desc back to {@link }
 *
 */
//========================================================================
// #endregion - 
//========================================================================
/**
 * 
 * @desc back to {@link }
 *
 */
//========================================================================
// #endregion - 
//========================================================================
/**
 * back to {@link MAGPIE.meta}
 * 
 */
//========================================================================
// END OF FILE
//========================================================================