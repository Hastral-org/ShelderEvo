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
/**
 * @typedef {Number} entityID
 * @param {*} data
 */
MAGPIE_ENTITY.prototype.initialize = function (data) {
  this.ID = Number(data?.ID) || Date.now();
  this._firmware = "MAGPIE_ENTITY";
  this.name = String(data?.name);
  this.type = Number(data?.type);
  this.comp = {
    /** @type {stateID[]} */
    states: data?.states,
  };
};
/**
 *
 * @param {String} message
 * @param {String} level
 * @param {Boolean} logToConsole
 */
MAGPIE_ENTITY.prototype.log = function (message, level, logToConsole) {
  MAGPIE_HIMS.prototype.log({ message, level, logToConsole });
};

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > refresh
//------------------------------------------------------------------------
/**
 *
 * @param {Number} swtichID
 * @param {Number} dt
 */
MAGPIE_ENTITY.prototype.refresh = function (switchID, dt) {
  const ePrefix = `[ENTITY-${this.ID}].refresh: `;
  try {
    //
  } catch (e) {
    MAGPIE_HIMS.error(ePrefix + e.message, e);
  }
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
 * ID: Number,
 * name: String,
 * speciesID: Number,
 * comp: {
 * nickname: String,
 * birthday: gameday,
 * level: Number,
 * isActor: Number,
 * states: stateID[]
 * }
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
 * @param {String} message
 * @param {Error} error
 */
MAGPIE_CREATURE.prototype.error = function (message, error) {
  MAGPIE_HIMS.error(message, error);
};
MAGPIE_CREATURE.prototype.ePrefix = function (funcName) {
  return `[CREATURE-${this.ID}].${funcName}: `;
};
/**
 *
 * @param {creature_data} data
 */
MAGPIE_CREATURE.prototype.initialize = function (data) {
  this.ID = Number(data?.ID) || Date.now();
  this._firmware = "MAGPIE_CREATURE";
  this.name = String(data?.name);
  this.type = Number(data?.speciesID);
  this.comp = {
    nickname: String(data?.nickname),
    birthday: Number(data?.birthday),
    level: Number(data?.level) || 0,
    /** @type {Boolean} */
    isActor: Number(data?.isActor),
    /** @type {stateID[]} */
    states: data?.states || [],
  };
};
/**
 * @todo creature.setup
 * @returns
 */
MAGPIE_CREATURE.prototype.setup = function () {
  const ePrefix = this.ePrefix("setup");
  try {
    return true;
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};
MAGPIE_CREATURE.prototype._get_name = function (options) {
  return this.name;
};
MAGPIE_CREATURE.prototype.states = function () {
  return this.comp.states;
};
MAGPIE_CREATURE.prototype.isActor = function () {
  return !!Number(this.comp?.isActor);
};
MAGPIE_CREATURE.prototype.actorId = function () {
  return Number(this.comp?.isActor);
};
/**
 *
 * @returns {skillCard}
 */
MAGPIE_CREATURE.prototype.species = function () {
  return this.skillCard();
};
MAGPIE_CREATURE.prototype.skillCard = function () {
  return $dataSkills[this.type];
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
MAGPIE_CREATURE.prototype.nickname = function (options) {
  if (options?.self) return this.comp.nickname;
  return this.species().name;
};
MAGPIE_CREATURE.prototype._get_battlerName = function () {
  const name = this.nickname();
  return name.replaceAll(" ", "_");
};
MAGPIE_CREATURE._get_creature = function (creatureID) {
  return $entity.getByID(creatureID);
};
MAGPIE_CREATURE.prototype.birthday = function (options) {
  return this.comp.birthday;
};
MAGPIE_CREATURE.prototype.level = function () {
  const level = Number(this.comp.level);
  if (isNaN(level)) this.initLevel();
  return this.comp.level;
};
MAGPIE_CREATURE.prototype.evo = function () {
  return Number(this.skillCard()?.meta?.evo);
};
MAGPIE_CREATURE.prototype.sex = function (options) {
  const sex = Number(this.comp?.sex);
  if (isNaN(sex)) this.comp.sex = this.initSex();
  if (options?.textual) return Object.keys(SHELDEX.CREATURE_SEXES)[sex];
  return sex;
};
MAGPIE_CREATURE.prototype.initSex = function () {
  const sexes = Object.values(SHELDEX.CREATURE_SEXES);
  const index = Math.floor(Math.random() * sexes.length);
  return sexes[index];
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
// /**
//  *
//  * @param {creature_data} options
//  */
// MAGPIE_CREATURE.prototype.initCreature = function (options) {
//   const ePrefix = this.ePrefix("initCreature");
//   try {
//     const speciesID = Number(options?.speciesID);
//     const creatureID = Number(options?.ID);
//     if (!creatureID) throw new Error(`${creatureID} is invalid creatureID`);
//     if (!speciesID) {
//       //@todo creature.initCreature.speciesID===0
//       throw new Error(`${speciesID} is invalid speciesID`);
//     }
//     const creature = MAGPIE_CREATURE._get_creature(creatureID);
//     if (!creature?.isCreature())
//       throw new Error(`${creature} is invalid creature`);
//     this._set_species(speciesID);
//     this.ID = creatureID;
//   } catch (e) {
//     this.error(ePrefix + e.message, e);
//   }
// };
/**
 *
 * @param {creature_data} options
 */
MAGPIE_HIMS.prototype.spawnCreature = function (options) {
  const ePrefix = this.ePrefix("spawnCreature");
  try {
    /** @type {creature_data} */
    const data = {
      speciesID: options?.speciesID,
      name: options?.name,
      comp: options?.comp,
    };
    const creature = new MAGPIE_CREATURE(data);
    const setup = creature?.setup();
    if (!setup) throw new Error("unable to setup");
    const actorId = creature.actorId();
    if (actorId) creature.setupActor(actorId);
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {Number} actorId
 * @returns {Boolean}
 */
MAGPIE_CREATURE.prototype.setupActor = function (actorId) {
  const ePrefix = this.ePrefix("setupActor");
  try {
    if (!Number(actorId)) actorId = Number(this.comp.isActor);
    const actor = $gameActors[actorId];
    if (!actor) throw new Error(`${actorId} is invalid actorId`);
    actor._creatureID = this.ID;
    if (!Number(this.comp.isActor)) this.comp.isActor = actorId;
    return true;
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};
MAGPIE_CREATURE.prototype._set_species = function (speciesID) {
  if (!Number(speciesID)) return false;
  this.type = speciesID;
};
MAGPIE_CREATURE.prototype.spawnEnemy = function (enemyIndex = NaN) {
  const ePrefix = this.ePrefix("spawnEnemy");
  try {
    const spawnStates = this.states() || [];
    const stats = SHELDEX._get_baseStatStates();
    spawnStates.push(...stats);
    if (!enemyIndex) enemyIndex = $gameTroop.aliveMembers().length;
    const enemyID = this._get_enemyID();
    const members = $gameTroop.members();
    const enemy = members[enemyIndex];
    enemy.appear();
    enemy.gainHp(1);
    enemy.transform(enemyID);
    const newSpawnIndex = $gameTroop.aliveMembers().length - 1;
    const newCreature = members[newSpawnIndex];
    newCreature._name = this._get_battlerName();
    $gameTroop.makeUniqueNames();
    // newCreature.initCreature(this.ID);
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
    this.error(ePrefix + e.message, e);
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
MAGPIE_CREATURE.prototype.generateParams = function () {
  const ePrefix = this.ePrefix("generateParams");
  try {
    const level = this.level();
    const sex = this.sex();
    const skillCard = this.skillCard();
    const mass = this._get_mass();
    const aggro = this._get_aggro();
    const dex = this._get_dex();
    const sen = this._get_sen();
    const sta = this._get_sta();
    const end = this._get_end();
    const fit = this._get_fit();
    const res = this._get_res();
    const diet = this._get_diet();
    const params = {
      level,
      sex,
      mass,
      aggro,
      dex,
      sen,
      sta,
      end,
      fit,
      res,
      diet,
    };
    return params;
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};
MAGPIE_CREATURE.prototype._get_mass = function (options) {
  const battler = this.battler();
  if (battler) return battler.def;
  const base = this.physique().params[SHELDEX.PARAM.MASS];
};
MAGPIE_CREATURE.prototype._get_aggro = function (options) {
  const battler = this.battler();
  if (battler) return battler.atk;
  return this.physique().params[SHELDEX.PARAM.AGGRO];
};
MAGPIE_CREATURE.prototype._get_dex = function (options) {
  const battler = this.battler();
  if (battler) return battler.mdf;
  return this.physique().params[SHELDEX.PARAM.DEX];
};
MAGPIE_CREATURE.prototype._get_sen = function (options) {
  const battler = this.battler();
  if (battler) return battler.mat;
  return this.physique().params[SHELDEX.PARAM.SEN];
};
MAGPIE_CREATURE.prototype._get_sta = function (options) {
  const battler = this.battler();
  if (battler) return battler.mmp;
  return this.metabolism().params[SHELDEX.PARAM.END];
};
MAGPIE_CREATURE.prototype._get_fit = function (options) {
  const battler = this.battler();
  if (battler) return battler.mhp;
  return this._get_sumStats();
};
MAGPIE_CREATURE.prototype._get_sumStats = function () {
  const mass = this._get_mass();
  const aggro = this._get_aggro();
  const dex = this._get_dex();
  const sen = this._get_sen();
  return mass + aggro + dex + sen;
};
MAGPIE_CREATURE.prototype._get_diet = function (options) {
  const sum = this._get_sumStats();
  const sta = this._get_sta();
  return sta * sum;
};
MAGPIE_CREATURE.prototype.initLevel = function () {
  const ePrefix = this.ePrefix("initLevel");
  try {
    const skillCard = this.skillCard();
    if (!skillCard) throw new Error(`${skillCard} is invalid skillCard`);
    const gameday = $TIME.gameday;
    const birthday = this.birthday();
    if (birthday > gameday)
      throw new Error(`'${birthday}' is invalid birthday`);
    const evo = this.evo();
    const level = Math.ceil((gameday - birthday) / evo);
    this.comp.level = level;
    return level;
  } catch (e) {
    this.error(ePrefix + e.message, e);
  }
};
MAGPIE_CREATURE.prototype.growthExp = function () {
  return this.level() * this.evo();
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
