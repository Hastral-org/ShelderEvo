//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_S] v0.2.0 MAGPIE_RemoveOptimize
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-removeoptimize
 * 
 * @help
 * MAGPIE suite REMOVE OPTIMIZE (Standalone)
 * This plugin will remove the 'OPTIMIZE' command from the EQUIP slot window, 
 * useful for those projects where this command is not needed.
 * ----------------------------------------------------------------------------
 * STANDALONE PLUGIN [Tier_S]
 * This plugin can be used either on its own with no further actions, or as 
 * part of the MAGPIE plugin suite.
 * 
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * ----------------------------------------------------------------------------
 * You are ALLOWED to use this plugin in both FREE and COMMERCIAL games.
 * You can credit the author and the plugin
 * Recommended credit: 
 * "MAGPIE_RemoveOptimize - by Matheraptor" (if used standalone)
 * or
 * "MAGPIE plugin suite - by Matheraptor" (if part of the plugin suite)
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.2.0 - standalone-ization of the plugin
 * 
 * v0.1.0 - initial build
 * ----------------------------------------------------------------------------
 * END OF HELP
 */
//#endregion


//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.RemoveOptimize = {};
MAGPIE.addons.RemoveOptimize.version = "0.2.0";
MAGPIE.addons.RemoveOptimize.pluginName = "Remove_Optimize";


//#endregion

//------------------------------------------------------------------------
//#region CODE EDIT

MAGPIE.addons.RemoveOptimize
    ._Window_EquipCommand_makeCommandList = Window_EquipCommand.prototype.makeCommandList;

Window_EquipCommand.prototype.makeCommandList = function()
{
    MAGPIE.addons.RemoveOptimize._Window_EquipCommand_makeCommandList.call(this);
    this._list = this._list.filter(command => command.symbol !== 'optimize');
}

//#endregion


//end of plugin