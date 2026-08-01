//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [TIER_CGC_1] v0.35.0 MAGPIE ShelderEvo_CGC
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
 * v0.35.0 2026 06 06
 * - initial build
 */
//#endregion
//========================================================================
/**
 * @namespace 
 * @author Matheraptor
 * @version 0.35.0
 * @desc 
 */
//========================================================================
//#region - INDEX
//========================================================================
var MAGPIE = MAGPIE || {}
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.CGC = {}
MAGPIE.addons.CGC.meta = {
	name: "M.A.G.P.I.E. 'MythAtelier CGC' plugins modifications repo",
	desc: "",
	version: [0,35,0],
	firmwareName: "ShelderEvo_CGC",
	firmwareDate: "20260606"
}
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
// #region > 
//------------------------------------------------------------------------
/**
 * @static
 * @returns {new MAGPIE_CGC}
 */
function MAGPIE_CGC()
{
	this.initialize(...arguments)
}
MAGPIE_CGC.prototype.initialize = function()
{
	this.isInit = true
	this.isActive = false
}
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
// #region - BOOT
//========================================================================
HIMS.prototype.CGC = function()
{
	console.info("ShelderEvo CGC...")
	const systems = [
		HIMS.consoleGO("Socket to skillID", $CGC?.isInit),
		HIMS.consoleGO("addons", HIMS.CGC_addons())
	]
	const status = this.systemsCheck(systems)
	return status
}
MAGPIE.addons.CGC._console_systems = HIMS.prototype.systems;
HIMS.prototype.systems = function(status)
{
	if(!this.CGC())
		status = false;
	MAGPIE.addons.CGC._console_systems.call(this, status)
}
HIMS.CGC_addons = function()
{
	return true
}
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
 * back to {@link MAGPIE.addons.CGC.meta}
 * 
 */
//========================================================================
// END OF FILE
//========================================================================