//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [TIER_4] v0.35.0 MAGPIE ShelderEvo creature
 * @author Matheraptor
 * @url https://matheraptor.itch.io/
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
 * v0.35.0 2026 06 06
 * - initial build
 */
//#endregion
//========================================================================
/**
 * @namespace 
 * @author Matheraptor
 * @version 0.1.0
 * @desc 
 */
//========================================================================
//#region - INDEX
//========================================================================

//#endregion
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//========================================================================
// #region - LEGACY
//========================================================================
// Game_Creature.prototype.explore = function()
// {
// 	//
// }
// Game_Battler.prototype.refreshHabitat = function() {
	// if($gameParty.leader()._extraZones[zoneWildId].length < 1)
	// {
	// 	return false
	// };
	// let lastHabitatCard = $dataSkills[SECore.lastInWild()._skillId];
	// if(!lastHabitatCard.meta?.habitat) {
	// 	return false
	// };
	// this._habitat = lastHabitatCard._skilldId;
	// this._habitatState = eval(lastHabitatCard.meta.stateId);
	// let incompatibleHabitats = $dataHabitatStates.filter((element) => element.id != this._habitatState);
	// incompatibleHabitats.forEach((element) => this.removeState(element.id));
	// this.addState(this._habitatState);
// }; 
// Game_Battler.prototype.forage = function() { //@audit test: Battler.forage()
	// if(!this.canForage()){
	// 	return
	// };
	// let card = $dataSkills[SECore.lastInWild()._skillId];
	// let commonLoot = eval(card.meta.commonLoot) || []; 
	// let uncommonLoot = eval(card.meta.uncommonLoot) || []; 
	// let rareLoot = eval(card.meta.rareLoot) || []; 
	// let uniqueLoot = eval(card.meta.uniqueLoot) || []; 
	// let array = [];
	// if(commonLoot.length > 0) {
	// 	var commonPick = [];
	// 	SECore.forageSeed(commonLoot,SEdice.common,SEdice.weighted,commonPick);
	// 	if(commonPick.length > 0) {
	// 		let die = SECore.die(commonPick.length - 1);
	// 		array.push(commonPick[die])
	// 	}
	// }; 
	// if(uncommonLoot.length > 0) {
	// 	var uncommonPick = [];
	// 	SECore.forageSeed(uncommonLoot,SEdice.uncommon,SEdice.weighted,uncommonPick);
	// 	if(uncommonPick.length > 0) {
	// 		let die = SECore.die(uncommonPick.length - 1);
	// 		array.push(uncommonPick[die])
	// 	}
	// }; 
	// if(rareLoot.length > 0) {
	// 	var rarePick = [];
	// 	SECore.forageSeed(rareLoot,SEdice.rare,SEdice.weighted,rarePick); 
	// 	if(rarePick.length > 0) {
	// 		let die = SECore.die(uncommonPick.length - 1);
	// 		array.push(rarePick[die])
	// 	}
	// }; 
	// if(uniqueLoot.length > 0) {
	// 	var uniquePick = [];
	// 	SECore.forageSeed(uniqueLoot,SEdice.unique,SEdice.weighted,uniquePick); 
	// 	if(uniquePick.length > 0) {
	// 		let die = SECore.die(uniquePick.length - 1);
	// 		array.push(uniquePick[die])
	// 	}
	// }; 
	// if(array.length < 1 || array[0] == 0) {
	// 	$gameMessage.add("Error 1: No loot found.");
	// 	return
	// };
	// if(!this.isActor()) {
	// 	let pick = items[SECore.die(items.length - 1)]
	// 	this.pushUseItem(pick);
	// 	return
	// };
	// let items = array;
	// let choices = items.map(item => $dataItems[item].name);
	// array.push("false"); 
	// choices.push(":: Not interested ::"); 
	// $gameMessage.setPositionType(1);
	// $gameMessage.add("Loot found:");
	// $gameMessage.setChoices(choices, choices.length - 1, choices.length - 1)
	// $gameMessage.setChoicePositionType(2)
	// $gameMessage.setChoiceCallback(n => ($gameVariables.setValue(cVar.lastItem, array[n])));
	// $gameTroop._interpreter.setWaitMode("message");
// };
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
 * back to {@link }
 * 
 */
//========================================================================
// END OF FILE
//========================================================================