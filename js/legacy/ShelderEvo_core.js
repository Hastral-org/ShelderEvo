//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_1] v0.4.0 ShelderEvo_Core
 * @author Matheraptor
 * 
 * @help
 * Common core plugin for the base Shelder Evo game 
 * 
 * Structure:
 * - Dictionary
 * - Time system
 * - PDL
 * - CBE
 * - Core edits
 * - Battlecore
 * 
 * ==========================================================================
 * Changelog 
 * ==========================================================================
 * v 0.4.0 - complete plugin rewrite and new version numbering
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
 * @param Core settings
 * 
 * @param windows
 * @text Windows
 * @parent Core settings
 * @type struct<windows>
 */

/*~struct~windows:
 * 
 * @param offsetX
 * @text X offset
 * @type select
 * @option Left aligned
 * @value NaN
 * @option Centered
 * @value 0
 * @option Right aligned
 * @value ((Graphics.boxWidth - 480) / 2)
 * @default Left aligned
 * 
 * @param offsetY
 * @text Y offset
 * @type number
 * @default 100
 * 
 * @param width
 * @text Window width
 * @type combo
 * @option this.mainCommandWidth()
 * @option 240
 * @default this.mainCommandWidth()
 */

//#endregion








//-----------------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.6.0";
MAGPIE.SE = {};
MAGPIE.SE.version = "0.4.0";
MAGPIE.SE.CORE = {};
MAGPIE.SE.CORE.pluginName = "ShelderEvo_Core";
MAGPIE.SE.CORE.pluginTier = 1;
MAGPIE.SE.CORE.version = "0.5.0";
MAGPIE.SE.CORE.actor = {};
MAGPIE.SE.CORE.battler = {};
MAGPIE.SE.CORE.party = {};
MAGPIE.SE.CORE.windows = {};
MAGPIE.SE.CORE.windows.meta = {};
MAGPIE.SE.CORE.scenes = {};
MAGPIE.SE.CORE.battlecore = {};
MAGPIE.SE.SYS = new HIM_System("ShelderEvo");
MAGPIE.PDL = {};
MAGPIE.CBE = {};
//#endregion








//-----------------------------------------------------------------------------------
//#region Options

MAGPIE.SE.OPTIONS = {};



//#region Time
MAGPIE.SE.OPTIONS.CALENDAR = {};
MAGPIE.SE.OPTIONS.CALENDAR.DEFAULT = 1;
MAGPIE.SE.OPTIONS.CALENDAR.EPOCH = 311;
MAGPIE.SE.OPTIONS.CLOCK = {};
MAGPIE.SE.OPTIONS.CLOCK.meta = {name: "Clock_Window", isOptions: true};
MAGPIE.SE.OPTIONS.CLOCK.X = {};
MAGPIE.SE.OPTIONS.CLOCK.X.DEFAULT = Infinity;
MAGPIE.SE.OPTIONS.CLOCK.Y = {};
MAGPIE.SE.OPTIONS.CLOCK.Y.DEFAULT = 0;
MAGPIE.SE.OPTIONS.CLOCK.WW = {};
MAGPIE.SE.OPTIONS.CLOCK.WW.meta = {default: "ToD + HH + : + MM + Weather"};
MAGPIE.SE.OPTIONS.CLOCK.WW.DEFAULT = 230;
MAGPIE.SE.OPTIONS.CLOCK.TOD = true;
MAGPIE.SE.OPTIONS.CLOCK.DIGITAL = true;
//#region Time system settings
const TIME = {};
TIME.meta = {name: "Time_System_Settings", isEnum: true};
//#region calendar
TIME.TimeScale = 60;
TIME.DefaultCalendar = MAGPIE.SE.OPTIONS.CALENDAR.DEFAULT;
TIME.initialEpoch = MAGPIE.SE.OPTIONS.CALENDAR.EPOCH;
TIME.CALENDAR = 140;
TIME.SYSTEM = 141;
TIME.DAYS = 142;
TIME.MONTHS = 143;
TIME.LEAPYEAR = 144;
TIME.LEAPMONTH = 145;
TIME.GAMEDAY = 132;
TIME.EPOCH = 129;
TIME.YEARDAY = 139;
TIME.SECOND = 121;
TIME.MINUTE = 122;
TIME.HOUR = 123;
TIME.DAY = 124;
TIME.MONTH = 125;
TIME.YEAR = 126;
TIME.LEAP = 131;
TIME.SEASONID = 133;
TIME.DAYNAME = 146;
TIME.MONTHNAME = 147;
TIME.SUNRISE = 134;
TIME.SUNSET = 135;
TIME.SEASON = 137
TIME.SEASONS = {};
TIME.SEASONS.WINTER = 157;
TIME.SEASONS.SPRING = 158;
TIME.SEASONS.SUMMER = 159;
TIME.SEASONS.AUTUMN = 160;
TIME.SEASONDELAY = 148;
TIME.ISLEAPMONTH = 121;
TIME.NEWYEARSEVE = 123;
TIME.NEWYEARSDAY = 124;
TIME.ISLEAPYEAR = 125;
TIME.NEWDAY = 126;
TIME.NEWMONTH = 127;
TIME.NEWYEAR = 128;
TIME.NEWSEASON = 129;
TIME.TICK = {};
TIME.TICK.SUPER = 131;
TIME.TICK.MEGA = 132;
TIME.TICK.TOD = 128;
TIME.TOD = {};
TIME.TOD.DAWN = 136;
TIME.TOD.AM = 137;
TIME.TOD.PM = 138;
TIME.TOD.DUSK = 139;
TIME.TOD.NIGHT = 140;
//#endregion
//#region weather
/**
 * @desc Weather states
 * @property {Enumerator} STATE weather state variable
 * @property {Enumerator} CLEAR 145
 * @property {Enumerator} FAIR 146
 * @property {Enumerator} CLOUDY 147
 * @property {Enumerator} OVERCAST 148
 * @property {Enumerator} BREEZY 149
 * @property {Enumerator} WINDY 150
 * @property {Enumerator} RAINY 151
 * @property {Enumerator} LIGHTNING 152
 * @property {Enumerator} THUNDERSTORM 153
 * @property {Enumerator} SNOW 154
 * @property {Enumerator} COLD 155
 * @property {Enumerator} HOT 156
 * {@link TIME.clock.WEATHER}
 * {@link Window_Clock}
 */
TIME.WEATHER = {};
TIME.WEATHER.STATE = 168;
TIME.WEATHER.CLEAR = 145;
TIME.WEATHER.FAIR = 146;
TIME.WEATHER.CLOUDY = 147;
TIME.WEATHER.OVERCAST = 148;
TIME.WEATHER.BREEZY = 149;
TIME.WEATHER.WINDY = 150;
TIME.WEATHER.DRIZZLE = undefined;
TIME.WEATHER.SHOWERS = undefined;
TIME.WEATHER.RAINY = 151;
TIME.WEATHER.LIGHTNING = 152;
TIME.WEATHER.THUNDERSTORM = 153;
TIME.WEATHER.LIGHTSNOW = undefined;
TIME.WEATHER.SNOWY = 154;
TIME.WEATHER.BLIZZARD = undefined;
TIME.WEATHER.HURRICANE = undefined;
TIME.WEATHER.COLD = 155;
TIME.WEATHER.HOT = 156;
//#endregion
//#region climate
TIME.HUMIDITY = {};
TIME.HUMIDITY.DRY = 1;
TIME.HUMIDITY.ARID = 2;
TIME.HUMIDITY.HUMID = 3;
TIME.HUMIDITY.DAMP = 4;
TIME.HUMIDITY.WET = 5;

TIME.CLIMATE = {};
TIME.CLIMATE.GLACIAL = -3;
TIME.CLIMATE.FRIGID = -2;
TIME.CLIMATE.COLD = -1;
TIME.CLIMATE.MILD = 0;
TIME.CLIMATE.WARM = 1;
TIME.CLIMATE.HOT = 2;
TIME.CLIMATE.TORRID = 3;
//#endregion
//#endregion
//#region game Date and time 
/**
 * {@link DATE.clock.meta}
 */
const DATE = {};
DATE.meta = {name: "Date_system", isTime: true};
DATE.second = 0;
DATE.minute = 0;
DATE.hour = 0;
DATE.day = 1;
DATE.month = 1;
DATE.year = 0;
DATE.sunrise = 0;
DATE.sunset = 0;
DATE.days = 0;
DATE.months = 0;
DATE.yearDay = 0;
DATE.gameday = 0;
DATE.calendar = 0;
DATE.leap = 0;
DATE.leapYear = 0;
DATE.leapMonth = 0;
//#endregion
//#region Clock
/**
 * {@link Window_Clock}
 * {@link MAGPIE.SE.OPTIONS.CLOCK.meta}
 */
MAGPIE.SE.CORE.windows.meta.clock = "TIME.clock.window";
TIME.clock = {};
TIME.clock.window = {};
TIME.clock.meta = {name: "Clock window", isTime: true};
TIME.clock.TODSWITCH = 111;
TIME.clock.DIGITALSWITCH = 112;
TIME.clock.WEATHERSWITCH = 109;
TIME.clock.DIGITS = [];
TIME.clock.TODICONS = {};
TIME.clock.TODICONS.DAWN = 284;
TIME.clock.TODICONS.AM = 285;
TIME.clock.TODICONS.PM = 285;
TIME.clock.TODICONS.DUSK = 286;
TIME.clock.TODICONS.NIGHT = 287;
TIME.clock.x = MAGPIE.SE.OPTIONS.CLOCK.X.DEFAULT;
TIME.clock.y = MAGPIE.SE.OPTIONS.CLOCK.Y.DEFAULT;
TIME.clock.width = MAGPIE.SE.OPTIONS.CLOCK.WW.DEFAULT;
TIME.clock.ToD = MAGPIE.SE.OPTIONS.CLOCK.TOD;
TIME.clock.digital = MAGPIE.SE.OPTIONS.CLOCK.DIGITAL;
TIME.clock.ICONS = {};
TIME.clock.ICONS.BLANK = 308;
TIME.clock.ICONS.DIGITS = [309,310,311,312,313,314,315,316,317,318];
TIME.clock.ICONS.SEPARATOR = 319;
TIME.clock.ICONS.CLEAR = 0;
TIME.clock.ICONS.FAIR = 0;
TIME.clock.ICONS.CLOUDY = 0;
TIME.clock.ICONS.OVERCAST = 0;
TIME.clock.ICONS.DRIZZLE = 0;
TIME.clock.ICONS.RAINY = 0;
TIME.clock.ICONS.SHOWERS = 0;
TIME.clock.ICONS.LIGHTNING = 0;
TIME.clock.ICONS.THUNDERSTORM = 0;
TIME.clock.ICONS.WINDY = 0;
TIME.clock.ICONS.LIGHTSNOW = 0;
TIME.clock.ICONS.SNOWY = 0;
TIME.clock.ICONS.BLIZZARD = 0;
TIME.clock.ICONS.HURRICANE = 0;

//#endregion
//#endregion





//#region windows
MAGPIE.SE.OPTIONS.WINDOWS = {};
/**
 * {@link MAGPIE.SE.CORE.scenes.titleCommand}
 */
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND = {};
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.X = {};
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.X.LEFT_ALIGN = "NaN";
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.X.CENTERED = "0";
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.X.RIGHT_ALIGN = "((Graphics.boxWidth - 480) / 2)";
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.X.CHOICE = MAGPIE
	.SE.OPTIONS.WINDOWS.TITLECOMMAND.X.LEFT_ALIGN;
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.Y = {};
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.Y.DEFAULT = "$dataSystem.titleCommandWindow.offsetY";
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.Y.CENTERED = "-250";
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.Y.CHOICE = MAGPIE
	.SE.OPTIONS.WINDOWS.TITLECOMMAND.Y.CENTERED;
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.WW = {};
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.WW.DEFAULT = "this.mainCommandWidth()";
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.WW.GENERIC = "240";
MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.WW.CHOICE = MAGPIE
	.SE.OPTIONS.WINDOWS.TITLECOMMAND.WW.GENERIC;
//#endregion







//#region cVar
/**
 * 
 */
const cVar = {};
//#region Independent Card Variables
/**
 * @property {Number} HABITAT 0
 * @property {Number} RESOURCES 1
 * @property {Number} ITEMS 2
 * @property {Number} MEAT 3
 * @property {Number} FAT 4
 * @property {Number} BONE 5
 * @property {Number} SPECIES 6
 * 
 */
cVar.ICV = {};
cVar.ICV.HABITAT = 0;
cVar.ICV.RESOURCES = 1;
cVar.ICV.ITEMS = 2;
cVar.ICV.MEAT = 3;
cVar.ICV.FAT = 4;
cVar.ICV.BONE = 5;
cVar.ICV.SPECIES = 6;
//#endregion
//#region gameVar
cVar.map = 10;
cVar.error = 19;
cVar.lastActor = 39;
cVar.currentMap = 46;
cVar.fertility = 47;
cVar.biome = 48;
cVar.territory = 49;
cVar.habitatID = 50;
cVar.territoryID = 61;
cVar.lastEnemy = 66;
cVar.characterID = 67;
cVar.discard = 68;
cVar.reclaimAmount = 69;
cVar.turn = 80;
cVar.lastItem = 89;
cVar.characterStats = 112;
cVar.calendar = 140;
//#endregion
//#endregion





//#region cSwitches
const cSwitch = {};
cSwitch.CEbusy = 1;
cSwitch.gameInit = 4;
cSwitch.newGame = 7;
cSwitch.metaUrgency = 12;
cSwitch.win = 14;
cSwitch.abort = 15;
cSwitch.lose = 16;
cSwitch.death = 17;
cSwitch.ko = 18;
cSwitch.escape = 19;
cSwitch.battleStarted = 21;
cSwitch.battleEnded = 24;
cSwitch.challenging = 25;
cSwitch.firstTurn = 38;
cSwitch.discard = 39;
cSwitch.reclaim = 40;
cSwitch.escape = 59;
cSwitch.habitatChange = 53;
cSwitch.territoryChange = 54;
cSwitch.stateIconHide = 82;
cSwitch.usedItem = 98;
cSwitch.boughtItem = 99;
cSwitch.soldItem = 100;
cSwitch.darkScreen = 110;
//#endregion






//#region CommonEvents
const CE = {};
CE.GAMELOAD = 11;
CE.RECLAIM = 31;
CE.LIGHTS_ON = 141;
CE.LIGHTS_OFF = 142;

//#endregion




//#region PDL
MAGPIE.PDL.proceduralSpawn = true;

MAGPIE.PDL.SWITCH = {};
MAGPIE.PDL.SWITCH.OFFSPRING = 101;
const SYSTEM = {};
SYSTEM.MAPID = "$gameMap.mapId()";
SYSTEM.PLAYER_X = "$gamePlayer.x";
SYSTEM.PLAYER_Y = "$gamePlayer.y";

const CARDS = {};
CARDS.ZONE = {};
CARDS.ZONE.CALL = "leader._extrazones[zone]._data"
CARDS.ZONE.WILD = 3;
CARDS.ZONE.TERRITORY = 2;
//#region cSkills
CARDS.SURVIVE = {};
CARDS.SURVIVE.INSTINCT = 8;
CARDS.SURVIVE.SLEEP = 2;
CARDS.SURVIVE.EMOTE = 7;
CARDS.SURVIVE.REST = 1;
CARDS.SURVIVE.PASS = 9;
CARDS.SURVIVE.ESCAPE = 12;
CARDS.SURVIVE.SEEKNRG = 21;
CARDS.SURVIVE.PURGEGUT = 22;
CARDS.SURVIVE.SEEKWATER = 23;
CARDS.SURVIVE.SEEKMEAT = 24;
CARDS.SURVIVE.SEEKSHELTER = 25;
CARDS.SURVIVE.PURGEBLADDER = 27;
CARDS.SURVIVE.MIGRATE = 28;
CARDS.SURVIVE.SEEKSLEEP = 29;
CARDS.COMPETE = {};
CARDS.COMPETE.SCRATCH = 97;
CARDS.COMPETE.BITE = 98;
CARDS.INTERACT = {};
CARDS.INTERACT.EXPLORE = 101;
CARDS.INTERACT.RETREAT = 102;
CARDS.INTERACT.POUNCE = 103;
CARDS.INTERACT.FORAGE = 105;
CARDS.INTERACT.POSITION = 108;
CARDS.INTERACT.MANEUVER = 109;
CARDS.ADAPT = {};
CARDS.ADAPT.QUICKSCAN = 121;
CARDS.ADAPT.BASICSCAN = 125;
//#endregion
//#region cStates
//#region INJURY
CARDS.INJURY = {};
CARDS.INJURY.FATIGUE = 114;
CARDS.INJURY.HUNGER = 115;
CARDS.INJURY.THIRST = 116;
CARDS.INJURY.POISON = 117;
CARDS.INJURY.BRUISE = 151;
CARDS.INJURY.BLEED = 152;
CARDS.INJURY.LACERATION = 153;
CARDS.INJURY.FRACTURE = 154;
CARDS.INJURY.STRAIN = 155;
CARDS.INJURY.INTERNAL = 156;
CARDS.INJURY.SCAR = 157;
CARDS.INJURY.MAIM = 158;
CARDS.INJURY.DISMEMBER = 159;
CARDS.INJURY.FATAL = 160;
//#endregion
//#region MOVE
CARDS.MOVE = {};
CARDS.MOVE.SLEEPING = 15
CARDS.MOVE.RESTING = 16;
CARDS.MOVE.WALKING = 34;
CARDS.MOVE.SNEAKING = 39;
CARDS.MOVE.TROTTING = 46;
CARDS.MOVE.RUNNING = 47;
CARDS.MOVE.SPRINTING= 48;
CARDS.MOVE.SEARCHING = 49;
CARDS.MOVE.BROWSING = 50;
CARDS.MOVE.STARTLED = 129;
//#endregion
//#region MOOD
CARDS.MOOD = {};
CARDS.MOOD.BORED = 40;
CARDS.MOOD.CONFIDENT = 41;
CARDS.MOOD.JOYFUL = 42;
CARDS.MOOD.ANGRY = 43;
CARDS.MOOD.SCARED = 44;
CARDS.MOOD.SAD = 45;
//#endregion
//#region POSTURE
CARDS.POSTURE = {};
CARDS.POSTURE.PROTECTIVE = 19;
CARDS.POSTURE.PREY = 20;
CARDS.POSTURE.EVASIVE = 21;
CARDS.POSTURE.AGGRESSIVE = 25;
CARDS.POSTURE.PREDATOR = 26;
CARDS.POSTURE.NEUTRAL = 27;
CARDS.POSTURE.ALERT = 38;
CARDS.POSTURE.GROGGY = 37;
CARDS.POSTURE.DROWSY = 57;
//#endregion
//#region MORALE
CARDS.MORALE = {};
CARDS.MORALE.ENCOURAGED = 51;
CARDS.MORALE.AGGRAVATED = 52;
CARDS.MORALE.SATISFIED = 53;
CARDS.MORALE.STRESSED = 54;
CARDS.MORALE.DISCOURAGED = 55;
CARDS.MORALE.RELIEVED = 56;
//#endregion
//#region HABCOMBO
CARDS.HABCOMBO = {};
CARDS.HABCOMBO.MASS = [85,89];
CARDS.HABCOMBO.AGGRO = [86,90];
CARDS.HABCOMBO.DEX = [87,91];
CARDS.HABCOMBO.SEN = [88,92];
//#endregion
//#region PBUFF 
CARDS.PBUFF = {};
CARDS.PBUFF.meta = {buff: 0, debuff: 1, UP: 2, DOWN: 3}
CARDS.PBUFF.MASS = [101,105,130,134];
CARDS.PBUFF.AGGRO = [102,106,131,135];
CARDS.PBUFF.DEX = [103,107,132,136];
CARDS.PBUFF.SEN = [104,108,133,137];
//#endregion
//#region COMBO
CARDS.COMBO = {};
CARDS.COMBO.M = 31;
CARDS.COMBO.A = 32;
CARDS.COMBO.D = 33;
CARDS.COMBO.S = 34;
//#endregion
//#endregion
//#endregion





//#region CBE
MAGPIE.CBE.SWITCH = {};
MAGPIE.CBE.SWITCH.ISPARTNER = 41;
MAGPIE.CBE.SWITCH.ISFOLLOWER = 42;
MAGPIE.CBE.SWITCH.ISALLY = 43;
MAGPIE.CBE.SWITCH.ISFRIEND = 44;
MAGPIE.CBE.SWITCH.ISCONTACT = 45;
MAGPIE.CBE.SWITCH.ISNEUTRAL = 46;
MAGPIE.CBE.SWITCH.ISUNFRIENDLY = 47;
MAGPIE.CBE.SWITCH.ISENEMY = 48;
MAGPIE.CBE.SWITCH.ISNEMESIS = 49;
MAGPIE.CBE.SWITCH.ISTHREAT = 50;
MAGPIE.CBE.SWITCH.ISNPCCONTACT = 51;
MAGPIE.CBE.SWITCH.ISNPC = 52;
MAGPIE.CBE.SWITCH.KEEPMESSAGE = 60;
MAGPIE.CBE.SWITCH.A = 61;
MAGPIE.CBE.SWITCH.B = 62;
MAGPIE.CBE.SWITCH.C = 63;
MAGPIE.CBE.SWITCH.D = 64;
MAGPIE.CBE.SWITCH.TUTORIAL = 65;
MAGPIE.CBE.SWITCH.ENEMYSPAWN = 66;
MAGPIE.CBE.SWITCH.E = 67;
MAGPIE.CBE.SWITCH.F = 68;
MAGPIE.CBE.SWITCH.G = 69;

MAGPIE.CBE.DICE = {};
MAGPIE.CBE.DICE.STANDARD = 6;
MAGPIE.CBE.DICE.ADVANCED = 12;
MAGPIE.CBE.DICE.HARD = 18;
MAGPIE.CBE.DICE.RARITY = 24;
MAGPIE.CBE.DICE.SUITABLE = 6;
MAGPIE.CBE.DICE.WEIGHTED = 6;
MAGPIE.CBE.DICE.COMMON = 6;
MAGPIE.CBE.DICE.UNCOMMON = 12;
MAGPIE.CBE.DICE.RARE = 24;
MAGPIE.CBE.DICE.UNIQUE = 48;


//#endregion











//#region UI
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










//-----------------------------------------------------------------------------------
//#region Dictionary



//#endregion









//-----------------------------------------------------------------------------------
//#region Time System





//#region functions
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
    let list = [];
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
//#endregion





//#region definitions
const timesystem = {gregorian: {}, sabi: {}};
timesystem.gregorian = new Time_System("Gregorian");
let gregorianMonths = [
    {January: 31},
    {February: 28},
    {March: 31},
    {April: 30},
    {May: 31},
    {June: 30},
    {July: 31},
    {AUgust: 31},
    {September: 30},
    {October: 31},
    {November: 30},
    {December: 31}
];
timesystem.gregorian.setup(4,2,gregorianMonths);

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
];

timesystem.sabi = new Time_System("Sabi");
timesystem.sabi.setup(8, 12, sabiMonths);


//#endregion





//#region Calendar
DATE.setCalendar = function(calendar, gameday = 1, day = 1, month = 1, year = 1, hour = 1)
{
	$gameVariables.setValue(TIME.calendar, timesystem[calendar]);
	DATE.leapYear = timesystem[calendar].LeapYear;
	$gameVariables.setValue(TIME.leapYear, DATE.leapYear);
	DATE.leapMonth = timesystem[calendar].LeapMonth;
	$gameVariables.setValue(TIME.leapMonth, DATE.leapMonth);
	DATE.calendar = timesystem[calendar];
	let calendarLength = Object.keys(timesystem[calendar]).length;
	DATE.months = calendarLength - 4;
	DATE.setupSeason();
	$gameVariables.setValue(TIME.months, DATE.months);
	$gameVariables.setValue(TIME.gameday, gameday);
	$gameVariables.setValue(TIME.day, day);
	$gameVariables.setValue(TIME.month, month);
	$gameVariables.setValue(TIME.year, year);
	$gameVariables.setValue(TIME.hour, hour);
	$gameVariables.setValue(TIME.epoch, DATE.epoch());
	$gameVariables.setValue(TIME.yearDay, DATE.getYearDay());
	DATE.gameday = $gameVariables.value(TIME.gameday);
	DATE.day = $gameVariables.value(TIME.day);
	DATE.month = $gameVariables.value(TIME.month);
	DATE.year = $gameVariables.value(TIME.year);
	DATE.hour = $gameVariables.value(TIME.hour);
	DATE.minute = $gameVariables.value(TIME.minute);
	DATE.second = $gameVariables.value(TIME.second);
	DATE.yearDay = $gameVariables.value(TIME.yearDay);
	DATE.days = Object.values(DATE.calendar)[DATE.month + 2];
	$gameVariables.setValue(TIME.days, DATE.days);
	MAGPIE.console.Log(`Calendar set to ${DATE.calendar.name}.`);
}

DATE.epoch = function()
{
	return TIME.initialEpoch + DATE.year
}

DATE.getYearDay = function()
{
	for(let i = 1; i < DATE.month; i++)
	{
		DATE.yearDay += Object.values(DATE.calendar)[i + 2]
	}
	DATE.yearDay += DATE.day;
	$gameVariables.setValue(TIME.yearDay, DATE.yearDay);
	return DATE.yearDay
}

DATE.setupSeason = function()
{
	let season = DATE.season(DATE.yearDay());
	let results = DATE.getSeasonalChanges(season);
	results.season = season;
	return results
}

DATE.getSeasonalChanges = function(season)
{
	DATE.sunrise = 7;
	DATE.sunset = 18;
	switch (season) 
	{
		case "winter":
			DATE.sunrise += 2;
			DATE.sunset -= 2;
			break;
		case "spring":

			break;
		case "summer":
			DATE.sunrise -= 2;
			DATE.sunset += 2;
			break;
		case "autumn":

			break;
	}
	return {sunrise: DATE.sunrise, sunset: DATE.sunset}
}

DATE.switchSeason = function(seasonName, seasonID)
{
	$gameVariables.setValue(TIME.season, seasonName);
	$gameVariables.setValue(TIME.seasonID, seasonID);
	return seasonName
}

DATE.season = function(yearDay)
{
	let seasonalDelay = $gameVariables.value(TIME.seasonalDelay) || 15;
	let yearDays = DATE.calendar.Days;
	let seasonDays = Math.floor(yearDays / 4);
	if(DATE.yearDay < seasonDays - seasonalDelay || yearDay > (seasonDays * 4) - seasonalDelay)
	{
		return DATE.switchSeason("winter", 1);
	}
	else if(yearDay < (seasonDays * 2) - seasonalDelay) 
	{
		return DATE.switchSeason("spring", 2);
	}
	else if(yearDay < (seasonDays * 3) - seasonalDelay)
	{
		return DATE.switchSeason("summer", 3);
	}
	else
	{
		return DATE.switchSeason("autumn", 4);
	}
}

DATE.getMonthName = function()
{
	monthName = Object.keys(DATE.calendar)[DATE.month + 2];
	$gameVariables.setValue(TIME.monthName, monthName);
	return monthName
}

DATE.getMonthDays = function()
{
	DATE.days = Object.values(DATE.calendar)[DATE.month];
	$gameVariables.setValue(TIME.days, DATE.days);
	return DATE.days
}

//#endregion






//-----------------------------------------------------------------------------------
//#region Clock
/**
 * {@link DATE.meta}
 * {@link TIME.clock.meta}
 * {@link Window_Clock}
 */
DATE.clock = {};
DATE.clock.meta = {name: "Time_ticker", isTime: true};
DATE.clock.run = function()
{
	DATE.second = $gameVariables.value(TIME.second);
	DATE.minute = $gameVariables.value(TIME.minute);
	DATE.hour = $gameVariables.value(TIME.hour);
	$gameVariables.setValue(TIME.second, DATE.second + TIME.TimeScale);
	//TICK
	if(DATE.second < 60)
	{
		return
	};
	DATE.clock.SuperTICK();
}

DATE.clock.SuperTICK = function()
{
	$gameSwitches.setValue(TIME.TICK.SUPER, true);
	$gameVariables.setValue(TIME.second, 0);
	$gameVariables.setValue(TIME.minute, DATE.minute + 1);
	$gameSwitches.setValue(TIME.TICK.SUPER, false);
	if($gameVariables.value(DATE.minute) > 1)
	{
		$gameSwitches.setValue(TIME.TICK.MEGA, false);
	};
	if(DATE.minute < 60)
	{
		return
	};
	DATE.clock.MegaTICK();
}

DATE.clock.MegaTICK = function()
{
	$gameSwitches.setValue(TIME.TICK.MEGA, true);
	$gameVariables.setValue(TIME.minute, 0);
	$gameVariables.setValue(TIME.hour, DATE.hour + 1);
	DATE.getSeasonalChanges($gameVariables.value(TIME.season));
	DATE.ToD(DATE.hour, DATE.minute, DATE.sunrise, DATE.sunset);
	if(DATE.hour < 24)
	{
		return
	};
	DATE.clock.newDay();
}

DATE.clock.newDay = function()
{
	$gameVariables.setValue(TIME.hour, 0);
	$gameSwitches.setValue(TIME.newDay, true);
	$gameVariables.setValue(TIME.day, DATE.day + 1);
	$gameVariables.setValue(TIME.yearDay, DATE.yearDay + 1);
	$gameVariables.setValue(TIME.gameday, DATE.gameday + 1);
	DATE.season(DATE.yearDay, DATE.calendar);
	DATE.getMonthDays();
	if(DATE.day > 1 && DATE.day < DATE.days)
	{
		return $gameSwitches.setValue(TIME.newMonth, false)
	}
	else if(DATE.day > DATE.days)
	{
		return DATE.newMonth();
	};
	if($gameSwitches.value(TIME.isLeapYear) && $gameSwitches.value(TIME.isLeapMonth))
	{
		$gameSwitches.setValue(TIME.isLeapMonth, false);
		return
	}
}

DATE.newMonth = function()
{
	$gameSwitches.setValue(TIME.newMonth, true);
	$gameVariables.setValue(TIME.day, 1);
	$gameVariables.setValue(TIME.month, DATE.month + 1);
	if(DATE.month > 1 && DATE.month < DATE.months)
	{
		if(DATE.month == $gameVariables.value(TIME.leapMonth))
		{
			$gameSwitches.setValue(TIME.isLeapMonth, true)
		};
		return $gameSwitches.setValue(TIME.newYear, false);
	}
	else if (DATE.month > DATE.months)
	{
		return DATE.newYear();
	}
}

DATE.newYear = function()
{
	$gameSwitches.setValue(TIME.newYear, true);
	$gameVariables.setValue(TIME.month, 1);
	$gameVariables.setValue(TIME.year, DATE.year + 1);
	$gameVariables.setValue(TIME.yearDay, 1);
	let leap = $gameVariables.value(TIME.leap);
	let leapYear = $gameVariables.value(TIME.leapYear);
	if(leap < leapYear)
	{
		return $gameSwitches.setValue(TIME.isLeapYear, false)
	}
	return $gameSwitches.setValue(TIME.isLeapYear, true)
}

DATE.selectedTime = function(selectedHour, selectedMinute)
{
	return selectedHour + (selectedMinute / 60)
}

DATE.ToD = function(hour = 0, minute = 0, sunrise = 0, sunset = 0)
{
	let time = DATE.selectedTime(hour, minute);
	if(time > sunrise - 1 && time < sunrise + 1) return DATE.switchToD(TIME.TOD.DAWN)
	if(time > sunrise && time < 12) return DATE.switchToD(TIME.TOD.AM)
	if(time > 12 && time < sunset - 1) return DATE.switchToD(TIME.TOD.PM)
	if(time > sunset - 1 && time < sunset + 1) return DATE.switchToD(TIME.TOD.DUSK)
	if(time > sunset + 1 || time < sunrise - 1) return DATE.switchToD(TIME.TOD.NIGHT)
}

DATE.switchToD = function(ToD)
{
	let ToDs = [TIME.TOD.DAWN, TIME.TOD.AM, TIME.TOD.PM, TIME.TOD.DUSK, TIME.TOD.NIGHT];
	ToDs.remove(ToD);
	ToDs.forEach(e => $gameSwitches.setValue(e, false));
	let ToDname = $dataSystem.switches[ToD];
	$gameVariables.setValue(TIME.ToD, ToD);
	return ToDname
}

DATE.getToDicon = function()
{
	let ToD = DATE.ToD(DATE.hour, DATE.minute, DATE.sunrise, DATE.sunset);
	switch (ToD) {
		case "dawn":
			return TIME.clock.TODICONS.DAWN
		case "morning":
			return TIME.clock.TODICONS.AM
		case "afternoon":
			return TIME.clock.TODICONS.PM
		case "dusk":
			return TIME.clock.TODICONS.DUSK
		case "night":
			return TIME.clock.TODICONS.NIGHT
	}
}

DATE.today = function()
{
	return $gameVariables.value(TIME.gameday)
}

DATE.getWeatherIcon = function()
{
	let weather = TIME.WEATHER.STATE;
	let state = 0;
	switch (weather) {
		case TIME.WEATHER.CLEAR:
			state = TIME.clock.ICONS.CLEAR;
			break;
		case TIME.WEATHER.FAIR:
			state = TIME.clock.ICONS.FAIR;
			break;
		case TIME.WEATHER.CLOUDY:
			state = TIME.clock.ICONS.CLOUDY;
			break;
		case TIME.WEATHER.OVERCAST:
			state = TIME.clock.ICONS.OVERCAST;
			break;
		case TIME.WEATHER.DRIZZLE:
			state = TIME.clock.ICONS.DRIZZLE;
			break;
		case TIME.WEATHER.RAINY:
			state = TIME.clock.ICONS.RAINY;
			break;
		case TIME.WEATHER.SHOWERS:
			state = TIME.clock.ICONS.SHOWERS;
			break;
		case TIME.WEATHER.LIGHTNING:
			state = TIME.clock.ICONS.LIGHTNING;
			break;
		case TIME.WEATHER.THUNDERSTORM:
			state = TIME.clock.ICONS.THUNDERSTORM;
			break;
		case TIME.WEATHER.WINDY:
			state = TIME.clock.ICONS.WINDY;
			break;
		case TIME.WEATHER.LIGHTSNOW:
			state = TIME.clock.ICONS.LIGHTSNOW;
			break;
		case TIME.WEATHER.SNOWY:
			state = TIME.clock.ICONS.SNOWY;
			break;
		case TIME.WEATHER.BLIZZARD:
			state = TIME.clock.ICONS.BLIZZARD;
			break;
		case TIME.WEATHER.HURRICANE:
			state = TIME.clock.ICONS.HURRICANE;
			break;
	}
	return state
};
//#endregion

//#endregion









//-----------------------------------------------------------------------------------
//#region PDL





//#region message
MAGPIE.PDL.message = {};

MAGPIE.PDL.message.loading = function(message = "", queue = 0)
{
	let editedMessage = `\\>${message}\\|\\^`;
	$gameMessage.setBackground(2);
	$gameMessage.setPositionType(2);
	let dot = ".";
	let bar = "|";
	let barCount = queue;
	let dotCount = 10 - queue;
	let loadBar = "";
	for(let i = 0; i < barCount; i++)
	{
		loadBar += bar;
	}
	for(let i = 0; i < dotCount; i++)
	{
		loadBar += dot;
	}
	$gameMessage.setSpeakerName("Loading" + loadBar);
	$gameMessage.add(editedMessage);
	$gameMap._interpreter.setWaitMode('message');
}
//#endregion






//#region Init

MAGPIE.PDL.getFilterData = function(data, filter, shift1st = true)
{
	console.log(`Loading ${filter}...`);
	let pool = [];
	data.forEach(element => pool.push(element));
	if(shift1st)
	{
		pool.shift();
	};
	let results = pool.filter(element => element.meta.hasOwnProperty(filter));
	if(results.length > 0)
	{
		console.log(`${results.length} records found and added to PDL database`);
		return results
	}
	else
	{
		console.log(`No ${filter} records found!`);
	}
}

MAGPIE.PDL.initData = function()
{
	let habitats = MAGPIE.PDL.getFilterData($dataSkills, "habitat", true);
	let habitatStates = MAGPIE.PDL.getFilterData($dataStates, "habitat", true);
	let resources = MAGPIE.PDL.getFilterData($dataItems, "resource", true);
	let species = MAGPIE.PDL.getFilterData($dataSkills, "species", true);
}


//#endregion





//#region scene
MAGPIE.PDL.sceneLoad = function()
{
	DATE.getSeasonalChanges(DATE.season(DATE.yearDay, DATE.calendar));
	DATE.ToD(DATE.hour, DATE.minute, DATE.sunrise, DATE.sunset);
}
//#endregion






//#region CGC-related
MAGPIE.PDL.lastInZone = function(zoneId = 2)
{
	let zone = $gameParty.leader()._extraZones[zoneId]._data;
	let card = zone[zone.length - 1];
	if(card == undefined)
	{
		return
	}
	return card
}

//#endregion


//#endregion









//-----------------------------------------------------------------------------------
//#region CBE

MAGPIE.CBE.message = {};
MAGPIE.CBE.message.battleSimple = function(text = "")
{
	let message = `\\>${text}\\|\\^`;
	$gameMessage.add(message);
	$gameTroop._interpreter.setWaitMode('message');
}

MAGPIE.CBE.gainedItem = function(item)
{
	//
}
//#endregion










//-----------------------------------------------------------------------------------
//#region BATTLECORE
/**
 * @desc battlecore addons
 */
MAGPIE.SE.CORE.battlecore.addons = {};









//-----------------------------------------------------------------------------------
//#region Sprite addons





//-----------------------------------------------------------------------------------
//#region Creature



//#endregion



//#endregion



//#endregion








//-----------------------------------------------------------------------------------
//#region CORE EDITS





//-----------------------------------------------------------------------------------
//#region Actor



//#endregion






//-----------------------------------------------------------------------------------
//#region Battler



//#endregion






//-----------------------------------------------------------------------------------
//#region Party



//#endregion







//-----------------------------------------------------------------------------------
//#region battlecore
/**
 * @desc battlers as cards
 * {@link MAGPIE.SE.CORE.battlecore.addons}
 */
MAGPIE.SE.CORE.battlecore.battlersAsCards = {};



//-----------------------------------------------------------------------------------
//#region Enemy
Sprite_Enemy.prototype.loadBitmap = function(name) {
    if ($gameSystem.isSideView()) {
        this.bitmap = ImageManager.loadSvActor(name);
    } else {
        this.bitmap = ImageManager.loadEnemy(name);
    }
};

Game_Enemy.prototype.battlerName = function() {
    return this._name;
};

//#endregion






//-----------------------------------------------------------------------------------
//#region Actor
Sprite_Actor.prototype.update = function() {
    Sprite_Battler.prototype.update.call(this);
    this.updateShadow();
}
Sprite_Actor.prototype.setupMotion = function() {};
Sprite_Actor.prototype.setupWeaponAnimation = function() {};
Sprite_Actor.prototype.startMotion = function() {};
Sprite_Actor.prototype.updateFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
    this.setFrame(0, 0, this._mainSprite.bitmap.width, this._mainSprite.bitmap.height);
    this._mainSprite.setFrame(0, 0, this._mainSprite.bitmap.width, this._mainSprite.bitmap.height);
};
Sprite_Actor.prototype.updateMotion = function() {};
Sprite_Actor.prototype.updateMotionCount = function() {};
Sprite_Actor.prototype.motionSpeed = function() {};

Sprite_Actor.prototype.refreshMotion = function() {};
Sprite_Actor.prototype.startEntryMotion = function() {};

Sprite_Actor.prototype.onMoveEnd = function() {
    Sprite_Battler.prototype.onMoveEnd.call(this);
    // if (!BattleManager.isBattleEnd()) {
    //     this.refreshMotion();
    // }
};

//#endregion






//-----------------------------------------------------------------------------------
//#region Sprites





//#region creatureBase

function Sprite_CreatureBase()
{
    this.initialize(...arguments);
}

Sprite_CreatureBase.prototype = Object.create(Sprite_Battler.prototype);
Sprite_CreatureBase.prototype.constructor = Sprite_CreatureBase;

Sprite_CreatureBase.prototype.initialize = function(battler) {
    Sprite_Battler.prototype.initialize.call(this, battler);
    this._battlerName = "";
    this.createShadowSprite();
    this.createMainSprite();
};

Sprite_CreatureBase.prototype.mainSprite = function() {
    return this._mainSprite;
};

Sprite_CreatureBase.prototype.createMainSprite = function() {
    this._mainSprite = new Sprite();
    this._mainSprite.anchor.x = 0.5;
    this._mainSprite.anchor.y = 1;
    this.addChild(this._mainSprite);
};

Sprite_CreatureBase.prototype.createShadowSprite = function() {
    this._shadowSprite = new Sprite();
    this._shadowSprite.bitmap = ImageManager.loadSystem("Shadow2");
    this._shadowSprite.anchor.x = 0.5;
    this._shadowSprite.anchor.y = 0.5;
    this._shadowSprite.y = -2;
    this.addChild(this._shadowSprite);
};

Sprite_CreatureBase.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._creature = battler;
};

Sprite_CreatureBase.prototype.update = function() {
    Sprite_Battler.prototype.update.call(this);
    this.updateShadow();
};

Sprite_CreatureBase.prototype.updateShadow = function() {
    this._shadowSprite.visible = !!this._creature;
};

Sprite_CreatureBase.prototype.updateMain = function() {
    Sprite_Battler.prototype.updateMain.call(this);
    if (this._creature.isSpriteVisible() && !this.isMoving()) {
        this.updateTargetPosition();
    }
};

Sprite_CreatureBase.prototype.updateBitmap = function() {
    Sprite_Actor.prototype.updateBitmap.call(this);
};

Sprite_CreatureBase.prototype.updateFrame = function() {
    Sprite_Actor.prototype.updateFrame.call(this);
    this.setFrame(0, 0, this._mainSprite.bitmap.width, this._mainSprite.bitmap.height);
    this._mainSprite.setFrame(0, 0, this._mainSprite.bitmap.width, this._mainSprite.bitmap.height);
};

Sprite_CreatureBase.prototype.damageOffsetX = function() {
    return Sprite_Battler.prototype.damageOffsetX.call(this) - 32;
};

Sprite_CreatureBase.prototype.damageOffsetY = function() {
    return Sprite_Battler.prototype.damageOffsetY.call(this);
};

//#endregion

//#endregion

//#endregion







//-----------------------------------------------------------------------------------
//#region Windows





//#region title command

MAGPIE.SE.CORE.windows.titleCommand = {};
MAGPIE.SE.CORE.windows.titleCommand.x = MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.X.CHOICE;
MAGPIE.SE.CORE.windows.titleCommand.y = MAGPIE.
	SE.OPTIONS.WINDOWS.TITLECOMMAND.Y.CHOICE;
MAGPIE.SE.CORE.windows.titleCommand.ww = MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND.WW.CHOICE;

//#endregion





//#region remove optimize
/**
 * 
 */
MAGPIE.SE.CORE.windows._Window_EquipCommand_makeCommandList = Window_EquipCommand.prototype.makeCommandList;
Window_EquipCommand.prototype.makeCommandList = function()
{
	MAGPIE.SE.CORE.windows._Window_EquipCommand_makeCommandList.call(this);
	this._list = this._list.filter(command => command.symbol !== 'optimize');
};


//#endregion






//#endregion






//-----------------------------------------------------------------------------------
//#region Scene





//-----------------------------------------------------------------------------------
//#region title
/**
 * {@link MAGPIE.SE.OPTIONS.WINDOWS.TITLECOMMAND}
 */
MAGPIE.SE.CORE.scenes.titleCommand = {};

Scene_Title.prototype.commandWindowRect = function() {
    const offsetX = eval(MAGPIE.SE.CORE.windows.titleCommand.x);
    const offsetY = eval(MAGPIE.SE.CORE.windows.titleCommand.y);
    const ww = eval(MAGPIE.SE.CORE.windows.titleCommand.ww);
    const wh = this.calcWindowHeight(3, true);
    const wx = (Graphics.boxWidth - 480) / 2 + offsetX;
    const wy = Graphics.boxHeight - wh - 96 + offsetY;
    return new Rectangle(wx, wy, ww, wh);
};

//#endregion






//-----------------------------------------------------------------------------------
//#region map
/**
 * {@link MAGPIE.SE.CORE.windows.meta}
 * {@link Window_Clock}
 */
Scene_Map.prototype.createAllWindows = function()
{
	this.createMapNameWindow();
	this.createSEMAPwindows();
	Scene_Message.prototype.createAllWindows.call(this)
}

Scene_Map.prototype.createSEMAPwindows = function()
{
	this.createClockWindow();
}
//#endregion



//#endregion






//-----------------------------------------------------------------------------------
//#region Clock
/**
 * {@link TIME.clock.window}
 * {@link DATE.clock.meta}
 */


TIME.clock._Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function()
{
	TIME.clock._Scene_Battle_createAllWindows.call(this);
	this.createClockWindow();
}

function Window_Clock()
{
	this.initialize.apply(this, arguments);
}

Window_Clock.prototype = Object.create(Window_Base.prototype);
Window_Clock.prototype.constructor = Window_Clock;
Window_Clock.prototype.initialize = function(rect) 
{
	Window_Base.prototype.initialize.call(this, rect);
	this._index = -1;
	this.ToDicon = null;
	this.hour = null;
	this.minute = null;
	this.second = null;
	this.separator = true;
	this.ToD_x = 0;
	this.hour_x = [30,60];
	this.separator_x = 90;
	this.minute_x = [120,150];
	this.second_x = [0,0];
	this.digit_y = 0;
	this.ToD_y = 0;
	this.weather = null;
	this.weather_x = 180;
}

Window_Clock.prototype.updateClock = function(seconds = false)
{
	this.ToDicon = DATE.getToDicon();
	this.hour = MAGPIE.SYS.formatDigits(TIME.hour);
	this.minute = MAGPIE.SYS.formatDigits(TIME.minute);
	if(seconds) this.second = MAGPIE.SYS.formatDigits(TIME.second);
	let hour_digit_1 = Number(this.hour[0]);
	let hour_digit_2 = Number(this.hour[1]);
	let minute_digit_1 = Number(this.minute[0]);
	let minute_digit_2 = Number(this.minute[1]);
	let second_digit_1 = null;
	let second_digit_2 = null;
	if(seconds) 
	{
		second_digit_1 = Number(this.second[0]);
		second_digit_2 = Number(this.second[1]);
		second_digit_1_x = this.second_x[0];
		second_digit_2_x = this.second_x[1];
	};
	let hour_digit_1_x = this.hour_x[0];
	let hour_digit_2_x = this.hour_x[1];
	let minute_digit_1_x = this.minute_x[0];
	let minute_digit_2_x = this.minute_x[1];
	let second_digit_1_x = null;
	let second_digit_2_x = null;
	let separator = TIME.clock.ICONS.SEPARATOR;
	let blank = TIME.clock.ICONS.BLANK;
	this.separator = !this.separator;
	let ToD = $gameSwitches.value(TIME.clock.TODSWITCH);
	let digital = $gameSwitches.value(TIME.clock.DIGITALSWITCH);
	let weather = $gameSwitches.value(TIME.clock.WEATHER);
	this.createContents();
	if($gameSwitches.value(TIME.clock.TODSWITCH))
	{
		this.drawIcon(this.ToDicon, this.ToD_x,this.ToD_y);
	};
	if($gameSwitches.value(TIME.clock.DIGITALSWITCH))
	{
		this.drawIcon(hour_digit_1, hour_digit_1_x, this.digit_y);
		this.drawIcon(hour_digit_2, hour_digit_2_x, this.digit_y);
		if(this.separator)
		{
			this.drawIcon(separator,this.separator_x,this.digit_y)
		}
		else
		{
			this.drawIcon(blank,this.separator_x,this.digit_y)
		};
		this.drawIcon(minute_digit_1, minute_digit_1_x, this.digit_y);
		this.drawIcon(minute_digit_2, minute_digit_2_x, this.digit_y);
		if(seconds)
		{
			this.drawIcon(second_digit_1, second_digit_1_x, this.digit_y);
			this.drawIcon(second_digit_2, second_digit_2_x, this.digit_y);
		};
	};
	if($gameSwitches.value(TIME.clock.WEATHER))
	{
		this.weather = DATE.getWeatherIcon();
		this.drawIcon(this.weather, this.weather_x, this.digit_y)
	};
}

Scene_Map.prototype.createClockWindow = function()
{
	const rect = this.clockWindowRect();
	this._clockWindow = new Window_Clock(rect);
	this.addWindow(this._clockWindow);
}

Scene_Map.prototype.clockWindowRect = function()
{
	const wx = Math.min(Graphics.boxWidth - TIME.clock.width, TIME.clock.x);
	const wy = TIME.clock.y;
	const ww = TIME.clock.width;
	const wh = this.calcWindowHeight(1, false);
	return new Rectangle(wx, wy, ww, wh)
}

Scene_Battle.prototype.createClockWindow = function()
{
	const rect = this.clockWindowRect();
	this._clockWindow = new Window_Clock(rect);
	this.addWindow(this._clockWindow);
}

Scene_Battle.prototype.clockWindowRect = function()
{
	const wx = Graphics.boxWidth - TIME.clock.width;
	const wy = 0;
	const ww = TIME.clock.width;
	const wh = this.calcWindowHeight(1, false);
	return new Rectangle(wx, wy, ww, wh)
}

Game_Party.prototype.clock = function()
{
	TIME.clock.window = SceneManager._scene._clockWindow;
	TIME.clock.window.updateClock();
}
//#endregion





//-----------------------------------------------------------------------------------
//#region Weather
/**
 * {@link TIME.weather.window}
 */
//#endregion





//-----------------------------------------------------------------------------------
//#region Game System



//#endregion



//#endregion















//end of plugin