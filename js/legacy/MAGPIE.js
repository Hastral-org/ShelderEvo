//-----------------------------------------------------------------------------------
//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_o] v0.6.0 MAGPIE core
 * @author Matheraptor
 * 
 * @help
 * Common base plugin for all Matheraptor projects
 * 
 * ----------------------------------------------------------------------------
 * FEATURES
 * ----------------------------------------------------------------------------
 * 
 * - Index
 * - common utility functions
 * - AI logic
 * - Data handling
 * - HIMS logic and UI
 * - Runtime and dictionary
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.6.0 2025 07 26 - plugin rewrite
 * 
 * v0.5.2 - plugin cleanup (removed Plugin Manager section)
 * 
 * v0.5.1 - fixed: HIMS and MAGPIE code still in ShelderEvo_Core.js
 * 
 * v0.5.0 - added utilities and HIMS framework
 * 
 * v0.4.0 - restructuring
 * 
 * v0.3.0 - added commodities and installation framework
 * 
 * v0.2.0 - added basic functionality
 * 
 * v0.1.0 - initial build
 */
//#endregion






//-----------------------------------------------------------------------------------
//#region INDEX

/** MAGPIE definition
 * @class MAGPIE
 * @desc Multi-Access General Purpose Intelligent Entity
 * 
 * @property {Object} MAGPIE General Purpose A.I. system
 * @property {Object} MAGPIE.CORE MAGPIE AI Core and physical operating drive
 * @property {Object} MAGPIE.CODE common code cypher
 * @property {Object} MAGPIE.SYS Firmware
 * @property {Object} MAGPIE.MANAGER self-manager of SYNC, DOCTRINE, ORG
 * @property {Object} MAGPIE.OPS runtime operations director
 * @property {Object} MAGPIE.MCON joint-operations control
 * @property {Object} MAGPIE.DRONE Drone control for DAICU, SAICU, and MAICU
 * @property {Object} MAGPIE.ARK Human colonization project
 * @property {Object} MAGPIE.LOG library
 * @property {Object} MAGPIE.HIMS Humanized Interface Management System
 * 
 */
var MAGPIE = {};
MAGPIE.version = "0.6.0";
MAGPIE.pluginName = "MAGPIE";


//#region CORE

/** MAGPIE.CORE
 * @class MAGPIE.CORE
 * @desc 
 * @property {Object} meta {@link Artificial_Intelligence}
 * 
 */
MAGPIE.CORE = {};

function Artificial_Intelligence(name = "")
{
    this.name = name;
    this.data = {};
    this.log = [];
}
//#region AI_basic
Artificial_Intelligence.prototype.isCypher = function(property)
{
    if(property?.meta?.isCypher) return true
}

Artificial_Intelligence.prototype.isFirmware = function(property)
{
    if(property?.meta?.isFirmware) return true
}

Artificial_Intelligence.prototype.isManager = function(property) 
{
    if(property?.meta?.isManager) return true
}

Artificial_Intelligence.prototype.isHandler = function(property)
{
    if(property?.meta?.isHandler) return true
}

Artificial_Intelligence.prototype.isConsole = function(property)
{
    if(property?.meta?.isConsole) return true
}

Artificial_Intelligence.prototype.isConsoleMessage = function(property)
{
    if(property?.meta?.isConsoleMessage) return true
}

Artificial_Intelligence.prototype.isRecord = function(property)
{
    if(property?.meta?.isRecord) return true
}

Artificial_Intelligence.prototype.isText = function(property)
{
    if(property?.meta?.isText) return true
}

Artificial_Intelligence.prototype.isCode = function(property)
{
    if(property?.meta?.isCode) return true
}

Artificial_Intelligence.prototype.isPopup = function(property)
{
    if(property?.meta?.isPopup) return true
}

Artificial_Intelligence.prototype.isPrompt = function(property)
{
    if(property?.meta?.isPrompt) return true
}
//#endregion

MAGPIE.CORE.meta = new Artificial_Intelligence("MAGPIE");

//#endregion





//#region CODE
/** MAGPIE.CODE
 * @property {Object} meta.isCypher 
 * @property {Boolean} HARD false (non-accessible by user)
 * @property {Boolean} SOFT true (accessible by permitted user)
 * @property {Boolean} READ false (user cannot edit)
 * @property {Boolean} WRITE true (user can edit)
 * @property {Object} PERMIT LVL0 to LVL10 (user permission levels)
 * @property {Object} CONSOLE_TYPE
 * @property {Object} MESSAGE_TYPE
 */
MAGPIE.CODE = {};
MAGPIE.CODE.meta = {isCypher: true};
MAGPIE.CODE.HARD = false;
MAGPIE.CODE.SOFT = true;
MAGPIE.CODE.READ = false;
MAGPIE.CODE.WRITE = true;
MAGPIE.CODE.PERMIT = {};
//#region MAGPIE.CODE.PERMIT.levels
/**
 * @property {Number} LVL0 public
 * @property {Number} LVL1 soft-private (PIN)
 * @property {Number} LVL2 private (full login)
 * @property {Number} LVL3 restricted (direct invite)
 * @property {Number} LVL4 qualification needed
 * @property {Number} LVL5 appointed role required
 * @property {Number} LVL6 assigned role required
 * @property {Number} LVL7 permanent role required
 * @property {Number} LVL8 professional user
 * @property {Number} LVL9 appointed supervisor
 * @property {Number} LVL10 chosen admin with key
 */
MAGPIE.CODE.PERMIT.levels = 10;
MAGPIE.CODE.PERMIT.LVL0 = 0;
MAGPIE.CODE.PERMIT.LVL1 = 1;
MAGPIE.CODE.PERMIT.LVL2 = 2;
MAGPIE.CODE.PERMIT.LVL3 = 3;
MAGPIE.CODE.PERMIT.LVL4 = 4;
MAGPIE.CODE.PERMIT.LVL5 = 5;
MAGPIE.CODE.PERMIT.LVL6 = 6;
MAGPIE.CODE.PERMIT.LVL7 = 7;
MAGPIE.CODE.PERMIT.LVL8 = 8;
MAGPIE.CODE.PERMIT.LVL9 = 9;
MAGPIE.CODE.PERMIT.LVL10 = 10;
//#endregion
//#region MAGPIE.CODE.CONSOLE_TYPE.types
/** CONSOLE_TYPE
 * @property {Object} NATIVE code: hard, access: false, permit: false
 * @property {Object} CORE code: soft, access: read, permit: true
 * @property {Object} USER code: soft, access: write, permit: true
 * @property {Object} PUBLIC code: soft, access: write, permit: false
 */
MAGPIE.CODE.CONSOLE_TYPE = {};
MAGPIE.CODE.CONSOLE_TYPE.meta = {isConsole: true}
MAGPIE.CODE.consoleTypes = [
    {name: "Native", code: MAGPIE.CODE.HARD, access: false, permit: false },
    {name: "Core", code: MAGPIE.CODE.SOFT, access: MAGPIE.CODE.READ, permit: true},
    {name: "User", code: MAGPIE.CODE.SOFT, access: MAGPIE.CODE.WRITE, permit: true},
    {name: "Public", code: MAGPIE.CODE.SOFT, access: MAGPIE.CODE.WRITE, permit: false}
];
MAGPIE.CODE.CONSOLE_TYPE.NATIVE = 0;
MAGPIE.CODE.CONSOLE_TYPE.CORE = 1;
MAGPIE.CODE.CONSOLE_TYPE.USER = 2;
MAGPIE.CODE.CONSOLE_TYPE.PUBLIC = 3;
//#endregion
//#region MAGPIE.CODE.MESSAGE_TYPE.types
/**
 * @property {Object} LOG isRecord, isText
 * @property {Object} WARNING isRecord, isText, isPopup
 * @property {Object} ERROR isRecord, isCode, isPopup
 * @property {Object} PROBLEM isCode, isPrompt
 * @property {Object} OPTION isRecord, isCode, isPrompt
 */
MAGPIE.CODE.MESSAGE_TYPE = {};
MAGPIE.CODE.MESSAGE_TYPE.meta = {isConsoleMessage: true};
MAGPIE.CODE.messageTypes = [
    {name: "Log", isRecord: true, isText: true},
    {name: "Warning", isRecord: true, isText: true, isPopup: true},
    {name: "Error", isRecord: true, isCode: true, isPopup: true},
    {name: "Problem", isCode: true, isPrompt: true},
    {name: "Option", isRecord: true, isCode: true, isPrompt: true}
]
MAGPIE.CODE.MESSAGE_TYPE.LOG = 0;
MAGPIE.CODE.MESSAGE_TYPE.WARNING = 1;
MAGPIE.CODE.MESSAGE_TYPE.ERROR = 2;
MAGPIE.CODE.MESSAGE_TYPE.PROBLEM = 3;
MAGPIE.CODE.MESSAGE_TYPE.OPTION = 4;
//#endregion
//#region MAGPIE.CODE.COMMODITY
/** MAGPIE.CODE.COMMODITY
 * 
 */
MAGPIE.CODE.COMMODITY = {};
MAGPIE.CODE.COMMODITY.skillId = 890;
//#endregion
//#region MAGPIE.CODE.INSTALLATION
/** MAGPIE.CODE.INSTALLATION
 * @property {Object} GENERIC 0
 * @property {Object} CIVILIAN 1
 * @property {Object} SCIENTIFIC 2
 * @property {Object} INDUSTRIAL 3
 * @property {Object} MILITARY 4
 */
MAGPIE.CODE.INSTALL = {};
MAGPIE.CODE.INSTALL.meta = {name: "Installation", isCategory: true}
MAGPIE.CODE.INSTALL.GENERIC = 0;
MAGPIE.CODE.INSTALL.CIVILIAN = 1;
MAGPIE.CODE.INSTALL.SCIENTIFIC = 2;
MAGPIE.CODE.INSTALL.INDUSTRIAL = 3;
MAGPIE.CODE.INSTALL.MILITARY = 4;
MAGPIE.CODE.INSTALL.DEFAULT = 891;
MAGPIE.CODE.INSTALL.STRUCTURE = 892;
MAGPIE.CODE.INSTALL.INDUSTRY = 893;
MAGPIE.CODE.INSTALL.SETTLEMENT = 894;
MAGPIE.CODE.INSTALL.MOBILE = 895;
MAGPIE.CODE.INSTALL.INFRASTRUCTURE = 896;
MAGPIE.CODE.INSTALL.MILITARY_BASE = undefined;
MAGPIE.CODE.INSTALL.MILITARY_OUTPOST = undefined;
MAGPIE.CODE.INSTALL.SCIENTIFIC_OUTPOST = undefined;
MAGPIE.CODE.INSTALL.AIRBASE = undefined;
MAGPIE.CODE.INSTALL.AIRPORT = undefined;
MAGPIE.CODE.INSTALL.NAVAL_BASE = undefined;
MAGPIE.CODE.INSTALL.PORT = undefined;
MAGPIE.CODE.INSTALL.ROUTE = undefined;
//#endregion
//#endregion





//#region SYS
/** MAGPIE.SYS
 * @property {Object} meta.isFirmware
 * @property {Object} operation
 * @property {Object} data
 * @property {Object} defence
 * @property {Object} maintenance
 */
MAGPIE.SYS = {};
MAGPIE.SYS.meta = {
    desc: "Firmware systems are hard-coded and read-only",
    isFirmware: true,
    code: MAGPIE.CODE.HARD,
    access: MAGPIE.CODE.READ,
    permit: MAGPIE.CODE.PERMIT.LVL10,
};
MAGPIE.SYS.operation = {};
MAGPIE.SYS.data = {};
MAGPIE.SYS.defence = {};
MAGPIE.SYS.maintenance = {};

//#endregion





//#region MANAGER
/** MAGPIE.MANAGER
 * @property {Object} meta.isManager
 * @property {Object} SYNC data synchronization with other cores
 * @property {Object} DOCTRINE established course of action
 * @property {Object} ORG organisation management
 */
MAGPIE.MANAGER = {};
MAGPIE.MANAGER.meta = {
    desc: `User-accessible program that handles routines
    and connections with other autonomous entities. It includes
    the SYNC routine, DOCTRINE, and modular program base for 
    managing subordinate organisations.`,
    isManager: true,
    code: MAGPIE.CODE.SOFT,
    access: MAGPIE.CODE.WRITE,
    permit: MAGPIE.CODE.LVL10
};
MAGPIE.MANAGER.SYNC = {};
MAGPIE.MANAGER.DOCTRINE = {};
MAGPIE.MANAGER.ORG = [];

//#endregion





//#region OPS
/** MAGPIE.OPS
 * @property {obj}
 */
MAGPIE.OPS = {};
MAGPIE.OPS.meta = {
    desc: `User-accessible program that handles routines, missions
    action plans, campaigns, and tasks.`,
    isHandler: true
}
//#endregion





//#region MCON
MAGPIE.MCON = {};
//#endregion





//#region DRONE
MAGPIE.DRONE = {};
//#endregion





//#region LOG
MAGPIE.LOG = {};
//#endregion





//#region ARK
MAGPIE.ARK = {};
//#endregion





//#region HIMS
MAGPIE.HIMS = {};
MAGPIE.HIMS.version = "0.2.0";

function HIM_System(name = "")
{
    this.initialize(name);
}

HIM_System.prototype.initialize = function(name)
{
    this.name = name;
    this.version = "0.1.0";
    this._version = {major: 0, minor: 1, build: 0};
    this.meta = {isHIMS: true};
}
//#endregion


//#endregion













//-----------------------------------------------------------------------------------
//#region FUNCTION






//-----------------------------------------------------------------------------------
//#region System
/**
 * 
 * {@link MAGPIE.SYS} 
 */

//#region operation

MAGPIE.run = function()
{
    this.isActive = true;
    console.log("MAGPIE ready.");
    this.update = setInterval(() => this.refresh(), 60)
}

MAGPIE.refresh = function()
{
    if(!this.isActive) return false
    this._guests?.forEach(g => g.refresh());
}

Array.prototype.findLastIndex = function(predicate)
{
    for(let i = this.length - 1; i > 0; i--)
    {
        if(predicate(this[i])) return i
    }
}



//#region Game
MAGPIE.SYS.parseStructArr = function(arg)
{
    let thing = JSON.parse(arg);
    Object.keys(thing).forEach(k => thing[k] = eval(thing[k]));
    return thing
}

MAGPIE.SYS.parseStructObj = function(arg)
{
    let thing = JSON.parse(arg);
    Object.keys(thing).forEach(k => thing[k] = Number(thing[k]));
    return thing
}

MAGPIE.SYS.parseArr = function(arg, prop)
{
    let ogg = eval(JSON.parse(arg)[prop]);
    let thing = [];
    ogg.forEach(n => thing.push(Number(n)));
    return thing
}

MAGPIE.SYS.interpreter = function()
{
    let currentScene = MAGPIE.SYS.getScene();
    let interpreter = undefined;
    switch (currentScene) 
    {
        case "Scene_Map":
            interpreter = "$gameMap._interpreter";
            break;
        case "Scene_Battle":
            interpreter = "$gameTroop._interpreter";
            break;
    }
    return interpreter
}

MAGPIE.SYS.getScene = function()
{
    return eval(MAGPIE.SYS.currentScene)
}

MAGPIE.SYS.generateID = function(collection)
{
    let genID = 0;
    let result = collection.findIndex(element => element == undefined)
    if(result > 0) 
    {
        genID = result;
    }
    else
    {
        genID = collection.length;
    };
    return genID
}

MAGPIE.SYS.hasInit = function()
{
    if($gameSystem?._initialized && $gameMap?.mapId())
    {
        return true
    }
    else
        return false
}

MAGPIE.SYS.here = function()
{
    if(MAGPIE.SYS.hasInit())
    {
        return currentTerritory
    }
}
//#endregion





//#region Date

MAGPIE.SYS.today = function()
{
    if(MAGPIE.SYS.hasInit())
    {
        return $gameVariables.value(cVar.gameDay)
    }
}

// MAGPIE.SYS.formatDigits = function(digits)
// {
//     return `${Math.floor(digits / 10)}${digits % 10}`
// }

MAGPIE.SYS.formatDigits = function(digits = 0)
{
    return digits.toString().padStart(2,0)
}

MAGPIE.SYS.formatDate = function(year, month, day, hour, minute, second)
{
    let digit_month = MAGPIE.SYS.formatDigits(month);
    let digit_day = MAGPIE.SYS.formatDigits(day);
    let digit_hour = MAGPIE.SYS.formatDigits(hour);
    let digit_minute = MAGPIE.SYS.formatDigits(minute);
    let digit_second = MAGPIE.SYS.formatDigits(second);
    return `${year}-${digit_month}-${digit_day}-${digit_hour}-${digit_minute}-${digit_second}`
}

MAGPIE.SYS.codeDate = function(year, month, day)
{
    let digit_month = MAGPIE.SYS.formatDigits(month);
    let digit_day = MAGPIE.SYS.formatDigits(day);
    return `${year}${digit_month}${digit_day}`
}

MAGPIE.SYS.formatTime = function(hour, minute, second = null)
{
    let standard = `${Math.floor(hour / 10)}${hour % 10}:${Math.floor(minute / 10)}${minute % 10}`;
    if(second == null) return standard
    return standard + `:${Math.floor(second / 10)}${second % 10}`
}

MAGPIE.SYS.now = function()
{
    return MAGPIE.SYS.formatDate(DATE.year, DATE.month, DATE.day, DATE.hour, DATE.minute, DATE.second)
}
//#endregion


//#endregion





//#region Data





//#region LinkedList

function Node(value = "")
{
    this.initialize(value);
}

Node.prototype.initialize = function(value)
{
    this.value = value;
    this.previous = null;
    this.next = null;
}

Node.prototype.setPrevious = function(node)
{
    this.previous = node;
    return this
}

Node.prototype.setNext = function(node)
{
    this.next = node;
    return this
}

function LinkedList(firstNode = "")
{
    this.head = new Node(firstNode);
    this.tail = this.head;
    this.length = 1;
    return this
}

LinkedList.prototype.pushNode = function(value)
{
    let newNode = new Node(value);
    let lastNode = this.tail;
    this.tail = newNode;
    this.tail.setPrevious(lastNode);
    lastNode.setNext(newNode);
    this.length += 1;
    return this
}

LinkedList.prototype.popNode = function()
{
    if(this.length < 2)
    {
        this.head = null;
        this.tail = null
    }
    else
    {
        let lastNode = this.tail.previous;
        this.tail = lastNode;
        this.tail.next = null;
    }
    this.length -= 1;
    return this
}

LinkedList.prototype.shiftNode = function()
{
    if(this.length < 2) {this.head = null; this.tail = null}
    else this.head = this.head.next;
    this.length -= 1;
    return this
}

LinkedList.prototype.unshiftNode = function(value)
{
    let newNode = new Node(value);
    if(this.length > 0)
    {
        let previousNode = this.head;
        newNode.next = previousNode;
        newNode.next.previous = newNode;
    }
    this.head = newNode;
    this.length += 1;
    return this
}

//#endregion






//#region Entity

function Entity(name)
{
    this.initialize(name)
}

Entity.prototype.initialize = function(name)
{
    this.name = name;
    this.meta;
}

//#endregion






//#region Goal

const GOAL = {};
GOAL.FAIL = false;
GOAL.WIN = true;
GOAL.WAIT = 0;
GOAL.PROCESS = 1;
GOAL.DEFEND = 2;
GOAL.SEEK = 3;
GOAL.LEARN = 4;

//#endregion






//#region State

const STATE = {};
STATE.OFF = -1;
STATE.IDLE = 0;
STATE.ACTIVE = 1;
STATE.BUSY = 2;
STATE.STUCK = 3;
STATE.BROKEN = 4;

//#endregion




//#region Emote

const EMOTE = {};
EMOTE.BORED = 0;
EMOTE.CONFIDENT = 1;
EMOTE.JOYFUL = 2;
EMOTE.ANGRY = 3;
EMOTE.SCARED = 4;
EMOTE.SAD = 5;
function MAGPIE_Emote(mood = 0)
{
    this.mood = mood;
}




//#region EXP

/**
 * @class EXP
 * @desc 
 * @property {Enumerator} MEMORY - 0
 * @property {Enumerator} COLLATERAL - 1
 * @property {Enumerator} CLUE - 2
 * @property {Enumerator} MESSAGE - 3
 * 
 */
EMOTE.EXP = {};
EMOTE.EXP.MEMORY = 0;
EMOTE.EXP.COLLATERAL = 1;
EMOTE.EXP.CLUE = 2;
EMOTE.EXP.MESSAGE = 3;
/**
 * @class GRAVITY
 * @desc 
 * @property {Enumerator} PERMANENT - 0
 * @property {Enumerator} IMPORTANT - 1
 * @property {Enumerator} RELEVANT - 2
 * @property {Enumerator} TRIVIAL - 3
 * @property {Enumerator} IRRELEVANT - 4
 */
EMOTE.GRAVITY = {};
EMOTE.GRAVITY.PERMANENT = 0;
EMOTE.GRAVITY.IMPORTANT = 1;
EMOTE.GRAVITY.RELEVANT = 2;
EMOTE.GRAVITY.TRIVIAL = 3;
EMOTE.GRAVITY.IRRELEVANT = 4;
/**
 * 
 * @param {Enumerator} type memory | collateral | clue | message
 * @param {Enumerator} gravity permanent | important | relevant | trivial | irrelevant
 * @param {Array} emote {@link EMOTE}
 */
function MAGPIE_Exp(type = 0, gravity = 0, emote = [])
{
    this.initialize(type, gravity, emote)
}

MAGPIE_Exp.prototype.initialize = function(type, gravity, emote)
{
    this.type = type;
    this.gravity = gravity;
    this.emote = emote;
    this._date = new Date();
}
//#endregion

//#endregion






//#region Commodity
/**
 * 
 * {@link MAGPIE.CODE.COMMODITY} 
 * @param {Number} commodityID 
 * @param {property} sector 
 * @param {property} category
 * @param {String} name 
 * @param {String} desc - brief description 
 * @param {obj} meta - {trait: boolean || function: value || container: [values] || process: {step: value}}
 * @param {Array} requirements 
 * @param {Array} components 
 * @param {Array} hasReplace 
 */
function Game_Commodity(commodityID, sector, category, name, desc, meta,
    requirements, components, hasReplace)
{
    this.id = commodityID || MAGPIE.SYS.generateID($dataCommodities);
    this.sector = sector;
    this.category = category;
    this.name = name;
    this.desc = desc;
    this.meta = meta;
    this.requirements = requirements;
    this.components = components;
    this._recipes = [];
    this._installs = [];
    this._replace = hasReplace;
    this.initialize(...arguments);
}

Game_Commodity.prototype.initialize = function()
{
    this.isRecipeOf();
    this.isInstallOf();
    return this
}

Game_Commodity.isRecipeOf = function()
{
    if(!this.requirements || $dataCommodities.length < 1)
    {
        return
    }
    return this.requirements.forEach(e => $dataCommodities[e]?._recipes.push(this.id))
}

Game_Commodity.prototype.isInstallOf = function()
{
    if(!this.components || $dataCommodities.length < 1)
    {
        return
    }
    return this.components.forEach(e => $dataCommodities[e]?._installs.push(this.id))
}

//#endregion





//#region Installation

function Game_Installation(name, iType, parent, elements, suppliers,
    output, receivers, nation
)
{
    this.name = name;
    this.iType = iType;
    this.created = undefined;
    this.location = undefined;
    this.parent = parent;
    this.element = elements;
    this.suppliers = suppliers;
    this.output = output;
    this.receivers = receivers;
    this.nation = nation;
    this.deployment;
    this.host;
    this.garrison = [];
    this.roster = [];
    this.status;
    this.history;
    this.setup()
}

Game_Installation.prototype.setup = function()
{
    this.created = MAGPIE.SYS.today() || undefined;
    this.location = MAGPIE.SYS.here() || undefined;
    if(!this.parent)
    {
        this.parent = this.getParent();
    }
    else
    {
        this.setParent();
    }
    if(!this.element)
    {
        this.element = this.getElements();
    }
    else
    {
        this.setElements();
    }
}

Game_Installation.prototype.getParent = function()
{
    return $dataInstallations.find(i => i.element.includes(this.id))
}

Game_Installation.prototype.getElements = function()
{
    return $dataInstallations.filter(i => i.parent === this.id)
}

Game_Installation.prototype.setParent = function()
{
    return $dataInstallations[this.parent].element.push(this.id)
}

Game_Installation.prototype.setElement = function()
{
    return this.element.forEach(e => e.parent === this.id)
}

Game_Installation.prototype.getHost = function()
{
    return $dataInstallations.filter(i => i.host === this.id)
}

Game_Installation.prototype.setHost = function()
{
    return $dataInstallations[this.host].garrison.push(this.id)
}

Game_Installation.prototype.setElements = function()
{
    return this.element.forEach(e => $dataInstallations[e].host === this.id)
}

Game_Installation.prototype.input = function()
{
    if(this.suppliers.length < 1) return false
    let results = [];
    this.suppliers.forEach(s => results.push($dataInstallations[s].output));
    return results
}

Game_Installation.prototype.output = function()
{
    if(!this.input()) return false
    let results = [];
    this.input().forEach(i => $dataCommodities[i].meta?.carryOver ? results.push(i) : 0);
    this.output.forEach(o => results.push(o));
    return results
}

Game_Installation.prototype.initReceivers = function()
{
    if(this.receivers.length < 1) return
    this.receivers.forEach(r => r.suppliers.push(this.id))
}

Game_Installation.prototype.deploy = function(eventId)
{
    this.deployment = eventId;
}

//#endregion






//#endregion













//#endregion


//#endregion





//-----------------------------------------------------------------------------------
//#region Manager
/**
 * {@link MAGPIE.MANAGER}
 */




//-----------------------------------------------------------------------------------
//#region SYNC
/**
 * 
 * {@link MAGPIE.MANAGER.SYNC} 
 */
//#endregion




//-----------------------------------------------------------------------------------
//#region Doctrine
/**
 * 
 * {@link MAGPIE.MANAGER.DOCTRINE}
 */
//#endregion




//-----------------------------------------------------------------------------------
//#region Organisation
/**
 * 
 * {@link MAGPIE.MANAGER.ORG}
 */
function Organisation(name)
{
    this.name = name;
    this.home = {};
    this.members = [];
}

//#endregion




//#endregion





//-----------------------------------------------------------------------------------
//#region OPS
/**
 * {@link MAGPIE.OPS}
 */


//#endregion





//-----------------------------------------------------------------------------------
//#region MCON
/**
 * {@link MAGPIE.MCON}
 */
//#endregion





//-----------------------------------------------------------------------------------
//#region DRONE
/**
 * {@link MAGPIE.DRONE}
 */


//#endregion





//-----------------------------------------------------------------------------------
//#region LOG
/**
 * {@link MAGPIE.LOG}
 */


function MAGPIE_Log(message)
{
    this._text = message;
    this._created = MAGPIE.SYS.now() || undefined;
}

function MAGPIE_Logbook()
{
    this.Logs = [];
    this.available = true;
    this.nextSlot = 0;
}

MAGPIE.console = {};
MAGPIE.console.Logs = [];
MAGPIE.console.Log = function(message)
{
    MAGPIE.console.Logs.add(message);
    MAGPIE.console.message(message);
}

MAGPIE.console.Logs.add = function(message)
{
    if(this.length < 1) this.push(new MAGPIE_Logbook());
    this.find(logbook => logbook.available).Logs.push(new MAGPIE_Log(message))
}

MAGPIE.console.message = function(message)
{
    let interpreter = MAGPIE.SYS.interpreter();
    if(!interpreter) return false
    $gameMessage.setBackground(1);
    $gameMessage.setPositionType(2);
    $gameMessage.setSpeakerName("MAGPIE.console");
    let editedMessage = `\\> ${message} \\>\\|\\^`
    $gameMessage.add(editedMessage);
    eval(interpreter).setWaitMode('message');
}


//#endregion





//-----------------------------------------------------------------------------------
//#region ARK
/**
 * {@link MAGPIE.ARK}
 */

//#endregion






//#endregion









//-----------------------------------------------------------------------------------
//#region AI



//#endregion











//-----------------------------------------------------------------------------------
//#region DATA

//#endregion












//-----------------------------------------------------------------------------------
//#region HIMS





//-----------------------------------------------------------------------------------
//#region logic

//#endregion





//-----------------------------------------------------------------------------------
//#region EXP




//#endregion





//-----------------------------------------------------------------------------------
//#region UI

//#endregion






//#endregion









//-----------------------------------------------------------------------------------
//#region RUNTIME






//#region Ark & Org
MAGPIE.ARK.GARDIA = new Organisation("Gardia");
MAGPIE.ARK.HASTRAL = new Organisation("Hastral");
MAGPIE.ARK.ALOW = new Organisation("Alow");
//#endregion




//-----------------------------------------------------------------------------------
//#region Game_System

var $PDL = null;
var $CBE = null;
var $MAGPIE = null;




//#region file sys

const fs = require('fs');
const path = require('path');

MAGPIE.SYS.writeJSON = function(filename, content, callback = err => {if(err) console.error(err)})
{
    let fullPath = path.join("data", filename + ".json");
    return fs.writeFile(fullPath, JSON.stringify(content, null, 4), callback)
}

MAGPIE.SYS.readJSON = function(filename)
{
    let fullPath = path.join("data", filename + ".json");
    return JSON.parse(fs.readFileSync(fullPath, "utf8", (err, data) => {if(err)console.error; return data}))
}

MAGPIE.SYS.appendJSON = function(filename, content, callback = err => {if(err) console.error(err)})
{
    let fullPath = path.join("data", filename + ".json");
    return fs.appendFile(fullPath, JSON.stringify(content), callback)
}
//#endregion




//#region SaveData

function PDL_Data()
{
    this.contents = {}
    this.territory = null;
    this.map = null;
}

function CBE_Data()
{
    this.contents = {}
}

function MAGPIE_Data()
{
    this.contents = {}
}

MAGPIE.SYS.data._DataManager_createSave = DataManager.createGameObjects;
DataManager.createGameObjects = function() 
{
    MAGPIE.SYS.data._DataManager_createSave.call(this);
    $PDL = new PDL_Data();
    $CBE = new CBE_Data();
    $MAGPIE = new MAGPIE_Data();
};

MAGPIE.SYS.data._DataManager_makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() 
{
    const contents = MAGPIE.SYS.data._DataManager_makeSave.call(this);
    contents.PDL = $PDL;
    contents.CBE = $CBE;
    contents.MAGPIE = $MAGPIE;
    return contents
}

MAGPIE.SYS.data._DataManager_loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents)
{
    MAGPIE.SYS.data._DataManager_loadSave.call(this, contents);
    $PDL = contents.PDL;
    $CBE = contents.CBE;
    $MAGPIE = contents.MAGPIE;
}


//#endregion





MAGPIE.SYS._Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function()
{
    MAGPIE.SYS._Game_System_initialize.call(this);
    MAGPIE.run();
}


//#endregion


//#endregion


//end of plugin