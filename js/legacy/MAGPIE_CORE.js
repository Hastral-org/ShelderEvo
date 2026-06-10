//-----------------------------------------------------------------------------------
//#region META
//------------------------------------------------------------------------
/*:
 * @target MZ
 * @plugindesc [Tier_1] v0.4.0 MAGPIE_CORE
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-core
 * 
 * @help
 * (MAGPIE) CORE
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.4.1 2025 08 24
 * - MAGPIE.SYS v0.9.0 conformity update
 * 
 * v0.4.0 2025 07 31
 * - plugin decoupled from MAGPIE.js and standardized in MAGPIE plugin suite
 * 
 * pre-0.4.0
 * - integrated with MAGPIE.js
 * 
 */
//#endregion








//-----------------------------------------------------------------------------------
//#region INDEX
//------------------------------------------------------------------------
var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.9.0";
MAGPIE.CORE = {};
MAGPIE.CORE.version = "0.4.1";
MAGPIE.CORE.isInstalled = true;
MAGPIE.CORE.pluginName = "MAGPIE_CORE";
MAGPIE.CORE.meta = {
	name: "M.A.G.P.I.E. CORE",
	firmware: "20250826",
	firmwareFile: `${MAGPIE.CORE.pluginName}.js`,
	isCore: true
};

//#endregion






//------------------------------------------------------------------------
//#region CORE
var $MAGPIE_CORE = null;

function MAGPIE_Core(data)
{
	this.initialize(data);
}
MAGPIE_Core.prototype.initialize = function(data)
{
	this.isInit = true;
	this._parent = data?.parent;
}

MAGPIE_Core.prototype.start = function()
{
	this.isActive = true;
}

MAGPIE_Core.prototype.parent = function()
{
	return $MAGPIE.ENTITY.getElementByName(this._parent)
}


//#endregion






//------------------------------------------------------------------------
//#region RUNTIME

MAGPIE.CORE._runtime = {};
MAGPIE.CORE._runtime._MAGPIE_System_initialize = MAGPIE_System.prototype.initialize;
MAGPIE_System.prototype.initialize = function()
{
	MAGPIE.CORE._runtime._MAGPIE_System_initialize.call(this);
	const core = this.DATA.readJSON("MAGPIE/MAGPIE_CORE", "warn");
	this.CORE = new MAGPIE_Core(core);
}

MAGPIE.CORE._runtime._MAGPIE_SYS_start = MAGPIE.SYS.start;
MAGPIE.SYS.start = function()
{
	MAGPIE.CORE._runtime._MAGPIE_SYS_start.call(this);
	$MAGPIE_CORE = $MAGPIE.DATA.readJSON("MAGPIE/MAGPIE_Core", "warn") || new MAGPIE_Data();
}

MAGPIE.CORE._runtime._DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function()
{
	MAGPIE.CORE._runtime._DataManager_createGameObjects.call(this);
	$MAGPIE.CORE.start();
}

MAGPIE.CORE._runtime._DataManager_makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function()
{
	const contents = MAGPIE.CORE._runtime._DataManager_makeSave.call(this);
	contents.CORE = $MAGPIE_CORE;
	MAGPIE.CORE._runtime._saveCoreData();
	return contents
}

MAGPIE.CORE._runtime._saveCoreData = function()
{
	$MAGPIE.DATA.writeJSON("MAGPIE/MAGPIE_CORE", $MAGPIE.CORE);
}

MAGPIE.CORE._runtime._DataManager_loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents)
{
	MAGPIE.CORE._runtime._DataManager_loadSave.call(this, contents);
	$MAGPIE_CORE = contents.CORE;
}


//#endregion




//------------------------------------------------------------------------
//end of plugin