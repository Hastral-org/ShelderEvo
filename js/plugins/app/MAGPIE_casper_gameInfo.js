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
MAGPIE.addons.Casper.GameInfo = {};
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
  firmwareName: "CGMZ_GameInfo",
};
MAGPIE.addons.Casper.GameInfo._createForeground =
  Scene_Title.prototype.createForeground;
Scene_Title.prototype.createForeground = function () {
  const SE_info = MAGPIE.printGameInfo();
  if (SE_info?.left) CGMZ.GameInfo.LeftText = SE_info.left;
  if (SE_info?.center) CGMZ.GameInfo.CenterText = SE_info.center;
  if (SE_info?.right) CGMZ.GameInfo.RightText = SE_info.right;
  MAGPIE.addons.Casper.GameInfo._createForeground.call(this);
};
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
MAGPIE.printGameInfo = function () {
  const ePrefix = "[MAGPIE].printGameInfo: ";
  try {
    const gameName = MAGPIE.SHELDEREVO.meta.name.replaceAll("™", "(tm) ");
    const firmwareDate = MAGPIE.SHELDEREVO.meta.firmwareDate;
    const version = MAGPIE.printVersion(MAGPIE.SHELDEREVO.meta.version);
    const copyright = MAGPIE.KEY.COPYRIGHT || "";
    const playerID = localStorage.getItem("playerID");
    const username = localStorage.getItem("playerUsername");
    const isHandle = Number(playerID) && String(username);
    const handle = isHandle ? `[PLAYER-${playerID} | ${username}]` : "";
    const gameinfo = {
      left: `${gameName} ${version} ${firmwareDate}`,
      center: handle,
      right: copyright,
    };
    return gameinfo;
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
 *
 * back to {@link MAGPIE.addons.Casper.GameInfo.meta}
 *
 */
//========================================================================
// END OF FILE
//========================================================================
