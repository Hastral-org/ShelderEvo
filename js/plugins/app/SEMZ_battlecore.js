//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [Tier 4] v0.5.1 SEMZ_battlecore
 * @author Matheraptor
 * @url https://matheraptor.itch.io/
 *
 * @help
 *
 */
//#endregion
//========================================================================
/**
 *
 */
//========================================================================
//#region - INDEX
//========================================================================
var MAGPIE = MAGPIE || {};
MAGPIE.SHELDEREVO = MAGPIE.SHELDEREVO || {};
//#endregion
//========================================================================
/**
 * @name
 * @desc
 *
 */
//========================================================================
// #region - KEY
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > State
//------------------------------------------------------------------------

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
class MAGPIE_BATTLECORE {
  //
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 * @typedef {Object} CGCdeck
 */
//------------------------------------------------------------------------
// #region > utils
//------------------------------------------------------------------------
MAGPIE_BATTLECORE.error = function (message, error) {
  // return MAGPIE_HIMS.prototype.error(message, error);
  console.error(message, error);
};

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Getters
//------------------------------------------------------------------------
/**
 *
 * @param {Number} zoneID
 * @returns {CGC_zone}
 */
MAGPIE_BATTLECORE._get_CGC_zone = function (zoneID) {
  const ePrefix = "[HIMS]._get_CGC_zone: ";
  try {
    if (isNaN(zoneID)) throw new Error(`${zoneID} is invalid zoneID`);
    return $gameParty.leader()._extraZones[zoneID];
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @returns {CGCdeck}
 */
MAGPIE_BATTLECORE._get_deck = function () {
  return $gameParty.leader()._cardDeck;
};
MAGPIE_BATTLECORE._get_speciesCard = function () {
  const deck = this._get_deck();
  return deck._data.find((card) => $dataSkills[card._skillId]?.meta?.isSpecies);
};
MAGPIE_BATTLECORE._get_spriteset = function () {
  return SceneManager._scene._spriteset;
};
MAGPIE_BATTLECORE._get_deckSprite = function () {
  return SceneManager._scene._deckSprite;
};
MAGPIE_BATTLECORE._get_massVariants = function () {
  const MASS = SHELDEX.STATE.RESOURCE_MASS;
  const [full] = MASS;
  return { full };
};
MAGPIE_BATTLECORE._get_aggroVariants = function () {
  const AGGRO = SHELDEX.STATE.RESOURCE_AGGRO;
  const [full] = AGGRO;
  return { full };
};
MAGPIE_BATTLECORE._get_dexVariants = function () {
  const DEX = SHELDEX.STATE.RESOURCE_DEX;
  const [full] = DEX;
  return { full };
};
MAGPIE_BATTLECORE._get_senVariants = function () {
  const SEN = SHELDEX.STATE.RESOURCE_SEN;
  const [full] = SEN;
  return { full };
};
MAGPIE_BATTLECORE._get_staminaVariants = function () {
  const STA = SHELDEX.STATE.RESOURCE_STA;
  const [full, mid, low] = STA;
  return { low, mid, full };
};
MAGPIE_BATTLECORE._get_energyVariants = function () {
  const NRG = SHELDEX.STATE.RESOURCE_NRG;
  const [empty, low, mid, high, full] = NRG;
  return { empty, low, mid, high, full };
};
/**
 *
 * @returns {import("./SEMZ_main").icon_index[]}
 */
MAGPIE_BATTLECORE._get_classIcons = function () {
  const creature = SHELDEX.ICON.CREATURE;
  return [null, creature, creature, creature, creature];
};
MAGPIE_BATTLECORE._get_playerX = function () {
  return $gamePlayer.x;
};
MAGPIE_BATTLECORE._get_playerY = function () {
  return $gamePlayer.y;
};
MAGPIE_BATTLECORE._get_mapId = function () {
  return $gameMap.mapId();
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Setters
//------------------------------------------------------------------------
MAGPIE_BATTLECORE._set_removeCardFromDeck = function (card) {
  return $gameParty.leader()._cardDeck.remove(card);
};
MAGPIE_BATTLECORE._set_staminaSprites = function (sprite) {
  const h = 45;
  const w = 45;
  sprite.stretchScaleTo(true, h, w);
};
MAGPIE_BATTLECORE._set_actorSpritePosition = function (actorId, x, y) {
  const actorSprites = this._get_spriteset()._actorSprites;
  const actor = actorSprites.find(
    (sprite) => sprite._actor._actorId === actorId,
  );
  actor._homeX = x;
  actor._homeY = y;
};
MAGPIE_BATTLECORE._set_deckSheet = function (sheet = "") {
  const deckSprite = this._get_deckSprite();
  const index = deckSprite._index;
  deckSprite._zoneData.sheet = sheet;
  deckSprite.destroy();
  const scene = SceneManager._scene;
  scene.createDeckSprite();
  scene.setDecksSkillWindow();
  deckSprite._index = index;
};
MAGPIE_BATTLECORE._changeCurrentActor = BattleManager.changeCurrentActor;
BattleManager.changeCurrentActor = function (forward) {
  const oldActor = this._currentActor;
  MAGPIE_BATTLECORE._changeCurrentActor.call(this, forward);
  const newActor = this._currentActor;
  // if (oldActor && SceneManager._scene._spriteset) {
  //   const oldSprite = SceneManager._scene._spriteset._actorSprites.find(
  //     (s) => s._actor === oldActor,
  //   );
  //   MAGPIE_BATTLECORE._unset_cardSprite(oldSprite);
  // }
  if (newActor && SceneManager._scene._spriteset) {
    const newSprite = MAGPIE_BATTLECORE._get_actorSprite(newActor);
    MAGPIE_BATTLECORE._set_cardSprite(newSprite);
  }
};
MAGPIE_BATTLECORE._get_actorSprite = function (actor) {
  return this._get_spriteset()._actorSprites.find((s) => s._actor === actor);
};
MAGPIE_BATTLECORE._set_cardSprite = function (sprite) {
  if (!sprite || !sprite.parent) return;
  const parentContainer = sprite.parent;
  parentContainer.removeChild(sprite);
  parentContainer.addChild(sprite);
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > updates
//------------------------------------------------------------------------
MAGPIE_BATTLECORE._update_resourceStates = function (user) {
  this._update_staminaStates(user);
  this._update_energyStates(user);
};
MAGPIE_BATTLECORE._update_staminaStates = function (user) {
  const ePrefix = "[BATTLECORE]._update_staminaStates: ";
  try {
    const states = SHELDEX.STATE.RESOURCE_STA;
    // console.log(ePrefix + `states[${states}]`);
    states.forEach((stateId) => user.removeState(stateId));
    const { low, mid, full } = this._get_staminaVariants();
    if (user.mp < 1) return user.addState(low);
    if (user.mp < user.mmp) return user.addState(mid);
    return user.addState(full);
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};

MAGPIE_BATTLECORE._update_energyStates = function (user) {
  const states = SHELDEX.STATE.RESOURCE_NRG;
  const { empty, low, mid, high, full } = this._get_energyVariants();
  states.forEach((stateId) => user.removeState(stateId));
  if (user.tp < 1) return user.addState(empty);
  if (user.tpRate() < 0.25) return user.addState(low);
  if (user.tpRate() < 0.5) return user.addState(mid);
  if (user.tpRate() < 0.75) return user.addState(high);
  return user.addState(full);
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Window
//------------------------------------------------------------------------
Window_StatusBase.prototype.drawActorClass = function (actor, x, y, width) {
  const ePrefix = "[WINDOW].drawActorClass: ";
  try {
    if (isNaN(width)) width = 168;
    this.resetTextColor();
    const classIcons = MAGPIE_BATTLECORE._get_classIcons();
    const actorClass = actor.currentClass();
    if (!actorClass) throw new Error(`'${actorClass}' is invalid class`);
    const classIcon = classIcons[actorClass.id];
    this.drawIcon(classIcon, x, y);
    this.drawText(actorClass.name, x + 33, y, width);
  } catch (e) {
    MAGPIE_BATTLECORE.error(ePrefix + e.message, e);
  }
};
Window_StatusBase.prototype.drawActorNickname = function (actor, x, y, width) {
  if (isNaN(width)) width = 270;
  this.resetTextColor();
  const icon = SHELDEX.ICON.DRAW_ACTOR_NICKNAME_ICON;
  if (actor?._creatureID) icon = SHELDEX.ICON.SPECIES;
  let iconOffset = 0;
  if (icon) {
    this.drawIcon(icon, x, y);
    iconOffset = 33;
  }
  this.drawText(actor.nickname(), x + iconOffset, y, width);
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Setups
//------------------------------------------------------------------------
MAGPIE_BATTLECORE._setup_deckInjuries = function () {
  const ePrefix = "[BATTLECORE]._setup_deckInjuries: ";
  try {
    const leader = $gameParty.leader();
    const deck = leader._cardDeck._data;
    const zoneID = SHELDEX.CGC.ZONES.INJURY;
    const injuries = this._get_CGC_zone(zoneID)._data;
    const INJ = leader._INJ;
    console.log(`INJ: ${INJ}`);
    if (!Array.isArray(INJ) || INJ.length < 1) return;
    INJ.forEach((card) => {
      const nextCard = deck.findIndex((e) => e === card);
      leader.moveCard(nextCard, deck, injuries);
    });
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};
MAGPIE_BATTLECORE._setup_startingCards = function () {
  const ePrefix = "[HIMS].setupStartingCards: ";
  try {
    const deck = this._get_deck();
    const speciesCard = this._get_speciesCard();
    if (!speciesCard) return;
    this._set_removeCardFromDeck(speciesCard);
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};

MAGPIE_BATTLECORE._setup_actorSprites = function () {
  const cardX = SHELDEX.CGC.CARD.ACTOR_SPRITE.x;
  const cardH = SHELDEX.CGC.CARD.BATTLER_SPRITE.h;
  const offsetY = Math.floor(cardH * 0.1);
  const cardOffsetX = SHELDEX.CGC.CARD.ACTOR_SPRITE.offset_x;
  const cardOffsetY = SHELDEX.CGC.CARD.ACTOR_SPRITE.offset_y;
  const x = cardX + cardOffsetX;
  const y = Graphics.boxHeight - cardOffsetY;
  const sprites = SceneManager._scene._spriteset._actorSprites;
  const initY = y - (sprites.length - 1) * offsetY;
  const STA = SHELDEX.STATE.RESOURCE_STA;
  for (let i = 0; i < sprites.length; i++) {
    sprites[i]._homeX = x;
    sprites[i]._homeY = initY + i * offsetY;
    sprites[i].children
      .filter((childSprite) => STA.includes(childSprite._stateId))
      .forEach((staminaSprite) => this._set_staminaSprites(staminaSprite));
  }
};
MAGPIE_BATTLECORE._setup_enemySprites = function () {
  const sprites = this._get_spriteset()._enemySprites;
  const STA = SHELDEX.STATE.RESOURCE_STA;
  sprites.forEach((sprite, index) =>
    sprite.children
      .filter((childSprite) => STA.includes(childSprite._stateId))
      .forEach((staminaSprite) => this._set_staminaSprites(staminaSprite)),
  );
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Battle
//------------------------------------------------------------------------
MAGPIE_HIMS.prototype._territory_enter = function (territoryID) {
  //
};
MAGPIE_HIMS.prototype.turnStart = function (user) {
  return MAGPIE_BATTLECORE.turnStart(user);
};
MAGPIE_HIMS.prototype.turnEnd = function (user) {
  return MAGPIE_BATTLECORE.turnEnd(user);
};
MAGPIE_HIMS.prototype.actionTargeted = function (user, target) {
  return MAGPIE_BATTLECORE.actionTargeted(user, target);
};
MAGPIE_HIMS.prototype.actionHit = function (a) {
  return MAGPIE_BATTLECORE.actionHit(a);
};
MAGPIE_HIMS.prototype.actionReaction = function (a) {
  return MAGPIE_BATTLECORE.actionReaction(a);
};
MAGPIE_HIMS.prototype.actionDamaged = function (a) {
  return MAGPIE_BATTLECORE.actionDamaged(a);
};
MAGPIE_HIMS.prototype.actionRespond = function (b) {
  return MAGPIE_BATTLECORE.actionRespond(b);
};
MAGPIE_HIMS.prototype.actionAfter = function (a) {
  return MAGPIE_BATTLECORE.actionAfter(a);
};
MAGPIE_HIMS.prototype.actionFinish = function (b) {
  return MAGPIE_BATTLECORE.actionFinish(b);
};
MAGPIE_HIMS.prototype.exhausted = function (user) {
  return MAGPIE_BATTLECORE.exhausted(user);
};
MAGPIE_BATTLECORE.setupBattle = function () {
  const scene = SceneManager._scene;
  scene._statusWindow.alpha = 0;
  this._setup_actorSprites();
  this._setup_enemySprites();
  this._setup_startingCards();
  const leader = $gameParty.leader();
  this._setup_deckInjuries(leader);
};
MAGPIE_BATTLECORE.turnStart = function (user) {
  this._update_resourceStates(user);
};
MAGPIE_BATTLECORE.turnEnd = function (user) {
  //
};
MAGPIE_BATTLECORE.actionTargeted = function (user, target) {
  if (user !== target) return this.react(target);
};
MAGPIE_BATTLECORE.actionHit = function (a) {
  a.addState(SHELDEX.MORALE.ENCOURAGED);
};
MAGPIE_BATTLECORE.actionReaction = function (a) {
  a.addState(SHELDEX.MORALE.DISCOURAGED);
};
MAGPIE_BATTLECORE.actionDamaged = function (a) {
  a.addState(SHELDEX.MORALE.SATISFIED);
};
MAGPIE_BATTLECORE.actionRespond = function (b) {
  b.addState(SHELDEX.MORALE.STRESSED);
};
MAGPIE_BATTLECORE.actionAfter = function (a) {
  const isEncouraged = a.isStateAffected(SHELDEX.MORALE.ENCOURAGED);
  const isSatisfied = a.isStateAffected(SHELDEX.MORALE.SATISFIED);
  if (isEncouraged || isSatisfied) return;
  a.addState(SHELDEX.MORALE.DISCOURAGED);
};
MAGPIE_BATTLECORE.actionFinish = function (b) {
  //@todo actionFinish
};
MAGPIE_BATTLECORE.exhausted = function (user) {
  user.addState(SHELDEX.STATE.TIRED);
};
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
// #region - BATTLER
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > State
//------------------------------------------------------------------------
/**
 *
 * @param {stateID[]} statePool
 * @param {stateID} newStateId
 */
Game_Battler.prototype.changeState = function (statePool, newStateId) {
  const ePrefix = "[BATTLECORE].changeState: ";
  try {
    if (!statePool || !Array.isArray(statePool))
      throw new Error(`'${statePool}' is invalid state array`);
    if (isNaN(newStateId)) throw new Error(`${newStateId} is invalid stateID`);
  } catch (e) {
    $ShelderEvo.error(ePrefix + e.message, e);
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
// #region > Phase
//------------------------------------------------------------------------
MAGPIE_HIMS.prototype.onRestFull = function (user) {
  if (!user?.isActor()) return MAGPIE_BATTLECORE._set_switchDiscard(false);
  this.showText({
    text: "Stamina is full.\nWant to discard 1 card, to draw 1?",
  });
  this.showChoices({
    choices: ["Skip", "Discard 1 to draw 1"],
    posType: 1,
    callback: (n) => {
      MAGPIE_BATTLECORE._set_switchDiscard(n ? true : false);
    },
  });
};
MAGPIE_BATTLECORE._set_switchDiscard = function (value = false) {
  $gameSwitches.setValue(SHELDEX.SWITCH.DISCARD, value);
};
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
// #region - SCENE
//========================================================================

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
 *
 */
//========================================================================
// END OF FILE
//========================================================================
