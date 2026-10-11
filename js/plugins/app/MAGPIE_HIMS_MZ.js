//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [Tier 1] v0.5.1 MAGPIE_HIMS_MZ
 * @author Matheraptor
 * @url https://matheraptor.itch.io/
 *
 * @help
 *
 *
 * @param settings
 * @text Settings
 *
 * @param windows
 * @text Windows
 *
 * @param eraseConfirmWindow
 * @desc settings for the 'Erase Data Confirmation' window
 * @parent windows
 * @type struct<eraseConfirm>
 *
 */
//#endregion
//========================================================================

/*~struct~eraseConfirm:
 *
 * @param ww
 * @text Window width
 * @type number
 * @min 0
 * @default 490
 *
 * @param wh
 * @text Window height
 * @type number
 * @min 0
 * @default 210
 *
 *
 */

/**
 *
 */
//========================================================================
//#region - INDEX
//========================================================================
var MAGPIE = MAGPIE || {};
MAGPIE.HIMS = {};
MAGPIE.HIMS.meta = {
  name: MAGPIE.meta.name + "H.I.M.S™",
  firmwareName: "MAGPIE_HIMS",
};
/** @type {MAGPIE_HIMS} */
var $HIMS = null;
MAGPIE.HIMS.pluginName = "MAGPIE_HIMS_MZ";
MAGPIE.HIMS.parameters = PluginManager.parameters(MAGPIE.HIMS.pluginName);
MAGPIE.HIMS.ERASE_WINDOW_W = 490;
MAGPIE.HIMS.ERASE_WINDOW_H = 210;
/**
 *
 * @param {HIMS_data} data
 * @returns {new MAGPIE_HIMS}
 */
function MAGPIE_HIMS(data) {
  this.initialize(data);
}
/**
 *
 * @param {log_data} data
 * @returns {new MAGPIE_LOG}
 */
function MAGPIE_LOG(data) {
  this.initialize(data);
}
//#endregion
//========================================================================
/**
 * @name
 * @desc
 * @typedef {{
 * name: String,
 * firmwareName: String
 * }} HIMS_data
 * @typedef {MAGPIE_HIMS} MAGPIE_HIMS
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
// #region > proto
//------------------------------------------------------------------------
/**
 *
 * @param {HIMS_data} data
 * @returns {new MAGPIE_HIMS}
 */
MAGPIE_HIMS.prototype.initialize = function (data) {
  this._firmware = "MAGPIE_HIMS";
  this.meta = {
    name: String(data?.name),
    firmwareName: String(data?.firmwareName),
  };
  this._logs = {
    log: [],
    error: [],
    info: [],
    warn: [],
  };
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > menu
//------------------------------------------------------------------------
/**
 * @todo HIMS.logout
 * @returns
 */
MAGPIE_HIMS.prototype.logout = function () {
  return;
};
/**
 * @todo HIMS.eraseData
 * @returns
 */
MAGPIE_HIMS.prototype.eraseData = function () {};

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
MAGPIE_LOG.prototype.initialize = function (data) {
  this._firmware = "MAGPIE_LOG";
  this.ID = Date.now();
  this.message = String(data?.message);
  this.level = String(data?.level) || "console";
};
/**
 *
 * @param {Number} number
 * @param {Number} length
 * @returns {String}
 */
MAGPIE_HIMS.prototype.pad0 = function (number, length = 2) {
  return number.toString().padStart(length, "0");
};
/**
 *
 * @param {Date} currentDate
 * @returns {String}
 */
MAGPIE_HIMS.prototype.printFullDate = function (currentDate = null) {
  const ePrefix = "[HIMS].printDate: ";
  try {
    const date = currentDate || new Date();
    const year = this.pad0(date.getUTCFullYear(), 4);
    const month = this.pad0(date.getUTCMonth() + 1);
    const day = this.pad0(date.getUTCDate());
    const hour = this.pad0(date.getUTCHours());
    const minute = this.pad0(date.getUTCMinutes());
    const second = this.pad0(date.getUTCSeconds());
    return year + month + day + hour + minute + second;
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {{
 * message: String,
 * level: String,
 * logToConsole: Boolean
 * }} options
 */
MAGPIE_HIMS.prototype.log = function (options) {
  const ePrefix = "[HIMS].log: ";
  try {
    // const message = String(options?.message);
    // if (!message) throw new Error(`'${message}' is invalid message`);
    // const level = String(options?.level) || "console";
    // const logLevel = this._logs[level];
    // if (!Array.isArray(logLevel))
    //   throw new Error(`'${level}' is invalid logLevel`);
    // const logToConsole = Boolean(options?.logToConsole) || false;
    // logLevel.push(
    //   new MAGPIE_LOG({
    //     message: message,
    //     level: level,
    //   }),
    // );
    // if (!logToConsole) return;
    // const error = options?.error;
    // const callback = console[level];
    // const callbackText = `[${this.printFullDate()}] [${level}] ${message}`;
    // if (callback && !error) return callback(callbackText);
    // if (callback && error) return callback(callbackText, error);
    console.log(`[${options?.level}] ${options?.message}`);
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {String} message
 * @param {Error} error
 *
 */
MAGPIE_HIMS.error = function (message, error) {
  // this.log({ message: message, level: "error", logToConsole: true, error });
  console.error(message, error);
};
MAGPIE_HIMS.prototype.ePrefix = function (funcName) {
  return `[HIMS].${funcName}: `;
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
MAGPIE.HIMS._createSave = DataManager.createGameObjects;
DataManager.createGameObjects = function () {
  MAGPIE.HIMS._createSave.call(this);
  $HIMS = new MAGPIE_HIMS();
};
MAGPIE.HIMS._makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
  const contents = MAGPIE.HIMS._makeSave.call(this);
  contents.ShelderEvo = $ShelderEvo;
  return contents;
};
MAGPIE.HIMS._loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
  MAGPIE.HIMS._loadSave.call(this, contents);
  $ShelderEvo = contents.ShelderEvo;
};
MAGPIE.HIMS._GameSystem_init = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
  MAGPIE.HIMS._GameSystem_init.call(this);
  //@todo gameSystem init
};
MAGPIE.HIMS._setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function () {
  MAGPIE.HIMS._setupNewGame.call(this);
  $HIMS.setupNewGame();
};
MAGPIE_HIMS.prototype.setupNewGame = function () {
  this.start();
};
MAGPIE_HIMS.prototype.start = function () {
  const ePrefix = "[HIMS].start: ";
  try {
    //@todo playerSlots
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//========================================================================
// #region - SCENE
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Interpreter
//------------------------------------------------------------------------
MAGPIE_HIMS.prototype._get_interpreter = function () {
  if ($gameParty.inBattle()) return $gameTroop._interpreter;
  return $gameMap._interpreter;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Dialogue
//------------------------------------------------------------------------
/**
 *
 * @param {{
 * faceName: String,
 * faceIndex: Number,
 * bgType: Number,
 * posType: Number,
 * speakerName: String,
 * text: String
 * }} options
 */
MAGPIE_HIMS.prototype.showText = function (options) {
  const ePrefix = "[HIMS].showText: ";
  try {
    const faceName = String(options?.faceName);
    const faceIndex = Number(options?.faceIndex);
    if (faceName && faceIndex) $gameMessage.setFaceImage(faceName, faceIndex);
    /** @desc [0: window, 1: Dim, 2: Transparent] */
    const bgType = Number(options?.bgType);
    /** @desc [0: Top, 1: Middle, 2: Bottom] */
    const posType = Number(options?.posType);
    const speakerName = String(options?.speakerName);
    const text = String(options?.text);
    console.log(ePrefix + text);
    // const interpreter = options?.interpreter || this._get_interpreter();
    $gameMessage.setBackground(bgType);
    $gameMessage.setPositionType(posType);
    if (speakerName) $gameMessage.setSpeakerName(speakerName);
    $gameMessage.add(text);
    // const messageWin = this._get_messageWindow();
    // if (!messageWin.x) messageWin.x = Math.floor(Graphics.boxWidth / 2);
    // if (!messageWin.y) messageWin.y = Math.floor(Graphics.boxHeight / 3);
    // interpreter.setWaitMode("message");
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};
MAGPIE_HIMS.prototype._get_messageWindow = function () {
  return SceneManager._scene._messageWindow;
};
/**
 *
 * @param {{
 * choices: String[],
 * defaultIndex: Number,
 * cancelIndex: Number,
 * bgType: Number,
 * posType: Number,
 * interpreter: Object,
 * callback: Function
 * }} options
 */
MAGPIE_HIMS.prototype.showChoices = function (options) {
  const ePrefix = "[HIMS].showChoices: ";
  try {
    const choices = options?.choices;
    if (!Array.isArray(choices))
      throw new Error(`'${choices}' is invalid choices array`);
    console.log(ePrefix + `${choices}`);
    const defaultIndex = Number(options?.defaultIndex) || 0;
    /** @desc [-1: no cancel, -2: 'branch' cancel] */
    const cancelIndex = Number(options?.cancelIndex) || 0;
    /** @desc [0: Window, 1: Dim, 2: Transparent] */
    const bgType = Number(options?.bgType) || 0;
    /** @desc [0: left, 1: center, 2: right] */
    const posType = Number(options?.posType) || 0;
    const callback = options?.callback;
    // const interpreter = options?.interpreter || this._get_interpreter();
    $gameMessage.setChoices(choices, defaultIndex, cancelIndex);
    // $gameMessage.setChoiceBackground(bgType);
    // $gameMessage.setChoicePositionType(posType);
    $gameMessage.setChoiceCallback(callback);
    // const choiceWin = this._get_choiceWindow();
    // if (!choiceWin.x) choiceWin.x = Math.floor(Graphics.boxWidth / 2);
    // if (!choiceWin.y) choiceWin.y = Math.floor(Graphics.boxHeight / 2);
    // interpreter.setWaitMode("message");
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};
MAGPIE_HIMS.prototype._get_choiceWindow = function () {
  return SceneManager._scene._choiceListWindow;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Title
//------------------------------------------------------------------------

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Erase
//------------------------------------------------------------------------
// MAGPIE.HIMS._commandNewGame = Scene_Title.prototype.commandNewGame;
// Scene_Title.prototype.commandNewGame = function () {
//   this.createEraseConfirmWindow();
// };
// Scene_Title.prototype.createEraseConfirmWindow = function () {
//   const rect = this.eraseConfirmWindowRect();
//   this._eraseConfirmWin = new Window_EraseConfirm(rect);
//   this._eraseConfirmWin.setHandler("yes", this.onEraseConfirmYes.bind(this));
//   this._eraseConfirmWin.setHandler("no", this.onEraseConfirmNo.bind(this));
//   this.addWindow(this._eraseConfirmWin);
// };
// Scene_Title.prototype.eraseConfirmWindowRect = function () {
//   const ww = MAGPIE.HIMS.ERASE_WINDOW_W;
//   const wh = MAGPIE.HIMS.ERASE_WINDOW_H;
//   const wx = (Graphics.boxWidth - ww) / 2;
//   const wy = (Graphics.boxWidth - wh) / 2;
//   return new Rectangle(wx, wy, ww, wh);
// };
// Scene_Title.prototype.onEraseConfirmYes = function () {
//   this._eraseConfirmWin.close();
//   this.removeChild(this._eraseConfirmWin);
//   MAGPIE.HIMS._commandNewGame.call(this);
// };
// Scene_Title.prototype.onEraseConfirmNo = function () {
//   this._eraseConfirmWin.close();
//   this.removeChild(this._eraseConfirmWin);
//   this._commandWindow.activate();
// };
// function Window_EraseConfirm() {
//   this.initialize(...arguments);
// }
// Window_EraseConfirm.prototype = Object.create(Window_Command.prototype);
// Window_EraseConfirm.prototype.constructor = Window_EraseConfirm;
// Window_EraseConfirm.prototype.initialize = function (rect) {
//   Window_Command.prototype.initialize.call(this, rect);
//   this.openness = 0;
//   this.open();
// };
// Window_EraseConfirm.prototype.makeCommandList = function () {
//   this.addCommand("Yes", "yes");
//   this.addCommand("No", "no");
// };
// Window_EraseConfirm.prototype.drawAllItems = function () {
//   const text = "Erase all progress data and start a new game?";
//   const y = this.itemHeight() / 2;
//   this.drawText(text, 0, y, this.innerWidth, "center");
//   Window_Command.prototype.drawAllItems.call(this);
// };
// Window_EraseConfirm.prototype.itemRect = function (index) {
//   const rect = Window_Command.prototype.itemRect.call(this, index);
//   rect.y += this.itemHeight() * 1.5;
//   return rect;
// };
// Window_EraseConfirm.prototype.playOkSound = function () {
//   if (this.currentSymbol() === "yes") {
//     SoundManager.playOk();
//   } else {
//     SoundManager.playCancel();
//   }
// };
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
 * @desc back to {@link }
 *
 */
//========================================================================
// #endregion -
//========================================================================
/**
 *
 *
 */
//========================================================================
// END OF FILE
//========================================================================
