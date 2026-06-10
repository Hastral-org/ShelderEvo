/*:
 * @target MZ
 * @plugindesc [Tier_2] v0.1.3 ShelderEvo_EnemyInfoWindow
 * @author Matheraptor
 * @url
 * 
 * @help
 * Simple window to show RES and STA for selected enemy, designed to work with
 * ShelderEvo Core.
 * 
 * 
 * ------------------------------------------------------------------------------
 * CHANGELOG
 * ------------------------------------------------------------------------------
 * v 0.1.3 - plugin suite structure redesign
 * 
 * v 0.1.2 - added: STA parameter and parameter labels for both it and RES
 * 
 * v 0.1.1 - fixed: window not tied to enemy select window
 * 
 * v 0.1.0 - initial release
 */


//#region init
var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.5.1";
MAGPIE.SE = MAGPIE.SE || {};
MAGPIE.SE.version = MAGPIE.SE.version || "0.4.0";
MAGPIE.SE.EIW = {};
MAGPIE.SE.EIW.version = "0.1.3";

//#region Parameters

MAGPIE.SE.EIW.pluginName = "ShelderEvo_EnemyInfoWindow";
MAGPIE.SE.EIW.parameters = PluginManager.parameters(MAGPIE.SE.EIW.pluginName);

MAGPIE.SE.EIW.hp_x = MAGPIE.SE.EIW.parameters['hp_x'] || 0;
MAGPIE.SE.EIW.hp_y = MAGPIE.SE.EIW.parameters['hp_y'] || 0;
MAGPIE.SE.EIW.mp_x = MAGPIE.SE.EIW.parameters['mp_x'] || MAGPIE.SE.EIW.hp_x;
MAGPIE.SE.EIW.mp_y = MAGPIE.SE.EIW.parameters['mp_y'] || MAGPIE.SE.EIW.hp_y + 25;
MAGPIE.SE.EIW.wx = MAGPIE.SE.EIW.parameters['wx'] || 6;
MAGPIE.SE.EIW.wy = MAGPIE.SE.EIW.parameters['wy'] || 200;
MAGPIE.SE.EIW.ww = MAGPIE.SE.EIW.parameters['ww'] || 400;
MAGPIE.SE.EIW.wh = MAGPIE.SE.EIW.parameters['wh'] || 100;

//#endregion

//#region Custom enemy info window

function Window_EnemyInfo()
{
  this.initialize.apply(this, arguments);
}

Window_EnemyInfo.prototype = Object.create(Window_Base.prototype);
Window_EnemyInfo.prototype.constructor = Window_EnemyInfo;

Window_EnemyInfo.prototype.initialize = function(rect)
{
    this._currentEnemy = null;
    Window_Base.prototype.initialize.call(this, rect);
    this.refresh();
    this.hide();
}

Window_EnemyInfo.prototype.setEnemy = function(enemy)
{
  this._currentEnemy = enemy;
  this.refresh();
}

Window_EnemyInfo.prototype.refresh = function()
{
  if(this.contents)
  {
    this.contents.clear();
    this.drawEnemyInfo();
  }
}

Window_EnemyInfo.prototype.drawEnemyInfo = function() 
{
    if(this._currentEnemy) {
        this.drawText("RES: " + this._currentEnemy.hp + " / " + this._currentEnemy.mhp, MAGPIE.SE.EIW.hp_x, MAGPIE.SE.EIW.hp_y, this.contents.width, 'left');
        this.drawText("STA: " + this._currentEnemy.mp + " / " + this._currentEnemy.mmp, MAGPIE.SE.EIW.mp_x, MAGPIE.SE.EIW.mp_y, this.contents.width, 'left');
    }
}

MAGPIE.SE.EIW._Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    MAGPIE.SE.EIW._Window_BattleEnemy_select.call(this, index);
    SceneManager._scene._enemyInfoWindow.setEnemy(this.enemy());
};

MAGPIE.SE.EIW.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function()
{
    this.createEnemyInfoWindow();
    MAGPIE.SE.EIW.Scene_Battle_createAllWindows.call(this);
}

Scene_Battle.prototype.createEnemyInfoWindow = function()
{
  const rect = this.enemyInfoWindowRect();
  this._enemyInfoWindow = new Window_EnemyInfo(rect);
  this.addChild(this._enemyInfoWindow);
}

Scene_Battle.prototype.enemyInfoWindowRect = function()
{
  const wx = MAGPIE.SE.EIW.wx;
  const wy = MAGPIE.SE.EIW.wy;
  const ww = MAGPIE.SE.EIW.ww;
  const wh = MAGPIE.SE.EIW.wh;
  //const wh = this.calcWindowHeight(1, false);
  return new Rectangle(wx, wy, ww, wh);
}

MAGPIE.SE.EIW._Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
Scene_Battle.prototype.startEnemySelection = function() {
    MAGPIE.SE.EIW._Scene_Battle_startEnemySelection.call(this);
    SceneManager._scene._enemyInfoWindow.show();
};

MAGPIE.SE.EIW._Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    MAGPIE.SE.EIW._Scene_Battle_onEnemyOk.call(this);
    SceneManager._scene._enemyInfoWindow.hide();
    SceneManager._scene._enemyInfoWindow.setEnemy(null);
};

MAGPIE.SE.EIW._Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    MAGPIE.SE.EIW._Scene_Battle_onEnemyCancel.call(this);
    SceneManager._scene._enemyInfoWindow.hide();
};
//#endregion


//#endregion