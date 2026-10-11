/*:
 * @target MZ
 * @plugindesc [Tier 0] v0.39.973 MAGPIE cli
 * @author Matheraptor
 *
 * @help
 *
 *
 * @url
 */
/**
 * @namespace SE_CLI
 * @author Matheraptor
 * @version 0.39.973
 *
 * @desc links:
 * - [entry point html](../../index.html)
 * - [entry point css](../../css/cli.css)
 */
//========================================================================
//#region - INDEX
//========================================================================
class SE_CLI {
  //
}
SE_CLI.meta = {
  name: "M.A.G.P.I.E. (C)ommand (L)ine (I)nterface",
  desc: "",
  version: [0, 39, 973],
  firmwareDate: "20260727",
};
SE_CLI.socket = {};
SE_CLI.DATA = {};
SE_CLI.DOMAIN = null;
SE_CLI.SECURE = null;
SE_CLI.LOCAL = null;
SE_CLI.DATA.PLAYER_ID = NaN;
SE_CLI.DATA.ENTITY_ID = NaN;
SE_CLI.DATA.PLAYER = null;
SE_CLI.DATA.JWT_TOKEN = "";
SE_CLI.DATA.MODULE = null;
SE_CLI.params = new URLSearchParams(window.location.search);
const fetch = globalThis?.fetch ? globalThis.fetch : window.fetch;
const fs = require("fs");
SE_CLI.env = fs.readFileSync(process.cwd() + "/.env", "utf-8");
require("./js/plugins/app/node_modules/dotenv").config();
//#endregion
//========================================================================
/**
 * @name
 * @desc
 *
 */
//========================================================================
// #region - TUI
//========================================================================
SE_CLI.UI = {};
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Assets
//------------------------------------------------------------------------

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Render
//------------------------------------------------------------------------

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Basic
//------------------------------------------------------------------------
SE_CLI.UI.SEPARATOR = "--------------------------------------------------";
SE_CLI.UI.CONSOLE_GREEN = "color: green; font-weight: bold;";
SE_CLI.INPUT = document.getElementById("cli-input");
SE_CLI.printVersion = function () {
  const v = SE_CLI.meta.version;
  return `v${v[0]}.${v[1]}.${v[2]}`;
};
/**
 *
 * @param {String} text
 * @param {String} type
 * @param {Number} delay
 * @returns
 */
SE_CLI.printLine = async function printLine(text, type = "info", delay = 50) {
  const output = document.getElementById("terminal-output");
  if (output) {
    const line = document.createElement("div");
    line.className = `line ${type}`;
    line.innerText = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }
  const consoleArgs = [text];
  if (type === "error") consoleArgs.unshift("Error: %O");
  consoleLog = console.hasOwnProperty(type) ? console[type] : console.log;
  if (typeof consoleLog === "function") consoleLog(...consoleArgs);
  else consoleLog(...consoleArgs);
  return new Promise((res) => setTimeout(res, delay));
};
SE_CLI.clearBIOS = function () {
  // document.getElementById("view-splash").style.display = "none";
  document.getElementById("view-container").innerHTML = "";
};
SE_CLI.clearTerminal = function clearTerminal() {
  const output = document.getElementById("terminal-output");
  output.innerHTML = "";
};
SE_CLI.displayPrompt = function displayPrompt() {
  const html = document.getElementById("input-line");
  if (html.style.display === "none") html.style.display = "flex";
  const user = SE_CLI?.activeUser ? SE_CLI?.activeUser : "unknown-user";
  const moduleName =
    SE_CLI.activeModule && SE_CLI.activeModule.name !== "root"
      ? SE_CLI.activeModule.name.toUpperCase()
      : "ROOT";
  const mode = SE_CLI.activeModule?.mode || "";
  const promptString = `${user}@${moduleName}:${mode}>`;
  // THIS IS WHAT WAS MISSING:
  const promptSpan = document.querySelector(".prompt");
  if (promptSpan) {
    promptSpan.innerText = promptString;
  }

  return promptString;
};
SE_CLI.clearPrompt = function () {
  document.getElementById("input-line").style.display = "none";
};
SE_CLI.updatePromptUI = function updatePromptUI() {
  const promptEl = document.querySelector(".prompt");
  if (promptEl) promptEl.innerText = SE_CLI.displayPrompt();
};
SE_CLI.resetTUI = function resetTUI() {
  const win = typeof nw !== "undefined" ? nw.Window.get() : null;
  if (win?.constructor?.name === "NWWindow") {
    win.setResizable(true);
    win.unmaximize();
    win.resizeTo(750, 750);
    win.setPosition("center");
  }
};
SE_CLI.isProduction = null;
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
SE_CLI.switchInputMode = function switchInputMode(options) {
  SE_CLI.INPUT.value = "";
  SE_CLI.INPUT.type = options?.type;
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
SE_CLI.BOOT.updater = async function () {
  const ePrefix = "[BOOT | UPDATER]: ";
  try {
    console.log("placeholder. Skipping...");
    return true;
  } catch (e) {
    console.error(e.message, e);
    return false;
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
// #region > Handoff
//------------------------------------------------------------------------
SE_CLI.BOOT.handoff = async function () {
  const message = "Firmware synchronized. Booting 'Shelder Evolution'...";
  await SE_CLI.printLine(message, "success", 1000);
  SE_CLI.clearBIOS();
  SE_CLI.clearTerminal();
  SE_CLI.clearPrompt();
  SE_CLI.go("logo");
  await SE_CLI.printLine("", "success", 1000);
  await SE_CLI.printLine("Handing off to RMMZ engine...");
  await SE_CLI.printLine("Exporting browser state...");
  SE_CLI.HANDOFF.manager.exportState();
  SE_CLI.launchGame();
};
SE_CLI.launchGame = function () {
  return (window.location.href = "/main.html");
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Kernel
//------------------------------------------------------------------------
SE_CLI.kernel = async function () {
  SE_CLI.DOMAIN = process.env.DOMAIN;
  SE_CLI.SECURE = process.env.SECURE;
  SE_CLI.LOCAL = process.env.LOCAL;
  const allowedEnv = {
    NODE_ENV: process.env.NODE_ENV || "production",
    DOMAIN: SE_CLI.DOMAIN || "http://localhost:3000",
    SECURE: SE_CLI.SECURE || false,
    LOCAL: SE_CLI.LOCAL,
  };
  for (const key in process.env) {
    if (process.env.hasOwnProperty(key)) delete process.env[key];
  }
  Object.assign(process.env, allowedEnv);
};
SE_CLI.decompile = function () {
  // Resolve path to the app directory inside execution context
  const appPath = path.join(process.cwd(), "js", "plugins", "app");
  const manifestFile = path.join(appPath, "load-manifest.json");

  if (typeof nw !== "undefined" && fs.existsSync(manifestFile)) {
    try {
      // Read the exact loading sequence list array
      const binaryExecutionSequence = JSON.parse(
        fs.readFileSync(manifestFile, "utf8"),
      );

      binaryExecutionSequence.forEach((binaryName) => {
        const fullBinaryPath = path.join(appPath, binaryName);
        if (fs.existsSync(fullBinaryPath)) {
          // Execute the binary directly inside the global chromium context
          nw.Window.get().evalNWBin(null, fullBinaryPath);
        }
      });
      console.log(
        "[+] Secure binary namespaces registered to window context successfully.",
      );
    } catch (error) {
      console.error("[-] Failed executing binary module loop:", error);
    }
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
// #region > Bootstrap
//------------------------------------------------------------------------
SE_CLI.connect = async function () {
  await SE_CLI.printLine(
    `Establishing secure link to ${SE_CLI.DOMAIN}...`,
    "info",
    200,
  );
  try {
    await SE_CLI.initSocket();
    if (SE_CLI.socket && SE_CLI.socket.id) return true;
  } catch (error) {
    return false;
  }
  return false;
};
SE_CLI.boot = async function boot() {
  SE_CLI.resetTUI();
  SE_CLI.go("splash");
  // document.getElementById("view-splash").textContent = SE_CLI.UI.SPLASH;
  // document.getElementById("copyright").textContent = SE_CLI.UI.COPYRIGHT;
  // await SE_CLI.printLine("\n\n\n\n\n\n\n\n", "info", 500);
  await SE_CLI.printLine(`M.A.G.P.I.E. OS ${SE_CLI.printVersion()}`);
  await SE_CLI.printLine("Loading kernel modules...", "info", 500);
  await SE_CLI.kernel();
  if (SE_CLI.LOCAL) {
    await SE_CLI.printLine("App version set to 'LOCAL'.", 500);
    await SE_CLI.printLine("Launching ShelderEvo(tm) in LOCAL_MODE...", 500);
    return SE_CLI.launchGame();
  }
  // @todo add a loading spinner here
  let attempt = await SE_CLI.connect();
  if (!attempt) {
    await SE_CLI.printLine("Attempt 2...", "warn", 1000);
    attempt = await SE_CLI.connect();
  }
  if (!attempt) {
    await SE_CLI.printLine("Attempt 3...", "warn", 2000);
    attempt = await SE_CLI.connect();
  }
  if (!attempt) {
    await SE_CLI.printLine("Attempt 4...", "warn", 5000);
    attempt = await SE_CLI.connect();
  }
  if (!attempt) {
    await SE_CLI.printLine("Attempt 5...", "warn", 10000);
    attempt = await SE_CLI.connect();
  }
  if (!attempt) {
    await SE_CLI.printLine(
      "Max attempts. Please, try again later.",
      "warn",
      5000,
    );
  }
  // await SE_CLI.BOOT.handoff()
};
SE_CLI.root = async function () {
  await SE_CLI.switchModule("root");
  await SE_CLI.printLine(SE_CLI.UI.SEPARATOR, "info", 10);
  // await SE_CLI.printLine("Type 'help' to see available commands.", "info", 20);
  await SE_CLI.modules.root.handleInput("help");
  const token = localStorage.getItem("jwt_token");
  // if(token)
  // {
  // 	console.log(`Token found: ${token}`)
  // 	const data = SE_CLI.decodeToken(token)
  // 	const username = data.username;
  // 	const playerID = data.id;
  // 	SE_CLI.activeUser = username
  // 	SE_CLI.DATA.PLAYER_ID = playerID;
  // 	SE_CLI.updatePromptUI()
  // 	await SE_CLI.printLine(`Welcome back, ${username}!`, "info")
  // 	if(!SE_CLI.DATA.PLAYER)
  // 		return SE_CLI.socket.emit("RELOG", {
  // 			playerID: playerID,
  // 			token: token
  // 		})
  // 	if(SE_CLI.DATA.PLAYER.slots.length < 1)
  // 		return SE_CLI.switchModule("adopt")
  // 	await SE_CLI.BOOT.handoff()
  // }
};
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
// #region - HTTP
//========================================================================
/**
 *
 * @param {String} request
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
SE_CLI.sendRequest = async function (request, payload) {
  const ePrefix = "[HTTP REQUEST] ";
  try {
    if (!request || request.charAt(0) !== "/")
      throw new Error(`${request} is invalid HTTP route. `);
    if (!payload || typeof payload !== "object")
      throw new Error(`${payload} is invalid HTTP payload. `);
    const response = await fetch(`${SE_CLI.DOMAIN}${request}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    await SE_CLI.printLine(e.message, "error", 100);
  }
};
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
 *
 */
//------------------------------------------------------------------------
// #region > Init
//------------------------------------------------------------------------

SE_CLI.initSocket = async function initSocket() {
  const ePrefix = "[SOCKET] ";
  if (!SE_CLI.DOMAIN) throw new Error(`${ePrefix}DOMAIN undefined. `);
  const isAlreadyConnected = SE_CLI.socket && SE_CLI.socket.connected;
  if (isAlreadyConnected) SE_CLI.disconnectSocket();
  /** @type {import("socket.io-client").Socket} */
  SE_CLI.socket = io(SE_CLI.DOMAIN, {
    auth: {
      token: localStorage.getItem("jwt_token"),
    },
    query: {
      entityID: SE_CLI.DATA.ENTITY_ID,
      playerID: SE_CLI.DATA.PLAYER_ID,
    },
    transports: ["websocket", "polling"],
    secure: SE_CLI.SECURE,
    reconnection: false,
  });
  SE_CLI.socket.on("connect", async () => {
    const message = `${ePrefix}[SOCKET-${SE_CLI.socket.id}] connected.`;
    window.socket = SE_CLI.socket;
    await SE_CLI.printLine(message, "success", 500);
    await SE_CLI.printLine(SE_CLI.UI.SEPARATOR, "info", 2000);
    // Start root module
    SE_CLI.clearBIOS();
    SE_CLI.clearTerminal();
    SE_CLI.displayPrompt();
    console.log(`%c${message}`, SE_CLI.UI.CONSOLE_GREEN);
    const isLoggedIn = localStorage.getItem("playerID");
    SE_CLI.socket.io.opts.reconnection = true;
    // @audit SE_CLI.root();
    SE_CLI.socket.emit("request_server_keys");
    if (Number(isLoggedIn)) {
      console.log(
        `[SOCKET] [am_I_allowed_back_in] [playerID-${isLoggedIn}] found in localStorage`,
      );
      socket.emit("am_I_allowed_back_in", {
        playerID: isLoggedIn,
      });
    } else {
      SE_CLI.go("login");
    }
  });
  SE_CLI.socket.on("connect_error", async (err) => {
    const message = "Connection error. Server may be offline. Reconnecting...";
    await SE_CLI.printLine(`${ePrefix}${message}`, "error", 1000);
    if (err.message.includes("401")) {
      console.warn("[SOCKET] [connect_error] Stale or invalid token.");
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("playerID");
      localStorage.removeItem("playerUsername");
      await SE_CLI.switchModule("account");
    }
  });
  SE_CLI.socket.on("server_keys", (data) => {
    SE_CLI.KEY = data;
    SE_CLI.isProduction = !Boolean(SE_CLI.KEY?.SERVER?.IS_DEV);
    const message = `[SOCKET] [server_keys] received ${Object.keys(data).length}x keys. `;
    console.log(message);
  });

  SE_CLI.socket.on("DEBUG", (data) => {
    console.log(Object.entries(data));
    MAGPIE_CLIENT.DATA.DEBUG = data;
  });
  SE_CLI.socket.on("disconnect", async () => {
    await SE_CLI.printLine(
      `${ePrefix}Connection lost. Server may be offline.`,
      "error",
      1000,
    );
    // resolve();
  });
  SE_CLI.socket.on("RESUME_SESSION_SUCCESS", async (data) => {
    //@todo resume session
  });
  SE_CLI.socket.on("RESUME_SESSION_FAIL", async (data) => {
    //@todo SE_CLI.socket.on("RESUME_SESSION_FAIL")
  });
  SE_CLI.socket.on("REGISTER_SUCCESS", async (data) => {
    await SE_CLI.printLine(
      `Registration successful. Welcome, ${data.username}!`,
      "success",
    );
    await SE_CLI.printLine("Please, 'login' to continue.", "info");
    await SE_CLI.switchModule("account");
    // resolve();
  });
  SE_CLI.socket.on("REGISTER_ERROR", async (data) => {
    await SE_CLI.printLine(`Registration failed: ${data.message}`, "error");
  });
  SE_CLI.socket.on("LOGIN_SUCCESS", async (data) => {
    await SE_CLI.printLine(`[SOCKET] [LOGIN_SUCCESS] [${data?.code}]`);
    SE_CLI.loginSuccess(data);
    // resolve();
  });
  SE_CLI.socket.on("LOGIN_ERROR", async (data) => {
    await SE_CLI.printLine(`[SOCKET] [LOGIN_ERROR] [${data?.code}]`);
    SE_CLI.loginFail(data);
    // resolve();
  });
  SE_CLI.socket.on("RESET_PASSWORD_SUCCESS", async (data) => {
    await SE_CLI.printLine("Password reset email sent.", "success", 5000);
    await SE_CLI.switchModule("account");
    // resolve();
  });
  SE_CLI.socket.on("RESET_PASSWORD_ERROR", async (data) => {
    await SE_CLI.printLine(
      "Password reset error. Please, try again.",
      "error",
      5000,
    );
    SE_CLI.resetModule("account");
    await SE_CLI.switchModule("account");
    // resolve();
  });
  SE_CLI.socket.on("FETCH_FIRMWARE_RECEIVE", async (data) => {
    if (!data?.package)
      await SE_CLI.printLine(`Receiving package ${data.package}`);
  });
  SE_CLI.socket.on("request_sync_error", async (data) => {
    await SE_CLI.printLine(data?.message, "error");
  });
  SE_CLI.socket.on("request_sync_success", async (data) => {
    await SE_CLI.printLine(
      `[PLAYER-${data.ID} | ${data?.playerUsername}] synced.`,
    );
    SE_CLI.DATA.PLAYER = {
      ID: data.playerID,
      playerUsername: data.playerUsername,
      creatureID: data.creatureID,
      playerEVP: data.playerEVP,
      playerCLOUT: data.playerCLOUT,
      playerSlots: data.playerSlots,
      playerStatus: true,
    };
    SE_CLI.DATA.PLAYER_ID = data.playerID;
    SE_CLI.activeUser = data.playerUsername;
  });
  SE_CLI.socket.on("LOGGED_OUT", async (data) => {
    await SE_CLI.printLine(`[SOCKET] [LOGGED_OUT] [${data?.code}] `);
    localStorage.clear();
    SE_CLI.go("login");
  });
  SE_CLI.socket.on("RESUME_SESSION_SUCCES", async (response) => {
    await SE_CLI.printLine(
      `[SOCKET] [RESUME_SESSION_SUCCES] [${response?.code}]`,
    );
    SE_CLI.loginSuccess(response);
    // resolve();
  });
  SE_CLI.socket.on("RESUME_SESSION_FAIL", async (data) => {
    await SE_CLI.printLine(`[SOCKET] [RESUME_SESSION_FAIL] [${data?.message}]`);
    SE_CLI.loginFail(data);
    // resolve();
  });
  SE_CLI.socket.on("isAllowedBackIn", async (data) => {
    const handle = `[PLAYER-${data?.playerData?.playerID}]`;
    await SE_CLI.printLine(`[SOCKET] [isAllowedBackIn] ${handle}`);
    SE_CLI.loginSuccess(data);
    // resolve();
  });
  SE_CLI.socket.on("sessionExpired", async () => {
    await SE_CLI.printLine("[SOCKET] [sessionExpired]");
    localStorage.clear();
    SE_CLI.go("login");
  });
  return new Promise((resolve, reject) => {
    SE_CLI.socket.on("connect", () => resolve(true));
    SE_CLI.socket.on("connect_error", (err) => reject(err));
  });
};
SE_CLI.printSocket = function () {
  return `[SOCKET-${SE_CLI.socket?.id}]`;
};
SE_CLI.disconnectSocket = function disconnectSocket() {
  const id = SE_CLI.socket.id;
  SE_CLI.socket.disconnect();
  SE_CLI.socket = null;
  console.log(`${SE_CLI.printSocket()} disconnected.`);
};
// #endregion
//------------------------------------------------------------------------
SE_CLI.sync = function (data) {
  if (SE_CLI.DATA.JWT_TOKEN !== data.token) {
    console.error("[SYNC] token mismatch. Relogging...");
    return SE_CLI.login();
  }
  // SE_CLI.DATA.PLAYER = {
  //   ID: player.ID,
  //   username: player.username,
  //   email: player.email,
  //   creatureID: player.creatureID,
  //   EVP: player.EVP,
  //   CLOUT: player.CLOUT,
  //   slots: player.slots,
  //   status: player.status,
  // };
  // SE_CLI.DATA.SERVER = data.server;
  // return true;
};

SE_CLI.initSocketRMMZ = async function initSocketRMMZ() {
  const ePrefix = "[RMMZ-SOCKET] ";
  return new Promise((resolve, reject) => {
    if (SE_CLI.socket && SE_CLI.socket.id && SE_CLI.socket.connected)
      return resolve(true);
    if (SE_CLI.socket && SE_CLI.socket.id) SE_CLI.disconnectSocket();
    SE_CLI.socket = io(SE_CLI.DOMAIN, {
      auth: { token: localStorage.getItem("jwt_token") },
      query: {
        entityID: SE_CLI.DATA.ENTITY_ID,
        playerID: SE_CLI.DATA.PLAYER_ID,
      },
      transports: ["websocket", "polling"],
      secure: SE_CLI.SECURE,
      reconnection: true,
    });
    SE_CLI.socket.on("connect", () => {
      console.log(ePrefix + `Connected: ${SE_CLI.socket.id}`);
      window.socket = SE_CLI.socket;
      resolve(true);
    });
    SE_CLI.socket.on("connect_error", (err) => {
      console.error(`${ePrefix}Connection error: ${err.message}`);
      resolve(false);
    });
    SE_CLI.socket.on("server_ticket", (ticket) => {
      const level = "[server_ticket] ";
      console.warn(ePrefix + level + `[${ticket?.code}] ${ticket?.message}`);
    });
  });
};
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
SE_CLI.modules = {};
SE_CLI.modules.meta = {
  name: `${SE_CLI.meta.name} modules`,
};
SE_CLI.activeModule = null;
SE_CLI.activeUser = null;
SE_CLI.switchModule = async (moduleName) => {
  console.log(`[DEBUG] Switching module to: ${moduleName}`);
  const screen = document.getElementById("crt-screen");
  if (SE_CLI.activeModule && SE_CLI.activeModule.onExit)
    await SE_CLI.activeModule.onExit();

  if (SE_CLI.modules[moduleName]) {
    SE_CLI.activeModule = SE_CLI.modules[moduleName];

    // Update container class for layout changes
    SE_CLI.clearTerminal();
    screen.className = `module-${moduleName}`;
    SE_CLI.updatePromptUI();
    if (SE_CLI.activeModule.onEnter) await SE_CLI.activeModule.onEnter();
  } else
    await SE_CLI.printLine(
      `[System Error] Module '${moduleName}' not found.`,
      "error",
    );
};
SE_CLI.modules.handleInput = async function (rawInput) {
  const module = this;
  if (module.mode === "command" || !module.mode) {
    const cmd = rawInput.toLowerCase();
    if (cmd === "") return;
    await SE_CLI.printLine(`${SE_CLI.displayPrompt()} ${rawInput}`, "user", 0);
    if (module.commands && module.commands[cmd]) await module.commands[cmd]();
    else await SE_CLI.printLine(`Command not found: ${cmd}`, "error");
  } else {
    await SE_CLI.printLine(
      `${SE_CLI.displayPrompt()} [Input Received]`,
      "user",
      0,
    );
    if (module.stepHandlers && module.stepHandlers[module.step])
      await module.stepHandlers[module.step](rawInput, module);
    else
      await SE_CLI.printLine(
        `[System Error] No handler configured for ${module.step}`,
        "error",
      );
  }
};
SE_CLI.resetModule = function resetModule(module) {
  const ePrefix = "[CLI].resetModule: ";
  try {
    if (!module) module = SE_CLI.activeModule?.name;
    if (!module) throw new Error(`${module} is invalid module. `);
    SE_CLI.modules[module].mode = "command";
    SE_CLI.modules[module].step = null;
    SE_CLI.modules[module].tempData = {};
    SE_CLI.updatePromptUI();
  } catch (e) {
    SE_CLI.error(ePrefix + e.message, e);
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
// #region > Root
//------------------------------------------------------------------------
SE_CLI.modules.root = {
  name: "root",
  mode: "command",
  step: null,
  tempData: {},
  onEnter: async () => {
    SE_CLI.DATA.MODULE = SE_CLI.modules.root.name;
    // SE_CLI.modules.root.handleInput("help")
  },
  commands: {
    help: async () => {
      SE_CLI.clearTerminal();
      await SE_CLI.printLine(SE_CLI.UI.SEPARATOR, "info", 10);
      await SE_CLI.printLine("Available Commands:", "info");
      await SE_CLI.printLine("  - help\t: Display this menu", "info");
      await SE_CLI.printLine("  - clear\t: clears the terminal screen", "info");
      await SE_CLI.printLine("  - account\t: go to account management", "info");
      await SE_CLI.printLine(
        "  - status\t: check server connection status",
        "info",
      );
      await SE_CLI.printLine("  - exit\t: return to main landing page", "info");
      await SE_CLI.printLine(SE_CLI.UI.SEPARATOR, "info", 10);
    },
    clear: async () => {
      SE_CLI.clearTerminal();
      await SE_CLI.printLine(`${SE_CLI.displayPrompt()}`, "user", 0);
    },
    status: async () => {
      await SE_CLI.printLine("Connecting to MAGPIE_Server...", "info");
      // @todo CLI socket check
      await SE_CLI.printLine("STATUS: ONLINE", "success");
      await SE_CLI.printLine("LATENCY: 24ms", "info");
    },
    /**
     * @desc {@link SE_CLI.modules.account}
     */
    account: async () => {
      await SE_CLI.switchModule("account");
    },
    exit: () => {
      window.location.href = "/";
    },
  },
  handleInput: SE_CLI.modules.handleInput,
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
  renderUI: async () => {
    await SE_CLI.printLine("--- ACCOUNT MANAGEMENT ---", "info");
    await SE_CLI.printLine(
      "Available commands: register, login, resetpassword, back",
      "info",
    );
  },
  onEnter: async () => {
    await SE_CLI.modules.account.renderUI();
    SE_CLI.DATA.MODULE = SE_CLI.modules.account.name;
  },
  commands: {
    register: async () => {
      SE_CLI.modules.account.mode = "input";
      SE_CLI.modules.account.step = "register_email";
      SE_CLI.updatePromptUI();
      await SE_CLI.printLine("Please, enter your email:", "info");
      SE_CLI.switchInputMode({ type: "email" });
    },
    login: async () => {
      const module = SE_CLI.modules.account;
      module.mode = "input";
      module.step = "login_email";
      SE_CLI.updatePromptUI();
      await SE_CLI.printLine("Please, enter your email:", "info");
      SE_CLI.switchInputMode({ type: "email" });
    },
    resetpassword: async () => {
      const module = SE_CLI.modules.account;
      module.mode = "input";
      module.step = "reset_email";
      SE_CLI.updatePromptUI();
      await SE_CLI.printLine(
        "Please, enter your account email to request a reset link:",
        "info",
      );
      SE_CLI.switchInputMode({ type: "email" });
    },
    back: async () => {
      await SE_CLI.switchModule("root");
    },
  },
  /**
   * @desc Object map defining logic for specific input steps.
   * Easy to expand by simply adding new key-value pairs.
   *
   */
  stepHandlers: {
    register_email: async (input, module) => {
      module.tempData.email = input;
      module.step = "register_username";
      await SE_CLI.printLine(`Register email: '${module.tempData.email}'`);
      await SE_CLI.printLine("Please, enter your desired username:", "info");
      SE_CLI.switchInputMode({ type: "text" });
    },
    /** @param {String} input @param {cli_module} module */
    register_username: async (input, module) => {
      module.tempData.username = input;
      module.step = "register_password";
      await SE_CLI.printLine(
        `Register username: '${module.tempData.username}'`,
      );
      await SE_CLI.printLine("Please, enter your desired 'password':", "info");
      SE_CLI.switchInputMode({ type: SE_CLI.KEY.HTML.INPUT.TYPE.PASSWORD });
    },
    register_password: async (input, module) => {
      // const hash = await module.hashPassword(input);
      module.tempData.password = input;
      module.step = "register_password_confirm";
      await SE_CLI.printLine(
        "Enter your 'password' again to confirm it:",
        "info",
      );
      SE_CLI.switchInputMode({ type: SE_CLI.KEY.HTML.INPUT.TYPE.PASSWORD });
    },
    /** @param {String} input @param {cli_module} module */
    register_password_confirm: async (input, module) => {
      // const hash = await module.hashPassword(input);
      const confirmed = module.tempData.password === input;
      module.step = confirmed ? "register_confirm" : null;
      if (!confirmed) {
        await SE_CLI.printLine(
          "Passwords did not match. Resetting...",
          "error",
          1000,
        );
        SE_CLI.resetModule();
      }
      SE_CLI.clearTerminal();
      await SE_CLI.printLine("Password confirmed. ");
      SE_CLI.switchInputMode({ type: SE_CLI.KEY.HTML.INPUT.TYPE.TEXT });
      // @audit-issue [issue 106](https://github.com/Hastral-org/MAGPIE_Server/issues/106);
      // await SE_CLI.printLine("Transmitting credentials (placeholder)...", "info")
      // @todo add Spinner "sending registration request..." here
      const payload = {
        email: module.tempData.email,
        username: module.tempData.username,
        password: module.tempData.password,
      };
      module.tempData.payload = payload;
      const response = await SE_CLI.sendRequest("/account/register", payload);
      if (response && typeof response?.token === "string") {
        // @todo stop spinner and clear line
        await SE_CLI.printLine("Server received registration request!");
        await SE_CLI.printLine(String(response?.message));
        await SE_CLI.printLine(
          "Please, check your email for the confirmation link.",
        );
      }
      SE_CLI.resetModule();
    },
    login_email: async (input, module) => {
      console.warn(`email: ${input}`);
      module.tempData.email = input;
      module.step = "login_password";
      await SE_CLI.printLine("Please, enter your password:", "info");
      SE_CLI.switchInputMode({ type: "password" });
    },
    login_password: async (input, module) => {
      const payload = {
        email: module.tempData.email,
        password: input,
      };
      SE_CLI.switchInputMode({ type: "text" });
      SE_CLI.socket.emit("LOGIN", payload);
      // await SE_CLI.printLine("Transmitting credentials...", "info")
    },
    reset_email: async (input, module) => {
      const payload = {
        email: input,
      };
      SE_CLI.switchInputMode({ type: "text" });
      SE_CLI.socket.emit("RESET_PASSWORD_REQUEST", payload);
      // await SE_CLI.printLine("Transmitting reset request to MAGPIE_Server...", "info")
      module.mode = "command";
      module.step = null;
      SE_CLI.updatePromptUI();
    },
  },
  handleInput: SE_CLI.modules.handleInput,
  hashPassword: async (password) => {
    const msgUint8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  },
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
    await SE_CLI.printLine("--- FIRMWARE UPDATE ---", "info");
    SE_CLI.DATA.MODULE = SE_CLI.modules.updater.name;
    // await SE_CLI.printLine("Available commands: fetch, pull, back")
  },
  onEnter: async () => {
    await SE_CLI.modules.updater.renderUI();
  },
  commands: {},
  stepHandlers: {
    fetch: async (input, module) => {
      module.step = null;
      await SE_CLI.printLine("Fetching firmware data from server...", "info");
      const payload = {
        version: SE_CLI.meta.version,
      };
      SE_CLI.socket.emit("FETCH_FIRMWARE", payload);
    },
  },
  handleInput: SE_CLI.modules.handleInput,
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
// /** @type {cli_module} */
// SE_CLI.modules.adopt = {
//   name: "adopt",
//   mode: "command",
//   step: null,
//   tempData: {},
//   renderUI: async () => {
//     await SE_CLI.printLine("--- ADOPTION STORE ---", "info");
//     // await SE_CLI.printLine("Available commands: fetch, pull, back")
//   },
//   onEnter: async () => {
//     await SE_CLI.modules.adopt.renderUI();
//     SE_CLI.DATA.MODULE = SE_CLI.modules.adopt.name;
//     socket.emit(`adopt_store`, SE_CLI.DATA.getPlayerData());
//     await new Promise((resolve, reject) => {
//       socket.on("adopt_list", (data) => {
//         const list = data?.species;
//         for(const species of list) {
//           await SE_CLI.printLine
//         }
//       })
//     })
//   },
//   commands: {},
//   stepHandlers: {},
//   handleInput: SE_CLI.modules.handleInput,
// };
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
// #region - VIEWS
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Login
//------------------------------------------------------------------------
/**
 *
 * @param {HTMLFormElement} event
 *
 */
SE_CLI.login = async function (event) {
  const ePrefix = "[CLI] [login] ";
  try {
    SE_CLI.go("login");
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    SE_CLI.socket.emit("LOGIN", { email, password });
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
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
// #region > Data
//------------------------------------------------------------------------
SE_CLI.DATA.getPlayerData = function () {
  const get = (field) => localStorage.getItem(field);
  return {
    playerID: get("playerID"),
    playerUsername: get("playerUsername"),
    playerRole: get("playerRole"),
    playerEVP: get("playerEVP"),
    playerCLOUT: get("playerCLOUT"),
    playerSlots: get("playerSlots"),
  };
};
SE_CLI.DATA.fillPlayerData = function () {
  const playerID = document.getElementById("playerID");
  const username = document.getElementById("playerUsername");
  const role = document.getElementById("playerRole");
  const slots = document.getElementById("playerSlots");
  const EVP = document.getElementById("playerEVP");
  const CLOUT = document.getElementById("playerCLOUT");
  const status = document.getElementById("playerStatus");
  const serverStatus = document.getElementById("serverStatus");
  if (playerID) playerID.textContent = localStorage.getItem("playerID");
  if (username) username.textContent = localStorage.getItem("playerUsername");
  if (role) role.textContent = localStorage.getItem("playerRole");
  // if (slots) {
  //   slots.textContent = "";
  //   const playerSlots = localStorage.getItem("playerSlots");
  //   if (playerSlots) {
  //     const renderedSlots = playerSlots.split(",").map(Number);
  //     renderedSlots.forEach((slot) => {
  //       const btn = SE_CLI.UI.renderSlotButton(slot);
  //       slots.appendChild(btn);
  //     });
  //   }
  // }
  if (EVP) EVP.textContent = localStorage.getItem("playerEVP");
  if (CLOUT) CLOUT.textContent = localStorage.getItem("playerCLOUT");
  if (status) {
    const playerStatus = localStorage.getItem("playerStatus");
    status.textContent = playerStatus ? "ONLINE" : "OFFLINE";
  }
  if (serverStatus)
    serverStatus.textContent = localStorage.getItem("serverStatus");
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
SE_CLI.log = function (message, prefix) {
  console.log(`[${prefix}] ${message}`);
  const date = SE_CLI.printDate();
  // fs.appendFileSync(process.cwd() + `\\logs\\${prefix}${date}.txt`);
};
SE_CLI.error = function (message, error) {
  console.error(message, error);
  SE_CLI.log(message, "error");
};
SE_CLI.printDate = function () {
  const date = new Date();
  const pad = (num, length = 2) => num.toString().padStart(length, "0");
  const year = pad(date.getUTCFullYear(), 4);
  const month = pad(date.getUTCMonth() - 1);
  const day = pad(date.getUTCDate());
  return `${year}${month}${day}`;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Handoff
//------------------------------------------------------------------------
SE_CLI.HANDOFF = {};
SE_CLI.HANDOFF.manager = {
  exportState: () => {
    // const ePrefix = "[HANDOFF] ";
    // const data = Object.keys(SE_CLI.DATA);
    // const state = {};
    // for (const key of data) {
    //   const value = SE_CLI.DATA[key];
    //   state[key.toLocaleLowerCase()] = value;
    //   localStorage.setItem(key.toLocaleLowerCase(), value);
    // }
    // SE_CLI.log(
    //   ePrefix +
    //     `Session exported for [PLAYER-${state.playerID} | ${state.username}]`,
    //   "console",
    //   true,
    // );
  },
  importState: () => {
    const ePrefix = "[HANDOFF] ";
    try {
      // const state = {};
      // const data = Object.keys(SE_CLI.DATA);
      // for (const key of data) {
      //   const value = localStorage.getItem(key.toLocaleLowerCase());
      //   state[key.toLocaleLowerCase()] = value;
      //   SE_CLI.DATA[key] = value;
      // }
      // SE_CLI.log(
      //   `${ePrefix} Session recovered for [PLAYER-${state.playerID} | ${state.username}]`,
      //   "console",
      //   true,
      // );
      // SE_CLI.initSocketRMMZ();
      // return state;
    } catch (e) {
      console.error(e);
    }
  },
  resetState: () => {
    const ePrefix = "[HANDOFF] ";
    localStorage.clear();
    SE_CLI.log(ePrefix + "Session reset; localStorage wiped.");
  },
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Token
//------------------------------------------------------------------------
SE_CLI.decodeToken = function (token) {
  try {
    const base64Url = token.split(".")[1]; // Get the payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid JWT token", e);
    return null;
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
// #region > Account
//------------------------------------------------------------------------
SE_CLI.loginSuccess = async function (data) {
  const { server, token, playerData } = data;
  const { playerID, playerUsername } = playerData;
  SE_CLI.activeUser = playerUsername;
  SE_CLI.updatePromptUI();
  SE_CLI.clearTerminal();
  await SE_CLI.printLine(
    `Login successful. Welcome back, ${playerUsername}!`,
    "success",
  );
  // localStorage.setItem("jwt_token", token);
  // localStorage.setItem("playerID", playerID);
  // localStorage.setItem("playerUsername", playerUsername);
  SE_CLI.rehydrateSession(data);
  SE_CLI.DATA.JWT_TOKEN = token;
  // await SE_CLI.switchModule("updater")
  // @todo const update = await SE_CLI.modules.updater.handleInput("fetch")
  // if(!update)
  // 	reject("[BOOT] update error.")
  // if (!SE_CLI.DATA.PLAYER?.slots) SE_CLI.sync(data);
  return SE_CLI.BOOT.handoff();
};
SE_CLI.loginFail = async function (data) {
  await SE_CLI.printLine(`Login failed: ${data?.message}`, "error", 5000);
  SE_CLI.resetModule("account");
  await SE_CLI.switchModule("account");
};
SE_CLI.rehydrateSession = function (data) {
  const { token } = data;
  localStorage.setItem("jwt_token", token);
  SE_CLI.rehydratePlayerData(data);
};
SE_CLI.rehydratePlayerData = function (data) {
  /** @type {player_data} */
  const playerData = data?.playerData;
  const serverStatus = playerData
    ? SE_CLI.KEY?.STATUS_ON
    : SE_CLI.KEY?.STATUS_OFF;
  localStorage.setItem("playerID", playerData.playerID);
  localStorage.setItem("serverStatus", serverStatus);
  localStorage.setItem("playerUsername", playerData.username);
  localStorage.setItem("playerSlots", playerData.playerSlots);
  localStorage.setItem("playerRole", playerData.playerRole);
  localStorage.setItem("playerEVP", playerData.playerEVP);
  localStorage.setItem("playerCLOUT", playerData.playerCLOUT);
  localStorage.setItem("playerStatus", playerData.playerStatus);
  console.log("[CLI] [rehydratePlayerData] [200]");
};
SE_CLI.logout = async function () {
  if (SE_CLI.socket && SE_CLI.socket.connected)
    SE_CLI.socket.emit("LOGOUT", { playerID: SE_CLI.DATA.PLAYER_ID });
  localStorage.clear();
  SE_CLI.activeUser = null;
  SE_CLI.DATA.PLAYER_ID = NaN;
  SE_CLI.disconnectSocket();
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Action
//------------------------------------------------------------------------

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Exp
//------------------------------------------------------------------------

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Go
//------------------------------------------------------------------------
SE_CLI.go = function (view) {
  const ePrefix = "[CLI] [go] ";
  try {
    if (!view || typeof view !== "string")
      throw new Error(`${view} is invalid view. `);
    const container = document.getElementById("view-container");
    const template = document.getElementById(`view-${view}`);
    container.innerHTML = "";
    const content = template.content.cloneNode(true);
    container.appendChild(content);
    sessionStorage.setItem("view", view);
    SE_CLI.DATA.fillPlayerData();
    console.log(ePrefix + `${view}...`);
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
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
// #region - EVENTS
//========================================================================
if (SE_CLI.INPUT) {
  // SE_CLI.INPUT.focus();
  SE_CLI.INPUT.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const rawInput = SE_CLI.INPUT.value.trim();
      SE_CLI.INPUT.value = "";

      if (SE_CLI.activeModule) {
        await SE_CLI.activeModule.handleInput(rawInput);
      } else {
        await SE_CLI.printLine(
          `[System Error] No active module to handle input.`,
          "error",
        );
      }
    }
  });
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
 *
 * back to {@link SE_CLI.meta}
 *
 */
//========================================================================
// END OF FILE
//========================================================================
