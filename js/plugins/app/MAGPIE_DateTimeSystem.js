//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [Tier_S] v0.7.3 MAGPIE_DateTimeSystem
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-datetimesystem
 * @orderAfter MAGPIE
 *
 * @help
 * (M.A.G.P.I.E.™) DATE and TIME system (Standalone plugin)
 * This plugin introduces a customizable calendar with date keeping and a
 * customizable day cycle with a clock window for time keeping.
 *
 * (if you also own 'MAGPIE.js', place this after that.)
 *
 * -----------------------------------------------------------------------
 * FEATURES
 * -----------------------------------------------------------------------
 *
 * - [x] MAGPIE_CALENDAR helps you create your own calendar with any number
 *   of named months, and a leap system
 *
 * - [x] MAGPIE_DATE keeps time for you and can be used throughout the
 *   M.A.G.P.I.E.™ plugin suite
 *
 * - [ ] MAGPIE_HOLIDAY helps you define and trigger "holy days" that you
 *   can then use within your storyline and integrate in the gameplay
 *
 * - [x] Day-cycle with customizable day length
 *
 * - [x] customizable seasons and seasonal changes (day length fluctuations)
 *
 * - [x] A customizable clock window
 *
 * - [x] dynamic and optional feedback form via Discord webhook
 *
 * - [x] bonus 'dateTimeSystem' icons
 *
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * ----------------------------------------------------------------------------
 *
 * This plugin can be used in both FREE and COMMERCIAL projects as long as
 * these terms of use and author credits are preserved and stated in the
 * project. You may edit this plugin within your project as long as this
 * meta header section is preserved.
 *
 * Redistribution or modification of this plugin without the author's
 * approval is not allowed.
 *
 * ----------------------------------------------------------------------------
 * HOW TO USE
 * ----------------------------------------------------------------------------
 *
 * 1. setup the parameters
 *
 * 2. add a plugin command to set the calendar at the beginning of the game,
 *    or anywhere you want to change the date
 *
 * 3. the clock can be toggled ON/OFF with the "isTime" switch
 *
 * 4. if both "isPhase" and "isDigital" switches are OFF, the clock window
 *    will hide
 *
 * 5. you can set as many calendars as you want; the plugin will default to
 *    calendar[0], unless you set it using the pluginCommand.
 *
 * 6. reach out on itch.io for questions and suggestions and stay tuned for a
 *    more in-depth guide in future versions
 *
 * 7. ENJOY! :)
 *
 * ----------------------------------------------------------------------------
 * GUIDE
 * ----------------------------------------------------------------------------
 *
 * You can access the calendar with plugin calls. All calendars are saved as an array to:
 * MAGPIE.KEY.CALENDARS
 *
 * The current date object is automatically created as:
 * $TIME
 *
 * You can access the current calendar being used with:
 * $TIME.getCalendar()
 *
 * You can fetch the MAGPIE_DATE variables:
 * .calendarID (the index to lookup the calendar in MAGPIE.KEY.CALENDARS)
 * .year
 * .month
 * .day
 * .hour
 * .minute
 * .second
 * .timezone (+/- hour)
 * .isMaster (true when assigned to $TIME, false when used independently)
 * .sunrise (hour.decimal, e.g. 4.5 translates to 4:30)
 * .sunset (hour.decimal)
 * .getCalendar() fetches the current calendar object
 * ._print_monthName() fetches the current month string from the calendar
 * ._print_dayName() fetches the current day of the week string from the
 *    calendar
 * ._print_dayPhase() fetches the current phase of day
 * ._print_year() prints the year number localized (e.g. 2,026)
 * ._print_month() prints the month in two digits (e.g. 04)
 * ._print_day() prints the day with the proper ordinal (e.g. 1st, 2nd, 11th)
 * ._print_time() prints HH:MM in 24h format. Use {format: true} for 12h format
 * ._print_season() prints the current season localized (e.g. "summer")
 *
 * You can fetch variables from $TIME and assign them to game variables
 * for use within dialogue. Here are some examples:
 *
 * $gameVariables.setValue(1, $TIME._print_time({format: true}));
 * (in 'ShowText') It is \V[1].
 * Will print something like "It is 12:15 PM."
 *
 * $gameVariables.setValue(2, $TIME._print_dayPhase());
 * (in 'ShowText') It is \V[1], \V[2].
 * Will print something like "It is 12:15 PM, noon."
 *
 * $gameVariables.setValue(3, $TIME._print_dayName());
 * $gameVariables.setValue(4, $TIME._print_day());
 * $gameVariables.setValue(5, $TIME._print_monthName());
 * (in 'ShowText') Our appointment is on \V[3], \V[5] \V[4], at \V[1].
 * Will print something like:
 * "Our appointment is on Monday, July 15th, at 12:15 PM"
 *
 * PLUGIN COMMANDS
 * as of 0.7.0, there are the following commands you can use:
 *
 * - setDate
 * Set all the variables for the current date in one sweep.
 * Useful to set at the beginning of a newGame, or in conjunction with
 * a time advance event, e.g. sleep.
 *
 * - setCalendar
 * edit most variables of a specified calendar
 * (future updates will include more optios)
 *
 * W.I.P. commands that might be available in future versions:
 *
 * - advanceTime
 * Advance the time by a specified amount of seconds, minutes, hours, or days
 * and let the system automatically calculate the final date.
 *
 * FEEDBACK
 *
 * Do you have any feedback or suggestions? You can comment on the
 * plugin page on itch.io
 *
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 *
 * v0.7.3 2026 07 31
 * - ADDED: date.gameday
 *
 * v0.7.2 2026 07 24
 * - ADDED: newMonthSwitch, newMonthDuration, and newYearSwitch
 * - FIXED: newDaySwitch not used in code
 * - FIXED: typo in newYearSwitch parameter
 *
 * v0.7.0 2026 07 09
 * - ADDED: full rewrite
 * - ADDED: 'MAGPIE_DATE' prototype; creates interactive date objects
 * - ADDED: timezones
 * - ADDED: bonus icons
 * - TWEAKED: cleaned up the META section
 * - TWEAKED: consolidated the namespace (all under 'MAGPIE')
 * - TWEAKED: '$TIME' is now the primary 'MAGPIE_DATE' instance
 * - TWEAKED: decomposed rmmz components from DATE triggers
 *
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
 * -------------------------------------------------------------------------
 *
 * @param settings
 * @text Plugin settings
 *
 * @param calendars
 * @parent settings
 * @text Calendars
 * @desc List of custom calendars to choose from
 * becomes "MAGPIE.addons.DateTime.CALENDARS"
 * @type struct<calendars>[]
 * @default ["{\"calendarName\":\"Gregorian\",\"calendarDesc\":\"\\\"The Gregorian calendar is the calendar used in most parts \\\\nof Terra throughout the 2nd and 3rd millennia, issued by \\\\nPope Gregory XIII in October 1582 A.D. \\\\ncit. https://en.wikipedia.org/wiki/Gregorian_calendar 2026\\\"\",\"calendarMonths\":\"[\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"January\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"31\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"February\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"28\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"true\\\\\\\"}\\\",\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"March\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"31\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"April\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"May\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"31\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"June\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"July\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"31\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"August\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"31\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"September\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"October\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"31\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"November\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"30\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"monthName\\\\\\\":\\\\\\\"December\\\\\\\",\\\\\\\"monthDays\\\\\\\":\\\\\\\"31\\\\\\\",\\\\\\\"leapMonth\\\\\\\":\\\\\\\"false\\\\\\\"}\\\"]\",\"calendarWeek\":\"[\\\"{\\\\\\\"dayName\\\\\\\":\\\\\\\"Monday\\\\\\\",\\\\\\\"isWeekStart\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"dayName\\\\\\\":\\\\\\\"Tuesday\\\\\\\",\\\\\\\"isWeekStart\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"dayName\\\\\\\":\\\\\\\"Wednesday\\\\\\\",\\\\\\\"isWeekStart\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"dayName\\\\\\\":\\\\\\\"Thursday\\\\\\\",\\\\\\\"isWeekStart\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"dayName\\\\\\\":\\\\\\\"Friday\\\\\\\",\\\\\\\"isWeekStart\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"dayName\\\\\\\":\\\\\\\"Saturday\\\\\\\",\\\\\\\"isWeekStart\\\\\\\":\\\\\\\"false\\\\\\\"}\\\",\\\"{\\\\\\\"dayName\\\\\\\":\\\\\\\"Sunday\\\\\\\",\\\\\\\"isWeekStart\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"leapYear\":\"4\",\"dayLength\":\"24\",\"seasonalChanges\":\"2\",\"summerSolstice\":\"6/21\",\"epochAbs\":\"4_500_000_000\",\"epochYear\":\"0\"}"]
 *
 * @param mandatory
 * @parent settings
 * @text Mandatory (must set)
 * @desc Set these parameters to ensure the plugin works properly,
 * and that you have access to these values in-game.
 * @type struct<mandatory>
 *
 * @param optional
 * @parent settings
 * @text Optional (can ignore)
 * @desc You can safely use this plugin without these paramets,
 * but it's better if you set them.
 * @type struct<optional>
 * @default {"timescale":"60","optionalVariable":"","dayName":"","monthName":"","sunrise":"","sunset":"","optionalSwitch":"","daySwitch":"","newDayDuration":"9","isWinter":"","isSpring":"","isSummer":"","isAutumn":"","isDawn":"","isAM":"","isNoon":"","isPM":"","isDusk":"","isNight":"","isSeasonChange":""}
 *
 * @command setDate
 * @text Set Date
 * @desc Setup the parameters for the current global Date ('$TIME')
 *
 * @arg calendarID
 * @text Calendar ID
 * @desc enter the ID of the desired calendar;
 * leave default (-1) to use current calendar.
 * @type number
 * @min -1
 * @default -1
 *
 * @arg year
 * @text Year
 * @desc enter the desired year;
 * leave default (-1) to use current year.
 * @type number
 * @min -1
 * @default -1
 *
 * @arg month
 * @text Month
 * @desc enter the desired month of the year;
 * leave default (0) to use current month.
 * @type number
 * @min 0
 * @default 0
 *
 * @arg day
 * @text Day
 * @desc enter the desired day of the month;
 * leave default (0) to use current day.
 * @type number
 * @min 0
 * @default 0
 *
 * @arg hour
 * @text Hour
 * @desc enter the desired absolute hour of the day.
 * @type number
 * @min 0
 * @default 0
 *
 * @arg minute
 * @text Minute
 * @desc enter the desired minute of the hour.
 * @type number
 * @min 0
 * @max 59
 * @default 0
 *
 * @arg timezone
 * @text Timezone
 * @desc hour deviation from the UTC (0)
 * @type number
 * @min -12
 * @max 12
 * @default 0
 *
 * @arg isMaster
 * @text Master Date
 * @desc Is this Date object the primary time-keeping date?
 * @type boolean
 * @default false
 *
 * @arg sunrise
 * @text Sunrise time
 * @desc Manually set the local time (hour) for sunrise;
 * leave default (-1) to skip
 * @type number
 * @min -1
 * @default -1
 *
 * @arg sunset
 * @text Sunset time
 * @desc Manually set the local time (hour) for sunset;
 * leave default (-1) to skip
 * @type number
 * @min -1
 * @default -1
 *
 * @arg gameday
 * @text Gameday
 * @desc Manually set the amount of days since the start of the game;
 * leave default (-1) to skip
 * @type number
 * @min -1
 * @default -1
 *
 * @command setCalendar
 * @text Set Calendar
 * @desc change the parameters of an existing calendar
 *
 * @arg calendarID
 * @text Calendar ID
 * @desc the ID of the calendar to edit
 * @type number
 * @min 0
 * @default -1
 *
 * @arg name
 * @text Calendar name
 * @desc leave blank to skip
 * @type string
 *
 * @arg desc
 * @text Calendar description
 * @desc leave blank to skip
 * @type string
 *
 * @arg days
 * @text Calendar days
 * @desc leave blank to skip
 * @type number
 * @min 0
 * @default 0
 *
 * @arg leapMonth
 * @text Calendar leap month
 * @desc the month 'index', starting from 0; leave default (-1) to skip
 * @type number
 * @min -1
 * @default -1
 *
 * @arg leapYear
 * @text Calendar leap year
 * @desc interval between leaps; leave default (-1) to skip
 * @type number
 * @min -1
 * @default -1
 *
 * @arg dayLength
 * @text Calendar length of day
 * @desc leave default (0) to skip
 * @type number
 * @min 0
 * @default 0
 *
 * @arg seasonalChanges
 * @text Seasonal changes
 * @desc leave default (-1) to skip
 * @type number
 * @min -1
 * @default -1
 *
 * @arg summerSolstice
 * @text Summer solstice
 * @desc format: Month/Day;
 * leave blank to skip
 * @type string
 *
 *
 * @arg epochAbs
 * @text Calendar absolute epoch
 * @desc total years since planet creation; leave default (0) to skip
 * @type number
 * @min 0
 * @default 0
 *
 * @arg epochYear
 * @text Calendar epoch year
 * @desc reference year for dates; leave default (-1) to skip
 * @type number
 * @min -1
 * @default -1
 *
 */

//#endregion
//========================================================================

/*~struct~mandatory:
 *
 * @param compression
 * @text Time compression
 * @desc How many game seconds in a real second
 * (can be changed in-game with plugin command)
 * @type number
 * @min 1
 * @max 60
 * @default 1
 *
 * @param intl
 * @text International settings
 * @desc Choose the default internationalization (e.g. 'en-US')
 * @type select
 * @option en-US
 * @default en-US
 *
 * @param mandatorySwitch
 * @text Mandatory switches
 *
 * @param mandatoryVariable
 * @text Mandatory variables
 *
 * @param calendarID
 * @parent mandatoryVariable
 * @text Calendar ID
 * @desc Variable to store the current calendarID
 * @type variable
 *
 * @param isTime
 * @parent mandatorySwitch
 * @text Time ON/OFF
 * @desc switch to trigger the time keeping
 * @type switch
 *
 * @param isDayCycle
 * @parent mandatorySwitch
 * @text Day cycle ON/OFF
 * @desc switch to trigger the cycling of day phases
 * @type switch
 *
 * @param isSeasonal
 * @parent mandatorySwitch
 * @text Season cycle ON/OFF
 * @desc switch to trigger the cycling of seasons
 * @type switch
 *
 * @param isLeapYear
 * @parent mandatorySwitch
 * @text Leap year
 * @desc switch to trigger the leap year
 * (the year when we add one extra day to the leap month)
 * @type switch
 *
 * @param isLeapMonth
 * @parent mandatorySwitch
 * @text Leap month
 * @desc switch to trigger the leap month
 * (the month when we add one extra day)
 * @type switch
 *
 * @param isLeapDay
 * @parent mandatorySwitch
 * @text Leap day
 * @desc switch to trigger the leap day
 * (the extra day we add to fix the year length error)
 * @type switch
 *
 * @param year
 * @parent mandatoryVariable
 * @text Year
 * @desc variable to store the current year
 * @type variable
 *
 * @param month
 * @parent mandatoryVariable
 * @text Month
 * @desc variable to store the current month
 * @type variable
 *
 * @param day
 * @parent mandatoryVariable
 * @text Day
 * @desc variable to store the current day
 * @type variable
 *
 * @param hour
 * @parent mandatoryVariable
 * @text Hour
 * @desc variable to store the current hour
 * @type variable
 *
 * @param minute
 * @parent mandatoryVariable
 * @text minute
 * @desc variable to store the current minute
 * @type variable
 *
 * @param second
 * @parent mandatoryVariable
 * @text second
 * @desc variable to store the current second
 * @type variable
 *
 *
 */

/*~struct~optional:
 *
 * @param clock
 * @text Clock window
 * @desc Settings for the clock window
 * @type struct<clockWin>
 *
 * @param date
 * @text Date window
 * @desc Settings for the date window
 * @type struct<dateWin>
 *
 * @param timescale
 * @text Timescale
 * @desc How many frames it takes to "tick" the clock
 * @type number
 * @min 1
 * @max 60
 * @default 60
 *
 * @param optionalVariable
 * @text Optional variables
 *
 * @param dayName
 * @parent optionalVariable
 * @text Day name
 * @desc Variable to store the name of the current day
 * $TIME.getCalendar().weekDays[$TIME.weekDay]
 * @type variable
 *
 * @param monthName
 * @parent optionalVariable
 * @text Month name
 * @desc Variable to store the name of the current month
 * $TIME.getCalendar().months[$TIME.month - 1].monthName
 * @type variable
 *
 * @param sunrise
 * @parent optionalVariable
 * @text Sunrise time
 * @desc Stores the current seasonal sunrise hour
 * $TIME.getSunrise()
 * @type variable
 *
 * @param sunset
 * @parent optionalVariable
 * @text Sunset time
 * @desc Stores the current seasonal sunset hour
 * $TIME.getSunset()
 * @type variable
 *
 * @param gameday
 * @parent optionalVariable
 * @text Gameday
 * @desc Stores the days passed since start of the game
 * @type variable
 *
 * @param optionalSwitch
 * @text Optional switches
 *
 * @param isSeasonChange
 * @text Season change
 * @desc Can be used to trigger a change in textures/tileset
 * @type switch
 *
 * @param newDaySwitch
 * @parent optionalSwitch
 * @text New day switch
 * @desc Triggers at midnight
 * @type switch
 *
 * @param newDayDuration
 * @parent optionalSwitch
 * @text Day switch duration
 * @desc How long the daySwitch lasts for, in hours
 * @type number
 * @min 1
 * @default 9
 *
 * @param newMonthSwitch
 * @parent optionalSwitch
 * @text New month switch
 * @desc Triggers on day 1 of a new month
 * @type switch
 *
 * @param newMonthDuration
 * @parent optionalSwitch
 * @text New month duration
 * @desc How many days the newMonthSwitch lasts for
 * @type number
 * @min 1
 * @default 3
 *
 * @param newYearSwitch
 * @parent optionalSwitch
 * @text New year switch
 * @desc Triggers at day 1, month 1, of a new year,
 * and expires on day 1 of month 2
 * @type switch
 *
 * @param isSeason1
 * @parent optionalSwitch
 * @text Coldest season
 * @desc switch to trigger the coldest season (e.g. 'Winter')
 * @type switch
 *
 * @param isSeason2
 * @parent optionalSwitch
 * @text Blossoming season
 * @desc switch to trigger the blossoming season (e.g. "Spring")
 * @type switch
 *
 * @param isSeason3
 * @parent optionalSwitch
 * @text Hottest season
 * @desc switch to trigger the hottest season (e.g. "Summer")
 * @type switch
 *
 * @param isSeason4
 * @parent optionalSwitch
 * @text Falling season
 * @desc switch to trigger the falling season (e.g. "Autumn")
 * @type switch
 *
 * @param isDawn
 * @parent optionalSwitch
 * @text Dawn phase
 * @desc Day phase sorrounding the sunrise event
 * @type switch
 *
 * @param isAM
 * @parent optionalSwitch
 * @text Morning phase
 * @desc Day phase between dawn and noon
 * @type switch
 *
 * @param isNoon
 * @parent optionalSwitch
 * @text Noon phase
 * @desc Day phase sorrounding the noon/midday event
 * @type switch
 *
 * @param isPM
 * @parent optionalSwitch
 * @text Afternoon phase
 * @desc Day phase between noon and dusk
 * @type switch
 *
 * @param isDusk
 * @parent optionalSwitch
 * @text Dusk phase
 * @desc Day phase sorrounding the sunset event
 * @type switch
 *
 * @param isNight
 * @parent optionalSwitch
 * @text Night phase
 * @desc Day phase between dusk and dawn
 * @type switch
 *
 */

/*~struct~calendars:
 *
 * @param calendarName
 * @text Calendar name
 * @desc Name of the calendar (can be any text)
 * @type string
 *
 * @param calendarDesc
 * @text Calendar description
 * @type note
 * @desc Description (can be any text)
 *
 * @param calendarMonths
 * @text Calendar months
 * @desc Data for each month of the year
 * @type struct<months>[]
 *
 * @param calendarWeek
 * @text Calendar week
 * @desc Days in a week
 * @type struct<weekDay>[]
 *
 * @param leapYear
 * @text Leap year frequency
 * @desc How often (in years) a leap year occurs
 * (leave blank to auto-calculate)
 * @type number
 * @min 0
 * @default 0
 *
 * @param dayLength
 * @text Day length
 * @desc The length (in hours) of a calendar day
 * @type number
 * @min 1
 * @default 24
 *
 * @param seasonalChanges
 * @text Seasonal changes
 * @desc The max amount (hours) of change in sunrise and sunset times
 * between winter and summer
 * @type number
 * @min 0
 * @default 2
 *
 * @param summerSolstice
 * @text Summer solstice
 * @desc The day of the year with the longest daylight;
 * format: Month/day
 * @type string
 * @default 6/21
 *
 * @param epochAbs
 * @text [optional] Absolute epoch
 * @desc Total years since planet creation
 * (you can use "_" as thousands demarcator)
 * @type text
 * @default 80
 *
 * @param epochYear
 * @text [advanced] Epoch year
 * @desc reference year for dates (optional)
 * @type number
 * @min 0
 * @default 0
 *
 *
 *
 */

/*~struct~holidays:
 *
 * @param holidayName
 * @text Holiday name
 * @desc Enter the name of this holiday
 * @type string
 *
 * @param holidayType
 * @text Type of holiday
 * @desc A holiday can be 'fixed' in calendar or 'variable'
 * (e.g. the third sunday of a specific month)
 * @type select
 * @option fixed
 * @option variable
 * @default fixed
 *
 * @param month
 * @text Holiday Month
 * @desc For fixed and most variable holiday types, you need to specify a month
 * @type number
 * @min 1
 * @default 1
 *
 * @param day
 * @text Holiday day of the month (fixed)
 * @desc If you chose 'fixed' holiday, specify the day of the month;
 * leave default (0) to skip
 * @type number
 * @min 0
 * @default 0
 *
 * @param variableOrdinal
 * @text Variable holiday
 * @desc Set this if you want your holiday to be based on the ordinal day of the month
 * (e.g. third sunday)
 * @type number
 * @min 0
 * @default 0
 *
 * @param variableDay
 * @text Variable dayName
 * @desc If you set 'variable' 'ordinal', choose the dayName by index
 * @type number
 * @min 0
 * @default 0
 *
 */

/*~struct~weekDay:
 *
 * @param dayName
 * @text Day name
 * @desc Name of the day (can be any text)
 * @type string
 *
 * @param isWeekStart
 * @text Start of the week
 * @desc Is this the first day of the week?
 * @type boolean
 * @default false
 *
 */

/*~struct~months:
 *
 * @param monthName
 * @text Month name
 * @desc Name of the month (can be any string)
 * @type string
 *
 * @param monthDays
 * @text Month days
 * @desc Days in this month (not counting leap)
 * @type number
 * @min 1
 *
 * @param leapMonth
 * @text Is this the leapMonth?
 * @desc Will this month host the leap day?
 * @type boolean
 * @default false
 */

/*~struct~clockWin:
 *
 * @param x
 * @text Window 'x'' position
 * @desc The 'x' (horizontal) coordinate to anchor the window;
 * leave default (-1) to auto-calculate
 * @type number
 * @min -1
 * @default -1
 *
 * @param y
 * @text Window 'y' position
 * @desc The 'y' (vertical) coordinate to anchor the window;
 * leave default (-1) to auto-calculate
 * @type number
 * @min -1
 * @default -1
 *
 * @param w
 * @text Window width
 * @desc Enter a desired width or leave default (0) to auto-calculate
 * @type number
 * @min 0
 * @default 0
 *
 * @param padding
 * @text Window padding
 * @desc Padding in pixels; increase for a more spacious look
 * @type number
 * @min 0
 * @default 24
 *
 * @param icons
 * @text Icon settings
 * @type struct<icons>
 *
 * @param isDigital
 * @text 'isDigital' switch
 * @desc Used to toggle the digital display
 * @type switch
 *
 * @param isPhase
 * @text 'isPhase' switch
 * @desc Used to toggle the display of current day phase
 * @type switch
 *
 * @param isDate
 * @text 'isDate' switch
 * @desc Used to toggle the full date display
 * @type switch
 *
 * @param ToD_pos
 * @text DayPhase icon position
 * @desc Should the Phase of Day icon be located to the right of the time?
 * @type boolean
 * @default true
 *
 */

/*~struct~dateWin:
 *
 * @param x
 * @text Window 'x'' position
 * @desc The 'x' (horizontal) coordinate to anchor the window
 * @type number
 * @default 0
 *
 * @param y
 * @text Window 'y' position
 * @desc The 'y' (vertical) coordinate to anchor the window;
 * @type number
 * @default 0
 *
 * @param w
 * @text Window width
 * @desc Enter a desired width or leave default (0) to auto-calculate
 * @type number
 * @min 0
 * @default 0
 *
 * @param padding
 * @text Window padding
 * @desc Padding in pixels; increase for a more spacious look
 * @type number
 * @min 0
 * @default 24
 *
 */

/*~struct~icons:
 *
 * @param dateIcon
 * @text Date icon
 * @desc Icon index used for the date display
 * @type icon
 * @min 0
 *
 * @param iconSize
 * @text Icon size
 * @desc Size in pixels of icons
 * @type select
 * @option 32
 * @default 32
 *
 * @param timeDigits
 * @text Time digits
 *
 * @param dayPhases
 * @text Day phases
 *
 * @param zero
 * @parent timeDigits
 * @text '0' digit
 * @desc Icon used for the '0' digit
 * @type icon
 * @min 0
 *
 * @param one
 * @parent timeDigits
 * @text '1' digit
 * @desc Icon used for the '1' digit
 * @type icon
 * @min 0
 *
 * @param two
 * @parent timeDigits
 * @text '2' digit
 * @desc Icon used for the '2' digit
 * @type icon
 * @min 0
 *
 * @param three
 * @parent timeDigits
 * @text '3' digit
 * @desc Icon used for the '3' digit
 * @type icon
 * @min 0
 *
 * @param four
 * @parent timeDigits
 * @text '4' digit
 * @desc Icon used for the '4' digit
 * @type icon
 * @min 0
 *
 * @param five
 * @parent timeDigits
 * @text '5' digit
 * @desc Icon used for the '5' digit
 * @type icon
 * @min 0
 *
 * @param six
 * @parent timeDigits
 * @text '6' digit
 * @desc Icon used for the '6' digit
 * @type icon
 * @min 0
 *
 * @param seven
 * @parent timeDigits
 * @text '7' digit
 * @desc Icon used for the '7' digit
 * @type icon
 * @min 0
 *
 * @param eight
 * @parent timeDigits
 * @text '8' digit
 * @desc Icon used for the '8' digit
 * @type icon
 * @min 0
 *
 * @param nine
 * @parent timeDigits
 * @text '9' digit
 * @desc Icon used for the '9' digit
 * @type icon
 * @min 0
 *
 * @param separator
 * @parent timeDigits
 * @text separator digit
 * @desc Icon used for the 'separator' digit (e.g. ':')
 * @type icon
 * @min 0
 *
 * @param blank
 * @parent timeDigits
 * @text blank digit
 * @desc Icon used for the 'blank' digit (e.g. " ")
 * @type icon
 * @min 0
 *
 * @param dawn
 * @parent dayPhases
 * @text Dawn icon
 * @desc Icon used for the 'dawn' day phase
 * @type icon
 * @min 0
 *
 * @param am
 * @parent dayPhases
 * @text Morning icon
 * @desc Icon used for the 'morning' day phase
 * @type icon
 * @min 0
 *
 * @param noon
 * @parent dayPhases
 * @text Noon icon
 * @desc Icon used for the 'noon' day phase
 * @type icon
 * @min 0
 *
 * @param pm
 * @parent dayPhases
 * @text Afternoon icon
 * @desc Icon used for the 'afternoon' day phase
 * @type icon
 * @min 0
 *
 * @param dusk
 * @parent dayPhases
 * @text Dusk icon
 * @desc Icon used for the 'dusk' day phase
 * @type icon
 * @min 0
 *
 * @param night
 * @parent dayPhases
 * @text Night icon
 * @desc Icon used for the 'night' day phase
 * @type icon
 * @min 0
 */
/**
 * @namespace
 * @author Matheraptor
 * @version 0.7.3
 * @desc M.A.G.P.I.E.™ DateTimeSystem
 */
//========================================================================
//#region - Index
//========================================================================
var MAGPIE = MAGPIE || {};
MAGPIE.meta = MAGPIE.meta || {
  name: "M.A.G.P.I.E.™",
  desc: "(M)odular (A)lgorithmic (G)eneral-(P)urpose (I)ntelligence (E)ngine ™",
  version: [0, 39, 972],
  firmwareName: "MAGPIE",
  firmwareDate: "20260724",
};
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.DateTime = {};
MAGPIE.addons.DateTime.meta = {
  name: MAGPIE.meta.name + " DATE and TIME system",
  firmwareName: "MAGPIE_DateTimeSystem",
  url: "https://matheraptor.itch.io/magpie-datetimesystem",
  firmwareFile: `${MAGPIE.meta.firmwareName}.js`,
  isInit: false,
};
MAGPIE.addons.DateTime.pluginName = MAGPIE.addons.DateTime.meta.firmwareName;
MAGPIE.addons.DateTime.parameters = PluginManager.parameters(
  MAGPIE.addons.DateTime.pluginName,
);
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Key
//------------------------------------------------------------------------
MAGPIE.KEY = MAGPIE.KEY || {};
MAGPIE.KEY.DEBUG = true;
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Classes
//------------------------------------------------------------------------
/**
 *
 * @param {calendar_data} data
 */
function MAGPIE_CALENDAR(data) {
  this.initialize(data);
}

/**
 *
 * @param {date_data} data
 * @returns {new MAGPIE_DATE}
 */
function MAGPIE_DATE(data) {
  this.initialize(data);
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 * @typedef {index} variableID
 * @typedef {index} switchID
 */
//------------------------------------------------------------------------
// #region > Enums
//------------------------------------------------------------------------
/** @type {MAGPIE_DATE} */
var $TIME = null;
MAGPIE.setEnum = (value, section = null) => {
  const ePrefix = "[MAGPIE].setEnum: ";
  try {
    if (!value) return null;
    const base = MAGPIE.addons.DateTime.parameters;
    const SECTION = section ? JSON.parse(base[section]) : base;
    return SECTION[value];
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
MAGPIE.KEY.DAWN = "dawn";
MAGPIE.KEY.AM = "am";
MAGPIE.KEY.NOON = "noon";
MAGPIE.KEY.PM = "pm";
MAGPIE.KEY.DUSK = "dusk";
MAGPIE.KEY.NIGHT = "night";
/** @type {Enumerator<Number>} @desc default: 60 */
MAGPIE.KEY.TIMESCALE = 60;
/** @type {Enumerator<Number>} @desc default: 1 */
MAGPIE.KEY.COMPRESSION = Number(MAGPIE.setEnum("compression", "mandatory"));
/** @type {MAGPIE_CALENDAR[]} */
MAGPIE.KEY.CALENDAR_DATA = JSON.parse(
  MAGPIE.addons.DateTime.parameters.calendars,
  (key, value) => {
    try {
      return typeof value === "string" ? JSON.parse(value) : value;
    } catch (e) {
      return value;
    }
  },
).map((value, index) => {
  const months = JSON.parse(value?.calendarMonths, (key, value) => {
    try {
      return typeof value === "string" ? JSON.parse(value) : value;
    } catch (e) {
      return value;
    }
  }).map((month) => {
    return {
      monthName: month.monthName,
      monthDays: Number(month.monthDays),
      leapMonth: JSON.parse(month.leapMonth),
    };
  });
  const weekDays = JSON.parse(value.calendarWeek, (key, value) => {
    try {
      return typeof value === "string" ? JSON.parse(value) : value;
    } catch (e) {
      return value;
    }
  }).map((week) => {
    return {
      dayName: week?.dayName,
      isWeekStart: JSON.parse(week?.isWeekStart),
    };
  });
  return {
    calendarID: index,
    name: value?.calendarName,
    desc: JSON.parse(value?.calendarDesc),
    days: Number(value?.calendarDays),
    months: months,
    weekDays: weekDays,
    leapMonth: months.findIndex((m) => !!m?.leapMonth),
    leapYear: Number(value?.leapYear),
    dayLength: Number(value?.dayLength),
    seasonalChanges: Number(value?.seasonalChanges),
    summerSolstice: value?.summerSolstice,
    epochAbs: Number(value.epochAbs.replaceAll("_", "")),
    epochYear: Number(value?.epochYear),
    holidays: value?.holidays,
  };
});
/** @type {MAGPIE_CALENDAR[]} */
MAGPIE.KEY.CALENDARS = [];
setTimeout(() => {
  MAGPIE.KEY.CALENDARS = MAGPIE.KEY.CALENDAR_DATA.map((data) => {
    if (data) return new MAGPIE_CALENDAR(data);
  });
}, 1000);
MAGPIE.KEY.DAY_PHASE = false;
MAGPIE.KEY.INTL = MAGPIE.setEnum("intl", "mandatory");
/** @todo isGamedayOption? */
MAGPIE.KEY.USE_GAMEDAY = true;
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Vars
//------------------------------------------------------------------------
/** @type {variableID} */
MAGPIE.KEY.CALENDAR_ID = Number(MAGPIE.setEnum("calendarID", "mandatory"));
/** @type {variableID} */
MAGPIE.KEY.YEAR = Number(MAGPIE.setEnum("year", "mandatory"));
/** @type {variableID} */
MAGPIE.KEY.MONTH = Number(MAGPIE.setEnum("month", "mandatory"));
/** @type {variableID} */
MAGPIE.KEY.DAY = Number(MAGPIE.setEnum("day", "mandatory"));
/** @type {variableID} */
MAGPIE.KEY.HOUR = Number(MAGPIE.setEnum("hour", "mandatory"));
/** @type {variableID} */
MAGPIE.KEY.MINUTE = Number(MAGPIE.setEnum("minute", "mandatory"));
/** @type {variableID} */
MAGPIE.KEY.SECOND = Number(MAGPIE.setEnum("second", "mandatory"));
/** @type {variableID} */
MAGPIE.KEY.DAY_NAME = Number(MAGPIE.setEnum("dayName", "optional"));
/** @type {variableID} */
MAGPIE.KEY.MONTH_NAME = Number(MAGPIE.setEnum("monthName", "optional"));
/** @type {variableID} */
MAGPIE.KEY.SUNRISE = Number(MAGPIE.setEnum("sunrise", "optional"));
/** @type {variableID} */
MAGPIE.KEY.SUNSET = Number(MAGPIE.setEnum("sunset", "optional"));
/** @type {variableID} */
MAGPIE.KEY.GAMEDAY = Number(MAGPIE.setEnum("gameday", "optional"));
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > switches
//------------------------------------------------------------------------
/** @type {switchID} */
MAGPIE.KEY.IS_TIME = Number(MAGPIE.setEnum("isTime", "mandatory"));
/** @type {switchID} */
MAGPIE.KEY.IS_DAY_CYCLE = Number(MAGPIE.setEnum("isDayCycle", "mandatory"));
/** @type {switchID} */
MAGPIE.KEY.IS_SEASON_CYCLE = Number(MAGPIE.setEnum("isSeasonal", "mandatory"));
/** @type {switchID} */
MAGPIE.KEY.IS_LEAP_YEAR = Number(MAGPIE.setEnum("isLeapYear", "mandatory"));
/** @type {switchID} */
MAGPIE.KEY.IS_LEAP_MONTH = Number(MAGPIE.setEnum("isLeapMonth", "mandatory"));
/** @type {switchID} */
MAGPIE.KEY.IS_LEAP_DAY = Number(MAGPIE.setEnum("isLeapDay", "mandatory"));
/** @type {switchID} */
MAGPIE.KEY.IS_SEASON_CHANGE = Number(
  MAGPIE.setEnum("isSeasonChange", "optional"),
);
/** @type {switchID} */
MAGPIE.KEY.NEW_DAY_SWITCH = Number(MAGPIE.setEnum("newDaySwitch", "optional"));
/** @type {switchID} */
MAGPIE.KEY.NEW_DAY_DURATION = Number(
  MAGPIE.setEnum("newDayDuration", "optional"),
);
/** @type {switchID} */
MAGPIE.KEY.NEW_MONTH_SWITCH = Number(
  MAGPIE.setEnum("newMonthSwitch", "optional"),
);
/** @type {switchID} */
MAGPIE.KEY.NEW_MONTH_DURATION = Number(
  MAGPIE.setEnum("newMonthDuration", "optional"),
);
/** @type {switchID} */
MAGPIE.KEY.NEW_YEAR_SWITCH = Number(
  MAGPIE.setEnum("newYearSwitch", "optional"),
);
/** @type {switchID} */
MAGPIE.KEY.IS_DAWN = Number(MAGPIE.setEnum("isDawn", "optional"));
/** @type {switchID} */
MAGPIE.KEY.IS_AM = Number(MAGPIE.setEnum("isAM", "optional"));
/** @type {switchID} */
MAGPIE.KEY.IS_NOON = Number(MAGPIE.setEnum("isNoon", "optional"));
/** @type {switchID} */
MAGPIE.KEY.IS_PM = Number(MAGPIE.setEnum("isPM", "optional"));
/** @type {switchID} */
MAGPIE.KEY.IS_DUSK = Number(MAGPIE.setEnum("isDusk", "optional"));
/** @type {switchID} */
MAGPIE.KEY.IS_NIGHT = Number(MAGPIE.setEnum("isNight", "optional"));
/** @type {switchID} */
MAGPIE.KEY.IS_SEASON_1 = Number(MAGPIE.setEnum("isSeason1", "optional"));
/** @type {switchID} */
MAGPIE.KEY.IS_SEASON_2 = Number(MAGPIE.setEnum("isSeason2", "optional"));
/** @type {switchID} */
MAGPIE.KEY.IS_SEASON_3 = Number(MAGPIE.setEnum("isSeason3", "optional"));
/** @type {switchID} */
MAGPIE.KEY.IS_SEASON_4 = Number(MAGPIE.setEnum("isSeason4", "optional"));
/** @type {switchID} */
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Window
//------------------------------------------------------------------------
MAGPIE.KEY.WIN_DATE = {};
MAGPIE.KEY.WIN_CLOCK = {};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Clock
//------------------------------------------------------------------------
MAGPIE.KEY.WIN_CLOCK.meta = {};
MAGPIE.KEY.WIN_CLOCK.full = JSON.parse(MAGPIE.setEnum("clock", "optional"));
MAGPIE.KEY.WIN_CLOCK.x = Number(MAGPIE.KEY.WIN_CLOCK.full.x);
MAGPIE.KEY.WIN_CLOCK.y = Number(MAGPIE.KEY.WIN_CLOCK.full.y);
MAGPIE.KEY.WIN_CLOCK.w = Number(MAGPIE.KEY.WIN_CLOCK.full.w);
MAGPIE.KEY.WIN_CLOCK.PADDING = Number(MAGPIE.KEY.WIN_CLOCK.full.padding);
MAGPIE.KEY.WIN_CLOCK.ICONS = JSON.parse(
  MAGPIE.KEY.WIN_CLOCK.full.icons,
  (key, value) => {
    if (typeof value === "string" && value.trim() !== "" && !isNaN(value))
      return Number(value);
    return value;
  },
);
MAGPIE.KEY.WIN_CLOCK.ICON_SIZE = MAGPIE.KEY.WIN_CLOCK.ICONS.iconSize;
MAGPIE.KEY.DIGITS = [
  MAGPIE.KEY.WIN_CLOCK.ICONS.zero,
  MAGPIE.KEY.WIN_CLOCK.ICONS.one,
  MAGPIE.KEY.WIN_CLOCK.ICONS.two,
  MAGPIE.KEY.WIN_CLOCK.ICONS.three,
  MAGPIE.KEY.WIN_CLOCK.ICONS.four,
  MAGPIE.KEY.WIN_CLOCK.ICONS.five,
  MAGPIE.KEY.WIN_CLOCK.ICONS.six,
  MAGPIE.KEY.WIN_CLOCK.ICONS.seven,
  MAGPIE.KEY.WIN_CLOCK.ICONS.eight,
  MAGPIE.KEY.WIN_CLOCK.ICONS.nine,
];
MAGPIE.KEY.WIN_CLOCK.DIGITS = 6;
MAGPIE.KEY.WIN_CLOCK.TOD_POS = MAGPIE.KEY.WIN_CLOCK.ICONS.ToD_pos;
MAGPIE.KEY.WIN_CLOCK.IS_DATE = Number(MAGPIE.KEY.WIN_CLOCK.full.isDate);
MAGPIE.KEY.WIN_CLOCK.IS_DIGITAL = Number(MAGPIE.KEY.WIN_CLOCK.full.isDigital);
MAGPIE.KEY.WIN_CLOCK.IS_PHASE = Number(MAGPIE.KEY.WIN_CLOCK.full.isPhase);
//#endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > date
//------------------------------------------------------------------------
MAGPIE.KEY.WIN_DATE.meta = {};
MAGPIE.KEY.WIN_DATE.full = JSON.parse(MAGPIE.setEnum("date", "optional"));
MAGPIE.KEY.WIN_DATE.x = Number(MAGPIE.KEY.WIN_DATE.full.x);
MAGPIE.KEY.WIN_DATE.y = Number(MAGPIE.KEY.WIN_DATE.full.y);
MAGPIE.KEY.WIN_DATE.w = Number(MAGPIE.KEY.WIN_DATE.full.w);
MAGPIE.KEY.WIN_DATE.PADDING = Number(MAGPIE.KEY.WIN_DATE.full.padding);
MAGPIE.KEY.WIN_DATE.ICONS = MAGPIE.KEY.WIN_CLOCK.ICONS;
MAGPIE.KEY.WIN_DATE.ICON_SIZE = MAGPIE.KEY.WIN_CLOCK.ICON_SIZE;
MAGPIE.KEY.WIN_DATE.DIGITS = 12;
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > seasons
//------------------------------------------------------------------------
MAGPIE.KEY.WINTER = 1;
MAGPIE.KEY.SPRING = 2;
MAGPIE.KEY.SUMMER = 3;
MAGPIE.KEY.AUTUMN = 4;
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > local
//------------------------------------------------------------------------
MAGPIE.KEY.LOCAL = MAGPIE.KEY.LOCAL || {};
MAGPIE.KEY.LOCAL.WINTER = {
  "en-GB": "winter",
  "en-US": "winter",
  "it-IT": "inverno",
};
MAGPIE.KEY.LOCAL.SPRING = {
  "en-GB": "spring",
  "en-US": "spring",
  "it-IT": "primavera",
};
MAGPIE.KEY.LOCAL.SUMMER = {
  "en-GB": "summer",
  "en-US": "summer",
  "it-IT": "estate",
};
MAGPIE.KEY.LOCAL.AUTUMN = {
  "en-GB": "autumn",
  "en-US": "fall",
  "it-IT": "autunno",
};
MAGPIE.KEY.LOCAL.DAWN = {
  "en-US": "dawn",
  "it-IT": "alba",
};
MAGPIE.KEY.LOCAL.AM = {
  "en-US": "morning",
  "en-GB": "morning",
  "it-IT": "mattina",
};
MAGPIE.KEY.LOCAL.NOON = {
  "en-US": "noon",
  "en-GB": "noon",
  "it-IT": "mezzogiorno",
};
MAGPIE.KEY.LOCAL.PM = {
  "en-US": "afternoon",
  "en-GB": "afternoon",
  "it-IT": "pomeriggio",
};
MAGPIE.KEY.LOCAL.DUSK = {
  "en-US": "dusk",
  "en-GB": "dusk",
  "it-IT": "crepuscolo",
};
MAGPIE.KEY.LOCAL.NIGHT = {
  "en-US": "night",
  "en-GB": "night",
  "it-IT": "notte",
};
// #endregion
//------------------------------------------------------------------------
/**
 *
 *
 */
//#endregion
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
// #region > Ticking
//------------------------------------------------------------------------
MAGPIE.addons.DateTime.TICK = function (second) {
  /** @type {Window_Clock} */
  const clockWin = SceneManager._scene?._clockWindow;
  /** @type {Window_Date} */
  const dateWin = SceneManager._scene?._dateWindow;
  if (clockWin) clockWin.updateClock();
  if (dateWin) dateWin.updateDate();
  $gameVariables.setValue(MAGPIE.KEY.SECOND, second);
};
MAGPIE.addons.DateTime.superTICK = function (minute) {
  $gameVariables.setValue(MAGPIE.KEY.SECOND, 0);
  $gameVariables.setValue(MAGPIE.KEY.MINUTE, minute);
};
MAGPIE.addons.DateTime.megaTICK = function (hour) {
  $gameVariables.setValue(MAGPIE.KEY.MINUTE, 0);
  $gameVariables.setValue(MAGPIE.KEY.HOUR, hour);
  if (hour > MAGPIE.KEY.NEW_DAY_DURATION)
    $gameSwitches.setValue(MAGPIE.KEY.NEW_DAY_SWITCH, false);
};
MAGPIE.addons.DateTime.ultraTICK = function (day) {
  $gameVariables.setValue(MAGPIE.KEY.HOUR, 0);
  $gameVariables.setValue(MAGPIE.KEY.DAY, day);
  $gameSwitches.setValue(MAGPIE.KEY.NEW_DAY_SWITCH, true);
  if (day > MAGPIE.KEY.NEW_MONTH_DURATION)
    $gameSwitches.setValue(MAGPIE.KEY.NEW_MONTH_SWITCH, false);
};
MAGPIE.addons.DateTime.newMonth = function (month) {
  $gameVariables.setValue(MAGPIE.KEY.DAY, 1);
  $gameVariables.setValue(MAGPIE.KEY.MONTH, month);
  $gameSwitches.setValue(MAGPIE.KEY.NEW_MONTH_SWITCH, true);
  if (month > 1) $gameSwitches.setValue(MAGPIE.KEY.NEW_YEAR_SWITCH, false);
};
MAGPIE.addons.DateTime.newYear = function (year) {
  $gameVariables.setValue(MAGPIE.KEY.MONTH, 1);
  $gameVariables.setValue(MAGPIE.KEY.YEAR, year);
  $gameSwitches.setValue(MAGPIE.KEY.NEW_YEAR_SWITCH, true);
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Utils
//------------------------------------------------------------------------
MAGPIE.addons.DateTime._ordinal_old = function (number) {
  if (isNaN(number)) return false;
  const abs = Math.abs(number);
  const lastDigit = abs % 10;
  const lastTwoDigits = abs % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return number + "th";
  switch (lastDigit) {
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
 *
 * @param {Number} number
 * @param {{
 * intl: String,
 * suffixes: {
 * one: String,
 * two: String,
 * few: String,
 * other: String
 * }
 * }} options
 * @returns
 */
MAGPIE.addons.DateTime.ordinal = function (number, options = {}) {
  if (!options?.intl) options.intl = "en-US";
  if (!options?.suffixes)
    options.suffixes = {
      one: "st",
      two: "nd",
      few: "rd",
      other: "th",
    };
  const pr = new Intl.PluralRules(options.intl, { type: "ordinal" });
  const rule = pr.select(number);
  const suffixes = options.suffixes;
  return number + (suffixes[rule] || "th");
};
/**
 *
 * @param {Number} number
 * @param {{
 * toFixed: Number,
 * sign: Boolean
 * }} options
 * @returns
 */
MAGPIE.addons.DateTime.formatNum = function (number, options = {}) {
  if (!options?.intl) options.intl = "en-US";
  const toFixed = Number(options?.toFixed) || 0;
  const formatter = new Intl.NumberFormat(options.intl, {
    minimumFractionDigits: toFixed,
    maximumFractionDigits: toFixed,
    signDisplay: options?.sign ? "always" : "never",
  });
  return formatter.format(number);
};
MAGPIE.addons.DateTime.addDemoFeedback = function (string, value) {
  if (!this._feedback) this._feedback = [];
  this._feedback.push(`${string}: ${value ? "👍" : "👎"}`);
};
MAGPIE.addons.DateTime.sendDemoFeedback = function () {
  if (!Array.isArray(this?._feedback) || !MAGPIE?.sendDemoFeedback)
    return false;
  return MAGPIE.sendDemoFeedback({
    pluginName: "MAGPIE_DateTimeSystem",
    feedback: this._feedback,
  });
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
 * @typedef {Number} index
 * @typedef {{
 * dayName: String,
 * isWeekStart: Boolean
 * }[]} week
 */
//========================================================================
// #region - Calendar
//========================================================================
/**
 *
 * @param {calendar_data} data
 * @returns {new MAGPIE_CALENDAR}
 */
MAGPIE_CALENDAR.prototype.initialize = function (data) {
  this._firmware = "MAGPIE_CALENDAR";
  this.calendarID = Number(data?.calendarID);
  this.name = String(data?.name);
  this.desc = String(data?.desc);
  this.months = data?.months || [];
  this.weekDays = data?.weekDays || [];
  this.leapMonth = Number(data?.leapMonth);
  this.leapYear = Number(data?.leapYear);
  this.dayLength = Number(data?.dayLength);
  this.seasonalChanges = Number(data?.seasonalChanges);
  this.summerSolstice = this._extract_summerSolstice(data);
  this.epochAbs = Number(data?.epochAbs);
  this.epochYear = Number(data?.epochYear);
  this.days = this._calculate_days();
  // console.log(`seasonalChanges: ${data.seasonalChanges}`);
};
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Get
//------------------------------------------------------------------------
/**
 *
 * @returns {week}
 */
MAGPIE_CALENDAR.prototype._get_week = function () {
  const start = this.weekDays.findIndex((day) => day.isWeekStart);
  return this.weekDays.slice(start).concat(this.weekDays.slice(0, start));
};
MAGPIE_CALENDAR.prototype._calculate_days = function () {
  let days = 0;
  for (const month of this.months) {
    days += month.monthDays;
  }
  if (this.leapYear) days += 1 / this.leapYear;
  return days;
};
MAGPIE_CALENDAR.prototype._extract_summerSolstice = function (data) {
  if (!data?.summerSolstice) return 0;
  const rawSolstice = data.summerSolstice.split("/");
  const month = Number(rawSolstice[0]);
  const day = Number(rawSolstice[1]);
  const months = this.months.slice(0, Number(month) - 1);
  let days = 0;
  months.forEach((m) => (days += m.monthDays));
  days += day;
  if (Number(days)) return days;
};
/**
 *
 * @param {month} month
 * @returns
 */
MAGPIE_CALENDAR.prototype._print_monthName = function (month) {
  return this.months[month - 1].monthName;
};
MAGPIE_CALENDAR.prototype._print_dayName = function (weekDay) {
  const week = this._get_week();
  return week[weekDay].dayName;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 * @typedef {{
 * calendarID: Number,
 * name: String,
 * desc: String,
 * days: Number,
 * months: {monthName: String, monthDays: Number, leapMonth: Boolean}[],
 * weekDays: {dayName: String, isWeekStart: Boolean}[],
 * leapMonth: Number,
 * leapYear: Number,
 * dayLength: Number,
 * seasonalChanges: Number,
 * epochAbs: Number,
 * epochYear: Number
 * }} calendar_data
 * @typedef {index} calendarID
 */
//------------------------------------------------------------------------
// #region > Set
//------------------------------------------------------------------------
/**
 *
 * @param {calendar_data} options
 */
MAGPIE_CALENDAR.prototype.set = function (options) {
  if (options?.name) this.name = options.name;
  if (options?.desc) this.desc = options.desc;
  if (options?.leapMonth) this.leapMonth = options.leapMonth;
  if (options?.leapYear) {
    this.leapYear = options.leapYear;
    this.days = this._calculate_days();
  }
  if (options?.dayLength) this.dayLength = options.dayLength;
  if (options?.seasonalChanges) this.seasonalChanges = options.seasonalChanges;
  if (options?.summerSolstice)
    this.summerSolstice = this._extract_summerSolstice(options?.summerSolstice);
  if (options?.epochAbs) this.epochAbs = options.epochAbs;
  if (options?.epochYear) this.epochYear = options.epochYear;
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
 * @name MAGPIE_DATE
 * @desc Date/Time system and component template
 *
 */
//========================================================================
// #region - Date
//========================================================================
MAGPIE_DATE.meta = {
  name: MAGPIE.meta.name + " Date",
  desc: "Date/Time system and component template",
  firmwareName: "MAGPIE_DATE",
};
/**
 * @name
 * @desc
 * @typedef {Number} year
 * @typedef {Number} month
 * @typedef {Number} day
 * @typedef {index} weekDay
 * @typedef {Number} hour
 * @typedef {Number} minute
 * @typedef {Number} duration in seconds
 * @typedef {duration} second
 * @typedef {Number} millisecond
 * @typedef {Number} epoch
 * @typedef {Number} timezone 0 is UTC (-12 to 12)
 * @typedef {Number} weeks
 * @typedef {Number} gameday
 * @typedef {{
 * calendarID: calendarID,
 * year: year,
 * month: month,
 * day: day,
 * gameday: gameday,
 * weeks: weeks,
 * weekDay: weekDay,
 * hour: hour,
 * minute: minute,
 * second: second,
 * millisecond: millisecond,
 * timezone: timezone,
 * epoch: epoch,
 * sunset: hour,
 * sunrise: hour,
 * isMaster: Boolean,
 * }} date_data
 */
//------------------------------------------------------------------------
// #region > Proto
//------------------------------------------------------------------------
/**
 *
 * @param {date_data} data
 * @returns {new MAGPIE_DATE}
 */
MAGPIE_DATE.prototype.initialize = function (data) {
  this._firmware = MAGPIE_DATE.meta.firmwareName;
  /** @type {calendarID} */
  this.calendarID = Number(data?.calendarID) || 0;
  /** @type {epoch} */
  this.epoch = Number(data?.epoch) || 0;
  /** @type {year} */
  this.year = Number(data?.year) || 0;
  /** @type {month} */
  this.month = Number(data?.month) || 1;
  /** @type {weeks} */
  this.weeks = Number(data?.weeks) || 0;
  /** @type {day} */
  this.day = Number(data?.day) || 1;
  /** @type {weekDay} */
  this.weekDay = Number(data?.weekDay) || 0;
  /** @type {hour} */
  this.hour = Number(data?.hour) || 0;
  /** @type {minute} */
  this.minute = Number(data?.minute) || 0;
  /** @type {second} */
  this.second = Number(data?.second) || 0;
  /** @type {timezone} */
  this.timezone = Number(data?.timezone) || 0;
  /** @type {Boolean} */
  this.isMaster = data?.isMaster || false;
  this.sunrise = Number(data?.sunrise) || this._get_sunrise();
  this.sunset = Number(data?.sunset) || this._get_sunset();
  this.gameday = Number(data?.gameday) || 0;
  // this.millisecond = Number(data?.millisecond);
};
/**
 *
 * @returns {MAGPIE_CALENDAR}
 */
MAGPIE_DATE.prototype.getCalendar = function () {
  return MAGPIE.KEY.CALENDARS[this.calendarID];
};
/**
 *
 * @returns {day}
 */
MAGPIE_DATE.prototype.yearday = function () {
  if (!this.day || !this.month) return false;
  const calendar = this.getCalendar();
  let yearday = 0;
  yearday += this.day;
  const monthdays = Object.values(calendar.months)
    .filter((m, i) => i < this.month - 1)
    .forEach((n) => (yearday += n.monthDays));
  if (this.isLeapYear() && this.month > calendar.leapMonth) yearday++;
  return yearday;
};
MAGPIE_DATE.prototype.isLeapYear = function () {
  const calendar = this.getCalendar();
  const leapYear = calendar.leapYear || 4;
  const epoch = calendar.epochYear || 0;
  const leap = (this.year - epoch) % leapYear;
  return leap >= leapYear;
};
MAGPIE_DATE.prototype.leapDay = function () {
  const leapMonth = this.getCalendar().leapMonth + 1;
  if (this.isLeapYear() && this.month === leapMonth) return 1;
  return 0;
};
MAGPIE_DATE.prototype.monthDays = function () {
  const month = this.month - 1;
  const calendar = this.getCalendar();
  return calendar.months[month].monthDays + this.leapDay();
};
/**
 *
 * @param {Number} number
 * @param {Number} length
 * @returns {String}
 */
MAGPIE_DATE.prototype.pad0 = function (number, length = 2) {
  return number.toString().padStart(length, "0");
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Get
//------------------------------------------------------------------------
/**
 *
 * @returns {String}
 */
MAGPIE_DATE.prototype._print_monthName = function () {
  return this.getCalendar()._print_monthName(this.month);
};
MAGPIE_DATE.prototype._print_dayName = function () {
  return this.getCalendar()._print_dayName(this.weekDay);
};
MAGPIE_DATE.prototype._get_dayPhase = function () {
  const ePrefix = "[DATE]._get_dayPhase: ";
  if (!this._get_isDayCycle()) {
    console.log(ePrefix + "IS_DAY_CYCLE is OFF");
    return "n/a";
  }
  try {
    const sunrise = this._get_localSunrise();
    const sunset = this._get_localSunset();
    const noon = 12;
    const time = this.hour + this.minute / 60;
    if (time < sunrise - 1 || time > sunset + 1) return MAGPIE.KEY.NIGHT;
    if (time > sunrise - 1 && time < sunrise + 1) return MAGPIE.KEY.DAWN;
    if (time > sunrise + 1 && time < noon - 1) return MAGPIE.KEY.AM;
    if (time > noon - 1 && time < noon + 1) return MAGPIE.KEY.NOON;
    if (time > noon + 1 && time < sunset - 1) return MAGPIE.KEY.PM;
    if (time > sunset - 1 && time < sunset + 1) return MAGPIE.KEY.DUSK;
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
MAGPIE_DATE.prototype._print_dayPhase = function () {
  const ePrefix = "[MAGPIE_DATE]._print_dayPhase: ";
  try {
    const rawPhase = this._get_dayPhase();
    if (!rawPhase) throw new Error(`${rawPhase} is invalid rawPhase`);
    const diction = MAGPIE.KEY.LOCAL[rawPhase.toUpperCase()];
    const locale = $gameSystem?._language || navigator.language;
    if (rawPhase === "n/a") return MAGPIE.KEY.LOCAL.NIGHT[locale];
    if (typeof locale !== "string" || !locale.includes("-")) return false;
    return diction[locale];
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
/**
 * @todo _get_localSunrise
 * @returns {Number}
 */
MAGPIE_DATE.prototype._get_localSunrise = function () {
  const sunrise = this._get_sunrise();
  return sunrise;
};
/**
 * @todo _get_localSunset
 * @returns {Number}
 */
MAGPIE_DATE.prototype._get_localSunset = function () {
  const sunset = this._get_sunset();
  return sunset;
};
/**
 * @todo _get_sunrise
 * @returns {Number}
 */
MAGPIE_DATE.prototype._get_sunrise = function () {
  if (Number(this.sunrise)) return this.sunrise;
  return 7;
};
/**
 * @todo _get_sunset
 * @returns {Number}
 */
MAGPIE_DATE.prototype._get_sunset = function () {
  if (Number(this.sunset)) return this.sunset;
  return 18;
};
/**
 *
 * @returns {Boolean}
 */
MAGPIE_DATE.prototype._get_isDayCycle = function () {
  return $gameSwitches?.value(MAGPIE.KEY.IS_DAY_CYCLE) || MAGPIE.KEY.DAY_PHASE;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Set
//------------------------------------------------------------------------
/**
 *
 * @param {{
 * calendarID: calendarID,
 * year: year,
 * month: month,
 * day: day,
 * hour: hour,
 * minute: minute,
 * timezone: timezone,
 * isMaster: Boolean,
 * gameday: gameday
 * }} options
 */
MAGPIE_DATE.prototype.set = function (options) {
  const ePrefix = "[MAGPIE_CALENDAR].set: ";
  try {
    const {
      calendarID,
      day,
      month,
      year,
      hour,
      minute,
      timezone,
      isMaster,
      gameday,
    } = options;
    if (calendarID > -1) this.calendarID = calendarID;
    if (year > -1) this.year = year;
    if (month > 0) this.month = month;
    if (day > 0) this.day = day;
    if (hour) this.hour = hour;
    if (gameday) this.gameday = gameday;
    this.minute = minute;
    this.timezone = timezone;
    this.isMaster = isMaster;
    const sunrise = Number(options?.sunrise);
    const sunset = Number(options?.sunset);
    const dayLength = this.getCalendar().dayLength;
    if (sunrise > 0 && sunrise < dayLength) this.sunrise = sunrise;
    if (sunset > 0 && sunset < dayLength) this.sunset = sunset;
    this._setup_season();
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
MAGPIE_DATE.prototype._set_weekDayPlusOne = function () {
  const week = this.getCalendar()._get_week();
  this.weekDay++;
  if (this.weekDay >= week.length) this.newWeek();
};
MAGPIE_DATE.prototype._set_gamedayPlusOne = function () {
  if (!MAGPIE.KEY.USE_GAMEDAY) return false;
  this.gameday++;
  $gameVariables.setValue(MAGPIE.KEY.GAMEDAY, this.gameday);
};
MAGPIE_DATE.prototype._set_seasonalChanges = function () {
  const { sunrise, sunset } = this._calculate_seasonalChanges();
  this.sunrise = Number(sunrise.toFixed(2));
  this.sunset = Number(sunset.toFixed(2));
};
MAGPIE_DATE.prototype._calculate_seasonalChanges = function (yearday = NaN) {
  if (isNaN(yearday)) yearday = this.yearday();
  const calendar = this.getCalendar();
  const changes = calendar.seasonalChanges;
  const dayLength = calendar.dayLength;
  const days = calendar.days;
  const summer = calendar.summerSolstice;
  const rawOffset = (yearday - summer + days) % days;
  const coefficient = Math.abs(rawOffset / days - 0.5) * 2;
  const baseSunrise = 6.0;
  const baseSunset = 18.0;
  const shift = (coefficient - 0.5) * 2 * changes;
  const sunrise = baseSunrise - shift;
  const sunset = baseSunset + shift;
  return { sunrise, sunset };
};
/**
 *
 * @returns {Boolean}
 */
MAGPIE_DATE.prototype._get_isSeasonCycle = function () {
  if ($gameSwitches) return $gameSwitches.value(MAGPIE.KEY.IS_SEASON_CYCLE);
};
/**
 *
 * @returns {Boolean}
 */
MAGPIE_DATE.prototype._get_isTime = function () {
  if ($gameSwitches) return $gameSwitches.value(MAGPIE.KEY.IS_TIME);
};
MAGPIE_DATE.prototype._get_isDayCycle = function () {
  if ($gameSwitches) return $gameSwitches.value(MAGPIE.KEY.IS_DAY_CYCLE);
};
MAGPIE_DATE.prototype._setup_season = function () {
  const ePrefix = "[MAGPIE_DATE]._setup_season: ";
  if (!this._get_isSeasonCycle())
    return console.log(ePrefix + "IS_SEASON_CYCLE is OFF");
  const currentSeason = this._get_season(this.yearday() - 1);
  if (!currentSeason) return false;
  const newSeason = this._get_season();
  this.newSeason(currentSeason, newSeason);
  this._set_seasonalChanges();
  if ($gameSwitches) this._set_season(newSeason);
};
MAGPIE_DATE.prototype._get_season = function (yearday) {
  const calendar = this.getCalendar();
  const summer = calendar.summerSolstice;
  const days = calendar.days;
  const quarter = days / 4;
  const spring = (summer - quarter + days) % days;
  const autumn = (summer + quarter + days) % days;
  const winter = (spring - quarter + days) % days;
  const season1 = MAGPIE.KEY.WINTER;
  const season2 = MAGPIE.KEY.SPRING;
  const season3 = MAGPIE.KEY.SUMMER;
  const season4 = MAGPIE.KEY.AUTUMN;
  if (!yearday) yearday = this.yearday();
  if (yearday >= summer) {
    if (yearday < autumn) {
      return season3;
    }
    if (yearday >= autumn && yearday < winter) return season4;
    return season1;
  }
  if (yearday < summer) {
    if (yearday < spring) return season1;
    return season2;
  }
};

MAGPIE_DATE.prototype._set_season = function (season) {
  const ePrefix = "[MAGPIE_DATE]._set_season: ";
  try {
    const switchName = `IS_SEASON_${Math.floor(season)}`;
    const switchID = MAGPIE.KEY[switchName];
    $gameSwitches.setValue(MAGPIE.KEY.WINTER, false);
    $gameSwitches.setValue(MAGPIE.KEY.SPRING, false);
    $gameSwitches.setValue(MAGPIE.KEY.SUMMER, false);
    $gameSwitches.setValue(MAGPIE.KEY.AUTUMN, false);
    $gameSwitches.setValue(switchID, true);
    // console.log(ePrefix + `switchName: ${switchName}; switchID: ${switchID};`);
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
MAGPIE_DATE.prototype.newSeason = function (currentSeason, newSeason) {
  const ePrefix = "[MAGPIE_DATE].newSeason: ";
  try {
    if (!$gameSwitches) return console.warn(ePrefix + "not in RMMZ");
    if (currentSeason !== newSeason) {
      $gameSwitches.setValue(MAGPIE.KEY.IS_SEASON_CHANGE, true);
      // console.log(ePrefix + "IS_SEASON_CHANGE set to TRUE");
    } else if ($gameSwitches.value(MAGPIE.KEY.IS_SEASON_CHANGE)) {
      $gameSwitches.setValue(MAGPIE.KEY.IS_SEASON_CHANGE, false);
      // console.log(ePrefix + "IS_SEASON_CHANGE set to OFF");
    } else {
      // console.log(ePrefix + `no change needed.`);
    }
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
MAGPIE_DATE.prototype.newWeek = function newWeek() {
  this.weekDay = 0;
  this.weeks++;
};
MAGPIE_DATE.prototype._set_dayPhase = function () {
  const phase = this._get_dayPhase();
  const dawn = phase === MAGPIE.KEY.DAWN;
  const am = phase === MAGPIE.KEY.AM;
  const noon = phase === MAGPIE.KEY.NOON;
  const pm = phase === MAGPIE.KEY.PM;
  const dusk = phase === MAGPIE.KEY.DUSK;
  const night = phase === MAGPIE.KEY.NIGHT;
  $gameSwitches.setValue(MAGPIE.KEY.IS_DAWN, dawn);
  $gameSwitches.setValue(MAGPIE.KEY.IS_AM, am);
  $gameSwitches.setValue(MAGPIE.KEY.IS_NOON, noon);
  $gameSwitches.setValue(MAGPIE.KEY.IS_PM, pm);
  $gameSwitches.setValue(MAGPIE.KEY.IS_DUSK, dusk);
  $gameSwitches.setValue(MAGPIE.KEY.IS_NIGHT, night);
};

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Print
//------------------------------------------------------------------------
/**
 *
 * @param {{
 * style: string
 * }} options
 */
MAGPIE_DATE.prototype.printDate = function (options) {
  const ePrefix = "[DATE].printDate: ";
  try {
    // if (options?.textual) return this._printTextualDate(options);
    return this._printStandardDate(options);
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
MAGPIE_DATE.prototype._print_season = function (season) {
  if (!season) season = this._get_season();
  const value = Math.floor(season);
  const locale = MAGPIE?._get_locale ? MAGPIE._get_locale() : "en-GB";
  if (value === MAGPIE.KEY.WINTER) return MAGPIE.KEY.LOCAL.WINTER[locale];
  if (value === MAGPIE.KEY.SPRING) return MAGPIE.KEY.LOCAL.SPRING[locale];
  if (value === MAGPIE.KEY.SUMMER) return MAGPIE.KEY.LOCAL.SUMMER[locale];
  if (value === MAGPIE.KEY.AUTUMN) return MAGPIE.KEY.LOCAL.AUTUMN[locale];
};
MAGPIE_DATE.prototype._printStandardDate = function (options) {
  let string = "";
  const year = this.year;
  const month = this.pad0(this.month);
  const day = this.pad0(this.day);
  const hour = this.pad0(this.hour);
  const minute = this.pad0(this.minute);
  const second = this.pad0(this.second);
  const millisecond = this.pad0(this.millisecond);
  let date = true;
  let time = true;
  if (options?.date) {
    options.time = false;
    time = false;
  }
  if (options?.time) {
    options.date = false;
    date = false;
  }
  if (date) {
    string += year;
    string += month;
    string += day;
  }
  if (time) {
    string += hour;
    string += minute;
    if (options?.second || options?.millisecond) {
      string += this.second;
      if (options?.millisecond) string += millisecond;
    }
  }
  return string;
};
// /**
//  * @todo _printTextualDate
//  * @param {{
//  * intl: String,
//  * month: Boolean,
//  * year: Boolean,
//  * time: Boolean
//  * }} options
//  */
// MAGPIE_DATE.prototype._printTextualDate = function (options = {}) {
//   let string = "";
//   options.intl = MAGPIE.KEY.INTL;
//   const calendar = this.getCalendar();
//   const dayName = this._print_dayName();
//   const month = this._print_monthName();
//   const year = MAGPIE.addons.DateTime.formatNum(this.year);
//   const hour = this.pad0(this.hour);
//   const minute = this.pad0(this.minute);
//   const phase = this._print_dayPhase();
//   if (options?.dayName) string += dayName;
//   if (options?.month) string += month;
// };
MAGPIE_DATE.prototype._print_year = function () {
  return MAGPIE.addons.DateTime.formatNum(this.year);
};
MAGPIE_DATE.prototype._print_month = function () {
  return this.pad0(this.month);
};
MAGPIE_DATE.prototype._print_day = function () {
  return MAGPIE.addons.DateTime.ordinal(this.day, { intl: MAGPIE.KEY.INTL });
};
MAGPIE_DATE.prototype._print_time = function (options = {}) {
  if (options?.format) {
    const hour = this.hour === 12 ? 12 : this.hour % 12;
    const m = this.hour >= 12 ? "PM" : "AM";
    return `${this.pad0(hour)}:${this.pad0(this.minute)} ${m}`;
  }
  return `${this.pad0(this.hour)}:${this.pad0(this.minute)}`;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Contents
//------------------------------------------------------------------------
MAGPIE.addons.DateTime._initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
  MAGPIE.addons.DateTime._initialize.call(this);
  MAGPIE.addons.DateTime.meta.isInit = true;
};
MAGPIE.addons.DateTime._makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
  const contents = MAGPIE.addons.DateTime._makeSave.call(this);
  contents.TIME = $TIME;
  return contents;
};
MAGPIE.addons.DateTime._loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
  MAGPIE.addons.DateTime._loadSave.call(this, contents);
  $TIME = contents.TIME;
};
MAGPIE.addons.DateTime._createSave = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
  MAGPIE.addons.DateTime._createSave.call(this);
  $TIME = new MAGPIE_DATE();
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > TICK
//------------------------------------------------------------------------
MAGPIE.addons.DateTime._SceneManager_updateMain = SceneManager.updateMain;
SceneManager.updateMain = function () {
  MAGPIE.addons.DateTime._SceneManager_updateMain.call(this);
  const timescale = MAGPIE.KEY.TIMESCALE;
  const isTime = $gameSwitches?.value(MAGPIE.KEY.IS_TIME);
  if (!$TIME || !isTime) return;
  if (Graphics.frameCount % timescale === 0) $TIME.TICK();
};
MAGPIE_DATE.prototype.debugLog = function (message) {
  // if (MAGPIE.KEY.DEBUG) console.log(message);
};
/**
 * @returns
 */
MAGPIE_DATE.prototype.TICK = function TICK() {
  const ePrefix = "[DATE].TICK: ";
  this.second += MAGPIE.KEY.COMPRESSION;
  if (this.second >= 60) this.superTICK();
  this.debugLog(ePrefix + this.second);
  if (this.isMaster) MAGPIE.addons.DateTime.TICK(this.second);
};
MAGPIE_DATE.prototype.superTICK = function superTICK() {
  const ePrefix = "[DATE].superTICK: ";
  this.second = 0;
  this.minute++;
  if (this.minute >= 60) this.megaTICK();
  this.debugLog(ePrefix + this.minute);
  MAGPIE.addons.DateTime.superTICK(this.minute);
  if (this._get_isDayCycle()) this._set_dayPhase();
};
MAGPIE_DATE.prototype.megaTICK = function megaTICK() {
  const ePrefix = "[DATE].megaTICK: ";
  this.minute = 0;
  const dayLength = this.getCalendar().dayLength - 1;
  this.hour++;
  if (this.hour >= dayLength) this.ultraTICK();
  this.debugLog(ePrefix + this.hour);
  if (this.isMaster) MAGPIE.addons.DateTime.megaTICK(this.hour);
};
MAGPIE_DATE.prototype.ultraTICK = function ultraTICK() {
  const ePrefix = "[DATE].ultraTICK: ";
  this.hour = 0;
  const calendar = this.getCalendar();
  const days = this.monthDays();
  this._set_weekDayPlusOne();
  this._setup_season();
  this._set_gamedayPlusOne();
  this.day++;
  if (this.day >= days) this.newMonth();
  this.debugLog(ePrefix + this.day);
  if (this.isMaster) MAGPIE.addons.DateTime.ultraTICK(this.day);
};
MAGPIE_DATE.prototype.newMonth = function newMonth() {
  const ePrefix = "[DATE].newMonth: ";
  this.day = 1;
  const calendar = this.getCalendar();
  this.month++;
  if (this.month >= calendar.months - 1) this.newYear();
  this.debugLog(ePrefix + this.month);
  if (this.isMaster) MAGPIE.addons.DateTime.newMonth(this.month);
};
MAGPIE_DATE.prototype.newYear = function newYear() {
  const ePrefix = "[DATE].newYear: ";
  this.month = 1;
  this.year++;
  this.debugLog(ePrefix + this.year);
  if (this.isMaster) MAGPIE.addons.DateTime.newYear(this.year);
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
// #region - Windows
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > setup
//------------------------------------------------------------------------
/**
 *
 * @param {String} phase
 * @returns {Number}
 */
MAGPIE.addons.DateTime._getPhasesIcon = function (phase) {
  if (!phase) phase = $TIME._get_dayPhase();
  const I = MAGPIE.KEY.WIN_CLOCK.ICONS;
  switch (phase) {
    case MAGPIE.KEY.DAWN:
      return I.dawn;
    case MAGPIE.KEY.AM:
      return I.am;
    case MAGPIE.KEY.NOON:
      return I.noon;
    case MAGPIE.KEY.PM:
      return I.pm;
    case MAGPIE.KEY.DUSK:
      return I.dusk;
    case MAGPIE.KEY.NIGHT:
      return I.night;
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
// #region > scene
//------------------------------------------------------------------------
MAGPIE.addons.DateTime._scene_map_createAllWindows =
  Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function () {
  this.createClockWindow();
  this.createDateWindow();
  MAGPIE.addons.DateTime._scene_map_createAllWindows.call(this);
};
Scene_Map.prototype.createClockWindow = function () {
  const rect = this.clockWindowRect();
  this._clockWindow = new Window_Clock(rect);
  this.addWindow(this._clockWindow);
};
Scene_Map.prototype.clockWindowRect = function () {
  const icon_size = MAGPIE.KEY.WIN_CLOCK.ICON_SIZE;
  const digits = MAGPIE.KEY.WIN_CLOCK.DIGITS;
  const padding = MAGPIE.KEY.WIN_CLOCK.PADDING;
  const window = icon_size * digits + padding;
  const w = MAGPIE.KEY.WIN_CLOCK.w;
  const raw_x = MAGPIE.KEY.WIN_CLOCK.x;
  const y = MAGPIE.KEY.WIN_CLOCK.y;
  const ww = Math.min(Graphics.boxWidth, Math.max(window, w));
  const x = raw_x > -1 ? raw_x : Graphics.boxWidth - ww;
  const wh = this.calcWindowHeight(1, false);
  const wy = Math.max(0, Math.min(Graphics.boxHeight - wh, y));
  const wx = Math.min(Graphics.boxWidth - ww, x);
  return new Rectangle(wx, wy, ww, wh);
};
Scene_Map.prototype.createDateWindow = function () {
  const rect = this.dateWindowRect();
  this._dateWindow = new Window_Date(rect);
  this.addWindow(this._dateWindow);
};
Scene_Map.prototype.dateWindowRect = function () {
  const icon_size = MAGPIE.KEY.WIN_DATE.ICON_SIZE;
  const digits = MAGPIE.KEY.WIN_DATE.DIGITS;
  const padding = MAGPIE.KEY.WIN_DATE.PADDING;
  const ww = icon_size * digits + padding;
  const wx = MAGPIE.KEY.WIN_DATE.x;
  const wh = this.calcWindowHeight(1, false);
  const wy = MAGPIE.KEY.WIN_DATE.y;
  return new Rectangle(wx, wy, ww, wh);
};
MAGPIE.addons.DateTime._battle_create = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function () {
  MAGPIE.addons.DateTime._battle_create.call(this);
  this.createClockWindow();
  this.createDateWindow();
};
Scene_Battle.prototype.createClockWindow = function () {
  return Scene_Map.prototype.createClockWindow.call(this);
};
Scene_Battle.prototype.createDateWindow = function () {
  return Scene_Map.prototype.createDateWindow.call(this);
};
Scene_Battle.prototype.clockWindowRect = function () {
  return Scene_Map.prototype.clockWindowRect.call(this);
};
Scene_Battle.prototype.dateWindowRect = function () {
  return Scene_Map.prototype.dateWindowRect.call(this);
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > window
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > clock
//------------------------------------------------------------------------

function Window_Clock() {
  this.initialize.apply(this, arguments);
}
Window_Clock.prototype = Object.create(Window_Base.prototype);
Window_Clock.prototype.constructor = Window_Clock;
Window_Clock.prototype.initialize = function (rect) {
  Window_Base.prototype.initialize.call(this, rect);
  this._index = -1;
  this.ToDicon = null;
  this.hour = null;
  this.minute = null;
  this.separator = true;
  this.clockIcons = true;
  this.rect_x = rect.x;
  this.rect_y = rect.y;
  this.rect_w = rect.width;
  this.rect_h = rect.height;
  this.hide();
};
Window_Clock.prototype.digit_x = function (digit = 0, isToD = false) {
  const iSize = MAGPIE.KEY.WIN_CLOCK.ICON_SIZE;
  const ToD_pos = MAGPIE.KEY.WIN_CLOCK.TOD_POS;
  const isPhase = $gameSwitches?.value(MAGPIE.KEY.WIN_CLOCK.IS_PHASE);
  const isDigital = $gameSwitches?.value(MAGPIE.KEY.WIN_CLOCK.IS_DIGITAL);
  if (!isToD && (ToD_pos || !isPhase)) digit--;
  if (isToD && isPhase) ToD_pos && isDigital ? (digit = 5) : (digit = 0);
  return iSize * digit;
};
Window_Clock.prototype.digit_y = function (digit = 0) {
  return 0;
};
MAGPIE.addons.DateTime._clockWin_update = { isTICK: true };
Window_Clock.prototype.updateClock = function () {
  const ePrefix = "[WINDOW_CLOCK].updateClock: ";
  if (!$TIME._get_isTime()) {
    // console.log(ePrefix + "IS_TIME is OFF");
    return;
  }
  this.ToDicon = MAGPIE.addons.DateTime._getPhasesIcon($TIME._get_dayPhase());
  this.hour = $TIME.pad0($TIME.hour);
  this.minute = $TIME.pad0($TIME.minute);
  const isPhase = $gameSwitches.value(MAGPIE.KEY.WIN_CLOCK.IS_PHASE);
  const isDigital = $gameSwitches.value(MAGPIE.KEY.WIN_CLOCK.IS_DIGITAL);
  if (!isPhase && !isDigital) return this.hide();
  const phase = isPhase ? 1 : 0;
  const digits = isDigital ? 5 : 0;
  const padding = MAGPIE.KEY.WIN_CLOCK.PADDING;
  const icon_size = MAGPIE.KEY.WIN_CLOCK.ICON_SIZE;
  this.width = icon_size * (phase + digits) + padding;
  this.x = this.rect_x + this.rect_w - this.width;
  this.show();
  this.createContents();
  if (isPhase) this.drawPhase();
  if (isDigital) this.digits();
};
Window_Clock.prototype.drawPhase = function () {
  this.drawIcon(this.ToDicon, this.digit_x(0, true), this.digit_y());
};
Window_Clock.prototype.digits = function () {
  if (this.clockIcons) this.drawClockDigits();
  else this.writeClockDigits();
};
Window_Clock.prototype.writeClockDigits = function () {
  this.separator = !this.separator;
  const y = this.digit_y();
  this.drawText(this.hour, this.digit_x(1), y, 60, "left");
  if (this.separator) this.drawText(":", this.digit_x(3), y, 30, "left");
  this.drawText(this.minute, this.digit_x(4), y, 60, "left");
};
Window_Clock.prototype.drawClockDigits = function () {
  const icons = MAGPIE.KEY.WIN_CLOCK.ICONS;
  const digits = MAGPIE.KEY.DIGITS;
  const blank = icons.blank;
  const separator = icons.separator;
  const hour_digit_1 = digits[Number(this.hour[0])];
  const hour_digit_2 = digits[Number(this.hour[1])];
  const minute_digit_1 = digits[Number(this.minute[0])];
  const minute_digit_2 = digits[Number(this.minute[1])];
  const hour1x = this.digit_x(1);
  const hour2x = this.digit_x(2);
  const sepax = this.digit_x(3);
  const minute1x = this.digit_x(4);
  const minute2x = this.digit_x(5);
  this.separator = !this.separator;
  const isPhase = $gameSwitches.value(MAGPIE.KEY.WIN_CLOCK.IS_PHASE);
  const isDigital = $gameSwitches.value(MAGPIE.KEY.WIN_CLOCK.IS_DIGITAL);
  const y = this.digit_y();
  this.drawIcon(hour_digit_1, hour1x, y);
  this.drawIcon(hour_digit_2, hour2x, y);
  this.drawIcon(this.separator ? separator : blank, sepax, y);
  this.drawIcon(minute_digit_1, minute1x, y);
  this.drawIcon(minute_digit_2, minute2x, y);
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > date
//------------------------------------------------------------------------
function Window_Date() {
  this.initialize.apply(this, arguments);
}
Window_Date.prototype = Object.create(Window_Base.prototype);
Window_Date.prototype.constructor = Window_Date;
Window_Date.prototype.initialize = function (rect) {
  Window_Base.prototype.initialize.call(this, rect);
  this._index = -1;
  this.year = null;
  this.month = null;
  this.day = null;
  this.dateIcon = MAGPIE.KEY.WIN_CLOCK.ICONS.dateIcon;
  const iSize = MAGPIE.KEY.WIN_DATE.ICON_SIZE;
  this.dateIcon_x = 0;
  this.year_icon_x = this.dateIcon_x + iSize;
  const yx = this.year_icon_x;
  this.year_x = [yx + iSize, yx + iSize * 2, yx + iSize * 3, yx + iSize * 4];
  this.month_icon_x = this.year_x[3] + iSize;
  this.month_x = [this.month_icon_x + iSize, this.month_icon_x + iSize * 2];
  this.day_icon_x = this.month_x[1] + iSize;
  this.day_x = [this.day_icon_x + iSize, this.day_icon_x + iSize * 2];
  this.digits_y = 0;
  this.rect_x = rect.x;
  this.rect_y = rect.y;
  this.rect_w = rect.width;
  this.rect_h = rect.height;
  this.hide();
};
Window_Date.prototype.updateDate = function () {
  this.year = $TIME.pad0($TIME.year, 4);
  this.month = $TIME.pad0($TIME.month);
  this.day = $TIME.pad0($TIME.day);
  const isDate = $gameSwitches.value(MAGPIE.KEY.WIN_CLOCK.IS_DATE);
  if (!isDate) return this.hide();
  this.show();
  this.createContents();
  const digits = MAGPIE.KEY.DIGITS;
  const year0 = digits[Number(this.year[0])];
  const year1 = digits[Number(this.year[1])];
  const year2 = digits[Number(this.year[2])];
  const year3 = digits[Number(this.year[3])];
  const month0 = digits[Number(this.month[0])];
  const month1 = digits[Number(this.month[1])];
  const day0 = digits[Number(this.day[0])];
  const day1 = digits[Number(this.day[1])];
  const y = this.digits_y;
  const iSize = MAGPIE.KEY.WIN_DATE.ICON_SIZE;
  this.drawIcon(this.dateIcon, this.dateIcon_x, y);
  this.drawText("Y", this.year_icon_x, y, iSize, "center");
  this.drawIcon(year0, this.year_x[0], y);
  this.drawIcon(year1, this.year_x[1], y);
  this.drawIcon(year2, this.year_x[2], y);
  this.drawIcon(year3, this.year_x[3], y);
  this.drawText("M", this.month_icon_x, y, iSize, "center");
  this.drawIcon(month0, this.month_x[0], y);
  this.drawIcon(month1, this.month_x[1], y);
  this.drawText("D", this.day_icon_x, y, iSize, "center");
  this.drawIcon(day0, this.day_x[0], y);
  this.drawIcon(day1, this.day_x[1], y);
};
// #endregion
//------------------------------------------------------------------------
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
// #region - Commands
//========================================================================
PluginManager.registerCommand(
  MAGPIE.addons.DateTime.pluginName,
  "setDate",
  (args) => {
    const calendarID = Number(args.calendarID);
    const day = Number(args.day);
    const month = Number(args.month);
    const year = Number(args.year);
    const hour = Number(args.hour) || 0;
    const minute = Number(args.minute) || 0;
    const timezone = Number(args.timezone) || 0;
    const isMaster = args.isMaster;
    const sunrise = Number(args.sunrise);
    const sunset = Number(args.sunset);
    const gameday = Number(args.gameday);
    $TIME.set({
      calendarID,
      day,
      month,
      year,
      hour,
      minute,
      timezone,
      isMaster,
      sunrise,
      sunset,
      gameday,
    });
  },
);
PluginManager.registerCommand(
  MAGPIE.addons.DateTime.pluginName,
  "setCalendar",
  /** @type {calendar_data} */
  (args) => {
    const calendarID = Number(args.calendarID);
    const calendar = MAGPIE.KEY.CALENDARS[calendarID];
    if (!calendar) return;
    calendar.set(args);
  },
);
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
 *
 *
 */
//========================================================================
// END OF FILE
//========================================================================
