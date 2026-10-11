//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [Tier 4] v0.1.0 SEMZ_db
 * @author Matheraptor
 * @url https://matheraptor.itch.io/
 *
 * @help
 * @audit 20260928 decided not to include db:
 *    the benefit of data storage is not yet worth the cost of dealing
 *    with RMMZ tendency to reset the package.json every project save
 *
 * @todo 20260928 idea: include a db switcher so that the project can
 *    easily switch between native RMMZ saving and db-augmented saving
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
 * @namespace SEMZ_db
 * @author Matheraptor
 * @version 0.1.0
 * @desc
 */
//========================================================================
//#region - INDEX
//========================================================================
var MAGPIE = MAGPIE || {};
MAGPIE.PDL = MAGPIE.PDL || {};
/**
 * @typedef {import("better-sqlite3").Database} Database
 */
MAGPIE.PDL.dbPath = `${process.cwd()}/semz.db`;
/**
 * @type {Database}
 */
class db {
  static world = null;
  static async init() {
    const SQL = await initSqlJs({
      locateFile: (filename) => filename,
    });
    if (fs.existsSync(MAGPIE.PDL.dbPath)) {
      const fileBuffer = fs.readFileSync(MAGPIE.PDL.dbPath);
      this.world = new BetterSqlite3Compat(new SQL.Database(fileBuffer), () =>
        this.save(),
      );
    } else {
      this.world = new BetterSqlite3Compat(new SQL.Database(), () =>
        this.save(),
      );
      console.log("Created a fresh SQLite database.");
    }
    this.world.pragma("journal_mode = WAL");
    this.world.pragma("foreign_keys = ON");
    this.world.pragma("cache_size = -64000");
  }
  static save() {
    if (!this.world || !this.world.db) return;
    const data = this.world.db.export();
    fs.writeFileSync(MAGPIE.PDL.dbPath, Buffer.from(data));
  }
}
// intercept RMMZ's engine startup to wait for the WASM layer

const _Scene_Boot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function () {
  _Scene_Boot_create.call(this);
  db.init().then(() => {
    worker.world = db.world.db;
    console.log("SQLite WASM Engine ready.");
  });
};
class BetterSqlite3Compat {
  constructor(sqlJsDb, saveCallback) {
    this.db = sqlJsDb;
    this._save = saveCallback;
  }
  pragma(str) {
    this.db.run(`PRAGMA ${str}`);
  }
  prepare(sql) {
    const dbObj = this.db;
    const saveFn = this._save;
    return {
      /**
       * @desc handles data modifications (INSERT, UPDATE, DELETE)
       * @param  {...any} params
       */
      run(...params) {
        // normalize array bindings if passed as single elements
        const args =
          params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        dbObj.run(sql, args);
        if (saveFn) saveFn(); // triggers auto-save to hard drive on write
      },
      /**
       * @desc handles fetching a single row
       * @param  {...any} Params
       */
      get(...params) {
        const args =
          params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        const stmt = dbObj.prepare(sql);
        stmt.bind(args);
        const result = stmt.step() ? stmt.getAsObject() : null;
        stmt.free(); // freeing memory automatically behind the scenes
        return result;
      },
      /**
       * @desc handles fetching all matching rows
       * @param  {...any} params
       */
      all(...params) {
        const args =
          params.length === 1 && Array.isArray(params[0]) ? params[0] : params;
        const stmt = dbObj.prepare(sql);
        stmt.bind(args);
        const results = [];
        while (stmt.step()) {
          results.push(stmt.getAsObject());
        }
        stmt.free(); //freeing memory automatically behind the scenes
        return results;
      },
    };
  }
}
// db.world = new Database(MAGPIE.PDL.dbPath);
// db.world.pragma("journal_mode = WAL");
// db.world.pragma("foreign_keys = ON");
// db.world.pragma("cache_size = -64000");
/**
 * @typedef {import("better-sqlite3").RunResult} worker_result
 */
const worker = {};
worker.world = null;
worker.REGISTRY = {
  MAGPIE_LOG: "MAGPIE_LOG",
};
//#endregion
//========================================================================
/**
 * @name
 * @desc
 *
 */
//========================================================================
// #region - LOW
//========================================================================
worker.meta = {};
/**
 * @typedef {import("better-sqlite3").Statement} worker_statement
 * @type {Map<worker_statement, worker_statement>}
 */
worker.statementCache = new Map();
/**
 *
 * @param {worker_statement} cacheKey
 * @param {worker_statement} sql
 * @param {Database} db
 * @returns {worker_statement}
 */
worker.getStatement = function getStatement(cacheKey, sql, db) {
  let statement = worker.statementCache.get(cacheKey);
  if (!statement) {
    statement = db.prepare(sql);
    worker.statementCache.set(cacheKey, statement);
  }
  return statement;
};
/**
 * @typedef {{}} statement_criteria
 * @param {Array} columns
 * @param {statement_criteria} criteria
 * @returns {worker_statement}
 */
worker.buildWhereClause = function buildWhereClause(columns, criteria) {
  if (!columns || columns.length === 0) return "";
  const clauses = columns.map((col) => {
    const entry = criteria[col];
    const operator =
      entry && typeof entry === "object" && entry.op ? entry.op : "=";
    return `${col} ${operator} ?`;
  });
  return ` WHERE ${clauses.join(" AND ")}`;
};
/**
 *
 * @param {Object} data
 * @returns {{values: String, columns: String[]}}
 */
worker.rowSetter = function rowSetter(data) {
  const columns = Object.keys(data);
  const values = worker._serializeValues(columns, data);
  return { values, columns };
};
worker._serializeValues = function _serializeValues(columns, data) {
  return columns.map((col) => {
    const val = data[col];
    return val && typeof val === "object"
      ? JSON.stringify(val, this.replacer)
      : val;
  });
};
worker.replacer = function replacer(key, value) {
  const type = Object.prototype.toString.call(value);
  if (type === "[object Float64Array]")
    return { "@": "Float64Array", data: Array.from(value) };
  if (type === "[object Map]")
    return { "@": "Map", data: Array.from(value.entries()) };
  return value;
};
worker.reviver = function reviver(key, value) {
  if (value === null || typeof value !== "object") return value;
  const typeTag = value["@"];
  if (!typeTag) return value;
  if (typeTag === "Float64Array") return new Float64Array(value.data);
  if (typeTag === "Map") return new Map(value.data);
  const ctor = globalThis[typeTag];
  if (ctor) return JsonEx._decode(value);
};
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
// #region - I/O
//========================================================================
/**
 * @name Get
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Get
//------------------------------------------------------------------------
/**
 * @desc you can pass either a Direct Value (for strict equality)
 * or an Operator Object.
 * Operators Supported:
 * - `=` (Default)
 * - `>` (Greater than)
 * - `<` (Less than)
 * - `>=` / `<=` (Greater/Less or equal)
 * - `!=` (Not equal)
 * - `LIKE` (Pattern matching, use `%` in value)
 * @example using `%` in criteria:
 * |Criteria Object|What it finds|
 * |---|---|
 * |`{ name: { op: 'LIKE', val: 'Mag%' } }`|*Names starting with "Mag" (e.g., Magpie, Magnet)*|
 * |`{ name: { op: 'LIKE', val: '%pie' } }`|*Names ending with "pie" (e.g., Magpie, Applepie)*|
 * |`{ name: { op: 'LIKE', val: '%gpi%' } }`|*Names containing "gpi" anywhere*|
 * ```js
 *
 * ```
 * Usage Examples
 *
 * |Intent|criteria Object|Generated SQL Snippet|
 * |---|---|---|
 * |*Find by ID*|`{ ID: 101 }`|`WHERE ID = 101`|
 * |*Filter by Type*|`{ type: 'GUEST' }`|`WHERE type = 'GUEST'`|
 * |*Multiple Filters*|`{ type: 'GUEST', mapId: 5 }`|`WHERE type = 'GUEST' AND mapId = 5`|
 * |*Get Everything*|`{}` *(Empty Object)*|*(No `WHERE` clause)*|
 * |*operators*|`{key : {op: OP, val: VALUE}}`|`WHERE key op val`|
 * ```js
 *
 * ```
 * @tip When using LIKE,
 * remember that SQLite is case-insensitive for ASCII characters by default
 * (e.g., 'mag%' will find "Magpie").
 *
 * @param {String} tableName
 * @param {Object} criteria
 * @param {Database} db
 * @returns {database_result}
 */
worker.getRow = function getRow(tableName, criteria = {}, db) {
  const columns = Object.keys(criteria).sort();
  const whereClause = this.buildWhereClause(columns, criteria);
  const sql = `SELECT * from ${tableName} ${whereClause}`;
  const statement = this.getStatement(
    `GET:${tableName}:${whereClause}`,
    sql,
    db,
  );
  const values = columns.map((col) => {
    const entry = criteria[col];
    const rawValue = entry && entry.op !== undefined ? entry.val : entry;
    if (typeof rawValue === "number" && Number.isInteger(rawValue))
      return Math.floor(rawValue);
    return rawValue;
  });
  const result = statement.all(...values);
  return result;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name delete
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Delete
//------------------------------------------------------------------------
/**
 *
 * @param {String} tableName
 * @param {statement_criteria} criteria
 * @param {Database} db
 * @returns {database_result}
 */
worker.deleteRow = function deleteRow(tableName, criteria, db) {
  const columns = Object.keys(criteria);
  const cacheKey = `DELETE:${tableName}:${columns.join(",")}`;
  const cache = worker.statementCache;
  /** @type {worker_statement} */
  let statement = cache.get(cacheKey);
  if (!statement) {
    const whereClause = columns.map((col) => `${col} = ?`).join(" AND ");
    const sql = `DELETE FROM ${tableName} WHERE ${whereClause}`;
    statement = db.prepare(sql);
    cache.set(cacheKey, statement);
  }
  const values = Object.values(criteria);
  const info = statement.run(...values);
  return info;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name Set
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Set
//------------------------------------------------------------------------
/**
 *
 * @param {String} tableName
 * @param {Object[]} values
 * @param {String[]} columns
 * @param {Database} db
 * @returns {database_result}
 */
worker.setRow = function setRow(tableName, values, columns, db) {
  const columnNames = columns.join(", ");
  const placeholders = columns.map(() => "?").join(", ");
  const sql =
    `INSERT OR REPLACE INTO ${tableName} (${columnNames})` +
    ` VALUES (${placeholders})`;
  const cacheKey = `SAVE:${tableName}:${columns.join(",")}`;
  const statement = worker.getStatement(cacheKey, sql, db);
  const result = statement.run(...values);
  if (!result)
    throw new Error(`${tableName}, ${values}, ${columns}, ${db.name}`);
  return result;
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name Table
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Table
//------------------------------------------------------------------------
/**
 *
 * @param {String} tableName
 * @param {Object} schema
 * @param {Database} db
 * @returns {database_result}
 *
 * @version 0.20.7
 * - ADDED: "PRIMARY KEY" check to add " WITHOUT ROWID" as per
 * [sqlite3_architecture](../../\HASTRAL\03_MEMORY\wiki\topics\operations\memory\sqlite3_architecture.md)
 */
worker.createTable = function createTable(tableName, schema, db) {
  try {
    const noRowID = schema["PRIMARY KEY"] ? " WITHOUT ROWID" : "";
    const columnDefinitions = Object.entries(schema).map(([name, type]) => {
      return `${name.includes("fk") ? "" : name} ${type}`;
    });
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (
			${columnDefinitions.join(", ")}
		)${noRowID}`;
    const result = db.prepare(query).run();
    if (!result) throw new Error(`${result} is invalid result`);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
/**
 *
 * @param {String} tableName
 * @param {Database} db
 * @returns {database_result}
 */
worker.dropTable = function dropTable(tableName, db) {
  return db.prepare(`DROP TABLE IF EXISTS ${tableName}`).run();
};
/**
 *
 * @param {String} tableName
 * @param {String} columnName
 * @param {String} type
 * @param {Database} db
 * @returns {database_result}
 */
worker.addColumnToTable = function addColumnToTable(
  tableName,
  columnName,
  type,
  db,
) {
  return db
    .prepare(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${type}`)
    .run();
};
/**
 *
 * @param {String} tableName
 * @param {String} columnName
 * @param {Database} db
 */
worker.dropColumnTable = function dropColumnTable(tableName, columnName, db) {
  return db.prepare(`ALTER TABLE ${tableName} DROP COLUMN ${columnName}`).run();
};
// #endregion
//------------------------------------------------------------------------
/**
 * @name transaction
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Trans.
//------------------------------------------------------------------------
/**
 *
 * @param {Database} db
 * @param {Function} callback
 * @returns {import("better-sqlite3").Transaction}
 */
worker.makeTransaction = function makeTransaction(db, callback) {
  const transaction = db.transaction((...args) => {
    return callback(...args);
  });
  return transaction();
};
/**
 *
 * @param {String} tableName
 * @param {Array[]} rows
 * @param {String[]} columns
 * @param {Database} db
 * @returns {import("better-sqlite3").Transaction}
 */
worker.setRowTransaction = function setRowTransaction(
  tableName,
  rows,
  columns,
  db,
) {
  return this.makeTransaction(db, () => {
    const columnNames = columns.join(", ");
    const placeholders = columns.map(() => "?").join(", ");
    const sql =
      `INSERT OR REPLACE INTO ${tableName} (${columnNames})` +
      ` VALUES (${placeholders})`;
    const cacheKey = `SAVE:${tableName}:${columns.join(",")}`;
    const statement = worker.getStatement(cacheKey, sql, db);
    for (const values of rows) {
      statement.run(...values);
    }
  });
};
worker.saveEntities = function saveEntities(payloads) {
  return this.makeTransaction(this.world, () => {
    for (const payload of payloads) {
      const { values, columns } = this.rowSetter(payload);
      this.setRow("MAGPIE_ENTITY", values, columns, this.world);
    }
    return true;
  });
};
/**
 *
 * @param {String} tableName
 * @param {Array[]} rows
 * @param {String[]} columns
 */
worker.setWorldRowTransaction = function setWorldRowTransaction(
  tableName,
  rows,
  columns,
) {
  return this.setRowTransaction(tableName, rows, columns, this.world);
};
worker.setServerRowTransaction = function setServerRowTransaction(
  tableName,
  rows,
  columns,
) {
  return this.setRowTransaction(tableName, rows, columns, this.server);
};
worker.saveBuffers = function saveBuffers(buffers) {
  try {
    return worker.makeTransaction(worker.world, () => {
      const results = [];
      buffers.forEach((buffer) => {
        const payloads = buffer[1];
        const table = buffer[0];
        // console.log(table)
        payloads.forEach((payload) => {
          const result = worker.saveWorldRow(table, payload);
          results.push(result);
          // console.log(result)
        });
      });
      return results;
    });
  } catch (e) {
    console.error(e);
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
// #region - WRAPPERS
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Save
//------------------------------------------------------------------------
/**
 * @desc helper function for "inserting" data.
 * we’ll build an Auto-Inserter.
 * The tricky part with SQL is that the number of ? placeholders
 * must exactly match the number of columns you are sending.
 * This function will automatically generate the INSERT INTO...
 * string based on whatever object you pass it.
 * @sister of {@link MAGPIE_DATABASE.loadRow} and {@link MAGPIE_DATABASE.getRow}
 * @param {String} tableName - The table to save into.
 * @param {object} data - The object containing the row data.
 * @param {Database} db
 * @returns {Promise<database_result>}
 */
worker.saveRow = function saveRow(tableName, data, db) {
  return this.saveRowSync(tableName, data, db);
};
/**
 *
 * @param {String} tableName
 * @param {Object} data
 * @param {Database} db
 * @returns {database_result}
 */
worker.saveRowSync = function saveRowSync(tableName, data, db) {
  const ePrefix = "[DATABASE WORKER] ";
  try {
    const { values, columns } = this.rowSetter(data);
    const save = this.setRow(tableName, values, columns, db);
    if (!save) throw new Error("unable to save row. ");
    return save;
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
// #region > Load
//------------------------------------------------------------------------
/**
 *
 * @param {String} tableName
 * @param {Object} criteria
 * @param {Database} db
 * @returns {database_payload}
 */
worker.loadRow = function loadRow(tableName, criteria, db) {
  const results = worker.getRow(tableName, criteria, db);
  return this.resultsLoader(results);
};
/**
 * @typedef {Object[]} database_payload
 * @param {database_result} results
 * @returns {database_payload}
 */
worker.resultsLoader = function resultsLoader(results) {
  if (!results || results.length < 1) return [];
  return results.map((row) => JSON.parse(row.data, this.reviver));
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
// #region - SEAMS
//========================================================================
/**
 *
 * @param {String} tableName
 * @param {database_payload} payload
 * @returns {database_result}
 */
worker.saveWorldRow = function saveWorldRow(tableName, payload) {
  return this.saveRowSync(tableName, payload, worker.world);
};
/**
 *
 * @param {String} tableName
 * @param {statement_criteria} criteria
 * @returns {Object}
 */
worker.loadWorldRow = function loadWorldRow(tableName, criteria) {
  return this.loadRow(tableName, criteria, worker.world)[0];
};
/**
 *
 * @param {String} tableName
 * @param {statement_criteria} criteria
 * @returns {database_result}
 */
worker.deleteWorldRow = function deleteWorldRow(tableName, criteria) {
  return this.deleteRow(tableName, criteria, this.world);
};
/**
 *
 * @param {String} tableName
 * @param {Object} schema
 * @returns {database_result}
 */
worker.createWorldTable = function createWorldTable(tableName, schema) {
  return this.createTable(tableName, schema, this.world);
};
/**
 *
 * @param {Number} primaryKeyValue
 * @param {String} primaryKeyName
 * @param {String} foreignKeyName
 * @param {String} relationTable
 * @param {String} targetTable
 *
 * @returns {database_payload}
 */
worker.getWorldRelatedRows = function getWorldRelatedRows(
  primaryKeyValue,
  primaryKeyName,
  foreignKeyName,
  relationTable,
  targetTable,
) {
  const sql = `SELECT target.* FROM ${targetTable} target
		JOIN ${relationTable} rel ON target.ID = rel.${foreignKeyName}
		WHERE rel.${primaryKeyName} = ?`;
  const results = worker.world.prepare(sql).all(primaryKeyValue);
  if (results.length > 0) return this.resultsLoader(results);
};
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
// #region - UTILITY
//========================================================================
// class MAGPIE_DATABASE {}
MAGPIE_DATABASE.timestamp = function () {
  return Date.now();
};
MAGPIE_DATABASE.sync = worker;
MAGPIE_DATABASE.getWorldRow = function (tableName, rowID) {
  const result = MAGPIE_DATABASE.sync.getRow(tableName, { ID: rowID });
  if (Array.isArray(result)) return result[0];
};
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Metastate
//------------------------------------------------------------------------
MAGPIE_DATABASE.loadMetastate = function () {
  const ePrefix = "[DATABASE].loadMetastate: ";
  try {
    const metastate = MAGPIE_DATABASE.sync.loadWorldRow("MAGPIE_METASTATE", {});
    if (!(metastate instanceof MAGPIE_METASTATE))
      throw new Error("no metastate in database");
    return metastate;
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
 * @name
 * @desc
 *
 */
//========================================================================
// #region - SETUP
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Tables
//------------------------------------------------------------------------
MAGPIE_DATABASE.setup = function () {
  const ePrefix = "[DATABASE] ";
  const integer = "INTEGER NOT NULL";
  const integerNullable = "INTEGER";
  const integerKey = "INTEGER PRIMARY KEY";
  const foreignKey = "FOREIGN KEY";
  const blob = "JSON NOT NULL";
  const textNullable = "TEXT";
  const text = "TEXT";
  const textKey = "TEXT PRIMARY KEY";
  const setForeignKey = (property, tableName, delCascade = false) => {
    const cascade = delCascade ? " ON DELETE CASCADE" : "";
    return `FOREIGN KEY (${property}) REFERENCES ${tableName}(ID)${cascade}`;
  };
  /** @type {Map<String, worker_result[]>} */
  const tables = new Map();
  const logs = this.sync.createWorldTable("MAGPIE_ENTITY", {
    ID: integerKey,
    type: integer,
    name: textNullable,
    updated: integer,
    compoundID: integerNullable,
    hostID: integerNullable,
    growth: integerNullable,
    data: blob,
    fk1: setForeignKey("compoundID", "MAGPIE_ENTITY"),
    fk2: setForeignKey("hostID", "MAGPIE_ENTITY"),
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
