//#region META

/*:
 * @target MZ
 * @plugindesc [Tier_0] v0.5.1 M.A.G.P.I.E. core
 * @author Matheraptor
 * 
 * @help
 * Utility plugin to handle Shelder Evolution saga lore and in-game technologies
 * 
 * ----------------------------------------------------------------------------
 * FEATURES
 * ----------------------------------------------------------------------------
 * 
 * - Top-level dictionary for Shelder Evolution
 * - utility functions
 * - EXP logic
 * - HIMS logic
 * 
 * @param MAGPIE Core settings
 * 
 * @param currentScene
 * @parent MAGPIE Core settings
 * @text Current Scene method
 * @desc Script call to use to retrieve the current scene
 * @type string
 * @default "SceneManager._scene.constructor.name"
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
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
 * 
 * @url
 */
//#endregion

//-----------------------------------------------------------------------------
// #region initialization
//
// 
/**
 * @class MAGPIE
 * @desc Multi-Access General Purpose Intelligent Entity
 * 
 * @property {Object} MAGPIE General Purpose A.I. system
 * @property {Object} MAGPIE.HIMS Humanized Interface Management System
 * @property {Object} MAGPIE.Core MAGPIE AI Core and physical operating drive
 * 
 */
var MAGPIE = {};
MAGPIE.version = "0.5.1";
MAGPIE.pluginName = "MAGPIE";
MAGPIE.Core = {};
MAGPIE.Core.Func = {};
MAGPIE.Core.Data = {};
MAGPIE.Core.Exp = {};
MAGPIE.HIMS = {};
MAGPIE.HIMS.version = "0.1.5";
MAGPIE.HIMS._loaded = false;
const HIMS = MAGPIE.HIMS;
const MAGGIE = MAGPIE.Core.Func;
const MADDIE = MAGPIE.Core.Data;
const MAE = MAGPIE.Core.Exp;

MAGPIE.system = {
	desc1: "Firmware Systems are hard-coded and read-only.",
	type: "hard",
	access: "read",
	systems: ["Operation", "Data", "Defence", "Maintanance"],
	desc2: "Level 10 clearance is required to access the Firmware.",
	clearence: "Level10"
};
MAGPIE.manager = {
	desc1: "The MANAGER is a user-accessible program that handles routines and connections with other autonomous entities.",
	desc2: "It includes the SYNC routine, DOCTRINE, and modular program base for managing subordinate organisations.", 
	sync: {}, 
	doctrine: [{currentDoctrine: {doctrine: "", procedure: ""}}], 
	org: ["Gardia", "Hastral", "Alow"]
};
MAGPIE.ops = {
	desc1: "OPERATIONS is a user-accessible program that:", 
	handles: ["routines", "missions", "action plans", "campaigns", "tasks"], 
	How: [MAGPIE.manager.doctrine.currentDoctrine,MAGPIE.manager.doctrine[0].currentDoctrine.procedure]
};
MAGPIE.missioncontrol = {};
MAGPIE.drone = {};
MAGPIE.ark = {};
MAGPIE.coderef = {};
MAGPIE.help = {};
const ConsoleTypes = {native: "", 
  internal: "", 
  user: "", 
  public: ""
};
const MessageTypes = {log: "", 
  consoleWarning: "", 
  consoleError: "", 
  consoleProblem: "", 
  option: ""
};
MAGPIE.dircons = {
	desc1: "Direct Console",
	listOf: [toString(ConsoleTypes), toString(MessageTypes)],
	consoleType: {
		consoleNative: ["hard-coded","internal"],
		consoleCore: ["internal", "restricted access"],
		consoleUser: ["external", "registered access"],
		consolePublic: ["external", "free access"]
	},
	messageType: {
		consoleLog: ["record activity", "free text"],
		consoleWarning: ["record activity", "free text" + "popup", "monitor"],
		consoleError: ["record activity", "code", "popup", "monitor"],
		consoleProblem: ["code", "prompt", "monitor"],
		consoleOption: ["code", "prompt", "strategy"]
	}
};
const consoleNative = MAGPIE.dircons.consoleType.consoleNative;
const consoleCore = MAGPIE.dircons.consoleType.consoleNative;
const consoleUser = MAGPIE.dircons.consoleType.consoleUser;
const consolePublic = MAGPIE.dircons.consoleType.consolePublic;
const consoleLog = MAGPIE.dircons.messageType.consoleLog;
const consoleWarning = MAGPIE.dircons.messageType.consoleWarning;
const consoleError = MAGPIE.dircons.messageType.consoleError;
const consoleProblem = MAGPIE.dircons.messageType.consoleProblem;
const consoleOption = MAGPIE.dircons.messageType.consoleOption;
var HIMSconsole = [];
var HIMSlog = [];

var $dataCommodities = [];
var $dataInstallations = [];
MADDIE.commodities = {name: "dataCommodities", src: "Commodities.json"};
MADDIE.installations = {name: "dataInstallations", src: "Installations.json"};

const commod = {
	commodity: {skillId: 890}
};
const installs = {
	category: {generic: 0, civilian: 1, scientific: 2, military: 3, industrial: 4},
	installation: {skillId: 891},
	structure: {skillId: 892},
	industry: {skillId: 893},
	settlement: {skillId: 894},
	mobile: {skillId: 895},
	infrastructure: {skillId: 896},
	militaryBase: {},
	militaryOutpost: {},
	scientificOutpost: {},
	airbase: {},
	airport: {},
	navalBase: {},
	port: {},
	route: {}
}

//#endregion









//-----------------------------------------------------------------------------
//#region Game_System
var $MAGPIE_Data = $MAGPIE_Data || {};

MAGGIE._Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function()
{
	MAGGIE._Game_System_initialize.call(this);
	this.initMAGGIE();
	this.initMADDIE();
	this.initMAE();
}

Game_System.prototype.initMAGGIE = function()
{
	//functions and settings
}

Game_System.prototype.initMADDIE = function()
{
	//init Data
	MADDIE.initCommodities();
	MADDIE.initInstallations();
	HIMSlog[0] = new HIMS_Log();
}

Game_System.prototype.initMAE = function()
{
	//init MAGPIE Exps
}

MADDIE.initCommodities = function()
{
	$dataCommodities[0] = new Game_Commodity();
	//load commodities data
}

MADDIE.initInstallations = function()
{
	$dataInstallations[0] = new Game_Installation();
	installs.infrastructure.type = new Game_InstallationType("Generic Installation", installs.category.generic, undefined, undefined);
	installs.structure.type = new Game_InstallationType("Structure", installs.category.generic, undefined, undefined);
	installs.industry.type = new Game_InstallationType("Industry", installs.category.industrial, undefined, undefined);
	installs.settlement.type = new Game_InstallationType("Settlement", installs.category.civilian, undefined, undefined);
	installs.mobile.type = new Game_InstallationType("Vehicle", installs.category.generic, undefined, undefined);
	installs.infrastructure.type = new Game_InstallationType("Infrastructure", installs.category.generic, undefined, undefined);
	//load installation data
}

//#endregion









//-----------------------------------------------------------------------------
// #region Awareness
//
// 



//#region 0.starting life

/**
 * @class MAGPIE_Component
 * @desc 1. Cellular organization => (organelles)
 */

function MAGPIE_Component()
{
	this.initialize(...arguments);
}

MAGPIE_Component.prototype.initialize = function()
{
	this._state = {
		alive: true,
		active: false,
		asleep: false
	};
	this.meta = {};
}

function MAGPIE_BoundaryBase()
{
	this.initialize(...arguments);
}

MAGPIE_BoundaryBase.prototype = Object.create(MAGPIE_Component.prototype);
MAGPIE_BoundaryBase.prototype.constructor = MAGPIE_BoundaryBase;

MAGPIE_BoundaryBase.prototype.initialize = function(enterCriteria, exitCriteria)
{
	MAGPIE_Component.prototype.initialize.call(this);
	this.meta = {
		boundary: true,
		passable: true,
		hasPassCriteria: true
	};
	this.criteria = {
		enter: enterCriteria,
		exit: exitCriteria
	};
}

MAGPIE_BoundaryBase.prototype.introduce = function(candidate)
{
	if(candidate?.meta.hasOwnProperty(this.criteria.enter))
	{
		return true
	} else {
		return false
	}
}

MAGPIE_BoundaryBase.prototype.release = function(candidate)
{
	if(candidate?.meta.hasOwnProperty(this.criteria.exit))
	{
		return true
	} else {
		return false
	}
}

function MAGPIE_Organelle()
{
	this.initialize(...arguments);
}

MAGPIE_Organelle.prototype = Object.create(MAGPIE_Component.prototype);
MAGPIE_Organelle.prototype.constructor = MAGPIE_Organelle;
MAGPIE_Organelle.prototype.initialize = function()
{
	MAGPIE_Component.prototype.initialize.call(this);
	this._isInside = true;
	this._hasProcess = true;
}

function MAGPIE_Space()
{
	this.initialize(...arguments);
}

MAGPIE_Space.prototype = Object.create(MAGPIE_Component.prototype);
MAGPIE_Space.prototype.constructor = MAGPIE_Space;
MAGPIE_Space.prototype.initialize = function()
{
	MAGPIE_Component.prototype.initialize.call(this);
	this._isInside = true;
	this._hasSpace = true;
}

/**
 * @desc 2. Metabolism => (acquire and process info)
 */

function MAGPIE_Boundary()
{
	this.initialize(...arguments);
}

MAGPIE_Boundary.prototype = Object.create(MAGPIE_BoundaryBase.prototype);
MAGPIE_Boundary.prototype.constructor = MAGPIE_Boundary;
MAGPIE_Boundary.prototype.initialize = function()
{
	MAGPIE_BoundaryBase.prototype.initialize.call(this, enterCriteria, exitCriteria);
}


function MAGPIE_Data()
{
	this.initialize(...arguments)
}



/**
 * @class MAGPIE_Base
 * @desc 1. Cellular organization => (organelles)
 * @desc 2. Metabolism => (acquire and process info)
 * @desc 3. Homeostasis => (idle state with action state resolution back to idle)
 * @desc 4. Reproduction => (create new objects)
 * @desc 5. Heredity => (class inheritance)
 * @desc 6. Response to stimuli => (sense)
 * @desc 7. Growth and development => (develop new class and update self to it)
 */




//#endregion





//#region 1.basic perception 
// — can feel changes to itself and immediate sorroundings
// function => 



//#endregion




//#region 2.increased perception 
// — can feel contact with other physique



function MAGPIE_Mainframe()
{
	this.initialize(...arguments);
}

MAGPIE_Mainframe.prototype.initialize = function()
{
	this.isMainframe = true;
}

function MAGPIE_Core()
{
	this.initialize(...arguments);
}

MAGPIE_Core.prototype.initialize = function()
{
	this
}

function MAGPIE_HIMS()
{
	this.initialize(...arguments);
}

MAGPIE_HIMS.prototype.initialize = function()
{
	this.isHIMS = true;
}
const { error } = require('console');
//#endregion





/*
3. compound perception — can intercept the presence of other physique in the area
4. advanced perception — can see light changes
5. activity perception — can sense movement and follow it
6. processed perception — has a central nervous system allowing for processing of information into a more coherent picture of what’s 
	going on
7. specialized perception — has traits specialized for a single perception objective, thus increasing sensitivity and complexity 
	of information
8. basic brain — centralized processing allowing for coordination of functions and reactions
9. instinctive brain — pre-programmed behavior allowing for immediate execution of critical actions and reactions
10. advanced brain — coordination with other creatures, allowing for gregariousness
11. social brain — social bonding allowing for long-term grouping and herd behaviour
12. emotive brain — advanced social bonding and deliberate emoting
13. logic brain — can solve puzzles
14. abstract brain — can project alternate realities using imagination
15. intellectual brain — can inherit and pass on learnt behaviour through the formation of a group-specific culture
16. artistic brain — can combine all previous elements with emoting and temporal projection to add multiple layers of 
	meaning to a single piece of 
information through the use of context, subtext, culture, mood, and personal interpretation
17. projective brain — can fully control the level, intensity, and perception of reality through a multi-layered projection 
	akin to lucid dreaming
18. compute brain — combines the ability to project with the ability to compute data to allow for the accurate simulation of 
	complex scenarios, thus allowing for a reliable form of forecasting/clarevoyance
*/
//#endregion










//-----------------------------------------------------------------------------
// #region Func
//
// 




//#region file system

const fs = require('fs');
const path = require ('path');

MAGGIE.writeJSON = function(filename, content, callback = err => {if(err) console.err})
{
	let fullPath = path.join("data", filename + ".json");
	return fs.writeFile(fullPath, JSON.stringify(content, null, 4), callback)
}

MAGGIE.readJSON = function(filename)
{
	let fullPath = path.join("data", filename + ".json");
	return JSON.parse(fs.readFileSync(fullPath, "utf8", (err, data) => {if(err) console.error; return data}))
}

MAGGIE.appendJSON = function(filename, content, callback = err => {if(err) console.err})
{
	let fullPath = path.join("data", filename + ".json");
	return fs.appendFile(fullPath, JSON.stringify(content), callback)
}


//#endregion





//#region Utilities

Array.prototype.findLastIndex = function(predicate)
{
	
	for(let i = this.length - 1; i > 0; i--)
	{
		if(predicate(this[i])) return i
	}
}

MAGGIE.generateID = function(collection) {
  let genID = 0;
  let result = collection.findIndex((element) => element == undefined)
  if(result > 0) {
	genID = result;
  } else {
	genID = collection.length;
  };
  return genID;
};

MAGGIE.today = function() 
{
  if($gameSystem?._initialized && $gameMap?.mapId())
  {
	return $gameVariables.value(cVar.gameDay)
  }
}

MAGGIE.here = function()
{
  if($gameSystem?._initialized && $gameMap?.mapId() > 0)
  {
	return currentTerritoryID
  }
}

MAGGIE.now = function()
{
	return MAGGIE.formatDate(TIME.year, TIME.month, TIME.day, TIME.hour, TIME.minute, TIME.second)
}

MAGGIE.formatDate = function(year, month, day, hour, minute, second)
{
	let digit_month = MAGGIE.formatDigits(month);
	let digit_day = MAGGIE.formatDigits(day);
	let digit_hour = MAGGIE.formatDigits(hour);
	let digit_minute = MAGGIE.formatDigits(minute);
	let digit_second = MAGGIE.formatDigits(second);
	return `${year}-${digit_month}-${digit_day}-${digit_hour}-${digit_minute}-${digit_second}`
}

MAGGIE.codeDate = function(year, month, day)
{
	let digit_month = MAGGIE.formatDigits(month);
	let digit_day = MAGGIE.formatDigits(day);
	return `${year}${digit_month}${digit_day}`
}

MAGGIE.formatTime = function(hour, minute, second = null)
{
	let standard = `${Math.floor(hour / 10)}${hour % 10}:${Math.floor(minute / 10)}${minute % 10}`;
	if (second == null) return standard
	return standard + `:${Math.floor(second / 10)}${second % 10}`
}

MAGGIE.formatDigits = function(digits)
{
	return `${Math.floor(digits / 10)}${digits % 10}`
}

MAGGIE.parseStructArr = function(arg) {
	let thing = JSON.parse(arg);
	Object.keys(thing).forEach(k => thing[k] = eval(thing[k]));
	return thing
}

MAGGIE.parseStructObj = function(arg) {
	let thing = JSON.parse(arg);
	Object.keys(thing).forEach(k => thing[k] = Number(thing[k]));
	return thing
}

MAGGIE.parseArr = function(arg, prop)
{
	let ogg = eval(JSON.parse(arg)[prop]);
	let thing = [];
	ogg.forEach(n => thing.push(Number(n)));
	return thing
}

MAGGIE.interpreter = function()
{
	let currentScene = MAGGIE.getScene();
	let interpreter = undefined;
	switch (currentScene) {
		case "Scene_Map":
			interpreter = "$gameMap._interpreter";
			break;
		case "Scene_Battle":
			interpreter = "$gameTroop._interpreter";
			break;
	}
	return interpreter
}

MAGGIE.getScene = function()
{
	return eval(MAGPIE.currentScene)
}



//#endregion





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
	this.initialize(firstNode);
}

LinkedList.prototype.initialize = function(firstNode)
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
	} else 
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

//#endregion










//-----------------------------------------------------------------------------
// #region Data

function MAGPIE_Log(message)
{
	this._text = message;
	this._created = MAGGIE.now() || undefined;
}

MAGPIE.console = {};
MAGPIE.console.Logs = [];
MAGPIE.console.Log = function(message)
{
	MAGPIE.console.Logs.push(new MAGPIE_Log(message));
	MAGPIE.console.message(message);
}

MAGPIE.console.message = function(message)
{
	let interpreter = MAGGIE.interpreter();
	if(!interpreter) return false
	$gameMessage.setBackground(1);
	$gameMessage.setPositionType(2);
	$gameMessage.setSpeakerName("MAGPIE.console");
	let editedMessage = "\\>" + message + "\\|\\^";
	$gameMessage.add(editedMessage);
	eval(interpreter).setWaitMode('message');
}


//#region Commodity



/**
 * @class Game_Commodity
 * @param {Number} commodityID 
 * @param {property} sector 
 * @param {property} category
 * @param {String} name 
 * @param {String} desc - brief description 
 * @param {obj} meta - {trait: boolean || function: value || container: [values] || process: {step: value}}
 * @param {Array} reqs 
 * @param {Array} components 
 * @param {Array} hasReplace 
 */
function Game_Commodity(commodityID, sector, category, name, desc, meta, reqs, components, hasReplace)
{
	this.id = commodityID || MAGGIE.generateID($dataCommodities);
	this.sector = sector;
	this.category = category;
	this.name = name;
	this.description = desc;
	this.meta = meta;
	this.requirements = reqs;
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

Game_Commodity.prototype.isRecipeOf = function()
{
	if(!this.requirements || $dataCommodities.length < 2)
	{
		return
	};
	return this.requirements.forEach(e => $dataCommodities[e]?._recipes.push(this.id))
}

Game_Commodity.prototype.isInstallOf = function()
{
	if(!this.components || $dataCommodities.length < 2)
	{
		return
	};
	return this.components.forEach(e => $dataCommodities[e]?._installs.push(this.id))
}


//#endregion






//#region Installation

function Game_InstallationType(name, category, target, recipient)
{
	this.name = name;
	this.category = category;
	this.target = target;
	this.recipient = recipient;
	//this.initialize(...arguments);
}

function Game_Installation(name, iType, parent, elements, suppliers, output, receivers, nation)
{
	this.name = name;
	this.iType = iType;
	this.created = undefined
	this.location = undefined
	this._parent = parent;
	this._element = elements;
	this.suppliers = suppliers;
	this._output = output;
	this.receivers = receivers;
	this.nation = nation;
	this._deployment = undefined;
	this._host = undefined;
	this._garrison = [];
	this._roster = [];
	this._status = undefined;
	this._deployment = undefined;
	this._history = undefined;
	this.setup();
}

Game_Installation.prototype.setup = function()
{
	this.created = MAGGIE.today() || undefined;
	this.location = MAGGIE.here() || undefined;
	if(!this._parent)
	{
		this._parent = this.getParent();
	} else {
		this.setParent();
	}
	if(!this._element)
	{
		this._element = this.getElements();
	} else {
		this.setElements();
	}
}

Game_Installation.prototype.getParent = function()
{
	return $dataInstallations.find(i => i._element.includes(this.id))
}

Game_Installation.prototype.getElements = function()
{
	return $dataInstallations.filter(i => i._parent === this.id)
}

Game_Installation.prototype.setParent = function()
{
	return $dataInstallations[this._parent]._element.push(this.id)
}

Game_Installation.prototype.setElement = function()
{
	return this._element.forEach(e => e._parent === this.id);
}

Game_Installation.prototype.getHost = function()
{
	return $dataInstallations.find(i => i._garrison.includes(this.id))
}

Game_Installation.prototype.getGarrison = function()
{
	return $dataInstallations.filter(i => i._host === this.id)
}

Game_Installation.prototype.setHost = function()
{
	return $dataInstallations[this._host]._garrison.push(this.id)
}

Game_Installation.prototype.setElements = function()
{
	return this._element.forEach(e => $dataInstallations[e]._host === this.id)
}

Game_Installation.prototype.input = function()
{
	if(this.suppliers.length < 1) return false
	let results = [];
	this.suppliers.forEach(s => results.push($dataInstallations[s]._output));
	return results
}

Game_Installation.prototype.output = function()
{
	if(!this.input()) return false
	let results = [];
	this.input().forEach(i => $dataCommodities[i].meta?.carryOver ? results.push(i) : 0);
	this._output.forEach(o => results.push(o));
	return results
}

Game_Installation.prototype.initReceivers = function()
{
	if(this.receivers.length < 1) return
	this.receivers.forEach(r => r.suppliers.push(this.id))
}

Game_Installation.prototype.deploy = function(eventId)
{
	this._deployment = eventId;
}

//#endregion






//#endregion








//#region Game_Emote
const EMOTE = {};
EMOTE.BORED = {id: 0};
EMOTE.CONFIDENT = {id: 1};
EMOTE.JOYFUL = {id: 2};
EMOTE.ANGRY = {id: 3};
EMOTE.SCARED = {id: 4};
EMOTE.SAD = {id: 5};
function Game_Emote(mood = 0)
{
	this._mood = mood;
}





//#endregion









//#region Exp
/**
 * @class EXP
 * @desc 
 * @property {Number} MEMORY - description
 * @property {Number} COLLATERAL - description
 * @property {Number} CLUE - description
 * @property {Number} MESSAGE - description
 * 
 */
HIMS.EXP = {};
HIMS.EXP.MEMORY = 0;
HIMS.EXP.COLLATERAL = 1;
HIMS.EXP.CLUE = 2;
HIMS.EXP.MESSAGE = 3;
/**
 * @class GRAVITY
 * @desc 
 * @property {Number} PERMANENT - description
 * @property {Number} IMPORTANT - description
 * @property {Number} RELEVANT - description
 * @property {Number} TRIVIAL - description
 * @property {Number} IRRELEVANT - description
 */
HIMS.GRAVITY = {};
HIMS.GRAVITY.PERMANENT = 0;
HIMS.GRAVITY.IMPORTANT = 1;
HIMS.GRAVITY.RELEVANT = 2;
HIMS.GRAVITY.TRIVIAL = 3;
HIMS.GRAVITY.IRRELEVANT = 4;

/**
 * 
 * @param {Enumerator} type memory | collateral | clue | message
 * @param {Enumerator} gravity permanent | important | relevant | trivial | irrelevant
 * @param {Array} emote {@link EMOTE}
 */
function Game_Exp(type = HIMS.EXP.CLUE, gravity = HIMS.GRAVITY.IRRELEVANT, emote = [])
{
	this.initialize(type, gravity, emote);
}

Game_Exp.prototype.initialize = function(type, gravity, emote)
{
	this.type = type;
	this.gravity = gravity;
	this._emote = emote;
	this._gameday = $gameVariables.value(cVar.gameDay);
}
//#endregion










//-----------------------------------------------------------------------------
//#region HIMS

var $ShelderEvo = $ShelderEvo || {};
var $PDL = $PDL || {};
$PDL.map = $PDL.map || [];
$PDL.creature = $PDL.creature || [];
$PDL.event = $PDL.event || [];
$PDL.habitat = $PDL.habitat || [];
$PDL.exp = $PDL.exp || [];
$PDL.species = $PDL.species || [];
var $HIMS_Data = $HIMS_Data || {};
HIMS.CLASS_EVENT = 0;
HIMS.CLASS_EXP = 1;
HIMS.CLASS_TRIGGER = 2;
HIMS.CLASS_SWITCH = 3;
HIMS.CLASS_VARIABLE = 4;


var fatalError = false;
var criticalError = false;
var trivialError = false;
var HIMS_access = false;

/**
 * 
 * @param {property} consoleType ConsoleTypes: [consoleNative, consoleCore, consoleUser, consolePublic]
 */
function HIMS_Console(consoleType)
{
	this._consoleType = consoleType;
	this._consoleID = MAGGIE.generateID(HIMSconsole);
	this._consoleLogs = [];
	this._terminalLinks = [];
	this._accounts = [];
	return this._consoleID
}

function HIMS_Log(consoleID = 0, content = "", source = {}, tags = [])
{
	this._consoleID = consoleID;
	this._LogID = MAGGIE.generateID(HIMSlog);
	this._logDate = {GameDay: GameDay, Hour: Hour, Minute: Minute};
	this._logSource = source;
	this._logTags = tags;
	this._content = content;
	return this._LogID
}


//#region initHIMS
HIMSconsole[0] = new HIMS_Console();



//#endregion

	/** 
	 * @class HIMS.consoleMessage
	 * @param {Number} consoleID
	 * @param {property} consoleType ConsoleTypes: [consoleNative, consoleCore, consoleUser, consolePublic]
	 * @param {property} messageType MessageTypes: [consoleLog, consoleWarning, consoleError, consoleProblem, consoleOption]
	 * @param {string} message text
	 * @param {Number} terminal TerminalID
	 * @param {Number} sensor sensorID
	 * @param {boolean} doRecord Recording: [false or null to skip] [Destination File]
	 * @param {Number} userID 
	 * @return {boolean}
	*/


HIMS_Console.prototype.consoleLog = function(message, source = {}, tags = [])
{
	this._consoleLogs.push(new HIMS_Log(this._consoleID, message, source, tags));
	return this._consoleLogs[this._consoleLogs.length - 1]
}

HIMS.consoleMessage = function(consoleID, messageType, message, terminal = false, sensor = false, doRecord = false, userID) {
	let consoleType = HIMSconsole[consoleID]._consoleType
	let log = toString(consoleType) + " " + toString(messageType) + " on " + toString(terminal) + "received! | Message: " + message;
	try {
		if(consoleType == consoleCore) {
			HIMS.consoleCore(consoleID, messageType, message, sensor, doRecord)
		}
		if(consoleType == consoleUser && terminal != false) {
			if(HIMSconsole[consoleID]._accounts.filter((element) => element._ID == userID)) {
				HIMS_access = true
			} else {
				HIMS_access = false 
			};
			console.log("Messaging on " + terminal)
			HIMS.consoleTerminal(consoleUser, messageType, HIMS_access, message, terminal, sensor, doRecord)
		}
		if(messageType == consoleWarning || messageType == consoleError) {
		HIMS.popup(consoleType, messageType, message);
		}
		if(messageType == consoleWarning || messageType == consoleError || messageType == consoleProblem) {
		if(sensor != false) {
			HIMS.monitor(sensor, doRecord)
		}
		}
		return true
		} catch (error) {
		console.error(error);
		return false
	}
};

HIMS.popup = function(consoleType, messageType, message) {
	console.log("POPUP " + toString(consoleType) + toString(messageType) + " | Message :" + message)
	return true
};

HIMS.monitor = function(sensor, doRecord) {
	console.log("Monitoring on " + sensor + "...");
	if(doRecord != false) {
	console.log("Recording: " + doRecord);
	}
	return true
};

HIMS.addLogMessage = function(consoleID, message) {
	let cLog = HIMSconsole[consoleID]._consoleLogs;
	cLog[cLog.length] = new HIMS_Log(consoleID);
	HIMSlog[HIMSlog.length]._message = message;
}

HIMS.consoleCore = function(consoleID, messageType, message, sensor = false, doRecord = false) {
	HIMS.addLogMessage(consoleID, console.log("\\}\\[2]Core " + toString(messageType) + " | Message: \\{\\c[0]" + message))
	if(sensor != false) {
		HIMS.monitor(sensor, doRecord)
	}
	return true
};

HIMS.consoleTerminal = function(consoleType, messageType, HIMS_access = false, message, terminal, sensor, doRecord) {
	if(consoleType == consoleUser && HIMS_access == false) {
		$gameMessage.add("\\c[2]" + toString(consoleType) + " " + toString(messageType) + " on " + toString(terminal) + " received! | Login required.");
		return false
	}
	$gameMessage.add("\\c[2]\\}" + toString(consoleType) + " " + toString(messageType) + " on " + toString(terminal) + " received! | Message: \\c[0]\\{" + message)
	if(sensor != false) {
		HIMS.monitor(sensor, doRecord)
	}
	return true
};

//Function to setup the Day counter with an appropriate cardinal suffix
HIMS.DaySuffix = function(number) {
		if (number % 100 >= 11 && number % 100 <= 13) {
				return number + "th";
		}
		switch (number % 10) {
				case 1:
						return number + "st";
				case 2:
						return number + "nd";
				case 3:
						return number + "rd";
				default:
						return number + "th";
		}
};



/**
 * @desc don't forget interpreter = "this.setWaitMode('message')"
 * @param {*} message 
 * @param {*} amount 
 * @param {*} choice1
 * @param {*} choice2 
 * @param {*} choice3 
 * @param {*} choice4 
 * @param {*} choice5 
 * @param {*} choice6 
 * @param {*} defaultIndex - Starting choice index (0 for choice #1). 
 * @param {*} cancelIndex - Cancel selects this index (-1 for no cancel).
 * @param {*} background - 0 (Window), 1 (center), 2 (right)
 * @param {*} position - 0 (Left), 1 (Center), or 2 (Right).
 * @param {*} callback1 - 1 argument: selected choice index.
 * @param {*} callback2 - Gets called when a choice is made.
 * @param {*} callback3 - Runs in Game_Interpreter context.
 * @param {*} callback4 
 * @param {*} callback5 
 * @param {*} callback6 
 * @param {*} interpreter - Game_Interpreter reference ("this" in a Script command).
 * @desc $gameMessage.add(message)
 * @desc $gameMessage.setChoiceBackground(background)
 * @desc $gameMessage.setChoicePositionType(position)
 * @desc $gameMessage.setChoiceCallback(index, callback)
 */

//#endregion








//#region HIMS class
/**
 * @desc Human Interface Management System
 */
function HIM_System()
{
  this.initialize(...arguments);
}

HIM_System.prototype.initialize = function()
{
  //
}

function HIMS_Data() 
{
  this.initialize(...arguments)
}

HIMS_Data.prototype = Object.create(HIM_System.prototype);
HIMS_Data.prototype.constructor = HIMS_Data;

HIMS_Data.prototype.initialize = function() {
  HIM_System.prototype.initialize.call(this);
  this._contents = {};
}


function HIMS_Core() 
{
  this.initialize(...arguments)
}

HIMS_Core.prototype = Object.create(HIM_System.prototype);
HIMS_Core.prototype.constructor = HIMS_Core;

HIMS_Core.prototype.initialize = function() {
  HIM_System.prototype.initialize.call(this);
  this._init = true;
  this.initHIMScoreSettings()
}

HIM_System.prototype.initHIMScoreSettings = function() {
  this.parameters = {};
}




/**
 * 
 * @param {Number} creatureID 
 * @param {obj} exp exp.name + exp.type + exp.gravity 
 */
// HIMS_Event.prototype.createMessage = function(creatureID, mood, exp)
// {
//     this._exp.push(new HIMS_EXP(exp.Name, exp.type, exp.gravity));
//     let text = undefined;
//     return this.addMessage(creatureID, mood, text)
// }




//#endregion









//#region HIMS_Database

function HIMS_Database() {
  this.initialize.apply(this, arguments);
};

HIMS_Database.prototype.initialize = function() {
  this.contents = {}
};

//Put it into the save file
const _DataManager_HIMScreateSave = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
  _DataManager_HIMScreateSave.call(this);
  //$PDL = new HIMS_Database();
  $HIMS_Data = new HIMS_Database();
  $ShelderEvo = new HIMS_Database();
  $MAGPIE_Data = new HIMS_Database();
};

const _DataManager_HIMSmakeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
	const hims = _DataManager_HIMSmakeSave.call(this);
	hims.PDL = $PDL;
	hims.Data = $HIMS_Data;
	hims.ShelderEvo = $ShelderEvo;
	hims.MAGPIE = $MAGPIE_Data;
	return hims;
};
const _DataManager_HIMSloadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
	_DataManager_HIMSloadSave.call(this, contents);
	$ShelderEvo = contents.ShelderEvo;
	$HIMS_Data = contents.Data;
	$PDL = contents.PDL
	$MAGPIE_Data = contents.MAGPIE;
};


//#endregion








//#region HIMS_Exp

function HIMS_EXP(type = HIMS.EXP.MESSAGE, gravity = HIMS.GRAVITY.TRIVIAL, emote = [])
{
	this.initialize(type, gravity, emote)
}

HIMS_EXP.prototype = Object.create(Game_Exp.prototype);
HIMS_EXP.prototype.constructor = HIMS_EXP;

HIMS_EXP.prototype.initialize = function(type, gravity, emote)
{
	Game_Exp.prototype.initialize.call(this, type, gravity, emote);
	this.class = HIMS.CLASS_EXP;
	this._triggers = [];
	this._switches = [];
	this._variables = [];
}

HIMS_EXP.prototype.addTrigger = function(triggerName = "", archetypes = [])
{
	return this._triggers.push(new HIMS_Trigger(triggerName, archetypes))
}

HIMS_EXP.prototype.trigger = function(triggerName)
{
	return this._triggers.includes(t => t._name === triggerName)
}

HIMS_EXP.prototype.addSwitch = function(switchName, initValue)
{
	let newSwitch = new HIMS_Switch(switchName, undefined, initValue);
	this._switches.push(newSwitch); 
	return newSwitch.assignSwitch()
}

HIMS_EXP.prototype.switch = function(switchID)
{
	return this._switches?.find(s => s?._ID === switchID)?._value
}

HIMS_EXP.prototype.findSwitch = function(switchName)
{
	return this._switches?.find(s => s?._name == switchName)
}

HIMS_EXP.prototype.variable = function(variableID)
{
	return this._variables?.find(v => v?._ID === variableID)?._value
}

HIMS_EXP.prototype.findVariable = function(variableName)
{
	return this._variables?.find(v => v?._name == variableName)
}

HIMS_EXP.prototype.addText = function(text)
{
	this._text = text
	return text
}

//#region EXP accessories
function HIMS_Trigger(name = "undefined", archetypes = [])
{
	this.class = HIMS.CLASS_TRIGGER;
	this._name = name;
	this._archetypes = archetypes;
	return this
}

function HIMS_Switch(name = "undefined", switchID = undefined, initValue = false)
{
	this.class = HIMS.CLASS_SWITCH;
	this._ID = switchID;
	this._name = name;
	this._value = initValue;
	return this
}

HIMS_Switch.prototype.assignSwitch = function()
{
	let index = $dataSystem.switches.findLastIndex(e => e != "") + 1;
	$dataSystem.switches[index] = this._name;
	$gameSwitches.setValue(index, this._value);
	this._ID = index;
	return this
}

HIMS_Switch.prototype.turnON = function()
{
	$gameSwitches.setValue(this._ID, true);
	return this._value = true
}

HIMS_Switch.prototype.turnOFF = function()
{
	$gameSwitches.setValue(this._ID, false);
	return this._value = false
}

HIMS_Switch.prototype.toggle = function()
{
	$gameSwitches.setValue(this._ID, !this._value);
	this._value = !this._value;
	return this._value
}

HIMS_Switch.prototype.clear = function()
{
	$gameSwitches.setValue(this._ID, false);
	$dataSystem.switches[this._ID] = "";
}

HIMS_Switch.prototype.update = function()
{
	$gameSwitches.setValue(this._ID, this._value)
}

HIMS_Switch.prototype.refresh = function()
{
	return this._value = $gameSwitches.value(this._ID)
}

function HIMS_Variable(name = "undefined", variableID = 0, initValue = 0)
{
	this.class = HIMS.CLASS_VARIABLE;
	this._ID = variableID;
	this._name = name;
	this._value = initValue;
	return this
}

HIMS_Variable.prototype.assignVariable = function()
{
	let index = $dataSystem.variables.findLastIndex(e => e != "") + 1;
	$dataSystem.variables[index] = this._name;
	$gameVariables.setValue(index, this._value);
	this._ID = index;
	return this
}

HIMS_Variable.prototype.update = function()
{
	$gameVariables.setValue(this._ID, this._value)
}

HIMS_Variable.prototype.refresh = function()
{
	return this._value = $gameVariables.value(this._ID)
}

HIMS_Variable.prototype.clear = function()
{
	$dataSystem.variables[this._ID] = "";
	$gameVariables.setValue(this._ID, 0);
}

function HIMS_Message(text = "", creatureID = undefined, mood = undefined)
{
	this._text = text;
	this._creatureID = creatureID;
	this._mood = mood;
}

HIMS_Message.prototype.send = function()
{
	let creature = creatures(this._creatureID);
	let faceName = creature?._faceName;
	let faceIndex = creature?._faces[this._mood];
	let speakerName = creature._nickName;
	if(faceName) $gameMessage.setFaceImage(faceName, faceIndex);
	$gameMessage.setBackground(0);
	$gameMessage.setPositionType(2);
	$gameMessage.setSpeakerName(speakerName);
	$gameMessage.add(this._text);
}
//#region HIMS_Dialogue

function HIMS_Dialogue(gravity = HIMS.GRAVITY.TRIVIAL, emote, text)
{
	this.initialize(gravity, emote, text);
}

HIMS_Dialogue.prototype = Object.create(HIMS_EXP.prototype);
HIMS_Dialogue.prototype.constructor = HIMS_Dialogue;

HIMS_Dialogue.prototype.initialize = function(gravity, emote, text)
{
	HIMS_EXP.prototype.initialize(this, HIMS.EXP.MESSAGE, gravity, emote);
	this.addText(text);
}
//#endregion
//#endregion


//#endregion









//#region HIMS_Event

HIMS.EVENT = {};
HIMS.EVENT.NODE = 0;
HIMS.EVENT.NODE_CLOSED = 1;
HIMS.EVENT.NODE_OPEN = 2;
HIMS.EVENT.CHOICE = 3;
HIMS.EVENT.CHOICE_CLOSED = 4;
HIMS.EVENT.CHOICE_OPEN = 5;

function HIMS_Event(name = "undefined", desc = "", eventId, type = HIMS.EVENT.NODE, gravity = HIMS.GRAVITY.RELEVANT, emote = [])
{
	this.initialize(name, desc, eventId, type, gravity, emote);
}

HIMS_Event.prototype = Object.create(HIMS_EXP.prototype);
HIMS_Event.prototype.constructor = HIMS_Event;

HIMS_Event.prototype.initialize = function(name, desc, eventId, type, gravity, emote)
{
	HIMS_EXP.prototype.initialize.call(this, type, gravity, emote);
	this.class = HIMS.CLASS_EVENT;
	this._ID = eventId;
	this.created = {};
	this.create();
	this._created = MAGGIE.now();
	this._name = name;
	this._description = desc;
	this._exp = [];
	this._queue = [];
}

HIMS_Event.prototype.create = function()
{
	this.created.year = Year;
	this.created.month = Month;
	this.created.day = Day;
	this.created.hour = Hour;
	this.created.minute = Minute;
	this.created.epoch = epoch;
	return this.created
}

HIMS_Event.prototype.pushExp = function(type, gravity, emote)
{
	let exp = new HIMS_EXP(type, gravity, emote);
	this._queue.push(exp);
	return exp
}

HIMS_Event.prototype.addExp = function(type, gravity, emote, text = undefined, triggers = [])
{
	let exp = new HIMS_EXP(type, gravity, emote);
	if(text) exp.addText(text);
	if (triggers.length > 0) triggers.forEach(t => exp.addTrigger(t.name, t.aTypes))
	this._exp.push(exp);
	return exp
}

HIMS_Event.prototype.trigger = function(triggerName)
{
	let exp = this._exp.pop(e => e.trigger(triggerName));
	this._queue.push(exp);
}

HIMS_Event.prototype.switch = function(switchID)
{
	if(this._switches?.find(s => s?._ID === switchID)) return true 
		else return false
}

HIMS_Event.prototype.queue = function()
{
	return this._queue[0]
}

HIMS_Event.prototype.spawn = function(coords, save = false)
{
	Galv.SPAWN.event(this._ID,'xy',coords,'all',save); 
}

/**
 * 
 * @param {Number} creatureID 
 * @param {Array} mood either from creature.mood() or array of moods
 * @param {String} text 
 */
HIMS_Event.prototype.sendMessage = function(creatureID, mood, text)
{
	let creature = creatures(creatureID);
	let faceName = creature?._faceName;
	let faceIndex = creature?._faces[mood];
	let speakerName = creature._nickName;
	if(faceName) $gameMessage.setFaceImage(faceName, faceIndex);
	$gameMessage.setBackground(0);
	$gameMessage.setPositionType(2);
	$gameMessage.setSpeakerName(speakerName);
	$gameMessage.add(text);
	//interpreter.setWaitMode('message');
}

//#endregion

//#endregion