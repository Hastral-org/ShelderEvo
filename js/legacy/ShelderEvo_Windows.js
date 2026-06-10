//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_2] v0.1.3 ShelderEvo Windows
 * @author Matheraptor
 * 
 * @help
 * Utility plugin to handle Custom Windows
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.1.3 - incorporated 'removeOptimize' addon
 * 
 * v0.1.2 - plugin suite structure redesign
 * 
 * v0.1.1 - fixed setting not working due to definition error
 * 
 * v0.1.0 - initial build
 * 
 * 
 * @param offsetX
 * @text X offset
 * @type select
 * @option Left aligned
 * @value NaN
 * @option Centered
 * @value 0
 * @option Right aligned
 * @value ((Graphics.boxWidth - 480) / 2)
 * @default Left aligned
 * 
 * @param offsetY
 * @text Y offset
 * @type number
 * @default 100
 * 
 * @param width
 * @text Window width
 * @type combo
 * @option this.mainCommandWidth()
 * @option 240
 * @default this.mainCommandWidth()
 */
//#endregion







//-----------------------------------------------------------------------------------------------
//#region INIT
var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.5.1";
MAGPIE.SE = MAGPIE.SE || {};
MAGPIE.SE.version = MAGPIE.SE.version || "0.4.0";
MAGPIE.SE.Core.version = SECore.version || "1.4.1";
MAGPIE.SE.Core.windows = {};
MAGPIE.SE.Core.windows.version = "0.1.3";
SECore.windows = MAGPIE.SE.Core.windows;

//-------------------------------------------------------------------------
//#region Plugin Parameters

SECore.windows.pluginName = "ShelderEvo_Windows";
SECore.windows.parameters = PluginManager.parameters(SECore.windows.pluginName);

SECore.windows.titleCommandWindow = {};
SECore.windows.titleCommandWindow.x = eval(SECore.windows.parameters.offsetX);
SECore.windows.titleCommandWindow.y = -Number(SECore.windows.parameters.offsetY);
SECore.windows.titleCommandWindow.ww = SECore.windows.parameters.width;

//#endregion

//#endregion



//-----------------------------------------------------------------------------------------------
//#region Scene_Title
Scene_Title.prototype.commandWindowRect = function() {
    const offsetX = eval(SECore.windows.titleCommandWindow.x);
    const offsetY = SECore.windows.titleCommandWindow.y;
    const ww = eval(SECore.windows.titleCommandWindow.ww);
    const wh = this.calcWindowHeight(3, true);
    const wx = (Graphics.boxWidth - 480) / 2 + offsetX;
    const wy = Graphics.boxHeight - wh - 96 + offsetY;
    return new Rectangle(wx, wy, ww, wh);
};
//#endregion








//-----------------------------------------------------------------------------------------------
//#region Remove Optimize
SECore.windows._Window_EquipCommand_makeCommandList = Window_EquipCommand.prototype.makeCommandList;
Window_EquipCommand.prototype.makeCommandList = function() {
    SECore.windows._Window_EquipCommand_makeCommandList.call(this);
    this._list = this._list.filter(command => command.symbol !== 'optimize');
};
//#endregion





// //#region Touch_controls

// function Window_TouchControls()
// {
//   this.initialize.apply(this, arguments);
// }

// Window_TouchControls.prototype = Object.create(Window_Command.prototype);
// Window_TouchControls.prototype.constructor = Window_TouchControls;

// Window_TouchControls.prototype.initialize = function(rect)
// {
//     this._currentEnemy = null;
//     Window_Command.prototype.initialize.call(this, rect);
// }

// Scene_Battle.prototype.createEnemyInfoWindow = function()
// {
//   const rect = this.enemyInfoWindowRect();
//   this._enemyInfoWindow = new Window_EnemyInfo(rect);
//   this.addChild(this._enemyInfoWindow);
// }

//#endregion