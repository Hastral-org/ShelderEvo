//========================================================================
//#region - META
//========================================================================
/*:
 * @target MZ
 * @plugindesc [TIER_CGC_2] v0.35.0 MAGPIE ShelderEvo_changeEquipCGC
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
MAGPIE.addons = MAGPIE.addons || {}
MAGPIE.addons.CGC = MAGPIE.addons.CGC || {};
MAGPIE.addons.CGC.changeEquip = {};
MAGPIE.addons.CGC.changeEquip.meta = {
    name: "M.A.G.P.I.E. 'MythAtelier CGC'/'Kannazuki' 'ChangeEquipOnBattleMZ",
    desc: "",
    version: [0,35,0],
    firmwareName: "ShelderEvo_changeEquipCGC",
    firmwareDate: "20260606"
}
MAGPIE.addons.CGC.changeEquip.sourceMyth = Myth.CGC;
MAGPIE.addons.CGC.changeEquip.sourceKannazuki = KANNAZUKI.ChangeEquipOnBattleMZ
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
MAGPIE.addons.CGC._sceneBattle_onEquipSlotCancel = Scene_Battle.prototype.onEquipSlotCancel;
Scene_Battle.prototype.onEquipSlotCancel = function()
{
    MAGPIE.addons.CGC._sceneBattle_onEquipSlotCancel.call(this);
    if(!Math?.CGC)
        return
    if(!Myth.CGC.skipActorCommand)
        this._actorCommandWindow.activate()
    else
        this._skillWindow.open()
}
MAGPIE.addons.CGC._Scene_Battle_commandEquip = Scene_Battle.prototype.commandEquip;
Scene_Battle.prototype.commandEquip = function()
{
    MAGPIE.addons.CGC._Scene_Battle_commandEquip.call(this);
    this._skillWindow.close()
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
 * @name 
 * @desc 
 * 
 */
//========================================================================
// #region - BOOT
//========================================================================
MAGPIE.addons.CGC.changeEquip._addons = HIMS.CGC_addons;
HIMS.CGC_addons = function()
{
    const status = MAGPIE.addons.CGC.changeEquip._addons.call(this);
    if(HIMS.consoleGO("Myth_Kannazuki_changeEquipCGC", true) && status)
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
 * back to {@link MAGPIE.addons.CGC.changeEquip.meta}
 * 
 */
//========================================================================
// END OF FILE
//========================================================================