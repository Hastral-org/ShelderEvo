//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [TIer S] v0.1.0 MAGPIE_EditOptionsMenu
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
 * v0.1.0 2026 07 27
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
var MAGPIE = MAGPIE || {};
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.EditOptionsMenu = {};
MAGPIE.addons.EditOptionsMenu.meta = {
  name: "M.A.G.P.I.E.(tm) Edit Options Menu",
  desc: "",
  firmwareName: "MAGPIE_EditOptionsMenu",
  firmwareDate: "20260727",
};
MAGPIE.addons.EditOptionsMenu.pluginName =
  MAGPIE.addons.EditOptionsMenu.meta.firmwareName;
MAGPIE.addons.EditOptionsMenu.additionalCommands = 1;
//#endregion
//========================================================================
/**
 * @name
 * @desc
 *
 */
//========================================================================
// #region - SCENE
//========================================================================
/**
 * @name
 * @desc
 *
 */
//------------------------------------------------------------------------
// #region > Options
//------------------------------------------------------------------------
MAGPIE.addons.EditOptionsMenu._maxCommands =
  Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function () {
  const value = MAGPIE.addons.EditOptionsMenu.additionalCommands;
  return MAGPIE.addons.EditOptionsMenu._maxCommands() + value;
};
MAGPIE.addons.EditOptionsMenu._addGeneralOptions =
  Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function () {
  MAGPIE.addons.EditOptionsMenu._addGeneralOptions.call(this);
  this.addCommand("Reset Save Data", "resetData");
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
//========================================================================
// END OF FILE
//========================================================================
