//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [Tier 3] v0.5.1 SEMZ_PDL
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
 * v0.5.1 2026 07 28
 * - full re-build
 *
 * v0.4.4.20250827
 * - MAGPIE_SYS 0.9.1 conformity update
 * - Entity_Database integrated into MAGPIE_EntityDatabase
 *
 * v0.4.3.20250824
 * - v0.9.0 MAGPIE.SYS conformity update
 *
 * v0.4.2.20250821
 * - MAGPIE.SYS v0.8.0 conformity update
 *
 * v0.4.1 2025 08 19
 * - updated entity database to entity_data format
 *
 * v0.4.0 2025 07 31
 * - plugin decoupled from SECore and standardized in MAGPIE plugin suite
 *
 * pre-0.4.0
 * - integrated in SECore
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
MAGPIE.PDL = {};
/** @type {MAGPIE_DATABASE} */
var $entity = null;
/** @type {MAGPIE_DATABASE} */
var $exp = null;
/** @type {MAGPIE_DATABASE} */
var $key = null;
/** @type {MAGPIE_DATABASE} */
var $symbol = null;
/** @type {MAGPIE_DATABASE} */
var $context = null;
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
// #region > proto
//------------------------------------------------------------------------
class PDL {
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
// #region > Obj
//------------------------------------------------------------------------
// MAGPIE.PDL._createSave = DataManager.createGameObjects;
// DataManager.createGameObjects = function () {
//   MAGPIE.PDL._createSave.call(this);
//   $entity = new MAGPIE_
// };
MAGPIE.PDL._setupNewGame = MAGPIE_HIMS.prototype.setupNewGame;
MAGPIE_HIMS.prototype.setupNewGame = function () {
  MAGPIE.PDL._setupNewGame.call(this);
  $entity = new MAGPIE_DATABASE({ name: "MAGPIE_ENTITY" });
  $exp = new MAGPIE_DATABASE({ name: "MAGPIE_EXP" });
  $key = new MAGPIE_DATABASE({ name: "MAGPIE_KEY" });
  $symbol = new MAGPIE_DATABASE({ name: "MAGPIE_SYMBOL" });
  $context = new MAGPIE_DATABASE({ name: "MAGPIE_CONTEXT" });
};
MAGPIE.PDL._makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function () {
  const contents = MAGPIE.PDL._makeSave.call(this);
  contents.entity = $entity;
  contents.exp = $exp;
  contents.key = $key;
  contents.symbol = $symbol;
  contents.context = $context;
  return contents;
};
MAGPIE.PDL._loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function (contents) {
  MAGPIE.PDL._loadSave.call(this, contents);
  $entity = contents.entity;
  $exp = contents.exp;
  $key = contents.key;
  $symbol = contents.symbol;
  $context = contents.context;
};
/**
 *
 * @param {MAGPIE_DATABASE} db
 */
MAGPIE.PDL.exportDb = function (db) {
  const ePrefix = "[PDL].exportDb: ";
  try {
    const fs = fs || require("fs");
    const path = path || require("path");
    const dbPath = path.join(process.cwd(), "save", `${db.name}.magpiedb`);
    const json = StorageManager.objectToJson(db.prepare());
    fs.writeFileSync(dbPath, object);
  } catch (e) {
    console.error(ePrefix + e.message, e);
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
// #region - DBPOOL
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > proto
//------------------------------------------------------------------------
function MAGPIE_DBPOOL() {
  this.initialize(...arguments);
}
MAGPIE_DBPOOL.prototype.initialize = function () {
  this.isAvailable = true;
  // this.nextSlot = 0;
  this.entries = new Map();
};
MAGPIE_DBPOOL.prototype.addEntry = function (entry) {
  const ePrefix = "[DB].addEntry: ";
  try {
    const ID = Number(entry?.ID);
    if (isNaN(ID)) throw new Error(`${ID} is invalid entryID`);
    this.entries.set(ID, entry);
    if (this.entries.size >= MAGPIE.PDL.MAX_POOL_SIZE) this.isAvailable = false;
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {Number} entryID
 * @returns {Object}
 */
MAGPIE_DBPOOL.prototype.getByID = function (entryID) {
  return this.entries.get(entryID);
};
MAGPIE_DBPOOL.prototype.getByProperty = function (property, value) {
  const arr = this.toArray();
  return arr.find((entry) => entry[property] === value);
};
MAGPIE_DBPOOL.prototype.filterByProperty = function (property, value) {
  const arr = this.toArray();
  return arr.filter((entry) => entry[property] === value);
};
MAGPIE_DBPOOL.prototype.searchByName = function (name) {
  const arr = this.toArray();
  return arr.filter((entry) => entry?.name.contains(name));
};
MAGPIE_DBPOOL.prototype.deleteByID = function (entryID) {
  return this.entries.delete(entryID);
};
MAGPIE_DBPOOL.prototype.toArray = function () {
  return Array.from(this.entries.values());
};
MAGPIE_DBPOOL.prototype.list = function () {
  return Array.from(this.entries.keys());
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > seams
//------------------------------------------------------------------------
MAGPIE_DBPOOL.prototype.add = function (entry) {
  return this.addEntry(entry);
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
// #region - DB
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > proto
//------------------------------------------------------------------------
function MAGPIE_DATABASE(data) {
  this.initialize(data);
}
MAGPIE_DATABASE.prototype.initialize = function (data) {
  this.name = String(data?.name);
  this._totalSize = 0;
  this.nextPool = 0;
  this.pools = [new MAGPIE_DBPOOL()];
  if (data?.contents) setTimeout(() => this.import(data.contents), 300);
};
MAGPIE_DATABASE.prototype.import = function (contents) {
  const ePrefix = "[DB].import: ";
  try {
    const list = [];
    for (const object of contents) {
      list.push(this.add(i));
    }
    return list;
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
MAGPIE_DATABASE.prototype.export = function () {
  const ePrefix = "[DB].export: ";
  try {
    const result = [];
    for (const pool of this.pools) {
      pool.toArray().forEach((e) => result.push(e));
    }
    return result;
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
MAGPIE_DATABASE.prototype.prepare = function () {
  const ePrefix = "[DB].prepare: ";
  try {
    const pools = [];
    for (const pool of this.pools) {
      const entries = Array.from(pool.entries.values());
      pools.push({ isAvailable: pool.isAvailable, entries: entries });
    }
    return {
      name: this.name,
      nextPool: this.nextPool,
      pools: pools,
    };
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {{
 * name: String,
 * nextPool: Number,
 * pools: Object[]
 * }} db
 * @returns
 */
MAGPIE_DATABASE.rehydrate = function (db) {
  const ePrefix = "[DB].rehydrate: ";
  try {
    return new MAGPIE_DATABASE({
      name: db.name,
      nextPool: db.nextPool,
      pools: db.pools,
    });
  } catch (e) {
    console.error(ePrefix + e.message, e);
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
// #region > set
//------------------------------------------------------------------------
MAGPIE_DATABASE.prototype.set = function (entry) {
  const ePrefix = "[DB].set: ";
  try {
    const entryID = Number(entry?.ID);
    if (isNaN(entryID)) throw new Error(`${entryID} is invalid entryID`);
    const nextPool = this.isPoolAvailable() ? this.getPool() : this.findPool();
    nextPool.add(entry);
    this._totalSize++;
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {Number} entryID
 * @param {Number} poolIndex
 * @returns {Object}
 */
MAGPIE_DATABASE.prototype.getByID = function (entryID, poolIndex = NaN) {
  const ePrefix = "[DB].getByID: ";
  try {
    if (isNaN(entryID)) throw new Error(`${entryID} is invalid entryID`);
    if (!isNaN(poolIndex)) return this.pools[poolIndex].getByID(entryID);
    for (const pool of this.pools) {
      const entry = pool.getByID(entry);
      if (entry) return entry;
    }
    throw new Error(`unable to find [ENTRY-${entryID}]`);
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {{
 * poolIndex: Number,
 * property: String,
 * value: any
 * }} options
 * @returns {Object}
 */
MAGPIE_DATABASE.prototype.getByProperty = function (options) {
  const ePrefix = "[DB].getByProperty: ";
  try {
    const property = String(options?.property);
    const poolIndex = Number(options?.poolIndex);
    const value = options?.value;
    if (!property) throw new Error(`${property} is invalid search property`);
    if (!value) throw new Error(`${value} is invalid search value`);
    if (!isNaN(poolIndex))
      return this.pools[poolIndex].getByProperty(property, value);
    for (const pool of this.pools) {
      const entry = pool.getByProperty(property, value);
      if (entry) return entry;
    }
    throw new Error(`no match for entry.${property} === ${value}`);
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {{
 * poolIndex: Number,
 * property: String,
 * value: any
 * }} options
 * @returns {Object[]}
 */
MAGPIE_DATABASE.prototype.filterByProperty = function (options) {
  const ePrefix = "[DB].filterByProperty: ";
  try {
    const property = String(options?.property);
    const poolIndex = Number(options?.poolIndex);
    const value = options?.value;
    if (!property) throw new Error(`${property} is invalid filter property`);
    if (!value) throw new Error(`${value} is invalid filter value`);
    if (!isNaN(poolIndex))
      return this.pools[poolIndex].filterByProperty(property, value);
    const results = [];
    for (const pool of this.pools) {
      const entries = pool.filterByProperty(property, value);
      if (Array.isArray(entries) && entries.length > 0)
        results.push(...entries);
    }
    return results;
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {String} name
 * @returns {Object[]}
 */
MAGPIE_DATABASE.prototype.searchByName = function (name) {
  const ePrefix = "[DB].searchByName: ";
  try {
    const results = [];
    for (const pool of this.pools) {
      const arr = pool.searchByName(name);
      if (Array.isArray(arr) && arr.length > 0) results.push(...arr);
    }
    return results;
  } catch (e) {
    console.error(ePrefix + e.message, e);
  }
};
/**
 *
 * @param {Number} index
 * @returns {MAGPIE_DBPOOL}
 */
MAGPIE_DATABASE.prototype.getPool = function (index) {
  if (!index) index = this.nextPool;
  return this.pools[index];
};
/**
 *
 * @returns {MAGPIE_DBPOOL}
 */
MAGPIE_DATABASE.prototype.findPool = function () {
  const freePool = this.pools.find((pool) => pool.isAvailable);
  return freePool || this.newPool();
};
/**
 *
 * @returns {new MAGPIE_DBPOOL}
 */
MAGPIE_DATABASE.prototype.newPool = function () {
  this.pools.push(new MAGPIE_DBPOOL());
  this.nextPool = this.pools.length - 1;
  return this.pools[this.nextPool];
};
/**
 *
 * @param {Number} index
 * @returns {Boolean}
 */
MAGPIE_DATABASE.prototype.isPoolAvailable = function (index) {
  if (!index) index = this.nextPool;
  return this.pools[index]?.isAvailable;
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
