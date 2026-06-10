//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [TIER_Casper_2] v0.35.0 MAGPIE Casper GameInfo modifications
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
 * v0.35.0 2026 06 07
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
MAGPIE.addons.Casper.GameInfo = {}
//#endregion
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//========================================================================
// #region - PLUGIN
//========================================================================
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > GameInfo
//------------------------------------------------------------------------
MAGPIE.addons.Casper.GameInfo.meta = {
	name: "CasperGaming GameInfo",
	firmwareName: "CGMZ_GameInfo"
}
MAGPIE.addons.Casper.GameInfo._createForeground = Scene_Title
	.prototype.createForeground;
Scene_Title.prototype.createForeground = function()
{
	const SE_info = MAGPIE.SHELDEREVO.printGameInfo()
	if(SE_info?.left)
		CGMZ.GameInfo.LeftText = SE_info.left;
	if(SE_info?.center)
		CGMZ.GameInfo.CenterText = SE_info.center;
	if(SE_info?.right)
		CGMZ.GameInfo.RightText = SE_info.right
	MAGPIE.addons.Casper.GameInfo._createForeground.call(this);
}
// #endregion
//------------------------------------------------------------------------
/**
 * @name 
 * @desc 
 * 
 */
//------------------------------------------------------------------------
// #region > sheldex
//------------------------------------------------------------------------
/**
 * 
 * @returns {{left: String}}
 */
MAGPIE.SHELDEREVO.printGameInfo = function()
{
	const firmwareName = MAGPIE.SHELDEREVO.meta.name
	const firmwareDate = MAGPIE.SHELDEREVO.meta.firmwareDate
	const version = MAGPIE.printVersion(MAGPIE.SHELDEREVO.meta.version)
	const copyright = SE_CLI?._copyright || null
	const username = `[PLAYER-${SE_CLI.DATA.PLAYER_ID} | ${SE_CLI.activeUser}]`
	const gameinfo = {
		left: `${firmwareName}${version} ${firmwareDate}`,
		center: username,
		right: copyright
	}
	return gameinfo
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
 * 
 * back to {@link MAGPIE.addons.Casper.GameInfo.meta}
 * 
 */
//========================================================================
// END OF FILE
//========================================================================