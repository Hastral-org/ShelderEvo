/*:
 * @plugindesc [Tier_Z] v0.1.6 MAGPIE_Myth_changeEquipCGC
 * @author Matheraptor
 * @target MZ
 * @url https://matheraptor.itch.io/magpie-myth-changeequip
 *
 * 
 * @help
 * Modification for compatibility between ChangeEquipOnBattleMZ 
 * and Myth CGC.
 * 
 * Place this plugin below both ChangeEquipOnBattleMZ and
 * Myth CGC
 * 
 * -----------------------------------------------------------
 * CHANGELOG
 * -----------------------------------------------------------
 * v0.1.6 2025 07 31
 * - conformity update with MAGPIE_SYS v0.4.0
 * 
 * v0.1.5 20250730 - conformity update with SECore v0.4.0
 * 
 * v 0.1.4 - plugin suite structure redesign
 * 
 * v 0.1.3
 * - fixed call handling not deactivating skillWindow: changed the call
 *   from skillWindow.deactivate/activate to skillWindow.close/open
 * 
 * v 0.1.2
 * - fixed changeEquip plugin definitions by altering the plugin 
 *   structure to comply with coding standards
 * 
 * v 0.1.1
 * - fixed definitions and call edits
 * 
 * v 0.1.0
 * - first version: basic edits of changeQuip commandEquip() 
 *   and onEquipSlotCancel()
 */

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.7.0";
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.Equip_CGC = {};
MAGPIE.addons.Equip_CGC.version = "0.1.6";
MAGPIE.addons.Equip_CGC.pluginName = "MAGPIE_Myth_changeEquipCGC";

//#region Dictionary
const BattleEquip = KANNAZUKI.ChangeEquipOnBattleMZ;


//#endregion


//#region edits

MAGPIE.addons.Equip_CGC._Scene_Battle_commandEquip = Scene_Battle
    .prototype.commandEquip;
MAGPIE.addons.Equip_CGC._Scene_Battle_commandEquip = function() 
{
    Scene_Battle.prototype.commandEquip.call(this);
    this._skillWindow.close();
};

// Scene_Battle.prototype.commandEquip = function() {
//     this.refreshActor();
//     BattleEquip.storeCurrentEquips();
//     this._equipStatusWindow.show();
//     this._equipSlotWindow.refresh();
//     this._equipSlotWindow.select(0);
//     this._equipSlotWindow.show();
//     this._skillWindow.close();
//     this._equipSlotWindow.activate();
//     this.equippingActor = null;
// };

MAGPIE.addons.Equip_CGC._Scene_Battle_onEquipSlotCancel = Scene_Battle
    .prototype.onEquipSlotCancel;

Scene_Battle.prototype.onEquipSlotCancel = function()
{
    MAGPIE.addons.Equip_CGC._Scene_Battle_onEquipSlotCancel.call(this);
    if(!Myth?.CGC)
    {
        return
    }
    if(!Myth.CGC.skipActorCommand)
    {
        this._actorCommandWindow.activate();
    }
    else
    {
        this._skillWindow.open();
    }
}

// Scene_Battle.prototype.onEquipSlotCancel = function() {
//     if (BattleEquip.usingEquipState()) {
//         const actor = BattleManager.actor();
//         if (actor) {
//         BattleManager.actor().updateEquipStates2();
//         }
//     }
//     if (BattleEquip.doesConsumeTurn && !BattleEquip.doesDisableToInput()) {
//         this.selectNextCommand();
//     }
//     this._equipStatusWindow.hide();
//     this._equipSlotWindow.hide();
//     if (BattleEquip.doesDisableToInput()) {
//         BattleManager.actor().clearActions();
//         BattleManager.selectNextActor(true);
//     } else {
//         this._actorCommandWindow.selectLast();
//     }
//     if(!Myth.CGC.skipActorCommand)
//         {
//             this._actorCommandWindow.activate()
//         } else {
//             this._skillWindow.open();
//         };
//     this.equippingActor = null;
// };

//#endregion
