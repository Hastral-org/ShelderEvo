//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [TIER_2] v0.35.0 MAGPIE ShelderEvo handler 
 * @author Matheraptor
 * @url https://matheraptor.itch.io/
 * 
 * @help
 * 
 * 
 * -----------------------------------------------------------------------
 * FEATURES
 * -----------------------------------------------------------------------
 * - [ ]
 * 
 * -----------------------------------------------------------------------
 * CHANGELOG
 * -----------------------------------------------------------------------
 * v0.35.0 2026 06 06
 * - initial build
 */
//#endregion
//========================================================================
/**
 * @namespace 
 * @author Matheraptor
 * @version 0.35.0
 * @desc 
 */
//========================================================================
//#region - INDEX
//========================================================================
// var MAGPIE = MAGPIE || {};
MAGPIE.SHELDEX = MAGPIE.SHELDEX || {};
MAGPIE.HANDLER = {};
MAGPIE.HANDLER.meta = {
	name: "M.A.G.P.I.E. handler",
	desc: "",
	firmwareName: "handler",
	firmwareDate: "20260606"
}
MAGPIE.HANDLER.LOCAL_STORAGE = {};
MAGPIE.HANDLER.METASTATE = {};
MAGPIE.HANDLER.BOOT_GUARD = {};
MAGPIE.HANDLER.IO = {};
MAGPIE.HANDLER.ENGINE_BOOT = {};
MAGPIE.HANDLER.GAME_BOOT = {};
MAGPIE.HANDLER.SOCKET = {}
//#endregion
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//========================================================================
// #region - UTILITY
//========================================================================
MAGPIE.UTILITY = {}
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > CTZ
//------------------------------------------------------------------------
/**
 * @typedef {{millisecond: Boolean, second: Boolean, date: Boolean}} date_options
 * @typedef {String} CTZ YYYYMMDDHHMM
 * @param {Date} date 
 * @param {date_options} options 
 */
MAGPIE.UTILITY.CTZ = function CTZ(date, options = {})
{
	if(!(date instanceof Date))
	{
		if(Object.prototype.toString.call(date) === "[object Object]")
			options = date
		date = new Date()
	}
	const now = date
	const pad = (num, length = 2) => {return num.toString().padStart(length, 0)}
	let year = pad(now.getUTCFullYear(), 4)
	let month = pad(now.getUTCMonth() + 1)
	let day = pad(now.getUTCDate())
	let hour = pad(now.getUTCHours())
	let minute = pad(now.getUTCMinutes())
	let second = ""
	let millisecond = ""
	if(options?.millisecond)
	{
		millisecond = pad(now.getUTCMilliseconds(), 3)
		options.second = true
	}
	if(options?.second) second = pad(now.getUTCSeconds());
	if(options?.date)
	{
		hour = ""; month = ""; day = "";
	}
	const stamp = year + month + day + hour + minute + second + millisecond
	return stamp
}
/**
 * @typedef {CTZ} CTZD YYYYMMDD
 * @returns {CTZD} YYYYMMDD
 */
MAGPIE.UTILITY.CTZD = function CTZD()
{
	return MAGPIE.UTILITY.CTZ({date: true})
}
/**
 * @typedef {CTZ} CTZT HHMM
 * @returns {CTZT} HHMM
 */
MAGPIE.UTILITY.CTZT = function CTZT()
{
	return MAGPIE.UTILITY.CTZ({time: true})
}
/**
 * @typedef {CTZ} CTZTS HHMMSS
 * @returns {CTZTS} HHMMSS
 */
MAGPIE.UTILITY.CTZTS = function CTZTS()
{
	return MAGPIE.UTILITY.CTZ({time: true, second: true})
}
/**
 * @typedef {CTZ} CTZF YYYYMMDDHHMMSSmmm
 * @type {CTZF} YYYYMMDDHHMMSSmmm
 */
MAGPIE.UTILITY.CTZF = function CTZF()
{
	return MAGPIE.UTILITY.CTZ({millisecond: true})
}


// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Time
//------------------------------------------------------------------------
/**
 * @typedef {Number} epoch_real = Date.now() - ms since true epoch
 * @returns {epoch_real}
 */
MAGPIE.UTILITY.epoch = function epoch()
{
	return Date.now()
}
/**
 * @typedef {Number} epoch_real_s Date.now() in seconds
 * @returns {epoch_real_s}
 */
MAGPIE.UTILITY.now = function now()
{
	const now = Math.floor(Date.now() / 1000)
	return now
}
/**
 * @typedef {{
 * years: Number,
 * months: Number,
 * days: Number,
 * hours: Number,
 * minutes: Number,
 * seconds: Number}} time_interval n year(s), n month(s), n day(s), n hour(s), 
 * n minute(s) n second(s)
 * 
 * @typedef {String} interval_text time interval printed in En
 * 
 * @param {time_interval} interval 
 * @returns {interval_text} 
 */
MAGPIE.UTILITY._printInterval = function _printInterval(interval)
{
	const ePrefix = `[SYSTEM].printInterval: `;
	try
	{
		let message = "";
		const years = interval?.years;
		const months = interval?.months;
		const days = interval?.days;
		const hours = interval?.hours;
		const minutes = interval?.minutes;
		const seconds = interval?.seconds;
		if(years) 
			message += `${years} year${years > 1 ? "s" : ""}, `;
		if(months)
			message += `${months} month${months > 1 ? "s" : ""}, `;
		if(days) 
			message += `${days} day${days > 1 ? "s" : ""}, `;
		if(hours)
			message += `${hours} hour${hours > 1 ? "s" : ""}, `;
		if(minutes)
			message += `${minutes} minute${minutes > 1 ? "s" : ""}, `;
		if(seconds)
			message += `${seconds} second${seconds > 1 ? "s" : ""}`;
		message = message.trimEnd();
		if(message.endsWith(",", message.length - 1))
			message = message.slice(0, message.at(-1));
		return message
	}	
	catch(e)
	{
		MAGPIE.error(ePrefix + e.message, e);
	}
}
/**
 * 
 * @param {duration} seconds 
 * @returns {time_interval}
 */
MAGPIE.UTILITY._makeInterval = function makeInterval(seconds)
{
	const interval = {};
	interval.seconds = Math.round(seconds % 60);
	if(seconds < 60)
		return interval
	const minute = (60**2)
	interval.minutes = Math.floor(seconds % minute);
	if(seconds < minute)
		return interval
	const hour = 60**2 * 24
	interval.hours = Math.floor(seconds % hour);
	if(seconds < hour)
		return interval
	const month = (60**2 * 24 * 30.25)
	interval.days = Math.floor(seconds % month)
	if(seconds < month)
		return interval
	const year = (60**2 * 24 * 30.25 * 365)
	interval.months = Math.floor(seconds % year)
	if(seconds < year)
		return interval
	interval.years = Math.floor(seconds / year)
	return interval
}
/**
 * 
 * @param {duration} seconds 
 * @returns {String} Estimated Time of Arrival, printed in En
 */
MAGPIE.UTILITY.printETA = function printETA(seconds)
{
	const ePrefix = `[SYSTEM].printETA: `;
	try
	{
		const ETA_s = seconds;
                let ETA = "";
                const ETA_sec = Math.floor(ETA_s % 60);
                const ETA_min = Math.floor(ETA_s / 60) % 60;
                const ETA_hour = Math.floor(ETA_s / 3600 ) % 24;
                const ETA_days = Math.floor(ETA_s / (3600 * 24));
                if(ETA_days) ETA += `${ETA_days}d `;
                if(ETA_hour) ETA += `${ETA_hour}h `;
                if(ETA_min) ETA += `${ETA_min}m `;
                ETA += `${ETA_sec}s`;
		return ETA
	}
	catch(e)
	{
		MAGPIE.error(ePrefix + e.message, e);
	}
}
/**
 * 
 * @param {MAGPIE_DATE} now
 * @param {duration} ETA
 * @param {{
 * date: Boolean,
 * seconds: Boolean
 * }} options
 * @param {variableCTZ} 
 */
MAGPIE.UTILITY._printETZ = function _printETZ(now, ETA = 0, options)
{
	if(!(now instanceof MAGPIE_DATE)) return "n/a"
	const targetEpoch = now.epoch + (ETA * 1000)
	const targetDate = new MAGPIE_DATE({
		calendar: now.calendar,
		epoch: targetEpoch
	})
	return targetDate._printSTZ(options)
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Number
//------------------------------------------------------------------------
/**
 * 
 * @param {Number} num 
 * @param {Number} toFixed 
 * @param {Boolean} sign 
 */
MAGPIE.UTILITY._format_num = function formatNumber(num, toFixed, sign)
{
	const formatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: Number(toFixed) || 0,
	maximumFractionDigits: Number(toFixed) || 0,
	signDisplay: sign ? 'always' : 'never' // Forces +0.00000, -0.00000, +0.00005
	});
	return formatter.format(num)
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
// #region - SYSTEM
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Storage
//------------------------------------------------------------------------
MAGPIE.HANDLER.LOCAL_STORAGE.meta = ""
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
MAGPIE.HANDLER.METASTATE.meta = ""
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > BootGuard
//------------------------------------------------------------------------
MAGPIE.HANDLER.BOOT_GUARD.meta = ""
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > I/O
//------------------------------------------------------------------------
MAGPIE.HANDLER.IO.meta = ""
const fs = require("fs");
const path = require("path");
/**
 * 
 * @returns {Boolean}
 */
MAGPIE.HANDLER.IO.init = function initIO()
{
	return $seData?.isInit
}
/**
 * 
 * @returns {Boolean}
 */
MAGPIE.HANDLER.IO.isActive = function isActive_IO()
{
	return $seData?.isActive
}
/**
 * @todo updater import state
 * @returns {Boolean}
 */
MAGPIE.HANDLER.IO.isUpdated = function isUpdated()
{
	return false
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Logging
//------------------------------------------------------------------------
MAGPIE.LOG = {}
MAGPIE.LOG.errors = []
MAGPIE.LOG.time = function ()
{
	return `[${MAGPIE.UTILITY.CTZF()}Z] `
}
MAGPIE.LOG.consoleTime = function()
{
	return `[${MAGPIE.UTILITY.CTZ()}Z]`
}
/**
 * @returns {String}
 */
MAGPIE.LOG.getFolderPath = function()
{
	return path.resolve(process.cwd(), "logs")
}
const { Worker } = require("worker_threads")
MAGPIE.HANDLER.IO.WORKER = new Worker(path.resolve(process.cwd(), "js/plugins/app/handler_io.js"))
MAGPIE.logToWorker = function logToWorker(message, prefix = "console", logToConsole = false)
{
	const ePrefix = "[LOG] "
	try
	{
		const date = MAGPIE.UTILITY.CTZD()
		const logEntry = JSON.stringify({
			timestamp: MAGPIE.UTILITY.CTZ(),
			level: prefix,
			message,
			filename: `${MAGPIE.LOG.getFolderPath()}${prefix}${date}.log`
		})
		MAGPIE.HANDLER.IO.WORKER.postMessage(logEntry)
	}
	catch(e)
	{
		MAGPIE.error(ePrefix + e.message, e)
	}
}
/**
 * 
 * @param {String} message 
 * @param {String} prefix 
 * @param {Boolean} logToConsole 
 */
MAGPIE.log = function log(message, prefix = "console", logToConsole = false)
{
	const ePrefix = "[LOG] "
	// try
	// {
	// 	return MAGPIE.logToWorker(message, prefix, logToConsole)
	// }
	// catch(e)
	// {
	// 	console.error(e)
	// }
	try
	{
		const date = MAGPIE.UTILITY.CTZD()
		const logTime = MAGPIE.LOG.time()
		const consoleTime = `${MAGPIE.LOG.consoleTime()} `
		const log = (typeof message === "object"
			? JSON.stringify(message, null, 2)
			: message
		)
		if(logToConsole)
			console.log(consoleTime + log)
		if(typeof prefix === "string")
		{
			const filename = `${MAGPIE.LOG.getFolderPath()}/${prefix}${date}.log`
			const timestamp = logTime
			const level = prefix.toUpperCase()
			fs.appendFileSync(filename, timestamp + level + log)
		}
	}
	catch(e)
	{
		console.error(e)
	}
}
MAGPIE.errorToWorker = function(message, error)
{
	const ePrefix = "[ERROR] "
	try
	{
		const date = MAGPIE.UTILITY.CTZD()
		const logEntry = JSON.stringify({
			timestamp: MAGPIE.UTILITY.CTZ(),
			level: "error",
			message,
			filename: `${MAGPIE.LOG.getFolderPath()}/${prefix}${date}.log`
		})
		MAGPIE.HANDLER.IO.WORKER.postMessage(logEntry)
	}
	catch(e)
	{
		MAGPIE.error(ePrefix + e.message, e)
	}
}
/**
 * 
 * @param {String} message 
 * @param {Error} error 
 */
MAGPIE.error = function error(message, error)
{
	const ePrefix = "[ERROR] "
	// try
	// {
	// 	return MAGPIE.errorToWorker(message, error)
	// }
	// catch(e)
	// {
	// 	console.error(e)
	// }
	try
	{
		const log = message
		const date = MAGPIE.UTILITY.CTZD()
		const full = `[${MAGPIE.UTILITY.CTZF()}] `
		MAGPIE.LOG.errors.push(log)
		console.error(`[ERROR] ${message} | `, error)
		const timestamp = full
		const filename = `${MAGPIE.LOG.getFolderPath()}/error${date}.log`
		const logged = fs.appendFileSync(filename, full + "ERROR" + log + "\n" + error?.stack + "\n---\n")
	}
	catch(e)
	{
		console.error(ePrefix + e.message, e)
	}
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Engine
//------------------------------------------------------------------------
MAGPIE.HANDLER.ENGINE_BOOT.meta = ""
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
MAGPIE.HANDLER.SOCKET.meta = ""
SE_SOCKET.prototype.init = function()
{
	if(!SE_CLI?.socket?.id)
		return false
	this.data = SE_CLI.socket
	this.isActive = true
	return true
}
/**
 * 
 * @returns {Boolean}
 */
MAGPIE.HANDLER.SOCKET.init = function initSocket()
{
	return SE_SOCKET.prototype.init.call(this);
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Calendar
//------------------------------------------------------------------------
/**
 * @static 
 * @desc handler for MAGPIE_DATE and its functions
 * @returns {new MAGPIE_CALENDAR}
 */
function MAGPIE_CALENDAR()
{
	this.initialize(...arguments)
}
MAGPIE_CALENDAR.prototype.initialize = function()
{
	this.isInit = false;
	this.isActive = false;
	this.calendarID = NaN;
}
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > legacy
//------------------------------------------------------------------------
/**
 * @desc legacy code from [ShelderEvo_core_old.js]("../ShelderEvo_core_old.js")
 */
const SECore = {}
/**
 * @audit SECore.setCalendar legacy method
 * @desc function to set Calendar
 * @param {Number} Calendar check {@link timesystem}
 * @param {Number} GameDay 
 * @param {Number} $seClock.day 
 * @param {Number} Month 
 * @param {Number} Year 
 * @param {Number} $seClock.hour 
 */
SECore.setCalendar = function (Calendar, gameday = 1, day = 1, month = 1, year = 1, hour = 1) 
{
	try
	{
		$gameVariables.setValue(cVar.calendar, timesystem[Calendar]);
		let LeapYear = timesystem[Calendar].LeapYear;
		$gameVariables.setValue(TIME.leapYear, LeapYear);
		let LeapMonth = timesystem[Calendar].LeapMonth;
		$gameVariables.setValue(TIME.leapMonth, LeapMonth);
		currentCalendar = timesystem[Calendar];
		let CalendarLength = Object.keys(timesystem[Calendar]).length;
		let Months = CalendarLength - 4;
		SECore.setupSeason();
		$gameVariables.setValue(TIME.months, Months);
		$gameVariables.setValue(TIME.gameDay, gameday);
		$gameVariables.setValue(TIME.day, day);
		$gameVariables.setValue(TIME.month, month);
		$gameVariables.setValue(TIME.year, year);
		$gameVariables.setValue(MAGPIE.KEY.VARIABLES.HOUR, hour);
		$gameVariables.setValue(TIME.epoch, SECore.epoch());
		$gameVariables.setValue(TIME.yearDay, SECore.yearDay());
		GameDay = $gameVariables.value(TIME.gameDay);
		$seClock.day = $gameVariables.value(TIME.day);
		Month = $gameVariables.value(TIME.month);
		Year = $gameVariables.value(TIME.year);
		$seClock.hour = $gameVariables.value(MAGPIE.KEY.VARIABLES.HOUR);
		$seClock.minute = $gameVariables.value(MAGPIE.KEY.VARIABLES.MINUTE);
		$seClock.second = $gameVariables.value(MAGPIE.KEY.VARIABLES.SECOND);
		epoch = $gameVariables.value(TIME.epoch);
		YearDay = $gameVariables.value(TIME.yearDay);
		$seClock.days = Object.values(currentCalendar)[Month + 2];
		$gameVariables.setValue(TIME.days, $seClock.days);
		MAGPIE.console.Log(`Calendar set to ${$seCalendar?.name}.`);
		return $seCalendar?.name
	}
	catch(e)
	{
		MAGPIE.error(e.message, e)
	}
}
SECore.epoch = function()
{
	return TIME.initialEpoch + Year
}
SECore.yearDay = function()
{
	yearDay = 0;
	for(let i = 1; i < Month; i++)
	{
		yearDay += Object.values(currentCalendar)[i + 2]
	}
	yearDay += $seClock.day;
	$gameVariables.setValue(TIME.yearDay, this.yearDay);
	return yearDay
}
SECore.setupSeason = function()
{
	let season = SECore.season(SECore.yearDay());
	let results = SECore.getSeasonalChanges(season);
	results.season = season;
	return results
}
SECore.getSeasonalChanges = function(season) {
	$seClock.sunrise = 7;
	$seClock.sunset = 18;
	switch (season) {
		case "winter":
			$seClock.sunrise += 2;
			$seClock.sunset -= 2;
			break;
		case "spring":

			break;
		case "summer":
			$seClock.sunrise -= 2;
			$seClock.sunset += 2;
			break;
		case "autumn":

			break;
	}
	return {sunrise: $seClock.sunrise,sunset: $seClock.sunset}
}
SECore.switchSeason = function(seasonName, seasonID)
{
	$gameVariables.setValue(MAGPIE.KEY.VARIABLES.SEASON, seasonName);
	$gameVariables.setValue(MAGPIE.KEY.VARIABLES.SEASONID, seasonID);
	return seasonName
}
SECore.season = function(yearDay) {
	let seasonalDelay = $gameVariables.value(MAGPIE.KEY.VARIABLES.SEASONalDelay) || 15;
	let YearDays = currentCalendar.Days; 
	let seasonDays = Math.floor(YearDays / 4);
	if(yearDay < seasonDays - seasonalDelay || yearDay > (seasonDays * 4) - seasonalDelay)
	{
		return SECore.switchSeason("winter", 1)
	} else if(yearDay < (seasonDays * 2) - seasonalDelay) return SECore.switchSeason("spring", 2) 
		else if(yearDay < seasonDays * 3 - seasonalDelay) return SECore.switchSeason("summer", 3)
			else return SECore.switchSeason("autumn", 4)
}
//function to convert current month number to its name
SECore.getMonthName = function() {
		let Month = $gameVariables.value(TIME.month);
		let MonthName = Object.keys(currentCalendar)[Month + 2];
		$gameVariables.setValue(TIME.monthName, MonthName);
		return MonthName
}
//function to get the number of days in current month
SECore.getMonthDays = function() {
		let Month = $gameVariables.value(TIME.month);
		Days = Object.values(currentCalendar)[Month];
		$gameVariables.setValue(TIME.days, Days);
		return Days
};
// #endregion
//------------------------------------------------------------------------
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > ShelGeo
//------------------------------------------------------------------------
/**
 * @static
 * @desc handler for all geographical functions
 * @returns {new SHELGEO}
 */
function SHELGEO()
{
	this.initialize(...arguments)
}
SHELGEO.prototype.initialize = function()
{
	this.isInit = false;
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
// #region > ShelStory
//------------------------------------------------------------------------
/**
 * @static
 * @desc handler for all lore sync functions
 * @returns {new SHELSTORY}
 */
function SHELSTORY()
{
	this.initialize(...arguments)
}
SHELSTORY.prototype.initialize = function()
{
	this.isInit = false
	this.isActive = false
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > SE_Emote
//------------------------------------------------------------------------
/**
 * @static
 * @desc handler for MAGPIE_EMOTE and its functions
 * @returns {new SE_EMOTE}
 */
function SE_EMOTE()
{
	this.initialize(...arguments)
}
SE_EMOTE.prototype.initialize = function()
{
	this.isInit = false;
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
// #region > SE_HUD
//------------------------------------------------------------------------
/**
 * @static
 * @desc handler for HUD window and its function
 * @returns {new SE_HUD}
 */
function SE_HUD()
{
	this.initialize(...arguments)
}
SE_HUD.prototype.initialize = function()
{
	this.isInit = false;
	this.isActive = false
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > SE_Clock
//------------------------------------------------------------------------
/**
 * @desc Clock window enums
 */
MAGPIE.KEY.SE_CLOCK = {
	window_x:  Graphics.boxWidth,
	window_y: 0,
	window_w: 0,
	switch_date: 108,
	switch_phases: 111,
	switch_digital: 112
}
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_BLANK = 308
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_0 = 309
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_1 = 310
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_2 = 311
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_3 = 312
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_4 = 313
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_5 = 314
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_6 = 315
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_7 = 316
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_8 = 317
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_9 = 318
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_COLON = 319
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_DAWN = 282
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_MORNING = 283
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_NOON = 284
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_AFTERNOON = 285
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_DUSH = 286
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_NIGHT = 287
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DATE = 172
/**
 * @static
 * @desc handler for clock window and its functions
 * @returns {new SE_CLOCK}
 */
function SE_CLOCK()
{
	this.initialize(...arguments)
}
SE_CLOCK.prototype.initialize = function()
{
	this.isInit = false
	this.isActive = false
	this.x = MAGPIE.KEY.SE_CLOCK.window_x
	this.y = MAGPIE.KEY.SE_CLOCK.window_y
	this.w = MAGPIE.KEY.SE_CLOCK.window_w
	this.second = 0
	this.minute = 0
	this.hour = 0
	this.day = 0
	this.month = 0
	this.year = 0
	this.epoch = 0
	this.sunrise = 6
	this.sunset = 19
	this.days = 0
	this.yearday = 0
	this.gameday = 1
	this.calendar = 0
	this.clockWin = {}
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > legacy
//------------------------------------------------------------------------
//#region Clock
/**
 * @audit SECore.clock legacy method
 * {@link Game_Party.prototype.clock}
 */
SECore.clock = function()
{
	try
	{
		const TIME = MAGPIE.KEY.TIME;
		//$gameParty.clock();
		$seClock.second = $gameVariables.value(MAGPIE.KEY.VARIABLES.SECOND);
		$seClock.minute = $gameVariables.value(MAGPIE.KEY.VARIABLES.MINUTE);
		$seClock.hour = $gameVariables.value(MAGPIE.KEY.VARIABLES.HOUR);
		const accelerated = $seClock.second * MAGPIE.KEY.VARIABLES.TIMESCALE
		$gameVariables.setValue(MAGPIE.KEY.VARIABLES.SECOND, accelerated);
		//TICK
		if($gameVariables.value(MAGPIE.KEY.VARIABLES.SECOND) < 60) 
			return false
		//SuperTICK 
		$gameSwitches.setValue(MAGPIE.KEY.SWITCHES.SUPER_TICK, true);
		$gameVariables.setValue(MAGPIE.KEY.VARIABLES.SECOND, 0);
		$gameVariables.setValue(MAGPIE.KEY.VARIABLES.MINUTE, $seClock.minute + 1);
		$gameSwitches.setValue(MAGPIE.KEY.SWITCHES.SUPER_TICK, false);
		if($gameVariables.value(MAGPIE.KEY.VARIABLES.MINUTE) > 1) 
			$gameSwitches.setValue(MAGPIE.KEY.SWITCHES.MEGA_TICK, false);
		if($gameVariables.value(MAGPIE.KEY.VARIABLES.MINUTE) < 60) 
			return
		//MegaTICK
		$gameSwitches.setValue(MAGPIE.KEY.SWITCHES.MEGA_TICK, true);
		$gameVariables.setValue(MAGPIE.KEY.VARIABLES.MINUTE, 0);
		$gameVariables.setValue(MAGPIE.KEY.VARIABLES.HOUR, $seClock.hour + 1);
		SECore.getSeasonalChanges($gameVariables.value(MAGPIE.KEY.VARIABLES.SEASON));
		const hour = $gameVariables.value(MAGPIE.KEY.VARIABLES.HOUR)
		const minute = $gameVariables.value(MAGPIE.KEY.VARIABLES.MINUTE)
		SECore.timeOfDay(hour, minute, $seClock.sunrise, $seClock.sunset);
		if($gameVariables.value(MAGPIE.KEY.VARIABLES.HOUR) < 24) 
			return false
		//NEWDAY
		$gameVariables.setValue(MAGPIE.KEY.VARIABLES.HOUR,0);
		$gameSwitches.setValue(MAGPIE.KEY.SWITCHES.NEWDAY, true);
		$gameVariables.setValue(MAGPIE.KEY.VARIABLES.DAY, $seClock.day + 1);
		$gameVariables.setValue(TIME.yearDay,YearDay + 1);
		$gameVariables.setValue(TIME.gameDay,GameDay + 1);
		SECore.season(YearDay, currentCalendar);
		SECore.getMonthDays();
		let Days = $gameVariables.value(MAGPIE.KEY.VARIABLES.DAYS);
		if($seClock.day > 1 && $seClock.day < Days) 
			return $gameSwitches.setValue(TIME.newMonth,false)
		else if($seClock.day > Days)
			return SECore.newMonth();
		//END_OF_MONTH
		//LEAP YEAR?
		if($gameSwitches.value(TIME.isLeapYear) && $gameSwitches.value(TIME.isLeapMonth)) 
		{
			$gameSwitches.setValue(TIME.isLeapMonth,false);
			return
		};
		
		$gameSwitches.setValue(TIME.newYearsEve,true);
	}
	catch(e)
	{
		MAGPIE.error(e.message, e)
	}
}
// #endregion
//------------------------------------------------------------------------
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > SE_Menu
//------------------------------------------------------------------------
/**
 * @static
 * @desc handler for Menu scene additions and functions
 * @returns {new SE_MENU}
 */
function SE_MENU()
{
	this.initialize(...arguments)
}
SE_MENU.prototype.initialize = function()
{
	this.isInit = false;
	this.isActive = false
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > SE_Art
//------------------------------------------------------------------------
/**
 * @static
 * @desc handler for Art, images, and other graphical artifacts
 * @returns {new SE_ART}
 */
function SE_ART()
{
	this.initialize(...arguments)
}
SE_ART.prototype.initialize = function()
{
	this.isInit = false;
	this.isActive = false;
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
// #region - ACCOUNT
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Logout
//------------------------------------------------------------------------
HIMS.prototype.logout = async function()
{
	$seTerminal = new SE_TERMINAL()
	await SE_CLI.logout()
	window.location.href = path.resolve(process.cwd(), "index.html")
	SE_CLI.resetTUI()
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
// #region - BOOT
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Handoff
//------------------------------------------------------------------------
MAGPIE.HANDLER.handoff = function()
{
	SE_CLI.session = SE_CLI.HANDOFF.manager.importState()
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Init
//------------------------------------------------------------------------
/**
 * @todo initHandler
 * @returns {Boolean}
 */
MAGPIE.HANDLER.isInit = function initHandler()
{
	return false
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > consoleGO
//------------------------------------------------------------------------
MAGPIE.HANDLER._console_data = HIMS.data;
/**
 * 
 * @returns {Boolean}
 */
HIMS.data = function()
{
	console.info("Data...")
	$SHELGEO = new SHELGEO()
	$SHELSTORY = new SHELSTORY()
	$seEmote = new SE_EMOTE()
	$seClock = new SE_CLOCK()
	$seTerminal = new SE_TERMINAL()
	$seHUD = new SE_HUD()
	$seMenu = new SE_MENU()
	$seArt = new SE_ART()
	const systems = [
		MAGPIE.HANDLER._console_data.call(this),
		HIMS.consoleGO("File system", MAGPIE.HANDLER.IO.init()),
		HIMS.consoleGO("Updater", MAGPIE.HANDLER.IO.isUpdated()),
		HIMS.consoleGO("SocketInit", MAGPIE.HANDLER.SOCKET.init())
	]
	const status = HIMS.systemsCheck(systems)
	return status
}
MAGPIE.HANDLER._console_systems = HIMS.systems;
HIMS.systems = function()
{
	console.info("Systems...");
	const systems = [
		HIMS.consoleGO("Core", MAGPIE.HANDLER.isInit()),
		HIMS.consoleGO("Console", $seTerminal?.isInit),
		HIMS.consoleGO("Calendar", $seCalendar?.isInit),
		HIMS.consoleGO("Metastate", $metastate?.isInit),
		HIMS.consoleGO("Geography", $SHELGEO?.isInit),
		HIMS.consoleGO("History", $SHELSTORY?.isInit),
		HIMS.consoleGO("PDL", HIMS.PDL()),
		HIMS.consoleGO("CBE", HIMS.CBE()),
		HIMS.consoleGO("BattleCore", HIMS.battleCore()),
		HIMS.consoleGO("MetaCore", HIMS.metaCore()),
		HIMS.consoleGO("Emote", $seEmote?.isInit),
		HIMS.consoleGO("Metabrain", HIMS.metabrain()),
		HIMS.consoleGO("Scene", HIMS.scenes())
	]
	const status = HIMS.systemsCheck(systems)
	return MAGPIE.HANDLER._console_systems.call(this, status)
}
MAGPIE.HANDLER._console_UI = HIMS.UI;
HIMS.UI = function()
{
	console.info("UI...")
	const systems = [
		HIMS.consoleGO("Clock", $seClock?.isInit),
		HIMS.consoleGO("Terminal", $seTerminal?.isInit),
		HIMS.consoleGO("HUD", $seHUD?.isInit),
		HIMS.consoleGO("Menu", $seMenu?.isInit),
		HIMS.consoleGO("Art", false)
	]
	const status = HIMS.systemsCheck(systems)
	return MAGPIE.HANDLER._console_UI.call(this, status)
}
/** @type {SHELGEO} */
var $SHELGEO = null
/** @type {SHELSTORY} */
var $SHELSTORY = null
/** @type {SE_EMOTE} */
var $seEmote = null
/** @type {SE_CLOCK} */
var $seClock = null
/** @type {SE_TERMINAL} */
var $seTerminal = null
/** @type {MAGPIE_CALENDAR} */
var $seCalendar = null
/** @type {SE_HUD} */
var $seHUD = null
/** @type {SE_MENU} */
var $seMenu = null
/** @type {SE_ART} */
var $seArt = null
// MAGPIE.HANDLER._createSave = DataManager.createGameObjects
// DataManager.createGameObjects = function()
// {
// 	MAGPIE.HANDLER._createSave.call(this)
// 	$SHELGEO = new SHELGEO()
// 	$SHELSTORY = new SHELSTORY()
// 	$seEmote = new SE_EMOTE()
// 	$seClock = new SE_CLOCK()
// 	$seTerminal = new SE_TERMINAL()
// 	$seHUD = new SE_HUD()
// 	$seMenu = new SE_MENU()
// 	$seArt = new SE_ART()
// }
// MAGPIE.HANDLER._makeSave = DataManager.makeSaveContents
// DataManager.makeSaveContents = function()
// {
// 	const contents = MAGPIE.HANDLER._makeSave.call(this)
// 	contents.handlers = {
// 		$SHELGEO,
// 		$SHELSTORY,
// 		$seEmote,
// 		$seClock,
// 		$seTerminal,
// 		$seHUD,
// 		$seMenu,
// 		$seArt
// 	}
// }
// MAGPIE.HANDLER._loadSave = DataManager.extractSaveContents
// DataManager.extractSaveContents = function(contents)
// {
// 	MAGPIE.HANDLER._loadSave.call(this, contents)
// 	const handlers = contents.handlers
// 	$SHELGEO = handlers.$SHELGEO
// 	$SHELSTORY = handlers.$SHELSTORY
// 	$seEmote = handlers.$seEmote
// 	$seClock = handlers.$seClock
// 	$seTerminal = handlers.$seTerminal
// 	$seHUD = handlers.$seHUD
// 	$seMenu = handlers.$seMenu
// 	$seArt = handlers.$seArt
// }
MAGPIE.HANDLER._console_settings = HIMS.prototype.settings;
HIMS.prototype.settings = function()
{
	console.info("Settings...");
	const CGMZ_gameinfo = MAGPIE.addons?.Casper?.GameInfo?.isInit;
	const systems = [
		this.consoleGO("Handlers", false),
		this.consoleGO("Terminal", false),
		this.consoleGO("UI", false),
		this.consoleGO("Audio", false),
		this.consoleGO("Graphics", false),
		this.consoleGO("Gameplay", false),
		this.consoleGO("CGMZ_gameinfo", CGMZ_gameinfo)
	]
	const status = this.systemsCheck(systems)
	return status
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
 * back to {@link MAGPIE.HANDLER.meta}
 * 
 */
//========================================================================
// END OF FILE
//========================================================================