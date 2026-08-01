//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_S] v0.2.0 MAGPIE_AllBattlersStaticSVActors
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-allbattlerssvactors
 * 
 * @help
 * (MAGPIE) ALL BATTLERS AS STATIC SV ACTORS (Standalone)
 * Change the core code to force all SV battlers into static SV actors
 * 
 * This is a standalone plugin: though it is part of a plugin suite (MAGPIE),
 * it has no dependency (Tier_"S" for "Standalone").
 * 
 * 
 * ----------------------------------------------------------------------------
 * FEATURES
 * ----------------------------------------------------------------------------
 * - force the engine to load both SV_actors and SV_enemies from the SV_actors 
 *   folder, thus enabling standardization and interoperability (eg. you could
 *   create a character template and change its sprite in-game)
 * 
 * - disable SV_actors animation, thus turning them into the same as the
 *   default static enemies (useful if you plan to use your own sprite or 
 *   animation system)
 * 
 * ----------------------------------------------------------------------------
 * HOW TO USE
 * ----------------------------------------------------------------------------
 * 1. place your images in the SV_actors folder
 * 
 * 2. in the enemy note section write <name:x> where 'x' is the exact filename
 *    of the image you want the enemy to have, minus the file extension.
 *    eg. for a filename 'enemy.png' write <name:enemy>
 *    
 *    this plugin will initialize the enemy by looking at the notetag above if
 *    no previous value has been provided, which, by default, it won't.
 * 
 * 3. (optional) you can change the enemy image at any time by simply
 *    changing the enemy._name property using a simple JS script call:
 *    $gameTroop._enemies[x]._name = "y" (where x is the enemy index and y is
 *    the filename as above. Make sure you write it as a string - "in quotes")
 *    any script call that returns the wanted Game_Enemy will let you
 *    edit its ._name property.
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.2.0 2025 08 08 - fixed the ._name property not inititialized
 * 
 * v0.1.0 2025 08 05 - initial build
 */
//#endregion





//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.7.0";
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.battlersAsSVactors = {};
MAGPIE.addons.battlersAsSVactors.version = "0.2.0";
MAGPIE.addons.battlersAsSVactors.pluginName = "MAGPIE_battlersAsSVactors";
//#endregion





//------------------------------------------------------------------------
//#region CORE EDITS




//------------------------------------------------------------------------
//#region Enemy
Sprite_Enemy.prototype.loadBitmap = function(name) {
    if ($gameSystem.isSideView()) {
        this.bitmap = ImageManager.loadSvActor(name);
    } else {
        this.bitmap = ImageManager.loadEnemy(name);
    }
};

Game_Enemy.prototype.setName = function()
{
    this._name = $dataEnemies[this._enemyId].meta?.name;
}

Game_Enemy.prototype.battlerName = function() {
    if(!this._name) this.setName();
    return this._name;
};

//#endregion




//------------------------------------------------------------------------
//#region Actor
Sprite_Actor.prototype.update = function() {
    Sprite_Battler.prototype.update.call(this);
    this.updateShadow();
}
Sprite_Actor.prototype.setupMotion = function() {};
Sprite_Actor.prototype.setupWeaponAnimation = function() {};
Sprite_Actor.prototype.startMotion = function() {};
Sprite_Actor.prototype.updateFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
    this.setFrame(0, 0, this._mainSprite.bitmap.width, this._mainSprite.bitmap.height);
    this._mainSprite.setFrame(0, 0, this._mainSprite.bitmap.width, this._mainSprite.bitmap.height);
};
Sprite_Actor.prototype.updateMotion = function() {};
Sprite_Actor.prototype.updateMotionCount = function() {};
Sprite_Actor.prototype.motionSpeed = function() {};

Sprite_Actor.prototype.refreshMotion = function() {};
Sprite_Actor.prototype.startEntryMotion = function() {};

Sprite_Actor.prototype.onMoveEnd = function() {
    Sprite_Battler.prototype.onMoveEnd.call(this);
    // if (!BattleManager.isBattleEnd()) {
    //     this.refreshMotion();
    // }
};

//#endregion

//#endregion

//end of plugin