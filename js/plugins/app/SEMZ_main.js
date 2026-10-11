//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [Tier 2] v0.5.1 SEMZ_main
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
 *
 *
 *
 */
//========================================================================
//#region - INDEX
//========================================================================
var MAGPIE = MAGPIE || {};
MAGPIE.SHELDEREVO = {};
MAGPIE.SHELDEREVO.meta = {
  name: MAGPIE.meta.name + " Shelder Evolution™",
  version: MAGPIE.meta.version,
  firmwareName: "SEMZ_main",
  firmwareDate: MAGPIE.meta.firmwareDate,
};
/** @type {MAGPIE_HIMS} */
class ShelderEvo {
  //
}
ShelderEvo.meta = MAGPIE.SHELDEREVO.meta;
var $ShelderEvo = null;
//#endregion
//========================================================================
/**
 * @name
 * @desc
 * @typedef {Number} percentage %
 * @typedef {Number} coefficient
 * @typedef {Number} index array[index]
 * @typedef {index} variable_index
 * @typedef {index} switch_index
 * @typedef {index} ce_index common event index
 * @typedef {index} state_index
 * @typedef {Number} entityID Date.now() at creation
 * @typedef {Number} skillID
 * @typedef {Number} stateID
 * @typedef {state_index} injury_index
 * @typedef {state_index} move_index
 * @typedef {state_index} mood_index
 * @typedef {state_index} posture_index
 * @typedef {state_index} morale_index
 * @typedef {state_index} resource_index
 * @typedef {state_index} growth_index
 * @typedef {[state_index, state_index]} habitat_combo
 * @typedef {[state_index, state_index, state_index, state_index]} buff
 * @typedef {{m: state_index, a: state_index, d: state_index, s: state_index}} combo
 * @typedef {index} ICV
 * @typedef {Number} creature_level
 * @typedef {Number} equip_slot
 * @typedef {Number} icon_index
 * @typedef {[icon_index, icon_index]} keyboard_icons [IDLE, PRESSED]
 */
//========================================================================
// #region - KEY
//========================================================================
/**
 *
 */
class SHELDEX {
  //
}
SHELDEX.STATE = {};
SHELDEX.ICON = {};
SHELDEX.SWITCH = {};
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > State
//------------------------------------------------------------------------
SHELDEX.STATE.meta = "";
SHELDEX.STATE.KO = 1;
SHELDEX.STATE.COMFORT = 2;
SHELDEX.STATE.IMMORTAL = 3;
SHELDEX.STATE.RESERVE_MAX = 4;
SHELDEX.STATE.RESERVE = 5;
SHELDEX.STATE.TIRED = 6;
SHELDEX.STATE.RESERVE_MID = 7;
SHELDEX.STATE.RESERVE_LOW = 8;
SHELDEX.STATE.DEAD = 9;
SHELDEX.STATE.STAMINA = 10;
SHELDEX.STATE.INSTINCT = 11;
SHELDEX.STATE.INJURED = 12;
SHELDEX.STATE.STUNNED = 13;
SHELDEX.STATE.UNCONSCIOUS = 14;
SHELDEX.STATE.SLEEPING = 15;
SHELDEX.STATE.RESTING = 16;
SHELDEX.STATE.NRG = 17;
SHELDEX.STATE.DIET = 18;
SHELDEX.STATE.EXERTION = 119;
SHELDEX.STATE.BLEEDING = 118;
SHELDEX.STATE.AIMING = 141;
SHELDEX.STATE.MATING = 147;
SHELDEX.STATE.RECLAIM = 148;
SHELDEX.STATE.SACRIFICE = 149;
SHELDEX.STATE.INJURY = 150;
SHELDEX.STATE.STARTLED = 129;
SHELDEX.STATE.COMBO = {
  mass: 125,
  aggro: 126,
  dex: 127,
  sen: 128,
};
SHELDEX.STATE.COUNTER = {
  mass: 121,
  aggro: 122,
  dex: 123,
  sen: 124,
};
SHELDEX.INJURY = {};
SHELDEX.INJURY.FAT = 112;
SHELDEX.INJURY.STIMULANT = 113;
SHELDEX.INJURY.FATIGUE = 114;
SHELDEX.INJURY.HUNGER = 115;
/** @type {Enumerator<Number>} @desc hunger floor trigger */
SHELDEX.HUNGER_TPRATE = 20;
SHELDEX.INJURY.THIRST = 116;
SHELDEX.INJURY.POISON = 117;
SHELDEX.STATE.BUFF = {
  massUP: 130,
  massDOWN: 131,
  aggroUP: 132,
  aggroDOWN: 133,
  dexUP: 134,
  dexDOWN: 135,
  senUP: 136,
  senDOWN: 137,
  massHabUP: 85,
  aggroHabUP: 86,
  dexHabUP: 87,
  senHabUP: 88,
  massHabDOWN: 89,
  aggroHabDOWN: 90,
  dexHabDOWN: 91,
  senHabDOWN: 92,
  massBuff: 101,
  aggroBuff: 102,
  dexBuff: 103,
  senBuff: 104,
  massDebuff: 105,
  aggroDebuff: 106,
  dexDebuff: 107,
  senDebuff: 108,
};
SHELDEX.STATE.RESOURCE_MASS = [71];
SHELDEX.STATE.RESOURCE_AGGRO = [72];
SHELDEX.STATE.RESOURCE_DEX = [73];
SHELDEX.STATE.RESOURCE_SEN = [74];
SHELDEX.STATE.RESOURCE_STA = [75, 77, 78];
SHELDEX.STATE.RESOURCE_NRG = [82, 81, 80, 79, 76];
SHELDEX._get_baseStatStates = function () {
  const S = SHELDEX.STATE;
  return [
    S.RESOURCE_MASS[0],
    S.RESOURCE_AGGRO[0],
    S.RESOURCE_DEX[0],
    S.RESOURCE_SEN[0],
  ];
};
SHELDEX.MORALE = {};
SHELDEX.MORALE.ENCOURAGED = 51;
SHELDEX.MORALE.AGGRAVATED = 52;
SHELDEX.MORALE.SATISFIED = 53;
SHELDEX.MORALE.STRESSED = 54;
SHELDEX.MORALE.DISCOURAGED = 55;
SHELDEX.MORALE.RELIEVED = 56;
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Params
//------------------------------------------------------------------------
SHELDEX.PARAM = {};
SHELDEX.PARAM.BASE = {
  mhp: 0,
  mmp: 1,
  atk: 2,
  def: 3,
  mat: 4,
  mdf: 5,
  agi: 6,
  luk: 7,
  mtp: 10,
};
/** @type {Enumerator<Number>} @desc Fitness */
SHELDEX.PARAM.FIT = SHELDEX.PARAM.BASE.mhp;
/** @type {Enumerator<Number>} @desc Endurance */
SHELDEX.PARAM.END = SHELDEX.PARAM.BASE.mmp;
/** @type {Enumerator<Number>} @desc Aggro */
SHELDEX.PARAM.AGGRO = SHELDEX.PARAM.BASE.atk;
/** @type {Enumerator<Number>} @desc Mass */
SHELDEX.PARAM.MASS = SHELDEX.PARAM.BASE.def;
/** @type {Enumerator<Number>} @desc Dexterity */
SHELDEX.PARAM.DEX = SHELDEX.PARAM.BASE.mdf;
/** @type {Enumerator<Number>} @desc Sense */
SHELDEX.PARAM.SEN = SHELDEX.PARAM.BASE.mat;
/** @type {Enumerator<Number>} @desc Diet */
SHELDEX.PARAM.DIET = SHELDEX.PARAM.BASE.mtp;
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Icons
//------------------------------------------------------------------------
SHELDEX.ICON.meta = "";
SHELDEX.ICON.SPECIES = 234;
SHELDEX.ICON.CREATURE = 251;
SHELDEX.ICON.DRAW_ACTOR_NICKNAME_ICON = false;
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > CGC
//------------------------------------------------------------------------
SHELDEX.CGC = {};
SHELDEX.CGC.CARD = {};
SHELDEX.CGC.CARD.ACTOR_SPRITE = {
  offset_x: 168,
  offset_y: 6,
  x: 132,
};
SHELDEX.CGC.CARD.BATTLER_SPRITE = {
  w: 240,
  h: 328,
};
/**
 * @typedef {Object} CGC_zone
 */
SHELDEX.CGC.ZONES = {};
SHELDEX.CGC.ZONES.INJURY = 0;
SHELDEX.CGC.ZONES.PERMANENT = 1;
SHELDEX.CGC.ZONES.TERRITORY = 2;
SHELDEX.CGC.ZONES.WILD = 3;
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Variables
//------------------------------------------------------------------------
SHELDEX.VAR = {};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Switches
//------------------------------------------------------------------------
SHELDEX.SWITCH.meta = "";
SHELDEX.SWITCH.DISCARD = 39;
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Creature
//------------------------------------------------------------------------
SHELDEX.SEX_FEMALE = 0;
SHELDEX.SEX_MALE = 1;
SHELDEX.CREATURE_SEXES = {
  undefined: 0,
  female: 1,
  male: 2,
  intersex: 3,
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
// #region - SYSTEM
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Util
//------------------------------------------------------------------------

// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Start
//------------------------------------------------------------------------
MAGPIE.SHELDEREVO._setupNewGame = MAGPIE_HIMS.prototype.setupNewGame;
MAGPIE_HIMS.prototype.setupNewGame = function () {
  MAGPIE.SHELDEREVO._setupNewGame.call(this);
  MAGPIE.SHELDEREVO.newGame();
};
MAGPIE.SHELDEREVO.newGame = function () {
  $ShelderEvo = new MAGPIE_HIMS({
    name: MAGPIE.SHELDEREVO.meta.name,
    firmwareName: "MAGPIE_HIMS_MZ",
  });
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
 *
 *
 */
//========================================================================
// END OF FILE
//========================================================================
