//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_3] v0.5.0 MAGPIE_CBE
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-cbe
 * 
 * @help 
 * (MAGPIE) CBE (Conditional Branching and Eventing)
 * Extend RMMZ conditionals with extra functionality to create complex
 * story branches and emergent behavior.
 * 
 * ----------------------------------------------------------------------------
 * FEATURES
 * ----------------------------------------------------------------------------
 * - centralized scripting allows for tidier structure so you can keep track
 *   of all your story threads 
 * 
 * - extend the default conditionals IF / SWITCH / VARIABLE / EVENT with
 *   custom EMOTE / EXP (experience)
 * 
 * - manage individual CBE_Branch with its own set of conditionals
 * 
 * - you can flip from top-down control of eventing through conditionals, to
 *   bottom-up triggering through meta tags, so, apart from planning for 
 *   every possible condition in advance, you can also unleash emergent 
 *   behavior by allowing agents to trigger events
 * 
 * - can combine with MAGPIE_PDL for extra procedural generation and 
 *   database functionality (see https://matheraptor.itch.io/magpie-pdl)
 * 
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * ----------------------------------------------------------------------------
 * You are ALLOWED to use this plugin in both FREE and COMMERCIAL games.
 * You can credit the author and the plugin
 * Recommended credit: 
 * "MAGPIE_CBE - by Matheraptor" (if used standalone)
 * or
 * "MAGPIE plugin suite - by Matheraptor" (if part of the plugin suite)
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.5.0 2025 08 28
 * - integrated MAGPIE_MCON as child of CBE_Fate
 * - various MAGPIE_Runtime and interoperability consolidation
 * 
 * v0.4.2 2025 08 27
 * - MAGPIE.SYS 0.9.1 conformity and MAGPIE_EntityDatabase update
 * 
 * v0.4.1 2025 08 19
 * - conformity update 0.7.1
 * 
 * v0.4.0 2025 07 31 
 * - plugin decoupled from SECore and standardized in MAGPIE plugin suite
 * 
 * pre-0.4.0
 * - integrated with SECore
 * ----------------------------------------------------------------------------
 * 
 * @param settings
 * @text CBE settings
 * 
 * @param dice
 * @parent settings
 * @text Dice settings
 * @type struct<dice>
 */
/*~struct~dice:
 * 
 * @param standard
 * @text Standard die
 * @type select
 * @option D6
 * @value 6
 * @option D8
 * @value 8
 * @option D10
 * @value 10
 * @option D12
 * @value 12
 * @option D20
 * @value 20
 * @default 6
 * 
 * @param double
 * @text Double dice
 * @type boolean
 * @default true
 * 
 * @param additional
 * @text Additional dice
 * @type struct<addDice>[]
 * 
 */
/*~struct~addDice:
 * 
 * @param name
 * @text Dice name
 * @type text
 * 
 * @param faces
 * @text Dice faces
 * @type select
 * @option D6
 * @value 6
 * @option D8
 * @value 8
 * @option D10
 * @value 10
 * @option D12
 * @value 12
 * @option D20
 * @value 20
 * @option D100
 * @value 100
 * @default 6
 * 
 * @param amount
 * @text Amount of dice to throw
 * @type number
 * @default 1
 * 
 */
//#endregion




//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {}
MAGPIE.version = MAGPIE.version || "0.10.0";
MAGPIE.CBE = {};
MAGPIE.CBE.version = "0.5.0";
MAGPIE.CBE.tier = 3;
MAGPIE.CBE.isInstalled = true;
MAGPIE.CBE.pluginName = "MAGPIE_CBE";
MAGPIE.CBE.meta = {
	name: "Conditional Branching and Eventing manager",
	firmware: "20250830",
	firmwareFile: `${MAGPIE.CBE.pluginName}.js`,
	isCBE: true
};
MAGPIE.CBE.parameters = PluginManager.parameters(MAGPIE.CBE.pluginName);
/**
 * @property {Number} default 6
 * @property {Number} double 12
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
 * 
 */
MAGPIE.CBE.DICE = {};
MAGPIE.CBE.DICE.meta = {isDice: true};
MAGPIE.CBE.DICE.default = Number(JSON.parse(MAGPIE.CBE.parameters.dice).standard);
MAGPIE.CBE.DICE.double = eval(JSON.parse(MAGPIE.CBE.parameters.dice).double);
MAGPIE.CBE.DICE.additional = eval(JSON.parse(MAGPIE.CBE.parameters.dice).additional);

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





//------------------------------------------------------------------------
//#region $CBE
var $CBE = null;
function MAGPIE_CBE()
{
	this.initialize(...arguments);
}
MAGPIE_CBE.prototype = Object.create(MAGPIE_Firmware.prototype);
MAGPIE_CBE.prototype.constructor = MAGPIE_CBE;
MAGPIE_CBE.prototype.initialize = function()
{
	MAGPIE_Firmware.prototype.initialize.call(this);
	this._name = "M.A.G.P.I.E. Conditional Branching & Eventing manager";
	this.isCBE = true;
	this.meta = MAGPIE.CBE.meta;
	if(this.loadSettings())
		this.isInit = true;
}

MAGPIE_CBE.prototype.loadSettings = function()
{
	return true
}

MAGPIE_CBE.prototype.start = function()
{
	$CBE = new MAGPIE_CBE();
	$CBE.DATA = new MAGPIE_Data();
	$CBE.DICE = new CBE_Dice();
	let data = $CBE.DATA.readJSON("MAGPIE/CBE_Data", "warn");
	$CBE.FATE = new CBE_Fate(data);
	this.isActive = true;
	data = $MAGPIE.DATA.readJSON("MAGPIE/MAGPIE_MCON", "warn") || {};
	$MAGPIE.MCON = new MAGPIE_MCON({mission: data});
	$MAGPIE.MCON.start();
}
//#endregion









//------------------------------------------------------------------------
//#region DICE
function CBE_Dice()
{
	this.initialize(...arguments);
}
CBE_Dice.prototype = Object.create(MAGPIE_CBE.prototype);
CBE_Dice.prototype.constructor = CBE_Dice;
CBE_Dice.prototype.initialize = function()
{
	MAGPIE_CBE.prototype.initialize.call(this);
	this._name = "C.B.E. Dice system";
	this.isDice = true;
}

CBE_Dice.prototype.loadSettings = function()
{
	return true
}
CBE_Dice.prototype.dice = function(dice = 6)
{
	return Math.ceil(Math.random() * dice)
}

CBE_Dice.prototype.pick = function(collection)
{
	return collection[this.dice(collection.length) - 1]
}

CBE_Dice.prototype.D6 = function()
{
	return this.dice(6) > 5
}

CBE_Dice.prototype.Dx = function(x = 6)
{
	return this.dice(x) >= x
}

//#endregion








//------------------------------------------------------------------------
//#region MCON















//#region Fate
function CBE_Fate(data)
{
	this.initialize(data)
}
CBE_Fate.prototype = Object.create(MAGPIE_Firmware.prototype);
CBE_Fate.prototype.constructor = CBE_Fate;
CBE_Fate.prototype.initialize = function(data)
{
	MAGPIE_Firmware.prototype.initialize.call(this);
	this.meta.isGuest = true;
	this.meta.name = "C.B.E. Fate system";
	this.ID = this.generateID();
	this._name = data?.name || "CBE_Fate_proxy";
	this.DATABASE = data?.missions || new MAGPIE_EntityDatabase({name: "CBE Database"});
	this.SWITCH = data?.switches || [];
	this.VARIABLE = data?.variables || [];
	this.PROGRESS = [];
	this._status = MAGPIE.CODE.ENTITY.STATUS.STAND_BY;
	this._parent = data?.parent || "$CBE";
	this.isInit = true;
	this.isActive = false;
}

CBE_Fate.prototype.parent = function()
{
	return eval(this._parent)
}

CBE_Fate.prototype.start = function()
{
	try {
		this.awake();
		this.parent().DATA.Log(`${this._name} started.`);
	} catch (error) {
		
	}	
}

CBE_Fate.prototype.awake = function()
{
	MAGPIE_Firmware.prototype.awake.call(this);
	this.isActive = true;
	this.refresh();
	const proxy = this.proxyUp();
	if(this._status === MAGPIE.CODE.ENTITY.STATUS.ACTIVE)
		$MAGPIE.RUNTIME
			.addGuest(MAGPIE.CODE.RUNTIME.GUEST.SUPER, proxy);
}

CBE_Fate.prototype.refresh = function()
{
	const status = this.status();
	try {
			this.PROGRESS.forEach(id => {
				this.DATABASE.getElementByID(id)?.refresh();
			})
			return status
		} catch (error) {
			this.parent().DATA.Log(error.toString());
			return console.error(error)
		}
}

CBE_Fate.prototype.status = function()
{
	if(!this.isActive) return
	if(this.PROGRESS.length < 1) 
		this.standBy()
	if(this.PROGRESS.length > 0)
		this.activate();
	const code = MAGPIE.CODE.ENTITY.STATUS;
	const status = Object.keys(code).find(k => code[k] === this._status);
	return status
}

CBE_Fate.prototype.standBy = function()
{
	if(this._status !== MAGPIE.CODE.ENTITY.STATUS.STAND_BY)
		return this.changeStatus(MAGPIE.CODE.ENTITY.STATUS.STAND_BY)
}

CBE_Fate.prototype.activate = function()
{
	if(this._status !== MAGPIE.CODE.ENTITY.STATUS.ACTIVE)
		return this.changeStatus(MAGPIE.CODE.ENTITY.STATUS.ACTIVE)
}

CBE_Fate.prototype.changeStatus = function(status = 0)
{
	this._status = status;
	return this._status
}
//#endregion














//#region Event

function CBE_Event(data)
{
	this.initialize(data);
}
CBE_Event.prototype = Object.create(MAGPIE_Event.prototype);
CBE_Event.prototype.constructor = CBE_Event;
CBE_Event.prototype.initialize = function(data)
{
	MAGPIE_Event.prototype.initialize.call(this, data);
	this._name = data?.name || "CBE_Event_template"
	this._type = MAGPIE.CODE.TYPE.EVENT;
	this._territoryID = data?.territory;
}
CBE_Event.prototype.territory = function()
{
	if(isNaN(this.territoryID)) return false
	return $PDL.territory.getElementByID(this.territoryID)
}

//#endregion






//------------------------------------------------------------------------
//#region CBE task

function CBE_Task(data)
{
	this.initialize(data);
}
CBE_Task.prototype = Object.create(CBE_Event.prototype);
CBE_Task.prototype.constructor = CBE_Task;
CBE_Task.prototype.initialize = function(data)
{
	CBE_Event.prototype.initialize.call(this, data);
	this._name = data?.name || "CBE_Task_template";
	this._type = MAGPIE.CODE.TYPE.TASK;
	this._owner = data?.owner;
	this._objective = data?.objective;
}

CBE_Task.prototype.owner = function()
{
	if(isNaN(this._owner)) return
	return $PDL.creature.getElementByID(this._owner)
}

CBE_Task.prototype.refresh = function()
{
	try {
		const obj = eval(this._objective);
		if(obj) return true
	} catch (error) {
		$CBE.DATA.Log(error.toString());
	}
}

CBE_Task.prototype.entityTypeDependecy = function(entityID, property)
{
	let dependecies = $PDL.ENTITY.getElementByID(entityID).type()[property];
	let list = [];
	dependecies.forEach(type => {
		let dep = $PDL.ENTITY.getElementByProperty("_type", type);
		if(!dep) list.push(type);
	})
	return list
}

CBE_Task.prototype.requestEntity = function(entityName, type)
{
	let prototype = $MAGPIE.RESOURCE.getElementByName(type)?._prototype;
	let entityID = $PDL.ENTITY.add(new [prototype]({
		name: entityName, 
		type: type,
		status: MAGPIE.CODE.ENTITY.STATUS.REQUESTED
	})).ID;
	return entityID
}

CBE_Task.prototype.hide = function()
{
	//
}

CBE_Task.prototype.guard = function(target)
{
	//
}

CBE_Task.prototype.seek = function(target)
{
	//
}

CBE_Task.prototype.follow = function(target)
{
	//
}

//#endregion






//------------------------------------------------------------------------
//#region CBE_Quest

function CBE_Quest(data)
{
	this.initialize(data);
}
CBE_Quest.prototype = Object.create(CBE_Task.prototype);
CBE_Quest.prototype.constructor = CBE_Quest;
CBE_Quest.prototype.initialize = function(data)
{
	CBE_Task.prototype.initialize.call(this, data);
	this._name = data?.name || "CBE_Quest_Template";
	this._type = MAGPIE.CODE.TYPE.QUEST;
	this._children = data?.children || [];
}

CBE_Quest.prototype.build = function(target)
{
	//
}

CBE_Quest.prototype.protect = function(target)
{
	//
}

CBE_Quest.prototype.bring = function(target)
{
	//
}

CBE_Quest.prototype.assist = function(target)
{
	//
}

//#endregion










//#region MCON
function MAGPIE_MCON(data = [])
{
	this.initialize(data);
}
MAGPIE_MCON.prototype = Object.create(CBE_Fate.prototype);
MAGPIE_MCON.prototype.constructor = MAGPIE_MCON;
MAGPIE_MCON.prototype.initialize = function(data)
{
	CBE_Fate.prototype.initialize.call(this);
	this.meta.name = "M.A.G.P.I.E. Mission Control";
	this.ID = this.generateID();
	this._name = data?.name || "MAGPIE_MCON_proxy";
	this.DATA = new MAGPIE_Data();
	this.DATABASE = data?.missions || new MAGPIE_EntityDatabase({name: "MCON Database"});
	this.SWITCH = data?.switches || [];
	this.VARIABLE = data?.variables || [];
	this.PROGRESS = [];
	this.INTEL = [];
	this._parent = data?.parent || "$MAGPIE";
	this.isInit = true;
	this._status = MAGPIE.CODE.ENTITY.STATUS.STAND_BY;
}

MAGPIE_MCON.prototype.printStatus = function()
{
	return MAGPIE_Entity.prototype.printStatus.call(this)
}

MAGPIE_MCON.prototype.start = function()
{
	//
}

MAGPIE_MCON.prototype.name = function()
{
	return `${this._name}`
}

MAGPIE_MCON.prototype.ident = function()
{
	return `${this.name()}-${this.ID}`
}

//@todo MCON.getLogs async
MAGPIE_MCON.prototype.getLogs = function()
{
	let logs = JSON.parse(JSON.stringify(this.DATA.logs));
	this.DATABASE.pools.forEach(pool => pool.entities
		.forEach(entity => entity.DATA.logs.forEach(log => {
			// const newLog = JSON.parse(JSON.stringify(log));
			// newLog.source = entity.ident();
			logs.push([
				entity.ident(), 
				`date: ${log._date.toString()}`,
				log.contents,
				log._date.gameday,
				`metaDate: ${log._metaDate}`
			]);
		})))
	logs.sort((a, b) => a[3] - b[3])
	return logs
}
//#endregion






//#region mission
MAGPIE.CODE.MISSION = {};
MAGPIE.CODE.MISSION.TEMPLATE = {};
MAGPIE.CODE.MISSION.TEMPLATE.GENERIC = {
	name: "",
	parent: "ID in $PDL.event",
	contents: {},
	start: {gameday: 0},
	end:  {gameday: 0, isOptional: true},
	type: MAGPIE.CODE.TYPE,
	category: MAGPIE.CODE.CAT,
	urgency: MAGPIE.CODE.URGENCY,
	gravity: MAGPIE.CODE.GRAVITY,
	ambiguity: MAGPIE.CODE.AMBIGUITY,
	status: MAGPIE.CODE.STATUS,
	territoryID: "ID in $PDL.territory",
	owner: "ID in $PDL.creature",
	objective: "valid expression",
	mcon: "string of parent MCON object",
	children: ["ID in $PDL.event"],
	assets: ["ID in $PDL.ENTITY"]
};
function Mission_Data(data)
{
	Object.keys(data).forEach(k => this[k] = data[k]);
}

function MCON_Mission(data)
{
	this.initialize(data);
}
MCON_Mission.prototype = Object.create(CBE_Task.prototype);
MCON_Mission.prototype.constructor = MCON_Mission;
MCON_Mission.prototype.initialize = function(data)
{
	CBE_Task.prototype.initialize.call(this, data);
	this._name = data?.name || "MCON_Mission_template";
	this._type = MAGPIE.CODE.TYPE.MISSION;
	this._mcon = data?.mcon || 0;
	this._assets= data?.assets || MAGPIE.CODE.ASSET.APPROPRIATE;
}

MCON_Mission.prototype.refresh = function()
{
	try {
		const obj = eval(this._objective);
		if(obj) return true
	} catch (error) {
		this.MCON().DATA.Log(error.toString());
	}
}

MCON_Mission.prototype.terminate = function(status)
{
	this.clearGuest();
	this._status = status;
	return true
}

MCON_Mission.prototype.MCON = function()
{
	if(isNaN(this._mcon)) return
	const mcon = $MAGPIE.MCON.DATABASE.getElementByID(this._mcon);
	if(!mcon) return
	return mcon
}

MCON_Mission.prototype.name = function()
{
	return `${this.constructor.name}_${this.ID} '${this._name}'`
}

MCON_Mission.prototype.changeStatus = function(status)
{
	MAGPIE_Event.prototype.changeStatus.call(this, status);
	this.MCON().DATA.Log(`${this.name()} ${this.status()}`)
}

MCON_Mission.prototype.assign = function()
{
	const MCON = this.MCON();
	MCON.PROGRESS.push(this.ID);
	MCON.DATA.Log(`${this.name()} assigned.`);
}

MCON_Mission.prototype.clearGuest = function()
{
	let parent = this.MCON().PROGRESS;
	parent.remove(this.ID);
	this.MCON().DATA.Log(`${this.name()} unassigned.`);
}

MCON_Mission.prototype.intel = function(entityID)
{
	let entity = $PDL.ENTITY.getElementByID(entityID);
	if(!entity) return
	let intel = this.MCON()?.INTEL;
	let handler = {};
	if(entityID in intel)
		handler = {get: (target, prop) => {return target[prop]}};
	return new Proxy(entity, handler)
}


//#endregion





//#region campaign @todo
function MCON_Campaign(data)
{
	this.initialize(data);
}
MCON_Campaign.prototype = Object.create(MCON_Mission.prototype);
MCON_Campaign.prototype.constructor = MCON_Campaign;
MCON_Campaign.prototype.initialize = function(data)
{
	MCON_Mission.prototype.initialize.call(this, data);
	this._name = data?.name || "MCON_Campaign_Template";
	this._type = MAGPIE.CODE.TYPE.CAMPAGIN;
}

MCON_Campaign.prototype.AWAIT = function(entityID, 
	status = MAGPIE.CODE.ENTITY.STATUS.ACTIVE, 
	failMinima = MAGPIE.CODE.ENTITY.STATUS.KIA)
{
	let entity = this.intel(entityID);
	if(entity._status >= failMinima)
		return this.terminate(MAGPIE.CODE.STATUS.FAILED)
	if(entity._status >= status) 
		return this.terminate(MAGPIE.CODE.STATUS.RESOLVED)
}


MCON_Campaign.prototype.ESTABLISH = function(entityName, type,
	failMinima = MAGPIE.CODE.ENTITY.STATUS.KIA
)
{
	let entityID = $PDL.ENTITY.getElementByName(entityName);
	if(!entityID) 
	{
		entityID = this.requestEntity(entityName, type);
	}
	let entity = this.intel(entityID);
	if(!entity?._status) return false
	if(entity._status >= failMinima)
		return this.terminate(MAGPIE.CODE.STATUS.FAILED)
	if(entity._status >= MAGPIE.CODE.ENTITY.STATUS.ACTIVE) 
		return this.terminate(MAGPIE.CODE.STATUS.RESOLVED)
	let requirements = this.typeDependecy(entityID, "_requirements");
	let components = this.typeDependecy(entityID, "_components");
	if(requirements.length < 1 && components.length < 1) 
		entity.requestStatus(MAGPIE.CODE.ENTITY.STATUS.DEPLOYING);
	return false
}



//#endregion




//#endregion









//------------------------------------------------------------------------
//#region RUNTIME

MAGPIE.CBE._runtime = {};

MAGPIE.CBE._runtime._Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function()
{
	MAGPIE.CBE._runtime._Game_System_initialize.call(this);
	$CBE = new MAGPIE_CBE();
}

MAGPIE.CBE._runtime._awake = MAGPIE_Runtime.prototype.awake;
MAGPIE_Runtime.prototype.awake = function()
{
	MAGPIE.CBE._runtime._awake.call(this);
	$CBE?.FATE?.awake();
	$MAGPIE?.MCON?.awake();
}

MAGPIE.CBE._runtime._MAGPIE_SYS_start = MAGPIE.SYS.start;
MAGPIE.SYS.start = function()
{
	MAGPIE.CBE._runtime._MAGPIE_SYS_start.call(this);
	//
}


MAGPIE.CBE._DataManager_makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function()
{
	const contents = MAGPIE.CBE._DataManager_makeSave.call(this);
	contents.CBE = $CBE;
	contents.MCON = $MAGPIE.MCON;
	return contents
}

MAGPIE.CBE._DataManager_loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents)
{
	MAGPIE.CBE._DataManager_loadSave.call(this, contents);
	$CBE = contents.CBE;
	$MAGPIE.MCON = contents.MCON;
}

//#endregion






//end of plugin