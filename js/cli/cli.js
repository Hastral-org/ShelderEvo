/**
 * @namespace SE_CLI
 * @author Matheraptor
 * @version 0.34.0
 * 
 */
const SE_CLI = {};
SE_CLI.meta = {
	name: "M.A.G.P.I.E. (C)ommand (L)ine (I)nterface",
	desc: "",
	version: [0,34,0]
}
SE_CLI.socket = {};
SE_CLI.DOMAIN = "http://localhost:3000"
SE_CLI.DATA = {};
SE_CLI.params = new URLSearchParams(window.location.search);
/**
 * @name 
 * @desc 
 * 
 */
//========================================================================
// #region - TUI 
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Basic
//------------------------------------------------------------------------
SE_CLI.UI = {};
SE_CLI.UI.SEPARATOR = "--------------------------------------------------"
SE_CLI.UI.CONSOLE_GREEN = "color: green; font-weight: bold;"
SE_CLI.INPUT = document.getElementById('cli-input');
SE_CLI.printVersion = function()
{
	const v = SE_CLI.meta.version;
	return `v${v[0]}.${v[1]}.${v[2]}`
}
/**
 * 
 * @param {String} text 
 * @param {String} type 
 * @param {Number} delay 
 * @returns 
 */
SE_CLI.printLine = async function printLine(text, type = "info", delay = 50)
{
	const output = document.getElementById('terminal-output');
	const line = document.createElement("div");
	line.className = `line ${type}`;
	line.innerText = text;
	output.appendChild(line);
	output.scrollTop = output.scrollHeight;
	return new Promise(res => setTimeout(res, delay));
}
SE_CLI.clearBIOS = function ()
{
	document.getElementById("view-splash").style.display = "none"
}
SE_CLI.clearTerminal = function clearTerminal()
{
	const output = document.getElementById('terminal-output');
	output.innerHTML = "";
}
SE_CLI.displayPrompt = function displayPrompt()
{
	const html = document.getElementById("input-line")
	if(html.style.display === "none")
		html.style.display = "flex"
	const user = SE_CLI?.activeUser ? SE_CLI?.activeUser : "unknown-user"
	const moduleName = (SE_CLI.activeModule && SE_CLI.activeModule.name !== 'root') ? SE_CLI.activeModule.name.toUpperCase() : "ROOT";
	const mode = (SE_CLI.activeModule && SE_CLI.activeModule.mode === 'input') ? "[INPUT]" : "";
	const promptString = `${user}@${moduleName}:${mode}>`;
    // THIS IS WHAT WAS MISSING:
    const promptSpan = document.querySelector(".prompt");
    if(promptSpan) {
        promptSpan.innerText = promptString;
    }
    
    return promptString;
}
SE_CLI.clearPrompt = function ()
{
	document.getElementById("input-line").style.display = "none"
}
SE_CLI.updatePromptUI = function updatePromptUI()
{
	const promptEl = document.querySelector('.prompt');
	if(promptEl)
		promptEl.innerText = SE_CLI.displayPrompt();
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Security
//------------------------------------------------------------------------
function switchInputMode(options) 
{
	SE_CLI.INPUT.value = ""
	SE_CLI.INPUT.type = options?.type
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
SE_CLI.BOOT = {};
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Updater
//------------------------------------------------------------------------
SE_CLI.BOOT.updater = async function ()
{
	const ePrefix = "[BOOT | UPDATER]: "
	try
	{
		console.log("placeholder. Skipping...")
		return true
	}	
	catch(e)
	{
		console.error(e.message, e)
		return false
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
// #region > Handoof
//------------------------------------------------------------------------
SE_CLI.BOOT.handoff = async function ()
{
	const message = "Firmware synchronized. Booting 'Shelder Evolution'..."
	await SE_CLI.printLine(message, "success", 1000)
	SE_CLI.clearBIOS()
	SE_CLI.clearTerminal()
	SE_CLI.clearPrompt()
	document.getElementById("view-logo").style.display = "flex"
	await SE_CLI.printLine("", "success", 5000)
	return window.location.href = "/main.html"
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Bootstrap
//------------------------------------------------------------------------
SE_CLI.connect = async function () 
{
	await SE_CLI.printLine(`Establishing secure link to ${SE_CLI.DOMAIN}...`, "info", 200);
	await SE_CLI.initSocket()
	if(SE_CLI.socket.id)
		return true
}
SE_CLI.boot = async function boot() 
{
	await SE_CLI.printLine("\n\n\n\n\n\n")
	await SE_CLI.printLine(`M.A.G.P.I.E. OS ${SE_CLI.printVersion()}`);
	await SE_CLI.printLine("Loading kernel modules...", "info", 500);
	// @todo add a loading spinner here
	return await SE_CLI.BOOT.handoff()
	// @todo bypassing to handoff during development
	let attempt = await SE_CLI.connect();
	if(!attempt) 
	{
		await SE_CLI.printLine("Attempt 2...", "info", 1000)
		attempt = await SE_CLI.connect()
	}
	if(!attempt)
	{
		await SE_CLI.printLine("Attempt 3...", "info", 2000)
		attempt = await SE_CLI.connect()
	}
	if(!attempt)
	{
		await SE_CLI.printLine("Attempt 4...", "info", 5000)
		attempt = await SE_CLI.connect()
	}
	if(!attempt)
	{
		await SE_CLI.printLine("Attempt 5...", "info", 10000)
		attempt = await SE_CLI.connect()
	}
	if(!attempt)
	{
		await SE_CLI.printLine("Max attempts. Please, try again later.", 5000)
	}
}
SE_CLI.root = async function () 
{
	await SE_CLI.switchModule('root');
	await SE_CLI.printLine("Type 'help' to see available commands.", "info", 20);
	await SE_CLI.printLine(SE_CLI.UI.SEPARATOR, "info", 10);
}
// #endregion
//------------------------------------------------------------------------
/**
 * 
 * @desc back to {@link }
*
*/
//========================================================================
// #endregion - BOOT
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//========================================================================
// #region - SOCKET
//========================================================================
SE_CLI.disconnectSocket = function disconnectSocket() 
{
	const id = SE_CLI.socket.id;
	SE_CLI.socket.disconnect()
	SE_CLI.socket = null;
	console.log(`[SOCKET-${id}] disconnected.`)
}
SE_CLI.initSocket = async function initSocket()
{
	return new Promise((resolve, reject) => {
		if(SE_CLI.socket && SE_CLI.socket.id) 
			SE_CLI.disconnectSocket();
		SE_CLI.socket = io(SE_CLI.DOMAIN, {
			auth: {
				token: localStorage.getItem("jwt_token")
			},
			query: {
				entityID: SE_CLI.params.entityID,
				playerID: SE_CLI.params.playerID
			},
			transports: ["websocket", "polling"],
			secure: false,
			reconnection: false
		}) 
		if(!SE_CLI.socket)
			throw new Error("unable to init socket")
		SE_CLI.socket.on("connect", async () => {
			const message = `[SOCKET-${SE_CLI.socket.id}] connected to ${SE_CLI.DOMAIN}.`
			await SE_CLI.printLine(message, "success", 500);
			await SE_CLI.printLine(SE_CLI.UI.SEPARATOR, "info", 2000);
			// Start root module
			SE_CLI.clearBIOS()
			SE_CLI.clearTerminal()
			SE_CLI.displayPrompt()	
			console.log(`%c${message}`, SE_CLI.UI.CONSOLE_GREEN)
			SE_CLI.socket.io.opts.reconnection = true;
			SE_CLI.root();
			resolve(true)
		})
		SE_CLI.socket.on("connect_error", async () => {
			await SE_CLI.printLine("Connection error. Server may be offline. Reconnecting...", "error", 1000)
			resolve()
		})
		const token = localStorage.getItem("jwt_token");
		if(token)
			console.log(`Token found: ${!!token}`)
		SE_CLI.socket.on("boot", async (data) => {
			SE_CLI.KEY = data;
			const message = "[SYSTEM] core initialized."
			console.log(message)
			await SE_CLI.printLine(message)
			resolve()
		})
		SE_CLI.socket.on("REGISTER_SUCCESS", async (data) => {
			await SE_CLI.printLine(`Registration successful. Welcome, ${data.username}!`, "success");
			await SE_CLI.printLine("Please, 'login' to continue.", "info");
			await SE_CLI.switchModule("account")
			resolve()
		})
		SE_CLI.socket.on("REGISTER_ERROR", async (data) => {
			await SE_CLI.printLine(`Registration failed: ${data.message}`, "error")
			resolve()
		})
		SE_CLI.socket.on("LOGIN_SUCCESS", async (data) => {
			SE_CLI.activeUser = data.username
			SE_CLI.SE_CLI.updatePromptUI()
			SE_CLI.clearTerminal()
			await SE_CLI.printLine(`Login successful. Welcome back, ${data.username}!`, "success")
			localStorage.setItem("jwt_token", data.token);
			await SE_CLI.switchModule("updater")
			const update = await SE_CLI.modules.updater.handleInput("fetch")
			if(!update)
				reject("[BOOT] update error.")
			resolve(SE_CLI.BOOT.handoff())
		})
		SE_CLI.socket.on("LOGIN_ERROR", async (data) => {
			await SE_CLI.printLine(`Login failed: ${data.message}`, "error", 5000);
			SE_CLI.resetModule();
			await SE_CLI.switchModule("account");
			resolve()
		})
		SE_CLI.socket.on("RESET_PASSWORD_SUCCESS", async (data) => {
			await SE_CLI.printLine("Password reset email sent.", "success", 5000)
			await SE_CLI.switchModule("account");
			resolve()
		})
		SE_CLI.socket.on("RESET_PASSWORD_ERROR", async (data) => {
			await SE_CLI.printLine("Password reset error. Please, try again.", "error", 5000)
			SE_CLI.resetModule();
			await SE_CLI.switchModule("account")
			resolve()
		})
		SE_CLI.socket.on("FETCH_FIRMWARE_RECEIVE", async (data) => {
			if(!data?.package)

			await SE_CLI.printLine(`Receiving package ${data.package}`)
		})
	})
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
// #region - MODULES
//========================================================================
/**
 * @name 
 * @desc 
 * @typedef {{
 * name: String,
 * mode: String,
 * step: String,
 * tempData: Object,
 * onEnter: () => {},
 * commands: {},
 * stepHandlers: {},
 * handleInput: (rawInput: String) => {}
 * }} cli_module
 */
//------------------------------------------------------------------------
// #region > Handling
//------------------------------------------------------------------------
SE_CLI.modules = {}
SE_CLI.modules.meta = {
	name: `${SE_CLI.meta.name} modules`
}
SE_CLI.activeModule = null

SE_CLI.switchModule = async (moduleName) => 
{
	console.log(`[DEBUG] Switching module to: ${moduleName}`);
	const screen = document.getElementById('crt-screen');
	if(SE_CLI.activeModule && SE_CLI.activeModule.onExit)
		await SE_CLI.activeModule.onExit();
	
	if(SE_CLI.modules[moduleName])
	{
		SE_CLI.activeModule = SE_CLI.modules[moduleName];
		
		// Update container class for layout changes
		SE_CLI.clearTerminal();
		screen.className = `module-${moduleName}`;
		SE_CLI.updatePromptUI();
		if(SE_CLI.activeModule.onEnter)
			await SE_CLI.activeModule.onEnter();
	} 
	else
		await SE_CLI.printLine(`[System Error] Module '${moduleName}' not found.`, "error");
};
SE_CLI.modules.handleInput = async function(rawInput) 
{
	const module = this;
	if(module.mode === "command" || !module.mode)
	{
		const cmd = rawInput.toLowerCase();
		if(cmd === "") return
		await SE_CLI.printLine(`${SE_CLI.displayPrompt()} ${rawInput}`, "user", 0);
		if(module.commands && module.commands[cmd])
			await module.commands[cmd]()
		else await SE_CLI.printLine(`Command not found: ${cmd}`, "error")
	}
	else
	{
		await SE_CLI.printLine(`${SE_CLI.displayPrompt()} [Input Received]`, "user", 0);
		if(module.stepHandlers && module.stepHandlers[module.step])
			await module.stepHandlers[module.step](rawInput, module);
		else await SE_CLI.printLine(`[System Error] No handler configured for ${module.step}`, "error")
	}
}
SE_CLI.resetModule = function resetModule()
{
	SE_CLI.modules.account.mode = "command";
	SE_CLI.modules.account.step = null;
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Root
//------------------------------------------------------------------------
SE_CLI.modules.root = {
	name: "root",
	onEnter: async () => {},
	commands: {
		'help': async () => {
			await SE_CLI.printLine("Available Commands:", "info");
			await SE_CLI.printLine("  - help       : Display this menu", "info");
			await SE_CLI.printLine("  - clear      : clears the terminal screen", "info");
			await SE_CLI.printLine("  - account   	: go to account management", "info");
			await SE_CLI.printLine("  - status     : check server connection status", "info");
			await SE_CLI.printLine("  - exit       : return to main landing page", "info");
		},
		'clear': async () => {
			SE_CLI.clearTerminal();
			await SE_CLI.printLine(`${SE_CLI.displayPrompt()}`, "user", 0);
		},
		'status': async () => {
			await SE_CLI.printLine("Connecting to MAGPIE_Server...", "info");
			// @todo CLI socket check
			await SE_CLI.printLine("STATUS: ONLINE", "success");
			await SE_CLI.printLine("LATENCY: 24ms", "info");
		},
		/**
		 * @desc {@link SE_CLI.modules.account}
		 */
		'account': async () => 
		{
			await SE_CLI.switchModule('account')
		},
		'exit': () => {
			window.location.href = "/";
		}
	},
	handleInput: SE_CLI.modules.handleInput
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Account
//------------------------------------------------------------------------
/** @type {cli_module} */
SE_CLI.modules.account = {
	name: "account",
	mode: "command", 
	step: null,     
	tempData: {},
	renderUI: async () => 
	{
		await SE_CLI.printLine("--- ACCOUNT MANAGEMENT ---", "info");
		await SE_CLI.printLine("Available commands: register, login, resetpassword, back", "info");
	},
	onEnter: async () => {
		await SE_CLI.modules.account.renderUI();
	},
	commands: 
	{
		'register': async () => 
		{
			SE_CLI.modules.account.mode = "input"
			SE_CLI.modules.account.step = "register_email"
			SE_CLI.updatePromptUI();
			await SE_CLI.printLine("Please, enter your email:", "info")
			switchInputMode({type: "email"})
		},
		'login': async () => 
		{
			const module = SE_CLI.modules.account;
			module.mode = "input";
			module.step = "login_email";
			SE_CLI.updatePromptUI();
			await SE_CLI.printLine("Please, enter your email:", "info")
			switchInputMode({type: "email"})
		},
		'resetpassword': async () => 
		{
			const module = SE_CLI.modules.account;
			module.mode = "input";
			module.step = "reset_email";
			SE_CLI.updatePromptUI();
			await SE_CLI.printLine("Please, enter your account email to request a reset link:", "info");
			switchInputMode({type: "email"})
		},
		'back': async () => 
		{
			await SE_CLI.switchModule('root')
		}
	},
	/**
     * @desc Object map defining logic for specific input steps.
     * Easy to expand by simply adding new key-value pairs.
	 * 
     */
	stepHandlers: {
		/** @param {String} input @param {cli_module} module */
		"username": async (input, module) => {
			module.tempData.username = input;
			module.step = "password";
			await SE_CLI.printLine("Please, enter your desired 'password':", "info")
			switchInputMode({type: SE_CLI.KEY.HTML.INPUT.TYPE.PASSWORD})
		},
		/** @param {String} input @param {cli_module} module */
		"password": async (input, module) => {
			const hash = await module.hashPassword(input);
			const payload = {
				email: module.tempData.email,
				username: module.tempData.username,
				passwordHash: hash
			}
			switchInputMode({type: SE_CLI.KEY.HTML.INPUT.TYPE.TEXT})
			SE_CLI.socket.emit("REGISTER", payload);
			// await SE_CLI.printLine("Transmitting credentials (placeholder)...", "info")
			module.mode = "command";
			module.step = null;
			module.tempData = {};
			SE_CLI.updatePromptUI();
		},
		"register_email": async (input, module) => {
			module.tempData.email = input;
			module.step = "username";
			await SE_CLI.printLine("Please, enter your desired username:", "info");
			switchInputMode({type: "text"})
		},
		"login_email": async (input, module) => {
			module.tempData.email = input;
			module.step = "login_password";
			await SE_CLI.printLine("Please, enter your password:", "info");
			switchInputMode({type: "password"})
		},
		"login_password": async (input, module) => {
			const payload = {
				email: module.tempData.email,
				password: input
			}
			switchInputMode({type: "text"})
			SE_CLI.socket.emit("LOGIN", payload)
			// await SE_CLI.printLine("Transmitting credentials...", "info")
		},
		"reset_email": async (input, module) => {
			const payload = {
				email: input
			}
			switchInputMode({type: "text"})
			SE_CLI.socket.emit("RESET_PASSWORD_REQUEST", payload)
			// await SE_CLI.printLine("Transmitting reset request to MAGPIE_Server...", "info")
			module.mode = "command"
			module.step = null;
			SE_CLI.updatePromptUI();
		}
	},
	handleInput: SE_CLI.modules.handleInput,
	hashPassword: async (password) =>
	{
		const msgUint8 = new TextEncoder().encode(password);
		const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
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
// #region > Updater
//------------------------------------------------------------------------
/** @type {cli_module} */
SE_CLI.modules.updater = {
	name: "updater",
	mode: "command",
	step: null,
	tempData: {},
	renderUI: async () => {
		await SE_CLI.printLine("--- FIRMWARE UPDATE ---", "info")
		// await SE_CLI.printLine("Available commands: fetch, pull, back")
	},
	onEnter: async () => {
		await SE_CLI.modules.updater.renderUI()
	},
	commands: {},
	stepHandlers: {
		"fetch": async (input, module) => {
			module.step = null;
			await SE_CLI.printLine("Fetching firmware data from server...", "info")
			const payload = {
				version: SE_CLI.meta.version
			}
			SE_CLI.socket.emit("FETCH_FIRMWARE", payload)
		}
	},
	handleInput: {}
}
// #endregion
//------------------------------------------------------------------------
/**
 * 
 * @desc back to {@link SE_CLI.modules.meta}
 *
 */
//========================================================================
// #endregion - MODULES
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
// #region - EVENTS
//===================================================================
SE_CLI.INPUT.focus();
SE_CLI.INPUT.addEventListener('keydown', async (e) => {
	if(e.key === 'Enter') 
	{
		const rawInput = SE_CLI.INPUT.value.trim();
		SE_CLI.INPUT.value = "";
		
		if (SE_CLI.activeModule) {
			await SE_CLI.activeModule.handleInput(rawInput);
		} else {
			await SE_CLI.printLine(`[System Error] No active module to handle input.`, "error");
		}
	}
});
/**
 * 
 * @desc back to {@link }
 *
 */
//========================================================================
// #endregion - 
//========================================================================
SE_CLI.boot();