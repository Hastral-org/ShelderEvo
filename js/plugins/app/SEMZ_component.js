//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [Tier 5] v0.5.1 SEMZ_component
 * @author Matheraptor
 * @url https://matheraptor.itch.io/
 *
 * @help
 *
 *
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
MAGPIE.COMPONENT = {};
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
function MAGPIE_COMPONENT(data) {
  this.initialize(data);
}
MAGPIE_COMPONENT.prototype.initialize = function (data) {
  this.ID = Number(data?.ID) || Date.now();
  this._firmware = "MAGPIE_COMPONENT";
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
// #region - METAST.
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Proto
//------------------------------------------------------------------------
function MAGPIE_METASTATE(data) {
  this.initialize(data);
}
MAGPIE_METASTATE.prototype.initialize = function (data) {
  const stamp = MAGPIE.UTILITY.epoch();
  this.meta = {
    isMetastate: true,
    name: MAGPIE.name + " Metastate",
    desc: "Metadata of the 'game-verse' (game universe)",
    version: MAGPIE.version,
    firmwareName: "MAGPIE_METASTATE",
    created: stamp,
    updated: stamp,
  };
  this.date = new MAGPIE_DATE(data?.date);
  this.hive = new Map();
  if (!data?.contents) data.contents = {};
  this.contents = data.contents;
  this.setup();
};
MAGPIE_METASTATE.prototype.setup = async function () {
  const ePrefix = "[METASTATE].setup: ";
  try {
    const version = MAGPIE.printVersion(this.meta.version);
    const firmwareDate = this.meta.firmwareDate;
    const date = this.date.printDate();
    const stamp = `[v${version} ${firmwareDate}] ` + `[metadate: ${date}]`;
    MAGPIE.log(ePrefix + stamp);
  } catch (e) {
    MAGPIE.error(ePrefix + e.message, e);
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
 *
 * @desc back to {@link }
 *
 */
//========================================================================
// END OF FILE
//========================================================================
