//#region META
/*: 
 * 
 * @target MZ
 * @plugindesc [Tier_3] v0.2.3 ShelderEvo_Battlecore
 * @author Matheraptor
 * 
 * @help
 * Custom battle system
 * Place below Triacontane_StateIconRing
 * 
 * -----------------------------------------------------------------------
 * CHANGELOG
 * -----------------------------------------------------------------------
 * v 0.2.3 - plugin addon structure redesign
 * 
 * v 0.2.2 - cleaned up pseudocode section
 * 
 * v 0.2.1 - fixed plugin init order
 * 
 * v 0.2.0 - new implementation by overhauling Sprite prototypes
 * 
 * v 0.1.0 - initial implementation 
 * 
 */
//#endregion

//#region INIT

var MAGPIE = MAGPIE || {};
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.battleCore = {};


//-------------------------------------------------------------------------
//#region Plugin Parameters

MAGPIE.addons.battleCore.pluginName = "ShelderEvo_Battlecore";
MAGPIE.addons.battleCore.parameters = PluginManager.parameters(MAGPIE.addons.battleCore.pluginName);



//#endregion

//#endregion



//-------------------------------------------------------------------------
//#region Battlers as Cards




//#region Enemy
Sprite_Enemy.prototype.loadBitmap = function(name) {
    if ($gameSystem.isSideView()) {
        this.bitmap = ImageManager.loadSvActor(name);
    } else {
        this.bitmap = ImageManager.loadEnemy(name);
    }
};

Game_Enemy.prototype.battlerName = function() {
    return this._name;
};


//#endregion





//#region actor

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







//-------------------------------------------------------------------------
//#region Sprite addons









//-------------------------------------------------------------------------
//#region Creature






//#region CreatureBase

function Sprite_CreatureBase()
{
    this.initialize(...arguments);
}

Sprite_CreatureBase.prototype = Object.create(Sprite_Battler.prototype);
Sprite_CreatureBase.prototype.constructor = Sprite_CreatureBase;

Sprite_CreatureBase.prototype.initialize = function(battler) {
    Sprite_Battler.prototype.initialize.call(this, battler);
    this._battlerName = "";
    this.createShadowSprite();
    this.createMainSprite();
};

Sprite_CreatureBase.prototype.mainSprite = function() {
    return this._mainSprite;
};

Sprite_CreatureBase.prototype.createMainSprite = function() {
    this._mainSprite = new Sprite();
    this._mainSprite.anchor.x = 0.5;
    this._mainSprite.anchor.y = 1;
    this.addChild(this._mainSprite);
};

Sprite_CreatureBase.prototype.createShadowSprite = function() {
    this._shadowSprite = new Sprite();
    this._shadowSprite.bitmap = ImageManager.loadSystem("Shadow2");
    this._shadowSprite.anchor.x = 0.5;
    this._shadowSprite.anchor.y = 0.5;
    this._shadowSprite.y = -2;
    this.addChild(this._shadowSprite);
};

Sprite_CreatureBase.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._creature = battler;
};

Sprite_CreatureBase.prototype.update = function() {
    Sprite_Battler.prototype.update.call(this);
    this.updateShadow();
};

Sprite_CreatureBase.prototype.updateShadow = function() {
    this._shadowSprite.visible = !!this._creature;
};

Sprite_CreatureBase.prototype.updateMain = function() {
    Sprite_Battler.prototype.updateMain.call(this);
    if (this._creature.isSpriteVisible() && !this.isMoving()) {
        this.updateTargetPosition();
    }
};

Sprite_CreatureBase.prototype.updateBitmap = function() {
    Sprite_Actor.prototype.updateBitmap.call(this);
};

Sprite_CreatureBase.prototype.updateFrame = function() {
    Sprite_Actor.prototype.updateFrame.call(this);
    this.setFrame(0, 0, this._mainSprite.bitmap.width, this._mainSprite.bitmap.height);
    this._mainSprite.setFrame(0, 0, this._mainSprite.bitmap.width, this._mainSprite.bitmap.height);
};

Sprite_CreatureBase.prototype.damageOffsetX = function() {
    return Sprite_Battler.prototype.damageOffsetX.call(this) - 32;
};

Sprite_CreatureBase.prototype.damageOffsetY = function() {
    return Sprite_Battler.prototype.damageOffsetY.call(this);
};

//#endregion






//#region Creature Layers

function Sprite_CreatureLayerBase()
{
    //
}

//#endregion




//#endregion






//-------------------------------------------------------------------------
//#region PSEUDOCODE
/**
 * 
 * @desc Core Approach
 * 1. Setup Placeholder Enemy
 *    Create a single invisible/dummy enemy in the database that serves purely as a battle trigger:
 * 
 * 2. Custom Party Management
 *    Since you want separate parties, you can extend the party system:
 * 
 * 3. Battle Scene Integration
 *    Override the battle members to include your custom party:
 * 
 * 4. Action Processing
 *    Your existing custom action system just needs to target the right party:
 */
MyBattleManager = {};
MAGPIE.addons.battleCore._design = 
{
    exec: 
    {
        Setup_Placeholder_Enemy: `Create a single invisible/dummy enemy in the database that 
        serves purely as battle trigger`,
        Custom_Party_Management: 
        {
            desc: `Since you want separate parties, you can extend the party system`,
            createEnemyParty: 
            {
                desc: "Create a separate enemy party", 
                func: this.create = function() {$gameEnemyParty = new Game_Party()}
            },
            customSpawnSystem:
            `Your custom spawning system
                MyBattleManager.spawnEnemyActors = function(actorIds) 
                {
                    $gameEnemyParty.clear();
                    for (const actorId of actorIds) 
                    {
                        const actor = new Game_Actor(actorId);
                        Set any enemy-specific flags or properties
                        actor._isEnemyActor = true;
                        actor._battleIndex = $gameEnemyParty._actors.length;
                        $gameEnemyParty.addActor(actorId);
                    }
                }`
        },
        Battle_Scene_Integration: 
        {
            desc: `Override the battle members to include your custom party`,
            recognizeBothParties: 
                `Modify BattleManager or Scene_Battle to recognize both parties
                BattleManager.allBattleMembers = function() 
                {
                    return $gameParty.allMembers().concat($gameEnemyParty.allMembers());
                };`,
            separateMethods: 
            `
            Separate methods for each side
            BattleManager.allEnemies = function() 
            {
                return $gameEnemyParty.allMembers();
            };

            BattleManager.allAllies = function() 
            {
                return $gameParty.allMembers();
            };
            `
        },
        Action_Processing: 
        {
            desc: `Your existing custom action system just needs to target the right party`,
            exec: `
            MyActionSystem.processEnemyActions = function() 
            {
                const enemies = $gameEnemyParty.allMembers();
                for (const enemy of enemies) 
                {
                    if (enemy.canMove()) 
                    {
                        const action = this.determineEnemyAction(enemy);
                        enemy.makeActions();
                        enemy._actions[0] = action;
                    }
                }
            };
            `
        }
    },
    benefits: 
    {
        Minimal_Core_Changes: `You're not fighting against MZ's battle system`,
        Clean_Separation: `Player party vs Enemy party is conceptually clear`,
        Existing_Tools_Work: `Party management, save/load, etc. all work normally`,
        Easy_Debugging: `You can inspect $gameEnemyParty just like $gameParty`,
        Future_Flexibility: `Easy to add multiple enemy parties, switching sides, etc.`
    },
    implementation_notes:
    {
        Battle_Scene_Sprites: 
        {
            desc: `You'll need to ensure the battle scene renders your enemy
                party actors, in Spriteset_Battle or wherever you handle
                sprite creation:`,
            exec: this.exec = function()
            {
                const enemies = $gameEnemyParty.allMembers();
                for(let i = 0; i < enemies.length; i++)
                {
                    const sprite = new Sprite_Actor(enemies[i]);
                    //position them in enemy positions
                    sprite.setHome(this.getEnemyPosition(i));
                    this._enemySprites.push(sprite);
                }
            }
        }
    },
    Turn_Order: 
    {
        desc: `Make sure your battle system processes both parties:`,
        turn_order_logic: {},
        turn_processing: MyBattleManager.getNextActor = function() 
        {
            const allActors = $gameParty.allMembers().concat($gameEnemyParty.allMembers());
            turn_order_logic;
            return nextActor
        }
    }
};

//#endregion