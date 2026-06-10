//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_6] v0.1.1 ShelderEvo_Outreach
 * @author Matheraptor
 * @url 
 * 
 * @help
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.1.1 2025 08 28
 * - MAGPIE.SYS 0.10.0 and ShelderEvo 0.4.6 conformity update
 * 
 * v0.1.0 2025 08 20
 * - initial build
 */
//#endregion




//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.10.0";
if(!MAGPIE?.ShelderEvo) {
    MAGPIE.ShelderEvo = {}; 
    throw new Error("ShelderEvo_Outreach needs MAGPIE_ShelderEvo_Core.js to run!");
}

MAGPIE.ShelderEvo.version = MAGPIE.ShelderEvo.version || "0.4.6";
MAGPIE.ShelderEvo.Outreach = {};
MAGPIE.ShelderEvo.Outreach.version = "0.1.1";
MAGPIE.ShelderEvo.Outreach.tier = 6;
MAGPIE.ShelderEvo.Outreach.pluginName = "ShelderEvo_Outreach";
MAGPIE.ShelderEvo.Outreach.meta = {
    name: "Shelder Evolution: Outreach",
    firmware: "20250830",
    firmwareFile: `${MAGPIE.ShelderEvo.Outreach.pluginName}.js`,
    isEP: true
};

var $Outreach = null;

//#endregion





//------------------------------------------------------------------------
//#region MCON

// MAGPIE.ShelderEvo.Outreach.MCON = {};
// MAGPIE.ShelderEvo.Outreach.MCON.data = {
//     ID: 0,
//     type: MAGPIE.MCON.TYPE.QUEST,
//     category: MAGPIE.MCON.CAT.SECURITY,
//     urgency: MAGPIE.MCON.URGENCY.SCRAMBLE,
//     gravity: MAGPIE.MCON.GRAVITY.VITAL,
//     status: MAGPIE.MCON.STATUS.ASAP,
//     children: {}
// }

//#endregion






//------------------------------------------------------------------------
//#region NEW GAME

MAGPIE.ShelderEvo.Outreach._ShelderEvo_start = MAGPIE.ShelderEvo.start;
MAGPIE.ShelderEvo.start = function()
{
    MAGPIE.ShelderEvo.Outreach._ShelderEvo_start.call(this);
    $Outreach = new HIMS_Cinematic($MAGPIE.DATA.readJSON("MAGPIE/Outreach", "warn"));
}

//#endregion





//end of plugin