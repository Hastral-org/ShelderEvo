/*:
 * @target MZ
 * @plugindesc [Tier_5] v0.1.3 MAGPIE_Myth_StateInfoFix
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-myth-stateinfofix
 * 
 * @help
 * (MAGPIE) StateInfoPopup line height fix
 * Enables you to edit the line height in the state window from CGC State Info
 * Popup plugin
 * 
 * IMPORTANT:
 * Place under Myth State Info Popup plugin
 * 
 * ----------------------------------------------------------------------------
 * TERMS OF USE
 * ----------------------------------------------------------------------------
 * You are ALLOWED to use this plugin in both FREE and COMMERCIAL games.
 * You can credit the authors of both this plugin fix and the original
 * plugin Myth.CGC
 * 
 * Recommended credit: 
 * "MAGPIE_StateInfoFix - by Matheraptor" (if used standalone)
 * or
 * "MAGPIE plugin suite - by Matheraptor" (if part of the plugin suite)
 * and
 * "State Info Popup - by Myth Atelier"
 * 
 * ---------------------------------------------------------
 * CHANGELOG
 * ---------------------------------------------------------
 * v0.1.3 2025 07 30
 * - conformity update with MAGPIE_SYS v0.4.0
 * 
 * v0.1.2 20250730 - conformity udpate with SECore v0.4.0
 * 
 * v 0.1.1 - plugin suite structure redesign
 * 
 * v 0.1.0 - initial release
 * 
 */

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.7.0";
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.StateInfoFix = {};
MAGPIE.addons.StateInfoFix.version = "0.1.3";

MAGPIE.addons.StateInfoFix.pluginName = "MAGPIE_Myth_StateInfoFix";
MAGPIE.addons.StateInfoFix.lineHeight = 28;

Window_StatusDescription.prototype.lineHeight = function ()
{
	return MAGPIE.addons.StateInfoFix.lineHeight;
};

//end of plugin