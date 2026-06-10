//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_5] v0.4.7 MAGPIE_ShelderEvo_Core
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-shelderevo
 * 
 * @help
 * (MAGPIE) SHELDER EVOLUTION CORE
 * Main plugin with core mechanics and dictionary for the Shelder Evo base game
 * 
 * ----------------------------------------------------------------------------
 * FEATURES
 * ----------------------------------------------------------------------------
 * - SHELDEX
 *   Integrated digital library with CODE dictionary and HIMS-compatible 
 *   encyclopedia
 * 
 * - $ShelderEvo
 *   Independent Game system with Myth_CGC integration 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.4.7 2025 09 25
 * - MAGPIE.SYS 0.11.0 conformity update
 * 
 * v0.4.6 2025 08 28
 * - MAGPIE.SYS 0.9.0 conformity update
 * - revised RUNTIME script
 * 
 * v0.4.5 2025 08 27
 * - MAGPIE.ARK 0.1.0 conformity update
 * - tier changed from 4 to 5
 * 
 * v0.4.4 2025 08 24
 * - MAGPIE.SYS 0.9.0 conformity update
 * 
 * v0.4.3 2025 08 23
 * - v0.3.0 MAGPIE_Geography update
 * 
 * v0.4.2 2025 08 22
 * - MAGPIE_SYS v0.8.0 conformity update
 * 
 * v0.4.1 2025 08 19
 * - conformity update
 * 
 * - v0.4.0 2025 08 06 
 *   initial build
 * ----------------------------------------------------------------------------
 * 
 * @param sheldex
 * @text SHELDEX settings
 * 
 * @param CE
 * @parent sheldex
 * @text Common events
 * @type struct<CE>
 * 
 * @param variables
 * @parent sheldex
 * @text Variables
 * @type struct<variables>
 * 
 * @param switches
 * @parent sheldex
 * @text Switches
 * @type struct<switches>
 * 
 * @param items
 * @parent sheldex
 * @text Items
 * @type struct<items>
 * 
 * @param states
 * @parent sheldex
 * @text States
 * @type struct<states>
 * 
 * @param injuries
 * @parent sheldex
 * @text Injuries
 * @type struct<injuries>
 * 
 * @param moves
 * @parent sheldex
 * @text Moves
 * @type struct<moves>
 * 
 * @param moods
 * @parent sheldex
 * @text Moods
 * @type struct<moods>
 * 
 * @param postures
 * @parent sheldex
 * @text Postures
 * @type struct<postures>
 * 
 * @param morale
 * @parent sheldex
 * @text Morale
 * @type struct<morale>
 * 
 * @param habCombo
 * @parent sheldex
 * @text Habitat combo
 * @type struct<habCombo>
 * 
 * @param buffs
 * @parent sheldex
 * @type struct<buffs>
 * 
 * @param combo
 * @parent sheldex
 * @type struct<combo>
 * 
 * @param ICV
 * @parent sheldex
 * @type struct<ICV>
 */

/*~struct~variables:
 * 
 * @param map
 * @type variable
 * @default 10
 * 
 * @param error
 * @type variable
 * @default 19
 * 
 * @param lastActor
 * @type variable
 * @default 39
 * 
 * @param fertility
 * @type variable
 * @default 47
 * 
 * @param biome
 * @type variable
 * @default 48
 * 
 * @param habitatID
 * @type variable
 * @default 50
 * 
 * @param territoryID
 * @type variable
 * @default 61
 * 
 * @param lastSummon
 * @type variable
 * @default 66
 * 
 * @param characterID
 * @type variable
 * @default 67
 * 
 * @param discard
 * @type variable
 * @default 68
 * 
 * @param reclaimAmount
 * @type variable
 * @default 69
 * 
 * @param turn
 * @type variable
 * @default 80
 * 
 * @param lastItem
 * @type variable
 * @default 89
 * 
 * @param creatureStats
 * @type variable
 * @default 112
 */

/*~struct~switches:
 * 
 * @param CEbusy
 * @text Common Event is busy
 * @desc This switch can be used to delay functions. 'None' (0) if not needed
 * @type switch
 * @default 0
 * 
 * @param metaUrgency
 * @type switch
 * @default 12
 * 
 * @param escape
 * @type switch
 * @default 19
 * 
 * @param habitatChange
 * @type switch
 * @default 53
 * 
 * @param territoryChange
 * @type switch
 * @default 54
 * 
 * @param enemySpawn
 * @type switch
 * @default 66
 * 
 * @param darkScreen
 * @type switch
 * @default 110
 */

/*~struct~CE:
 *
 * @param reclaim
 * @type common_event
 * @default 31
 * 
 * @param spawnEnemy
 * @type common_event
 * @default 66
 * 
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

/*~struct~items:
 * 
 * 
 * 
 * 
 */

/*~struct~states:
 * 
 * @param immortal
 * @text Immortal
 * @type state
 * @default 3
 * 
 * @param tired
 * @text Tired
 * @type state
 * @default 6
 * 
 * @param sleeping
 * @text Sleeping
 * @type state
 * @default 15
 * 
 * @param fatigue
 * @text Fatigue injury
 * @type state
 * @default 114
 * 
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
 * @text Fatigue
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
 * @param bleeding
 * @type state
 * @default 118
 * 
 * @param exertion
 * @type state
 * @default 119
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
 * 
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
 * 
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

/*~struct~habCombo:
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

/*~struct~combo:
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

/*~struct~ICV:
 * 
 * @param creatureID
 * @type number
 * @default 0
 * 
 * @param speciesID
 * @type number
 * @default 1
 * 
 * @param creatureResource
 * @type number
 * @default 2
 * 
 * @param creatureItem
 * @type number
 * @default 3
 * 
 * @param habitatID
 * @type number
 * @default 0
 * 
 * @param habitatResource
 * @type number
 * @default 2
 * 
 * @param habitatItem
 * @type number
 * @default 3
 * 
 * 
 */

//#endregion
//------------------------------------------------------------------------









//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.11.0";
MAGPIE.ShelderEvo = {};
MAGPIE.ShelderEvo.version = "0.4.7";
MAGPIE.ShelderEvo.firmware = "v" + MAGPIE.ShelderEvo.version + ".20250925";
MAGPIE.ShelderEvo.tier = 5;
MAGPIE.ShelderEvo.pluginName = "MAGPIE_ShelderEvo_Core";
MAGPIE.ShelderEvo.meta = {
	name: "M.A.G.P.I.E. Shelder Evolution",
	firmware: MAGPIE.ShelderEvo.firmware,
	firmwareFile: `${MAGPIE.ShelderEvo.pluginName}.js`,
	isHIMS: true
};
const SHELDEX = {};
SHELDEX.meta = {isCypher: true, isLibrary: true};
MAGPIE.ShelderEvo.parameters = PluginManager
	.parameters(MAGPIE.ShelderEvo.pluginName);
//#endregion
//------------------------------------------------------------------------









//------------------------------------------------------------------------
//#region SHELDEX
/**
 * {@link MAGPIE.SHELDEX.meta}
 */




//#region CGC
SHELDEX.ZONE = {};
SHELDEX.ZONE.INJURY = 0;
SHELDEX.ZONE.PERMANENT = 1;
SHELDEX.ZONE.TERRITORY = 2;
SHELDEX.ZONE.WILD = 3;

SHELDEX.CARD = {};
SHELDEX.CARD.ACTOR_SPRITE = {};
SHELDEX.CARD.ACTOR_SPRITE.OFFSET_X = 168;
SHELDEX.CARD.ACTOR_SPRITE.OFFSET_Y = 6;
SHELDEX.CARD.ACTOR_SPRITE.X = 132;
SHELDEX.CARD.BATTLER_SPRITE = {};
SHELDEX.CARD.BATTLER_SPRITE.W = 240;
SHELDEX.CARD.BATTLER_SPRITE.H = 328;

SHELDEX.CARD.MAX_DECK_SIZE = 100;

SHELDEX.DEXTROUS = {};
SHELDEX.DEXTROUS.EXPORT = {};
SHELDEX.DEXTROUS.EXPORT.CGC = 115;
SHELDEX.DEXTROUS.EXPORT.SV_ACTORS = 97.5;

SHELDEX.ICV = {};
SHELDEX.ICV.meta = {isSettings: true};
SHELDEX.ICV.parameters = MAGPIE.SYS.data
	.parseStructArr(MAGPIE.ShelderEvo.parameters.ICV);
SHELDEX.ICV.CREATURE_ID = SHELDEX.ICV.parameters.creatureID;
SHELDEX.ICV.SPECIES_ID = SHELDEX.ICV.parameters.speciesID;
SHELDEX.ICV.CREATURE_RESOURCE = SHELDEX.ICV.parameters.creatureResource;
SHELDEX.ICV.CREATURE_ITEM = SHELDEX.ICV.parameters.creatureItem;
SHELDEX.ICV.HABITAT_ID = SHELDEX.ICV.parameters.habitatID;
SHELDEX.ICV.HABITAT_RESOURCE = SHELDEX.ICV.parameters.habitatResource;
SHELDEX.ICV.HABITAT_ITEM = SHELDEX.ICV.parameters.habitatItem;
SHELDEX.ICV.ENTITY_ID = 0;
SHELDEX.ICV.ENTITY_NAME = 1;
SHELDEX.ICV.ENTITY_TYPE = 2;
SHELDEX.ICV.ENTITY_DESC = 3;
SHELDEX.ICV.EXP_ID = 0;
SHELDEX.ICV.EXP_NAME = 1;
SHELDEX.ICV.EXP_TYPE = 2;
SHELDEX.ICV.EXP_DESC = 3;

/**
 * @property {Number} STANDARD 6
 * @property {Number} ADVANCED 12
 * @property {Number} HARD 18
 * @property {Number} RARITY 24
 * @property {Number} SUITABLE 6
 * @property {Number} WEIGHTED 6
 * @property {Number} COMMON 6
 * @property {Number} UNCOMMON 12
 * @property {Number} RARE 24
 * @property {Number} UNIQUE 48
 * @property {Number} RAREST 96
 */
SHELDEX.DICE = {};
SHELDEX.DICE.STANDARD = 6;
SHELDEX.DICE.DOUBLE = 12;
SHELDEX.DICE.HARD = 18;
SHELDEX.DICE.RARITY = 24;
SHELDEX.DICE.SUITABLE = 6;
SHELDEX.DICE.WEIGHTED = 6;
SHELDEX.DICE.COMMON = 6;
SHELDEX.DICE.UNCOMMON = 12;
SHELDEX.DICE.RARE = 24;
SHELDEX.DICE.UNIQUE = 48;
SHELDEX.DICE.RAREST = 96;
//#endregion






//#region database
SHELDEX.VARIABLE = {};
SHELDEX.VARIABLE.meta = {isSettings: true, isVariable: true};
SHELDEX.VARIABLE.parameters = MAGPIE.SYS.data
	.parseStructArr(MAGPIE.ShelderEvo.parameters.variables);
SHELDEX.VARIABLE.PLAYER_X = 8;
SHELDEX.VARIABLE.PLAYER_Y = 9;
SHELDEX.VARIABLE.CURRENT_MAP = 10;
SHELDEX.VARIABLE.ACTOR_ID = 11;
SHELDEX.VARIABLE.SCREEN_SIZE_X = 12;
SHELDEX.VARIABLE.SCREEN_SIZE_Y = 13;
SHELDEX.VARIABLE.DEFAULT_BLEND_MODE = 14;
SHELDEX.VARIABLE.DEFAULT_OPACITY = 15;
SHELDEX.VARIABLE.SPRITE_ZOOM = 16;
SHELDEX.VARIABLE.MAGPIE_PIN = 17;
SHELDEX.VARIABLE.MESSAGE_TEXT = 19;
SHELDEX.VARIABLE.PLAYTHROUGHS = 20;
SHELDEX.VARIABLE.RANDOM_LOOT_BAG = 21;
SHELDEX.VARIABLE.PLAYER_DECK = 22;
SHELDEX.VARIABLE.PLAYER_RESERVE = 23;
SHELDEX.VARIABLE.STAMINA_CARDS = 24;
SHELDEX.VARIABLE.PLAYER_WASTE = 25;
SHELDEX.VARIABLE.PLAYER_INJURY = 26;
SHELDEX.VARIABLE.PLAYER_ZONE = 27;
SHELDEX.VARIABLE.CURRENT_CREATURE = 28;
SHELDEX.VARIABLE.PLAYER_QUEUE = 29;
SHELDEX.VARIABLE.PLAYER_STAMINA = 30;
SHELDEX.VARIABLE.RECLAIM = 35;
SHELDEX.VARIABLE.SELECTED_X = 36;
SHELDEX.VARIABLE.SELECTED_Y = 37;
SHELDEX.VARIABLE.PARTY_ID = 38;
SHELDEX.VARIABLE.LAST_ACTOR = 39;
SHELDEX.VARIABLE.ADOPTION = 40;
SHELDEX.VARIABLE.ALIVE_CHARACTERS = 41;
SHELDEX.VARIABLE.DEAD_CHARACTERS = 42;
SHELDEX.VARIABLE.EXTRA_CHARACTERS = 43;
SHELDEX.VARIABLE.LOCATION = 46;
SHELDEX.VARIABLE.FERTILITY = 47;
SHELDEX.VARIABLE.BIOME = 48;
SHELDEX.VARIABLE.TERRITORY = SHELDEX.VARIABLE.parameters.territory || 49;
SHELDEX.VARIABLE.HABITAT = 50;
SHELDEX.VARIABLE.QUEST_LOG = 59;
SHELDEX.VARIABLE.QUEST_PROMPT = 60;
SHELDEX.VARIABLE.TERRITORY_DECK = 61;
SHELDEX.VARIABLE.TERRITORY_DISCARD = 62;
SHELDEX.VARIABLE.CARD_TO_DRAW = 63;
SHELDEX.VARIABLE.LAST_DRAWN_CARD = 64;
SHELDEX.VARIABLE.DRAWN_CARDS = 65;
SHELDEX.VARIABLE.LAST_SUMMON = SHELDEX.VARIABLE.parameters.lastSummon;
SHELDEX.VARIABLE.CHARACTER_ID = SHELDEX.VARIABLE.parameters.characterID;
SHELDEX.VARIABLE.LAST_DISCARD = 68;
SHELDEX.VARIABLE.RECLAIM_AMOUNT = 69;
SHELDEX.VARIABLE.HABITAT_LOOT = 75;
SHELDEX.VARIABLE.CHOICE = 86;
SHELDEX.VARIABLE.FERTILITY_COST = 87;
SHELDEX.VARIABLE.LAST_ITEM_FOUND = 89;
SHELDEX.VARIABLE.LAST_ITEM_USED = 90;
SHELDEX.VARIABLE.CREATURE_STATS = 112;
SHELDEX.VARIABLE.POI = 181;

SHELDEX.SWITCH = {};
SHELDEX.SWITCH.meta = {isSettings: true, isSwitch: true};
SHELDEX.SWITCH.parameters = MAGPIE.SYS.data
	.parseStructArr(MAGPIE.ShelderEvo.parameters.switches);
SHELDEX.SWITCH.CEBUSY = 1;
SHELDEX.SWITCH.GAMEINIT = 4;
SHELDEX.SWITCH.PLAYERLOCK = 5;
SHELDEX.SWITCH.NEWGAME = 7;
SHELDEX.SWITCH.METAURGENCY = 12;
SHELDEX.SWITCH.WIN = 14;
SHELDEX.SWITCH.ABORT= 15;
SHELDEX.SWITCH.LOSE = 16;
SHELDEX.SWITCH.DEATH = 17;
SHELDEX.SWITCH.KO = 18;
SHELDEX.SWITCH.ESCAPE = 19;
SHELDEX.SWITCH.BATTLE_STARTED = 21;
SHELDEX.SWITCH.BATTLE_ENDED = 24;
SHELDEX.SWITCH.CHALLENGING = 25;
SHELDEX.SWITCH.FIRST_TURN = 38;
SHELDEX.SWITCH.DISCARD = 39;
SHELDEX.SWITCH.RECLAIM = 40;
SHELDEX.SWITCH.IS_PARTNER = 41;
SHELDEX.SWITCH.IS_FOLLOWER = 42;
SHELDEX.SWITCH.IS_ALLY = 43;
SHELDEX.SWITCH.IS_FRIEND = 44;
SHELDEX.SWITCH.IS_CONTACT = 45;
SHELDEX.SWITCH.IS_NEUTRAL = 46;
SHELDEX.SWITCH.IS_UNFRIENDLY = 47;
SHELDEX.SWITCH.IS_ENEMY = 48;
SHELDEX.SWITCH.IS_NEMESIS = 49;
SHELDEX.SWITCH.IS_THREAT = 50;
SHELDEX.SWITCH.IS_NPC_CONTACT = 51;
SHELDEX.SWITCH.IS_NPC = 52;
SHELDEX.SWITCH.HABITAT_CHANGE = 53;
SHELDEX.SWITCH.TERRITORY_CHANGE = 54;
SHELDEX.SWITCH.KEEP_MESSAGE = 60;
SHELDEX.SWITCH.A = 61;
SHELDEX.SWITCH.B = 62;
SHELDEX.SWITCH.C = 63;
SHELDEX.SWITCH.D = 64;
SHELDEX.SWITCH.TUTORIAL = 65;
SHELDEX.SWITCH.ENEMY_SPAWN = SHELDEX.SWITCH.parameters.enemySpawn || 66;
SHELDEX.SWITCH.E = 67;
SHELDEX.SWITCH.F = 68;
SHELDEX.SWITCH.G = 69;
SHELDEX.SWITCH.STATE_ICON_HIDE = 82;
SHELDEX.SWITCH.USED_ITEM = 98;
SHELDEX.SWITCH.BOUGHT_ITEM = 99;
SHELDEX.SWITCH.SOLD_ITEM = 100;
SHELDEX.SWITCH.NEW_OFFSPRING = 101;
SHELDEX.SWITCH.CLOCK_DATE = MAGTIME.WINDOW.DATE_SWITCH || 108;
SHELDEX.SWITCH.CLOCK_WEATHER = 109;
SHELDEX.SWITCH.DARK_SCREEN = 110;
SHELDEX.SWITCH.CLOCK_TOD = MAGTIME.WINDOW.PHASE_SWITCH || 111;
SHELDEX.SWITCH.CLOCK_DIGITAL = MAGTIME.WINDOW.DIGITAL_SWITCH || 112;
SHELDEX.SWITCH.ON_MAP = 113;
SHELDEX.SWITCH.MAP_IDLE = 114;
SHELDEX.SWITCH.MAP_MOVE = 115;
SHELDEX.SWITCH.TERRITORY_SELECT = 116;
SHELDEX.SWITCH.TERRITORY_SELECTED = 117;
SHELDEX.SWITCH.PLAYTIME = 118;
SHELDEX.SWITCH.PAUSE_TINT = 119;
SHELDEX.SWITCH.IS_TIME = MAGTIME.IS_TIME || 120;
SHELDEX.SWITCH.SEASONAL = 130;
SHELDEX.SWITCH.DAY_CYCLE = MAGTIME.DAYCYCLE || 133;
SHELDEX.SWITCH.EXTERNAL = 134;

SHELDEX.CE = {};
SHELDEX.CE.meta = {isSettings: true, isCommonEvent: true};
SHELDEX.CE.parameters = MAGPIE.SYS.data
	.parseStructArr(MAGPIE.ShelderEvo.parameters.CE);
SHELDEX.CE.RECLAIM = 31;

SHELDEX.SKILL = {};
SHELDEX.SKILL.PASS = 9;

//#region states
SHELDEX.STATE = {};
SHELDEX.STATE.meta = {isSettings: true};
SHELDEX.STATE.parameters = MAGPIE.SYS.data
	.parseStructArr(MAGPIE.ShelderEvo.parameters.states);
SHELDEX.STATE.IMMORTAL = SHELDEX.STATE.parameters.immortal;
SHELDEX.STATE.TIRED = SHELDEX.STATE.parameters.tired;
SHELDEX.STATE.SLEEPING = SHELDEX.STATE.parameters.sleeping;
SHELDEX.STATE.FATIGUE = SHELDEX.STATE.parameters.fatigue;

SHELDEX.INJURY = {};
SHELDEX.INJURY.meta = {isSettings: true};
SHELDEX.INJURY.parameters = MAGPIE.SYS.data
	.parseStructArr(MAGPIE.ShelderEvo.parameters.injuries);
SHELDEX.INJURY.FAT = SHELDEX.INJURY.parameters.fat;
SHELDEX.INJURY.STIMULANT = SHELDEX.INJURY.parameters.stimulant;
SHELDEX.INJURY.FATIGUE = SHELDEX.INJURY.parameters.fatigue;
SHELDEX.INJURY.HUNGER = SHELDEX.INJURY.parameters.hunger;
SHELDEX.INJURY.THIRST = SHELDEX.INJURY.parameters.thirst;
SHELDEX.INJURY.POISON = SHELDEX.INJURY.parameters.poison;
SHELDEX.INJURY.BLEEDING = SHELDEX.INJURY.parameters.bleeding;
SHELDEX.INJURY.EXERTION = SHELDEX.INJURY.parameters.exertion;
SHELDEX.INJURY.BRUISE = SHELDEX.INJURY.parameters.bruise;
SHELDEX.INJURY.BLEED = SHELDEX.INJURY.parameters.bleed;
SHELDEX.INJURY.LACERATION = SHELDEX.INJURY.parameters.laceration;
SHELDEX.INJURY.FRACTURE = SHELDEX.INJURY.parameters.fracture;
SHELDEX.INJURY.STRAIN = SHELDEX.INJURY.parameters.strain;
SHELDEX.INJURY.INTERNAL = SHELDEX.INJURY.parameters.internal;
SHELDEX.INJURY.SCAR = SHELDEX.INJURY.parameters.scar;
SHELDEX.INJURY.MAIM = SHELDEX.INJURY.parameters.maim;
SHELDEX.INJURY.DISMEMBER = SHELDEX.INJURY.parameters.dismember;
SHELDEX.INJURY.FATAL = SHELDEX.INJURY.parameters.fatal;

SHELDEX.MOVE = {};
SHELDEX.MOVE.ALL = [];
SHELDEX.MOVE.KO = 1;
SHELDEX.MOVE.TIRED = 6;
SHELDEX.MOVE.DEAD = 9;
SHELDEX.MOVE.SLEEPING = 15;
SHELDEX.MOVE.RESTING = 16;
SHELDEX.MOVE.WALKING = 34;
SHELDEX.MOVE.SNEAKING = 39;
SHELDEX.MOVE.TROTTING = 46;
SHELDEX.MOVE.RUNNING = 47;
SHELDEX.MOVE.SPRINTING = 48;
SHELDEX.MOVE.SEARCHING = 49;
SHELDEX.MOVE.BROWSING = 50;
SHELDEX.MOVE.DIGGING = 62;
SHELDEX.MOVE.STARTLED = 129;

/**
 * @property {Number} ENCOURAGED 51
 * @property {Number} AGGRAVATED 52
 * @property {Number} SATISFIED 53
 * @property {Number} STRESSED 54
 * @property {Number} DISCOURAGED 55
 * @property {Number} RELIEVED 56
 * 
 */
SHELDEX.MORALE = {};
SHELDEX.MORALE.ENCOURAGED = Number(JSON
	.parse(MAGPIE.ShelderEvo.parameters.morale).encouraged) || 51;
SHELDEX.MORALE.AGGRAVATED = Number(JSON
	.parse(MAGPIE.ShelderEvo.parameters.morale).aggravated) || 52;
SHELDEX.MORALE.SATISFIED = Number(JSON
	.parse(MAGPIE.ShelderEvo.parameters.morale).satisfied) || 53;
SHELDEX.MORALE.STRESSED = Number(JSON
	.parse(MAGPIE.ShelderEvo.parameters.morale).stressed) || 54;
SHELDEX.MORALE.DISCOURAGED = Number(JSON
	.parse(MAGPIE.ShelderEvo.parameters.morale).discouraged) || 55;
SHELDEX.MORALE.RELIEVED = Number(JSON
	.parse(MAGPIE.ShelderEvo.parameters.morale).relieved) || 56;


MAGPIE.CODE.POSTURE = MAGPIE.SYS.data.parseStructObj(MAGPIE.ShelderEvo.parameters.postures);
SHELDEX.POSTURE = {};
SHELDEX.POSTURE.ALL = Object.values(MAGPIE.CODE.POSTURE);
SHELDEX.POSTURE.PROTECTIVE = MAGPIE.CODE.POSTURE.protective;
SHELDEX.POSTURE.PREY = MAGPIE.CODE.POSTURE.prey;
SHELDEX.POSTURE.EVASIVE = MAGPIE.CODE.POSTURE.evasive;
SHELDEX.POSTURE.AGGRESSIVE = MAGPIE.CODE.POSTURE.aggressive;
SHELDEX.POSTURE.PREDATOR = MAGPIE.CODE.POSTURE.predator;
SHELDEX.POSTURE.NEUTRAL = MAGPIE.CODE.POSTURE.neutral;
SHELDEX.POSTURE.ALERT = MAGPIE.CODE.POSTURE.alert;
SHELDEX.POSTURE.GROGGY = MAGPIE.CODE.POSTURE.groggy;
SHELDEX.POSTURE.DROWSY = MAGPIE.CODE.POSTURE.drowsy;

SHELDEX.STATE.RESOURCE = {};
SHELDEX.STATE.RESOURCE.MASS = 71;
SHELDEX.STATE.RESOURCE.AGGRO = 72;
SHELDEX.STATE.RESOURCE.DEX = 73;
SHELDEX.STATE.RESOURCE.SEN = 74;
SHELDEX.STATE.RESOURCE.STA = 75;
SHELDEX.STATE.RESOURCE.STA_STATES = [75,77,78];
SHELDEX.STATE.RESOURCE.STA_MID = 77;
SHELDEX.STATE.RESOURCE.STA_LOW = 78;
SHELDEX.STATE.RESOURCE.NRG = 76;
SHELDEX.STATE.RESOURCE.NRG_STATES = [76,79,80,81,82];
SHELDEX.STATE.RESOURCE.NRG_HIGH = 79;
SHELDEX.STATE.RESOURCE.NRG_MID = 80;
SHELDEX.STATE.RESOURCE.NRG_LOW = 81;
SHELDEX.STATE.RESOURCE.NRG_NONE = 82;
SHELDEX.STATE.RESOURCE.ALL = [
SHELDEX.STATE.RESOURCE.MASS,
	SHELDEX.STATE.RESOURCE.AGGRO,
	SHELDEX.STATE.RESOURCE.DEX,
	SHELDEX.STATE.RESOURCE.SEN,
	...SHELDEX.STATE.RESOURCE.STA_STATES,
	...SHELDEX.STATE.RESOURCE.NRG_STATES
];

SHELDEX.MOOD = {};
SHELDEX.MOOD.BORED = 40;
SHELDEX.MOOD.CONFIDENT = 41;
SHELDEX.MOOD.JOYFUL = 42;
SHELDEX.MOOD.ANGRY = 43;
SHELDEX.MOOD.SCARED = 44;
SHELDEX.MOOD.SAD = 45;

//#endregion

SHELDEX.GROWTH = {};
SHELDEX.GROWTH.meta = {isSettings: true, isGrowth: true};
SHELDEX.GROWTH.INFANT = 2;
SHELDEX.GROWTH.JUVENILE = 3;
SHELDEX.GROWTH.ADOLESCENT = 4;
SHELDEX.GROWTH.ADULT = 5;
SHELDEX.GROWTH.ELDER = 6;
SHELDEX.GROWTH.LEVEL_JUVENILE = 10;
SHELDEX.GROWTH.LEVEL_ADOLESCENT = 60;
SHELDEX.GROWTH.LEVEL_ADULT = 100;
SHELDEX.GROWTH.LEVEL_ELDER = 150;

SHELDEX.EQUIP = {};
SHELDEX.EQUIP.meta = {isSettings: true, isEquip: true};
SHELDEX.EQUIP.SLOT = {};
SHELDEX.EQUIP.SLOT.TOOL = 1;
SHELDEX.EQUIP.SLOT.PHYSIQUE = 2;
SHELDEX.EQUIP.SLOT.GROWTH = 3;
SHELDEX.EQUIP.SLOT.HEAD = 4;
SHELDEX.EQUIP.SLOT.CHEST = 5;
SHELDEX.EQUIP.SLOT.ARMS = 6;
SHELDEX.EQUIP.SLOT.HIPS = 7;
SHELDEX.EQUIP.SLOT.LEGS = 8;
SHELDEX.EQUIP.SLOT.MUTATION_1 = 9;
SHELDEX.EQUIP.SLOT.MUTATION_2 = 10;
SHELDEX.EQUIP.SLOT.MUTATION_3 = 11;
SHELDEX.EQUIP.SLOT.RESOURCE = 12;
SHELDEX.EQUIP.SLOT.EQUIPMENT = 13;
SHELDEX.EQUIP.SLOT.CARRY = 14;
SHELDEX.EQUIP.SLOT.MOUNT = 15;

/**
 * {@link MAGPIE.ShelderEvo.BATTLECORE.meta}
 */
SHELDEX.ELEMENT = {};
SHELDEX.ELEMENT.meta = {isDamage: true};
SHELDEX.ELEMENT.BLUNT = 1;
SHELDEX.INJURY.Blunt = [
	SHELDEX.INJURY.BRUISE, SHELDEX.INJURY.FRACTURE, SHELDEX.INJURY.INTERNAL];
SHELDEX.ELEMENT.SHARP = 2;
SHELDEX.INJURY.Sharp = [
	SHELDEX.INJURY.LACERATION, SHELDEX.INJURY.SCAR, SHELDEX.INJURY.DISMEMBER];
SHELDEX.ELEMENT.PIERCE = 3;
SHELDEX.INJURY.Pierce = [
	SHELDEX.INJURY.LACERATION, SHELDEX.INJURY.INTERNAL, SHELDEX.INJURY.MAIM
]
SHELDEX.ELEMENT.SHOCK = 4;
SHELDEX.INJURY.Shock = [
	SHELDEX.INJURY.BRUISE, SHELDEX.INJURY.INTERNAL, SHELDEX.INJURY.DISMEMBER
]
SHELDEX.ELEMENT.BURN = 5;
SHELDEX.INJURY.Burn = [
	SHELDEX.INJURY.BRUISE, SHELDEX.INJURY.SCAR, SHELDEX.INJURY.MAIM
]
SHELDEX.ELEMENT.FREEZE = 6;
SHELDEX.INJURY.Freeze = [
	SHELDEX.INJURY.BRUISE, SHELDEX.INJURY.SCAR, SHELDEX.INJURY.MAIM
]
SHELDEX.ELEMENT.GRAVITY = 7;
SHELDEX.INJURY.Gravity = [
	SHELDEX.INJURY.BRUISE, SHELDEX.INJURY.INTERNAL, SHELDEX.INJURY.MAIM
]
SHELDEX.ELEMENT.CHEMICAL = 8;
SHELDEX.INJURY.Chemical = [
	SHELDEX.INJURY.EXERTION, SHELDEX.INJURY.POISON, SHELDEX.INJURY.INTERNAL
]
SHELDEX.ELEMENT.BIOLOGICAL = 9;
SHELDEX.INJURY.Biological = [
	SHELDEX.INJURY.FATIGUE, SHELDEX.INJURY.DISEASE, SHELDEX.INJURY.POISON
]
SHELDEX.ELEMENT.RADIOACTIVE = 10;
SHELDEX.INJURY.Radioactive = [
	SHELDEX.INJURY.POISON, SHELDEX.INJURY.SCAR, SHELDEX.INJURY.INTERNAL
]

SHELDEX.ICONS = {};
SHELDEX.ICONS.CLASS = [null, 251, 251, 251, 251];
//#endregion





//#region system

SHELDEX.BALLOON = {};
SHELDEX.BALLOON.EXCLAMATION = 1;
SHELDEX.BALLOON.QUESTION = 2;
SHELDEX.BALLOON.MUSIC = 3;
SHELDEX.BALLOON.HEART = 4;
SHELDEX.BALLOON.CROSSED = 5;
SHELDEX.BALLOON.DROP = 6;
SHELDEX.BALLOON.FRUSTRATION = 7;
SHELDEX.BALLOON.SPEECH = 8;
SHELDEX.BALLOON.BULB = 9;
SHELDEX.BALLOON.SLEEP = 10;
SHELDEX.BALLOON.BLOCK = 11;
SHELDEX.BALLOON.IMPACT = 12;
SHELDEX.BALLOON.MOVE = 13;
SHELDEX.BALLOON.EMOTE = 14;
SHELDEX.BALLOON.REST = 15;


//#endregion






//#region meta-event
SHELDEX.EVENT = {};
SHELDEX.EVENT.POI = 0;
SHELDEX.EVENT.POI_GENERIC = 1;

SHELDEX.META = {};
SHELDEX.META.EVENT = [];
SHELDEX.META.SCALE = {};
//#endregion





//#region geography

SHELDEX.GEO = {};
SHELDEX.GEO.STAR = MAGPIE.PDL?.GEOGRAPHY?.STAR;
SHELDEX.GEO.PLANET = MAGPIE.PDL?.GEOGRAPHY?.PLANET;
SHELDEX.GEO.ASTEROID = MAGPIE.PDL?.GEOGRAPHY?.ASTEROID;
SHELDEX.GEO.MOON = MAGPIE.PDL?.GEOGRAPHY?.MOON;

SHELDEX.GEO.BIOME = {};

//#endregion





//#region history

SHELDEX.GEO.SCALE = {};
SHELDEX.GEO.SCALE.EON = MAGTIME?.HISTORY.SCALE.EON;
SHELDEX.GEO.SCALE.ERA = MAGTIME?.HISTORY.SCALE.ERA;
SHELDEX.GEO.SCALE.PERIOD = MAGTIME?.HISTORY.SCALE.PERIOD;
SHELDEX.GEO.SCALE.EPOCH = MAGTIME?.HISTORY.SCALE.EPOCH;
SHELDEX.GEO.SCALE.AGE = MAGTIME?.HISTORY.SCALE.AGE;
SHELDEX.GEO.SCALE.SUB_AGE = MAGTIME?.HISTORY.SCALE.SUB_AGE;


//#endregion


//#endregion
//------------------------------------------------------------------------










//------------------------------------------------------------------------
//#region SYSTEM
var $ShelderEvo = null;

MAGPIE.ShelderEvo._DataManager_createSave = DataManager.createGameObjects;
DataManager.createGameObjects = function()
{
	MAGPIE.ShelderEvo._DataManager_createSave.call(this);
}

MAGPIE.ShelderEvo._DataManager_makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function()
{
	const contents = MAGPIE.ShelderEvo._DataManager_makeSave.call(this);
	contents.ShelderEvo = $ShelderEvo;
	return contents
}

MAGPIE.ShelderEvo._DataManager_loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents)
{
	MAGPIE.ShelderEvo._DataManager_loadSave.call(this, contents);
	$ShelderEvo = contents.ShelderEvo;
}

MAGPIE.ShelderEvo._Game_System_Initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function()
{
	MAGPIE.ShelderEvo._Game_System_Initialize.call(this);
	$ShelderEvo = new HIMS_Game("Shelder Evolution");
	$ShelderEvo.systemInit();
}

//------------------------------------------------------------------------
//#region Casper

MAGPIE.ShelderEvo.Casper = {};
MAGPIE.ShelderEvo.Casper.parameters = "cgmz_";
MAGPIE.ShelderEvo.Casper.GameInfo = {};
MAGPIE.ShelderEvo.Casper.GameInfo.parameters = "gameinfo";
MAGPIE.ShelderEvo.Casper.GameInfo.version = "Left Text";
MAGPIE.ShelderEvo.Casper.GameInfo.isInit = true;

//#endregion






//#region sub-systems

MAGPIE.ShelderEvo._HIMS_Game_settings = HIMS_Game.prototype.settings;
HIMS_Game.prototype.settings = function()
{
	let status = false;
	console.info("Settings...");
	let Cgmz_gameinfo = MAGPIE.ShelderEvo.Casper.GameInfo.isInit;
	let systems = [
		this.consoleGO("MAGPIE", true), 
		this.consoleGO("HIMS", true), 
		this.consoleGO("ShelderEvo", true),
		this.consoleGO("Cgmz_gameinfo", Cgmz_gameinfo)
	];
	status = this.systemsCheck(systems);
	return MAGPIE.ShelderEvo._HIMS_Game_settings.call(this, status)
}

MAGPIE.ShelderEvo.Casper.GameInfo._createForeground = Scene_Title
	.prototype.createForeground;
Scene_Title.prototype.createForeground = function()
{
	CGMZ.GameInfo.LeftText = MAGPIE.ShelderEvo.firmware;
	MAGPIE.ShelderEvo.Casper.GameInfo._createForeground.call(this);
}

MAGPIE.ShelderEvo._HIMS_Game_data = HIMS_Game.prototype.data;
HIMS_Game.prototype.data = function()
{
	let status = false;
	console.info("Data...");
	let systems = [
		this.consoleGO("File system", true),
		this.consoleGO("Autosave", false),
		this.consoleGO("Import", false),
		this.consoleGO("Export", false),
		this.consoleGO("Characters", SHELDEX?.CHARACTER?.DATA?.isInit || false),
		this.consoleGO("SHELGEO", SHELDEX?.GEO?.DATA?.isInit || false),
		this.consoleGO("SHELSTORY", SHELDEX?.STORY?.DATA?.isInit || false),
		this.consoleGO("Quests", false),
	]
	status = this.systemsCheck(systems);
	return MAGPIE.ShelderEvo._HIMS_Game_data.call(this, status)
}
MAGPIE.ShelderEvo._HIMS_Game_systems = HIMS_Game.prototype.systems;
HIMS_Game.prototype.systems = function()
{
	let status = false;
	console.info("Systems...");
	$ShelderEvo.CONSOLE = new HIMS_Console();
	let systems = [
		this.consoleGO("Core", $MAGPIE?.CORE?.isInit || false),
		this.consoleGO("Ark", $MAGPIE?.ARK?.isInit || false),
		this.consoleGO("Console", $ShelderEvo.CONSOLE?._initialized || false),
		this.consoleGO("Calendar", MAGTIME?.isInit || false),
		this.consoleGO("Geography", MAGPIE?.PDL?.GEOGRAPHY?.isInit || false),
		this.consoleGO("History", MAGPIE?.addons?.History?.isInit || false),
		this.consoleGO("PDL", this.PDL()),
		this.consoleGO("CBE", this.CBE()),
		this.consoleGO("BATTLECORE", this.battlecore()),
		this.consoleGO("METACORE", this.metacore()),
		this.consoleGO("Intelligence", this.intelligence())
	];
	console.info("...");
	status = this.systemsCheck(systems);
	return MAGPIE.ShelderEvo._HIMS_Game_systems.call(this, status)
}
MAGPIE.ShelderEvo._HIMS_Game_UI = HIMS_Game.prototype.UI;
HIMS_Game.prototype.UI = function()
{
	let status = false;
	console.info("UI...");
	let systems = [
		this.consoleGO("Clock", true),
		this.consoleGO("Console", false),
		this.consoleGO("HUD", false),
		this.consoleGO("Menu", false),
		this.consoleGO("Art", false)
	]
	status = this.systemsCheck(systems);
	return MAGPIE.ShelderEvo._HIMS_Game_UI.call(this, status)
}

HIMS_Game.prototype.PDL = function()
{
	let status = false;
	console.info("PDL...");
	let database = $PDL.constructor.name === "MAGPIE_PDL";
	let systems = [
		this.consoleGO("MAGPIE_PDL", $PDL?.isInit),
		this.consoleGO("PDL_Database", database)
	]
	status = this.systemsCheck(systems);
	return status
}

HIMS_Game.prototype.CBE = function()
{
	let status = false;
	console.info("CBE...");
	let systems = [
		this.consoleGO("MAGPIE_CBE", $CBE?.isInit),
		this.consoleGO("Dice", MAGPIE?.CBE?.DICE?.meta?.isWorking),
		this.consoleGO("Eventing", MAGPIE?.CBE?.EVENT?.meta?.isWorking),
		this.consoleGO("Fate", MAGPIE.CBE?.FATE?.meta?.isWorking),
		this.consoleGO("Quest", MAGPIE?.CBE?.QUEST?.meta?.isWorking),
	]
	status = this.systemsCheck(systems);
	return status
}

HIMS_Game.prototype.battlecore = function()
{
	let status = false;
	console.info("Battlecore...");
	let systems = [
		this.consoleGO("Actor equip", false),
		this.consoleGO("Actor inventory", false),
		this.consoleGO("Actor traits", true),
		this.consoleGO("Battle processing", true),
		this.consoleGO("Background characters", false),
		this.consoleGO("Instinct", false),
		this.consoleGO("EXP", false),
		this.consoleGO("Archetype", false),
		this.consoleGO("Elements", true),
		this.consoleGO("Injuries", true),
		this.consoleGO("Metabolism", false),
		this.consoleGO("Movement", false),
		this.consoleGO("Sensing", false),
		this.consoleGO("Emoting", false),
		this.consoleGO("Breeding", false)
	];
	status = this.systemsCheck(systems);
	return status
}

HIMS_Game.prototype.metacore = function()
{
	let status = false;
	console.info("Metacore...");
	let systems = [
		this.consoleGO("Adoption list", false),
		this.consoleGO("Adoption script", true),
		this.consoleGO("NewDay reset", false),
		this.consoleGO("Growth", false),
		this.consoleGO("Breeding", false),
		this.consoleGO("Background players", false)
	];
	status = this.systemsCheck(systems);
	return status
}

HIMS_Game.prototype.intelligence = function()
{
	let status = false;
	console.info("Intelligence...");
	let systems = [
		this.consoleGO("State integration", MAGEXP.STATE.meta.isWorking),
		this.consoleGO("Traits integration", MAGEXP.TRAIT.meta.isWorking),
		this.consoleGO("EXP integration", MAGEXP.EXP.meta.isWorking),
		this.consoleGO("Emote integration", MAGEXP.EMOTE.meta.isWorking),
		this.consoleGO("Memory", MAGEXP.MEMORY.meta.isWorking),
		this.consoleGO("Concept", MAGEXP.CONCEPT.meta.isWorking),
		this.consoleGO("Expression", MAGEXP.EXPRESSION.meta.isWorking)
	];
	status = this.systemsCheck(systems);
	return status
}

//#endregion







//------------------------------------------------------------------------
//#region saveData



//#endregion






//#endregion
//------------------------------------------------------------------------











//------------------------------------------------------------------------
//#region PDL





//------------------------------------------------------------------------
//#region DATA

MAGPIE.ShelderEvo._PDL_Data_initialize = PDL_Data.prototype.initialize;
PDL_Data.prototype.initialize = function()
{
	MAGPIE.ShelderEvo._PDL_Data_initialize.call(this);
	this.species = this.getData($dataSkills, "species");
	this.habitats = this.getData($dataSkills, "habitat");
	this.HabitatStates = this.getData($dataStates, "habitat");
	this.Resources = this.getData($dataItems, "resource");
}

PDL_Data.prototype.getData = function(array, tag)
{
	return array.filter(e => e != null && e.meta.hasOwnProperty(tag))
}



//#endregion






//------------------------------------------------------------------------
//#region ACTOR



Game_Actor.prototype.creature = function()
{
	if(!this?._creatureID) return false
	return $PDL.creature.getElementByID(this._creatureID)
}

function PDL_Actor()
{
	this.initialize(...arguments);
}
PDL_Actor.prototype = Object.create(MAGPIE_PDL.prototype);
PDL_Actor.prototype.constructor = PDL_Actor;
PDL_Actor.prototype.initialize = function()
{
	MAGPIE_PDL.prototype.initialize.call(this);
}

PDL_Actor.prototype.changeEquip = function(actorID, slotId, armorId)
{
	$gameParty.gainItem($dataArmors[armorId], 1);
	$gameActors.actor(actorID).forceChangeEquip(slotId, $dataArmors[armorId]);
}

PDL_Actor.prototype.releaseEquip = function(actorID, slotId)
{
	let actor = $gameActors.actor(actorID);
	let armorId = actor._equips[slotId]._itemId;
	$gameParty.gainItem($dataArmors[armorId]);
	return armorId
}

PDL_Actor.prototype.login = function(actorID, password)
{
	//
}

// PDL_Actor.prototype.registration = function()
// {
// 	const playerID = $gameParty.leader()._actorId;
// 	const playerName = $gameParty.leader()._name;
// 	$PDL.player.add()
// }

HIMS_Game.prototype.registration = function()
{
	const actorID = $gameParty.leader()._actorId;
	SceneManager.push(Scene_Name);
	SceneManager.prepareNextScene(actorID, 12);
}
//#endregion






//------------------------------------------------------------------------
//#region CREATURE
SHELDEX.CREATURE = {};
SHELDEX.CREATURE.SEX = {};
SHELDEX.CREATURE.SEX.MALE = MAGPIE.PDL.CREATURE.SEX.MALE;
SHELDEX.CREATURE.SEX.FEMALE = MAGPIE.PDL.CREATURE.SEX.FEMALE;
SHELDEX.CREATURE.SEX.INTERSEX = MAGPIE.PDL.CREATURE.SEX.INTERSEX;
SHELDEX.CREATURE.SEX.UNDEFINED = MAGPIE.PDL.CREATURE.SEX.UNDEFINED;

SHELDEX.CREATURE.TYPE = {};
SHELDEX.CREATURE.TYPE.DISPOSABLE = -1;
SHELDEX.CREATURE.TYPE.PLAYER = 0
SHELDEX.CREATURE.TYPE.DIGIMIND = 1;
SHELDEX.CREATURE.TYPE.FREE = 2;
SHELDEX.CREATURE.TYPE.WILD = 3;
SHELDEX.CREATURE.TYPE.ADOPTABLE = 4;

SHELDEX.CREATURE.ATYPE = {}
SHELDEX.CREATURE.ATYPE.DISPOSABLE = -1;
SHELDEX.CREATURE.ATYPE.PROTAGONIST = 0;
SHELDEX.CREATURE.ATYPE.ANTAGONIST = 1;
SHELDEX.CREATURE.ATYPE.SUPPORT = 2;
SHELDEX.CREATURE.ATYPE.EXTRA = 3;


function PDL_Creature()
{
	this.initialize(...arguments);
}
PDL_Creature.prototype = Object.create(MAGPIE_PDL.prototype);
PDL_Creature.prototype.constructor = PDL_Creature;
PDL_Creature.prototype.initialize = function()
{
	MAGPIE_PDL.prototype.initialize.call(this);
}

//------------------------------------------------------------------------
//#region init
MAGPIE.ShelderEvo._PDL_Creature_setup = Game_Creature.prototype.setup;
Game_Creature.prototype.setup = function()
{
	MAGPIE.ShelderEvo._PDL_Creature_setup.call(this);
	if(!this?.sex) this.sex = $PDL.CREATURE.sex();
	let traits = this.traits();
	traits.forEach(trait => this._traits.push(trait.id));
	$PDL.CREATURE.mutations(this);
	$PDL.CREATURE.initGrowth(this);
	this._perks = this.perks();
	this._params = this.params();
	this._params[10] = this.diet();
}

Game_Creature.prototype.setupTraits = function()
{
	this._perks = this.perks();
	this._params = this.params();
	this._params[10] = this.diet();
}

PDL_Creature.prototype.sex = function()
{
	let sex = SHELDEX.CREATURE.SEX.UNDEFINED;
	let male = SHELDEX.CREATURE.SEX.MALE;
	let female = SHELDEX.CREATURE.SEX.FEMALE;
	let intersex = SHELDEX.CREATURE.SEX.INTERSEX
	if($CBE.DICE.Dx(100)) return sex = intersex
	$CBE.DICE.Dx(2) ? sex = male : sex = female;
	return sex
}

Game_Creature.prototype.actor = function()
{
	return $gameActors.actor(this._isActor)
}

Game_Creature.prototype.battler = function()
{
	return BattleManager.allBattleMembers()
		.find(member => member?._creatureID === this.ID)
}

Game_Battler.prototype.creature = function()
{
	return $PDL.creature.getElementByID(this?._creatureID)
}

Game_Battler.prototype.skillCard = function()
{
	return $dataSkills[this?._speciesID]
}

Game_Battler.prototype.species = function()
{
	return $PDL.species.getElementByID(this?._speciesID)
}

Game_Creature.prototype.params = function()
{
	let params = [0,0,0,0,0,0,0,0,null,null,0];
	this._traits
		.forEach(id => $dataArmors[id].params
			.filter(param => param != null)
			.forEach((p, index) => params[index] += p));
	return params
}

Game_Creature.prototype.diet = function()
{
	let params = this._params;
	return params[1] * (params[3] + params[2] + params[4] + params[5])
}

Game_Creature.prototype.traits = function()
{
	let physique = this.physique().meta.physique;
	let traits = $dataArmors
		.filter(e => e != null && e.meta?.physique === physique);
	traits.push($dataArmors
		.find(e => e != null && e.id === this.growthStage()));
	return traits
}

PDL_Creature.prototype.mutations = function(creature)
{
	//
}

Game_Creature.prototype.perks = function()
{
	results = [];
	this._traits.forEach(id => {
		let perks = eval($dataArmors[id].meta?.Ptraits);
		if(perks?.length > 0) perks.forEach(p => results.push(p));
	})
	return results
}

PDL_Creature.prototype.initGrowth = function(creature)
{
	if(creature._level < 0) creature._level = $CBE.DICE.dice(150);
}

Game_Creature.prototype.evo = function()
{
	return Number(this.species().skillCard()?.meta?.evo)
}

Game_Creature.prototype.growth = function()
{
	return this._level * this.evo()
}

Game_Creature.prototype.growthStage = function()
{
	if(this._level < SHELDEX.GROWTH.LEVEL_JUVENILE) 
		return SHELDEX.GROWTH.INFANT
	if(this._level < SHELDEX.GROWTH.LEVEL_ADOLESCENT) 
		return SHELDEX.GROWTH.JUVENILE
	if(this._level < SHELDEX.GROWTH.LEVEL_ADULT) 
		return SHELDEX.GROWTH.ADOLESCENT
	if(this._level < SHELDEX.GROWTH.LEVEL_ELDER) 
		return SHELDEX.GROWTH.ADULT
	return SHELDEX.GROWTH.ELDER
}

Game_Creature.prototype.changeState = function(states, stateId)
{
	states.remove(stateId);
	states.forEach(id => this.removeState(id))
}

PDL_Creature.prototype.growthStage = function(creature)
{
	let growth = creature.growthStage();
	if(creature._traits.find(id => id === growth)) return false
	let trait = creature._traits.find(id => $dataArmors[id].meta?.growth);
	creature._traits.remove(trait);
	creature._traits.push(growth);
	return growth
}

PDL_Creature.prototype.growth = function(creature)
{
	if(!creature.isActor) return
	let growth = !this.growthStage(creature);
	if(!growth) return
	let actorID = creature.isActor;
	$PDL.ACTOR.changeEquip(actorID, SHELDEX.EQUIP.SLOT.GROWTH, growth);
}

Game_Creature.prototype.generateParams = function()
{
	if(this.isActor) return
	let skillcard = this.skillCard();
	let params = {};
	params.mass = eval(skillcard.meta.mass);
	params.aggro = eval(skillcard.meta.aggro);
	params.dex = eval(skillcard.meta.dex);
	params.sen = eval(skillcard.meta.sen);
	params.sta = eval(skillcard.meta.sta);
	this._mass = $CBE.DICE.d6in3(params.mass);
	this._aggro = $CBE.DICE.d6in3(params.aggro);
	this._dex = $CBE.DICE.d6in3(params.dex);
	this._sen = $CBE.DICE.d6in3(params.sen);
	this._sta = params.sta;
	let hpBump = Math.max(this._traits.length, 1);
	let paramBump = (this._aggro + this._dex + this._sen);
	let hpExtra = Math.min(25, Math.floor(Math.random() * 10) * paramBump);
	this._mhp = Math.min(hpBump + hpExtra, SHELDEX.CARD.MAX_DECK_SIZE);
}

//#endregion



function Creature_Data(
	ID = -1, 
	nickname = "", 
	speciesID = -1, 
	isActor = false, 
	level = -1, 
	type = -1, 
	sex = "", 
	breedID = "", 
	firstName = "", 
	lastName = "",
	traits = [], 
	exp = [], 
	aType = -1, 
	birthday = -1
)
{
	this.ID = ID;
	this._isActor = isActor;
	this.nickname = nickname;
	this.speciesID = speciesID;
	this._level = level;
	this._type = type;
	this.breedID = breedID;
	this.sex = sex;
	this.firstName = firstName;
	this.lastName = lastName;
	this._traits = traits;
	this._birthday = birthday;
	this._exp = exp;
	this._aType = aType;
}

//------------------------------------------------------------------------
//#region generation
HIMS_Game.prototype.initCharacter = function(data)
{
	let creature = $PDL.creature
		.add(new Game_Creature(data));
	return creature
}
//#endregion





//#region spawn
HIMS_Game.prototype.summon = function(data)
{
	let creature = $PDL.creature.getElementByID(data?.creatureID);
	if(!creature) creature = $PDL.creature
		.add(new Game_Creature(data));
	creature.spawn();
}

Game_Creature.prototype.spawn = function()
{
	let spawnStates = this._states || [];
	spawnStates.push(...SHELDEX.STATE.RESOURCE.ALL);
	if(!this?._deck) this.initDeck();
	let nextEnemy = $gameTroop.aliveMembers().length;
	let enemyID = this.enemyID();
	let newSpawn = $gameTroop.members()[nextEnemy];
	newSpawn.appear();
	newSpawn.gainHp(1);
	newSpawn.transform(enemyID);
	newSpawn._name = this.species().name();
	$gameTroop.makeUniqueNames();
	newSpawn._creatureID = this.ID;
	newSpawn._speciesID = this.speciesID;
	newSpawn._sex = this.sex;
	let params = this._params;
	// newSpawn.setupClass();
	// newSpawn.changeExp(this._growth);
	newSpawn.addParam(1, params[1]);
	newSpawn.addParam(2, params[2]);
	newSpawn.addParam(3, params[3]);
	newSpawn.addParam(4, params[4]);
	newSpawn.addParam(5, params[5]);
	newSpawn.addParam(0, params[0] - 1);
	newSpawn.addParam(10, params[10]);
	newSpawn.recoverAll();
	newSpawn.setTp(this._NRG);
	if(newSpawn.tpRate() < 0.2) spawnStates.push(SHELDEX.INJURY.HUNGER);
	for(let i = 0; i < spawnStates.length; i++)
	{
		newSpawn.addState(spawnStates[i]);
	};
	newSpawn.addState(SHELDEX.STATE.IMMORTAL);
	newSpawn._habitat = this._habitat || undefined;
	if(newSpawn._habitat) newSpawn.addState(newSpawn.habitatState());
	this._gameday = $gameVariables.value(TIME.gameday);
	$ShelderEvo.updateResourceStates(newSpawn)
	this._isSpawned = true;
	return true
}

Game_Creature.prototype.states = function()
{
	if(this.battler()) return this.battler()._states;
	return this._states;
}

Game_Creature.prototype.initDeck = function()
{
	//setup deck with similar function to the adoption setup
	//return array of Game_Card 
}

//#endregion






//------------------------------------------------------------------------
//#region Adoption



function HIMS_Adoption()
{
	this.initialize(...arguments);
}
HIMS_Adoption.prototype = Object.create(HIMS_GameSystem.prototype);
HIMS_Adoption.prototype.constructor = HIMS_Adoption;
HIMS_Adoption.prototype.initialize = function()
{
	HIMS_GameSystem.prototype.initialize.call(this);
	this.meta = MAGPIE.ShelderEvo.meta;
	this._name = "ShelderEvo_Adoption_System";
	this.ID = this.generateID();
}

// HIMS_Adoption.prototype.loadSettings = function()
// {
// 	console.log(`${this.name()} loaded.`)
// }

//------------------------------------------------------------------------
//#region scene
function Scene_Adoption()
{
	this.initialize(...arguments);
}

Scene_Adoption.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Adoption.prototype.constructor = Scene_Adoption;
Scene_Adoption.prototype.initialize = function()
{
	Scene_MenuBase.prototype.initialize.call(this);
}

Scene_Adoption.prototype.prepare = function(list)
{
	this._species = list;
}

Scene_Adoption.prototype.create = function()
{
	Scene_MenuBase.prototype.create.call(this);
	this.createHelpWindow();
	this.createEVPWindow();
	this.createSpeciesWindow();
	this.createCreaturesWindow();
	this.createAdopteeWindow();
	this.createAdoptionWindow();
}

Scene_Adoption.prototype.createEVPWindow = function()
{
	const rect = this.EVPWindowRect();
	this._EVPWindow = new Window_Gold(rect);
	this.addWindow(this._EVPWindow);
}

Scene_Adoption.prototype.EVPWindowRect = function()
{
	const ww = this.mainCommandWidth();
	const wh = this.calcWindowHeight(1, true);
	const wx = Graphics.boxWidth - ww;
	const wy = this.mainAreaTop();
	return new Rectangle(wx, wy, ww, wh)
}

Scene_Adoption.prototype.createSpeciesWindow = function()
{
	const rect = this.speciesWindowRect();
	this._speciesWindow = new Window_AdoptionSpecies(rect);
	this._speciesWindow.y = this.mainAreaTop();
	this._speciesWindow.setupSpecies(this._species);
	this._speciesWindow.setHandler("ok", this.onSpeciesOk.bind(this));
	this._speciesWindow.setHandler("cancel", this.onSpeciesCancel.bind(this));
	this.addWindow(this._speciesWindow);
}

//#endregion




//------------------------------------------------------------------------
//#region windows
function Window_EVP()
{
	this.initialize(...arguments);
}

Window_EVP.prototype = Object.create(Window_Selectable.prototype);
Window_EVP.prototype.constructor = Window_EVP;
Window_EVP.prototype.initialize = function(rect)
{
	Window_Selectable.prototype.initialize.call(this, rect);
	this.refresh();
}

Window_EVP.prototype
//#endregion





//------------------------------------------------------------------------
//#region adopt


HIMS_Adoption.prototype.adopt = function(creatureID = -1)
{
	if(creatureID < 0) return false
	let creature = $PDL.creature.getElementByID(creatureID);
	if(!creature) return false
	let playerID = 3;
	creature._isActor = playerID;
	creature._isAdopted = true;
	let adopteeID = this.ADOPTION.setupActor(creature.ID);
	this.ADOPTION.setupParty(adopteeID);
	creature.getLocation();
	SceneManager.push(Scene_Name);
	SceneManager.prepareNextScene(adopteeID, 12);
}

Game_Creature.prototype.getLocation = function()
{
	const territory = $PDL.territory.getElementByID(this._location[0]);
	const mapData = territory.toVariable();
	mapData.location_x = this._location[1];
	mapData.location_y = this._location[2];
	return mapData
}

Game_Territory.prototype.toVariable = function()
{
	const map_Id = this.region()._mapID;
	const map_x = this._coords[0];
	const map_y = this._coords[1];
	$gameVariables.setValue(SHELDEX.VARIABLE.CURRENT_MAP, map_Id);
	$gameVariables.setValue(SHELDEX.VARIABLE.PLAYER_X, map_x);
	$gameVariables.setValue(SHELDEX.VARIABLE.PLAYER_Y, map_y);
	return {region: map_Id, territory_x: map_x, territory_y: map_y}
}

HIMS_Adoption.prototype.speciesAdopt = function(speciesID = -1)
{
	if(speciesID < 0 || isNaN(speciesID)) return
	const creature = $ShelderEvo.initCharacter({
		speciesID: speciesID,
		level: 0,
		type: SHELDEX.CREATURE.TYPE.PLAYER,
		birthday: $TIME.gameday,
		location: [10,157,168]
	})
	const creatureID = $PDL.creature.add(creature).ID;
	this.adopt(creatureID);
}

HIMS_Adoption.prototype.setupParty = function(adopteeID)
{
	if($gameParty.size() > 1) return false
	let isPlayer = $gameActors.actor($gameParty._actors[0]).id === 3;
	if(!isPlayer) return false
	$gameParty.addActor(adopteeID);
	$gameParty.removeActor($gameParty._actors[0]);
	//set items
}

HIMS_Adoption.prototype.setupActor = function(creatureID)
{
	let adoptee = $dataActors
		.find(actor => actor != null && actor.nickname.length < 1);
	let adopteeID = adoptee.id;
	let templateID = $dataActors
		.find(actor => actor != null && actor.name === "Creature.template").id;
	adoptee = JSON.parse(JSON.stringify($dataActors[templateID]));
	adoptee.id = adopteeID;
	let actor = $gameActors.actor(adopteeID);
	actor._creatureID = creatureID;
	$PDL.creature.getElementByID(creatureID)._isActor = adopteeID;
	let speciesName = actor.creature().species().name;
	actor._battlerName = speciesName;
	actor._nickname = speciesName;
	let nickname = actor.creature().nickname;
	if(!nickname) nickname = actor.creature().species().meta.genus;   
	actor._name = nickname;
	actor.creature().nickname = nickname;
	this.setupTraits(adopteeID);
	actor.recoverAll();
	//set stats
	//initialize deck
	return adopteeID
}

HIMS_Adoption.prototype.setupTraits = function(adopteeID)
{
	let traits = $gameActors.actor(adopteeID).creature()._traits;
	this.setupTrait(adopteeID, traits, 5, "growthStage");
	this.setupTrait(adopteeID, traits, 2, "physique");
}

HIMS_Adoption.prototype.setupTrait = function(adopteeID, traits, slotId, traitTag)
{
	let traitId = this.findTraitByTag(traits, traitTag);
	$PDL.ACTOR.changeEquip(adopteeID, slotId, traitId);
}

HIMS_Adoption.prototype.findTraitByTag = function(array, tag)
{
	return array.find(id => $dataArmors[id].meta.hasOwnProperty(tag))
}

//#endregion






//------------------------------------------------------------------------
//#region list
/**
 * {@link }
 */
function Adoption_list()
{
	this.initialize(...arguments);
}

Adoption_list.prototype.initialize = function()
{
	Game_Shop.prototype.initialize.call(this);
	this.species = {};
}

Adoption_list.prototype.prepare = function()
{
	//update list
	this._goods = [];
	//get breeds
	//extrapolate new embryos
	//add embryos to list
	//generate items
	//prepare shop list
	let shopList = [];
	let shopItemTemplate = [0, itemId, 0, 0, quantity];
	return shopList
}

Adoption_list.prototype.open = function(goods)
{
	SceneManager.push(Scene_Shop);
	SceneManager.prepareNextScene(goods, true);
}
//#endregion



//#endregion







//------------------------------------------------------------------------
//#region Growth
/**
 * 
 * {@link SHELDEX.GROWTH.meta}
 */
HIMS_Game.prototype.Growth = function(growthStage)
{
	return $dataArmors[growthStage]
}

//#endregion

//#endregion







//------------------------------------------------------------------------
//#region HABITAT

Game_Habitat.prototype.makeCard = function()
{
	let card = new Game_Card(this.id())
	card.var[SHELDEX.ICV.HABITAT_ID] = this?.ID;
	return card
}

//#endregion





//------------------------------------------------------------------------
//#region LOCATION

Game_Location.prototype.initHabitat = function()
{
	//
}

//#endregion






//------------------------------------------------------------------------
//#region EVENT POI @todo POIs

PDL_Event.prototype.getCurrentIndex = function()
{
	return $dataMap.events.filter(e => e != null)
		.findIndex(r => r.name === this._name);
}

PDL_Event.prototype.spawn = function(type = 'xy', data = [0,0], overlap = 'all', save = true)
{
	Galv.SPAWN.event(this._eventID, type, data, overlap, save);
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

function PDL_EventPOI(data = {mapID: 0, index: 0, name: "", type: 0})
{
	this.initialize(data);
}
PDL_EventPOI.prototype = Object.create(PDL_Event.prototype);
PDL_EventPOI.prototype.constructor = PDL_EventPOI;
PDL_EventPOI.prototype.initialize = function(data)
{
	PDL_Event.prototype.initialize.call(this, data);
	this._index = data.index;
	this._POIname = data?.POIname;
	this._POInickname = data?.POInickname;
	this._eventID = data?.POItype;
}

PDL_EventPOI.prototype.setupDestination = function(POImapID, POIx, POIy)
{
	this._POImapID = POImapID;
	this._POIx = POIx;
	this._POIy = POIy;
}

PDL_EventPOI.prototype.deployFromTemplate = function(x, y, POImapID, POIx, POIy)
{
	this.setupDestination(POImapID, POIx, POIy);
	let index = this.spawn('xy', [x,y], 'all', true);
	let page = $dataMap.events[index].pages[1];
	page.list[1].parameters = ["event_text : " + this._POInickname];
	page.list[3].parameters = [`let message = ${this._POInickname};`];
	page.list[9].parameters = [`$gameVariables.setValue()`]
}

//#region movement

//$gameMap.event(n).locate(x,y)

//#endregion

//#endregion



//#endregion
//------------------------------------------------------------------------










//------------------------------------------------------------------------
//#region CBE








//------------------------------------------------------------------------
//#region DICE

CBE_Dice.prototype.d6in3 = function(trio = [])
{
	switch (this.dice(6)) {
		case 1:
		case 2:
			return trio[0];
		case 3:
		case 4:
			return trio[1];
		case 5:
		case 6:
			return trio[2];
	}
}


//#endregion





//#endregion
//------------------------------------------------------------------------











//------------------------------------------------------------------------
//#region NEW GAME
MAGPIE.ShelderEvo._runtime = {};
MAGPIE.ShelderEvo._runtime.start = MAGPIE.SYS.start;
MAGPIE.SYS.start = function()
{
	MAGPIE.ShelderEvo._runtime.start.call(this);
	//
}
/**
 * {@link MAGPIE.ShelderEvo.start}
 */
MAGPIE.ShelderEvo._runtime._PDL_start = MAGPIE_PDL.prototype.start;
MAGPIE_PDL.prototype.start = function()
{
	MAGPIE.ShelderEvo._runtime._PDL_start.call(this);
	$PDL.ACTOR = new PDL_Actor();
	$PDL.CREATURE = new PDL_Creature();
}
HIMS_Game.prototype.start = function()
{
	// $HIMS.MESSAGE.loading("new Game_Universe...", $MAGPIE._loading++);
	// $PDL.universe = new Game_Universe();
	// await MAGPIE.ShelderEvo._runtime.loadPDLData("asteroid");
	// await MAGPIE.ShelderEvo._runtime.loadPDLData("celestial");
	// await MAGPIE.ShelderEvo._runtime.loadPDLData("star");
	// await MAGPIE.ShelderEvo._runtime.loadPDLData("planet");
	// await MAGPIE.ShelderEvo._runtime.loadPDLData("moon");
	// await MAGPIE.ShelderEvo._runtime.loadPDLData("territory");
	// await MAGPIE.ShelderEvo._runtime.loadPDLData("universe")
	// await MAGPIE.ShelderEvo._runtime.loadPDLData("creature");
	$ShelderEvo.BATTLECORE = new HIMS_Battlecore();
	$ShelderEvo.ADOPTION = new HIMS_Adoption();
	$ShelderEvo.SHELGEO = new HIMS_Geography();
	//$HIMS.MESSAGE.loading(`Loading complete: session ${$MAGPIE.ID} started!`, 30); 
}
MAGPIE.ShelderEvo._runtime.loadPDLData = function(type)
{
	try {
		$PDL[type] = $MAGPIE.DATA.readJSON(`MAGPIE/PDL_${type}`, "warn")
		let message = `${$PDL[type].totalSize} instances of ${type} loaded.`;
		if(type === "universe")
			message = `${Object.keys($PDL[type]).length - 2} star systems loaded.`
		$HIMS.MESSAGE.loading(message, $MAGPIE._loading++);
	} catch (error) {
		console.error(error)
	}
}



HIMS_Game.prototype.launchTemplate = function()
{
	// this.generateShel();
	this.universe = new Game_Universe();
	this.universe.importSystem("Shel");
	this.generateBreeds();
	$gameShops._shops[0] = new Adoption_list();
}

HIMS_Game.prototype.generateBreeds = function(data = {})
{
	$PDL.breed = new MAGPIE_EntityDatabase("breeds");
}

// HIMS_Game.prototype.generateShel = function()
// {
// 	$PDL.universe = {};
// 	$PDL.universe.Shel = new Game_StarSystem({name: "Shel"});
// 	$PDL.universe.Shel._celestials[3] = new Game_Planet({name: "Shelder"});
// 	$PDL.universe.Shel.planet("Shelder")._moons[0] = new Game_Moon({name: "Shelyn"});
// }

HIMS_Game.prototype.generateUniverse = function(data = {})
{
	$PDL.star = new MAGPIE_EntityDatabase("universe");
	this.universe = {};
	Object.keys(data)
		.forEach(star => this.generateStar(data[star]));
}

HIMS_Game.prototype.generateStar = function(data)
{
	let thing = new Game_StarSystem(data);
	let thingID = $PDL.star.add(thing).ID;
	this.universe[thing] = {};
	this.universe[thing].isStarSystem = true;
	this.universe[thing].ID = thingID;
	data.celestials.forEach(c => this.generateCelestial(data[c], data.name));
}

HIMS_Game.prototype.generateCelestial = function(data, star)
{
	let thing = new Game_Celestial(data);
	let thingID = $PDL.celestial.add(thing).ID;
	let parent = this.universe[star];
	parent[thing].ID = thingID;
	parent[thing].isCelestial = true;
}

function HIMS_Cinematic(data)
{
	this.initialize(data);
}
HIMS_Cinematic.prototype = Object.create(MAGPIE_HIMS.prototype);
HIMS_Cinematic.prototype.constructor = HIMS_Cinematic;
HIMS_Cinematic.prototype.initialize = function(data)
{
	MAGPIE_HIMS.prototype.initialize.call(this);
	Object.keys(data).forEach(k => this[k] = data[k]);
}

HIMS_Cinematic.prototype.superFields = function(data = {fields: [], values: [], fade: false})
{
	const scene = SceneManager._scene;
	const ww = Graphics.boxWidth / 2;
	const wx = ww - (ww / 2);
	const wh = 200;
	const wy = Graphics.boxHeight - wh;
	const rect = new Rectangle(wx, wy, ww, wh);
	scene._fadedText = new Window_Base(rect);
	scene.addWindow(scene._fadedText);
	const fadedText = scene._fadedText;
	fadedText.createContents();
	fadedText.backOpacity = 0;
	fadedText.frameVisible = false;
	let fade = data.fade;
	let fields = data.fields;
	const field_w = Math.max(...data.fields.map(string => string.length)) * 16;
	fields.forEach((f, index) => fadedText
		.drawText(f, 6, 6 + (index * 30), field_w, "left"));
	let values = data.values;
	const value_w = Math.max(...data.values.map(string => string.length)) * 16;
	values.forEach((v, index) => fadedText
		.drawText(v, ww - value_w - 30, 6 + (index * 30), value_w, "right"));
	if(!fade) return
	if(Object.keys(fade) < 1) fade = {rate: 0.1, delay: 100, duration: 10}; 
	let window = fadedText;
	let rate = fade.rate;
	let delay = fade.delay;
	let duration = fade.duration;
	fadedText.show();
	this.timedFadeWindow(window, rate, delay, duration);
	$gameMap._interpreter.wait(fade.duration * 60)
}

MAGPIE_HIMS.prototype.fadeInWindow = function(window, rate = 0.1, delay = 100)
{
	if(window.alpha > 0) window.alpha = 0;
	const fadeIn = setInterval(() => {if(window.alpha >= 1) clearInterval(fadeIn); window.alpha += rate}, delay)
}

MAGPIE_HIMS.prototype.fadeOutWindow = function(window, rate = 0.1, delay = 100)
{
	const fadeOut = setInterval(() => {if(window.alpha <= 0) {
		clearInterval(fadeOut); window.alpha -= rate;
		}}, delay)
}

MAGPIE_HIMS.prototype.timedFadeWindow = function(window, rate = 0.1, delay = 100, duration = 10)
{
	this.fadeInWindow(window, rate, delay);
	setTimeout(() => {this.fadeOutWindow(window, rate, delay)}, duration * 1000);
}

//$PDL.ShelderEvo.Shel = new Game_StarSystem();
//#endregion
//------------------------------------------------------------------------










//------------------------------------------------------------------------
//#region SCENE LOAD
/** @audit import */
HIMS_Game.prototype.sceneLoad = function()
{
	if(SHELDEX.SWITCH.DAY_CYCLE) 
		$gameSwitches.setValue(SHELDEX.SWITCH.CLOCK_TOD, true);
	else
		$gameSwitches.setValue(SHELDEX.SWITCH.CLOCK_TOD, false);
	$gameSwitches.setValue(SHELDEX.SWITCH.IS_TIME, true);
}

//#endregion
//------------------------------------------------------------------------










//------------------------------------------------------------------------
//#region CGC
HIMS_Game.prototype.setupDeckInjuries = function(user)
{
	let DECK = user._cardDeck._data;
	let INJURY = user._extraZones[SHELDEX.ZONE.INJURY]._data;
	if(user._INJ?.length > 0)
	{
		user._INJ.forEach(card => user.moveCard(DECK.findIndex(e => e === card), DECK, INJURY))
	}
}

HIMS_Game.prototype.updateInjuries = function(user)
{
	let INJURY = user._extraZones[SHELDEX.ZONE.INJURY]._data;
	user._INJ = [];
	if(INJURY.length > 0) INJURY.forEach(card => user._INJ.push(card))
}

HIMS_Game.prototype.lastInZone = function(zone_index)
{
	let zone = $gameParty.leader()._extraZones[zone_index]._data;
	return zone[zone.length - 1]
}

HIMS_Game.prototype.lastInWild = function()
{
	return this.lastInZone(SHELDEX.ZONE.WILD)
}

HIMS_Game.prototype.lastIsType = function(zone, type)
{
	return $dataSkills[this.lastInZone(zone).skillId].meta.hasOwnProperty(type)
}

HIMS_Game.prototype.spawnEnemy = function(speciesID = 0)
{
	if(!speciesID) return false
	let creatureID = this.lastInWild().var[SHELDEX.ICV.CREATURE_ID];
	$gameSwitches.setValue(SHELDEX.SWITCH.ENEMY_SPAWN, true);
	$gameVariables.setValue(SHELDEX.VARIABLE.CHARACTER_ID, creatureID); 
	$gameVariables.setValue(SHELDEX.VARIABLE.LAST_SUMMON, speciesID);
}

HIMS_Game.prototype.initCommodity = function(commodityID, actor)
{
	let commodity = $MAGPIE.RESOURCE.getElementByID(commodityID);
	let skillId = commodity.getSkillID();
	actor.learnSkill(skillId);
	let deck = actor._cardDeck._data;
	let card = deck[deck.length - 1];
	commodity.initCard(card);
	return card
}

HIMS_Game.prototype.initEntity = function(entityName, commodityID, actor)
{
	let card = this.initCommodity(commodityID, actor);
}
//#endregion
//------------------------------------------------------------------------











//------------------------------------------------------------------------
//#region BATTLECORE
/**
 * 
 * {@link }
 */
MAGPIE.ShelderEvo.BATTLECORE = {};
MAGPIE.ShelderEvo.BATTLECORE.meta = {isBattleManager: true};
SHELDEX.BATTLECORE = {};

//------------------------------------------------------------------------
//#region Battler
HIMS_Battlecore.prototype.wakeUp = function(battler)
{
	battler.addState(SHELDEX.POSTURE.GROGGY);
	battler.removeState(SHELDEX.POSTURE.DROWSY);
	battler.removeState(SHELDEX.INJURY.BRUISE);
	battler.removeState(SHELDEX.INJURY.STRAIN);
}

HIMS_Battlecore.prototype.recovery = function(battler, dice, stateId)
{
	//
}
Game_Battler.prototype.changeState = function(statePool, newState)
{
	Object.values(statePool)
		.filter(e => e != newState)
		.forEach(e => this.removeState(e));
}

//#region Instinct
Game_Battler.prototype.instinct = function()
{
	//
}

HIMS_Game.prototype.pushSkill = function(battler, skillId, targetIndex = -1)
{
	const subject = battler;
	subject.forceAction(skillId, targetIndex);
	BattleManager.forceAction(subject);
	$gameTroop._interpreter.setWaitMode('action');
}


//#endregion
//#endregion






//------------------------------------------------------------------------
//#region Damage formula

SHELDEX.BATTLECORE.damageFormula = {
	isPhysical: "value *= Math.max((this.subject.def - target.def),1)",
	alternative: "value = (value * this.subject.def) - target.def",
	alternative2: "value *= (this.subject.def / target.def)",
	alternative3: "value += (this.subject.def - target.def)",
	alternative4: "value += this.subject.def - target.def"
}
Game_Action.prototype.makeDamageValue = function(target, critical) {
    const item = this.item();
    const baseValue = this.evalDamageFormula(target);
    let value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
        eval(SHELDEX.BATTLECORE.damageFormula.alternative3);
		value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    if (critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value = Math.round(value);
    return value;
};
function HIMS_Battlecore()
{
	this.initialize(...arguments);
}
HIMS_Battlecore.prototype.initialize = function()
{
	this.meta = "HIMS_Battlecore";
}
HIMS_Battlecore.prototype.damage = function(target, damage, injuries)
{
	for(let i = 0; i < damage; i++)
	{
		target.addState($CBE.DICE.pick(...injuries))
	}
}

MAGPIE.ShelderEvo.BATTLECORE._Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value)
{
	MAGPIE.ShelderEvo.BATTLECORE._Game_Action_executeHpDamage.call(this, target, value);
	let result = target.result().hpDamage;
	let damage = result - target.hp;
	let elementId = this.item().damage.elementId;
	let element = $dataSystem.elements[elementId];
	let injury = SHELDEX.INJURY[element];
	$ShelderEvo.BATTLECORE.damage(target, Math.min(target.hp, result), injury[0]);
	if(damage > 0) 
		$ShelderEvo.BATTLECORE.damage(target, Math.abs(damage), [injury[1], injury[2]])
}

//#endregion
//#endregion
//------------------------------------------------------------------------









//------------------------------------------------------------------------
//#region GRAPHICS





//------------------------------------------------------------------------
//#region BATTLE
/** @audit import */
HIMS_Game.prototype.setupBattle = function()
{
	let scene = SceneManager._scene;
	scene._statusWindow.alpha = 0;
	this.BATTLECORE.setupActorSprites(); 
	this.BATTLECORE.setupEnemySprites();
	this.BATTLECORE.setupStartingCards();
}

HIMS_Battlecore.prototype.setupStartingCards = function()
{
	//remove species Card
	const deck = $gameParty.leader()._cardDeck;
	const speciesCard = deck._data
		.find(card => $dataSkills[card._skillId]?.meta?.isSpecies);
	if(!speciesCard) return
	$gameParty.leader()._cardDeck.remove(speciesCard);
}

HIMS_Battlecore.prototype.setupActorSprites = function()
{
	let card_x = SHELDEX.CARD.ACTOR_SPRITE.X;
	let cardHeight = SHELDEX.CARD.BATTLER_SPRITE.H;
	let offset_Y = Math.floor(cardHeight * 0.1);
	let cardOffsetX = SHELDEX.CARD.ACTOR_SPRITE.OFFSET_X;
	let cardOffsetY = SHELDEX.CARD.ACTOR_SPRITE.OFFSET_Y;
	let x = card_x + cardOffsetX;
	let y = Graphics.boxHeight - cardOffsetY;
	let sprites = SceneManager._scene._spriteset._actorSprites;
	let init_y = y - ((sprites.length - 1) * offset_Y);
	for(let i = 0; i < sprites.length; i++)
	{
		sprites[i]._homeX = x;
		sprites[i]._homeY = init_y + (i * offset_Y);
		sprites[i].children
			.filter(s => s._stateId === 75 || s._stateId === 77 || s._stateId === 78)
			.forEach(sta => this.setSTAsprites(sta))
	}   
}

HIMS_Battlecore.prototype.setupEnemySprites = function()
{
	let sprites = SceneManager._scene._spriteset._enemySprites;
	sprites.forEach((sprite, index) => sprite.children
		.filter(s => s._stateId === 75 || s._stateId === 77 || s._stateId === 78)
		.forEach(sta => this.setSTAsprites(sta)))
}

HIMS_Battlecore.setActorSpritePosition = function(actorId, x, y)
{
	let scene = SceneManager._scene;
	let actorSprites = scene._spriteset._actorSprites;
	let actor = actorSprites.find(sprite => sprite._actor._actorId === actorId);
	actor._homeX = x;
	actor._homeY = y;
}

HIMS_Game.prototype.changeDeckSheet = function(sheet = "")
{
	let index = SceneManager._scene._deckSprite._index;
	SceneManager._scene._deckSprite._zoneData.sheet = sheet;
	SceneManager._scene._deckSprite.destroy();
	SceneManager._scene.createDeckSprite();
	SceneManager._scene.setDecksSkillWindow();
	SceneManager._scene._deckSprite._index = index;
}


//#endregion




//------------------------------------------------------------------------
//#region resourceStates
HIMS_Game.prototype.updateResourceStates = function(user)
{
	this.BATTLECORE.updateSTAstates(user);
	this.BATTLECORE.updateNRGstates(user);
}

HIMS_Battlecore.prototype.setSTAsprites = function(sprite)
{
	sprite.stretchScaleTo(true, 45, 45);
}

HIMS_Battlecore.prototype.updateSTAstates = function(user)
{
	let states = SHELDEX.STATE.RESOURCE.STA_STATES;
	states.forEach(state => user.removeState(state));
	if(user.mp < 1) return user.addState(SHELDEX.STATE.RESOURCE.STA_LOW)
	if(user.mp < user.mmp) return user.addState(SHELDEX.STATE.RESOURCE.STA_MID)
	return user.addState(SHELDEX.STATE.RESOURCE.STA)
}

HIMS_Battlecore.prototype.updateNRGstates = function(user)
{
	let states = SHELDEX.STATE.RESOURCE.NRG_STATES;
	states.forEach(state => user.removeState(state));
	if(user.tp < 1) return user.addState(SHELDEX.STATE.RESOURCE.NRG_NONE)
	if(user.tpRate() < 0.25) return user.addState(SHELDEX.STATE.RESOURCE.NRG_LOW)
	if(user.tpRate() < 0.50) return user.addState(SHELDEX.STATE.RESOURCE.NRG_MID)
	if(user.tpRate() < 0.75) return user.addState(SHELDEX.STATE.RESOURCE.NRG_HIGH)
	return user.addState(SHELDEX.STATE.RESOURCE.NRG)
}
//#endregion






//------------------------------------------------------------------------
//#region Status Window

Window_StatusBase.prototype.drawActorClass = function(actor, x, y, width)
{
	width = width || 168;
    this.resetTextColor();
	let classIcon = SHELDEX.ICONS.CLASS[actor.currentClass().id];
	this.drawIcon(classIcon, x, y)
    this.drawText(actor.currentClass().name, x + 33, y, width);
}

Window_StatusBase.prototype.drawActorNickname = function(actor, x, y, width) 
{
    width = width || 270;
    this.resetTextColor();
	let icon = false;
	if(actor?._creatureID) icon = 234;
	let iconOffset = 0;
	if(icon) {this.drawIcon(icon, x, y); iconOffset = 33;};
    this.drawText(actor.nickname(), x + iconOffset, y, width);
};

//#endregion
//#endregion
//------------------------------------------------------------------------











//------------------------------------------------------------------------
//#region MECHANICS




//------------------------------------------------------------------------
//#region turn phases

HIMS_Game.prototype.turnStart = function(user)
{
	this.updateResourceStates(user);
}

HIMS_Game.prototype.turnEnd = function(user)
{
	//
}

HIMS_Game.prototype.actionTargeted = function(user, target)
{
	if(user != target) return this.BATTLECORE.react(target)
}

HIMS_Game.prototype.actionHit = function(a)
{
	a.addState(SHELDEX.MORALE.ENCOURAGED);
}

HIMS_Game.prototype.actionReaction = function(a)
{
	a.addState(SHELDEX.MORALE.DISCOURAGED);
}

//
HIMS_Game.prototype.actionDamaged = function(a)
{
	a.addState(SHELDEX.MORALE.SATISFIED);
}

//@audit action respond eval a.result()?
HIMS_Game.prototype.actionRespond = function(b)
{
	b.addState(SHELDEX.MORALE.STRESSED);
	if(b.mind()) b.mind().newExp(b.result())
}

HIMS_Game.prototype.actionAfter = function(a)
{
	const encouraged = a.isStateAffected(SHELDEX.MORALE.ENCOURAGED);
	const satisfied = a.isStateAffected(SHELDEX.MORALE.SATISFIED);
	//
	//event_exp archiving
	if(a.mind()) a.mind().AAR(a.result())
	//
	if(encouraged || satisfied) return
	a.addState(SHELDEX.MORALE.DISCOURAGED);
}

HIMS_Game.prototype.actionFinish = function(b)
{
	//
}

HIMS_Game.prototype.exhausted = function(user)
{
	user.addState(SHELDEX.STATE.TIRED);
}
//#endregion

//#endregion
//------------------------------------------------------------------------




//end of plugin