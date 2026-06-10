//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [TIER_4] v0.35.0 MAGPIE ShelderEvo PDL 
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
 * @version 0.35.0
 * @desc 
 */
//========================================================================
//#region - INDEX
//========================================================================
var MAGPIE = MAGPIE || {};
MAGPIE.PDL = {}
MAGPIE.PDL.meta = {
    name: "M.A.G.P.I.E. (P)rocedural (D)ata (L)oader",
    desc: "",
    version: [0,35,0],
    firmwareName: "PDL",
    firmwareDate: "20260606"
}
//#endregion
//========================================================================
/**
 * @name 
 * @desc 
 * 
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
 * @returns {new MAGPIE_PDL}
 */
function MAGPIE_PDL()
{
    this.initialize(...arguments)
}
MAGPIE_PDL.prototype.initialize = function()
{
    this.isInit = true;
    this.isActive = false;
    /** @type {MAGPIE_TERRITORY} */
    this.territory = null;
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
 * @audit initHabitat
 */
MAGPIE_PDL.prototype.initHabitat = function initHabitat()
{
    // let habitatCard = SECore.lastInWild();
	// let habitatID = habitatCard.var[0];
	// let habitat = {};
	// if(habitatID > 0) {
	// 	habitat = currentTerritory._habitats.find(h => h._habitatId === habitatID);
	// 	return habitat.fromCard();
	// }
	// habitatID = "" + Year + "-" + Month + "-" + Day + "-" + Hour + "-" + Minute;
	// habitatCard.var[0] = habitatID;
	// habitatCard.var[1] = [];
	// habitatCard.var[2] = [];
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Scene
//------------------------------------------------------------------------
/**
 * @todo $PDL.sceneLoad()
 */
MAGPIE_PDL.prototype.sceneLoad = function()
{
    // 
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Legacy
//------------------------------------------------------------------------
MAGPIE_PDL.prototype.wakeUp = function(battler)
{
	battler.addState(SHELDEX.POSTURE.GROGGY);
	battler.removeState(SHELDEX.POSTURE.DROWSY);
	battler.removeState(SHELDEX.INJURY.BRUISE);
	battler.removeState(SHELDEX.INJURY.STRAIN);
}
Game_Battler.prototype.changeState = function(statePool, newState)
{
	Object.values(statePool)
		.filter(e => e != newState)
		.forEach(e => this.removeState(e));
}
MAGPIE_PDL.prototype.pushSkill = function(battler, skillId, targetIndex = -1)
{
	const subject = battler;
	subject.forceAction(skillId, targetIndex);
	BattleManager.forceAction(subject);
	$gameTroop._interpreter.setWaitMode('action');
}
SHELDEX.BATTLECORE = {}
SHELDEX.BATTLECORE.damageFormula = {
	isPhysical: "value *= Math.max((this.subject.def - target.def),1)",
	alternative: "value = (value * this.subject.def) - target.def",
	alternative2: "value *= (this.subject.def / target.def)",
	alternative3: "value += (this.subject.def - target.def)",
	alternative4: "value += this.subject.def - target.def"
}
Game_Action.prototype.makeDamageValue = function(target, critical) {
    const item = this.item();
    const baseValue = this.evalDamageFormula(target);
    let value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
        eval(SHELDEX.BATTLECORE.damageFormula.alternative3);
		value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    if (critical) {
        value = this.applyCritical(value);
    }
    value = this.applyVariance(value, item.damage.variance);
    value = this.applyGuard(value, target);
    value = Math.round(value);
    return value;
};
MAGPIE_PDL.prototype.damage = function(target, damage, injuries)
{
	for(let i = 0; i < damage; i++)
	{
		target.addState($CBE.DICE.pick(...injuries))
	}
}
MAGPIE_PDL._Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value)
{
	MAGPIE_PDL._Game_Action_executeHpDamage.call(this, target, value);
	let result = target.result().hpDamage;
	let damage = result - target.hp;
	let elementId = this.item().damage.elementId;
	let element = $dataSystem.elements[elementId];
	let injury = SHELDEX.INJURY[element];
	$ShelderEvo.BATTLECORE.damage(target, Math.min(target.hp, result), injury[0]);
	if(damage > 0) 
		$ShelderEvo.BATTLECORE.damage(target, Math.abs(damage), [injury[1], injury[2]])
}
SHELDEX.CARD = {};
SHELDEX.CARD.ACTOR_SPRITE = {};
SHELDEX.CARD.ACTOR_SPRITE.OFFSET_X = 168;
SHELDEX.CARD.ACTOR_SPRITE.OFFSET_Y = 6;
SHELDEX.CARD.ACTOR_SPRITE.X = 132;
SHELDEX.CARD.BATTLER_SPRITE = {};
SHELDEX.CARD.BATTLER_SPRITE.W = 240;
SHELDEX.CARD.BATTLER_SPRITE.H = 328;
SHELDEX.STATE = {}
SHELDEX.STATE.RESOURCE = {};
SHELDEX.STATE.RESOURCE.MASS = 71;
SHELDEX.STATE.RESOURCE.AGGRO = 72;
SHELDEX.STATE.RESOURCE.DEX = 73;
SHELDEX.STATE.RESOURCE.SEN = 74;
SHELDEX.STATE.RESOURCE.STA = 75;
SHELDEX.STATE.RESOURCE.STA_STATES = [75,77,78];
SHELDEX.STATE.RESOURCE.STA_MID = 77;
SHELDEX.STATE.RESOURCE.STA_LOW = 78;
SHELDEX.STATE.RESOURCE.NRG = 76;
SHELDEX.STATE.RESOURCE.NRG_STATES = [76,79,80,81,82];
SHELDEX.STATE.RESOURCE.NRG_HIGH = 79;
SHELDEX.STATE.RESOURCE.NRG_MID = 80;
SHELDEX.STATE.RESOURCE.NRG_LOW = 81;
SHELDEX.STATE.RESOURCE.NRG_NONE = 82;
SHELDEX.STATE.RESOURCE.ALL = [
SHELDEX.STATE.RESOURCE.MASS,
	SHELDEX.STATE.RESOURCE.AGGRO,
	SHELDEX.STATE.RESOURCE.DEX,
	SHELDEX.STATE.RESOURCE.SEN,
	...SHELDEX.STATE.RESOURCE.STA_STATES,
	...SHELDEX.STATE.RESOURCE.NRG_STATES
];
/**
 * @audit on commonEvent 'enterTerritory'
 * @returns {Boolean} 
 */
MAGPIE_PDL.prototype.enterTerritory = function()
{
    const e = new Error("missing legacy '.enterTerritory' logic")
    MAGPIE.error(e.message, e)
    return false
}
/**
 * @audit on commonEvent 'exitTerritory'
 * 
 */
MAGPIE_PDL.prototype.exitTerritory = function()
{
    const e = new Error("missing legacy '.exitTerritory' logic")
    MAGPIE.error(e.message, e)
}
/**
 * @audit on commonEvent 'spawnEnemy'
 * @param {entityID} creatureID 
 * @param {skillID} speciesID 
 */
MAGPIE_PDL.prototype.spawnCreature = function(creatureID, speciesID)
{
    const e = new Error("missing legacy '.spawnCreature' logic")
    MAGPIE.error(e.message, e)
}
MAGPIE_PDL.prototype.setupBattle = function()
{
	let scene = SceneManager._scene;
	scene._statusWindow.alpha = 0;
	this.setupActorSprites(); 
	this.setupEnemySprites();
	this.setupStartingCards();
}
MAGPIE_PDL.prototype.setupDeckInjuries = function(user)
{
	let DECK = user._cardDeck._data;
	let INJURY = user._extraZones[MAGPIE.KEY.CGC.ZONE.INJURY]._data;
	if(user._INJ?.length > 0)
	{
		user._INJ.forEach(card => user.moveCard(DECK.findIndex(e => e === card), DECK, INJURY))
	}
}
MAGPIE_PDL.prototype.setupStartingCards = function()
{
	//remove species Card
	const deck = $gameParty.leader()._cardDeck;
	const speciesCard = deck._data
		.find(card => $dataSkills[card._skillId]?.meta?.isSpecies);
	if(!speciesCard) return
	$gameParty.leader()._cardDeck.remove(speciesCard);
}
MAGPIE_PDL.prototype.setupActorSprites = function()
{
	let card_x = SHELDEX.CARD.ACTOR_SPRITE.X;
	let cardHeight = SHELDEX.CARD.BATTLER_SPRITE.H;
	let offset_Y = Math.floor(cardHeight * 0.1);
	let cardOffsetX = SHELDEX.CARD.ACTOR_SPRITE.OFFSET_X;
	let cardOffsetY = SHELDEX.CARD.ACTOR_SPRITE.OFFSET_Y;
	let x = card_x + cardOffsetX;
	let y = Graphics.boxHeight - cardOffsetY;
	let sprites = SceneManager._scene._spriteset._actorSprites;
	let init_y = y - ((sprites.length - 1) * offset_Y);
	for(let i = 0; i < sprites.length; i++)
	{
		sprites[i]._homeX = x;
		sprites[i]._homeY = init_y + (i * offset_Y);
		sprites[i].children
			.filter(s => s._stateId === 75 || s._stateId === 77 || s._stateId === 78)
			.forEach(sta => this.setSTAsprites(sta))
	}   
}
MAGPIE_PDL.prototype.setupEnemySprites = function()
{
	let sprites = SceneManager._scene._spriteset._enemySprites;
	sprites.forEach((sprite, index) => sprite.children
		.filter(s => s._stateId === 75 || s._stateId === 77 || s._stateId === 78)
		.forEach(sta => this.setSTAsprites(sta)))
}
MAGPIE_PDL.setActorSpritePosition = function(actorId, x, y)
{
	let scene = SceneManager._scene;
	let actorSprites = scene._spriteset._actorSprites;
	let actor = actorSprites.find(sprite => sprite._actor._actorId === actorId);
	actor._homeX = x;
	actor._homeY = y;
}
MAGPIE_PDL.prototype.changeDeckSheet = function(sheet = "")
{
	let index = SceneManager._scene._deckSprite._index;
	SceneManager._scene._deckSprite._zoneData.sheet = sheet;
	SceneManager._scene._deckSprite.destroy();
	SceneManager._scene.createDeckSprite();
	SceneManager._scene.setDecksSkillWindow();
	SceneManager._scene._deckSprite._index = index;
}
MAGPIE_PDL.prototype.updateResourceStates = function(user)
{
	this.BATTLECORE.updateSTAstates(user);
	this.BATTLECORE.updateNRGstates(user);
}
MAGPIE_PDL.prototype.setSTAsprites = function(sprite)
{
	sprite.stretchScaleTo(true, 45, 45);
}
MAGPIE_PDL.prototype.updateSTAstates = function(user)
{
	let states = SHELDEX.STATE.RESOURCE.STA_STATES;
	states.forEach(state => user.removeState(state));
	if(user.mp < 1) return user.addState(SHELDEX.STATE.RESOURCE.STA_LOW)
	if(user.mp < user.mmp) return user.addState(SHELDEX.STATE.RESOURCE.STA_MID)
	return user.addState(SHELDEX.STATE.RESOURCE.STA)
}
MAGPIE_PDL.prototype.updateNRGstates = function(user)
{
	let states = SHELDEX.STATE.RESOURCE.NRG_STATES;
	states.forEach(state => user.removeState(state));
	if(user.tp < 1) return user.addState(SHELDEX.STATE.RESOURCE.NRG_NONE)
	if(user.tpRate() < 0.25) return user.addState(SHELDEX.STATE.RESOURCE.NRG_LOW)
	if(user.tpRate() < 0.50) return user.addState(SHELDEX.STATE.RESOURCE.NRG_MID)
	if(user.tpRate() < 0.75) return user.addState(SHELDEX.STATE.RESOURCE.NRG_HIGH)
	return user.addState(SHELDEX.STATE.RESOURCE.NRG)
}
Window_StatusBase.prototype.drawActorClass = function(actor, x, y, width)
{
	const ePrefix = "[WINDOW].drawActorClass: "
	try
	{
		width = width || 168;
		this.resetTextColor();
		let classIcon = SHELDEX.ICONS.CLASS[actor.currentClass().id];
		this.drawIcon(classIcon, x, y)
		this.drawText(actor.currentClass().name, x + 33, y, width);
	}
	catch(e)
	{
		MAGPIE.error(ePrefix + e.message, e)
	}
}

Window_StatusBase.prototype.drawActorNickname = function(actor, x, y, width) 
{
    width = width || 270;
    this.resetTextColor();
	let icon = false;
	if(actor?._creatureID) icon = 234;
	let iconOffset = 0;
	if(icon) {this.drawIcon(icon, x, y); iconOffset = 33;};
    this.drawText(actor.nickname(), x + iconOffset, y, width);
};

MAGPIE_PDL.prototype.turnStart = function(user)
{
	this.updateResourceStates(user);
}

MAGPIE_PDL.prototype.turnEnd = function(user)
{
	//
}

MAGPIE_PDL.prototype.actionTargeted = function(user, target)
{
	if(user != target) return this.BATTLECORE.react(target)
}

MAGPIE_PDL.prototype.actionHit = function(a)
{
	a.addState(SHELDEX.MORALE.ENCOURAGED);
}

MAGPIE_PDL.prototype.actionReaction = function(a)
{
	a.addState(SHELDEX.MORALE.DISCOURAGED);
}

//
MAGPIE_PDL.prototype.actionDamaged = function(a)
{
	a.addState(SHELDEX.MORALE.SATISFIED);
}

//@audit action respond eval a.result()?
MAGPIE_PDL.prototype.actionRespond = function(b)
{
	b.addState(SHELDEX.MORALE.STRESSED);
	if(b.mind()) b.mind().newExp(b.result())
}

MAGPIE_PDL.prototype.actionAfter = function(a)
{
	const encouraged = a.isStateAffected(SHELDEX.MORALE.ENCOURAGED);
	const satisfied = a.isStateAffected(SHELDEX.MORALE.SATISFIED);
	//
	//event_exp archiving
	if(a.mind()) a.mind().AAR(a.result())
	//
	if(encouraged || satisfied) return
	a.addState(SHELDEX.MORALE.DISCOURAGED);
}

MAGPIE_PDL.prototype.actionFinish = function(b)
{
	//
}

MAGPIE_PDL.prototype.exhausted = function(user)
{
	user.addState(SHELDEX.STATE.TIRED);
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > Utilities
//------------------------------------------------------------------------
MAGPIE_PDL.prototype.getPlayerX = function()
{
    return $gamePlayer.x
}
MAGPIE_PDL.prototype.getPlayerY = function()
{
    return $gamePlayer.y
}
MAGPIE_PDL.prototype.getMapID = function()
{
    return $gameMap.mapId()
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
// #region - TERRITORY
//========================================================================
/**
 * @name 
 * @desc 
 */
//------------------------------------------------------------------------
// #region > proto
//------------------------------------------------------------------------
function MAGPIE_TERRITORY(data)
{
    this.initialize(data)
}
MAGPIE_TERRITORY.prototype.initialize = function(data)
{
    this.ID = Number(data?.ID) || Date.now();
    this.name = String(data?.name)
    this.desc = String(data?.desc)
    this.region = Number(data?.region)
    this.coords = [Number(data?.x),Number(data?.y)];
    this.geoloc = [Number(data?.lat), Number(data?.lon), Number(data?.ASL),Number(data?.celestialID)]
    this.biomeID = Number(data?.biomeID)
    this.fertility = Number(data?.fertility)
    /** @type {skillID[]} */
    this.deck = data?.deck || []
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
HIMS.PDL = function()
{
    console.info("PDL...")
    const systems = [
        HIMS.consoleGO("PDL_sync", $PDL?.isInit),
        HIMS.consoleGO("Database", false)
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
 * back to {@link MAGPIE.PDL.meta}
 * 
 */
//========================================================================
// END OF FILE
//========================================================================