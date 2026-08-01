//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [Tier 5] v0.1.0 SEMZ_territory
 * @author Matheraptor
 * @url https://matheraptor.itch.io/
 *
 * @help
 *
 *
 * -----------------------------------------------------------------------
 * CHANGELOG
 * -----------------------------------------------------------------------
 * v0.1.0 2026 01 01
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
// #region - Territory
//========================================================================
/**
 * @name
 * @desc
 * @typedef {Number} mapX
 * @typedef {Number} mapY
 * @typedef {Number} lat
 * @typedef {Number} lon
 * @typedef {Number} ASL
 * @typedef {Number} celestialID
 * @typedef {Number} skillID
 * @typedef {{
 * ID: Number,
 * name: String,
 * desc: String,
 * regionID: Number,
 * gameCoords: [mapX, mapY],
 * geoCoords: [lat,lon,ASL,celestialID],
 * biome: String,
 * fertility: Number,
 * deck: skillID[]
 * }} territory_data
 */
//------------------------------------------------------------------------
// #region > proto
//------------------------------------------------------------------------
/**
 *
 * @param {territory_data} data
 * @returns {new MAGPIE_TERRITORY}
 */
function MAGPIE_TERRITORY(data) {
  this.initialize(data);
}
MAGPIE_TERRITORY.prototype.initialize = function (data) {
  this.ID = Number(data?.ID) || Date.now();
  this.name = String(data?.name);
  this.desc = String(data?.desc);
  this.regionID = Number(data?.regionID);
  this.gameCoords = [Number(data?.x), Number(data?.y)];
  this.geoCoords = [
    Number(data?.lat),
    Number(data?.lon),
    Number(data?.ASL),
    Number(data?.celestialID),
  ];
  this.biome = String(data?.biome);
  this.fertility = Number(data?.fertility);
  /** @type {skillID[]} */
  this.deck = data?.deck || [];
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
MAGPIE_TERRITORY.prototype.enter = function () {
  //
};
MAGPIE_TERRITORY.prototype.exit = function () {
  //
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
