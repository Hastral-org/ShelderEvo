//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_2] v0.4.4 MAGPIE_PDL
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-pdl
 * 
 * @help
 * (MAGPIE) PDL (Procedural Database Loader)
 * 
 * ----------------------------------------------------------------------------
 * FEATURES
 * ----------------------------------------------------------------------------
 * - import/export of JSON files 
 * 
 * - create a custom database for characters, locations, or whatever you need
 * 
 * - create data templates and generate instances based on MZ conditionals
 * 
 * - compatible with the rest of the MAGPIE plugin suite
 * 
 * - can combine with MAGPIE_CBE for detailed procedural options, complex 
 *   conditional eventing, and character behavior 
 *   (see https://matheraptor.itch.io/magpie-cbe)
 * 
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * ----------------------------------------------------------------------------
 * You are ALLOWED to use this plugin in both FREE and COMMERCIAL games.
 * You can credit the author and the plugin
 * Recommended credit: 
 * "MAGPIE_PDL - by Matheraptor" (if used standalone)
 * or
 * "MAGPIE plugin suite - by Matheraptor" (if part of the plugin suite)
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.4.4.20250827
 * - MAGPIE_SYS 0.9.1 conformity update
 * - Entity_Database integrated into MAGPIE_EntityDatabase
 * 
 * v0.4.3.20250824
 * - v0.9.0 MAGPIE.SYS conformity update
 * 
 * v0.4.2.20250821
 * - MAGPIE.SYS v0.8.0 conformity update 
 * 
 * v0.4.1 2025 08 19
 * - updated entity database to entity_data format
 * 
 * v0.4.0 2025 07 31 
 * - plugin decoupled from SECore and standardized in MAGPIE plugin suite
 * 
 * pre-0.4.0 
 * - integrated in SECore
 * ----------------------------------------------------------------------------
 * 
 * @param pool
 * @text Entity pool settings
 * 
 * @param maxSize
 * @parent pool
 * @text Max pool size
 * @type number
 * @default 1000
 * 
 * @param database
 * @text Database settings
 * 
 * @param databases
 * @parent database
 * @text Preset databases
 * @type struct<databases>[]
 * 
 * @param entity
 * @text Entity settings
 * 
 * @param creature
 * @text Creature settings
 * @parent entity
 * @type struct<creature>
 */

/*~struct~databases:
 * 
 * @param name
 * @text Database name
 * @type text
 * 
 * @param prepop
 * @text Prepopulate entries
 * @type select
 * @option Actors
 * @value $dataActors
 * @option Classes
 * @value $dataClasses
 * @option Skills
 * @value $dataSkills
 * @option Items
 * @value $dataItems
 * @option Weapons
 * @value $dataWeapons
 * @option Armors
 * @value $dataArmors
 * @option Enemies
 * @value $dataEnemies
 * @option Troops
 * @value $dataTroops
 * @option States
 * @value $dataStates
 * @option Animations
 * @value $dataAnimations
 * 
 * @param condition
 * @text Condition for inclusion
 * @type select
 * @option Notetag
 * @value notetag
 * 
 * @param conditionText
 * @text Condition text for inclusion
 * @type text
 * 
 * @param isPointer
 * @text Link to original
 * @type select
 * @option Create a link to original object
 * @value true
 * @option Create a new entry from template
 * @value false
 * 
 * @param template
 * @text Create from Template
 * @desc Valid only when creating from template
 * @type combo
 * @option Game_Creature
 * @option Game_Breed
 * @option Game_Habitat
 * @option Game_Territory
 * 
 * @param fields
 * @text Fields to extrapolate
 * @desc Valid only when creating from template
 * @type text[]
 * 
 */

/*~struct~creature:
 * 
 * @param growth
 * @text Creature growth
 * @type boolean
 * @default false
 * 
 * @param gameday
 * @text Gameday-based growth cycle
 * @type boolean
 * @default false
 * 
 */
//#endregion





// ------------------------------------------------------------------------
//#region INDEX
var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.9.1";
MAGPIE.PDL = {};
MAGPIE.PDL.version = "0.4.4";
MAGPIE.PDL.isInstalled = true;
MAGPIE.PDL.pluginName = "MAGPIE_PDL";
MAGPIE.PDL.meta = {
	name: "Procedural Database Loader",
	isPDL: MAGPIE.PDL.isInstalled,
	version: MAGPIE.PDL.version,
	firmwareFile: `${MAGPIE.PDL.pluginName}.js`,
	firmware: "20250830"
}
MAGPIE.PDL.parameters = PluginManager.parameters(MAGPIE.PDL.pluginName);
MAGPIE.CODE = MAGPIE.CODE || {};
MAGPIE.HIMS = MAGPIE.HIMS || {};
var $PDL = {};

//#endregion






//------------------------------------------------------------------------
//#region CODE



MAGPIE.CODE.PDL = {};
MAGPIE.CODE.PDL.meta = {isCypher: true};
//#region creature
/**
 * {@link MAGPIE.PDL.CREATURE.meta}
 */
MAGPIE.CODE.CREATURE = {};
MAGPIE.CODE.CREATURE.meta = {isCypher: true};
//#endregion
//#endregion





//------------------------------------------------------------------------
//#region CONFIG

MAGPIE.PDL.CONFIG = {};
MAGPIE.PDL.CONFIG.meta = {isConfig: true};
MAGPIE.PDL.CONFIG.MAXPOOLSIZE = Number(MAGPIE.PDL.parameters.maxSize);
MAGPIE.PDL.CONFIG.DATABASES = MAGPIE.SYS.data.parseStructList(MAGPIE
	.PDL.parameters.databases);
//#endregion






//------------------------------------------------------------------------
//#region $PDL
function MAGPIE_PDL()
{
	this.initialize(...arguments);
}
MAGPIE_PDL.prototype = Object.create(MAGPIE_Firmware.prototype);
MAGPIE_PDL.prototype.constructor = MAGPIE_PDL;
MAGPIE_PDL.prototype.initialize = function()
{
	MAGPIE_Firmware.prototype.initialize.call(this);
	this.isPDL = true;
	this.meta = MAGPIE.PDL.meta;
	if(this.loadSettings())
		this.isInit = true;
}

function PDL_Data()
{
	this.initialize(...arguments);
}
PDL_Data.prototype = Object.create(MAGPIE_PDL.prototype);
PDL_Data.prototype.constructor = PDL_Data;
PDL_Data.prototype.initialize = function()
{
	//
}



//#endregion





//------------------------------------------------------------------------
//#region RUNTIME
MAGPIE.PDL.RUNTIME = {};
MAGPIE.PDL.RUNTIME.meta = {isRuntime: true};





//------------------------------------------------------------------------
//#region Save data

MAGPIE.PDL.RUNTIME._DataManager_createSave = DataManager.createGameObjects;
DataManager.createGameObjects = function()
{
	MAGPIE.PDL.RUNTIME._DataManager_createSave.call(this);
}

MAGPIE.PDL.RUNTIME._DataManager_makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function()
{
	const contents = MAGPIE.PDL.RUNTIME._DataManager_makeSave.call(this);
	contents.PDL = $PDL;
	return contents
}

MAGPIE.PDL.RUNTIME._DataManager_loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents)
{
	MAGPIE.PDL.RUNTIME._DataManager_loadSave.call(this, contents);
	$PDL = contents.PDL;
}
//#endregion





//------------------------------------------------------------------------
//#region init

MAGPIE.PDL.RUNTIME._Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function()
{
	MAGPIE.PDL.RUNTIME._Game_System_initialize.call(this);
	$PDL = new MAGPIE_PDL();
	$PDL.DATA = new PDL_Data();
}

MAGPIE.PDL.RUNTIME._MAGPIE_SYS_start = MAGPIE.SYS.start;
MAGPIE.SYS.start = function()
{
	MAGPIE.PDL.RUNTIME._MAGPIE_SYS_start.call(this);
	// $PDL.start();
}

MAGPIE_PDL.prototype.loadSettings = function()
{
	this.loadCreatureSettings();
	return true
}

MAGPIE_PDL.prototype.loadCreatureSettings = function()
{
	let settings = JSON.parse(MAGPIE.PDL.parameters.creature);
	MAGPIE.PDL.CREATURE.GROWTH.isON = Boolean(settings.growth);
	MAGPIE.PDL.CREATURE.GROWTH.isGameday = Boolean(settings.gameday);
}

MAGPIE_PDL.prototype.start = function()
{
	//
}




//------------------------------------------------------------------------
//#region database

/**
 * {@link MAGPIE.PDL.CONFIG.DATABASES}
 */
MAGPIE.PDL.database = {};
MAGPIE.PDL.database.meta = {isDatabase: true};


/**
 * 
 * @desc setup database to automatically add values from preset collection
 * using condition (eg. values from $dataSkills filtered by meta <condition>)
 */
MAGPIE.PDL.database.prepopulate = function(db)
{
	let fields = db.fields;
	let prepop = fields.prepop; 
	let condition = fields.condition;
	let conditionText = fields.conditionText;
	let isPointer = fields.isPointer;
	let template = fields.template;
	let entries = [];
	if(condition === "notetag") 
	{
		entries = MAGPIE.PDL.database.notetag(prepop, conditionText);
	}
	if(entries.length < 1) return false 
	if(!isPointer) entries.forEach(e => 
		MAGPIE.PDL.database.build(e, template, db));
	else entries.forEach(e => $PDL[db.name].add(e));
	let notetag = `with notetag <${conditionText}>`;
	let message = `${entries.length} entries ${notetag} found in ` +  
	`${Object.keys({$dataActors})[0]} and added to ${db.name} database.`;
	$HIMS.MESSAGE.loading(message, $MAGPIE._loading++);
	return true
}

MAGPIE.PDL.database.notetag = function(array, notetag)
{
	return eval(array)
		.filter(e => e != null && e.meta.hasOwnProperty(notetag))
}

MAGPIE.PDL.database.build = function(element, template = "", db)
{
	template = eval(template);
	let example = new template();
	let fields = Object.keys(example);
	fields = fields.filter(e => !e.includes("_"))
	let data = {};
	fields.forEach(e => {
		if(element.hasOwnProperty(e)) data[e] = element[e];
		if(element.meta.hasOwnProperty(e)) 
		{
			if(!element.meta[e].includes("[")) data[e] = element.meta[e];
			else data[e] = eval(element.meta[e]);
		}
	});
	let result = new template(data);
	return $PDL[db.name].add(result)
}

/**
 * 
 * @desc iterate through all preloaded databases
 */
MAGPIE.PDL.database.startProcedural = async function()
{
	let db = MAGPIE.PDL.CONFIG.DATABASES.find(d => d && !d?.isLoaded);
	if(!db) return false
	db.isLoaded = true;
	$PDL[db.name] = new MAGPIE_EntityDatabase(db.name);
	db.fields = [db.prepop, db.condition, db.conditionText, eval(db.isPointer), db.template];
	return MAGPIE.PDL.database.prepopulate(db)
}
//#endregion



//#endregion





//------------------------------------------------------------------------
//#region DATABASE




//#endregion





//------------------------------------------------------------------------
//#region BREED


function Game_BreedBase(name = "", skillId = 0)
{
	this.initialize(name, skillId);
}

Game_BreedBase.prototype.initialize = function(name = "", skillId = 0)
{
	this._skillId = skillId;
	this._name = name;
	this.setup();
}

Game_BreedBase.prototype.setup = function()
{
	let skillCard = this.skillCard();
	this._parent = skillCard?.parent;
	if(!this?._children) this._isSpecies = true;
	else this._isSpecies = false;
	if(!skillCard) return this._hasCard = false
	return this._hasCard = true
}

Game_BreedBase.prototype.skillCard = function()
{
	return $dataSkills[this._skillId]
}

function Game_Breed(data = {breedId: "", speciesID: -1})
{
	this.initialize(data);
}

Game_Breed.prototype = Object.create(Game_BreedBase.prototype);
Game_Breed.prototype.constructor = Game_Breed;
Game_Breed.prototype.initialize = function(data)
{
	if(data.species) 
		Game_BreedBase.prototype.initialize.call(this, data.breedId, data.speciesID); 
	this._breedId = data.breedId;
	this._speciesID = data.speciesID;
	this.population = 0;
}

Game_Breed.prototype.species = function()
{
	return $PDL.species.getElementByID()
}

Game_Breed.prototype.updateSpecies = function()
{
	//
}
//#endregion





//------------------------------------------------------------------------
//#region CREATURE
/**
 * {@link MAGPIE.CODE.CREATURE.meta}
 */
MAGPIE.PDL.CREATURE = {};
MAGPIE.PDL.CREATURE.meta = {isCOnfig: true, isCreature_config: true};

MAGPIE.PDL.CREATURE.SEX = {};
MAGPIE.PDL.CREATURE.SEX.UNDEFINED = undefined;
MAGPIE.PDL.CREATURE.SEX.MALE = MAGPIE.CODE.CHARACTER_MAP.GENDER_MALE;
MAGPIE.PDL.CREATURE.SEX.FEMALE = MAGPIE.CODE.CHARACTER_MAP.GENDER_FEMALE;
MAGPIE.PDL.CREATURE.SEX.INTERSEX = MAGPIE.CODE.CHARACTER_MAP.GENDER_INTERSEX;

MAGPIE.PDL.CREATURE.ADOPTION = {};
MAGPIE.PDL.CREATURE.GROWTH = {};
MAGPIE.PDL.CREATURE.SURVIVE = {};
MAGPIE.PDL.CREATURE.COMPETE = {};
MAGPIE.PDL.CREATURE.INTERACT = {};
MAGPIE.PDL.CREATURE.ADAPT = {};

//------------------------------------------------------------------------
//#region basics

function Game_Creature(data = {
	speciesID: -1, 
	isActor: false, 
	LVL: 0, 
	type: -1})
{
	this.initialize(data);
}

Game_Creature.prototype.initialize = function(data)
{
	this._isActor = data?._isActor;
	this._name = data?.firstName;
	this.nickname = data?.nickname;
	this.speciesID = data.speciesID;
	this._level = data?.level;
	this._type = data?.type;
	this._created = $gameSystem.playtime();
	this.breedId = data?.breedId;
	this.sex = data?.sex;
	this.firstName = data?.firstName;
	this.lastName = data?.lastName;
	this._traits = data?.traits || [];
	this._birthDay = data?.birthday;
	this._exp = data?.exp || [];
	this._aType = data?.aType;
	this._location = data?.location || [0,0,0];
	this._states = [];
	setTimeout(() => {if(this.speciesID > 0) this.setup()}, 100);
}

Game_Creature.prototype.setup = function()
{
	//
}

Game_Creature.prototype.species = function()
{
	return $dataSkills[this.speciesID]
}

Game_Creature.prototype.skillCard = function()
{
	this.species().skillCard();
}

Game_Creature.prototype.physique = function()
{
	let physiqueId = Number(this.species().meta.physique);
	return $dataArmors[physiqueId]
}


//#endregion





//#endregion







//------------------------------------------------------------------------
//#region GROUP
function Game_Group()
{
	this.initialize(...arguments)
}

Game_Group.prototype.initialize = function()
{
	//
}

function PDL_Species(speciesID = -1, size = 1)
{
	this.initialize(speciesID, size)
}
PDL_Species.prototype = Object.create(Game_Group.prototype);
PDL_Species.prototype.constructor = PDL_Species;
PDL_Species.prototype.initialize = function(speciesID, size)
{
	Game_Group.prototype.initialize.call(this);
	this._speciesID = speciesID;
	this._size = size;
}
//#endregion






//------------------------------------------------------------------------
//#region ENEMY
MAGPIE.PDL.database._Game_Enemy_originalName = Game_Enemy.prototype.originalName;
Game_Enemy.prototype.originalName = function()
{
	if(!this._name) return MAGPIE.PDL.database._Game_Enemy_originalName.call(this);
	return this._name
}

//#endregion





//------------------------------------------------------------------------
//#region REGION

//#endregion





//------------------------------------------------------------------------
//#region TERRITORY

//#endregion





//------------------------------------------------------------------------
//#region HABITAT

//#endregion







//------------------------------------------------------------------------
//#region EVENT

function PDL_Event(data = {name: "", type: -1, eventID: 0, mapID: 0})
{
	this.initialize(data);
}
PDL_Event.prototype.initialize = function(data)
{
	Object.keys(data).forEach(k => this["_" + k] = data[k]);
}


//#endregion





//------------------------------------------------------------------------
//#region OBJECT


function Game_Object()
{
	this.initialize(...arguments);
}
Game_Object.prototype.initialize = function()
{
	//
}


//------------------------------------------------------------------------
//#region commodity

function Game_Commodity(data = {name: ""})
{
	this.initialize(data);
}
Game_Commodity.prototype = Object.create(Game_Object.prototype);
Game_Commodity.prototype.constructor = Game_Commodity;
Game_Commodity.prototype.initialize = function(data)
{
	Game_Object.prototype.initialize.call(this);
	this._name = data?.name;
	this.sector = data?.sector;
	this.category = data?.category;
	this._requirements = data?.requirements || [];
	this._recipes = data?.recipes || [];
	this._installability = data?.installs || [];
	this._replacedBy = data?.replaced || [];
	this._replaces = data?.replaces || [];
	this._components = data?.components || [];
	this._isImported = data?.isImported || false;
	$PDL.commodity.add(this);
	this.setup();
	return this.ID
}

Game_Commodity.prototype.setup = function()
{
	this._requirements
		.forEach(id => {
			let item = $PDL.commodity.getElementByID(id);
			if(item) item.setRecipeOf(this.ID);});
	this._recipes
		.forEach(id => {
			let item = $PDL.commodity.getElementByID(id);
			if(item) item.setRequirementOf(this.ID);});
	this._installability
		.forEach(id => {
			let item = $PDL.commodity.getElementByID(id);
			if(item) item.setComponentOf(this.ID);});
	this._components
		.forEach(id => {
			let item = $PDL.commodity.getElementByID(id);
			if(item) item.setInstallOf(this.ID);});
}

Game_Commodity.prototype.setRecipeOf = function(id)
{
	this._recipes.push(id)
}

Game_Commodity.prototype.setRequirementOf = function(id)
{
	this._requirements.push(id)
}

Game_Commodity.prototype.setComponentOf = function(id)
{
	this._components.push(id)
}

Game_Commodity.prototype.setInstallOf = function(id)
{
	this._installability.push(id)
}

Game_Commodity.prototype.recipe = function(index)
{
	return $PDL.commodity.getElementByID(this._recipes[index])
}

Game_Commodity.prototype.requirement = function(index)
{
	return $PDL.commodity.getElementByID(this._requirements[index])
}

Game_Commodity.prototype.installability = function(index)
{
	return $PDL.commodity.getElementByID(this._installability[index])
}

Game_Commodity.prototype.component = function(index)
{
	return $PDL.commodity.getElementByID(this._components[index])
}

Game_Commodity.prototype.replacedBy = function(index)
{
	return $PDL.commodity.getElementByID(this._replacedBy[index])
}

Game_Commodity.prototype.replaces = function(index)
{
	return $PDL.commodity.getElementByID(this._replaces[index])
}

MAGPIE.PDL.COMMODITY = {};
MAGPIE.PDL.COMMODITY.importAll = function(filename)
{
	let items = MAGPIE.SYS.readJSON(filename);
	items.forEach(item => {
		let data = MAGPIE.PDL.COMMODITY.makeImportData(item);
		data.isImported = true;
		new Game_Commodity(data);
	})
}

MAGPIE.PDL.COMMODITY.makeImportData = function(item)
{
	let data = {};
	data.name = item.Name;
	data.sector = item.Sector;
	data.category = item.Category;
	data.requirements = MAGPIE.PDL.COMMODITY.extrapolate(item.Requirements) || [];
	data.recipes = MAGPIE.PDL.COMMODITY.extrapolate(item.Recipes) || [];
	data.installs = MAGPIE.PDL.COMMODITY.extrapolate(item.Installability) || [];
	data.replaced = MAGPIE.PDL.COMMODITY.extrapolate(item["Stand-in by"]) || [];
	data.replaces = MAGPIE.PDL.COMMODITY.extrapolate(item["Stand-in for"]) || [];
	data.components = MAGPIE.PDL.COMMODITY.extrapolate(item["Usable Components\r"]) || [];
	return data
}

MAGPIE.PDL.COMMODITY.extrapolate = function(field)
{
	if(field.length < 1) return []
	let items = field.split(", ");
	if(items.length < 1) return []
	let names = [];
	let results = [];
	items.forEach(item => names.push(item.split(" (")[0]));
	names.forEach(n => {
		let id = undefined;
		let item = $PDL.commodity.getElementByName(n);
		if(item) id = item.ID;
		if(!id) id = new Game_Commodity({name: n});
		results.push(id);
	})
	return results
}

MAGPIE.PDL.COMMODITY.exportAll = function()
{
	let data = [];
	$PDL.commodity.pools.forEach(pool => pool.pool
		.forEach(item => {
			if(!item.isImported) 
				data.push(MAGPIE.PDL.COMMODITY.makeExportData(item))
		}));
	$MAGPIE.DATA.writeJSON("exportedCommodities", data);
}

MAGPIE.PDL.COMMODITY.makeExportData = function(item)
{
	let data = {};
	let comma = ", ";
	let requirements = "";
	let recipes = "";
	let installs = "";
	let components = "";
	let replaced = "";
	let replaces = "";
	item._requirements
		.forEach((req, index) => {
			if(index > 0) requirements += comma;
			requirements += `${item.requirement(req).name}`;
		});
	item._recipes.forEach((rec, index) => {
		if(index > 0) recipes += comma;
		recipes += `${item.recipe(rec).name}`;
	});
	item._installability.forEach((inst, index) => {
		if(index > 0) installs += comma;
		installs += `${item.installability(inst).name}`;
	});
	item._components.forEach((comp, index) => {
		if(index > 0) components += comma;
		components += `${item.component(comp).name}`;
	});
	item._replacedBy.forEach((repd, index) => {
		if(index > 0) replaced += comma;
		replaced += `${item.replacedBy(repd).name}`;
	});
	item._replaces.forEach((reps, index) => {
		if(index > 0) replaces += comma;
		replaces += `${item.replaces(reps).name}`;
	});
	data.Name = item.name;
	data.Sector = item.sector;
	data.Category = item.category;
	data.Requirements = requirements;
	data.Recipes = recipes;
	data.Installability = installs;
	data["Stand-in by"] = replaced;
	data["Stand-in for"] = replaces;
	data["Usable Components"] = components;
}
//#endregion






//------------------------------------------------------------------------
//#region Depot

function Game_Depot(data)
{
	this.initialize(data);
}
Game_Depot.prototype = Object.create(Game_Object.prototype);
Game_Depot.prototype.constructor = Game_Depot;
Game_Depot.prototype.initialize = function(data)
{
	Game_Object.prototype.initialize.call(this);
	this._name = data?.name;
	this._type = data?.type;
	this._contents = data?.contents;
}

//#endregion



//#endregion























//#endregion



//end of plugin