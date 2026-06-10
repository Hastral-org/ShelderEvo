//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_S] v0.1.0 MAGPIE_EnduringStates
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-enduringstates
 * 
 * @help
 * (MAGPIE) ENDURING STATES (Standalone)
 * This standalone plugin will allow you to setup states (through their 
 * notetags) that are not cleared on battler death.
 * 
 * ----------------------------------------------------------------------------
 * HOW TO USE
 * ----------------------------------------------------------------------------
 * 1. insert this notetag: 
 *    <enduringState> 
 *    in the note section of the state
 *    you want to retain on death. The state will not be cleared when the
 *    battler dies and will still be there when they revive.
 * 
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * ----------------------------------------------------------------------------
 * This plugin can be used in both FREE and COMMERCIAL projects as long as
 * these terms of use and author credits are preserved and stated in the
 * project
 * 
 * License: MIT https://choosealicense.com/licenses/mit/
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.1.0 2025 08 09
 * - initial build
 * ----------------------------------------------------------------------------
 */
//#endregion




//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.7.0";
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.EnduringStates = {};
MAGPIE.addons.EnduringStates.version = "0.1.0";
MAGPIE.addons.EnduringStates.pluginName = "MAGPIE_EnduringStates";
MAGPIE.addons.EnduringStates.parameters = PluginManager
	.parameters(MAGPIE.addons.EnduringStates.pluginName);



//#endregion





//------------------------------------------------------------------------
//#region CORE EDITS

MAGPIE.addons.EnduringStates._Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function()
{
	let enduringStates = this._states?.filter(id => $dataStates[id].meta
		.hasOwnProperty("enduringState"));
    if(!enduringStates)
	return MAGPIE.addons.EnduringStates._Game_BattlerBase_clearStates.call(this)
    let removeStates = this._states.filter(id => !enduringStates.includes(id));
    removeStates.forEach(id => this.removeState(id));
}
//#endregion




//end of plugin