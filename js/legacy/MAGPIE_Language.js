//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_1] v0.1.0 MAGPIE_Language
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-language
 * 
 * @help
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.1.0 2025 11 17
 * - initial build
 */


//#endregion





//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
// MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.Language = {};
MAGPIE.addons.Language.version = "0.1.0";
MAGPIE.addons.Language.pluginName = "MAGPIE_Language";
MAGPIE.addons.Language.tier = 1;
MAGPIE.addons.Language.meta = {
    name: "M.A.G.P.I.E. Language Model Framework",
    isCypher: true,
    isAddon: true,
    firmware: "20251117",
    firmwareFile: `${MAGPIE.addons.Language.pluginName}.js`
};


//#endregion








//------------------------------------------------------------------------
//#region CODE

const MAGLANG = {};
MAGLANG.PRONOUNS = {};
MAGLANG.PRONOUNS.FIRST_SING = MAGPIE.CODE.LANG.PRONOUNS.FIRST_SING;
MAGLANG.PRONOUNS.SECOND = MAGPIE.CODE.LANG.PRONOUNS.SECOND;
MAGLANG.PRONOUNS.FEMALE = MAGPIE.CODE.LANG.PRONOUNS.FEMALE;
MAGLANG.PRONOUNS.MALE = MAGPIE.CODE.LANG.PRONOUNS.MALE;
MAGLANG.PRONOUNS.NON_BINARY = MAGPIE.CODE.LANG.PRONOUNS.NON_BINARY;
MAGLANG.PRONOUNS.FIRST_PLURAL = MAGPIE.CODE.LANG.PRONOUNS.FIRST_PLURAL;
//#endregion







//------------------------------------------------------------------------
//#region DATABASE

MAGLANG.DATABASE = {};
MAGLANG.DATABASE.meta = {
    isDatabase: true
}

function MAGLANG_Database(data = {})
{
    this.initialize(data);
}
MAGLANG_Database.prototype.initialize = function(data)
{
    this.totalSize = 0;
    this.languages = {};
    if(data?.language) 
        this.languages[data.language.name] = new MAGPIE_Language(data.language);
}

//#endregion








//------------------------------------------------------------------------
//#region LANGUAGE

MAGLANG.DATABASE.LANGUAGE = {};
MAGLANG.DATABASE.LANGUAGE.meta = {
    isLanguage: true
}

function MAGPIE_Language(data = {})
{
    this.initialize(data);
}
MAGPIE_Language.prototype.initialize = function(data)
{
    this.meta = data?.meta || {
        name: "",
        fullName: "",
        origin: ""
    }
    this.LEXICON = new MAGLANG_Lexicon(data?.lexicon);
    this.GRAMMAR = new MAGLANG_Grammar(data?.grammar);
    this.PHONETICS = new MAGLANG_Phonetics(data?.phonetics);
    this.SEMANTICS = new MAGLANG_Semantics(data?.semantics);
}
//#endregion









//------------------------------------------------------------------------
//#region GRAMMAR

MAGLANG.GRAMMAR = {};
MAGLANG.GRAMMAR.meta = {
    isCypher: true,
    isConcept: true,
    isGrammar: true
}

function MAGLANG_Grammar(data = {})
{
    this.initialize(data);
}
MAGLANG_Grammar.prototype.initialize = function(data)
{
    this.meta = data?.meta || {};
}

//#endregion







//------------------------------------------------------------------------
//#region LEXICON

MAGLANG.LEXICON = {};
MAGLANG.LEXICON.meta = {
    isCypher: true,
    isEXP: true,
    isLexicon: true
}

function MAGLANG_Lexicon(data = {})
{
    this.initialize(data);
}
MAGLANG_Lexicon.prototype.initialize = function(data)
{
    this.totalSize = data?.totalSize || 0;
    this._noun = data?.noun;
    this._verb = data?.verb;
    this._adjective = data?.adjective;
    this._adverb = data?.adverb;

}

//#endregion







//------------------------------------------------------------------------
//#region PHONETICS

MAGLANG.PHONETICS = {};
MAGLANG.PHONETICS.meta = {
    isEmote: true,
    isSpeech: true,
    isPhonetics: true
}

function MAGLANG_Phonetics(data = {})
{
    this.initialize(data);
}
MAGLANG_Phonetics.prototype.initialize = function(data)
{
    this.meta = data?.meta || {};
}

//#endregion







//------------------------------------------------------------------------
//#region SEMANTICS

MAGLANG.SEMANTICS = {};
MAGLANG.SEMANTICS.meta = {
    isCypher: true,
    isConcept: true,
    isEXP: true,
    isSemantics: true
}

function MAGLANG_Semantics(data = {})
{
    this.initialize(data);
}
MAGLANG_Semantics.prototype.initialize = function(data)
{
    this.meta = data?.semantics || {};
}

//#endregion









//------------------------------------------------------------------------
//#region DICTIONARY

MAGLANG.DICTIONARY = {};
MAGLANG.DICTIONARY.meta = {
    isCypher: true,
    isLexicon: true,
    isDictionary: true,
    name: "Dictionary"
}

//#endregion






//------------------------------------------------------------------------
//#region MODEL

MAGLANG.MODEL = {};
MAGLANG.MODEL.meta = {
    name: MAGPIE.addons.Language.meta.name,
    isManager: true
}

function MAGLANG_Model()
{
    this.initialize(...arguments)
}
MAGLANG_Model.prototype.initialize = function()
{
    this.isInit = true;
    this.isActive = false;
}

//#endregion










//------------------------------------------------------------------------
//#region RUNTIME

MAGLANG.RUNTIME = {}

let $MAGLANG = null;





//------------------------------------------------------------------------
//#region System

MAGLANG.RUNTIME._Game_System_Initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function()
{
    MAGLANG.RUNTIME._Game_System_Initialize.call(this);
    $MAGPIE.LANG = new MAGLANG_Model();
}

//#endregion



//------------------------------------------------------------------------
//#region Data

MAGLANG.RUNTIME._DataManager_createSave = DataManager.createGameObjects;
DataManager.createGameObjects = function()
{
    MAGLANG.RUNTIME._DataManager_createSave.call(this);
    let data = $MAGPIE.DATA.readJSON("MAGPIE/English", "warn") || {};
    $MAGLANG = new MAGLANG_Database(data);
}

MAGLANG.RUNTIME._DataManager_makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function()
{
    const contents = MAGLANG.RUNTIME._DataManager_makeSave.call(this);
    contents.MAGLANG = $MAGLANG;
    MAGLANG.RUNTIME._saveLangagueData();
    return contents
}

MAGLANG.RUNTIME._saveLangagueData = function()
{
    Object.entries($MAGLANG.languages).forEach(lang => {
        $MAGPIE.DATA.writeJSON(`MAGPIE/${lang.meta.name}`, lang, "warn");
    })
}

MAGLANG.RUNTIME._DataManager_loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents)
{
    MAGLANG.RUNTIME._DataManager_loadSave.call(this, contents);
    $MAGLANG = contents.MAGLANG;
}

//#endregion

//#endregion

//end of file