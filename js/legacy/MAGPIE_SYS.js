//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_0] v0.11.2 MAGPIE_SYS
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-sys
 * 
 * @help
 * Common 'operating system' plugin for the entire MAGPIE plugin suite.
 * Place on top of all other MAGPIE plugins
 * 
 * ----------------------------------------------------------------------------
 * FEATURES
 * ----------------------------------------------------------------------------
 * - MAGPIE OS (Multi-Access General Purpose Intelligent Entity) Operating 
 *   system with basic functionality for the plugin suite
 * 
 * 
 * - HIMS (Humanized Interface Management System)
 *   A framework to operate additional components while ensuring compatibility 
 *   across the plugin suite and the base RMMZ engine
 * 
 * ----------------------------------------------------------------------------
 * PARAMETERS
 * ----------------------------------------------------------------------------
 * 
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.11.2 2025 11 01
 * - fixed: MAGPIE_Runtime guest hosting and system refresh not configured
 * 		properly
 * 
 * v0.11.1 2025 10 30
 * - fixed MAGPIE_Log only logging playtime data
 * - added MAGPIE_Log compatibility with DateTime System
 * 
 * v0.11.0 2025 09 25
 * - MAGPIE_Commodity and MAGPIE_Entity integration
 * 
 * v0.10.0 2025 08 28
 * - migrated MAGPIE_MCON to MAGPIE_CBE
 * - MAGPIE_Runtime bugfixes and consolidation
 * 
 * v0.9.1 2025 08 27
 * - MAGPIE_EntityDatabase update and conformity overhaul
 * 
 * v0.9.0 2025 08 25
 * - SYS overhaul with runtime prototypes and new structure
 * - NEW: Resource and Entity classes + databases framework
 * - NEW: Magpayan language initial build
 * 
 * v0.8.0 2025 08 21
 * - HIMS overhaul
 * 
 * v0.7.1 2025 08 14 
 * - MAGPIE.run refresh loop bugfix: _guests refresh won't accept null
 *   causing catastrophic error
 * 
 * v0.7.0 2025 07 31 - plugin suite overhaul
 * 
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
 * ----------------------------------------------------------------------------
 * 
 * 
 * @param HIMS
 * @text H.I.M.S. settings
 * 
 * @param project
 * @parent HIMS
 * @text Project Name
 * @type text
 * @desc Insert any text for the project title to be displayed in HIMS interface
 * @default My_Project
 * 
 * @param windows
 * @parent HIMS
 * @text Window settings
 * @type struct<windows>
 * 
 * @param variables
 * @parent HIMS
 * @text Variables
 * @type struct<cVar>
 * 
 * @param switches
 * @parent HIMS
 * @text Switches
 * @type struct<cSwitch>
 * 
 * @param commonEvents
 * @parent HIMS
 * @text Common Events
 * @type struct<CE>
 * 
 * @param skills
 * @parent HIMS
 * @text Skills
 * @type struct<cSkills>
 * 
 * @param states
 * @parent HIMS
 * @text States
 * @type struct<cStates>
 * 
 * @param items
 * @parent HIMS
 * @text Items
 * @type struct<cItems>
 * 
 * @param loadmex
 * @parent HIMS
 * @text Loading message
 * @type struct<loading>
 * 
 * @param console
 * @parent HIMS
 * @text HIMS console
 * @type struct<console>
 * 
 * @param account
 * @parent HIMS
 * @text HIMS account
 * @type struct<account>
 * 
 * @param sound
 * @parent HIMS
 * @text Sound effects
 * @type struct<sound>
 */

/*~struct~windows:
 * 
 * @param title
 * @text Title scene
 * @default "Scene_Title"
 * 
 * @param editTitle
 * @parent title
 * @text Edit Scene_Title
 * @desc Select TRUE to edit Scene_Title or FALSE to disable these settings
 * @type boolean
 * @default false
 * 
 * @param titleMode
 * @parent title
 * @text Edit mode
 * @desc Select the method to edit the Scene_Title command window
 * @type select
 * @option basic (edit X and Y offset on load)
 * @value 0
 * @option advanced (edit X, Y, and Width directly just after load)
 * @value 1
 * @default 0
 * 
 * @param titleX
 * @parent title
 * @text Title offset X
 * @desc Edit this value to offset the X position of the title window
 * @type combo
 * @option 0
 * @option Graphics.boxWidth - this._commandWindow.width
 * @default 0
 * 
 * @param titleY
 * @parent title
 * @text Title offset Y
 * @desc Edit this value to offset the Y position of the title window
 * @type combo
 * @option 0
 * @option (Graphics.boxHeight / 2) - (this._commandWindow.height / 2)
 * @default 0
 * 
 * @param titleW
 * @parent title
 * @text Title window width
 * @desc Edit this value to change the window width
 * @type combo
 * @option 240
 * @default 240
 */

/*~struct~loading:
 * 
 * @param unloaded
 * @text Unloaded symbol
 * @desc Input a character to display the unloaded bar ('\\i[x]' for icons)
 * @type text
 * @default ░
 * 
 * @param loaded
 * @text Loaded symbol
 * @desc Input a character to display the loaded bar ('\\i[x]' for icons)
 * @type text
 * @default ▓
 */

/*~struct~console:
 * 
 * @param font_color
 * @text Message font color
 * @desc Input a number (will always append '\c[number]' to console text)
 * @type number
 * @default 11
 * 
 * @param x
 * @text Console x position
 * @type combo
 * @option 0
 * 
 * @param y
 * @text Console y position
 * @type combo
 * @option Graphics.boxHeight - 100
 * 
 * @param w
 * @text Console width
 * @type combo
 * @option Graphics.boxWidth
 *
 * @param timeout
 * @text Console timeout
 * @default Minimum amount of seconds before the console window closes
 * @type number
 * @default 3
 * @min 1
 * @max 15
 * 
 * @param icon
 * @text Console icon
 * @type number
 * @desc Insert the index of the desired console window icon
 * @default 0
 */

/*~struct~account:
 * 
 * @param player
 * @text Player actor slot
 * @desc select which actor slot to reserve for the Player account
 * @type actor
 * @default 1
 */

/*~struct~sound:
 * 
 * @param newGame
 * @text New Game SFX
 * 
 * @param newGameSE
 * @parent newGame
 * @text New game SFX file
 * @type file
 * @dir audio/se/
 * 
 * @param newGameVol
 * @parent newGame
 * @text New game SFX volume
 * @type number
 * @default 100
 * 
 * @param newGamePit
 * @parent newGame
 * @text New game SFX pitch
 * @type number
 * @default 100
 * @max 150
 * @min 50
 * 
 * @param newGameFade
 * @parent newGame
 * @text New Game Fade Out
 * @type number
 * @default 60
 * @max 300
 * @min 30
 */

//#endregion
//------------------------------------------------------------------------










//------------------------------------------------------------------------
//#region INDEX
/**
 * @class MAGPIE
 * @desc Multi-Access General Purpose Intelligent Entity
 *
 * @property {Object} MAGPIE General purpose A.I. system
 * @property {Object} MAGPIE.SYS common operating system and firmware
 * @property {Object} MAGPIE.CODE common code cypher 
 * @property {Object} MAGPIE.CORE main core and physical operating drive(s)
 * @property {Object} MAGPIE.MCON joint-operations control
 * @property {Object} MAGPIE.DRONE drone control for DAICU, SAICU, and MAICU
 * @property {Object} MAGPIE.ARK Human colonization project
 * @property {Object} MAGPIE.LOG integrated digital library
 * @property {Object} MAGPIE.HIMS Humanized Interface Management System 
 */
var MAGPIE = MAGPIE || {};
MAGPIE.version = "0.11.2";
MAGPIE.HIMS = {};
MAGPIE.HIMS.meta = {
	name: "Humanized Interface Management System",
	isHIMS: true,
	version: "0.5.0"
};
MAGPIE.HIMS.edit = {};
MAGPIE.pluginName = "MAGPIE_SYS";
MAGPIE.meta = {
	name: "Multi-Access General-Purpose Intelligent Entity",
	isAI: true,
	isOS: true,
	firmware: "20251101",
	firmwareFile: `${MAGPIE.pluginName}.js`
}
/**
 * 
 * {@link MAGPIE.CODE.meta}
 * 
 */
MAGPIE.parameters = PluginManager.parameters(MAGPIE.pluginName);
MAGPIE.HIMS.settings = {};
MAGPIE.HIMS.settings.meta = {isSettings: true};
MAGPIE.HIMS.settings.projectName = MAGPIE.parameters['project'];
/**
 * {@link MAGPIE.HIMS.settings.title.window}
 * {@link MAGPIE.HIMS.settings.title.newGame}
 */
MAGPIE.HIMS.settings.title = {};
MAGPIE.HIMS.settings.title.meta = {isSettings: true};

MAGPIE.HIMS.settings.load_message = JSON.parse(MAGPIE.parameters.loadmex);
/**
 * {@link MAGPIE.HIMS.message.console}
 */
MAGPIE.HIMS.settings.console = JSON.parse(MAGPIE.parameters.console);
/**
 * {@link MAGPIE.HIMS.account.meta}
 */
MAGPIE.HIMS.settings.account = JSON.parse(MAGPIE.parameters.account);

/** 
 * 
 * MAGPIE.SYS
 * @property {Object} meta.isFirmware
 * @property {Object} operation 
 * @property {Object} data
 * @property {Object} defence
 * @property {Object} maintenance
 */
MAGPIE.SYS = {};
MAGPIE.SYS.meta = {
	name: "Common operating system and firmware",
	isOS: true,
	isFirmware: true
};
MAGPIE.SYS.operation = {};
MAGPIE.SYS.data = {};
MAGPIE.SYS.defence = {};
MAGPIE.SYS.maintenance = {};
MAGPIE.SYS.runtime = {};
// MAGPIE.LOG = {};
// MAGPIE.LOG.meta = {isLibrary: true, isInstalled: false};

//#endregion
//------------------------------------------------------------------------












//------------------------------------------------------------------------
//#region MZ Plugin

MAGPIE.SYS.data.parseStructList = function(arg)
{
	let list = JSON.parse(arg);
	let thing = [];
	list.forEach(element => thing.push(JSON.parse(element)));
	return thing
}

MAGPIE.SYS.data.parseStructArr = function(arg)
{
	let thing = JSON.parse(arg);
	Object.keys(thing).forEach(k => thing[k] = eval(thing[k]));
	return thing
}

MAGPIE.SYS.data.parseStructObj = function(arg)
{
	let thing = JSON.parse(arg);
	Object.keys(thing).forEach(k => thing[k] = Number(thing[k]));
	return thing
}

MAGPIE.SYS.runtime.interpreter = function()
{
	let interpreter = undefined;
	const currentScene = MAGPIE.SYS.runtime.getScene();
	if(currentScene === "Scene_Map")
		interpreter = "$gameMap";
	if(currentScene === "Scene_Battle")
		interpreter = "$gameTroop";
	return interpreter
}

MAGPIE.SYS.runtime.getScene = function()
{
	return SceneManager._scene.constructor.name
}

MAGPIE.SYS.data.generateID = function(collection)
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

MAGPIE.SYS.runtime.hasInit = function()
{
	if($gameSystem?._initialized && $gameMap?.mapId())
	{
		return true
	}
	else
		return false
}

MAGPIE.SYS.runtime.here = function()
{
	if(MAGPIE.SYS.runtime.hasInit())
	{
		return currentTerritory
	}
}
//#endregion
//------------------------------------------------------------------------










//------------------------------------------------------------------------
//#region Seed RNG

/**
 * David Bau Seeded random number generator library
 * https://github.com/davidbau/seedrandom
 * 
 * Copyright 2019 David Bau.
 * Permission is hereby granted, free of charge, to any person obtaining 
 * a copy of this software and associated documentation files 
 * (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, 
 * publish, distribute, sublicense, and/or sell copies of the Software, 
 * and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * The above copyright notice and this permission notice shall be 
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const seedrandom = require('seedrandom');

//#endregion





//------------------------------------------------------------------------
//#region OPERATION
//------------------------------------------------------------------------




//------------------------------------------------------------------------
//#region Firmware
function MAGPIE_Firmware()
{
	this.initialize(...arguments);
}
MAGPIE_Firmware.prototype.initialize = function()
{
	this.meta = MAGPIE.meta;
}

MAGPIE_Firmware.prototype.metaName = function()
{
	
	return this?.meta?.name || this.constructor.name
}

MAGPIE_Firmware.prototype.name = function()
{
	const name = this._name || this.constructor.name
	return `${name}${this?.ID || ""}`
}

MAGPIE_Firmware.prototype.generateID = function()
{
	return Number(Math.ceil(Math.random() * 1000000000)
		.toString().padStart(10, 0))
}
MAGPIE_Firmware.prototype.awake = function()
{
	//
}
MAGPIE_Firmware.prototype.refresh = function()
{
	//
}

MAGPIE_Firmware.prototype.proxyUp = function(target = undefined)
{
	if(!target) target = this;
	const handler = {
		get: (target, prop) => {
			return target[prop]
		}
	}
	return new Proxy(target, handler)
}



function MAGPIE_Proxy(target = "", type = "")
{
	this.initialize(target, type);
}
MAGPIE_Proxy.prototype.initialize = function(target, type)
{
	this._target = target;
	this._type = type;
}

MAGPIE_Proxy.prototype.proxy = function()
{
	const ID = this._target;
	if(this._type === "MCON") return $MAGPIE.MCON.DATABASE.getElementByID(ID)
	if(this._type === "RESOURCE") return $MAGPIE.RESOURCE.getElementByID(ID)
	return $PDL[this._type].getElementByID(ID)
}

// MAGPIE_Proxy.prototype.proxy = function()
// {
// 	let target = eval(this._target);
// 	const handler = {
// 		get: (target, prop) => {
// 			return target[prop]
// 		}
// 	}
// 	return new Proxy(target, handler)
// }



function MAGPIE_System(data)
{
	this.initialize(data)
}
MAGPIE_System.prototype = Object.create(MAGPIE_Firmware.prototype);
MAGPIE_System.prototype.constructor = MAGPIE_System;
MAGPIE_System.prototype.initialize = function()
{
	MAGPIE_Firmware.prototype.initialize.call(this);
	this.isInit = true;
	this._name = "MAGPIE_SYS"
	this.ID = this.generateID();
	this.DATA = new MAGPIE_Data();
	this.RESOURCE = this.DATA.readJSON("MAGPIE/MAGPIE_Resource", "warn");
	this.MAGPAYAN = this.DATA.readJSON("MAGPIE/MAGPIE_Magpayan", "warn");
	this.RUNTIME = new MAGPIE_Runtime({parent: "$MAGPIE"});
	this.RUNTIME.awake();
	console.log("MAGPIE ready.");
	// this.awake();
}

MAGPIE_System.prototype.refresh = function()
{
	//setInterval(() => this.RUNTIME.refresh(), 1000);
	// console.log("MAGPIE.SYS refresh!");
	if(!this.status() || !this.RUNTIME.refresh())
		console.warn("MAGPIE_SYS status check: FAIL!");
}

MAGPIE_System.prototype.superTICK = function()
{
	if(!this.status() || !this.RUNTIME.refresh())
		console.warn(`${this.name()} status check: FAIL!`);
}

MAGPIE_System.prototype.status = function()
{
	return true
}

MAGPIE_System.prototype.runtime = function()
{
	let runtime = this.RUNTIME._runtime;
	return this.RUNTIME.readableTime(runtime, 0, true)
}

//#region MATH
MAGPIE_Firmware.prototype.convertDegToRad = function(value)
{
	return value * Math.PI / 180
}

MAGPIE_Firmware.prototype.convertRadToDeg = function(value)
{
	return value * (180 / Math.PI)
}

//#region vector
function Game_Vector(data = {x: 0, y: 0, z: 0})
{
	this.initialize(data);
}
Game_Vector.prototype.initialize = function(data)
{
	// this._parent = data?.parent;
	this._x = data?.x;
	this._y = data?.y;
	this._z = data?.z;
}

/**
     * Returns the magnitude (length) of the vector.
     * @returns {number} The magnitude.
     */
Game_Vector.prototype.mag = function()
{
	const x = this._x;
	const y = this._y;
	const z = this._z;
	return Math.sqrt((x * x) + (y * y) + (z * z))
}

/**
     * Calculates the dot product of this vector and the given vector.
     * @param {Vector3} vector The other vector.
     * @returns {number} The dot product.
     */
Game_Vector.prototype.dot = function(vector)
{
	const x1 = this._x;
	const x2 = vector._x;
	const y1 = this._y;
	const y2 = vector._y;
	const z1 = this._z;
	const z2 = vector._z;
	return (x1 * x2) + (y1 * y2) + (z1 * z2)
}

/**
     * Multiplies this vector's components by a scalar value in place.
     * @param {number} s The scalar value.
     * @returns {Vector3} This vector.
     */
Game_Vector.prototype.multiplyScalar = function(s)
{
	this._x *= s;
	this._y *= s;
	this._z *= s;
	return this
}

Game_Vector.prototype.cross = function(vector)
{
	const x1 = this._x;
	const x2 = vector._x;
	const y1 = this._y;
	const y2 = vector._y;
	const z1 = this._z;
	const z2 = vector._z;
	const data = {
		x: (y1 * z2) - (z1 * y2),
		y: (z1 * x2) - (x1 * z2),
		z: (x1 * y2) - (y1 * x2)
	}
	return new Game_Vector(data)
}

/**
     * Calculates the cross product of two vectors (a x b) and sets this vector to the result.
     * @param {Vector3} a The first vector.
     * @param {Vector3} b The second vector.
     * @returns {Vector3} This vector.
     */
Game_Vector.prototype.crossVectors = function(a, b)
{
	const ax = a._x, ay = a._y, az = a._z;
	const bx = b._x, by = b._y, bz = b._z;
	this._x = ay * bz - az * by;
	this._y = az * bx - ax * bz;
	this._z = ax * by - ay * bx;
	return this
}

Game_Vector.prototype.scale = function(k)
{
	return new Game_Vector({
		x: this._x * k,
		y: this._y * k,
		z: this._z * k
	})
}

Game_Vector.prototype.add = function(vector)
{
	return new Game_Vector({
		x: this._x + vector._x,
		y: this._y + vector._y,
		z: this._z + vector._z
	})
}


Game_Vector.prototype.subtract = function(vector)
{
	return new Game_Vector({
		x: this._x - vector._x,
		y: this._y - vector._y,
		z: this._z - vector._z
	})
}

/**
     * Subtracts the given vector from this vector in place.
     * @param {Vector3} v The vector to subtract.
     * @returns {Vector3} This vector.
     */
Game_Vector.prototype.sub = function(v) 
{	
	this._x -= v._x;
	this._Y -= v._y;
	this._z -= v._z;
	return this
}

/**
     * Normalizes this vector in place (makes its length 1).
     * @returns {Vector3} This vector.
     */
Game_Vector.prototype.normalize = function()
{
	const mag = this.mag();
	// if(mag === 0) return new Game_Vector({x: 0, y: 0, z: 0})
	// return this.scale(1 / mag)
	if(mag > 1e-12)
	{
		const invMag = 1 / mag;
		this._x *= invMag;
		this._y *= invMag;
		this._z *= invMag;
	}
	else
	{
		this._x = 0;
		this._y = 0;
		this._z = 0;
	}
	return this
}

/**
     * Rotates the vector around the X-axis by a given angle (in radians).
     * This is used to apply inclination to the 2D orbital plane.
     * @param {number} angle - Rotation angle in radians.
     * @returns {Vector3} The new rotated vector.
*/
Game_Vector.prototype.rotateX = function(angle)
{
	const cos = Math.cos(angle);
	const sin = Math.sin(angle);

	// Rotation matrix applied to the Y and Z components:
        // X_new = X
        // Y_new = Y * cos(angle) - Z * sin(angle)
        // Z_new = Y * sin(angle) + Z * cos(angle)
	return new Game_Vector({
		x: this._x,
		y: this._y * cos - this._z * sin,
		z: this._y * sin + this._z * cos
	})
}

 /**
     * Creates an exact copy of this vector.
     * @returns {Vector3} A new Vector3 instance.
     */
Game_Vector.prototype.clone = function()
{
	return new Game_Vector({x: this._x, y: this._y, z: this._z})
}
//#endregion



//#endregion



MAGPIE.SYS._runtime = {};
MAGPIE.SYS._runtime._SceneManager_updateMain = SceneManager.updateMain;
SceneManager.updateMain = function()
{
	MAGPIE.SYS._runtime._SceneManager_updateMain.call(this);
	if(!this?.MAGPIE) this.MAGPIE = 0;
	this.MAGPIE++
	if(!$MAGPIE) return
	$MAGPIE.refresh();
	if(this.MAGPIE >= 60)
	{
		this.MAGPIE = 0;
		$MAGPIE.superTICK();
	}
}


//#endregion





//------------------------------------------------------------------------
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





//------------------------------------------------------------------------
//#region State

const STATE = {};
STATE.OFF = -1;
STATE.IDLE = 0;
STATE.ACTIVE = 1;
STATE.BUSY = 2;
STATE.STUCK = 3;
STATE.BROKEN = 4;

//#endregion






//------------------------------------------------------------------------
//#region Runtime


function MAGPIE_Runtime(data)
{
	this.initialize(data);
}
MAGPIE_Runtime.prototype = Object.create(MAGPIE_Firmware.prototype);
MAGPIE_Runtime.prototype.constructor = MAGPIE_Runtime;
MAGPIE_Runtime.prototype.initialize = function(data)
{
	this.isInit = true;
	this.isActive = false;
	this.meta = data?.name || {isRuntime: true, isHost: true};
	this._name = data?.name || this.constructor.name;
	this.ID = this.generateID();
	this._parent = data?.parent;
	this._runtime =  0;
	this._superTICK = 0;
	this._megaTICK = 0;
	this._ultraTICK = 0;
	this._guests = data?.guests || [];
	this._superGuests = [];
	this._megaGuests = [];
	this._ultraGuests = [];
}

MAGPIE_Runtime.prototype.awake = function()
{
	MAGPIE_Firmware.prototype.awake.call(this);
	this.isActive = true;
}

MAGPIE_Runtime.prototype.refresh = async function()
{
	// console.time(`${this.name()}_cycle`)
	if(!this.isActive || !this.parent()?.isInit) return false
	this._superTICK++;
	this._runtime++;
	if(this._superTICK >= 60) this.superTICK();
	await this.updateGuests();
	// console.timeEnd(`${this.name()}_cycle`)
	return true
}

MAGPIE_Runtime.prototype.parent = function()
{
	return eval(this._parent)
}





//#region format
MAGPIE_Runtime.prototype.formatDigits = function(digits = 0)
{
	return digits.toString().padStart(2,0)
}

MAGPIE_Runtime.prototype.formatDate = function(year, month, day, hour, minute, second)
{
	let digit_month = this.formatDigits(month);
	let digit_day = this.formatDigits(day);
	let digit_hour = this.formatDigits(hour);
	let digit_minute = this.formatDigits(minute);
	let digit_second = this.formatDigits(second);
	return `${year}-${digit_month}-${digit_day}-${digit_hour}-${digit_minute}-${digit_second}`
}

MAGPIE_Runtime.prototype.codeDate = function(year, month, day)
{
	let digit_month = this.formatDigits(month);
	let digit_day = this.formatDigits(day);
	return `${year}${digit_month}${digit_day}`
}

MAGPIE_Runtime.prototype.formatTime = function(hour, minute, second = null)
{
	let standard = `${Math.floor(hour / 10)}${hour % 10}:${Math.floor(minute / 10)}${minute % 10}`;
	if(second == null) return standard
	return standard + `:${Math.floor(second / 10)}${second % 10}`
}

MAGPIE_Runtime.prototype.readableTime = function(totalSeconds, calendar = 0, includeFull = false)
{
	let time = {};
	if(MAGTIME) time = MAGTIME.calendars[calendar];
	else if(!time || calendar < 0)
	{
		time.dayLength = 24;
		time.days = () => 365
		time.leapYear = 4;
	};
	
	const seconds = 60;
	const minutes = 60;
	const hours = time.dayLength;
	const days = time.days() + (1 / time.leapYear);
	let type = "second";
	let plural = "";
	let result = totalSeconds;
	let full = "";
	let fullType = "";
	if(result > seconds) 
	{
		result /= seconds; 
		type = "minute";
		full = Math.floor((result % 1) * seconds);
		fullType = "seconds";
	}
	if(result > minutes) 
	{
		result /= minutes; 
		type = "hour";
		full = Math.floor((result % 1) * minutes);
		fullType = "minutes";
	}
	if(result > hours) 
	{
		result /= hours;
		type = "day";
		full = Math.floor((result % 1) * hours);
		fullType = "hours";
	}
	if(result > days) 
	{
		result /= days;
		type = "year";
		full = Math.floor((result % 1) * days);
		fullType = "days";
	}  
	if(result >= 2) plural = "s";
	let message = `${Math.floor(result)} ${type}${plural}`;
	if(includeFull && result > seconds) 
		message += `, ${full} ${fullType}`;
	return message
}

MAGPIE_Runtime.prototype.formatNumber = function(number, 
	locale = "best fit", 
	options = {})
{
	return new Intl.NumberFormat(locale, {style: options.style})
		.format(number)
}

MAGPIE_Runtime.prototype.durationFormat = function(duration = {
	hours: 0,
	minures: 0,
	seconds: 0
}, style = 0, locale = "en")
{
	let chosen = ["long","short","narrow"][style];
	return new Intl.durationFormat(locale, {style: chosen})
		.format(duration)
}
//#endregion





//#region tick

MAGPIE_Runtime.prototype.superTICK = function()
{
	const TICK = MAGPIE.CODE.RUNTIME.GUEST.SUPER;
	this._superTICK = 0;
	this._megaTICK++;
	if(this._megaTICK >= 60) this.megaTICK();
	this.refreshGuests(TICK);
	// console.log(`${this.name()}: superTICK!`)
}



MAGPIE_Runtime.prototype.megaTICK = function()
{
	const TICK = MAGPIE.CODE.RUNTIME.GUEST.MEGA;
	this._megaTICK = 0;
	this._ultraTICK++;
	if(this._ultraTICK >= 24) this.ultraTICK();
	this.refreshGuests(TICK);
}

MAGPIE_Runtime.prototype.ultraTICK = function()
{
	const TICK = MAGPIE.CODE.RUNTIME.GUEST.ULTRA;
	this._ultraTICK = 0;
	this.refreshGuests(TICK);
}

MAGPIE_Runtime.prototype.refreshGuests = function(TICK)
{
	this[TICK].forEach((guest, index) => {
		if(guest) this.guest(index, TICK)?.refresh();
	})
}
//#endregion










//------------------------------------------------------------------------
//#region Guests
MAGPIE_Runtime.prototype.guest = function(index, TICK = "_guests")
{
	// const guest = eval(this[TICK][index]);
	// if(!guest) return
	// return guest

	return this[TICK][index]
}

MAGPIE_Runtime.prototype.addGuest = function(TICK = "_guests", guest)
{
	this[TICK].push(guest);
}

MAGPIE_Runtime.prototype.change_guest_priority = function(index, FROM, TO)
{
	const guest = this.removeGuest(index, FROM);
	this.addGuest(TO, guest[0])
}

MAGPIE_Runtime.prototype.removeGuest = function(index, TICK = "_guests")
{
	return this[TICK].splice(index, 1)
}

MAGPIE_Runtime.prototype.updateGuests = async function(TICK = "_guests")
{
	this._queue = this[TICK].length;
	if(this._queue < 1) return true
	try {
		while (this._queue > 0) {
			await this.refreshGuest(this._queue - 1, TICK);
			this._queue -= 1;
		}
	} catch (error) {
		console.error(error)
	}
}

MAGPIE_Runtime.prototype.refreshGuest = function(index, TICK)
{
	return new Promise((resolve, reject) => {
		try {
			setTimeout(() => {
				const guest = this.guest(index, TICK);
				if(guest?.meta?.isGuest && guest.refresh()) resolve()
				else 
				{
					this.removeGuest(index, TICK);
					reject(console.error(`${this.name()}: guest[${index}] invalid!`));
				}
			}, 100)
		} catch (error) {
			reject(error);
		}
	})
}




//#endregion
//#endregion

//#endregion
//------------------------------------------------------------------------









//------------------------------------------------------------------------
//#region DATA
//------------------------------------------------------------------------





//#region base
function MAGPIE_Data(data = {})
{
	this.initialize(data);
}
MAGPIE_Data.prototype = Object.create(MAGPIE_Firmware.prototype);
MAGPIE_Data.prototype.constructor = MAGPIE_Data;
MAGPIE_Data.prototype.initialize = function(data)
{
	MAGPIE_Firmware.prototype.initialize.call(this);
	this.ID = this.generateID();
	this._name = "MAGPIE_SYS_proxy";
	this.state = data?.state || {};
	this.logs = data?.logs || [];
	this.sync = data?.sync || {};
	this.exp = data?.exp || [];
}

MAGPIE_Data.prototype.start = function()
{
	this.Log("New session")
}
//#endregion






//------------------------------------------------------------------------
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





//------------------------------------------------------------------------
//#region Log

function MAGPIE_Log(contents = "")
{
	this.contents = contents;
	this._metaDate = new Date();
	this._created = $gameSystem?.playtime();
	if(MAGTIME && $MAGPIE?.DATA?._init) 
		this._date = new MAGPIE_Date({gameday: $TIME.accurateGameday()});
}

MAGPIE_Data.prototype.Log = function(contents = "")
{
	this.logs.push(new MAGPIE_Log(contents))
}

//#endregion






//------------------------------------------------------------------------
//#region file sys

MAGPIE_Data.prototype.writeJSON = function(filename, content, 
	reject = "error")
{
	const fs = require('fs');
	const path = require('path');
	let fullPath = path.join("data", filename + ".json");
	const callback = err => {if(err) console[reject](err)};
	try {
		return fs.writeFile(fullPath, JsonEx.stringify(content, 4), callback)
	} catch (error) {
		console[reject](error);
		return false
	}
}

MAGPIE_Data.prototype.readJSON = function(filename, log = "error")
{
	const fs = require('fs');
	const path = require('path');
	let fullPath = path.join("data", filename + ".json");
	const callback = (err, data) => {
		if(err) console.error(err)
		return data
	}
	try {
		return JsonEx.parse(fs.readFileSync(fullPath, "utf8", callback))
	} catch (error) {
		console[log](error)
		return false
	}
}

MAGPIE_Data.prototype.readJSONpromise = function(filename, log = "error")
{
	const fs = require('fs');
	const path = require('path');
	let fullPath = path.join("data", filename + ".json");
	const callback = (err, data) => {
		if(err) console.error(err)
		return data
	}
	return new Promise((resolve, reject) => {
		try {
			const data = JsonEx.parse(fs.readFileSync(fullPath, "utf8", callback));
			resolve(data)
		} catch (error) {
			console[log](error);
			reject(error.toString())
		}
	})
}

MAGPIE_Data.prototype.appendJSON = function(filename, content, 
	reject = "error")
{
	const fs = require('fs');
	const path = require('path');
	let fullPath = path.join("data", filename + ".json");
	const callback = err => {if(err) console[reject](err)};
	try {
		return fs.appendFile(fullPath, JsonEx.stringify(content), callback)
	} catch (error) {
		console[reject](error);
		return false
	}
}
//#endregion





//------------------------------------------------------------------------
//#region Sync

MAGPIE_Data.prototype.redefineObjectKey = function(obj, oldKey, newKey)
{
	delete Object.assign(obj, {[newKey]: obj[oldKey] })[oldKey];
}

//#endregion







//------------------------------------------------------------------------
//#region CODE

/**
 * 
 * {@link MAGPIE.parameters}
 */
MAGPIE.CODE = {};
MAGPIE.CODE.meta = {
	name: "Code cypher",
	isCypher: true
};

MAGPIE.CODE.HARD = false;
MAGPIE.CODE.SOFT = true;
MAGPIE.CODE.READ = false;
MAGPIE.CODE.WRITE = true;

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
MAGPIE.CODE.PERMIT = {};
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


MAGPIE.CODE.HIMS = {};
MAGPIE.CODE.HIMS.FONT_COLOR = [];
MAGPIE.CODE.HIMS.FONT_COLOR[11] = "#00a010";
//#region character_map
MAGPIE.CODE.CHARACTER_MAP = {};
MAGPIE.CODE.CHARACTER_MAP.meta = {isCharacter_map: true};
MAGPIE.CODE.CHARACTER_MAP.MUSIC_SINGLE = "♪";
MAGPIE.CODE.CHARACTER_MAP.MUSIC_DOUBLE = "♫";
MAGPIE.CODE.CHARACTER_MAP.GENDER_FEMALE = "♀";
MAGPIE.CODE.CHARACTER_MAP.GENDER_MALE = "♂";
MAGPIE.CODE.CHARACTER_MAP.GENDER_INTERSEX = "⚥";
MAGPIE.CODE.CHARACTER_MAP.EM_DASH = "—";
MAGPIE.CODE.CHARACTER_MAP.DELTA = "Δ";
MAGPIE.CODE.CHARACTER_MAP.RETURN = "↵";
MAGPIE.CODE.CHARACTER_MAP.LINE_BREAK = "\n";

const MAGSCRIPT = {};
MAGSCRIPT.MUSIC_SINGLE = MAGPIE.CODE.CHARACTER_MAP.MUSIC_SINGLE;
MAGSCRIPT.MUSIC_DOUBLE = MAGPIE.CODE.CHARACTER_MAP.MUSIC_DOUBLE;
MAGSCRIPT.GENDER_FEMALE = MAGPIE.CODE.CHARACTER_MAP.GENDER_FEMALE;
MAGSCRIPT.GENDER_MALE = MAGPIE.CODE.CHARACTER_MAP.GENDER_MALE;
MAGSCRIPT.GENDER_INTERSEX = MAGPIE.CODE.CHARACTER_MAP.GENDER_INTERSEX;
MAGSCRIPT.EM_DASH = MAGPIE.CODE.CHARACTER_MAP.EM_DASH;
MAGSCRIPT.DELTA = MAGPIE.CODE.CHARACTER_MAP.DELTA;
MAGSCRIPT.RETURN = MAGPIE.CODE.CHARACTER_MAP.RETURN;
MAGSCRIPT.LINE_BREAK = MAGPIE.CODE.CHARACTER_MAP.LINE_BREAK;
//#endregion


//#region event
/**
 * {@link MAGPIE.CODE.ENTITY.meta}
 */
MAGPIE.MCON = {};
MAGPIE.MCON.meta = {
	isCypher: true, 
	name: "Mission CONtrol & Conditional Branch Eventing Manager",
	firmware: "20250828"
};
MAGPIE.CODE.TYPE = {};
MAGPIE.CODE.TYPE.TASK = 0;
MAGPIE.CODE.TYPE.MISSION = 1;
MAGPIE.CODE.TYPE.QUEST = 2;
MAGPIE.CODE.TYPE.PROJECT = 3;
MAGPIE.CODE.TYPE.EVENT = 4;
MAGPIE.CODE.TYPE.CAMPAIGN = 5;
MAGPIE.CODE.CAT = {};
MAGPIE.CODE.CAT.NATURAL = 0;
MAGPIE.CODE.CAT.BIOME = 1;
MAGPIE.CODE.CAT.FAUNA = 2;
MAGPIE.CODE.CAT.SECURITY = 11;
MAGPIE.CODE.CAT.INDUSTRIAL = 12;
MAGPIE.CODE.CAT.LOGISTIC = 13;
MAGPIE.CODE.CAT.SCIENTIFIC = 14;
MAGPIE.CODE.CAT.HABITAT = 15;
MAGPIE.CODE.CAT.RND = 16;
MAGPIE.CODE.URGENCY = {};
MAGPIE.CODE.URGENCY.LEISURE = 0;
MAGPIE.CODE.URGENCY.ROUTINE = 1;
MAGPIE.CODE.URGENCY.PRIORITY = 2;
MAGPIE.CODE.URGENCY.IMMINENT = 3;
MAGPIE.CODE.URGENCY.IMMEDIATE = 4;
MAGPIE.CODE.GRAVITY = {};
MAGPIE.CODE.GRAVITY.TRIVIAL = 0;
MAGPIE.CODE.GRAVITY.VALUABLE = 1;
MAGPIE.CODE.GRAVITY.SIGNIFICANT = 2;
MAGPIE.CODE.GRAVITY.CRITICAL = 3;
MAGPIE.CODE.GRAVITY.EXISTENTIAL = 4;
MAGPIE.CODE.STATUS = {};
MAGPIE.CODE.STATUS.INACTIVE = 0;
MAGPIE.CODE.STATUS.PLANNED = 1;
MAGPIE.CODE.STATUS.SCHEDULED = 2;
MAGPIE.CODE.STATUS.REQUESTED = 3;
MAGPIE.CODE.STATUS.SUSPENDED = 11;
MAGPIE.CODE.STATUS.STAND_BY = 12;
MAGPIE.CODE.STATUS.RECURRING = 13;
MAGPIE.CODE.STATUS.ACTIVE = 14;
MAGPIE.CODE.STATUS.RESOLVED = 21;
MAGPIE.CODE.STATUS.PARTIAL = 22;
MAGPIE.CODE.STATUS.DISMISSED = 23
MAGPIE.CODE.STATUS.ABORTED = 24;
MAGPIE.CODE.STATUS.FAILED = 25;
MAGPIE.CODE.AMBIGUITY = {};
MAGPIE.CODE.AMBIGUITY.UNIVERSAL = 0;
MAGPIE.CODE.AMBIGUITY.AMBIGUOUS = 1;
MAGPIE.CODE.AMBIGUITY.CONTESTED = 2;
MAGPIE.CODE.AMBIGUITY.SECRET = 3;
MAGPIE.CODE.AMBIGUITY.TOP_SECRET = 4;
MAGPIE.CODE.TEMPLATE = {};
MAGPIE.CODE.TEMPLATE.QUEST = {};
MAGPIE.CODE.TEMPLATE.MISSION = {};
MAGPIE.CODE.TEMPLATE.TASK = {};
MAGPIE.CODE.ASSET = {};
MAGPIE.CODE.ASSET.ALL = 0;
MAGPIE.CODE.ASSET.AVAILABLE = 1;
MAGPIE.CODE.ASSET.ASSIGNED = 2;
MAGPIE.CODE.ASSET.SELECTED = 4;
MAGPIE.CODE.ASSET.APPROPRIATE = 5;
MAGPIE.CODE.QUEST = {};
MAGPIE.CODE.QUEST.meta = {isCypher: true, name: "Quest"}
MAGPIE.CODE.QUEST.AWAIT = "AWAIT";
MAGPIE.CODE.QUEST.DESTROY = "DESTROY";
MAGPIE.CODE.QUEST.DISABLE = "DISABLE";
MAGPIE.CODE.QUEST.PROTECT = "PROTECT";
MAGPIE.CODE.QUEST.RESOLVE = "RESOLVE";
MAGPIE.CODE.QUEST.HELP = "HELP";
MAGPIE.CODE.QUEST.ASSIST = "ASSIST";
MAGPIE.CODE.QUEST.DISCOVER = "DISCOVER";
MAGPIE.CODE.QUEST.ACQUIRE = "ACQUIRE";
MAGPIE.CODE.QUEST.DELIVER = "DELIVER";
MAGPIE.CODE.QUEST.BECOME = "BECOME";
MAGPIE.CODE.QUEST.JOIN = "JOIN";
MAGPIE.CODE.QUEST.ESTABLISH = "ESTABLISH";

MAGPIE.CODE.TASK = {};
MAGPIE.CODE.TASK.DEPLOY = 0;
MAGPIE.CODE.TASK.CONNECT = 1;
MAGPIE.CODE.TASK.NAVIGATE = 2;
MAGPIE.CODE.TASK.REACH = 3;
MAGPIE.CODE.TASK.DISMANTLE = 4;
MAGPIE.CODE.TASK.CONVERT = 5;
MAGPIE.CODE.TASK.PROCESS = 6;
MAGPIE.CODE.TASK.FIND = 7;
MAGPIE.CODE.TASK.PATROL = 8;
MAGPIE.CODE.TASK.GUARD = 9;
MAGPIE.CODE.TASK.FOLLOW = 10;
MAGPIE.CODE.TASK.HIDE = 11;
MAGPIE.CODE.TASK.MONITOR = 12;
MAGPIE.CODE.TASK.TUTOR = 13;
//#endregion

//#region runtime
MAGPIE.CODE.RUNTIME = {};
MAGPIE.CODE.RUNTIME.GUEST = {};
MAGPIE.CODE.RUNTIME.GUEST.SYS = "_guests";
MAGPIE.CODE.RUNTIME.GUEST.SUPER = "_superGuests";
MAGPIE.CODE.RUNTIME.GUEST.MEGA = "_megaGuests";
MAGPIE.CODE.RUNTIME.GUEST.ULTRA = "_ultraGuests";
//#endregion

//------------------------------------------------------------------------
//#region language

MAGPIE.CODE.LANG = {};
MAGPIE.CODE.LANG.PRONOUNS = {};
MAGPIE.CODE.LANG.PRONOUNS.FIRST_SING = {subj: "I", obj: "me", adj: "my", poss: "mine"};
MAGPIE.CODE.LANG.PRONOUNS.SECOND_PERSON = {subj: "you", obj: "you", adj: "your", poss: "yours"};
MAGPIE.CODE.LANG.PRONOUNS.FEMALE = {subj: "she", obj: "her", adj: "her", poss: "hers"};
MAGPIE.CODE.LANG.PRONOUNS.MALE = {subj: "he", obj: "him", adj: "his", poss: "his"};
MAGPIE.CODE.LANG.PRONOUNS.NON_BINARY = {subj: "they", obj: "them", adj: "their", poss: "theirs"};
MAGPIE.CODE.LANG.PRONOUNS.FIRST_PLURAL = {subj: "we", obj: "us", adj: "our", poss: "ours"};


//#endregion
//#endregion








//#region MAGPAYAN
MAGPIE.CODE.MP = {};
MAGPIE.CODE.MP.meta = {isCypher: true, name: "Magpayan"};
MAGPIE.CODE.MP.CONCEPT = {};
MAGPIE.CODE.MP.CONCEPT.meta = {isConcept: true};

function MAGPIE_Magpayan(data)
{
	this.initialize(data);
}
MAGPIE_Magpayan.prototype.initialize = function(data)
{
	this.NOUN = data?.nouns || [];
	this.VERB = data?.verbs || [];
	this.ADJECTIVE = data?.adjectives || [];
	this.ADVERB = data?.adverbs || [];
	this.CODE = data?.codes || [];
	this.SCRIPT = data?.scripts || [];
	this.CONCEPT = data?.concepts || [];
}

MAGPIE_Magpayan.prototype.concept = function(mp)
{
	return this.CONCEPT.find(c => c._mp == mp)
}

MAGPIE_Magpayan.prototype.findConcept = function(name)
{
	let result = this.CONCEPT.find(c => c._name == name);
	if(!result) result = this.CONCEPT.filter(c => c._name.match(name));
	return result
}
//#endregion








//------------------------------------------------------------------------
//#region RESOURCE




//#region code
MAGPIE.CODE.COMMODITY = {};
MAGPIE.CODE.COMMODITY.SECTOR = {};
MAGPIE.CODE.COMMODITY.SECTOR.RESOURCE = 0;
MAGPIE.CODE.COMMODITY.SECTOR.PRODUCTION = 1;
MAGPIE.CODE.COMMODITY.SECTOR.PROCESSING = 2;
MAGPIE.CODE.COMMODITY.SECTOR.SERVICE = 3;
MAGPIE.CODE.COMMODITY.SECTOR.HR = 4;
MAGPIE.CODE.COMMODITY.CAT = {};
MAGPIE.CODE.COMMODITY.CAT.COSMOS = 0;
MAGPIE.CODE.COMMODITY.CAT.BIOSPHERE = 1;
MAGPIE.CODE.COMMODITY.CAT.LABOR = 2;
MAGPIE.CODE.COMMODITY.CAT.SECURITY = 3;
MAGPIE.CODE.COMMODITY.CAT.MINING = 4;
MAGPIE.CODE.COMMODITY.CAT.BUILDING = 5;
MAGPIE.CODE.COMMODITY.CAT.OPERATION = 6;
MAGPIE.CODE.COMMODITY.CAT.COMMUNITY = 7;
MAGPIE.CODE.COMMODITY.CAT.MANUFACTURING = 8;
MAGPIE.CODE.COMMODITY.CAT.ENGINEERING = 9;
MAGPIE.CODE.COMMODITY.CAT.LOGISTICS = 10;
MAGPIE.CODE.COMMODITY.CAT.TEXTILE = 11;
MAGPIE.CODE.COMMODITY.CAT.PETROLCHEMICAL = 12;
MAGPIE.CODE.COMMODITY.CAT.HOSPITALITY = 13;
MAGPIE.CODE.COMMODITY.CAT.COMMERCE = 14;
MAGPIE.CODE.COMMODITY.CAT.UTILITIES = 15;
MAGPIE.CODE.COMMODITY.CAT.ELECTRONICS = 16;
MAGPIE.CODE.COMMODITY.CAT.ICT = 17;
MAGPIE.CODE.COMMODITY.CAT.VEHICLE = 18;
MAGPIE.CODE.COMMODITY.CAT.EDUCATION = 19;
MAGPIE.CODE.COMMODITY.CAT.RND = 20;
MAGPIE.CODE.COMMODITY.CAT.AEROSPACE = 21;
MAGPIE.CODE.COMMODITY.CAT.CCC = 22;
MAGPIE.CODE.COMMODITY.CAT.MILITARY = 23;
MAGPIE.CODE.COMMODITY.CAT.PROCESSOR = 24;
MAGPIE.CODE.COMMODITY.CAT.ENGINE = 25;
MAGPIE.CODE.COMMODITY.CAT.DEPOSIT = 26;
MAGPIE.CODE.COMMODITY.CAT.CARGO = 27;
MAGPIE.CODE.COMMODITY.CAT.SENSOR = 28;
MAGPIE.CODE.COMMODITY.CAT.COMMS = 29;
MAGPIE.CODE.COMMODITY.PROTO = {};
MAGPIE.CODE.COMMODITY.PROTO.STANDARD = "MAGPIE_Entity";
MAGPIE.CODE.COMMODITY.PROTO.OBJ = "MAGPIE_Object";
MAGPIE.CODE.COMMODITY.PROTO.STRUCT = "MAGPIE_Structure";
MAGPIE.CODE.COMMODITY.PROTO.ORG = "MAGPIE_Organisation";
MAGPIE.CODE.COMMODITY.PROTO.VEH = "MAGPIE_Vehicle";
MAGPIE.CODE.COMMODITY.PROTO.UNIT = "MAGPIE_Unit";
MAGPIE.CODE.COMMODITY.SKILL = {};
MAGPIE.CODE.COMMODITY.SKILL.RESOURCE = 248;
MAGPIE.CODE.COMMODITY.SKILL.BIOSPHERE = 249;
MAGPIE.CODE.COMMODITY.SKILL.MINING = 250;
MAGPIE.CODE.COMMODITY.SKILL.COMMUNITY = 251;
MAGPIE.CODE.COMMODITY.SKILL.COSMOS = 252;
MAGPIE.CODE.COMMODITY.SKILL.PRODUCTION = 253;
MAGPIE.CODE.COMMODITY.SKILL.PROCESSING = 254;
MAGPIE.CODE.COMMODITY.SKILL.SERVICE = 255;
MAGPIE.CODE.COMMODITY.SKILL.HR = 256;
MAGPIE.CODE.COMMODITY.SKILL.STANDARD = 260;
MAGPIE.CODE.COMMODITY.SKILL.OBJ = 261;
MAGPIE.CODE.COMMODITY.SKILL.STRUCT = 262;
MAGPIE.CODE.COMMODITY.SKILL.ORG = 263;
MAGPIE.CODE.COMMODITY.SKILL.VEH = 264;
MAGPIE.CODE.COMMODITY.SKILL.UNIT = 265;
//#endregion

MAGPIE.CODE.COMMODITY.attempt = function(name)
{
	const a = $MAGPIE.RESOURCE.getElementByName(name);
	if(!a) 
	{
		console.log(`RESOURCE: '${name}' not found!`)
		return name
	}
	console.log(`RESOURCE: '${name}' found with ID ${a.ID}.`)
	return a.ID
}


// @todo new Commodities
// $MAGPIE.RESOURCE.add(new MAGPIE_Commodity(
// 	
// ))

//#region commodities
function MAGPIE_Resource()
{
	this.initialize(...arguments);
}
MAGPIE_Resource.prototype.initialize = function()
{
	this._name = undefined;
}
/**
 * 
 * {@link MAGPIE.CODE.QUEST.ESTABLISH}
 */
function MAGPIE_Commodity(data)
{
	this.initialize(data);
}
MAGPIE_Commodity.prototype = Object.create(MAGPIE_Resource.prototype);
MAGPIE_Commodity.prototype.constructor = MAGPIE_Commodity;
MAGPIE_Commodity.prototype.initialize = function(data)
{
	MAGPIE_Resource.prototype.initialize.call(this);
	this._name = data?.name;
	this._mp = data?.mp;
	this._sector = data?.sector;
	this._category = data?.category;
	this._requirements = data?.requirements || [];
	this._components = data?.components || [];
	this._recipes = data?.recipes || [];
	this._development = data?.development || [];
	this._predecessors = data?.predecessors || [];
	this._upgrades = data?.upgrades || [];
	this._prototype = data?.prototype || "MAGPIE_Entity";
	this._contents = data?.contents || {};
	this._density = data?.density;
	this._skillId = data?.skillId;
}

MAGPIE_Commodity.prototype.setup = function()
{
	if(this._requirements.length > 0)
		this._requirements.forEach(id => this.setRecipeOf(id));
	if(this._recipes.length > 0)
		this._recipes.forEach(id => this.setRequirementOf(id));
	if(this._components.length > 0)
		this._development.forEach(id => this.setComponentOf(id));
	if(this._development.length > 0)
		this._development.forEach(id => this.setComponentOf(id));
	if(this._predecessors.length > 0)
		this._predecessors.forEach(id => this.setUpgradeOf(id));
	if(this._upgrades.length > 0)
		this._upgrades.forEach(id => this.setPredecessorOf(id));
}
MAGPIE_Commodity.prototype.generateSpinOff = function(data)
{
	let spinoff = new MAGPIE_Commodity(data);
	return $MAGPIE.RESOURCE.add(spinoff);
}

MAGPIE_Commodity.prototype.setDependecyOf = function(property, targetID)
{
	const prop = `_${property}`;
	const target = $MAGPIE.RESOURCE.getElementByID(targetID);
	if(!target) 
		return console.log(
			`${this._name}.set${property.firstCharUpperCase()}Of()` + 
			` unable to find: ${targetID}`
		)
	if(!target[prop].includes(this.ID)) 
	{
		target[prop].push(this.ID);
		console.log(`${this.ID} added to ${target._name}._${property}.`);
	};
}

MAGPIE_Commodity.prototype.setRequirementOf = function(targetID)
{
	this.setDependecyOf("requirements", targetID);
}

MAGPIE_Commodity.prototype.setRecipeOf = function(targetID)
{
	this.setDependecyOf("recipes", targetID);
}

MAGPIE_Commodity.prototype.setComponentOf = function(targetID)
{
	this.setDependecyOf("components", targetID);
}

MAGPIE_Commodity.prototype.setDevelopmentOf = function(targetID)
{
	this.setDependecyOf("development", targetID);
}

MAGPIE_Commodity.prototype.setPredecessorOf = function(targetID)
{
	this.setDependecyOf("predecessors", targetID);
}

MAGPIE_Commodity.prototype.setUpgradeOf = function(targetID)
{
	this.setDependecyOf("upgrades", targetID);
}

MAGPIE_Commodity.prototype.dependecies = function(property)
{
	let list = [];
	let dependency = "_" + property;
	this[dependency].forEach(id => {
		list.push($MAGPIE.RESOURCE.getElementByID(id));
	})
	return list
}

MAGPIE_Commodity.prototype.requirements = function()
{
	return this.dependecies("requirements")
}

MAGPIE_Commodity.prototype.components = function()
{
	return this.dependecies("components")
}

MAGPIE_Commodity.prototype.recipes = function()
{
	return this.dependecies("recipes")
}

MAGPIE_Commodity.prototype.development = function()
{
	return this.dependecies("development")
}

MAGPIE_Commodity.prototype.predecessors = function()
{
	return this.dependecies("predecessors")
}

MAGPIE_Commodity.prototype.upgrades = function()
{
	return this.dependecies("upgrades")
}

MAGPIE_Commodity.prototype.sector = function()
{
	return MAGPIE_Firmware.prototype
		.keyOfCodeProperty.call(this, MAGPIE.CODE.COMMODITY.SECTOR, this._sector)
}

MAGPIE_Commodity.prototype.category = function()
{
	return MAGPIE_Firmware.prototype
		.keyOfCodeProperty.call(this, MAGPIE.CODE.COMMODITY.CAT, this._category)
}

MAGPIE_Commodity.prototype.initCard = function(card)
{
	card.var[0] = this.ID;
	card.var[1] = this._name;
	card.var[2] = this._desc || this._prototype;
}

/**
 * {@link MAGPIE.CODE.COMMODITY.SKILL.BASE}
 */
MAGPIE.CODE.COMMODITY.SKILL.ID = {};
MAGPIE_Commodity.prototype.getSkillID = function()
{
	let sectors = MAGPIE.CODE.COMMODITY.SECTOR;
	let sector = Object.keys(sectors)
		.find(i => sectors[i] === this._sector);
	return MAGPIE.CODE.COMMODITY.SECTOR[sector]
}

MAGPIE_Commodity.prototype.ID_conformity = function(property)
{
	const prop = `_${property}`;
	if(this[prop].length < 1) return
	console.log(`${this._name}.${property}_ID_conformity()...`);
	this[prop].forEach((e, index) => {
		if(e.constructor.name === "String")
		{
			const ID = $MAGPIE.RESOURCE.getElementByName(e)?.ID || -1;
			if(ID < 0) return console.log(`'${e}' not found!`);
			this[prop][index] = ID;
			console.log(`index ${index} set: ${ID}`);
		}	
	})
}

MAGPIE_Commodity.prototype.setupConformity = function()
{
	this.ID_conformity("requirements");
	this.ID_conformity("components");
	this.ID_conformity("recipes");
	this.ID_conformity("development");
	this.ID_conformity("predecessors");
	this.ID_conformity("upgrades");
}


//#endregion




//#region modules
MAGPIE.CODE.COMMODITY.MODULE = {};
MAGPIE.CODE.COMMODITY.MODULE.meta = {isModule: true, properties: [
	"name"
]}
function Commodity_Module(data = {})
{
	this.initialize(data);
}
Commodity_Module.prototype.initialize = function(data)
{
	this._properties = [data?.name];
	this._parent = data?.parent;
}

Commodity_Module.prototype.parent = function()
{
	return $MAGPIE.RESOURCE.getElementByID(this._parent)
}

Commodity_Module.prototype.assign = function(ownerID)
{
	this._owner = ownerID;
}

Commodity_Module.prototype.owner = function()
{
	return $PDL.ENTITY.getElementByID(this._owner)
}
//------------------------------------------------------------------------
//#region Labor
MAGPIE.CODE.COMMODITY.MODULE.LABOR = {};
MAGPIE.CODE.COMMODITY.MODULE.LABOR.meta = {isModule: true, properties: [
	"name",
	"domains of operation [RESOURCE.ID]",
	"resources required for operation [[RESOURCE.ID, amount in kg/day]]",
	"rate of basic labor hours (#)"
]}
function Commodity_Labor(data = {})
{
	this.initialize(data);
}
Commodity_Labor.prototype = Object.create(Commodity_Module.prototype);
Commodity_Labor.prototype.constructor = Commodity_Labor;
Commodity_Labor.prototype.initialize = function(data)
{
	Commodity_Module.prototype.initialize.call(this, data);
	this._properties.concat([data?.domain, data?.resources, data?.rate || 1])
}
//#endregion





//------------------------------------------------------------------------
//#region Kit
MAGPIE.CODE.COMMODITY.MODULE.KIT = {};
MAGPIE.CODE.COMMODITY.MODULE.KIT.meta = {isModule: true, properties: [
	"units of construction material needed (#)",
	"labor required in basic labor hours (#)"
]}
function Commodity_Kit(data = {})
{
	this.initialize(data);
}
Commodity_Kit.prototype = Object.create(Commodity_Module.prototype);
Commodity_Kit.prototype.constructor = Commodity_Kit;
Commodity_Kit.prototype.initialize = function(data)
{
	Commodity_Module.prototype.initialize.call(this, data);
	this._properties.concat([data?.material, data?.labor])
}
//#endregion




//------------------------------------------------------------------------
//#region Tank
MAGPIE.CODE.COMMODITY.MODULE.TANK = {};
MAGPIE.CODE.COMMODITY.MODULE.TANK.meta = {isModule: true, properties: [
	"capacity in L"
]}
function Commodity_Tank(data = {})
{
	this.initialize(data);
}
Commodity_Tank.prototype = Object.create(Commodity_Module.prototype);
Commodity_Tank.prototype.constructor = Commodity_Tank;
Commodity_Tank.prototype.initialize = function(data)
{
	Commodity_Module.prototype.initialize.call(this, data);
	this._properties.concat([data?.capacity])
}

//#endregion




//------------------------------------------------------------------------
//#region vehicle
MAGPIE.CODE.COMMODITY.MODULE.VEHICLE = {};
MAGPIE.CODE.COMMODITY.MODULE.VEHICLE.meta = {isModule: true, properties: [
	"domains of operation [RESOURCE.ID]",
	"mass in kg",
	"engines installed [[RESOURCE.ID, position in m relative to CoG, function]]"
]}
function Commodity_Vehicle(data = {})
{
	this.initialize(data);
}
Commodity_Vehicle.prototype = Object.create(Commodity_Module.prototype);
Commodity_Vehicle.prototype.constructor = Commodity_Vehicle;
Commodity_Vehicle.prototype.initialize = function(data)
{
	Commodity_Module.prototype.initialize.call(this, data);
	this._properties.concat([data?.domains, data?.mass, data?.engines])
}
Commodity_Vehicle.prototype.engines = function()
{
	let engines = [];
	this._properties[2].forEach(e => {
		engines.push($MAGPIE.RESOURCE.getElementByID(e[0]))
	})
	return engines
}
//#endregion





//#region processor
MAGPIE.CODE.COMMODITY.MODULE.PROCESSOR = {};
MAGPIE.CODE.COMMODITY.MODULE.PROCESSOR.meta = {isModule: true, properties: [
	"input resources [[RESOURCE.ID, amount in L]]",
	"output resources [[RESOURCE.ID, amount in L]]"
]}
function Commodity_Processor(data = {})
{
	this.initialize(data);
}
Commodity_Processor.prototype = Object.create(Commodity_Module.prototype);
Commodity_Processor.prototype.constructor = Commodity_Processor;
Commodity_Processor.prototype.initialize = function(data)
{
	Commodity_Module.prototype.initialize.call(this, data);
	this._properties.concat([data?.input, data?.output])
}
//#endregion





//#region engine
MAGPIE.CODE.COMMODITY.MODULE.ENGINE = {};
MAGPIE.CODE.COMMODITY.MODULE.ENGINE.meta = {isModule: true, properties: [
	"input/fuels [[RESOURCE.ID, L/s]]",
	"output/exhaust [[RESOURCE.ID, L/s]]",
	"force/useful output in N",
	"idle throttle in %",
	"spool in s",
	"mass in kg"
]}
function Commodity_Engine(data = {})
{
	this.initialize(data);
}
Commodity_Engine.prototype = Object.create(Commodity_Processor.prototype);
Commodity_Engine.prototype.constructor = Commodity_Engine;
Commodity_Engine.prototype.initialize = function(data)
{
	Commodity_Processor.prototype.initialize.call(this, data);
	this._properties.concat([data?.force, data?.idle, data?.spool])
}
//#endregion











//#endregion








//------------------------------------------------------------------------
//#region ENTITY






//#region pool
function MAGPIE_EntityPool()
{
	this.initialize(...arguments);
}
MAGPIE_EntityPool.prototype.initialize = function()
{
	this.isAvailable = true;
	this.nextSlot = 0;
	this.entities = [];
}
MAGPIE_EntityPool.prototype.assignSlot = function()
{
	let slot = this.nextSlot;
	this.nextSlot++;
	if(!!this.entities[this.nextSlot]) 
		this.nextSlot = this.entities.findIndex(i => !i);
	if(this.nextSlot < 0) this.nextSlot = this.pools.length;
	if(this.nextSlot >= 1000) !this.isAvailable;
	return slot
}
MAGPIE_EntityPool.prototype.clearSlot = function(slot)
{
	let entity = this.entities[slot];
	this.entities[slot] = null;
	if(!this.isAvailable) {
		!this.isAvailable;
	}
	this.nextSlot = slot;
	return entity
}
//#endregion






//#region database
function MAGPIE_EntityDatabase(data)
{
	this.initialize(data);
}
MAGPIE_EntityDatabase.prototype.initialize = function(data)
{
	this._name = data?.name;
	this._totalSize = 0;
	this.nextPool = 0;
	this.pools = [new MAGPIE_EntityPool()];
	if(data?.contents) setTimeout(() => this.import(data.contents), 300);
}

MAGPIE_EntityDatabase.prototype.import = function(contents)
{
	let list = [];
	contents.forEach(i => {
		list.push(this.add(i));
	})
	return list
}

MAGPIE_EntityDatabase.prototype.export = function()
{
	let result = [];
	this.pools.forEach(p => {
		p.entities.forEach(e => result.push(e))
	});
	return result
}

MAGPIE_EntityDatabase.prototype.assignSlot = function()
{
	if(!this.pools[this.nextPool].isAvailable) this.nextPool++;
	if(!this.pools[this.nextPool]) 
		this.pools[[this.nextPool]] = new MAGPIE_EntityPool();
	let slot = this.pools[this.nextPool].assignSlot();
	this._totalSize++;
	return slot
}
MAGPIE_EntityDatabase.prototype.add = function(entity)
{
	let slot = this.assignSlot();
	entity.ID = this.nextPool * 1000 + slot;
	this.pools[this.nextPool].entities[slot] = entity;
	return entity
}
MAGPIE_EntityDatabase.prototype.getElementByID = function(ID)
{
	if(isNaN(ID) || ID < 0) return 
	let pool = Math.floor(ID / 1000);
	let slot = ID % 1000;
	return this.pools[pool]?.entities[slot]
}

MAGPIE_EntityDatabase.prototype.elementID = function(ID)
{
	return this.getElementByID(ID)
}

MAGPIE_EntityDatabase.prototype.clearSlot = function(ID)
{
	let entity = this.getElementByID(ID);
	if(!entity) return
	let pool = Math.floor(ID / 1000);
	this.pools[pool].clearSlot(ID % 1000);
	this._totalSize--;
	return entity
}

MAGPIE_EntityDatabase.prototype.conform = function()
{
	let entities = [];
	this.pools.forEach(p => {
		p.entities = p.pool;
		delete p.pool;
	})
}

MAGPIE_EntityDatabase.prototype.getElementByName = function(name)
{
	if(name.length < 1) return
	for(let i = 0; i < this.pools.length; i++)
	{
		let result = this.pools[i].entities.find(e => e._name == name);
		if(!result)
			result = this.pools[i].entities.find(e => e._name.match(name));
		if(result) return result
	}
}

MAGPIE_EntityDatabase.prototype.elementName = function(name)
{
	return this.getElementByName(name)
}

MAGPIE_EntityDatabase.prototype.getElementByProperty = function(property, ID)
{
	if(isNaN(ID) || ID < 0) return
	for(let i = 0; i < this.pools.length; i++)
	{
		let result = this.pools[i].entities.find(e => e[property]?.includes(ID));
		if(result) return result
	}
}

MAGPIE_EntityDatabase.prototype.filterByName = function(name = "")
{
	if(name.length < 3 || typeof name != "string") return false
	let result = [];
	for(let i = 0; i < this.pools.length; i++)
	{
		result = result.concat(this.pools[i].entities
			.filter(e => e._name.contains(name)));
	}
	return result
}
//#endregion






//#region entity base

/**
 * {@link MAGPIE.MCON.meta}
 */
MAGPIE.CODE.ENTITY = {};
MAGPIE.CODE.ENTITY.meta = {isCypher: true, name: "Entity"};
MAGPIE.CODE.ENTITY.STATUS = {};
MAGPIE.CODE.ENTITY.STATUS.CONCEPT = 0
MAGPIE.CODE.ENTITY.STATUS.REQUESTED = 1
MAGPIE.CODE.ENTITY.STATUS.PLANNED = 2;
MAGPIE.CODE.ENTITY.STATUS.PROCURING = 3;
MAGPIE.CODE.ENTITY.STATUS.DEPLOYING = 4;
MAGPIE.CODE.ENTITY.STATUS.ACTIVE = 11;
MAGPIE.CODE.ENTITY.STATUS.STAND_BY = 12;
MAGPIE.CODE.ENTITY.STATUS.INACTIVE = 13;
MAGPIE.CODE.ENTITY.STATUS.DRAINING = 14;
MAGPIE.CODE.ENTITY.STATUS.EXHAUSTED = 15;
MAGPIE.CODE.ENTITY.STATUS.DAMAGED = 16;
MAGPIE.CODE.ENTITY.STATUS.DISMISSED = 21;
MAGPIE.CODE.ENTITY.STATUS.DISBANDED = 22;
MAGPIE.CODE.ENTITY.STATUS.BROKEN = 23
MAGPIE.CODE.ENTITY.STATUS.MIA = 23;
MAGPIE.CODE.ENTITY.STATUS.KIA = 24;


function MAGPIE_Entity(data)
{
	this.initialize(data)
}
MAGPIE_Entity.prototype.initialize = function(data)
{
	this._type = data?.type;
	this._name = data?.name;
	this._parent = data?.parent;
	this._elements = data?.elements || [];
	this._suppliers = data?.suppliers || [];
	this._output = data?.output || [];
	this._receivers = data?.receivers || [];
	this._deployment = data?.deployment;
	this._host = data?.host;
	this._garrison = data?.garrison || [];
	this._status = data?.status || 0;
	this._created = data?.created || $gameSystem.playtime();
	this.contents = {};
	this._position = data?.position;
}

MAGPIE_Entity.prototype.setup = function()
{
	this.setupRelationships();
	this._skillId = this.getSkillID();
}

MAGPIE_Entity.prototype.setupRelationships = function()
{
	let relationships = [
		["_parent", "_elements"],
		["_suppliers","_receivers"],
		["_host","_garrison"]
	];
	relationships.forEach(r =>
	{
		if(this[r[0]].length > 0)
			this[r[0]].forEach(id => 
				$PDL.ENTITY.getElementByID(id).setDependecyOf(this.ID, r[1]));
		if(this[r[1]].length > 0)
			this[r[1]].forEach(id => 
				$PDL.ENTITY.getElementByID(id).setDependecyOf(this.ID, r[0]));
	} 

	)
}

/**
 * {@link MAGPIE.CODE.COMMODITY.SKILL.ID}
 */
MAGPIE.CODE.COMMODITY.SKILL.BASE = {};
MAGPIE_Entity.prototype.getSkillID = function()
{
	let protos = MAGPIE.CODE.COMMODITY.PROTO;
	let proto = Object.keys(protos)
		.find(i => protos[i] === this._prototype);
	return MAGPIE.CODE.COMMODITY.SKILL[proto]
}

MAGPIE_Entity.prototype.setDependecyOf = function(entityID, property)
{
	let entity = $PDL.ENTITY.getElementByID(entityID);
	if(!entity) entity = new MAGPIE_Entity();
	entity[property].push(this.ID);
}

MAGPIE_Entity.prototype.parent = function()
{
	return $PDL.ENTITY.getElementByID(this._parent)
}

MAGPIE_Entity.prototype.type = function()
{
	return $MAGPIE.RESOURCE.getElementByID(this._type)
}

MAGPIE_Entity.prototype.module = function()
{
	this.type().module()
}

MAGPIE_Entity.prototype.relationships = function(property)
{
	let elements = [];
	let relationship = "_" + property;
	this[relationship].forEach(id => {
		elements.push($PDL.ENTITY.getElementByID(id))
	})
	return elements
}

MAGPIE_Entity.prototype.elements = function()
{
	return this.relationships("elements")
}

MAGPIE_Entity.prototype.deployment = function()
{
	return $PDL.event.getElementByID(this._deployment)
}

MAGPIE_Entity.prototype.host = function()
{
	return $PDL.ENTITY.getElementByID(this._host)
}

MAGPIE_Entity.prototype.garrison = function()
{
	return this.relationships("garrison")
}

MAGPIE_Entity.prototype.input = function()
{
	let input = [];
	this.suppliers().forEach(s => {
		input.push(s.output()[0])
	})
	return input
}

MAGPIE_Entity.prototype.suppliers = function()
{
	return this.relationships("suppliers")
}

MAGPIE_Entity.prototype.output = function()
{
	let result = [];
	result.push($MAGPIE.RESOURCE.getElementByID(this._output));
	this.elements().forEach(e => {
		result.push($MAGPIE.RESOURCE.getElementByID(e._output))
	})
	return result
}

MAGPIE_Entity.prototype.convertOutput = function()
{
	const o = this._output;
	this._output = $MAGPIE.RESOURCE.getElementByName(o).ID;
}

MAGPIE_Entity.prototype.receivers = function()
{
	return this.relationships("receivers")
}

MAGPIE_Entity.prototype.age = function()
{
	return Math.abs($gameSystem.playtime() - this._created)
}

MAGPIE_Entity.prototype.ageText = function()
{
	let calendar = $TIME?.index() || 0;
	return $MAGPIE.RUNTIME.readableTime(this.age, calendar, true)
}

MAGPIE_Entity.prototype.requestStatus = function(status)
{
	if(!this.canChangeStatus() || this._status > status) return false
	return this.changeStatus(status)
}

MAGPIE_Entity.prototype.changeStatus = function(status)
{
	this._status = status
}

MAGPIE_Entity.prototype.keyOfCodeProperty = function(code, property)
{
	return MAGPIE_Firmware.prototype.keyOfCodeProperty.call(this, code, property)
}

MAGPIE_Entity.prototype.printStatus = function(status = -1)
{
	if(status < 0) status = this._status;
	return this.keyOfCodeProperty(MAGPIE.CODE.ENTITY.STATUS, status)
}

MAGPIE_Entity.prototype.convertType = function()
{
	this._type = $MAGPIE.RESOURCE.getElementByName(this._type).ID;
	return this._type
}

MAGPIE_Entity.prototype.getPosition = function()
{
	const prop = this._position[0];
	const ID = this._position[1];
	return $PDL[prop]?.getElementByID(ID)
}

MAGPIE_Entity.prototype.refresh = function(dt = 0)
{
	const position = this?._position[2]
	if(position?.constructor?.name === "Game_Orbit") position.refreshOrbit(dt);
}
//#endregion






//#region object
function MAGPIE_Object(data)
{
	this.initialize(data);
}
MAGPIE_Object.prototype = Object.create(MAGPIE_Entity.prototype);
MAGPIE_Object.prototype.constructor = MAGPIE_Object;
MAGPIE_Object.prototype.initialize = function(data)
{
	MAGPIE_Entity.prototype.initialize.call(this, data);
}
//#endregion




//#region structure
function MAGPIE_Structure(data)
{
	this.initialize(data);
}
MAGPIE_Structure.prototype = Object.create(MAGPIE_Entity.prototype);
MAGPIE_Structure.prototype.constructor = MAGPIE_Structure;
MAGPIE_Structure.prototype.initialize = function(data)
{
	MAGPIE_Entity.prototype.initialize.call(this, data);
}
//#endregion




//#region organisation

function MAGPIE_Organisation(data)
{
	this.initialize(data);
}
MAGPIE_Organisation.prototype = Object.create(MAGPIE_Entity.prototype);
MAGPIE_Organisation.prototype.constructor = MAGPIE_Organisation;
MAGPIE_Organisation.prototype.initialize = function(data)
{
	MAGPIE_Entity.prototype.initialize.call(this, data);
}

MAGPIE_Organisation.prototype.campaign = function(name = "", index = -1)
{
	if(name.length < 1 && index >= 0)
		return this.MCON().DATABASE.getElementByID(this._ops[index][1])
	return this.MCON().DATABASE.getElementByName(name)
}
//#endregion





//#region vehicle

function MAGPIE_Vehicle(data)
{
	this.initialize(data);
}
MAGPIE_Vehicle.prototype = Object.create(MAGPIE_Entity.prototype);
MAGPIE_Vehicle.prototype.constructor = MAGPIE_Vehicle;
MAGPIE_Vehicle.prototype.initialize = function(data)
{
	MAGPIE_Entity.prototype.initialize.call(this, data);
}
//#endregion





//#region unit

function MAGPIE_Unit(data)
{
	this.initialize(data);
}
MAGPIE_Unit.prototype = Object.create(MAGPIE_Entity.prototype);
MAGPIE_Unit.prototype.constructor = MAGPIE_Unit;
MAGPIE_Unit.prototype.initialize = function(data)
{
	MAGPIE_Entity.prototype.initialize.call(this, data);
}
//#endregion

//#endregion









//------------------------------------------------------------------------
//#region EVENT
function Event_Data(data)
{
	Object.keys(data).forEach(k => this[k] = data[k]);
}
MAGPIE.CODE.EVENT = {};
MAGPIE.CODE.EVENT.TEMPLATE = {};
MAGPIE.CODE.EVENT.TEMPLATE.GENERIC = {
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
	children: ["ID in $PDL.event"]
};

function MAGPIE_Event(data)
{
	this.initialize(data);
}
MAGPIE_Event.prototype = Object.create(MAGPIE_Firmware.prototype);
MAGPIE_Event.prototype.constructor = MAGPIE_Event;
MAGPIE_Event.prototype.initialize = function(data)
{
	this.meta = "event";
	this._name = data?.name || "MAGPIE_Event_template";
	this._parent = data?.parent;
	this._children = data?.children || [];
	this._contents = data?.contents || {};
	this._start = data?.start || {
		gameday: $gameSystem.playtime() / (24 * 60 * 60)
	};
	if(data?.end) this._end = data.end;
	this._type = data?.type || MAGPIE.CODE.TYPE.EVENT;
	this._category = data?.category;
	this._urgency = data?.urgency || MAGPIE.CODE.URGENCY.ROUTINE;
	this._gravity = data?.gravity || MAGPIE.CODE.GRAVITY.TRIVIAL;
	if(data?.ambiguity) this._ambiguity = data.ambiguity;
	this._status = data?.status || MAGPIE.CODE.STATUS.INACTIVE;
	if(data?.cause) this._cause = data.cause;
	if(data?.consequences) this._consequences = data.consequences;
}

MAGPIE_Event.prototype.type = function()
{
	return this.keyOfCodeProperty(MAGPIE.CODE.TYPE, this._type)
}

MAGPIE_Event.prototype.category = function()
{
	return MAGPIE_Firmware.prototype
		.keyOfCodeProperty.call(this, MAGPIE.CODE.CAT, this._category)
}

MAGPIE_Event.prototype.urgency = function()
{
	return MAGPIE_Firmware.prototype
		.keyOfCodeProperty.call(this, MAGPIE.CODE.URGENCY, this._urgency)
}

MAGPIE_Event.prototype.gravity = function()
{
	return MAGPIE_Firmware.prototype
		.keyOfCodeProperty.call(this, MAGPIE.CODE.GRAVITY, this._gravity)
}

MAGPIE_Event.prototype.parent = function()
{
	return $PDL.event.getElementByID(this._parent)
}

MAGPIE_Event.prototype.child = function(index = 0)
{
	if(this._children.length < 1 || isNaN(this._children[index])) 
		return
	return $PDL.event.getElementByID(this._children[index])
}

MAGPIE_Event.prototype.status = function()
{
	const code = MAGPIE.CODE.STATUS;
	const status = Object.keys(code).find(k => code[k] === this._status)
	return status
}

MAGPIE_Event.prototype.changeStatus = function(status = 0)
{
	this._status = status;
	return this._status
}

MAGPIE_Event.prototype.urgency = function()
{
	return Object.keys(MAGPIE.CODE.URGENCY)[this._urgency]
}
MAGPIE_Event.prototype.gravity = function()
{
	return Object.keys(MAGPIE.CODE.GRAVITY)[this._gravity]
}
MAGPIE_Event.prototype.ambiguity = function()
{
	return Object.keys(MAGPIE.CODE.AMBIGUITY)[this._ambiguity]
}




//#endregion

//#endregion
//------------------------------------------------------------------------










//------------------------------------------------------------------------
//#region DEFENCE
//------------------------------------------------------------------------
//#endregion
//------------------------------------------------------------------------










//------------------------------------------------------------------------
//#region MAINTENANCE
//------------------------------------------------------------------------
//#endregion
//------------------------------------------------------------------------










//------------------------------------------------------------------------
//#region ICUs

MAGPIE.DRONE = {};
MAGPIE.DRONE.version = "0.1.0";
MAGPIE.DRONE.meta = {
	name: "MAGPIE Integrated Command Unit and Drone control",
	firmware: "20250828",
	isWorking: false
};
MAGPIE.DRONE.ICU = {};
MAGPIE.DRONE.ICU.MAICU = {};
MAGPIE.DRONE.ICU.SAICU = {};
MAGPIE.DRONE.ICU.DAICU = {};
MAGPIE.DRONE.RCU = {};
MAGPIE.DRONE.DSP = {};
MAGPIE.DRONE.DSP.meta = {
	name: "MAGPIE Drone Specialization Program",
	firmware: "20250828",
	isWorking: false
};
MAGPIE.DRONE.DSP.MILITARY = {
	COMMAND: 0,
	SENTRY: 1,
	RECON: 2,
	SURVEILLANCE: 3,
	SUPPORT: 4,
	COMBAT: 5
};
MAGPIE.DRONE.DSP.PRODUCTION = {
	FOREMAN: 0,
	ENGINEER: 1,
	ASSEMBLER: 2,
	TENDER: 3,
	CLEANER: 4
};
MAGPIE.DRONE.LOGISTICS = {
	MANAGER: 0,
	CARGO: 1,
	SUPERVISOR: 2,
	STORAGE: 3,
	PROCURER: 4
};
MAGPIE.DRONE.PILOTING = {
	CONTROLLER: 0,
	DRIVER: 1,
	COURIER: 2,
	CONDUCTOR: 3,
	SEANAUT: 4,
	OCEANAUT: 5,
	AERONAUT: 6,
	ASTRONAUT: 7
};
MAGPIE.DRONE.MINING = {
	PROSPECTOR: 0,
	EXTRACTOR: 1,
	MOVER: 2,
	PROCESSOR: 3,
	SHIPPER: 4
};
MAGPIE.DRONE.SCIENCE = {
	PROFESSOR: 0,
	BIOMED: 1,
	BIOTECH: 2,
	SAMPLER: 3,
	PROBER: 4,
	ASSISTANT: 5,
	SPEC: 6
};
MAGPIE.DRONE.LEISURE = {
	DIRECTOR: 0,
	CATERER: 1,
	TOURER: 2,
	ENTERTAINER: 3,
	CARER: 4,
	TRAINER: 5,
	NURSE: 6
};
MAGPIE.DRONE.LABOR = {
	CHIEF: 0,
	FARMER: 1,
	HERDER: 2,
	GATHERER: 3,
	HUNTER: 4,
	HAULER: 5,
	FORESTER: 6
};
MAGPIE.DRONE.PMOD = {};
MAGPIE.DRONE.PMOD.MILITARY = {};
MAGPIE.DRONE.PMOD.WORKER = {};
MAGPIE.DRONE.PMOD.CREATIVE = {};
MAGPIE.DRONE.PMOD.DRIVER = {};
MAGPIE.DRONE.PMOD.BUSINESS = {};
MAGPIE.DRONE.PMOD.EXPLORER = {};
MAGPIE.DRONE.PMOD.NURSE = {};
MAGPIE.DRONE.PMOD.TECH = {};





//------------------------------------------------------------------------
//#region CONTROLLER

function MAGPIE_DRONE()
{
	this.initialize()
}
MAGPIE_DRONE.prototype = Object.create(MAGPIE_Firmware.prototype);
MAGPIE_DRONE.prototype.constructor = MAGPIE_DRONE;
MAGPIE_DRONE.prototype.initialize = function()
{
	MAGPIE_Firmware.prototype.initialize.call(this);
	this.isDRONE = true;
	this.isInit = true;
	this.ID = this.generateID();
	this._name = "MAGPIE_DRONE_proxy";
}

MAGPIE_DRONE.prototype.start = function()
{
	this.ROSTER = new MAGPIE_EntityDatabase({name: "Drone roster"});
	this.DATA = new MAGPIE_Data();
	this.DATA.Log(`${this._name} started.`);
}
//#endregion






//------------------------------------------------------------------------
//#region ICU
function MAGPIE_ICU()
{
	this.initialize(...arguments);
}
MAGPIE_ICU.prototype = Object.create(MAGPIE_Firmware.prototype);
MAGPIE_ICU.prototype.constructor = MAGPIE_ICU;
MAGPIE_ICU.prototype.initialize = function()
{
	MAGPIE_Firmware.prototype.initialize.call(this);
	this.isICU = true;
	this.meta = MAGPIE.DRONE.meta;
	this.ID = this.generateID();
	this._name = "MAGPIE_ICU"
}

MAGPIE_ICU.prototype.boot = function()
{
	this.DATA = new MAGPIE_Data();
	this.DATA.Log(`${this.ID} booted.`)
}

//#endregion






//------------------------------------------------------------------------
//#region DAICU
function MAGPIE_DAICU(data)
{
	this.initialize(data);
}
MAGPIE_DAICU.prototype = Object.create(MAGPIE_ICU.prototype);
MAGPIE_DAICU.prototype.constructor = MAGPIE_DAICU;
MAGPIE_DAICU.prototype.initialize = function(data)
{
	MAGPIE_ICU.prototype.initialize.call(this);
}
//#endregion




//------------------------------------------------------------------------
//#region SAICU

function MAGPIE_SAICU(data)
{
	this.initialize(data);
}
MAGPIE_SAICU.prototype = Object.create(MAGPIE_DAICU.prototype);
MAGPIE_SAICU.prototype.constructor = MAGPIE_SAICU;
MAGPIE_SAICU.prototype.initialize = function(data)
{
	MAGPIE_DAICU.prototype.initialize.call(this, data);
}

//#endregion




//------------------------------------------------------------------------
//#region MAICU

function MAGPIE_MAICU(data)
{
	this.initialize(data);
}
MAGPIE_MAICU.prototype = Object.create(MAGPIE_SAICU.prototype);
MAGPIE_MAICU.prototype.constructor = MAGPIE_MAICU;
MAGPIE_MAICU.prototype.initialize = function(data)
{
	MAGPIE_SAICU.prototype.initialize.call(this, data);
}

//#endregion




//------------------------------------------------------------------------
//#region DSP

function MAGPIE_DSP(data)
{
	this.initialize(data);
}
MAGPIE_DSP.prototype.initialize = function(data)
{
	this.isDSP = true;
	this.meta = MAGPIE.DRONE.meta;
	this._type = data?.type;
}

//#endregion





//------------------------------------------------------------------------
//#region PMOD

function MAGPIE_PMOD(data)
{
	this.initialize(data);
}
MAGPIE_PMOD.prototype.initialize = function(data)
{
	this.isPMOD = true;
	this.meta = MAGPIE.DRONE.meta;
	this._type = data?.type;
}

//#endregion




//#endregion
//------------------------------------------------------------------------











//------------------------------------------------------------------------
//#region HIMS


/**
 * {@link MAGPIE.HIMS.meta}
 */
function MAGPIE_HIMS()
{
	this.initialize(...arguments);
}
MAGPIE_HIMS.prototype = Object.create(MAGPIE_Firmware.prototype);
MAGPIE_HIMS.prototype.constructor = MAGPIE_HIMS;
MAGPIE_HIMS.prototype.initialize = function()
{
	MAGPIE_Firmware.prototype.initialize.call(this);
	this.isHIMS = true;
	this.meta = MAGPIE.HIMS.meta;
	this.loadSettings();
	// this.state = {};
	// this.logs = [];
	// this.sync = [];
	// this.exp = [];
}
//------------------------------------------------------------------------
//#region Boot

function HIMS_Console()
{
	this.initialize(...arguments);
}
HIMS_Console.prototype.initialize = function()
{
	this._logs = [];
	this._logs.push(new HIMS_Log("Initialized"));
	if(this._logs[0].contents == "Initialized")
		this._initialized = true;
}

function HIMS_Log(contents)
{
	this.contents = contents;
	this._created = new Date();
}

//#endregion





//------------------------------------------------------------------------
//#region NewGame
function HIMS_GameSystem()
{
	this.initialize(...arguments);
}
HIMS_GameSystem.prototype = Object.create(MAGPIE_Firmware.prototype);
HIMS_GameSystem.prototype.constructor = HIMS_GameSystem;
HIMS_GameSystem.prototype.initialize = function()
{
	MAGPIE_Firmware.prototype.initialize.call(this);
}

function HIMS_Game(name = "")
{
	this.initialize(name);
}
HIMS_Game.prototype = Object.create(MAGPIE_HIMS.prototype);
HIMS_Game.prototype.constructor = HIMS_Game;
HIMS_Game.prototype.initialize = function(name)
{
	MAGPIE_HIMS.prototype.initialize.call(this);
	this._name = name;
}

HIMS_Game.prototype.systemInit = function()
{
	let systems = [
		this.settings(), 
		this.data(), 
		this.systems(), 
		this.UI()];
	if(this.systemsCheck(systems)) 
		console.log(`${this._name} initialized!`);
	else 
		console.warn(`${this._name} initialization fail!`);
}

MAGPIE.HIMS.edit._Scene_Load_executeLoad = Scene_Load
	.prototype.executeLoad;
Scene_Load.prototype.executeLoad = function(savefileId)
{
	console.clear();
	MAGPIE.HIMS.edit._Scene_Load_executeLoad.call(this, savefileId);
}

HIMS_Game.prototype.systemsCheck = function(array)
{
	return !array.some(x => !x)
}

HIMS_Game.prototype.consoleGO = function(message, status, length = 100)
{
	let resultText = "";
	if(status) resultText = "GO!"; else resultText = "NO GO!";
	let dotsAmount = length - message.length - resultText.length;
	let dots = "";
	for(let i = 0; i < dotsAmount; i++)
	{
		dots += ".";
	}
	let color = "#ff073a";
	if(status) color = "#7EFF00";
	let css = "color: " + color + "; font-style: bold; background-color: black";
	console.log(`%c${message}${dots}${resultText}`, css);
	return status
}

HIMS_Game.prototype.settings = function(status = true)
{
	return this.consoleGO("Settings", status)
}

HIMS_Game.prototype.data = function(status = true)
{
	return this.consoleGO("Data", status)
}

HIMS_Game.prototype.systems = function(status = true)
{
	return this.consoleGO("Systems", status)
}

HIMS_Game.prototype.UI = function(status = true)
{
	return this.consoleGO("UI", status)
}

Scene_Save.prototype.executeSave = function(savefileId) {
    $gameSystem.setSavefileId(savefileId);
    $gameSystem.onBeforeSave();
    DataManager.saveGame(savefileId)
        .then(() => this.onSaveSuccess())
        .catch((e) => {
			this.onSaveFailure();
			console.error(e);
		});
};
//#endregion





//------------------------------------------------------------------------
//#region Continue

//#endregion





//------------------------------------------------------------------------
//#region SceneLoad

//#endregion




//------------------------------------------------------------------------
//#region Message


function HIMS_Message()
{
	this.initialize(...arguments);
}
HIMS_Message.prototype = Object.create(MAGPIE_HIMS.prototype);
HIMS_Message.prototype.constructor = HIMS_Message;
HIMS_Message.prototype.initialize = function()
{
	this._messages = [];
}

HIMS_Message.prototype.loading = function(message = "", queue = 0)
{
	this.queue = true;
	const unloaded = MAGPIE.HIMS.settings.load_message.unloaded || ".";
	const loaded = MAGPIE.HIMS.settings.load_message.loaded || "|";
	const progress = queue;
	const maxQueue = 30;
	const remainder = maxQueue - queue;
	let loadBar = "";
	for(let i = 0; i < progress; i++)
	{
		loadBar += loaded;
	}
	for(let i = 0; i < remainder; i++)
	{
		loadBar += unloaded;
	}
	const title = `Loading ${loadBar}`;
	const window = SceneManager._scene._HIMSmessage;
	window.show();
	window.updateMessage(title, message);
	$gameMap._interpreter.wait(60);
	!this.queue;
	if(queue < maxQueue) return
	if(queue >= maxQueue)
		setTimeout(() => SceneManager._scene._HIMSmessage.close(), 3000);
}

// HIMS_Console.prototype.log = function(message = "")
// {
// 	const window = SceneManager._scene._HIMSconsole;

// }


//#region old
HIMS_Message.prototype.loading2 = function(message = "", queue = 0)
{
	let color = MAGPIE.HIMS.settings.console.font_color || 11;
	let editedMessage = `\\>\\c[${color}]${message}\\|\\^`;
	$gameMessage.setBackground(2);
	$gameMessage.setPositionType(2);
	let unloaded = MAGPIE.HIMS.settings.load_message.unloaded || ".";
	let loaded = MAGPIE.HIMS.settings.load_message.loaded || "|";
	let progress = queue;
	let remainder = 10 - queue;
	let loadBar = "";
	for(let i = 0; i < progress; i++)
	{
		loadBar += loaded;
	};
	for(let i = 0; i < remainder; i++)
	{
		loadBar += unloaded;
	};
	$gameMessage.setSpeakerName(`\\c[${color}]Loading ${loadBar}`);
	$gameMessage.add(editedMessage);
	$gameMap._interpreter.setWaitMode('message');
}

HIMS_Message.prototype.console = function(message)
{
	const color = MAGPIE.HIMS.settings.console.font_color || 11;
	const editedMessage = `\\>\\c[${color}]${message}`;
	$gameMessage.setSpeakerName(`\\c[${color}]H.I.M.S.`);
	$gameMessage.add(editedMessage);
	// const interpreter = MAGPIE.SYS.runtime.interpreter();
	// eval(interpreter)._interpreter.setWaitMode('message');
}

HIMS_Message.prototype.Log = function(message)
{
	this.console(`${message}\\|\\|\\|\\^`);
}

HIMS_Message.prototype.battleSimple = function(text = "")
{
	let message = `\\>${text} \\|\\^`;
	$gameMessage.add(message);
	$gameTroop._interpreter.setWaitMode('message');
}

HIMS_Message.prototype.gainedItem = function(itemId = 1, quantity = 1)
{
	let color = MAGPIE.HIMS.settings.console.font_color || 11;
	let message = `\\>${quantity}x \\c[${color}]\\itic[${itemId}] acquired!\\|\\|\\>`;
	AudioManager.playSe($cgmzTemp.getSoundID("item"));
	$gameMessage.add(message);
	$gameTroop._interpreter.setWaitMode('message');
}

HIMS_Message.prototype.waitWindow = function(windowName)
{
	const window = SceneManager._scene[windowName];
	return new Promise((resolve, reject) => {
		const confirm = setInterval(() => {
			// console.log(`Checking ${windowName}...`)
			if(!window._openness)
			{
				resolve(); 
				clearInterval(confirm); 
				// console.log(`${windowName}: closed.`);
			}
		}, 1000)
	})
}

HIMS_Message.prototype.nameInput = function(actorID)
{
	const actorName = $gameActors.actor(actorID)._name;
	return new Promise((resolve, reject) => {
		SceneManager.push(Scene_Name);
		SceneManager.prepareNextScene(actorID, 16);
		const confirmation = setInterval(() => {
			// console.log("checking for confirmation...");
			if(SceneManager._scene.constructor.name !== "Scene_Name")
			{
				resolve()
				clearInterval(confirmation);
			}
		}, 1000)
	})
}

HIMS_Message.prototype.question = async function(question = "")
{
	const actorID = 7;
	const actorName = $gameActors.actor(actorID)._name;
	$gameActors.actor(actorID)._name = "";
	this.console(question);
	await this.waitWindow("_messageWindow");
	await this.nameInput(actorID);
	this._answer = $gameActors.actor(actorID)._name;
	$gameActors.actor(actorID)._name = actorName
	return new Promise((resolve, reject) => {
		resolve(this._answer)
	})
}

HIMS_Message.prototype.choices = async function(choices, callback, cancel = -1)
{
	// Set choices to A, B, C; default C, no cancel
	$gameMessage.setChoices(choices, 0, cancel);
	// Set background: Dim
	$gameMessage.setChoiceBackground(0);
	// Set position: Center
	$gameMessage.setChoicePositionType(2);
	// On choice, set variable #1 equal to the selected index
	$gameMessage.setChoiceCallback(n => {
  		callback(n)
	});
	await this.waitWindow("_choiceListWindow");
}

HIMS_Message.prototype.options = async function(options, variableId = 0)
{
	let opt = options;
	this._checked = false;
	this._options = [];
	opt.forEach(o => this._options.push(o.insert(-1, "▢ ")));
	const callback = (choice) => {
		console.log(choice);
		let chosen = this._options[choice];
		if(choice < -1) return this._checked = true
		if(chosen.contains("▢"))
			this._options[choice] = chosen.replace("▢", "▣")
		if(chosen.contains("▣"))
			this._options[choice] = chosen.replace("▣", "▢")
	}
	const done = new Promise((resolve, reject) => {
		const iterate = setInterval(() => {
			if(this._checked)
			{
				clearInterval(iterate);
				const answer = this._options;
				if(variableId > 0)
					$gameVariables.setValue(variableId, answer);
				resolve(answer)
			}
			else if(!SceneManager._scene._choiceListWindow._openness)
				this.choices(this._options, callback, -2);
			
		}, 500)
	})
	await done
	delete this._options;
	delete this._checked;
	return new Promise((resolve, reject) => {
		resolve(done)
	})
}










//#endregion



//#endregion






//------------------------------------------------------------------------
//#region Account
/**
 * {@link MAGPIE.HIMS.settings.account}
 */
MAGPIE.HIMS.account = {};
MAGPIE.HIMS.account.meta = {isAccount: true};
MAGPIE.HIMS.account.Player = {};
MAGPIE.HIMS.account.Player.name = null;
MAGPIE.HIMS.account.Player.password = null;
MAGPIE.HIMS.account._users = [];
MAGPIE.HIMS.account.getPlayer = function()
{
	let actor = Number(MAGPIE.HIMS.settings.account.player);
	return $gameActors.actor(actor)
}

MAGPIE.HIMS.account.nameInput = function(input_length = 12)
{
	let actor = Number(MAGPIE.HIMS.settings.account.player);
	SceneManager.push(Scene_Name);
	SceneManager.prepareNextScene(actor, input_length);
}

MAGPIE.HIMS.account.findUser = function()
{
	let userName = MAGPIE.HIMS.account.getPlayer()._name;
	return MAGPIE.HIMS.account._users.find(user => user.name === userName)
}

MAGPIE.HIMS.account.userName = function()
{
	let user = MAGPIE.HIMS.account.findUser();
	if(!user) 
	{
		let message = `User not found!`;
		$HIMS.MESSAGE.console(message);
		$gameMap._interpreter.setWaitMode('message');
		return false
	}
	return true
}

MAGPIE.HIMS.account.setName = function()
{
	let actor = Number(MAGPIE.HIMS.settings.account.player);
	MAGPIE.HIMS.account.Player.name = $gameActors.actor(actor)._name;
	$gameActors.actor(actor)._name = "Player.password";
}


MAGPIE.HIMS.account.setPassword = function()
{
	let actor = Number(MAGPIE.HIMS.settings.account.player);
	MAGPIE.HIMS.account.Player.password = $gameActors.actor(actor)._name;
	$gameActors.actor(actor)._name = "";
}

MAGPIE.HIMS.account.passwordOK = function()
{
	let actor = Number(MAGPIE.HIMS.settings.account.player);
	let input = $gameActors.actor(actor)._name;
	let password = MAGPIE.HIMS.account.Player.password;
	if(input === password)
	{
		return true
	}
	else
	{
		return false
	}
}

MAGPIE.HIMS.account.clearName = function()
{
	let actor = Number(MAGPIE.HIMS.settings.account.player);
	$gameActors.actor(actor)._name = "";
}

MAGPIE.HIMS.account.confirmPassword = function()
{
	let message = `Password does not match! Please, confirm 'Player.password':\\|`;
	MAGPIE.HIMS.account.clearName();
	$HIMS.MESSAGE.console(message);
}

MAGPIE.HIMS.account.setup = function()
{
	let actor = Number(MAGPIE.HIMS.settings.account.player);
	$gameActors.actor(actor)._name = MAGPIE.HIMS.account.Player.name;
	let message = `Thank you, \\N[${actor}]; your account has been setup.`;
	$HIMS.MESSAGE.console(message);
}

//#endregion




//------------------------------------------------------------------------
//#region Runtime

//#endregion

//#endregion
//------------------------------------------------------------------------














//------------------------------------------------------------------------
//#region RUNTIME
//------------------------------------------------------------------------










//------------------------------------------------------------------------
//#region Save Data

var $MAGPIE = null;


MAGPIE.SYS.data._DataManager_createSave = DataManager.createGameObjects;
DataManager.createGameObjects = function()
{
	MAGPIE.SYS.data._DataManager_createSave.call(this);
	let data = $MAGPIE.DATA.readJSON("MAGPIE/MAGPIE_Data", "warn") || {};
	$MAGPIE.DATA = new MAGPIE_Data(data);
	$MAGPIE.DATA.start();
	$PDL.ENTITY = new MAGPIE_EntityDatabase({name: "Entities and installations"});
}

MAGPIE.SYS.data._DataManager_makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function()
{
	const contents = MAGPIE.SYS.data._DataManager_makeSave.call(this);
	contents.MAGPIE = $MAGPIE.DATA;
	contents.ENTITY = $PDL.ENTITY;
	MAGPIE.SYS.data._saveDevelopmentData();
	return contents
}

MAGPIE.SYS.data._saveDevelopmentData = function()
{
	$MAGPIE.DATA.writeJSON("MAGPIE/MAGPIE_Data", $MAGPIE.DATA, "warn");
	$MAGPIE.DATA.writeJSON("MAGPIE/MAGPIE_Resource", $MAGPIE.RESOURCE, "warn");
	$MAGPIE.DATA.writeJSON("MAGPIE/MAGPIE_Magpayan", $MAGPIE.MAGPAYAN, "warn");
}

MAGPIE.SYS.data._DataManager_loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents)
{
	MAGPIE.SYS.data._DataManager_loadSave.call(this, contents);
	$MAGPIE.DATA = contents.MAGPIE;
	$PDL.ENTITY = contents.ENTITY;
}

MAGPIE.SYS.data._SceneLoad_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess = function()
{
	console.clear();
	MAGPIE.SYS.data._SceneLoad_onLoadSuccess.call(this);
	setTimeout(() => {
		try {
			$MAGPIE.RUNTIME.awake();
		} catch (error) {
			console.warn(error);
		}
	}, 1000);
}

//#endregion





//------------------------------------------------------------------------
//#region Game_System
MAGPIE.SYS.runtime._Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function()
{
	MAGPIE.SYS.runtime._Game_System_initialize.call(this);
	$MAGPIE = new MAGPIE_System();
	$HIMS = new MAGPIE_HIMS();
	$HIMS.MESSAGE = new HIMS_Message();
	$HIMS.CONSOLE = new HIMS_Console(); 
}
//#endregion






//#region NEW GAME
MAGPIE.SYS.start = function()
{
	$MAGPIE._loading = 0;
	const MAICU = $MAGPIE.DATA.readJSON("MAGPIE/MAGPIE_proxy", "warn");
	$MAGPIE_CORE = new MAGPIE_MAICU(MAICU);
	$HIMS.MESSAGE.loading("MAGPIE.SYS.start()...", $MAGPIE._loading++);
	$MAGPIE.DATA._init = true;
}
//#endregion




//------------------------------------------------------------------------
//#region HIMS settings

MAGPIE_HIMS.prototype.loadSettings = function()
{
	MAGPIE.HIMS.settings.title.load();
	this._HIMSloaded = true;
}

MAGPIE.HIMS.settings.title.load = function()
{
	let edit = Boolean(JSON.parse(MAGPIE.parameters.windows).editTitle);
	if(!edit)
	{
		return
	}
	let mode = Number(JSON.parse(MAGPIE.parameters.windows).titleMode);
	if(mode === 0) 
	{
		MAGPIE.HIMS.settings.title.editOffset();       
	}
}

//#endregion





//------------------------------------------------------------------------
//#region Scenes
MAGPIE.HIMS.scene = {};





//------------------------------------------------------------------------
//#region Map
/**
 * {@link MAGPIE.HIMS.scene.meta}
 */
MAGPIE.HIMS.scene.map = {};
MAGPIE.HIMS.scene.map.meta = {isCoreEdit: true};

MAGPIE.HIMS.scene._Scene_Map_createAllWindows = Scene_Map
	.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function()
{
	MAGPIE.HIMS.scene._Scene_Map_createAllWindows.call(this);
	this.createHIMSWindows();
}

Scene_Map.prototype.createHIMSWindows = function()
{
	//this.createConsoleWindow();
	this.createHIMSmessage();
}


//#endregion




//------------------------------------------------------------------------
//#region message
MAGPIE.HIMS.message = {};
MAGPIE.HIMS.message.window = {};


Scene_Map.prototype.createConsoleWindow = function()
{
	const rect = this.consoleWindowRect();
	this._HIMSconsole = new Window_HIMScons(rect);
	this.addWindow(this._HIMSconsole);
	this._HIMSconsole.hide();
}

Scene_Map.prototype.consoleWindowRect = function()
{
	const wx = eval(JSON.parse(MAGPIE.parameters.console).x);
	const wy = eval(JSON.parse(MAGPIE.parameters.console).y);
	const ww = eval(JSON.parse(MAGPIE.parameters.console).w);
	//const wh = this.calcWindowHeight(1, false);
	const wh = 150;
	return new Rectangle(wx, wy, ww, wh)
}

Scene_Map.prototype.createHIMSmessage = function()
{
	const rect = this.HIMSmessageRect();
	this._HIMSmessage = new Window_HIMSmessage(rect);
	this.addWindow(this._HIMSmessage);
	this._HIMSmessage.hide();
}

Scene_Map.prototype.HIMSmessageRect = function()
{
	const ww = Math.max(Graphics.boxWidth / 2, 640);
	const wh = 200;
	const wx = (Graphics.boxWidth / 2) - (ww / 2);
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
}

function Window_HIMSmessage()
{
	this.initialize.apply(this, arguments);
}
Window_HIMSmessage.prototype = Object.create(Window_Base.prototype);
Window_HIMSmessage.prototype.constructor = Window_HIMSmessage;
Window_HIMSmessage.prototype.initialize = function(rect)
{
	Window_Base.prototype.initialize.call(this, rect);
	this.title_x = 0;
	this.title_y = 0;
	this.message_x = 0;
	this.message_y = this.title_y + 50;
	this.rect_w = rect.w;
	// this.createContents();
	this.backOpacity = 0;
	this.frameVisible = false;
}

Window_HIMSmessage.prototype.updateMessage = function(title, message, icon = 0)
{
	this.createContents();
	const ww = this.rect_w;
	const title_x = this.title_x;
	const title_y = this.title_y;
	const message_x = this.message_x;
	const message_y = this.message_y;
	let line1 = "";
	let line2 = "";
	let nextLine = false;
	let maxLine = 50;
	if(message.length > maxLine) 
	{
		let index = message.slice(0,maxLine).lastIndexOf(" ");
		line2 = message.slice(index + 1);
		line1 = message.slice(0, index);
		nextLine = true;
	}
	else
		line1 = message;
	this.changeTextColor(ColorManager.textColor(11));
	this.drawIcon(icon, title_x, title_y)
	this.drawText(title, title_x + 40, title_y, ww - 24, "left");
	this.drawText(line1, message_x, message_y, ww - 24, "left");
	if(!nextLine) return
	this.drawText(line2, message_x, message_y + 50, ww - 24, "left");
	this.open();
}




function Window_HIMScons()
{
	this.initialize.apply(this, arguments);
}

Window_HIMScons.prototype = Object.create(Window_Base.prototype);
Window_HIMScons.prototype.constructor = Window_HIMScons;
Window_HIMScons.prototype.initialize = function(rect)
{
	Window_Base.prototype.initialize.call(this, rect);
	this._index = -1;
	this.title = "H.I.M.S. Console";
	this.message = "";
	this._iconIndex = Number(MAGPIE.HIMS.settings.console.icon);
	this._delay = Number(MAGPIE.HIMS.settings.console.timeout) * 1000;
}

Window_HIMScons.prototype.updateCons = function(timeout = true)
{
	let wx = 0;
	let ww = Graphics.boxWidth - 20;
	let name_y = 0;
	let mex_y = 50;
	this.createContents();
	let color = MAGPIE.HIMS.settings.console.font_color;
	this.processColorChange(color);
	this.drawIcon(this._iconIndex, wx, name_y);
	this.drawText(this.title, wx + 40, name_y, ww, "Left");
	this.drawText(this.message, wx, mex_y, ww, "Left");
	this.open();
	if(timeout)
		setTimeout(() => this.close(), this._delay);
}
//#endregion





//------------------------------------------------------------------------
//#region Title





//#region window
/**
 * 
 * {@link MAGPIE.HIMS.settings.title.meta}
 */
MAGPIE.HIMS.settings.title.window = {};
MAGPIE.HIMS.settings.title.editOffset = function()
{
	$dataSystem.titleCommandWindow.offsetX = Number(JSON.parse(MAGPIE
		.parameters.windows).titleX);
	$dataSystem.titleCommandWindow.offsetY = Number(JSON.parse(MAGPIE
		.parameters.windows).titleY);
}

MAGPIE.HIMS.edit._Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function()
{
	MAGPIE.HIMS.edit._Scene_Title_start.call(this);
	let mode = Number(JSON.parse(MAGPIE.parameters.windows).titleMode);
	if(mode === 1) 
	{
		this._commandWindow.width = eval(JSON.parse(MAGPIE.parameters.windows).titleW);
		this._commandWindow.x = eval(JSON.parse(MAGPIE.parameters.windows).titleX);
		this._commandWindow.y = eval(JSON.parse(MAGPIE.parameters.windows).titleY);
	}
}
//#endregion





//#region newGameSFX
/**
 * {@link MAGPIE.HIMS.settings.title.meta}
 */
MAGPIE.HIMS.settings.title.newGame = {isSFX: true};

Scene_Title.prototype.commandNewGame = function() {
    DataManager.setupNewGame();
    this._commandWindow.close();
    let newGameSE = JSON.parse(MAGPIE.parameters.sound).newGameSE;
	let vol = Number(JSON.parse(MAGPIE.parameters.sound).newGameVol);
	let pit = Number(JSON.parse(MAGPIE.parameters.sound).newGamePit);
	let fadeout = Number(JSON.parse(MAGPIE.parameters.sound).newGameFade);
    //this.fadeOutAll();
	this.startFadeOut(fadeout)
    AudioManager.playSe({name: newGameSE, volume: vol, pitch: pit})
    SceneManager.goto(Scene_Map);
};
//#endregion

//#endregion






//------------------------------------------------------------------------
//#region Status

Window_StatusEquip.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const equips = this._actor.equips();
    const item = equips[index];
    let slotName = this.actorSlotName(this._actor, index);
	let icon = null;
	if(slotName === "Physique") icon = 84;
	if(slotName === "Metabolism") icon = 102;
	if(slotName === "Evolution") icon = 174;
	if(slotName === "Growth") icon = 270;
	if(slotName === "Trait") icon = 253;
	this.drawIcon(icon, rect.x, rect.y);
    const sw = 0;
    this.changeTextColor(ColorManager.systemColor());
    //this.drawText(slotName, rect.x + icon_x, rect.y, sw, rect.height);
    this.drawItemName(item, rect.x + sw, rect.y, rect.width - sw);
};

//#endregion







//#endregion





//------------------------------------------------------------------------
//#region expansions
/**
 * 
 */
// MAGPIE.HIMS.settings.expansions = {};

// MAGPIE.HIMS.settings.expansions._Scene_Title_start = Scene_Title
// 	.prototype.create;
// MAGPIE.HIMS.settings.expansions.isActive = true;
// Scene_Title.prototype.create = function()
// {
// 	let expansions = MAGPIE.HIMS.settings.expansions.isActive;
// 	MAGPIE.HIMS.settings.expansions._Scene_Title_start.call(this);
// 	if(expansions) this.createExpansionsWindow();
// }

// Scene_Title.prototype.createExpansionsWindow = function()
// {
// 	const rect = this.expansionsWindowRect();
// 	this._expansionsWindow = new Window_Base(rect);
// 	this.addWindow(this._expansionsWindow);
// }



//#endregion

//#endregion






//#endregion
//------------------------------------------------------------------------






//------------------------------------------------------------------------
//end of plugin