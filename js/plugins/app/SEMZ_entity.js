//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [Tier 4] v0.5.1 SEMZ_entity
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
MAGPIE.ENTITY = {};

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
function MAGPIE_ENTITY(data) {
  this.initialize(data);
}
MAGPIE_ENTITY.prototype.initialize = function (data) {
  this.ID = Number(data?.ID) || Date.now();
  this.name = String(data?.name);
  this.type = Number(data?.type);
  this.comp = {};
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
// #region - CREATURE
//========================================================================
/**
 * @name
 * @desc
 * @typedef {{
 * _isActor: Boolean,
 * _name: String,
 * _type: Number,
 * }} creature_data
 * @typedef {Number} creatureId
 * @typedef {Number} speciesId
 * @typedef {Number} creature_lvl
 *
 *
 */
//------------------------------------------------------------------------
// #region > Proto
//------------------------------------------------------------------------
function MAGPIE_CREATURE(data) {
  this.initialize(data);
}
MAGPIE_CREATURE.prototype = Object.create(MAGPIE_ENTITY.prototype);
MAGPIE_CREATURE.prototype.constructor = MAGPIE_CREATURE;
/**
 *
 * @param {creature_data} data
 */
MAGPIE_CREATURE.prototype.initialize = function (data) {
  this.ID = Number(data?.ID) || Date.now();
  this._name = String(data?.name);
  this._type = Number(data?.type);
  this.comp = {};
  /** @type {Boolean} */
  this._isActor = data?.isActor || false;
  /** @type {stateID[]} */
  this._states = data?.states || [];
};
MAGPIE_CREATURE.prototype.name = function () {
  return this._name;
};
/**
 *
 * @returns {skillCard}
 */
MAGPIE_CREATURE.prototype.species = function () {
  return this.skillCard();
};
MAGPIE_CREATURE.prototype.skillCard = function () {
  return $dataSkills[this._type];
};
MAGPIE_CREATURE.prototype.physique = function () {
  const physiqueId = Number(this.species().meta.physiqueId);
  return $dataArmors[physiqueId];
};
MAGPIE_CREATURE.prototype.metabolism = function () {
  const metabolismId = Number(this.species().meta.metabolismId);
  return $dataArmors[metabolismId];
};
MAGPIE_CREATURE.prototype.reproduction = function () {
  const reproductionId = Number(this.species().meta.reproductionId);
  return $dataArmors[reproductionId];
};
MAGPIE_CREATURE.prototype.isCreature = function () {
  return this?.constructor?.name === "MAGPIE_CREATURE";
};
MAGPIE_CREATURE.prototype.nickname = function () {
  return this.species().name();
};
MAGPIE_CREATURE._get_creature = function (creatureID) {
  return $entity.getByID(creatureID);
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > getters
//------------------------------------------------------------------------
/**
 * @desc returns the enemy index from the RMMZ 'Enemies' db page
 * @returns {Number}
 */
MAGPIE_CREATURE.prototype._get_enemyID = function () {
  return 4;
};
/**
 * @todo creature._get_habitat
 * @returns
 */
MAGPIE_CREATURE.prototype._get_habitat = function () {
  return;
};

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region >
//------------------------------------------------------------------------

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > init
//------------------------------------------------------------------------
/**
 *
 * @param {{
 * ID: creatureId,
 * speciesID: speciesId,
 * LVL: creature_lvl
 * }} options
 */
MAGPIE_CREATURE.prototype.initCreature = function (options) {
  const ePrefix = "[CREATURE].initCreature: ";
  try {
    const speciesID = Number(options?.speciesID);
    const creatureID = Number(options?.ID);
    if (!creatureID) throw new Error(`${creatureID} is invalid creatureID`);
    if (!speciesID) {
      //@todo creature.initCreature.speciesID===0
      throw new Error(`${speciesID} is invalid speciesID`);
    }
    const creature = MAGPIE_CREATURE._get_creature(creatureID);
    if (!creature?.isCreature())
      throw new Error(`${creature} is invalid creature`);
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
MAGPIE_CREATURE.prototype.spawnEnemy = function (enemyIndex = NaN) {
  const ePrefix = `[CREATURE-${this.ID}]`;
  try {
    const spawnStates = this._states || [];
    const stats = SHELDEX._get_baseStatStates();
    spawnStates.push(...stats);
    const nextEnemyIndex = $gameTroop.aliveMembers().length;
    const enemyID = this._get_enemyID();
    const members = $gameTroop.members();
    const enemy = members[nextEnemyIndex];
    enemy.appear();
    enemy.gainHp(1);
    enemy.transform(enemyID);
    const newSpawnIndex = $gameTroop.aliveMembers().length - 1;
    const newCreature = members[newSpawnIndex];
    newCreature._name = this.species().name();
    $gameTroop.makeUniqueNames();
    newCreature.initCreature(this.ID);
    newCreature.setupClass(Number($dataEnemies[enemyID].meta.classId));
    newCreature.changeExp(this.growthExp());
    const params = SHELDEX.PARAM;
    newCreature.addParam(params.END, this._get_endurance() - 1);
    newCreature.addParam(params.AGGRO, this._get_aggro() - 1);
    newCreature.addParam(params.MASS, this._get_mass() - 1);
    newCreature.addParam(params.SEN, this._get_sen() - 1);
    newCreature.addParam(params.DEX, this._get_dex() - 1);
    newCreature.addParam(params.FIT, this._get_fit());
    newCreature.addParam(params.DIET, this._get_diet());
    newCreature.recoverAll();
    newCreature.setTp(newCreature.mtp);
    if (newCreature.tpRate() < SHELDEX.HUNGER_TPRATE) {
      spawnStates.push(SHELDEX.INJURY.HUNGER);
    }
    for (const stateId of spawnStates) {
      newCreature.addState(stateId);
    }
    newCreature.addState(SHELDEX.STATE.IMMORTAL);
    newCreature._habitat = this._get_habitat() || 0;
    if (newCreature._habitat > 0) newCreature.addState(newCreature._habitat);
    this._gameday = $gameVariables.value(MAGPIE.KEY.GAMEDAY);
    this._isSpawned = true;
    return true;
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
MAGPIE_CREATURE.prototype.unspawnEnemy = function () {
  const enemy = this.enemy();
  if (!enemy) return false;
  enemy.hide();
};
/**
 *
 * @returns {Game_Enemy}
 */
MAGPIE_CREATURE.prototype.enemy = function () {
  return $gameTroop.members().findIndex((e) => e?._creatureID === this.ID);
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Enemy
//------------------------------------------------------------------------
// Game_Enemy.prototype.;
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
// #region - SPECIES
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Proto
//------------------------------------------------------------------------

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 * @typedef {{
 * id: Number,
 * effects: skillEffects,
 * meta: {
 * genus: String,
 * species: String,
 * physiqueId: String,
 * metabolismId: String,
 * reproductionId: String,
 * classId: String,
 * enemyId: String,
 * },
 * name: String,
 * iconIndex: icon_index,
 * }} skillCard
 *
 * @typedef {Object} skillEffects
 */
//------------------------------------------------------------------------
// #region > SkillCard
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
 *
 *
 */
//========================================================================
// END OF FILE
//========================================================================
