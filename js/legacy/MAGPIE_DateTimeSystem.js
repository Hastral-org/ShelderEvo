//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_S] v0.6.0 MAGPIE_DateTimeSystem
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-datetimesystem
 * 
 * @help
 * (MAGPIE) DATE AND TIME SYSTEM (Standalone)
 * This plugin introduces a customizable calendar with date keeping and a
 * customizable day cycle with a clock window for time keeping
 * 
 * ----------------------------------------------------------------------------
 * FEATURES
 * ----------------------------------------------------------------------------
 * - custom calendar enables you to create your own calendar with any number of
 *   named months, and a leap system
 * 
 * - date keeping allows for the use of your custom calendar in events and
 *   is compatible with the MAGPIE plugin suite 
 * 
 * - define and trigger holidays with the expansion MAGPIE_holidays
 * 
 * - day-cycle with customizable day length, and phases (only the scaffolding
 *   is provided - you can add your own graphics on top)
 * 
 * - seasons and seasonal changes in day length (comaptible with 
 *   MAGPIE_Weather)
 * 
 * - a customizable clock window
 * 
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * ----------------------------------------------------------------------------
 * This plugin can be used in both FREE and COMMERCIAL projects as long as
 * these terms of use and author credits are preserved and stated in the
 * project. You may edit this plugin within your project as long as this
 * meta header section is preserved.
 * 
 * Redistribution or modification of this plugin without the author's 
 * approval is not allowed. 
 * 
 * 
 * ----------------------------------------------------------------------------
 * HOW TO USE
 * ----------------------------------------------------------------------------
 * 
 * 1. setup the parameters
 * 
 * 2. add a plugin command to set the calendar at the beginning of the game,
 *    or anywhere you want the calendar to start
 * 
 * 3. the clock can be toggled ON/OFF with the isTIME switch
 * 
 * 4. if both PHASE and DIGITAL switches are OFF, the clock window will hide
 * 
 * 5. you can set as many calendars as you want as long as you select one with
 *    the set calendar command
 * 
 * 6. reach out on itch.io for questions and suggestions and stay tuned for a 
 *    more in-depth guide in future versions
 * 
 * 7. ENJOY! :)
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.6.0 2025 11 14
 * - added: Time compression replaces default TICK time of 60 as a variable
 * settings that can be set to preference
 * 
 * v0.5.0 2025 11 13
 * - added: Timescale can be set anytime, even during gameplay, persistently
 * 
 * v0.4.1 2025 10 30
 * - fixed MAGPIE_Date initialization inaccuracies
 * - added MAGPIE_Log compatibility
 * 
 * v0.4.0 2025 09 01
 * - ADDED: custom date prototype
 * 
 * v0.3.2 2025 08 24
 * - v0.1.0 MAGPIE_History conformity update
 * 
 * v0.3.1 2025 08 15
 * - bugfixes: display options, calendar method for leapYear and daysLeap
 * - added  weekDay and weekdayName methods that were missing
 * 
 * v0.3.0 2025 08 13
 * - extrapolation from ShelderEvo_Core to standalone plugin initial build
 * 
 * ----------------------------------------------------------------------------
 * 
 * @command setCalendar
 * @text Set calendar
 * @desc Set a specified calendar
 * 
 * @arg calendar
 * @text Calendar
 * @desc enter the name of the calendar
 * 
 * @arg day
 * @desc enter the number of the desired day of the month
 * 
 * @arg month
 * @desc enter the number of the desired month of the year
 * 
 * @arg year
 * @desc enter the current year
 * 
 * @arg hour
 * @desc enter the desired hour to begin (optional)
 * 
 * @arg minute
 * @desc enter the desired minute (optional)
 * 
 * @arg epoch
 * @desc enter the absolute number of years since the beginning of time (optional)
 * 
 * @param settings
 * @text Calendar settings
 * 
 * 
 * @param timescale
 * @parent settings
 * @text Time scale
 * @desc How many game seconds in a real second
 * @number 
 * @default 60
 * 
 * @param compression
 * @parent settings
 * @text Time compression
 * @desc How many frames it takes to "tick" the clock
 * @number
 * @default 60
 * 
 * @param calendars
 * @parent settings
 * @text Calendars
 * @desc List of custom calendars to choose from
 * @type struct<calendars>[]
 * 
 * @param calendar
 * @parent settings
 * @text Calendar name
 * @desc Variable to store the name of the current calendar
 * @type variable
 * 
 * @param days
 * @parent settings
 * @text Days amount
 * @desc Variable to store the number of days in current month
 * @type variable
 * 
 * @param months
 * @parent settings
 * @text Months amount
 * @desc Variable to store the number of months in a year
 * @type variable
 * 
 * @param leapYear
 * @parent settings
 * @text Leap Year info
 * @desc Variable to store the leap year info
 * @type variable
 * 
 * @param leapMonth
 * @parent settings
 * @text Leap Month info
 * @desc Variable to store the leap month info
 * @type variable
 * 
 * @param gameday
 * @parent settings
 * @text Current Gameday
 * @desc Gameday starts at new game (like playtime)
 * @type variable
 *  
 * @param epoch
 * @parent settings
 * @text Current epoch
 * @desc Epoch is the absolute time since an arbitrarily decided start
 * @type variable 
 * 
 * @param yearday
 * @parent settings
 * @text Yearday
 * @desc Variable to store the current day in the year
 * @type variable
 * 
 * @param second
 * @parent settings
 * @text Second
 * @desc Variable to store the current second
 * @type variable
 * 
 * @param minute
 * @parent settings
 * @text Minute
 * @desc Variable to store the current minute
 * @type variable
 * 
 * @param hour
 * @parent settings
 * @text Hour
 * @desc Variable to store the current hour
 * @type variable
 * 
 * @param day
 * @parent settings
 * @text Day
 * @desc Variable to store the current day in the month
 * @type variable
 * 
 * @param month
 * @parent settings
 * @text Month
 * @desc Variable to store the current month in the year
 * @type variable
 * 
 * @param year
 * @parent settings
 * @text Year
 * @desc Variable to store the current year since the year 0
 * @type variable
 * 
 * @param dayPhase
 * @parent settings
 * @text Day phase
 * @desc Variable to store the current phase of day
 * @type variable
 * 
 * @param leapCounter
 * @parent settings
 * @text Leap counter
 * @desc Variable to store the current leap amount
 * @type variable
 * 
 * @param season 
 * @parent settings
 * @text Season
 * @desc Variable to store the current season
 * @type variable
 * 
 * @param dayName 
 * @parent settings
 * @text Day name
 * @desc Variable to store the name of the current day
 * @type variable
 * 
 * @param monthName
 * @parent settings
 * @text Month name
 * @desc Variable to store the name of the current month
 * @type variable
 * 
 * @param sunrise 
 * @parent settings
 * @text Sunrise
 * @desc Variable to store the current sunrise time
 * @type variable
 * 
 * @param sunset 
 * @parent settings
 * @text Sunset
 * @desc Variable to store the current sunset time
 * @type variable
 * 
 * @param seasonalDelay
 * @parent settings
 * @text Seasonal delay
 * @desc Variable to store the amount of days delay that seasons take to change
 * @type number
 * @default 15
 * 
 * @param isLeapMonth
 * @parent settings 
 * @text Leap month switch
 * @desc Switch triggered upon the leap month in a leap year
 * @type switch
 * 
 * @param isLeapYear
 * @parent settings 
 * @text Leap year switch
 * @desc Switch triggered upon the leap year
 * @type switch
 * 
 * @param isSeasonChange
 * @parent settings
 * @text Season change switch
 * @desc Switch triggered upon a new season
 * @type switch
 * 
 * @param SuperTICK
 * @parent settings
 * @text SuperTICK switch
 * @desc Switch triggered every real minute of gametime
 * @type switch
 * 
 * @param MegaTICK
 * @parent settings
 * @text MegaTICK switch
 * @desc Switch triggered every real hour of gametime
 * @type switch
 * 
 * @param dayCycle
 * @parent settings
 * @text Day cycle toggle
 * @desc Switch used to toggle day cycle ON and OFF (useful for space settings)
 * @type switch 
 * 
 * @param dawn
 * @parent settings
 * @text Dawn switch
 * @desc Switch used to trigger Dawn phase (sunrise)
 * @type switch
 * 
 * @param am
 * @parent settings
 * @text Morning switch
 * @desc Switch used to trigger Morning phase (AM)
 * @type switch
 * 
 * @param noon
 * @parent settings
 * @text Noon switch
 * @desc Switch used to trigger Noon phase
 * @type switch
 * 
 * @param pm
 * @parent settings
 * @text Afternoon switch
 * @desc Switch used to trigger Afternoon phase (PM)
 * @type switch
 * 
 * @param dusk
 * @parent settings
 * @text Dusk switch
 * @desc Switch used to trigger Dusk phase (sunset)
 * @type switch
 * 
 * @param night
 * @parent settings
 * @text Night switch
 * @desc Switch used to trigger Night phase
 * @type switch
 * 
 * @param isTime
 * @parent settings
 * @text Time toggle
 * @desc Switch used to toggle Time keeping ON and OFF
 * @type switch
 * 
 * @param clock
 * @text Clock settings
 * 
 * @param clockWin
 * @parent clock
 * @text Clock window settings
 * @desc Settings for the clock window
 * @type struct<clock>
 * 
 */

/*~struct~calendars:
 * 
 * @param name
 * @text Calendar name
 * @desc The name this calendar will be referenced by the game and characters
 * @type text
 * @default calendar
 * 
 * @param months
 * @text Months
 * @desc Enter the months in a year
 * @type struct<months>[]
 * 
 * @param leapMonth
 * @text Leap month
 * @desc The number of the leap month (when an extra day is added)
 * @type number
 * @default 2
 * 
 * @param leapYear
 * @text Leap year
 * @desc The interval in years between each leap year (when a leap month occurs)
 * @type number
 * @default 4
 * 
 * @param week
 * @text Week
 * @desc Enter the days in a typical week
 * @type text[]
 * 
 * @param leapDay
 * @text Leap day is extra-week
 * @desc Leap day is an extra day of the week
 * @type boolean
 * @default false
 * 
 * @param leapDayName
 * @text Leap day name
 * @desc Type the name of the leap day (if the previous parameter is ON)
 * @type text
 * 
 * @param leapDayFormula
 * @text Leap day formula
 * @desc Type the expression to evaluate when to include the leap day
 * @type note
 * 
 * @param dayLength
 * @text Day length
 * @desc The length of the typical day in hours
 * @type number
 * @default 24
 * 
 */

/*~struct~months:
 * 
 * @param monthName
 * @text Month name
 * @desc The name of this month (as referred to by the game and characters)
 * @type text
 * @default Month1
 * 
 * @param days
 * @text Amount of days
 * @desc The amount of days in this month
 * @type number
 * @default 30
 * 
 */

/*~struct~clock:
 * 
 * @param x
 * @text Window X position
 * @desc Enter a X coordinate to anchor the window (expressions allowed)
 * @type combo
 * @option Graphics.boxWidth
 * 
 * @param y
 * @text Window Y position
 * @desc Enter a Y coordinate to anchor the window (expressions allowed)
 * @type combo
 * @option Graphics.boxHeight
 * 
 * @param w
 * @text Window width
 * @desc Either enter a desired width or a default width will be automatically calculated
 * @type text
 * 
 * @param icons
 * @text Icon settings
 * @type struct<icons>
 * 
 * @param digital
 * @text Digital switch
 * @desc Switch used to toggle the digital display
 * @type switch
 * 
 * @param phase
 * @text Phases switch
 * @desc Switch used to toggle the day phases display
 * @type switch
 * 
 * @param date
 * @text Date switch
 * @desc Switch used to toggle the full date display
 * @type switch
 * 
 * @param dateIcon
 * @text Date icon
 * @desc Icon index used for the date display
 * @type number
 * 
 */

/*~struct~icons:
 * 
 * @param time 
 * @text Time digits
 * 
 * @param day
 * @text Day phases
 * 
 * @param zero
 * @parent time
 * @text 0 digit
 * @type number
 * 
 * @param one
 * @parent time
 * @text 1 digit
 * @type number
 * 
 * @param two
 * @parent time
 * @text 2 digit
 * @type number
 * 
 * @param three
 * @parent time
 * @text 3 digit
 * @type number
 * 
 * @param four
 * @parent time
 * @text 4 digit
 * @type number
 * 
 * @param five
 * @parent time
 * @text 5 digit
 * @type number
 * 
 * @param six
 * @parent time
 * @text 6 digit
 * @type number
 * 
 * @param seven
 * @parent time
 * @text 7 digit
 * @type number
 * 
 * @param eight
 * @parent time
 * @text 8 digit
 * @type number
 * 
 * @param nine
 * @parent time
 * @text 9 digit
 * @type number
 * 
 * @param separator
 * @parent time
 * @text : digit
 * @type number
 * 
 * @param space
 * @parent time
 * @text [blank] digit
 * @type number
 * 
 * @param dawn
 * @parent day
 * @text Dawn (sunrise)
 * @type number
 * 
 * @param am
 * @parent day
 * @text Morning (AM)
 * @type number
 * 
 * @param noon
 * @parent day
 * @text Noon (sun in zenith)
 * @type number
 * 
 * @param pm
 * @parent day
 * @text Afternoon (PM)
 * @type number
 * 
 * @param dusk
 * @parent day
 * @text Dusk (sunset)
 * @type number
 * 
 * @param night
 * @parent day
 * @text Night
 * @type number
 * 
 */


//#endregion






//------------------------------------------------------------------------
//#region INDEX
var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.11.2";
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.DateTime = {};
MAGPIE.addons.DateTime.version = "0.6.0";
MAGPIE.addons.DateTime.pluginName = "MAGPIE_DateTimeSystem";
MAGPIE.addons.DateTime.url = "https://matheraptor.itch.io/magpie-datetimesystem";
MAGPIE.addons.DateTime.parameters = PluginManager
	.parameters(MAGPIE.addons.DateTime.pluginName);

const MAGTIME = {};
MAGTIME.meta = {
	isTime: true,
	name: "M.A.G.P.I.E. Date & Time System",
	firmware: "20251114",
	firmwareFile: `${MAGPIE.addons.DateTime.pluginName}.js`
};
MAGTIME.TIMESCALE = Number(MAGPIE.addons.DateTime.parameters.timescale) || 60;
MAGTIME.DAYS = Number(MAGPIE.addons.DateTime.parameters.days);
MAGTIME.MONTHS = Number(MAGPIE.addons.DateTime.parametersmonths);
MAGTIME.LEAP_YEAR = Number(MAGPIE.addons.DateTime.parameters.leapYear);
MAGTIME.LEAP_MONTH = Number(MAGPIE.addons.DateTime.parameters.leapMonth);
MAGTIME.GAMEDAY = Number(MAGPIE.addons.DateTime.parameters.gameday);
MAGTIME.EPOCH = Number(MAGPIE.addons.DateTime.parameters.epoch);
MAGTIME.YEARDAY = Number(MAGPIE.addons.DateTime.parameters.yearday);
MAGTIME.SECOND = Number(MAGPIE.addons.DateTime.parameters.second);
MAGTIME.MINUTE = Number(MAGPIE.addons.DateTime.parameters.minute);
MAGTIME.HOUR = Number(MAGPIE.addons.DateTime.parameters.hour);
MAGTIME.DAY = Number(MAGPIE.addons.DateTime.parameters.day);
MAGTIME.MONTH = Number(MAGPIE.addons.DateTime.parameters.month);
MAGTIME.YEAR = Number(MAGPIE.addons.DateTime.parameters.year);
MAGTIME.DAY_PHASE = Number(MAGPIE.addons.DateTime.parameters.dayPhase);
MAGTIME.LEAP_COUNTER = Number(MAGPIE.addons.DateTime.parameters.leapCounter);
MAGTIME.SEASON = Number(MAGPIE.addons.DateTime.parameters.season);
MAGTIME.DAY_NAME = Number(MAGPIE.addons.DateTime.parameters.dayName);
MAGTIME.MONTH_NAME = Number(MAGPIE.addons.DateTime.parameters.monthName);
MAGTIME.SUNRISE = Number(MAGPIE.addons.DateTime.parameters.sunrise);
MAGTIME.SUNSET = Number(MAGPIE.addons.DateTime.parameters.sunset);
MAGTIME.SEASONAL_DELAY = Number(MAGPIE.addons.DateTime.parameters.seasonalDelay);
MAGTIME.IS_LEAP_MONTH = Number(MAGPIE.addons.DateTime.parameters.isLeapMonth);
MAGTIME.IS_LEAP_YEAR = Number(MAGPIE.addons.DateTime.parameters.isLeapYear);
MAGTIME.IS_NEW_DAY = Number(MAGPIE.addons.DateTime.parameters.newDay);
MAGTIME.IS_NEW_MONTH = Number(MAGPIE.addons.DateTime.parameters.isNewMonth);
MAGTIME.IS_NEW_YEAR = Number(MAGPIE.addons.DateTime.parameters.isNewYear);
MAGTIME.IS_SEASON_CHANGE = Number(MAGPIE.addons.DateTime.parameters.isSeasonChange);
MAGTIME.TICK = {};
MAGTIME.TICK.SUPER = Number(MAGPIE.addons.DateTime.parameters.SuperTICK);
MAGTIME.TICK.MEGA = Number(MAGPIE.addons.DateTime.parameters.MegaTICK);
MAGTIME.DAYCYCLE = Number(MAGPIE.addons.DateTime.parameters.dayCycle);
MAGTIME.PHASE = {};
MAGTIME.PHASE.DAWN = Number(MAGPIE.addons.DateTime.parameters.dawn);
MAGTIME.PHASE.AM = Number(MAGPIE.addons.DateTime.parameters.am);
MAGTIME.PHASE.NOON = Number(MAGPIE.addons.DateTime.parameters.noon);
MAGTIME.PHASE.PM = Number(MAGPIE.addons.DateTime.parameters.pm);
MAGTIME.PHASE.DUSK = Number(MAGPIE.addons.DateTime.parameters.dusk);
MAGTIME.PHASE.NIGHT = Number(MAGPIE.addons.DateTime.parameters.night);
MAGTIME.PHASE.ALL = Object.values(MAGTIME.PHASE);
MAGTIME.IS_TIME = Number(MAGPIE.addons.DateTime.parameters.isTime);
MAGTIME.CALENDAR = Number(MAGPIE.addons.DateTime.parameters.calendar);
MAGTIME.COMPRESSION = Number(MAGPIE.addons.DateTime.parameters.compression) || 60;
var $TIME = null;
//#endregion





//------------------------------------------------------------------------
//#region Calendar





//#region setup
function Game_Calendar(data)
{
	this.initialize(data);
}

Game_Calendar.prototype.initialize = function(data)
{
	this.name = data.name;
	this._index = data.index;
	this.months = data.months;
	this.week = data.week;
	this.dayLength = data.dayLength;
	this.leapMonth = data.leapMonth;
	this.leapYear = data.leapYear;
	this.format = data?.format || {
		full: "${this.year} ${this.month} ${this.day} ${this.dayName}" +
			" ${this.hour}:${this.minute}:${this.second} ${this.TZ}",
		long: "${this.year} ${this.month} ${this.day}" +
			" ${this.hour}:${this.minute}:${this.second} ${this.TZ}",
		standard: "${this.year} ${this.month} ${this.day}" +
			" ${this.hour}:${this.minute} ${this.TZ}",
		short: "${this.year}/${this.month$}/${this.day}",
		operational: "${this.year}${this.month}${this.day}"
	};
	if(data.leapDay) 
	{
		this.leapDay = data.leapDay;
		this.leapDayName = data.leapDayName;
		this.leapDayFormula = JSON.parse(data.leapDayFormula);
	}
	this.compression = MAGTIME.COMPRESSION;
}

MAGTIME.parseCalendars = function(calendars = [])
{
	let calendarPool = JSON.parse(calendars);
	let calendarList = [];
	for(let i = 0; i < calendarPool.length; i++)
	{
		calendarList.push(MAGTIME.parseCalendar(calendarPool[i], i));
	}
	return calendarList
}

MAGTIME.parseCalendar = function(calendar, index)
{
	let build = JSON.parse(calendar);
	let buildMonths = JSON.parse(build.months);
	let months = [];
	for(let i = 0; i < buildMonths.length; i++)
	{
		months.push(JSON.parse(buildMonths[i]));
		months[i].days = Number(months[i].days);
	};
	let week = JSON.parse(build.week);
	let data = {
		name: build.name,
		index: index, 
		months: months, 
		week: week, 
		dayLength: Number(build.dayLength),
		leapMonth: Number(build.leapMonth), 
		leapYear: Number(build.leapYear),
		leapDay: eval(build.leapDay),
		leapDayName: build.leapDayName,
		leapDayFormula: build.leapDayFormula
	}
	let parsedCalendar = new Game_Calendar(data);
	return parsedCalendar
}

MAGTIME.calendars = MAGTIME
	.parseCalendars(MAGPIE.addons.DateTime.parameters.calendars);
//#endregion







//------------------------------------------------------------------------
//#region DATE
MAGTIME.DATE = {};
MAGTIME.DATE.TEMPLATE = {
	year: 0,
	month: 0,
	day: 0,
	hour: 0,
	minute: 0,
	second: 0,
	gameday: 0
}
function MAGPIE_Date(data = {})
{
	this.initialize(data);
}
MAGPIE_Date.prototype.initialize = function(data)
{
	this.calendar = data?.calendar || $TIME?.index();
	this.gameday = data?.gameday || 0;
	this.year = data?.year || 0;
	this.month = data?.month || 0;
	this.day = data?.day || 0;
	this.hour = data?.hour || 0;
	this.minute = data?.minute || 0;
	this.second = data?.second || 0;
	this.dayName = data?.dayName;
	this.TZ = data?.TZ || 0;
	this.setupTZ();
	if(Object.keys(data).length < 1)
	{
		this.year = $TIME.year;
		this.month = $TIME.month;
		this.day = $TIME.day;
		this.hour = $TIME.hour;
		this.minute = $TIME.minute;
		this.second = $TIME.second;
	};
	if(!isNaN(this.gameday)) this.gamedayDate();
		else this.setupGameday();
	if(!this.dayName)
		this.dayName = $TIME.weekdayName($TIME.yearday({
			month: this.month, 
			day: this.day}))
}

MAGPIE_Date.prototype.setupTZ = function()
{
	this.TZ = undefined;
}

MAGPIE_Date.prototype.toString = function()
{
	let date = "";
	date += `${this.year}`;
	date += `/${this.month.toString().padStart(2,0)}`;
	date += `/${this.day.toString().padStart(2,0)}`;
	date += ` ${this.dayName}`; 
	date += ` ${this.hour.toString().padStart(2,0)}`;
	date += `:${this.minute.toString().padStart(2,0)}`;
	if(this.TZ) date += `${this.TZ}`;
	return date 
}

MAGPIE_Date.prototype.gamedayDate = function()
{
	const rawYears = this.gameday / $TIME.accurateYear();
	this.year = Math.floor(rawYears);
	const yearday = (rawYears % 1) * $TIME.accurateYear();
	this.month = $TIME.yeardayToMonth(Math.ceil(yearday));
	this.day = Math.floor(yearday) - $TIME.dayCounter(this.month); 
	const rawTime = yearday % 1;
	const rawHour = rawTime * $TIME.dayLength;
	this.hour = Math.floor(rawHour);
	const rawMinute = rawHour % 1 * 60;
	this.minute = Math.floor(rawMinute);
	this.second = Math.floor(rawMinute % 1 * 60);
}

MAGPIE_Date.prototype.setupGameday = function()
{
	const gameday = this.accurateGameday();
	this.gameday = gameday;
	return gameday
}

MAGPIE_Date.prototype.accurateGameday = function()
{
	let gameday = 0;
	if(this.second)
		gameday += this.second / (60 * 60 * $TIME.dayLength);
	if(this.minute)
		gameday += this.minute / (60 * $TIME.dayLength);
	if(this.hour)
		gameday += this.hour / $TIME.dayLength;
	if(this.day)
		gameday += this.day;
	if(this.month)
		gameday += $TIME.dayCounter(this.month);
	if(this.year)
		gameday *= $TIME.accurateYear();
	return gameday
}

MAGPIE_Date.prototype.totalSeconds = function(gameday = this.gameday)
{
	return Math.ceil(gameday * $TIME.dayLength * 60 * 60)
}

MAGPIE_Date.prototype.printInterval = function(newDate = this)
{
	let message = "";
	if(newDate.year) 
	{
		message += `${newDate.year} year`;
		if(newDate.year && newDate.year > 1) message += "s";
		message += ", ";
	}
	if(newDate.month) 
	{
		message += `${newDate.month} month`;
		if(newDate.month && newDate.month > 1) message += "s";
		message += ", ";
	}
	if(newDate.day) 
	{
		message += `${newDate.day} day`;
		if(newDate.day && newDate.day > 1) message += "s";
		message += ", ";
	}
	if(newDate.hour) 
	{
		message += `${newDate.hour} hour`;
		if(newDate.hour && newDate.hour > 1) message += "s";
		message += ", ";
	}
	if(newDate.minute) 
	{
		message += `${newDate.minute} minute`;
		if(newDate.minute && newDate.minute > 1) message += "s";
		message += ", ";
	}
	if(newDate.second) 
	{
		message += `${newDate.second} second`;
		if(newDate.second && newDate.second > 1) message += "s";
	}
	message = message.trimEnd();
	if(message.endsWith(",", message.length - 1))
		message = message.slice(0, message.length - 1);
	return message
}

MAGPIE_Date.prototype.elapsed = function(
	date = {gameday: $TIME.accurateGameday()}
)
{
	const interval = Math.abs(this.gameday - date.gameday);
	const newDate = new MAGPIE_Date({gameday: interval});
	return this.printInterval(newDate)
}

MAGTIME.DATE._MAGPIE_Event_initialize = MAGPIE_Event.prototype.initialize;
MAGPIE_Event.prototype.initialize = function(data)
{
	MAGTIME.DATE._MAGPIE_Event_initialize.call(this, data);
	this._start = new MAGPIE_Date({gameday: this._start.gameday});
	if(this?._end)
		this._end = new MAGPIE_Date({gameday: this._end.gameday});
}

MAGPIE_Event.prototype.convertDate = function()
{
	if(this._start.constructor.name !== "MAGPIE_Date")
		this._start = new MAGPIE_Date({gameday: this._start.gameday});
	if(this?._end && this._end.constructor.name !== "MAGPIE_Date")
		this._end = new MAGPIE_Date({gameday: this._end.gameday});
}
//#endregion






//#region methods
Game_Calendar.prototype.index = function()
{
	if(!isNaN(this._index)) return this._index
	return MAGTIME.calendars.findIndex(c => c.name === this.name)
}

Game_Calendar.prototype.accurateYear = function()
{
	return this.days() + (1 / this.leapYear)
}

Game_Calendar.prototype.accurateGameday = function()
{
	return MAGPIE_Date.prototype.accurateGameday.call(this)
}

Game_Calendar.prototype.yeardayToMonth = function(yearday = -1)
{
	if(yearday < 0) yearday = this._yearday;
	let days = 0;
	for(let i = 0; i < this.months.length; i++)
	{
		days += this.months[i].days;
		if(yearday < days) return i + 1
	}
}

Game_Calendar.prototype.dayCounter = function(month = 1)
{
	let days = 0;
	for(let i = 0; i < this.months.length; i++)
	{
		if(i + 1 === month) return days
		days += this.months[i].days
	}
}

Game_Calendar.prototype.convertYearday = function(yearday = 0)
{
	if(!yearday) yearday = $TIME.yearday();
	let month = this.yeardayToMonth(yearday);
	let day = yearday - this.dayCounter(month);
	return [month, day]
}

Game_Calendar.prototype.yearday = function(date = {})
{
	let yearday = 0;
	let month = date?.month || this.month;
	let day = date?.day || this.day;
	for(let i = 1; i < month; i++)
	{
		yearday += this.months[i].days;
	}
	let isLeapYear = $gameSwitches.value(MAGTIME.IS_LEAP_YEAR);
	if(isLeapYear && month > this.leapMonth) yearday += 1;
	yearday += day;
	$gameVariables.setValue(MAGTIME.YEARDAY, yearday);
	this._yearday = yearday;
	return yearday
}

Game_Calendar.prototype.setupSeason = function()
{
	let season = this.season();
	let results = this.analemma(season);
	return results
}

Game_Calendar.prototype.analemma = function(season)
{
	let sunrise = Math.round(this.dayLength / 4);
	let sunset = Math.round(this.dayLength * 0.75);
	switch (season) {
		case "winter":
			sunrise += 2;
			sunset -= 2;
			break;
		case "spring":
		case "autumn":
			break;
		case "summer":
			sunrise -= 2;
			sunset += 2;
			break;
	}
	let analemma = {sunrise: sunrise, sunset: sunset};
	return analemma
}

Game_Calendar.prototype.days = function()
{
	let days = 0;
	this.months.forEach(m => days += m.days);
	return days
}

Game_Calendar.prototype.daysLeap = function()
{
	return Number((this.days() + (1 / this.leapYear)).toFixed(3))
}

Game_Calendar.prototype.monthName = function()
{
	let index = $gameVariables.value(MAGTIME.MONTH);
	let monthName = this.months[index].monthName;
	$gameVariables.setValue(MAGTIME.MONTH_NAME, monthName);
	return monthName
}

Game_Calendar.prototype.dayName = function()
{
	let index = this.weekDay();
	let dayName = this.week[index]
	$gameVariables.setValue(MAGTIME.DAY_NAME, dayName);
	return dayName
}

Game_Calendar.prototype.weekDay = function(yearday = 0)
{
	if(!yearday) yearday = this.yearday
	if(eval(this.leapDayFormula)) return this.week.length
	let epoch = $gameVariables.value(MAGTIME.EPOCH);
	let weekDay = Math.floor((epoch / this.daysLeap() + yearday) % this.week.length);
	return weekDay
}

Game_Calendar.prototype.weekdayName = function(yearday = 0)
{
	if(eval(this.leapDayFormula)) return this.leapDayName
	let index = this.weekDay(yearday);
	return this.week[index - 1]
}

Game_Calendar.prototype.switchSeason = function(season)
{
	$gameVariables.setValue(MAGTIME.SEASON, season)
	return season
}



Game_Calendar.prototype.season = function()
{
	let seasonalDelay = $gameVariables.value(MAGTIME.SEASONAL_DELAY);
	let yeardays = this.days();
	let seasonDays = Math.floor(yeardays / 4);
	if(this._yearday < seasonDays - seasonalDelay || this._yearday > (seasonDays * 4) - seasonalDelay)
	{
		return this.switchSeason("winter")
	}
	else if(this._yearday < (seasonDays * 2) - seasonalDelay)
	{
		return this.switchSeason("spring")
	}
	else if(this._yearday < (seasonDays * 3) - seasonalDelay)
	{
		return this.switchSeason("summer")
	}
	else
	{
		return this.switchSeason("autumn")
	}
}
//#endregion





//#region start
Game_Calendar.prototype.start = function()
{
	this.second = $gameVariables.value(MAGTIME.SECOND);
	this.minute = $gameVariables.value(MAGTIME.MINUTE);
	this.hour = $gameVariables.value(MAGTIME.HOUR);
	this.day = $gameVariables.value(MAGTIME.DAY);
	this.month = $gameVariables.value(MAGTIME.MONTH);
	this.year = $gameVariables.value(MAGTIME.YEAR);
	this.gameday = $gameVariables.value(MAGTIME.GAMEDAY);
	if(!this.gameday) this.gameday = 1;
	this._yearday = $gameVariables.value(MAGTIME.YEARDAY);
	this.epoch = $gameVariables.value(MAGTIME.EPOCH);
	let analemma = this.setupSeason();
	$gameVariables.setValue(MAGTIME.SUNRISE, analemma.sunrise);
	$gameVariables.setValue(MAGTIME.SUNSET, analemma.sunset);
	this.sunrise = $gameVariables.value(MAGTIME.SUNRISE);
	this.sunset = $gameVariables.value(MAGTIME.SUNSET);
	this.timescale = MAGTIME.TIMESCALE;
	this.isInit = true;
}
//#endregion


//#endregion





//------------------------------------------------------------------------
//#region RUNTIME






//#region system
MAGTIME._Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function()
{
	MAGTIME._Game_System_initialize.call(this);
	MAGTIME.isInit = true;
}

MAGTIME._DataManager_makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function()
{
	const contents = MAGTIME._DataManager_makeSave.call(this);
	contents.TIME = $TIME;
	return contents
}

MAGTIME._DataManager_loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents)
{
	MAGTIME._DataManager_loadSave.call(this, contents);
	$TIME = contents.TIME;
}
//#endregion






//#region MAGTIME
MAGTIME.setCalendar = function(newCalendar = "", day = 1, month = 1, 
	year = 1, hour = 1, minute = 1, epoch = 1)
{
	let calendar = MAGTIME.calendars.find(c => c.name == newCalendar);
	$TIME = calendar;
	$gameVariables.setValue(MAGTIME.CALENDAR, $TIME.name);
	$gameVariables.setValue(MAGTIME.EPOCH, epoch);
	$gameVariables.setValue(MAGTIME.DAY, day);
	$gameVariables.setValue(MAGTIME.MONTH, month);
	$gameVariables.setValue(MAGTIME.YEAR, year);
	$gameVariables.setValue(MAGTIME.HOUR, hour);
	$gameVariables.setValue(MAGTIME.MINUTE, minute);
	let leapYear = $TIME.leapYear;
	$gameVariables.setValue(MAGTIME.LEAP_YEAR, leapYear);
	let leapMonth = $TIME.leapMonth;
	$gameVariables.setValue(MAGTIME.LEAP_MONTH, leapMonth);
	let months = $TIME.months.length;
	$TIME.setupSeason();
	$gameVariables.setValue(MAGTIME.MONTHS, months);
	$gameVariables.setValue(MAGTIME.YEARDAY, $TIME.yearday());
	$gameVariables.setValue(MAGTIME.DAYS, $TIME.months[month - 1].days);
	if(MAGPIE?.addons?.History?.isInstalled)
		MAGTIME.HISTORY.start();
	$TIME.start();
	MAGTIME.message = (`Calendar set to ${$TIME.name}.`);
	console.log(MAGTIME.message);
}

/**
 * {@link MAGTIME.WINDOW.clock_update}
 * {@link MAGTIME.CLOCK.tick}
 */
// MAGTIME._SceneManager_updateFrameCount = SceneManager.updateFrameCount;
// SceneManager.updateFrameCount = function()
// {
// 	MAGTIME._SceneManager_updateFrameCount.call(this);
// 	if(!$TIME) return
// 	if(Graphics.frameCount % 60 >= 59) $TIME.tick();
// }

MAGTIME._SceneManager_updateMain = SceneManager.updateMain;
SceneManager.updateMain = function()
{
	MAGTIME._SceneManager_updateMain.call(this);
	if(!$TIME) return
	if(Graphics.frameCount % $TIME.compression >= $TIME.compression - 1) $TIME.tick()
}

//#endregion





//#region clock tick
/**
 * {@link MAGTIME._SceneManager_updateFrameCount}
 * {@link MAGTIME.WINDOW.clock_update}
 */
MAGTIME.CLOCK = {};
MAGTIME.CLOCK.tick = {isTICK: true};
Game_Calendar.prototype.tick = function()
{
	if(!this.isInit || !$gameSwitches.value(MAGTIME.IS_TIME)) return
	this.second += this.timescale;
	$gameVariables.setValue(MAGTIME.SECOND, this.second);
	if($gameSwitches.value(MAGTIME.TICK.SUPER)) 
		$gameSwitches.setValue(MAGTIME.TICK.SUPER, false);
	let clockWin = SceneManager._scene?._clockWindow;
	let dateWin = SceneManager._scene?._dateWindow;
	if(clockWin) clockWin.updateClock();
	if(dateWin) dateWin.updateDate();
	if(this.second < 60) return
	this.SuperTICK();
}

Game_Calendar.prototype.SuperTICK = function()
{
	$gameSwitches.setValue(MAGTIME.TICK.SUPER, true);
	this.second = 0;
	this.minute += 1;
	$gameVariables.setValue(MAGTIME.SECOND, this.second);
	$gameVariables.setValue(MAGTIME.MINUTE, this.minute);
	if($gameSwitches.value(MAGTIME.TICK.MEGA))
		$gameSwitches.setValue(MAGTIME.TICK.MEGA, false);
	this.dayPhase();
	if(this.minute < 60) return
	this.MegaTICK();
}

Game_Calendar.prototype.MegaTICK = function()
{
	$gameSwitches.setValue(MAGTIME.TICK.MEGA, true);
	this.hour += 1;
	this.minute = 0;
	$gameVariables.setValue(MAGTIME.MINUTE, this.minute);
	$gameVariables.setValue(MAGTIME.HOUR, this.hour);
	if(this.hour > this.dayLength / 3) 
		$gameSwitches.setValue(MAGTIME.IS_NEW_DAY, false);
	if(this.hour < this.dayLength) return
	this.newDay();
}

Game_Calendar.prototype.newDay = function()
{
	console.log("NewDay!");
	$gameSwitches.setValue(MAGTIME.IS_NEW_DAY, true);
	this.hour = 0;
	this.day += 1;
	this._yearday += 1;
	this.gameday += 1;
	$gameVariables.setValue(MAGTIME.HOUR, this.hour);
	$gameVariables.setValue(MAGTIME.DAY, this.day);
	$gameVariables.setValue(MAGTIME.YEARDAY, this._yearday);
	$gameVariables.setValue(MAGTIME.GAMEDAY, this.gameday);
	let weekdayName = this.weekdayName();
	$gameVariables.setValue(MAGTIME.DAY_NAME, weekdayName);
	this.season();
	let isLeapYear = $gameSwitches.value(MAGTIME.IS_LEAP_YEAR);
	let isLeapMonth = $gameSwitches.value(MAGTIME.IS_LEAP_MONTH);
	let days = this.months[this.month - 1].days;
	if(isLeapYear && isLeapMonth) days += 1;
	if(this.day > 1 && this.day < days)
		return $gameSwitches.setValue(MAGTIME.IS_NEW_MONTH, false)
	if(this.day > days) return this.newMonth()
}

Game_Calendar.prototype.newMonth = function()
{
	console.log("NewMonth!");
	$gameSwitches.setValue(MAGTIME.IS_NEW_MONTH, true);
	this.day = 1;
	this.month += 1;
	$gameVariables.setValue(MAGTIME.DAY, this.day);
	$gameVariables.setValue(MAGTIME.MONTH, this.month);
	let isLeapYear = $gameSwitches.value(MAGTIME.IS_LEAP_YEAR);
	if(isLeapYear && this.month === this.leapMonth)
		$gameSwitches.setValue(MAGTIME.IS_LEAP_MONTH, true);
	if(this.month > 1) $gameSwitches.setValue(MAGTIME.IS_NEW_YEAR, false);
	if(this.month > this.months.length) return this.newYear();
}

Game_Calendar.prototype.newYear = function()
{
	console.log("NewYear!");
	$gameSwitches.setValue(MAGTIME.IS_NEW_YEAR, true);
	this.month = 1;
	this.year += 1;
	this.epoch += 1;
	this._yearday = 1;
	$gameVariables.setValue(MAGTIME.MONTH, this.month);
	$gameVariables.setValue(MAGTIME.YEAR, this.year);
	$gameVariables.setValue(MAGTIME.EPOCH, this.epoch);
	$gameVariables.setValue(MAGTIME.YEARDAY, this._yearday);
	let leap = $gameVariables.value(MAGTIME.LEAP_COUNTER);
	leap++
	$gameVariables.setValue(MAGTIME.LEAP_COUNTER, leap);
	if(leap < this.leapYear) 
		return $gameSwitches.setValue(MAGTIME.IS_LEAP_YEAR, false)
	return $gameSwitches.setValue(MAGTIME.IS_LEAP_YEAR, true)
}

Game_Calendar.prototype.dayPhase = function()
{
	let time = this.hour + (this.minute / 60);
	let sunrise = this.sunrise;
	let sunset = this.sunset;
	let phase = -1;
	let length = this.dayLength;
	if(time > sunrise - 1 && time < sunrise + 1) phase = MAGTIME.PHASE.DAWN;
	if(time > sunrise && time < length * 0.45) phase = MAGTIME.PHASE.AM;
	if(time > length * 0.45 && time < length * 0.55) phase = MAGTIME.PHASE.NOON;
	if(time > length * 0.55 && time < sunset - 1) phase = MAGTIME.PHASE.PM;
	if(time > sunset - 1 && time < sunset + 1) phase = MAGTIME.PHASE.DUSK;
	if(time > sunset + 1 || time < sunrise - 1) phase = MAGTIME.PHASE.NIGHT;
	let ToD = MAGTIME.PHASE.ALL;
	ToD.filter(id => id != phase)
		.forEach(id => $gameSwitches.setValue(id, false));
	$gameSwitches.setValue(phase, true);
	let ToDname = $dataSystem.switches[phase];
	$gameVariables.setValue(MAGTIME.DAY_PHASE, ToDname)
	return ToDname
}
//#endregion
//#endregion






//------------------------------------------------------------------------
//#region Clock Window





//#region setup
MAGTIME.WINDOW = {};
MAGTIME.WINDOW.ALL = JSON.parse(MAGPIE.addons.DateTime.parameters.clockWin);
MAGTIME.WINDOW.X = MAGTIME.WINDOW.ALL.x;
MAGTIME.WINDOW.Y = MAGTIME.WINDOW.ALL.y;
MAGTIME.WINDOW.W = MAGTIME.WINDOW.ALL.w;
MAGTIME.WINDOW.DIGITS = [];
MAGTIME.WINDOW.PHASES = [];
MAGTIME.WINDOW.ICONS = Object.values(JSON.parse(MAGTIME.WINDOW.ALL.icons))
	.forEach((v, index) => {
		if(index < 13) MAGTIME.WINDOW.DIGITS.push(Number(v));
		if(index > 13) MAGTIME.WINDOW.PHASES.push(Number(v))
	});
MAGTIME.WINDOW.DIGITS.shift();
MAGTIME.WINDOW.DIGITAL_SWITCH = MAGTIME.WINDOW.ALL.digital;
MAGTIME.WINDOW.DATE_SWITCH = MAGTIME.WINDOW.ALL.date;
MAGTIME.WINDOW.DATE_ICON = MAGTIME.WINDOW.ALL.dateIcon;
MAGTIME.WINDOW.PHASE_SWITCH = MAGTIME.WINDOW.ALL.phase;
MAGTIME.WINDOW.digits = 6; //ToD + H + H + : + M + M
MAGTIME.WINDOW.padding = 24;
MAGTIME.WINDOW.icon_size = 32;

MAGTIME.getPhasesIcon = function()
{
	if($gameSwitches.value(MAGTIME.PHASE.DAWN)) return MAGTIME.WINDOW.PHASES[0]
	if($gameSwitches.value(MAGTIME.PHASE.AM)) return MAGTIME.WINDOW.PHASES[1]
	if($gameSwitches.value(MAGTIME.PHASE.NOON)) return MAGTIME.WINDOW.PHASES[2]
	if($gameSwitches.value(MAGTIME.PHASE.PM)) return MAGTIME.WINDOW.PHASES[3]
	if($gameSwitches.value(MAGTIME.PHASE.DUSK)) return MAGTIME.WINDOW.PHASES[4]
	if($gameSwitches.value(MAGTIME.PHASE.NIGHT)) return MAGTIME.WINDOW.PHASES[5]
}

MAGTIME.formatDigits = function(digits = 0)
{
	return digits.toString().padStart(2,0)
}
//#endregion






//#region Scene
MAGTIME._Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function()
{
	this.createClockWindow();
	this.createDateWindow();
	MAGTIME._Scene_Map_createAllWindows.call(this);
}

Scene_Map.prototype.createClockWindow = function()
{
	const rect = this.clockWindowRect();
	this._clockWindow = new Window_Clock(rect);
	this.addWindow(this._clockWindow);
}

Scene_Map.prototype.clockWindowRect = function()
{
	const window = MAGTIME.WINDOW.icon_size * MAGTIME.WINDOW.digits + MAGTIME.WINDOW.padding;
	const w = eval(MAGTIME.WINDOW.W) || window;
	const x = eval(MAGTIME.WINDOW.X);
	const y = eval(MAGTIME.WINDOW.Y);
	const ww = Math.min(Graphics.boxWidth, Math.max(window, w));
	const width = Math.min(Graphics.boxWidth - w, x);
	const wh = this.calcWindowHeight(1, false);
	const wy = Math.max(0, Math.min(Graphics.boxHeight - wh, y));
	const max_x = wy < 100 ? 370 : 0;
	const wx = Math.max(max_x, width);
	return new Rectangle(wx, wy, ww, wh)
}

Scene_Map.prototype.createDateWindow = function()
{
	const rect = this.dateWindowRect();
	this._dateWindow = new Window_Date(rect);
	this.addWindow(this._dateWindow);
}

Scene_Map.prototype.dateWindowRect = function()
{
	const ww = MAGTIME.WINDOW.icon_size * 12 + MAGTIME.WINDOW.padding;
	const wx = this._clockWindow.x - ww;
	const wh = this.calcWindowHeight(1, false);
	const wy = this._clockWindow.y;
	return new Rectangle(wx, wy, ww, wh)
}

MAGTIME._Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function()
{
	MAGTIME._Scene_Battle_createAllWindows.call(this);
	this.createClockWindow();
	this.createDateWindow();
}

Scene_Battle.prototype.createClockWindow = function()
{
	Scene_Map.prototype.createClockWindow.call(this);
}

Scene_Battle.prototype.createDateWindow = function()
{
	Scene_Map.prototype.createDateWindow.call(this);
}

Scene_Battle.prototype.clockWindowRect = function()
{
	return Scene_Map.prototype.clockWindowRect.call(this)
}

Scene_Battle.prototype.dateWindowRect = function()
{
	return Scene_Map.prototype.dateWindowRect.call(this)
}
//#endregion





//#region Window
/**
 * {@link MAGTIME._SceneManager_updateFrameCount}
 */
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
	this.separator = true;
	this.ToD_x = 0;
	this.hour_x = [this.ToD_x + 32, this.ToD_x + 64];
	this.separator_x = this.hour_x[1] + 32;
	this.minute_x = [this.separator_x + 32, this.separator_x + 64];
	this.digit_y = 0;
	this.ToD_y = 0;
	this.clockIcons = true;
	this.rect_x = rect.x;
	this.rect_y = rect.y;
	this.rect_w = rect.width;
	this.rect_h = rect.height;
	this.hide();
}

MAGTIME.WINDOW.clock_update = {isTICK: true};
Window_Clock.prototype.updateClock = function()
{
	this.ToDicon = MAGTIME.getPhasesIcon();
	this.hour = MAGTIME.formatDigits($TIME.hour);
	this.minute = MAGTIME.formatDigits($TIME.minute);
	let ToD = $gameSwitches.value(MAGTIME.WINDOW.PHASE_SWITCH);
	let digital = $gameSwitches.value(MAGTIME.WINDOW.DIGITAL_SWITCH);
	if(!ToD && !digital) return this.hide()
	this.show();
	this.createContents();
	this.drawPhase();
	this.digits();
}

Window_Clock.prototype.drawPhase = function()
{
	if(!$gameSwitches.value(MAGTIME.WINDOW.PHASE_SWITCH))
		return
	this.drawIcon(this.ToDicon, this.ToD_x, this.ToD_y);
}

Window_Clock.prototype.digits = function()
{
	let digital = $gameSwitches.value(MAGTIME.WINDOW.DIGITAL_SWITCH);
	if(!digital)
	{
		if(!this._phaseOnly)
		{
			this.width = MAGTIME.WINDOW.icon_size + MAGTIME.WINDOW.padding;
			this._phaseOnly = true;
		}
		return
	}
	if(this._phaseOnly)
	{
		this._phaseOnly = false;
		this.width = this.rect_w;
	}
	if(this.clockIcons) this.drawClockDigits();
	else this.writeClockDigits();
}

Window_Clock.prototype.writeClockDigits = function()
{
	this.separator = !this.separator;
	this.drawText(this.hour, this.hour_x[0], this.digit_y, 60, "left");
	if(this.separator) this.drawText(":", this.separator_x, this.digit_y, 30, "left");
	this.drawText(this.minute, this.minute_x[0], this.digit_y, 60, "left");
}

Window_Clock.prototype.drawClockDigits = function()
{
	let hour_digit_1 = MAGTIME.WINDOW.DIGITS[Number(this.hour[0])];
	let hour_digit_2 = MAGTIME.WINDOW.DIGITS[Number(this.hour[1])];
	let minute_digit_1 = MAGTIME.WINDOW.DIGITS[Number(this.minute[0])];
	let minute_digit_2 = MAGTIME.WINDOW.DIGITS[Number(this.minute[1])];
	let hour_digit_1_x = this.hour_x[0];
	let hour_digit_2_x = this.hour_x[1];
	let minute_digit_1_x = this.minute_x[0];
	let minute_digit_2_x = this.minute_x[1];
	let separator = MAGTIME.WINDOW.DIGITS[10];
	let blank = MAGTIME.WINDOW.DIGITS[11];
	this.separator = !this.separator;
	let ToD = $gameSwitches.value(MAGTIME.WINDOW.PHASE_SWITCH);
	let digital = $gameSwitches.value(MAGTIME.WINDOW.DIGITAL_SWITCH);
	if(ToD) this.drawIcon(this.ToDicon, this.ToD_x, this.ToD_y);
	if(!digital) return
	this.drawIcon(hour_digit_1, hour_digit_1_x, this.digit_y);
	this.drawIcon(hour_digit_2, hour_digit_2_x, this.digit_y);
	if(this.separator) this.drawIcon(separator, this.separator_x, this.digit_y);
	else this.drawIcon(blank, this.separator_x, this.digit_y);
	this.drawIcon(minute_digit_1, minute_digit_1_x, this.digit_y);
	this.drawIcon(minute_digit_2, minute_digit_2_x, this.digit_y);
}
//#endregion





//#region Date

function Window_Date()
{
	this.initialize.apply(this, arguments);
}
Window_Date.prototype = Object.create(Window_Base.prototype);
Window_Date.prototype.constructor = Window_Date;
Window_Date.prototype.initialize = function(rect)
{
	Window_Base.prototype.initialize.call(this, rect);
	this._index = -1;
	this.year = null;
	this.month = null;
	this.day = null;
	this.dateIcon = MAGTIME.WINDOW.DATE_ICON;
	this.dateIcon_x = 0;
	//this.year_icon = undefined;
	this.year_icon_x = this.dateIcon_x + 32;
	let yx = this.year_icon_x;
	this.year_x = [yx + 32, yx + 64, yx + (32 * 3), yx + (32 * 4)];
	//this.month_icon = undefined;
	this.month_icon_x = this.year_x[3] + 32;
	this.month_x = [this.month_icon_x + 32, this.month_icon_x + 64];
	//this.day_icon = undefined;
	this.day_icon_x = this.month_x[1] + 32;
	this.day_x = [this.day_icon_x + 32, this.day_icon_x + 64];
	this.digits_y = 0;
	this.rect_x = rect.x;
	this.rect_y = rect.y;
	this.rect_w = rect.w;
	this.rect_h = rect.h;
	this.hide();
}

Window_Date.prototype.updateDate = function()
{
	this.year = $TIME.year.toString().padStart(4,0);
	this.month = MAGTIME.formatDigits($TIME.month);
	this.day = MAGTIME.formatDigits($TIME.day);
	let date = $gameSwitches.value(MAGTIME.WINDOW.DATE_SWITCH);
	if(!date) return this.hide();
	this.show();
	this.createContents();
	let year_digit_1 = MAGTIME.WINDOW.DIGITS[Number(this.year[0])];
	let year_digit_2 = MAGTIME.WINDOW.DIGITS[Number(this.year[1])];
	let year_digit_3 = MAGTIME.WINDOW.DIGITS[Number(this.year[2])];
	let year_digit_4 = MAGTIME.WINDOW.DIGITS[Number(this.year[3])];
	let month_digit_1 = MAGTIME.WINDOW.DIGITS[Number(this.month[0])];
	let month_digit_2 = MAGTIME.WINDOW.DIGITS[Number(this.month[1])];
	let day_digit_1 = MAGTIME.WINDOW.DIGITS[Number(this.day[0])];
	let day_digit_2 = MAGTIME.WINDOW.DIGITS[Number(this.day[1])];
	this.drawIcon(this.dateIcon, this.dateIcon_x, this.digits_y);
	this.drawText("Y", this.year_icon_x, this.digits_y, 32, "center");
	this.drawIcon(year_digit_1, this.year_x[0], this.digits_y);
	this.drawIcon(year_digit_2, this.year_x[1], this.digits_y);
	this.drawIcon(year_digit_3, this.year_x[2], this.digits_y);
	this.drawIcon(year_digit_4, this.year_x[3], this.digits_y);
	this.drawText("M", this.month_icon_x, this.digits_y, 32, "center");
	this.drawIcon(month_digit_1, this.month_x[0], this.digits_y);
	this.drawIcon(month_digit_2, this.month_x[1], this.digits_y);
	this.drawText("D", this.day_icon_x, this.digits_y, 32, "center");
	this.drawIcon(day_digit_1, this.day_x[0], this.digits_y);
	this.drawIcon(day_digit_2, this.day_x[1], this.digits_y);
}
//#endregion




//------------------------------------------------------------------------
//#region PluginCommands

PluginManager.registerCommand(MAGPIE.addons.DateTime.pluginName,"setCalendar", args => {
		const arg0 = args.calendar;
		const arg1 = Number(args.day);
		const arg2 = Number(args.month);
		const arg3 = Number(args.year);
		const arg4 = Number(args.hour);
		const arg5 = Number(args.minute);
		const arg6 = Number(args.epoch) || 1;
		MAGTIME.setCalendar(arg0, arg1, arg2, arg3, arg4, arg5, arg6)
	});

//#endregion




//end of plugin