//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_4] v0.1.1 ShelderEvo_History
 * @author Matheraptor
 * 
 * @help
 * SHELDER EVOLUTION - HISTORY (SHELSTORY)
 * Dictionary
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.1.2 - plugin renamed from Prehistory to History for coherence
 * 
 * v0.1.1 - plugin structure redesign
 * 
 * v0.1.0 - initial build
 */
//#endregion





//-----------------------------------------------------------------------------------------------
//#region INIT

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.5.1";
MAGPIE.SE = MAGPIE.SE || {};
MAGPIE.SE.version = MAGPIE.SE.version || "0.4.0";
MAGPIE.SE.History = {};
const SHELSTORY = MAGPIE.SE.History;
SHELSTORY.version = "0.1.1"; 
SHELSTORY.pluginName = "ShelderEvo_History";

//#endregion






//-----------------------------------------------------------------------------------------------
//#region Dictionary

MAGPIE.SE.History.Eon_Genesys = new Event_Geologic(PDLM.META.SCALE.EON, "Genesys", 4 * PDLM.META.SCALE.GYA, 2 * PDLM.META.SCALE.GYA);

MAGPIE.SE.History.Eon_Arkian = new Event_Geologic(PDLM.META.SCALE.EON, "Arkian", 2 * PDLM.META.SCALE.GYA, 0);
MAGPIE.SE.History.Eon_Arkian.Era_Protean = new Event_Geologic(
    PDLM.META.SCALE.ERA, "Protean", 1500 * PDLM.META.SCALE.MYA, 500 * PDLM.META.SCALE.MYA);
MAGPIE.SE.History.Eon_Arkian.Era_Protean.Period_Neagene = new Event_Geologic(
    PDLM.META.SCALE.PERIOD, "Neagene", 1500 * PDLM.META.SCALE.MYA, 1200 * PDLM.META.SCALE.MYA);
MAGPIE.SE.History.Eon_Arkian.Era_Protean.Period_Metavallogene = new Event_Geologic(
    PDLM.META.SCALE.PERIOD, "Metavallogene", 1200 * PDLM.META.SCALE.MYA, 900 * PDLM.META.SCALE.MYA);
MAGPIE.SE.History.Eon_Arkian.Era_Protean.Period_Anaptygene = new Event_Geologic(
    PDLM.META.SCALE.PERIOD, "Anaptygene", 900 * PDLM.META.SCALE.MYA, 500 * PDLM.META.SCALE.MYA);

MAGPIE.SE.History.Eon_Arkian.Era_Primazoic = new Event_Geologic(
    PDLM.META.SCALE.ERA, "Primazoic", 500 * PDLM.META.SCALE.MYA, 260 * PDLM.META.SCALE.MYA);
MAGPIE.SE.History.Eon_Arkian.Era_Primazoic.Period_Primasuperian = new Event_Geologic(
    PDLM.META.SCALE.PERIOD, "Primasuperian", 500 * PDLM.META.SCALE.MYA, 318 * PDLM.META.SCALE.MYA);
MAGPIE.SE.History.Eon_Arkian.Era_Primazoic.Period_Primainferian = new Event_Geologic(
    PDLM.META.SCALE.PERIOD, "Primainferian", 318 * PDLM.META.SCALE.MYA, 260 * PDLM.META.SCALE.MYA)

MAGPIE.SE.History.Eon_Arkian.Era_Mesozoic = new Event_Geologic(PDLM.META.SCALE.ERA, "Mesozoic", 260 * PDLM.META.SCALE.MYA, 0);
MAGPIE.SE.History.Eon_Arkian.Era_Mesozoic.Period_Ariassic = new Event_Geologic(
    PDLM.META.SCALE.PERIOD, "Ariassic", 260 * PDLM.META.SCALE.MYA, 180 * PDLM.META.SCALE.MYA);
MAGPIE.SE.History.Eon_Arkian.Era_Mesozoic.Period_Kerassic = new Event_Geologic(
    PDLM.META.SCALE.PERIOD, "Kerassic", 180 * PDLM.META.SCALE.MYA, 100 * PDLM.META.SCALE.MYA);
MAGPIE.SE.History.Eon_Arkian.Era_Mesozoic.Period_Sonikrian = new Event_Geologic(
    PDLM.META.SCALE.PERIOD, "Sonikrian", 100 * PDLM.META.SCALE.MYA, 0);

MAGPIE.SE.History.Eon_Hastralean = new Event_Geologic(PDLM.META.SCALE.EON, "Hastralean", 0, Infinity);
MAGPIE.SE.History.Eon_Hastralean.Era_Hastralic = new Event_Geologic(PDLM.META.SCALE.ERA, "Hastralic", 0, Infinity);
MAGPIE.SE.History.Eon_Hastralean.Era_Hastralic.Period_SHELCOL = new Event_Geologic(PDLM.META.SCALE.PERIOD, "SHELCOL", 0, Infinity);
MAGPIE.SE.History.Eon_Hastralean.Era_Hastralic.Age_Gardian = new Event_Geologic(PDLM.META.SCALE.AGE, "Gardian", 0, 300);
MAGPIE.SE.History.Eon_Hastralean.Era_Hastralic.Age_Hastralian = new Event_Geologic(PDLM.META.SCALE.AGE, "Hastralian", 300, 2000);
MAGPIE.SE.History.Eon_Hastralean.Era_Hastralic.Age_Alowian = new Event_Geologic(PDLM.META.SCALE.AGE, "Alowian", 2000, Infinity);

//#endregion