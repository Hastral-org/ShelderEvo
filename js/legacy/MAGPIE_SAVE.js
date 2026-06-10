//------------------------------------------------------------------------
//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_S] v0.1.0 MAGPIE_SAVE
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-save
 * 
 * @help
 * (MAGPIE) SAVE manager
 * Standalone plugin to add functionality to the game save system.
 * 
 * ----------------------------------------------------------------------------
 * FEATURES
 * ----------------------------------------------------------------------------
 * - customizable Autosave toast message
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.1.0 2025 08 02
 * - initial build
 * 
 * ----------------------------------------------------------------------------
 * 
 * @param autosave
 * @text Autosave settings
 * @type struct<autosave>
 * 
 */

/*~struct~autosave:
 * 
 * @param toast
 * @text Autosave toast window
 * @desc Toggle 'autosave toast message' ON or OFF
 * @type boolean
 * @default false 
 * 
 * @param textOK
 * @text Autosave text success
 * @desc The text to display when the autosave succeeds
 * @type text
 * @default AUTOSAVE OK!
 * 
 * @param textFAIL
 * @text Autosave text fail
 * @desc The text to display when the autosave fails
 * @type text
 * @default AUTOSAVE FAILED!
 * 
 * @param align
 * @text Text alignment
 * @desc Select how to align the toast text
 * @type select
 * @option Left align
 * @value Left
 * @option Center align
 * @value Center
 * @option Right align
 * @value Right
 * 
 * @param timeout
 * @text Autosave toast timeout
 * @desc The time in seconds the toast message is displayed before closing
 * @type number
 * @default 3
 * 
 * @param wx
 * @text Window x position
 * @desc The x position of the toast window
 * @type select
 * @option Left aligned
 * @value 0
 * @option Right aligned
 * @value Graphics.boxWidth - MAGPIE.SAVE.autosave.x()
 * @option Centered
 * @value (Graphics.boxWidth / 2) - (MAGPIE.SAVE.autosave.x() / 2)
 * @default Graphics.boxWidth - MAGPIE.SAVE.autosave.x()
 * 
 * @param wy
 * @text Window y position
 * @desc The y position of the toast window
 * @type select
 * @option Top
 * @value 0
 * @option Center
 * @value Graphics.boxHeight / 2
 * @option Bottom
 * @value Graphics.boxHeight - 100
 * @default Graphics.boxHeight - 100
 * 
 * @param ww
 * @text Window width
 * @desc The width in pixels of the toast window (leave 'auto' for automatic calculation)
 * @type combo
 * @option auto
 * @default auto
 */
//#endregion




//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.SAVE = MAGPIE.SAVE || {};
MAGPIE.SAVE.meta = MAGPIE.SAVE.meta || {isSave: true, isInstalled: true};
MAGPIE.SAVE.version = "0.1.0";
MAGPIE.SAVE.pluginName = "MAGPIE_SAVE";
MAGPIE.SAVE.parameters = PluginManager.parameters(MAGPIE.SAVE.pluginName);

MAGPIE.SAVE.settings = {}
MAGPIE.SAVE.settings.meta = {isSettings: true};
/**
 * {@link MAGPIE.SAVE.autosave.isON}
 */
MAGPIE.SAVE.settings.autosave = JSON.parse(MAGPIE.SAVE.parameters.autosave);
MAGPIE.SAVE.autosave = {};


//#endregion





//------------------------------------------------------------------------
//#region Autosave
/**
 * {@link MAGPIE.SAVE.settings.autosave}
 */
MAGPIE.SAVE.autosave.isON = Boolean(MAGPIE.SAVE.settings.autosave.toast);
MAGPIE.SAVE.autosave.timeout = Number(MAGPIE
        .SAVE.settings.autosave.timeout) * 60;
MAGPIE.SAVE.autosave.width = function()
{
    let width = MAGPIE.SAVE.settings.autosave.ww;
    if(Number(width)) return Number(width) 
    else
    {
        let textOK = MAGPIE.SAVE.settings.autosave.textOK;
        let textFAIL = MAGPIE.SAVE.settings.autosave.textFAIL;
        width = Math.max(textOK.length, textFAIL.length) * 20;
        return width
    }
}

//------------------------------------------------------------------------
//#region window
function Window_Autosave()
{
    this.initialize.apply(this, arguments);
}

Window_Autosave.prototype = Object.create(Window_Base.prototype);
Window_Autosave.prototype.constructor = Window_Autosave;
Window_Autosave.prototype.initialize = function(rect)
{
    Window_Base.prototype.initialize.call(this, rect);
    this._index = -1;
    this.close();
}

Window_Autosave.prototype.success = function()
{
    this.createContents();
    const text = MAGPIE.SAVE.settings.autosave.textOK;
    const align = MAGPIE.SAVE.settings.autosave.align;
    const timeout = MAGPIE.SAVE.autosave.timeout;
    this.drawText(text, 0, 0, 0, align);
    this.open();
    setTimeout(SceneManager._scene._autosaveWindow.close, timeout);
}

Window_Autosave.prototype.fail = function()
{
    this.createContents();
    const text = MAGPIE.SAVE.settings.autosave.textFAIL;
    const align = MAGPIE.SAVE.settings.autosave.align;
    const timeout = MAGPIE.SAVE.autosave.timeout;
    this.drawText(text, 0, 0, 0, align);
    this.open();
    setTimeout(SceneManager._scene._autosaveWindow.close, timeout);
}

MAGPIE.SAVE._Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function()
{
    MAGPIE.SAVE._Scene_Map_createAllWindows.call(this);
    this.createAutosaveWindow();
}

Scene_Map.prototype.createAutosaveWindow = function()
{
    const rect = this.autosaveWindowRect();
    this._autosaveWindow = new Window_Autosave(rect);
    this.addWindow(this._autosaveWindow);
}

Scene_Map.prototype.autosaveWindowRect = function()
{
    const ww = MAGPIE.SAVE.autosave.width();
    const wx = eval(MAGPIE.SAVE.settings.autosave.x);
    const wy = eval(MAGPIE.SAVE.settings.autosave.y);
    const wh = this.calcWindowHeight(1, false);
    return new Rectangle(wx, wy, ww, wh)
}

Scene_Map.prototype.onAutosaveSuccess = function()
{
    this._autosaveWindow.success();
}

Scene_Map.prototype.onAutosaveFailure = function()
{
    this._autosaveWindow.fail();
}
//#endregion

//#endregion
//end of plugin