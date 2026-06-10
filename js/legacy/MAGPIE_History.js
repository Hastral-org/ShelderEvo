//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_3] v0.1.0 MAGPIE_History
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-history
 * 
 * @help
 * (MAGPIE) HISTORY SYSTEM
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.1.0 2025 08 24
 * - initial build
 * 
 * 
 * @param geologic
 * @text Geologic History
 * @desc Define a detailed geologic history for your calendars
 * @type struct<geologic>[]
 */

/*~struct~geologic:
 * 
 * @param calendar
 * @text Calendar
 * @desc Type the index of the calendar your are referring from DateTimeSystem
 * @type number
 * 
 * @param event
 * @text Geologic event
 * @desc Define new geologic events
 * @type struct<event>[]
 * 
 * 
 */

/*~struct~event:
 * 
 * @param name
 * @text Event name
 * @type text
 * 
 * @param scale
 * @text Event scale
 * @desc Select the appropriate event scale
 * @type select
 * @option Eon (300 MY - 2 BY)
 * @value 0
 * @option Era (30 MY - 300 MY)
 * @value 1
 * @option Period (3 MY - 30 MY)
 * @value 2
 * @option Epoch (300 KY - 3 MY)
 * @value 3
 * @option Age (3 KY - 300 KY)
 * @value 4
 * @option SubAge (3 Y - 3 KY)
 * @value 5
 * 
 * @param start
 * @text Start epoch
 * @desc enter the value in years ('-number' for before year 0)
 * @type text
 * 
 * @param end
 * @text End epoch
 * @desc enter the value in years ('-number' for before year 0 / 'Infinity' for ongoing)
 * @type text
 * 
 * @param contents
 * @text Event details
 * @desc Enter free text for this event (optional)
 * @type note
 * 
 * @param gravity
 * @text Event gravity
 * @desc The impact of this event on the world (optional)
 * @type select
 * @option Trivial (no effect)
 * @value 0
 * @option Important (some effects - appropriate for new Ages/Epochs)
 * @value 1
 * @option Critical (lasting effects - apropriate for new Epochs/Periods)
 * @value 2
 * @option Severe (extinctions and permanent changes - apprpriate for Periods/Eras)
 * @value 3
 * @option Existential (mass-extinctions and Eon/Era-changing events)
 * @value 4
 * 
 * 
 */
//#endregion




//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.8.0";
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.History = {};
MAGPIE.addons.History.version = "0.1.0";
MAGPIE.addons.History.version_date = "20250823";
MAGPIE.addons.History.firmware = "v" + MAGPIE.addons.History.version + 
	"." + MAGPIE.addons.History.version_date;
MAGPIE.addons.History.pluginName = "MAGPIE_History";
MAGPIE.addons.History.parameters = PluginManager
	.parameters(MAGPIE.addons.History.pluginName);
if(!MAGPIE?.PDL?.isInstalled)
	console.warn("MAGPIE_PDL.js is not installed! Get it at: " +
		"https://matheraptor.itch.io/magpie-pdl");
if(!MAGTIME) 
	console.warn("MAGPIE_DateTimeSystem.js is not installed! Get it at: " + 
		"https://matheraptor.itch.io/magpie-datetimesystem");
MAGPIE.addons.History.meta = {
	name: "M.A.G.P.I.E. History system",
	firmware: MAGPIE.addons.History.firmware,
	firmwareFile: `${MAGPIE.addons.History.pluginName}.js`,
	isAddon: true
};
MAGTIME.HISTORY = {};
MAGTIME.HISTORY.parameters = JSON.parse(MAGPIE.addons.History.parameters.geologic) || {};
MAGTIME.HISTORY.geologic = [];
MAGTIME.HISTORY.parameters.forEach(e => MAGTIME.HISTORY.geologic.push(JSON.parse(e)));
MAGTIME.HISTORY.geologic.forEach(e => {
	e.events = [];
	JSON.parse(e.event).forEach(i => {
		let event = JSON.parse(i);
		let result = {};
		result.name = event.name;
		result.scale = Number(event.scale);
		result.start = Number(event.start);
		result.end = Number(event.end);
		result.contents = event.contents;
		result.gravity = Number(event.gravity);
		e.events.push(result);
	});
	e.calendar = Number(e.calendar);
	delete e.event;
})
//#endregion





//------------------------------------------------------------------------
//#region EVENT

MAGPIE.addons.History.geologic = {};
MAGPIE.addons.History.geologic.eon = {
	name: "Eon", 
	desc: "Several hundred million years to two billion years",
	interval: [300000000,2000000000]
};

MAGPIE.addons.History.geologic.era = {
	name: "Era", 
	desc: "Tens to hundreds of millions of years",
	interval: [30000000,300000000]
};
MAGPIE.addons.History.geologic.period = {
	name: "Period", 
	desc: "Millions of years to tens of millions of years",
	interval: [3000000,30000000]
};
MAGPIE.addons.History.geologic.epoch = {
	name: "Epoch", 
	desc: "Hundreds of thousands to millions of years",
	interval: [300000,3000000]
};
MAGPIE.addons.History.geologic.age = {
	name: "Age", 
	desc: "Thousands of years to hundreds of thousands of years",
	interval: [3000,300000]
};
MAGPIE.addons.History.geologic.subAge = {
	name: "Sub-Age", 
	desc: "Years to thousands of years",
	interval: [3,3000]
};
MAGTIME.HISTORY.SCALE = {};
MAGTIME.HISTORY.SCALE.EON = 0;
MAGTIME.HISTORY.SCALE.ERA = 1;
MAGTIME.HISTORY.SCALE.PERIOD = 2;
MAGTIME.HISTORY.SCALE.EPOCH = 3;
MAGTIME.HISTORY.SCALE.AGE = 4;
MAGTIME.HISTORY.SCALE.SUB_AGE = 5;
MAGTIME.HISTORY.SCALE.EARLY = -1;
MAGTIME.HISTORY.SCALE.LATE = 1;
MAGTIME.HISTORY.SCALE.MYA = -1000000;
MAGTIME.HISTORY.SCALE.GYA = -1000000000;




//#region Date
// function Game_Date(data = {
// 	calendar: 0,
// 	epoch: 0
// })
// {
// 	this._calendar = data.calendar;
// 	this.epoch = data.epoch;
// }
// Game_Date.prototype.calendar = function()
// {
// 	return MAGTIME.calendars[this._calendar]
// }
// Game_Date.prototype.year = function()
// {
// 	//
// }
// Game_Date.prototype.month = function()
// {
// 	//
// }
// Game_Date.prototype.day = function()
// {
// 	//
// }
// Game_Date.prototype.hour = function()
// {
// 	//
// }
// Game_Date.prototype.minute = function()
// {
// 	//
// }

// Game_Date.prototype.geologic = function()
// {
// 	//
// }
//#endregion







//------------------------------------------------------------------------
//#region PDL event

function MAGPIE_Year()
{
	this.initialize(...arguments);
}
MAGPIE_Year.prototype.initialize = function()
{
	this.isAvailable = true;
	this.events = {};
}

MAGPIE_Year.prototype.add = function(event)
{
	let slot = event._start.gameday.toFixed(5);
	if(!this.events[slot]) this.events[slot] = [];
	this.events[slot].push(event.ID);
}

function MAGPIE_Timeline()
{
	this.initialize(...arguments);
}
MAGPIE_Timeline.prototype.initialize = function()
{
	this._name = "Events";
	this.year = [new MAGPIE_Year()];
}

MAGPIE_Timeline.prototype.add = function(event)
{
	let year = Math.floor(event._start.gameday / $TIME.accurateYear());
	this.year[year].add(event);
}

MAGPIE_Timeline.prototype.getEventSlot = function(gameday)
{
	let g = gameday.toFixed(5);
	let y = Math.floor(gameday / $TIME.accurateYear());
	return this.year[y].events[g]
}

MAGPIE_Timeline.prototype.getEventByGameday = function(gameday)
{
	return $PDL.event.getElementByID(this.getEventSlot(gameday))
}

MAGPIE_Event.prototype.timeline = function()
{
	return $PDL.timeline.getEventSlot(this._start.gameday)
}
//#endregion







//#region geologic
function Event_Geologic(data)
{
	this.initialize(data);
}
Event_Geologic.prototype = Object.create(CBE_Event.prototype);
Event_Geologic.prototype.constructor = Event_Geologic;
Event_Geologic.prototype.initialize = function(data)
{
	CBE_Event.prototype.initialize.call(this, data);
	this._scale = data?.scale;
	this._start = data?.start;
	this._end = data?.end;
}
Event_Geologic.prototype.MYa = function()
{
	if(start > 0) return false
	let start = Math.floor(this._start / 1000000);
	let end = Math.floor(this._end / 1000000);
	return [start,end]
}
Event_Geologic.prototype.textMYa = function()
{
	return [`${this.MYa()[0]} MYa`,`${this.MYa()[1]} Mya`]
}
Event_Geologic.prototype.GYa = function()
{
	return [this.MYa()[0] / 1000, this.MYa()[1] / 1000]
}
Event_Geologic.prototype.textGYa = function()
{
	return [`${Number((this.GYa()[0]).toFixed(2))} GYa`, 
		`${Number((this.GYa()[1]).toFixed(2))} GYa`]
}
Event_Geologic.prototype.era = function(name)
{
	return this.eras().find(e => e._name == name)
}
Event_Geologic.prototype.eras = function()
{
	let eras = $TIME.geologic._events
		.filter(e => e._scale === MAGTIME.HISTORY.SCALE.ERA);
	return eras.filter(e => e._start >= this._start && e._end <= this._end)
}
Event_Geologic.prototype.periods = function()
{
	let periods = $TIME.geologic._events
		.filter(e => e._scale === MAGTIME.HISTORY.SCALE.PERIOD);
	return periods.filter(p => p._start >= this._start && p._end <= this._end)
}
Event_Geologic.prototype.period = function(name)
{
	return this.periods().find(e => e._name == name)
}
Event_Geologic.prototype.epochs = function()
{
	let epochs = $TIME.geologic._events
		.filter(e => e._scale === MAGTIME.HISTORY.SCALE.EPOCH);
	return epochs.filter(e => e._start >= this._start && e._end <= this._end)
}
Event_Geologic.prototype.epoch = function(name)
{
	return this.epochs().find(e => e._name == name)
}
Event_Geologic.prototype.ages = function()
{
	let ages = $TIME.geologic._events
		.filter(e => e._scale === MAGTIME.HISTORY.SCALE.AGE);
	return ages.filter(a => a._start >= this._start && a._end <= this._end)
}
Event_Geologic.prototype.age = function(name)
{
	return this.ages().find(e => e._name == name)
}
Event_Geologic.prototype.subAges = function()
{
	let subAges = $TIME.geologic._events
		.filter(e => e._scale === MAGTIME.HISTORY.SCALE.SUB_AGE);
	return subAges.filter(s => s._start >= this._start && s._end <= this._end)
}
Event_Geologic.prototype.subAge = function(name)
{
	return this.subAges().find(e => e._name == name)
}

function Geologic_Eon(data)
{
	this.initialize(data);
}
Geologic_Eon.prototype = Object.create(Event_Geologic.prototype);
Geologic_Eon.prototype.constructor = Geologic_Eon;
Geologic_Eon.prototype.initialize = function(data)
{
	Event_Geologic.prototype.initialize.call(this, data);
}

function Geologic_Era(data)
{
	this.initialize(data);
}
Geologic_Era.prototype = Object.create(Event_Geologic.prototype);
Geologic_Era.prototype.constructor = Geologic_Era;
Geologic_Era.prototype.initialize = function(data)
{
	Event_Geologic.prototype.initialize.call(this, data);
}


function Geologic_Period(data)
{
	this.initialize(data);
}
Geologic_Period.prototype = Object.create(Event_Geologic.prototype);
Geologic_Period.prototype.constructor = Geologic_Period;
Geologic_Period.prototype.initialize = function(data)
{
	Event_Geologic.prototype.initialize.call(this, data);
}

function Geologic_Epoch(data)
{
	this.initialize(data);
}
Geologic_Epoch.prototype = Object.create(Event_Geologic.prototype);
Geologic_Epoch.prototype.constructor = Geologic_Epoch;
Geologic_Epoch.prototype.initialize = function(data)
{
	Event_Geologic.prototype.initialize.call(this, data);
}


function Geologic_Age(data)
{
	this.initialize(data);
}
Geologic_Age.prototype = Object.create(Event_Geologic.prototype);
Geologic_Age.prototype.constructor = Geologic_Age;
Geologic_Age.prototype.initialize = function(data)
{
	Event_Geologic.prototype.initialize.call(this, data);
}



function Geologic_History(events)
{
	this.initialize(events);
}
Geologic_History.prototype.initialize = function(events)
{
	this._events = [];
	if(events.length < 0) return
	events.forEach(e => this._events.push(this.setupEvent(e)))
	return this._events
}

Geologic_History.prototype.setupEvent = function(event)
{
	let data = {
		name: event.name,
		scale: event.scale,
		start: event.start,
		end: event.end,
		contents: event.contents,
		gravity: event.gravity
	}
	if(event.scale === MAGTIME.HISTORY.SCALE.EON) return new Geologic_Eon(data)
	if(event.scale === MAGTIME.HISTORY.SCALE.ERA) return new Geologic_Era(data)
	if(event.scale === MAGTIME.HISTORY.SCALE.PERIOD) return new Geologic_Period(data)
	if(event.scale === MAGTIME.HISTORY.SCALE.EPOCH) return new Geologic_Epoch(data)
	if(event.scale >= MAGTIME.HISTORY.SCALE.AGE) return new Geologic_Age(data)
	else return new Event_Geologic(data)
}

Geologic_History.prototype.eons = function()
{
	return this._events.filter(e => e._scale === MAGTIME.HISTORY.SCALE.EON)
}
Geologic_History.prototype.eon = function(name)
{
	return this.eons().find(e => e._name == name)
}

Geologic_History.prototype.eras = function()
{
	return this._events.filter(e => e._scale === MAGTIME.HISTORY.SCALE.ERA)
}
Geologic_History.prototype.era = function(name)
{
	return this.eras().find(e => e._name == name)
}

Geologic_History.prototype.periods = function()
{
	return this._events.filter(e => e._scale === MAGTIME.HISTORY.SCALE.PERIOD)
}
Geologic_History.prototype.period = function(name)
{
	return this.periods().find(e => e._name == name)
}

Geologic_History.prototype.epochs = function()
{
	return this._events.filter(e => e._scale === MAGTIME.HISTORY.SCALE.EPOCH)
}
Geologic_History.prototype.epoch = function(name)
{
	return this.epochs().find(e => e._name == name)
}

Geologic_History.prototype.ages = function()
{
	return this._events.filter(e => e._scale === MAGTIME.HISTORY.SCALE.AGE)
}
Geologic_History.prototype.age = function(name)
{
	return this.ages().find(e => e._name == name)
}

Geologic_History.prototype.subAges = function()
{
	return this._events.filter(e => e._scale === MAGTIME.HISTORY.SCALE.SUB_AGE)
}
Geologic_History.prototype.subAge = function(name)
{
	return this.subAges().find(e => e._name == name)
}


//#endregion

//#endregion




//------------------------------------------------------------------------
//#region RUNTIME

MAGTIME.HISTORY.start = function()
{
	let calendar = MAGTIME.calendars[$TIME.index()]._index;
	let geologic = MAGTIME.HISTORY.geologic.find(g => g.calendar === calendar);
	$TIME.geologic = {};
	geologic.events.sort((a, b) => a.scale - b.scale).forEach(e => {
		let data = {
		name: e.name, 
		scale: e.scale, 
		start: e.start, 
		end: e.end, 
		contents: e.contents,
		gravity: e.gravity
		}
		let event = new Event_Geologic({data});
		event.setup();
		});
}

MAGTIME.HISTORY._runtime = {};
MAGTIME.HISTORY._runtime._Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function()
{
	MAGTIME.HISTORY._runtime._Game_System_initialize.call(this);
	//
}

MAGTIME.HISTORY._runtime._MAGPIE_SYS_start = MAGPIE.SYS.start;
MAGPIE.SYS.start = function()
{
	MAGTIME.HISTORY._runtime._MAGPIE_SYS_start.call(this);
	//MAGTIME.HISTORY.start();
}
//#endregion



//end of plugin