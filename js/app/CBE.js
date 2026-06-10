//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [TIER_4] v0.35.0 MAGPIE ShelderEvo CBE
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
var MAGPIE = MAGPIE || {};
MAGPIE.CBE = {}
MAGPIE.CBE.meta = {
	name: "M.A.G.P.I.E. (C)onditional (B)ranching and (E)venting",
	desc: "",
	version: [0,35,0],
	firmwareName: "CBE",
	firmwareDate: "20260606"
}
/**
 * @desc @audit-ok SECore legacy alias
 */
//#endregion
//========================================================================
/**
 * @name 
 * @desc 
 * @typedef {Number} subjectID
 * @typedef {Object} subject
 * @typedef {Object} user
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
// #region > Proto
//------------------------------------------------------------------------
/**
 * @static
 * @returns {new MAGPIE_CBE}
 */
function MAGPIE_CBE()
{
	this.initialize(...arguments)
}
MAGPIE_CBE.prototype.initialize = function()
{
	this.isInit = true;
	this.isActive = false
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Habitat
//------------------------------------------------------------------------
/**
 * @audit test if it still works
 * @param {subjectID} subject 
 * @param {String} action 
 * @param {state_index} habitatID 
 */
MAGPIE_CBE.prototype.habitatCombo = function(subject, action, habitatID)
{
	// let meta = $dataStates[habitatId].meta;
	// let habMass = eval(meta.habMass);
	// let habAggro = eval(meta.habAggro);
	// let habDex = eval(meta.habDex);
	// let habSen = eval(meta.habSen);
	// if(action == "add")
	// {
	// 	CBE.bulkAddState(subject, habCombos.mass, habMass);
	// 	CBE.bulkAddState(subject, habCombos.aggro, habAggro);
	// 	CBE.bulkAddState(subject, habCombos.dex, habDex);
	// 	CBE.bulkAddState(subject, habCombos.sen, habSen);
	// }
	// if(action == "remove")
	// {
	// 	CBE.bulkRemoveState(subject, habCombos.mass, habMass);
	// 	CBE.bulkRemoveState(subject, habCombos.aggro, habAggro);
	// 	CBE.bulkRemoveState(subject, habCombos.dex, habDex);
	// 	CBE.bulkRemoveState(subject, habCombos.sen, habSen);
	// }
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Dice
//------------------------------------------------------------------------
MAGPIE_CBE.prototype.attemptDice = function(dX, bonus, attempt)
{
	const ePrefix = "[CBE].attemptDice: "
	try
	{
		if(this.die(dX) + bonus === dX)
		{
			eval(attempt) //@audit what is 'attempt'?
			return true
		}
		else return false
	}
	catch(e)
	{
		MAGPIE.error(ePrefix + e.message, e)
	}
}
SECore.attemptDice = MAGPIE_CBE.prototype.attemptDice
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
// #region - LEGACY
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > SECore
//------------------------------------------------------------------------
/**
 * @audit-ok SECore legacy method
 * @param {*} zoneId 
 * @param {*} type 
 * @returns 
 */
SECore.lastIsType = function(zoneId = 3, type = "")
{
	let result = SECore.lastInXzone(zoneId);
	if(result == undefined)
	{
		return false
	};
	let card = $dataSkills[result._skillId];
	if(card == undefined)
	{
		return false
	};
	if(card.meta.hasOwnProperty(type))
	{
		return true
	} else {
		return false
	}
}
/**
 * @audit-ok SECore.lastInWild legacy method
 * @returns {obj} Card (add "._skillId" to get ID)
 */
SECore.lastInWild = function()
{
	return SECore.lastInXzone(zoneWildId)
}
/**
 * @audit-ok SECore.lastInXzone legacy method
 * @param {Number} zoneId 
 * @returns {obj} Card (add "._skillId" to get ID)
 */
SECore.lastInXzone = function(zoneId = 2)
{
	let card = $gameParty.leader()._extraZones[zoneId]._data[SECore.XzoneSize(zoneId) - 1];
	if(card == undefined)
	{
		return
	} else {
		return card
	}
}
/**
 * @audit-ok SECore.XzoneSize legacy method
 * @param {*} zoneId 
 * @returns 
 */
SECore.XzoneSize = function(zoneId)
{
	return $gameParty.leader()._extraZones[zoneId].length
}
/**
 * @audit-ok SECore.lastInTerritory legacy method
 * @returns 
 */
SECore.lastInTerritory = function() {
	return SECore.lastInXzone(zoneTerritoryId)
};
/**
 * @audit SECore.getHabitats legacy method
 * @returns 
 */
SECore.getHabitats = function()
{
	try
	{
		let pool = [];
		$dataSkills.forEach((element) => pool.push(element));
		pool.shift();
		let habitats = pool.filter((element) => element.meta.hasOwnProperty("habitat"));
		if(habitats.length > 0) 
		{
			PDL.init._habitatsLoaded = true; 
			return habitats
		} 
		else 
		{
			console.log("Unable to load habitats!");
			return false
		}
	}
	catch(e)
	{
		MAGPIE.error(e.message, e)
	}
}
/**
 * @audit SECore.getHabitatStates legacy method
 * @returns 
 */
SECore.getHabitatStates = function() 
{
	try
	{
		console.log("Loading habitatStates...");
		let pool = [];
		$dataStates.forEach((element) => pool.push(element));
		pool.shift();
		let states = pool.filter((element) => element.meta.hasOwnProperty("habitat"));
		if(states.length > 0)
		{
			console.log(states.length + " records found and added to PDL database.");
			return states
		} 
		else 
		{
			console.log("Unable to load habitatStates!");
			return false
		}
	}
	catch(e)
	{
		MAGPIE.error(e.message, e)
	}
}
/**
 * @audit SECore.getResources legacy method
 * @returns 
 */
SECore.getResources = function()
{
	try
	{
		console.log("Loading resources...");
		let pool = [];
		$dataItems.forEach((element) => pool.push(element));
		pool.shift();
		let resources = pool.filter((element) => element.meta.hasOwnProperty("resource"));
		if(resources.length > 0)
		{
			console.log(resources.length + " records found and added to PDL database.");
			return resources
		} 
		else 
		{
			console.log("Unable to load resources!");
			return false
		}
	}
	catch(e)
	{
		MAGPIE.error(e.message, e)
	}
}
/**
 * @audit SECore.getFilterData legacy method
 * @param {array} data
 * @param {string} filter 
 * @param {boolean} shift1st 
 * @returns {array} 
 */
SECore.getFilterData = function(data, filter, shift1st = true)
{
	try
	{
		console.log("Loading " + filter + "...");
		let pool = [];
		data.forEach((element) => pool.push(element));
		if(shift1st) 
			pool.shift();
		let results = pool.filter((element) => element.meta.hasOwnProperty(filter));
		if(results.length > 0)
		{
			console.log(results.length + " records found and added to PDL database.");
			return results
		} 
		else 
		{
			console.log("No records found!");
			return false
		}
	}
	catch(e)
	{
		MAGPIE.error(e.message, e)
	}
}
/**
 * @audit SECore.refreshHabitatResources legacy method
 * @param {*} lastHabitat 
 * @param {*} lootTaken 
 */
SECore.refreshHabitatResources = function(lastHabitat, lootTaken) 
{
	try
	{
		let resourceTaken = habitat[lastHabitat]._resources.findIndex(lootTaken);
		habitat[lastHabitat]._resources.splice(resourceTaken, 1)
	}
	catch(e)
	{
		MAGPIE.error(e.message, e)
	}
};
/**
 * @audit SECore.getSpecies legacy method
 * @returns 
 */
SECore.getSpecies = function()
{
	try
	{
		let data = SECore.getFilterData($dataSkills,"species",true);
		results = [];
		data.forEach(e => results.push(e))
		//results.forEach((element) => species.push(new Game_Species(element.id)))
		return results
	}
	catch(e)
	{
		MAGPIE.error(e.message, e)
	}
}
/**
 * @audit SECore.explore legacy method
 * @param {skillID} skillCard 
 * @param {stateID} stateId 
 * @param {user} user
 */
SECore.explore = function(skillCard, stateId, user) 
{
	try
	{
		SECore.initHabitat(skillCard);
		user.refreshHabitat(skillCard, stateId);
	}
	catch(e)
	{
		MAGPIE.error(e.message, e)
	}
}
/**
 * @audit SECore.initHabitat legacy method
 * @returns 
 */
SECore.initHabitat = function() 
{
	try
	{
		let habitatCard = SECore.lastInWild();
		let habitatID = habitatCard.var[0];
		let habitat = {};
		if(habitatID > 0) 
		{
			habitat = currentTerritory._habitats.find(h => h._habitatId === habitatID);
			return habitat.fromCard();
		}
		habitatID = "" + Year + "-" + Month + "-" + Day + "-" + Hour + "-" + Minute;
		habitatCard.var[0] = habitatID;
		habitatCard.var[1] = [];
		habitatCard.var[2] = [];
	}
	catch(e)
	{
		MAGPIE.error(e.message, e)
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
// #region > TUR eval
//------------------------------------------------------------------------
MAGPIE_CBE.prototype.actionStartEval = function()
{
	//
}
MAGPIE_CBE.prototype.actionAfterEval = function()
{
	//
}
MAGPIE_CBE.prototype.cardActions = function()
{
	//
}
MAGPIE_CBE.prototype.cardPassives = function()
{
	//
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
HIMS.CBE = function()
{
	console.info("CBE...")
	const systems = [
		HIMS.consoleGO("CBE_sync", $CBE?.isInit),
		HIMS.consoleGO("Dice", $CBE?.DICE?.isActive),
		HIMS.consoleGO("Eventing", $CBE?.EVENT?.isActive),
		HIMS.consoleGO("Fate", $CBE?.FATE?.isActive),
		HIMS.consoleGO("Quest", $CBE?.QUEST?.isInit)
	]
	const status = HIMS.systemsCheck(systems)
	return status
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
 * back to {@link MAGPIE.CBE.meta}
 * 
 */
//========================================================================
// END OF FILE
//========================================================================