//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_5] v0.1.0 MAGPIE_ShelderEvo_CGC_keywords
 * @author Matheraptor
 * @url 
 * 
 * @help
 * (MAGPIE) SHELDER EVOLUTION / CGC KEYWORDS
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.1.0 2025 09 04
 * - initial build
 */
//#endregion






//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.10.0";
MAGPIE.ShelderEvo = MAGPIE.ShelderEvo || {};
MAGPIE.ShelderEvo.version = MAGPIE.ShelderEvo.version || "0.4.6";
MAGPIE.ShelderEvo.Keywords = {};
MAGPIE.ShelderEvo.Keywords.version = "0.1.0";
MAGPIE.ShelderEvo.Keywords.pluginName = "MAGPIE_ShelderEvo_CGC_keywords";
MAGPIE.ShelderEvo.Keywords.meta = {
	name: "Shelder Evolution / CGC Keywords",
	firmware: "20250904",
	firmwareFile: `${MAGPIE.ShelderEvo.Keywords.pluginName}.js`,
	isCypher: true
}

//#endregion





//------------------------------------------------------------------------
//#region SHELDEX

SHELDEX.KEYWORD = {};
SHELDEX.KEYWORD.LINE_BREAK = "↵";
SHELDEX.KEYWORD.ENTER_ZONE_SKILL = "<enterZoneSkill:>";

//#endregion





//#region INIT
function HIMS_Keyword()
{
	this.initialize(...arguments);
}
HIMS_Keyword.prototype = Object.create(MAGPIE_HIMS.prototype);
HIMS_Keyword.prototype.constructor = HIMS_Keyword;
HIMS_Keyword.prototype.initialize = function()
{
	this.meta = MAGPIE.HIMS.meta;
	//this.loadKeywords();
	this._keywords = [];
	this._statesToShow = [];
	this._cardActions = [];
	this._cardPassives = {};
	this.__forcedActions = {};
	this.actionStartEvals = [];
	this.actionApplyEvals = [];
	this.actionPostApplyEvals = [];
	this.actionAfterEvals = [];
}
HIMS_Keyword.prototype.loadKeywords = function()
{
	for(let i = 1; i < $dataSkills.length; i++)
	{
		this.processSkill(i);
	}
}

HIMS_Keyword.prototype.processSkill = function(index)
{
	const skill = $dataSkills[index];
	if(skill.note.length < 1) return
	this.statesToShow(skill);
	this.actionEvals(skill);
}

HIMS_Keyword.prototype.cardActions = function(skill)
{
	if(this._cardActions.length < 1) return
	skill._cardActions = this._cardActions.toString() + ";";
	this._cardActions = [];
}

HIMS_Keyword.prototype.cardPassives = function(skill)
{
	if(Object.keys(this._cardPassives).length < 1) return
	// {willEndTurn: boolean}
}

HIMS_Keyword.prototype.forcedActions = function(skill)
{
	if(Object.keys(this.__forcedActions).length < 1) return
	skill.__forcedActions = this.__forcedActions;
	this.__forcedActions = {};
}

HIMS_Keyword.prototype.addStateToShow = function(stateId)
{
	this._statesToShow.push(stateId);
}

HIMS_Keyword.prototype.statesToShow = function(skill)
{
	if(this._statesToShow.length < 1) return
	skill._statesToShow = [...this._statesToShow];
	this._statesToShow = [];
}

HIMS_Keyword.prototype.actionEvals = function(skill)
{
	this.actionEval("actionStartEval", skill);
	this.actionEval("actionApplyEval", skill);
	this.actionEval("actionPostApplyEval", skill);
	this.actionEval("actionAfterEval", skill);
}

HIMS_Keyword.prototype.actionEval = function(evalType, skill)
{
	if(this[evalType].length < 1) return
	skill[evalType] = this[evalType].toString();
	this[evalType] = [];
}

HIMS_Keyword.prototype.enterZoneSkill = function(zone, skillId)
{
	if(!this.__forcedActions?.enterZone)
		this.__forcedActions.enterZone = [];
	this.__forcedActions.enterZone.push({zone: zone, skill: skillId})
}

HIMS_Keyword.prototype.enterZoneEval = function(zone, eval)
{
	if(!this.__forcedActions?.customEnterZoneActions)
		this.__forcedActions.customEnterZoneActions = [];
	this.__forcedActions.customEnterZoneActions
		.push({type: "eval", zone: zone, code: eval})
}

HIMS_Keyword.prototype.turnStartEval = function(eval)
{
	if(!this.__forcedActions?.customTurnStartActions)
		this.__forcedActions.customTurnStartActions = [];
	this.__forcedActions.customTurnStartActions
		.push({type: "eval", code: eval})
}
//#endregion





//------------------------------------------------------------------------
//#region RUNTIME

MAGPIE.ShelderEvo.Keywords._runtime = {};
MAGPIE.ShelderEvo.Keywords._runtime._HIMS_Game_initialize = HIMS_Game.prototype.initialize;
HIMS_Game.prototype.initialize = function()
{
	MAGPIE.ShelderEvo.Keywords._runtime._HIMS_Game_initialize.call(this);
	this.KEYWORD = new HIMS_Keyword();
}







//------------------------------------------------------------------------
//#region BATTLE
HIMS_Keyword.prototype.reclaim = function(user, amount)
{
	if(!user.isActor()) return
	$gameVariables.setValue(SHELDEX.VARIABLE.LAST_ACTOR, user);
	$gameTemp.reserveCommonEvent(SHELDEX.CE.RECLAIM);
	user._reclaim = true;
	user._reclaimAmount = amount;
}

HIMS_Keyword.prototype.sacrifice = function(user, amount)
{
	if(!user.isActor()) return
	//const card = $ShelderEvo.lastInZone(SHELDEX.ZONE.INJURY);
	user.moveCards(amount, "deck", "injury");
	user.moveCards(1, "injury", "hand");
}
//#endregion

//#endregion



//end of plugin