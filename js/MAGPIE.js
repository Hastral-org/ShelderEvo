//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [TIER_0] v0.34.0 MAGPIE_Server backend connector
 * @author Matheraptor
 * @url https://shelderevolution.org
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
 * v0.34.0 2026 06 04
 * - initial build
 */
//#endregion
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//========================================================================
// #region - CLASS
//========================================================================
const MAGPIE = {};
MAGPIE.meta = {
	name: "M.A.G.P.I.E.",
	desc: "(M)odular (A)ltorithmic (G)eneral-(P)urpose (I)intelligence (E)ngine",
	version: [0,34,0],
	firmwareName: "MAGPIE",
	firmwareDate: "20260604"
}
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
// #region - INDEX
//========================================================================
MAGPIE.params = new URLSearchParams(window.location.search);
MAGPIE.DATA = {};
MAGPIE.DATA.ENTITYID = MAGPIE.params.get("entityID");
MAGPIE.DATA.PLAYERID = MAGPIE.params.get("playerID");
MAGPIE.DATA.connected = false;
MAGPIE.CLI = {}
MAGPIE.KEY = {};
MAGPIE.BOOT = {}

MAGPIE.SOCKET = io("http://localhost:3000", {
	auth: {
		token: localStorage.getItem("jwt_token")
	},
	query: {
		entityID: MAGPIE.DATA.ENTITYID,
		playerID: MAGPIE.DATA.PLAYERID
	},
	transports: ["websocket", "polling"],
	secure: false
})
MAGPIE.SOCKET.on("connect_error", (e) => {
	console.error("%c[SOCKET] [ERROR]: ", "color: red; font-weight: bold;", e.message, e)
})
MAGPIE.SOCKET.on("connect", () => {
	console.log(`%c Connected to server! ID: ${MAGPIE.SOCKET.id}`, "color: green; font-weight: bold;")
	MAGPIE.DATA.connected = true;
	MAGPIE.BOOT.route()
})
MAGPIE.SOCKET.on("LOGIN_SUCCESS", (data) => {
	console.log(`%c[AUTH] Authentication successful! Welcome, ${data.username}.`, "color: #00ff00")
	localStorage.setItem("jwt_token", data.token);
	MAGPIE.SOCKET.auth = { token: data.token }
	MAGPIE.CLI.activeUser = data.username;
	MAGPIE.CLI.printLine(`Login successful. Welcome back, ${data.username}!`, "success");
	MAGPIE.BOOT.updater();
})
MAGPIE.SOCKET.on("LOGIN_ERROR", (data) => {
	console.error("%c[AUTH ERROR]: ", "color: red; font-weight: bold;", data.message);
})
MAGPIE.SOCKET.on("metastate", (data) => {
	MAGPIE.DATA.TIME = data.date;
})

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
// #region - ROUTER
//========================================================================
MAGPIE.ROUTER = {};
MAGPIE.ROUTER.go = function(view)
{
	document.querySelectorAll("section").forEach(s => s.style.display = "none")
	document.getElementById(`view-${view}`).style.display = "block"
}
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
// #region - CLI
//========================================================================
MAGPIE.CLI.login = function()
{
	//@todo CLI boot
	console.log("[DEBUG] ready for login")
}
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Tui
//------------------------------------------------------------------------
MAGPIE.CLI.printVersion = function()
{
	const v = MAGPIE.meta.version;
	return `v${v[0]}.${v[1]}.${v[2]}`
}
MAGPIE.CLI.BIOS_HEADER = `${MAGPIE.meta.desc} <br>SYSTEM BIOS `
	+ `${MAGPIE.CLI.printVersion()}`
	+ "<br>Ⓒ 2026 MATHERAPTOR @ MAEDASHELADI CORP."
MAGPIE.CLI.bios = function()
{
	const header = document.getElementById("bios-header")
	if(header)
		header.innerHTML = MAGPIE.CLI.BIOS_HEADER
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
// #region - UTILITY
//========================================================================
MAGPIE.UTILITY = {};
MAGPIE.UTILITY.pad = function (num, length = 2) 
{
	return num.toString().padStart(length, 0)
}
/**
 * 
 * @param {*} date 
 */
MAGPIE.UTILITY.printTimestring = function (date)
{
	const pad = MAGPIE.UTILITY.pad;
	const year = date.year;
	const month = pad(date.month)
	const monthName = Object.keys(data.calendar.months)[date.month - 1];
	const day = pad(date.day)
	const hour = pad(date.hour)
	const minute = pad(date.minute)
	const second = pad(date.second)
	const weekDay = data.weekDayName;
	const timestring = `${year}/${month}/${day} ${weekDay} - ${hour}:${minute}:${second}Z`
}
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
MAGPIE.BOOT = {};
MAGPIE.BOOT.route = function()
{
	const token = localStorage.getItem("jwt_token");
	if (token)
		return window.location.href = "js/main.html";
	if(MAGPIE.DATA.connected)
	{
		MAGPIE.ROUTER.go('cli');
		if(window.ShelderEvo_CLI && typeof window.ShelderEvo_CLI.initSocket === "function")
		{
			window.ShelderEvo_CLI.initSocket()
			window.ShelderEvo_CLI.switchModule("account")
		}
	}
	// window.location.href = "js/cli/index.html";
};
MAGPIE.BOOT.handshake = async function()
{
	console.log("[BOOT] Initiating handshake...");
};
MAGPIE.BOOT.updater = function ()
{
	//@todo boot updater
}
MAGPIE.boot = function ()
{
	//@todo boot sequence
	const splashView = document.getElementById("view-splash")
	if(splashView)
		splashView.style.display = "block"
	MAGPIE.CLI.bios()
	MAGPIE.BOOT.handshake();
}
/**
 * 
 * @desc back to {@link }
 *
 */
//========================================================================
// #endregion - 
//========================================================================
MAGPIE.boot();