//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_S] v0.1.0 MAGPIE_StackableStates
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-stackablestates
 * 
 * @help
 * (MAGPIE) STACKABLE STATES (Standalone)
 * 
 * ----------------------------------------------------------------------------
 * FEATURES
 * ----------------------------------------------------------------------------
 * - states with the tag will stack up to the specified maximum stack, thus
 *   multiplying their effects
 * 
 * - states with the optional increment tag will be incrementally removed, 
 *   thus requiring multiple attempts to clear, unless they are on a state 
 *   count, in which case, they will expire sequentially
 * 
 * - states with the optional increment tag that also have the optional recount
 *   tag will get their state count reset, thus making them fully incremental
 * 
 * 
 * ----------------------------------------------------------------------------
 * CREDITS
 * ----------------------------------------------------------------------------
 * - TheoAllen's Theo_StackingStates for inspiring this plugin
 *   (after using it and editing it for my personal project, I then just
 *   ended up writing my own version which better suited my needs, but their
 *   work inevitably inspired this)
 *   https://github.com/theoallen/RMMZ/tree/master/Plugins
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
 * 
 * @param settings
 * @text Settings
 * 
 * @param increment
 * @text Increment tag
 * @desc Additional notetag to enable the incremental removal of states
 * @type text
 * @default inc
 * 
 * @param recount
 * @text Recount tag
 * @desc Additional notetag to enable the reset of the state count of incremental states
 * @type tex
 * @default recount
 */
//#endregion





//------------------------------------------------------------------------
//#region INDEX
var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.7.0";
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.StackableStates = {};
MAGPIE.addons.StackableStates.pluginName = "MAGPIE_StackableStates";
MAGPIE.addons.StackableStates.parameters = PluginManager
    .parameters(MAGPIE.addons.StackableStates.pluginName);
MAGPIE.addons.StackableStates.INCREMENT = MAGPIE.addons.StackableStates.parameters["increment"];
MAGPIE.addons.StackableStates.RECOUNT = MAGPIE.addons.StackableStates.parameters["recount"];
//#endregion




//------------------------------------------------------------------------
//#region CORE EDITS

Game_Battler.prototype.addState = function(stateId) {
    if (this.isStateAddable(stateId)) {
        if (!this.isStateAffected(stateId) || !this.isStackFull(stateId)) 
        {
            this.addNewState(stateId);
            this.refresh();
        }
        this.resetStateCounts(stateId);
        this._result.pushAddedState(stateId);
    }
};

Game_Battler.prototype.isStackFull = function(stateId)
{
	const stack = Number($dataStates[stateId].meta?.stack);
    if(!stack || this.stateStack(stateId) >= stack) return true
    else return false
}

Game_Battler.prototype.stateStack = function(stateId)
{
    let states = this._states?.filter(id => id === stateId).length;
    if(!states) return 0
    return states.length
}

MAGPIE.addons.StackableStates._Game_Battler_eraseState = Game_Battler.prototype.eraseState;
Game_Battler.prototype.eraseState = function(stateId)
{
    if(this.stateStack(stateId) < 2 || !$dataStates[stateId].meta
        .hasOwnProperty(MAGPIE.addons.StackableStates.INCREMENT))
        return MAGPIE.addons.StackableStates._Game_Battler_eraseState.call(this)
    let index = this._states.findIndex(id => id === stateId);
    this._states.splice(index, 1);
    if($dataStates[stateId].meta
        .hasOwnProperty(MAGPIE.addons.StackableStates.RECOUNT))
        this.resetStateCounts(stateId);
}



//#endregion



//end of plugin