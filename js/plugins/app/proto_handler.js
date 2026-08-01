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
  firmwareDate: "20260606",
};
MAGPIE.HANDLER.LOCAL_STORAGE = {};
MAGPIE.HANDLER.METASTATE = {};
MAGPIE.HANDLER.BOOT_GUARD = {};
MAGPIE.HANDLER.IO = {};
MAGPIE.HANDLER.ENGINE_BOOT = {};
MAGPIE.HANDLER.GAME_BOOT = {};
MAGPIE.HANDLER.SOCKET = {};
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
MAGPIE.UTILITY = {};
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
MAGPIE.UTILITY.CTZ = function CTZ(date, options = {}) {
  if (!(date instanceof Date)) {
    if (Object.prototype.toString.call(date) === "[object Object]")
      options = date;
    date = new Date();
  }
  const now = date;
  const pad = (num, length = 2) => {
    return num.toString().padStart(length, 0);
  };
  let year = pad(now.getUTCFullYear(), 4);
  let month = pad(now.getUTCMonth() + 1);
  let day = pad(now.getUTCDate());
  let hour = pad(now.getUTCHours());
  let minute = pad(now.getUTCMinutes());
  let second = "";
  let millisecond = "";
  if (options?.millisecond) {
    millisecond = pad(now.getUTCMilliseconds(), 3);
    options.second = true;
  }
  if (options?.second) second = pad(now.getUTCSeconds());
  if (options?.date) {
    hour = "";
    month = "";
    day = "";
  }
  const stamp = year + month + day + hour + minute + second + millisecond;
  return stamp;
};
/**
 * @typedef {CTZ} CTZD YYYYMMDD
 * @returns {CTZD} YYYYMMDD
 */
MAGPIE.UTILITY.CTZD = function CTZD() {
  return MAGPIE.UTILITY.CTZ({ date: true });
};
/**
 * @typedef {CTZ} CTZT HHMM
 * @returns {CTZT} HHMM
 */
MAGPIE.UTILITY.CTZT = function CTZT() {
  return MAGPIE.UTILITY.CTZ({ time: true });
};
/**
 * @typedef {CTZ} CTZTS HHMMSS
 * @returns {CTZTS} HHMMSS
 */
MAGPIE.UTILITY.CTZTS = function CTZTS() {
  return MAGPIE.UTILITY.CTZ({ time: true, second: true });
};
/**
 * @typedef {CTZ} CTZF YYYYMMDDHHMMSSmmm
 * @type {CTZF} YYYYMMDDHHMMSSmmm
 */
MAGPIE.UTILITY.CTZF = function CTZF() {
  return MAGPIE.UTILITY.CTZ({ millisecond: true });
};

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
MAGPIE.UTILITY.epoch = function epoch() {
  return Date.now();
};
/**
 * @typedef {Number} epoch_real_s Date.now() in seconds
 * @returns {epoch_real_s}
 */
MAGPIE.UTILITY.now = function now() {
  const now = Math.floor(Date.now() / 1000);
  return now;
};
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
MAGPIE.UTILITY._printInterval = function _printInterval(interval) {
  const ePrefix = `[SYSTEM].printInterval: `;
  try {
    let message = "";
    const years = interval?.years;
    const months = interval?.months;
    const days = interval?.days;
    const hours = interval?.hours;
    const minutes = interval?.minutes;
    const seconds = interval?.seconds;
    if (years) message += `${years} year${years > 1 ? "s" : ""}, `;
    if (months) message += `${months} month${months > 1 ? "s" : ""}, `;
    if (days) message += `${days} day${days > 1 ? "s" : ""}, `;
    if (hours) message += `${hours} hour${hours > 1 ? "s" : ""}, `;
    if (minutes) message += `${minutes} minute${minutes > 1 ? "s" : ""}, `;
    if (seconds) message += `${seconds} second${seconds > 1 ? "s" : ""}`;
    message = message.trimEnd();
    if (message.endsWith(",", message.length - 1))
      message = message.slice(0, message.at(-1));
    return message;
  } catch (e) {
    MAGPIE.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {duration} seconds
 * @returns {time_interval}
 */
MAGPIE.UTILITY._makeInterval = function makeInterval(seconds) {
  const interval = {};
  interval.seconds = Math.round(seconds % 60);
  if (seconds < 60) return interval;
  const minute = 60 ** 2;
  interval.minutes = Math.floor(seconds % minute);
  if (seconds < minute) return interval;
  const hour = 60 ** 2 * 24;
  interval.hours = Math.floor(seconds % hour);
  if (seconds < hour) return interval;
  const month = 60 ** 2 * 24 * 30.25;
  interval.days = Math.floor(seconds % month);
  if (seconds < month) return interval;
  const year = 60 ** 2 * 24 * 30.25 * 365;
  interval.months = Math.floor(seconds % year);
  if (seconds < year) return interval;
  interval.years = Math.floor(seconds / year);
  return interval;
};
/**
 *
 * @param {duration} seconds
 * @returns {String} Estimated Time of Arrival, printed in En
 */
MAGPIE.UTILITY.printETA = function printETA(seconds) {
  const ePrefix = `[SYSTEM].printETA: `;
  try {
    const ETA_s = seconds;
    let ETA = "";
    const ETA_sec = Math.floor(ETA_s % 60);
    const ETA_min = Math.floor(ETA_s / 60) % 60;
    const ETA_hour = Math.floor(ETA_s / 3600) % 24;
    const ETA_days = Math.floor(ETA_s / (3600 * 24));
    if (ETA_days) ETA += `${ETA_days}d `;
    if (ETA_hour) ETA += `${ETA_hour}h `;
    if (ETA_min) ETA += `${ETA_min}m `;
    ETA += `${ETA_sec}s`;
    return ETA;
  } catch (e) {
    MAGPIE.error(ePrefix + e.message, e);
  }
};
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
MAGPIE.UTILITY._printETZ = function _printETZ(now, ETA = 0, options) {
  if (!(now instanceof MAGPIE_DATE)) return "n/a";
  const targetEpoch = now.epoch + ETA * 1000;
  const targetDate = new MAGPIE_DATE({
    calendar: now.calendar,
    epoch: targetEpoch,
  });
  return targetDate._printSTZ(options);
};
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
MAGPIE.UTILITY._format_num = function formatNumber(num, toFixed, sign) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: Number(toFixed) || 0,
    maximumFractionDigits: Number(toFixed) || 0,
    signDisplay: sign ? "always" : "never", // Forces +0.00000, -0.00000, +0.00005
  });
  return formatter.format(num);
};
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
MAGPIE.HANDLER.LOCAL_STORAGE.meta = "";
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
MAGPIE.HANDLER.METASTATE.meta = "";
/**
 * @todo @name SE_METASTATE
 *
 */
class SE_METASTATE {
  //
}
SE_METASTATE.initialize = function () {
  this.isInit = false;
  this.isActive = false;
  return this.isInit;
};
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
MAGPIE.HANDLER.BOOT_GUARD.meta = "";
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
MAGPIE.HANDLER.IO.meta = "";
const fs = require("fs");
const path = require("path");
/**
 *
 * @returns {Boolean}
 */
MAGPIE.HANDLER.IO.init = function initIO() {
  return Boolean(MAGPIE?.IO?.isInit);
};
/**
 *
 * @returns {Boolean}
 */
MAGPIE.HANDLER.IO.isActive = function isActive_IO() {
  return Boolean(MAGPIE?.IO?.isActive);
};
/**
 * @todo updater import state
 * @returns {Boolean}
 */
MAGPIE.HANDLER.IO.isUpdated = function isUpdated() {
  return Boolean(MAGPIE?.IO?.isUpdated);
};
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
MAGPIE.LOG = {};
MAGPIE.LOG.errors = [];
MAGPIE.LOG.time = function () {
  return `[${MAGPIE.UTILITY.CTZF()}Z] `;
};
MAGPIE.LOG.consoleTime = function () {
  return `[${MAGPIE.UTILITY.CTZ()}Z]`;
};
/**
 * @returns {String}
 */
MAGPIE.LOG.getFolderPath = function () {
  return path.resolve(process.cwd(), "logs");
};
const { Worker } = require("worker_threads");
MAGPIE.HANDLER.IO.WORKER = new Worker(
  path.resolve(process.cwd(), "js/plugins/app/handler_io.js"),
);
MAGPIE.logToWorker = function logToWorker(
  message,
  prefix = "console",
  logToConsole = false,
) {
  const ePrefix = "[LOG] ";
  try {
    const date = MAGPIE.UTILITY.CTZD();
    const logEntry = JSON.stringify({
      timestamp: MAGPIE.UTILITY.CTZ(),
      level: prefix,
      message,
      filename: `${MAGPIE.LOG.getFolderPath()}${prefix}${date}.log`,
    });
    MAGPIE.HANDLER.IO.WORKER.postMessage(logEntry);
  } catch (e) {
    MAGPIE.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {String} message
 * @param {String} prefix
 * @param {Boolean} logToConsole
 */
MAGPIE.log = function log(message, prefix = "console", logToConsole = false) {
  const ePrefix = "[LOG] ";
  // try
  // {
  // 	return MAGPIE.logToWorker(message, prefix, logToConsole)
  // }
  // catch(e)
  // {
  // 	console.error(e)
  // }
  try {
    const date = MAGPIE.UTILITY.CTZD();
    const logTime = MAGPIE.LOG.time();
    const consoleTime = `${MAGPIE.LOG.consoleTime()} `;
    const log =
      typeof message === "object" ? JSON.stringify(message, null, 2) : message;
    if (logToConsole) console.log(consoleTime + log);
    if (typeof prefix === "string") {
      const filename = `${MAGPIE.LOG.getFolderPath()}/${prefix}${date}.log`;
      const timestamp = logTime;
      const level = prefix.toUpperCase();
      fs.appendFileSync(filename, timestamp + level + log);
    }
  } catch (e) {
    console.error(e);
  }
};
MAGPIE.errorToWorker = function (message, error) {
  const ePrefix = "[ERROR] ";
  try {
    const date = MAGPIE.UTILITY.CTZD();
    const logEntry = JSON.stringify({
      timestamp: MAGPIE.UTILITY.CTZ(),
      level: "error",
      message,
      filename: `${MAGPIE.LOG.getFolderPath()}/${prefix}${date}.log`,
    });
    MAGPIE.HANDLER.IO.WORKER.postMessage(logEntry);
  } catch (e) {
    MAGPIE.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {String} message
 * @param {Error} error
 */
MAGPIE.error = function error(message, error) {
  const ePrefix = "[ERROR] ";
  // try
  // {
  // 	return MAGPIE.errorToWorker(message, error)
  // }
  // catch(e)
  // {
  // 	console.error(e)
  // }
  try {
    const log = message;
    const date = MAGPIE.UTILITY.CTZD();
    const full = `[${MAGPIE.UTILITY.CTZF()}] `;
    MAGPIE.LOG.errors.push(log);
    console.error(`[ERROR] ${message} | `, error);
    const timestamp = full;
    const filename = `${MAGPIE.LOG.getFolderPath()}/error${date}.log`;
    const logged = fs.appendFileSync(
      filename,
      full + "ERROR" + log + "\n" + error?.stack + "\n---\n",
    );
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
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
MAGPIE.HANDLER.ENGINE_BOOT.meta = "";
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
 * @todo @name SE_CALENDAR
 * @static
 * @desc handler for MAGPIE_DATE and its functions
 */
class SE_CALENDAR {
  // this.initialize(...arguments);
}
SE_CALENDAR.initialize = function () {
  this.isInit = false;
  this.isActive = false;
  this.calendarID = NaN;
};
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
 * @todo @name SHELGEO
 * @static
 * @desc handler for all geographical functions
 */
class SHELGEO {
  // this.initialize(...arguments);
}
SHELGEO.initialize = function () {
  this.isInit = false;
  this.isActive = false;
};
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
 * @todo @name SHELSTORY
 * @static
 * @desc handler for all lore sync functions
 */
class SHELSTORY {
  // this.initialize(...arguments);
}
SHELSTORY.initialize = function () {
  this.isInit = false;
  this.isActive = false;
};
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
 * @todo @name SE_EMOTE
 * @static
 * @desc handler for MAGPIE_EMOTE and its functions
 */
class SE_EMOTE {
  // this.initialize(...arguments);
}
SE_EMOTE.initialize = function () {
  this.isInit = false;
  this.isActive = false;
};
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
 * @todo @name SE_HUD
 * @static
 * @desc handler for HUD window and its function
 */
class SE_HUD {
  // this.initialize(...arguments);
}
SE_HUD.initialize = function () {
  this.isInit = false;
  this.isActive = false;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > SE_TERMINAL
//------------------------------------------------------------------------
class SE_TERMINAL {
  //
}
SE_TERMINAL.initialize = function (data) {
  this.isInit = false;
  this.isActive = false;
  return this.isInit;
};
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
  window_x: Graphics.boxWidth,
  window_y: 0,
  window_w: 0,
  switch_date: 108,
  switch_phases: 111,
  switch_digital: 112,
};
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_BLANK = 308;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_0 = 309;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_1 = 310;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_2 = 311;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_3 = 312;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_4 = 313;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_5 = 314;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_6 = 315;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_7 = 316;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_8 = 317;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_9 = 318;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DIGIT_COLON = 319;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_DAWN = 282;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_MORNING = 283;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_NOON = 284;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_AFTERNOON = 285;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_DUSH = 286;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_PHASE_NIGHT = 287;
/** @type {icon_index} */
MAGPIE.KEY.ICONS_DATE = 172;
/**
 * @static
 * @desc handler for clock window and its functions
 * @returns {new SE_CLOCK}
 */
class SE_CLOCK {
  // this.initialize(...arguments);
}
SE_CLOCK.initialize = function () {
  this.isInit = true;
  this.isActive = false;
  this.x = MAGPIE.KEY.SE_CLOCK.window_x;
  this.y = MAGPIE.KEY.SE_CLOCK.window_y;
  this.w = MAGPIE.KEY.SE_CLOCK.window_w;
  this.second = 0;
  this.minute = 0;
  this.hour = 0;
  this.day = 0;
  this.month = 0;
  this.year = 0;
  this.epoch = 0;
  this.sunrise = 6;
  this.sunset = 19;
  this.days = 0;
  this.yearday = 0;
  this.gameday = 1;
  this.calendar = 0;
  this.clockWin = {};
};
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
/**
 * @desc legacy code from [ShelderEvo_core_old.js]("../ShelderEvo_core_old.js")
 */
const SECore = {};
/**
 *
 *
 *
 */
//------------------------------------------------------------------------
//#region Clock
//------------------------------------------------------------------------
/**
 * @audit SECore.clock legacy method
 * {@link Game_Party.prototype.clock}
 */
SECore.clock = function () {
  try {
    const TIME = MAGPIE.KEY.TIME;
    //$gameParty.clock();
    SE_CLOCK.second = $gameVariables.value(MAGPIE.KEY.VARIABLES.SECOND);
    SE_CLOCK.minute = $gameVariables.value(MAGPIE.KEY.VARIABLES.MINUTE);
    SE_CLOCK.hour = $gameVariables.value(MAGPIE.KEY.VARIABLES.HOUR);
    const accelerated = SE_CLOCK.second * MAGPIE.KEY.VARIABLES.TIMESCALE;
    $gameVariables.setValue(MAGPIE.KEY.VARIABLES.SECOND, accelerated);
    //TICK
    if ($gameVariables.value(MAGPIE.KEY.VARIABLES.SECOND) < 60) return false;
    //SuperTICK
    $gameSwitches.setValue(MAGPIE.KEY.SWITCHES.SUPER_TICK, true);
    $gameVariables.setValue(MAGPIE.KEY.VARIABLES.SECOND, 0);
    $gameVariables.setValue(MAGPIE.KEY.VARIABLES.MINUTE, SE_CLOCK.minute + 1);
    $gameSwitches.setValue(MAGPIE.KEY.SWITCHES.SUPER_TICK, false);
    if ($gameVariables.value(MAGPIE.KEY.VARIABLES.MINUTE) > 1)
      $gameSwitches.setValue(MAGPIE.KEY.SWITCHES.MEGA_TICK, false);
    if ($gameVariables.value(MAGPIE.KEY.VARIABLES.MINUTE) < 60) return;
    //MegaTICK
    $gameSwitches.setValue(MAGPIE.KEY.SWITCHES.MEGA_TICK, true);
    $gameVariables.setValue(MAGPIE.KEY.VARIABLES.MINUTE, 0);
    $gameVariables.setValue(MAGPIE.KEY.VARIABLES.HOUR, SE_CLOCK.hour + 1);
    SECore.getSeasonalChanges(
      $gameVariables.value(MAGPIE.KEY.VARIABLES.SEASON),
    );
    const hour = $gameVariables.value(MAGPIE.KEY.VARIABLES.HOUR);
    const minute = $gameVariables.value(MAGPIE.KEY.VARIABLES.MINUTE);
    SECore.timeOfDay(hour, minute, SE_CLOCK.sunrise, SE_CLOCK.sunset);
    if ($gameVariables.value(MAGPIE.KEY.VARIABLES.HOUR) < 24) return false;
    //NEWDAY
    $gameVariables.setValue(MAGPIE.KEY.VARIABLES.HOUR, 0);
    $gameSwitches.setValue(MAGPIE.KEY.SWITCHES.NEWDAY, true);
    $gameVariables.setValue(MAGPIE.KEY.VARIABLES.DAY, SE_CLOCK.day + 1);
    $gameVariables.setValue(TIME.yearDay, YearDay + 1);
    $gameVariables.setValue(TIME.gameDay, GameDay + 1);
    SECore.season(YearDay, currentCalendar);
    SECore.getMonthDays();
    let Days = $gameVariables.value(MAGPIE.KEY.VARIABLES.DAYS);
    if (SE_CLOCK.day > 1 && SE_CLOCK.day < Days)
      return $gameSwitches.setValue(TIME.newMonth, false);
    else if (SE_CLOCK.day > Days) return SECore.newMonth();
    //END_OF_MONTH
    //LEAP YEAR?
    if (
      $gameSwitches.value(TIME.isLeapYear) &&
      $gameSwitches.value(TIME.isLeapMonth)
    ) {
      $gameSwitches.setValue(TIME.isLeapMonth, false);
      return;
    }

    $gameSwitches.setValue(TIME.newYearsEve, true);
  } catch (e) {
    MAGPIE.error(e.message, e);
  }
};
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
 * @audit SECore.setCalendar legacy method
 * @desc function to set Calendar
 * @param {Number} Calendar check {@link timesystem}
 * @param {Number} GameDay
 * @param {Number} SE_CLOCK.day
 * @param {Number} Month
 * @param {Number} Year
 * @param {Number} SE_CLOCK.hour
 */
SECore.setCalendar = function (
  Calendar,
  gameday = 1,
  day = 1,
  month = 1,
  year = 1,
  hour = 1,
) {
  try {
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
    SE_CLOCK.day = $gameVariables.value(TIME.day);
    Month = $gameVariables.value(TIME.month);
    Year = $gameVariables.value(TIME.year);
    SE_CLOCK.hour = $gameVariables.value(MAGPIE.KEY.VARIABLES.HOUR);
    SE_CLOCK.minute = $gameVariables.value(MAGPIE.KEY.VARIABLES.MINUTE);
    SE_CLOCK.second = $gameVariables.value(MAGPIE.KEY.VARIABLES.SECOND);
    epoch = $gameVariables.value(TIME.epoch);
    YearDay = $gameVariables.value(TIME.yearDay);
    SE_CLOCK.days = Object.values(currentCalendar)[Month + 2];
    $gameVariables.setValue(TIME.days, SE_CLOCK.days);
    MAGPIE.console.Log(`Calendar set to ${SE_CALENDAR?.name}.`);
    return SE_CALENDAR?.name;
  } catch (e) {
    MAGPIE.error(e.message, e);
  }
};
SECore.epoch = function () {
  return TIME.initialEpoch + Year;
};
SECore.yearDay = function () {
  yearDay = 0;
  for (let i = 1; i < Month; i++) {
    yearDay += Object.values(currentCalendar)[i + 2];
  }
  yearDay += SE_CLOCK.day;
  $gameVariables.setValue(TIME.yearDay, this.yearDay);
  return yearDay;
};
SECore.setupSeason = function () {
  let season = SECore.season(SECore.yearDay());
  let results = SECore.getSeasonalChanges(season);
  results.season = season;
  return results;
};
SECore.getSeasonalChanges = function (season) {
  SE_CLOCK.sunrise = 7;
  SE_CLOCK.sunset = 18;
  switch (season) {
    case "winter":
      SE_CLOCK.sunrise += 2;
      SE_CLOCK.sunset -= 2;
      break;
    case "spring":
      break;
    case "summer":
      SE_CLOCK.sunrise -= 2;
      SE_CLOCK.sunset += 2;
      break;
    case "autumn":
      break;
  }
  return { sunrise: SE_CLOCK.sunrise, sunset: SE_CLOCK.sunset };
};
SECore.switchSeason = function (seasonName, seasonID) {
  $gameVariables.setValue(MAGPIE.KEY.VARIABLES.SEASON, seasonName);
  $gameVariables.setValue(MAGPIE.KEY.VARIABLES.SEASONID, seasonID);
  return seasonName;
};
SECore.season = function (yearDay) {
  let seasonalDelay =
    $gameVariables.value(MAGPIE.KEY.VARIABLES.SEASONalDelay) || 15;
  let YearDays = currentCalendar.Days;
  let seasonDays = Math.floor(YearDays / 4);
  if (
    yearDay < seasonDays - seasonalDelay ||
    yearDay > seasonDays * 4 - seasonalDelay
  ) {
    return SECore.switchSeason("winter", 1);
  } else if (yearDay < seasonDays * 2 - seasonalDelay)
    return SECore.switchSeason("spring", 2);
  else if (yearDay < seasonDays * 3 - seasonalDelay)
    return SECore.switchSeason("summer", 3);
  else return SECore.switchSeason("autumn", 4);
};
//function to convert current month number to its name
SECore.getMonthName = function () {
  let Month = $gameVariables.value(TIME.month);
  let MonthName = Object.keys(currentCalendar)[Month + 2];
  $gameVariables.setValue(TIME.monthName, MonthName);
  return MonthName;
};
//function to get the number of days in current month
SECore.getMonthDays = function () {
  let Month = $gameVariables.value(TIME.month);
  Days = Object.values(currentCalendar)[Month];
  $gameVariables.setValue(TIME.days, Days);
  return Days;
};
// #endregion
//------------------------------------------------------------------------
//
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
 * @todo @name SE_MENU
 * @static
 * @desc handler for Menu scene additions and functions
 * @returns {new SE_MENU}
 */
class SE_MENU {
  // this.initialize(...arguments);
}
SE_MENU.initialize = function () {
  this.isInit = true;
  this.isActive = false;
};
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
 *
 * @static
 * @todo @name SE_ART
 * @desc handler for Art, images, and other graphical artifacts
 * @returns {new SE_ART}
 */
class SE_ART {
  // this.initialize(...arguments);
}
SE_ART.initialize = function () {
  this.isInit = true;
  this.isActive = false;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Throttling
//------------------------------------------------------------------------
function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
/**
 *
 * @param {Function} func
 * @param {Number} delay in ms
 * @returns
 */
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Ticket
//------------------------------------------------------------------------
/**
 *
 * @param {ticket_data} data
 * @returns {new HIMS_TICKET}
 */
function HIMS_TICKET(data) {
  this.initialize(data);
}
/**
 *
 * @param {ticket_data} data
 * @returns {new HIMS_TICKET}
 */
HIMS_TICKET.prototype.initialize = function initializeTicket(data) {
  this._firmware = "HIMS_TICKET";
  this.ID = Date.now();
  this.event = String(data?.event) || "log";
  this.payload = data?.payload || {
    code: NaN,
    event: "log",
    handleID: NaN,
    message: "",
  };
  this.arguments = data?.arguments || [];
  this.urgency = Number(data?.urgency);
  this.gravity = Number(data?.gravity);
  this.ambiguity = Number(data?.ambiguity);
};
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
HIMS.logout = async function () {
  console.log("[HIMS] [logout]...");
  localStorage.clear();
  window.location.href = "chrome-extension://" + location.host + "/index.html";
  // window.location.href = path.resolve(process.cwd(), "index.html");
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Start
//------------------------------------------------------------------------
HIMS.start = function () {
  const ePrefix = "[HIMS] [start] ";

  const slots = localStorage.getItem("playerSlots").split(",").map(Number);
  if (!slots || !Array.isArray(slots))
    return console.error(`${ePrefix}missing 'playerSlots' in localStorage`);
  if (slots.length < 1) {
    console.log(ePrefix + "no active slots; routing to 'adoption'...");
    const mapId = MAGPIE.KEY.MAPS.ADOPTION;
    const x = 0;
    const y = 0;
    const direction = 0;
    const fadeType = 0;
    return $gamePlayer.reserveTransfer(mapId, x, y, direction, fadeType);
  }
};

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Adopt
//------------------------------------------------------------------------
HIMS.onAdopt = function () {};
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
MAGPIE.HANDLER.handoff = function () {
  //@todo handoff
};
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
MAGPIE.HANDLER.isInit = function initHandler() {
  return false;
};
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
HIMS.data = function () {
  console.info("Data...");
  const systems = [
    MAGPIE.HANDLER._console_data.call(this),
    HIMS.consoleGO("File system", MAGPIE.HANDLER.IO.init()),
    HIMS.consoleGO("Updater", MAGPIE.HANDLER.IO.isUpdated()),
    HIMS.consoleGO("SocketInit", MAGPIE.HANDLER.SOCKET.init()),
  ];
  const status = HIMS.systemsCheck(systems);
  return status;
};
MAGPIE.HANDLER._console_systems = HIMS.systems;
HIMS.systems = function () {
  console.info("Systems...");
  const systems = [
    HIMS.consoleGO("Core", MAGPIE.HANDLER.isInit()),
    HIMS.consoleGO("Calendar", SE_CALENDAR.initialize()),
    HIMS.consoleGO("Metastate", SE_METASTATE.initialize()),
    HIMS.consoleGO("Geography", SHELGEO.initialize()),
    HIMS.consoleGO("History", SHELSTORY.initialize()),
    HIMS.consoleGO("PDL", HIMS.PDL()),
    HIMS.consoleGO("CBE", HIMS.CBE()),
    HIMS.consoleGO("BattleCore", HIMS.battleCore()),
    HIMS.consoleGO("MetaCore", HIMS.metaCore()),
    HIMS.consoleGO("Emote", SE_EMOTE.initialize()),
    HIMS.consoleGO("Metabrain", HIMS.metabrain()),
    HIMS.consoleGO("Scene", HIMS.scenes()),
  ];
  const status = HIMS.systemsCheck(systems);
  return MAGPIE.HANDLER._console_systems.call(this, status);
};
MAGPIE.HANDLER._console_UI = HIMS.UI;
HIMS.UI = function () {
  console.info("UI...");
  const systems = [
    HIMS.consoleGO("Clock", SE_CLOCK.initialize()),
    HIMS.consoleGO("Terminal", SE_TERMINAL.initialize()),
    HIMS.consoleGO("HUD", SE_HUD.initialize()),
    HIMS.consoleGO("Menu", SE_MENU.initialize()),
    HIMS.consoleGO("Art", false),
  ];
  const status = HIMS.systemsCheck(systems);
  return MAGPIE.HANDLER._console_UI.call(this, status);
};
MAGPIE.HANDLER._console_settings = HIMS.prototype.settings;
HIMS.prototype.settings = function () {
  console.info("Settings...");
  const CGMZ_gameinfo = MAGPIE.addons?.Casper?.GameInfo?.isInit;
  const systems = [
    this.consoleGO("Handlers", false),
    this.consoleGO("Terminal", false),
    this.consoleGO("UI", false),
    this.consoleGO("Audio", false),
    this.consoleGO("Graphics", false),
    this.consoleGO("Gameplay", false),
    this.consoleGO("CGMZ_gameinfo", CGMZ_gameinfo),
  ];
  const status = this.systemsCheck(systems);
  return status;
};
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
// #region - SOCKET
//========================================================================
/**
 * @name
 * @desc
 * @typedef {{
 * io: (String, options: {
 * auth: {},
 * transports: [],
 * secure: Boolean,
 * reconnection: Boolean
 * }),
 * on: function(String, () => {}) ,
 * once: function(String, () => {}),
 * emit: function(String, any),
 * }} Socket
 */
//------------------------------------------------------------------------
// #region > Init
//------------------------------------------------------------------------
MAGPIE.KEY.processEnv();
/** @type {Socket} */
const SE_SOCKET = io(MAGPIE.KEY.ENV.DOMAIN, {
  auth: {
    token: localStorage.getItem("jwt_token"),
  },
  transports: ["Websocket", "polling"],
  secure: MAGPIE.KEY.ENV.SECURE,
  reconnection: false,
});
SE_SOCKET.on("connect", async () => {
  window.socket = SE_SOCKET;
  const message = `[SOCKET-${SE_SOCKET.id}] connected. `;
  console.log(message);
  const isLoggedIn = localStorage.getItem("playerID");
  if (Number(isLoggedIn)) {
    const messageLoggedIn = "[SOCKET] [am_I_allowed_back_in] ";
    const playerhandle = `[PLAYER-${isLoggedIn}] `;
    console.log(`${messageLoggedIn}${playerhandle} found in localStorage. `);
    SE_SOCKET.emit("am_I_allowed_back_in", {
      playerID: isLoggedIn,
    });
  }
  SE_SOCKET.emit("request_server_keys");
  console.log("[SOCKET] [request_server_keys]...");
  // socket.emit("request_server_keys");
});
SE_SOCKET.on("server_keys", (data) => {
  console.log(
    `[SOCKET] [server_keys] received ${Object.keys(data).length}x keys. `,
  );
  SERVER.KEY = data;
});
SE_SOCKET.on("connect_error", (err) => {
  if (err.message.includes("401")) {
    console.warn("[SOCKET] [401]");
    localStorage.clear();
    MAGPIE.HANDLER.login();
  }
});
SE_SOCKET.on("disconnect", (reason) => {
  console.log(`[SOCKET] [disconnect]: ${reason}`);
  localStorage.setItem("serverStatus", MAGPIE.KEY.SERVER_OFF);
});
MAGPIE.HANDLER.SOCKET.init = function () {
  return SE_SOCKET;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Debug
//------------------------------------------------------------------------
SE_SOCKET.on("DEBUG", (data) => {
  console.log(Object.entries(data));
  MAGPIE.DATA.DEBUG = data;
});
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
SE_SOCKET.on("metastate", (data) => {
  const pad = (num, length = 2) => {
    return num.toString().padStart(length, "0");
  };
  const date = data.date;
  const year = date.year;
  const month = pad(date.month);
  const monthName = Object.keys(data.calendar.months)[date.month - 1];
  const day = pad(date.day);
  const hour = pad(date.hour);
  const minute = pad(date.minute);
  const second = pad(date.second);
  const weekDay = data.weekDayName;
  SE_TIME.metastate = `📅︎ [CALENDAR-${data?.calendarName} | ◴ ${weekDay} — ${year}/${month}/${day} — ${hour}:${minute}:${second} UTC]`;
});
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 * @typedef {import("../../../../MAGPIE_Server/src/component").ticket_data} ticket_data
 * @typedef {import("../../../../MAGPIE_Server/src/component").ticket_payload} ticket_payload
 */
//------------------------------------------------------------------------
// #region > Ticket
//------------------------------------------------------------------------

SE_SOCKET.on(
  "server_ticket",
  /**
   *
   * @param {ticket_data} ticket
   */
  (ticket) => {
    const ePrefix = `[SOCKET] [server_ticket] incoming [TICKET-${ticket.id}] `;
    console.log(ePrefix);
  },
);
/**
 *
 * @param {ticket_data} ticket_data
 * @returns
 */
HIMS.createTicket = function (ticket_data) {
  return new HIMS_TICKET(ticket_data);
};

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
