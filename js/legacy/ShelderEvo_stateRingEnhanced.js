//=============================================================================
// StateRingIcon.js
// ----------------------------------------------------------------------------
// (C)2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------

/*:
 * @plugindesc [Tier_2] v1.3.1 StateRingIconPlugin
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/StateRingIcon.js
 * @base PluginCommonBase
 * @author triacontane feat. Matheraptor
 *
 * @param RadiusX
 * @desc The value of the horizontal radius.
 * @default 64
 * @type number
 *
 * @param RadiusY
 * @desc The value of the vertical radius.
 * @default 16
 * @type number
 *
 * @param ScaleX
 * @desc The horizontal scale of the icon.
 * @default 100
 * @type number
 *
 * @param ScaleY
 * @desc The vertical scale of the icon.
 * @default 100
 * @type number
 *
 * @param CycleDuration
 * @desc The time (number of frames) it takes for the icon to rotate around the screen.
 * @default 120
 * @type number
 *
 * @param LineViewLimit
 * @desc If the number of states is less than or equal to this value, it will be displayed in a single column.
 * @default 1
 * @type number
 *
 * @param Reverse
 * @desc The direction of rotation will be counterclockwise.
 * @default false
 * @type boolean
 *
 * @param ShowTurnCount
 * @desc Displays the number of turns remaining in the state. It is displayed for both friend and foe.
 * @default true
 * @type boolean
 *
 * @param ShowStackCount
 * @desc Displays the stack count of the state using battler.stateStack(stateId).
 * @default false
 * @type boolean
 *
 * @param HideStackedDuplicates
 * @desc When true, only shows one icon per state and displays stack count as number.
 * @default false
 * @type boolean
 *
 * @param HideSingleStackCount
 * @desc When true, hides stack count when it equals 1 (only shows counts > 1).
 * @default true
 * @type boolean
 *
 * @param StackCountPosition
 * @desc Position of stack count relative to turn count. 0=Replace turns, 1=Above turns, 2=Below turns
 * @default 0
 * @type select
 * @option Replace Turn Count
 * @value 0
 * @option Above Turn Count
 * @value 1
 * @option Below Turn Count
 * @value 2
 *
 * @param StackCountColor
 * @desc Text color for stack count display (CSS color or hex code).
 * @default #ff6666
 * @type string
 *
 * @param IconIndexWithoutRing
 * @desc This is an "icon index" that is not subject to the ring display.
 * @default []
 * @type icon[]
 *
 * @param StateIdWithoutRing
 * @desc State IDs that will not be displayed in the ring (by database ID).
 * @default []
 * @type state[]
 *
 * @param IconIndexWithoutShowTurns
 * @desc The "icon index" is excluded from the display of the number of state-turns.
 * @default []
 * @type icon[]
 *
 * @param IconIndexWithoutShowStacks
 * @desc The "icon index" is excluded from the display of the number of state-stacks.
 * @default []
 * @type icon[]
 *
 * @param TurnCountX
 * @desc Adjusts the X coordinate display position of the number of turns.
 * @default 0
 * @type number
 * @min -1000
 * @max 1000
 *
 * @param TurnCountY
 * @desc Adjusts the Y coordinate display position of the number of turns.
 * @default 0
 * @type number
 * @min -1000
 * @max 1000
 *
 * @param StackCountX
 * @desc Adjusts the X coordinate display position of the stack count.
 * @default 0
 * @type number
 * @min -1000
 * @max 1000
 *
 * @param StackCountY
 * @desc Adjusts the Y coordinate display position of the stack count.
 * @default -12
 * @type number
 * @min -1000
 * @max 1000
 *
 * @param TurnAdjustment
 * @desc Corrects the displayed value of the number of turns.
 * @default 0
 * @type number
 * @min -9999
 * @max 9999
 *
 * @param UseNumberFont
 * @default false
 * @type boolean
 *
 * @param FontSize
 * @desc The font size of the remaining turns display.
 * @default 24
 * @type number
 *
 * @param StackFontSize
 * @desc The font size of the stack count display.
 * @default 20
 * @type number
 *
 * @param ActorRingIcon
 * @desc The state icons of allies will also be displayed as rings.
 * @default true
 * @type boolean
 *
 * @param ActorRingIconX
 * @desc X of the actor state icon.
 * @default 0
 * @type number
 * @min -1000
 * @max 1000
 *
 * @param ActorRingIconY
 * @desc Y of the actor state icon.
 * @default 0
 * @type number
 * @min -1000
 * @max 1000
 *
 * @param EnemyRingIconX
 * @desc X of the enemy state icon.
 * @default 0
 * @type number
 * @min -1000
 * @max 1000
 *
 * @param EnemyRingIconY
 * @desc Y of the enemy state icon.
 * @default 0
 * @type number
 * @min -1000
 * @max 1000
 *
 * @param IconHideSwitch
 * @desc When the switch is ON, the ring icon is hidden.
 * @default 0
 * @type switch
 *
 * @help StateRingIcon.js
 *
 * You can rotate the state icons of enemy characters
 * when multiple states are enabled clockwise to display
 * them in a ring or in a row.
 *
 * If you want to adjust the position of the ring state
 * for each enemy character, write the following
 * in the note of the database.
 * <RingStateX:0>
 * <RingStateY:0>
 *
 * Stack Count Feature:
 * This plugin now supports displaying state stack counts using
 * the battler.stateStack(stateId) function from compatible plugins.
 * 
 * When "Hide Stacked Duplicates" is enabled, only one icon per
 * state will be shown, with the stack count displayed as a number.
 *
 * When "Hide Single Stack Count" is enabled, stack counts of 1
 * will not be displayed, only showing counts greater than 1.
 *
 * State Exclusion:
 * You can exclude states from the ring display in two ways:
 * 1. By Icon Index: Use "IconIndexWithoutRing" to exclude by icon
 * 2. By State ID: Use "StateIdWithoutRing" to exclude by database state ID
 *
 * -------------------------------------------------------------------------
 * CHANGELOG
 * -------------------------------------------------------------------------
 * v1.3.1 - plugin suite structure redesign
 * 
 * v1.3.0 - added state exclusion list
 * 
 * v1.2.0 - added show options to hide single stack icon count
 * 
 * v1.2.1 - fixed icons of stacking states showing duplicates
 * 
 * v1.1.0 - added StateStack count functionality
 * 
 */

/**
 * Sprite_StateIconChild
 * ステートアイコンを回転表示させるためのクラスです。
 * @constructor
 */
function Sprite_StateIconChild() {
    this.initialize.apply(this, arguments);
}

(()=> {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    //=============================================================================
    // Helper function to check if a state should be excluded
    //=============================================================================
    function isStateExcluded(state) {
        // Check exclusion by icon index
        if (state.iconIndex <= 0 || param.IconIndexWithoutRing.includes(state.iconIndex)) {
            return true;
        }
        // Check exclusion by state ID
        if (param.StateIdWithoutRing && param.StateIdWithoutRing.includes(state.id)) {
            return true;
        }
        return false;
    }

    //=============================================================================
    // Game_BattlerBase
    //  ステートの残りターン数を取得します。
    //=============================================================================
    Game_BattlerBase.prototype.getStateTurns = function() {
        const stateTurns = this.states().map(function(state) {
            if (isStateExcluded(state)) {
                return null;
            } else if (state.autoRemovalTiming <= 0) {
                return '';
            } else {
                return Math.ceil(this._stateTurns[state.id]) + (state.autoRemovalTiming === 1 ? 1 : 0);
            }
        }, this);
        return stateTurns.filter(function(turns) {
            return turns !== null;
        });
    };

    Game_BattlerBase.prototype.getStateStacks = function() {
        const stateStacks = this.states().map(function(state) {
            if (isStateExcluded(state)) {
                return null;
            } else if (typeof this.stateStack === 'function') {
                return this.stateStack(state.id) || 1;
            } else {
                return 1; // Default to 1 if stateStack function doesn't exist
            }
        }, this);
        return stateStacks.filter(function(stacks) {
            return stacks !== null;
        });
    };

    Game_BattlerBase.prototype.getBuffTurns = function() {
        return this._buffTurns.filter(function(turns, index) {
            const icon = this.buffIconIndex(this._buffs[index], index);
            return this._buffs[index] !== 0 && !param.IconIndexWithoutRing.includes(icon);
        }, this);
    };

    Game_BattlerBase.prototype.getAllTurns = function() {
        return this.getStateTurns().concat(this.getBuffTurns()).map(function(turn) {
            return turn + param.TurnAdjustment;
        });
    };

    Game_BattlerBase.prototype.getAllStacks = function() {
        const stateStacks = this.getStateStacks();
        const buffStacks = this.getBuffTurns().map(() => 1); // Buffs don't stack, so always 1
        return stateStacks.concat(buffStacks);
    };

    // Override allIcons to use our exclusion logic
    Game_BattlerBase.prototype.allIcons = function() {
        const stateIcons = this.states().filter(state => !isStateExcluded(state))
            .map(state => state.iconIndex);
        const buffIcons = this._buffs.map((level, paramId) => {
            const icon = this.buffIconIndex(level, paramId);
            return level !== 0 && !param.IconIndexWithoutRing.includes(icon) ? icon : 0;
        }).filter(icon => icon > 0);
        
        return stateIcons.concat(buffIcons);
    };

    Game_Battler.prototype.findRingStateX = function() {
        return 0;
    };

    Game_Battler.prototype.findRingStateY = function() {
        return 0;
    };

    Game_Enemy.prototype.findRingStateX = function() {
        const x = PluginManagerEx.findMetaValue(this.enemy(), 'RingStateX');
        return x || param.EnemyRingIconX || 0;
    };

    Game_Enemy.prototype.findRingStateY = function() {
        const y = PluginManagerEx.findMetaValue(this.enemy(), 'RingStateY');
        return y || param.EnemyRingIconY || 0;
    };

    Game_Actor.prototype.findRingStateX = function() {
        return param.ActorRingIconX || 0;
    };

    Game_Actor.prototype.findRingStateY = function() {
        return param.ActorRingIconY || 0;
    };

    const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
    Sprite_Enemy.prototype.updateStateSprite = function() {
        const prevY = this._stateIconSprite.y;
        _Sprite_Enemy_updateStateSprite.apply(this, arguments);
        this._stateIconSprite.y += prevY;
    }

    if (param.ActorRingIcon) {
        const _Sprite_Actor_createStateSprite = Sprite_Actor.prototype.createStateSprite;
        Sprite_Actor.prototype.createStateSprite = function() {
            _Sprite_Actor_createStateSprite.apply(this, arguments);
            this._stateIconSprite = new Sprite_StateIcon();
            this._stateIconSprite.setActorRing();
            this._mainSprite.addChild(this._stateIconSprite);
        };

        const _Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
        Sprite_Actor.prototype.setBattler = function(battler) {
            _Sprite_Actor_setBattler.apply(this, arguments);
            this._stateIconSprite.setup(battler);
        };

        const _Sprite_Actor_update = Sprite_Actor.prototype.update;
        Sprite_Actor.prototype.update = function() {
            _Sprite_Actor_update.apply(this, arguments);
            this.updateStateSprite();
        }

        const _Window_StatusBase_placeStateIcon = Window_StatusBase.prototype.placeStateIcon;
        Window_StatusBase.prototype.placeStateIcon = function(actor, x, y) {
            _Window_StatusBase_placeStateIcon.apply(this, arguments);
            const key = "actor%1-stateIcon".format(actor.actorId());
            const sprite = this._additionalSprites[key];
            if (sprite && sprite.hasRingState()) {
                sprite.saveOriginalPosition();
                this.addChild(sprite);
            }
        }

        Sprite_Actor.prototype.updateStateSprite = function() {
            this._stateIconSprite.y -= Math.round((this._mainSprite.height + 40) * 0.9);
            if (this._stateIconSprite.y < 20 - this.y) {
                this._stateIconSprite.y = 20 - this.y;
            }
            if (this.scale.x !== 1.0) {
                this._stateIconSprite.scale.x = 1.0 / this.scale.x;
            }
            if (this.scale.y !== 1.0) {
                this._stateIconSprite.scale.y = 1.0 / this.scale.y;
            }
        };
    }

    //=============================================================================
    // Sprite_StateIcon
    //  ステートアイコンを回転させます。
    //=============================================================================
    const _Sprite_StateIcon_initMembers      = Sprite_StateIcon.prototype.initMembers;
    Sprite_StateIcon.prototype.initMembers = function() {
        _Sprite_StateIcon_initMembers.apply(this, arguments);
        this._icons        = [];
        this._iconsSprites = [];
    };

    const _Sprite_StateIcon_update      = Sprite_StateIcon.prototype.update;
    Sprite_StateIcon.prototype.update = function() {
        if (!this.hasRingState()) {
            _Sprite_StateIcon_update.apply(this, arguments);
            return;
        }
        Sprite.prototype.update.call(this);
        this._animationCount++;
        if (this._animationCount >= this.getCycleDuration()) {
            this._animationCount = 0;
        }
        this.updateRingIcon();
    };

    Sprite_StateIcon.prototype.updateRingIcon = function() {
        let icons = [];
        if (this._battler && this._battler.isAlive()) {
            const allIcons = this._battler.allIcons().filter(function(index) {
                return !param.IconIndexWithoutRing.contains(index);
            });
            
            if (param.HideStackedDuplicates && param.ShowStackCount) {
                // Remove duplicates, keeping unique icons only
                icons = [...new Set(allIcons)];
            } else {
                icons = allIcons;
            }
        }
        if (!this._icons.equals(icons)) {
            this._icons = icons;
            this.setupRingIcon();
        }
        this.x = (this._baseX || 0) + this._battler.findRingStateX();
        this.y = (this._baseY || 0) + this._battler.findRingStateY();
        if (param.IconHideSwitch) {
            this.visible = !$gameSwitches.value(param.IconHideSwitch);
        }
        this.updateRingIconChild();
    };

    Sprite_StateIcon.prototype.updateRingIconChild = function() {
        if (this.isRingView()) {
            this.updateRingPosition();
        } else {
            this.updateNormalPosition();
        }
        if (this._battler) {
            this.updateTurns();
            this.updateStacks();
        }
        this._sortChildren();
    };

    Sprite_StateIcon.prototype.isRingView = function() {
        if (!this._battler) {
            return false;
        }
        const limit = this._battler.isActor() ? param.LineViewLimitActor : param.LineViewLimit;
        if (limit === 0) {
            return false;
        } else {
            return this._iconsSprites.length > limit;
        }
    };

    Sprite_StateIcon.prototype.updateRingPosition = function() {
        this._iconsSprites.forEach(function(sprite, index) {
            sprite.setRingPosition(this.getIconRadian(index));
        }, this);
    };

    Sprite_StateIcon.prototype.updateNormalPosition = function() {
        this._iconsSprites.forEach(function(sprite, index) {
            sprite.setNormalPosition(index, this._iconsSprites.length);
        }, this);
    };

    Sprite_StateIcon.prototype.updateTurns = function() {
        const turns = this._battler.getAllTurns();
        this._icons.forEach(function(icon, index) {
            this._iconsSprites[index].setIconTurn(turns[index]);
        }, this);
    };

    Sprite_StateIcon.prototype.updateStacks = function() {
        if (!param.ShowStackCount) return;
        
        const stacks = this._battler.getAllStacks();
        this._icons.forEach(function(icon, index) {
            let stackCount = stacks[index];
            
            // If hiding duplicates, get the actual stack count for this specific state
            if (param.HideStackedDuplicates && this._battler.states) {
                const stateId = this.getStateIdFromIcon(icon);
                if (stateId && typeof this._battler.stateStack === 'function') {
                    stackCount = this._battler.stateStack(stateId) || 1;
                }
            }
            
            this._iconsSprites[index].setIconStack(stackCount);
        }, this);
    };
    
    Sprite_StateIcon.prototype.getStateIdFromIcon = function(iconIndex) {
        const states = this._battler.states();
        for (let i = 0; i < states.length; i++) {
            if (states[i].iconIndex === iconIndex) {
                return states[i].id;
            }
        }
        return null;
    };

    Sprite_StateIcon.prototype.getIconRadian = function(index) {
        let radian = (this._animationCount / this.getCycleDuration() + index / this._iconsSprites.length) * Math.PI * 2;
        if (param.Reverse) radian *= -1;
        return radian;
    };

    Sprite_StateIcon.prototype.getCycleDuration = function() {
        return param.CycleDuration || Infinity;
    };

    Sprite_StateIcon.prototype.setupRingIcon = function() {
        this._icons.forEach(function(icon, index) {
            if (!this._iconsSprites[index]) this.makeNewIcon(index);
            this._iconsSprites[index].setIconIndex(icon);
        }, this);
        const spriteLength = this._iconsSprites.length;
        for (let i = this._icons.length; i < spriteLength; i++) {
            this.popIcon();
        }
    };

    Sprite_StateIcon.prototype.makeNewIcon = function(index) {
        const iconSprite            = new Sprite_StateIconChild();
        this._iconsSprites[index] = iconSprite;
        this.addChild(iconSprite);
    };

    Sprite_StateIcon.prototype.popIcon = function() {
        const removedSprite = this._iconsSprites.pop();
        this.removeChild(removedSprite);
    };

    Sprite_StateIcon.prototype._sortChildren = function() {
        this.children.sort(this._compareChildOrder.bind(this));
    };

    Sprite_StateIcon.prototype._compareChildOrder = function(a, b) {
        if (a.z !== b.z) {
            return a.z - b.z;
        } else if (a.y !== b.y) {
            return a.y - b.y;
        } else {
            return a.spriteId - b.spriteId;
        }
    };

    Sprite_StateIcon.prototype.setActorRing = function() {
        this._actorRing = true;
    };

    Sprite_StateIcon.prototype.hasRingState = function() {
        if (!this._battler) {
            return false;
        } else if (this._battler.isEnemy()) {
            return true;
        } else if (param.ActorRingIcon) {
            return this._actorRing || !$gameSystem.isSideView();
        } else {
            return false;
        }
    };

    Sprite_StateIcon.prototype.saveOriginalPosition = function() {
        this._baseX = this.x;
        this._baseY = this.y;
    };

    //=============================================================================
    // Sprite_StateIconChild
    //=============================================================================
    Sprite_StateIconChild.prototype             = Object.create(Sprite_StateIcon.prototype);
    Sprite_StateIconChild.prototype.constructor = Sprite_StateIconChild;

    Sprite_StateIconChild.prototype.initialize = function() {
        Sprite_StateIcon.prototype.initialize.call(this);
        this.visible     = false;
        this._turnSprite = null;
        this._stackSprite = null;
        this._turn       = 0;
        this._stack      = 0;
        this._frameCount = 0;
        this.scale.x = this.getScaleX();
        this.scale.y = this.getScaleY();
    };

    Sprite_StateIconChild.prototype.getScaleX = function() {
        return (param.ScaleX || 100) / 100;
    };

    Sprite_StateIconChild.prototype.getScaleY = function() {
        return (param.ScaleY || 100) / 100;
    };

    Sprite_StateIconChild.prototype.update = function() {
        if (this._turn <= param.BlinkTurn && !param.IconIndexWithoutBlink.includes(this._iconIndex)) {
            this._frameCount++;
            this.opacity = (Math.sin(this._frameCount / (48 / param.BlinkSpeed)) + 1) * 256;
        } else {
            this._frameCount = 0;
            this.opacity = 255;
        }
    };

    Sprite_StateIconChild.prototype.setIconIndex = function(index) {
        this._iconIndex = index;
        this.updateFrame();
    };

    Sprite_StateIconChild.prototype.setIconTurn = function(turn) {
        this.makeTurnSpriteIfNeed();
        if (this._turn === turn) return;
        this._turn = turn;
        this.refreshIconTurn();
    };

    Sprite_StateIconChild.prototype.setIconStack = function(stack) {
        if (!param.ShowStackCount) return;
        this.makeStackSpriteIfNeed();
        if (this._stack === stack) return;
        this._stack = stack;
        this.refreshIconStack();
    };

    Sprite_StateIconChild.prototype.refreshIconTurn = function() {
        const bitmap = this._turnSprite.bitmap;
        bitmap.clear();
        if (param.IconIndexWithoutShowTurns.includes(this._iconIndex)) {
            return;
        }
        
        // Only show turn count if not replacing with stack count
        if (param.StackCountPosition !== 0 || !param.ShowStackCount) {
            if (this._turn > 0 && param.ShowTurnCount) {
                bitmap.drawText(this._turn, 0, 0, bitmap.width, bitmap.height, 'center');
            }
        }
    };

    Sprite_StateIconChild.prototype.refreshIconStack = function() {
        if (!this._stackSprite) return;
        
        const bitmap = this._stackSprite.bitmap;
        bitmap.clear();
        
        if (param.IconIndexWithoutShowStacks.includes(this._iconIndex)) {
            return;
        }
        
        // Check if we should show the stack count
        const shouldShowCount = this._stack > 1 || 
                               (param.HideStackedDuplicates && this._stack >= 1 && !param.HideSingleStackCount);
        
        // If HideSingleStackCount is true, don't show count when stack is 1
        const hideWhenSingle = param.HideSingleStackCount && this._stack === 1;
        
        if (shouldShowCount && !hideWhenSingle) {
            // Set stack count color
            bitmap.textColor = param.StackCountColor || '#ff6666';
            
            if (param.StackCountPosition === 0) {
                // Replace turn count with stack count
                bitmap.drawText(this._stack, 0, 0, bitmap.width, bitmap.height, 'center');
            } else {
                // Show alongside turn count
                bitmap.drawText(this._stack, 0, 0, bitmap.width, bitmap.height, 'center');
            }
        }
    };

    Sprite_StateIconChild.prototype.makeTurnSpriteIfNeed = function() {
        if (this._turnSprite) return;
        const sprite           = new Sprite();
        sprite.bitmap          = new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight);
        if (param.UseNumberFont) {
            sprite.bitmap.fontFace = $gameSystem.numberFontFace();
        }
        sprite.bitmap.smooth   = true;
        sprite.bitmap.fontSize = param.FontSize;
        sprite.x               = param.TurnCountX;
        sprite.y               = param.TurnCountY;
        this._turnSprite       = sprite;
        this.addChild(this._turnSprite);
    };

    Sprite_StateIconChild.prototype.makeStackSpriteIfNeed = function() {
        if (this._stackSprite || !param.ShowStackCount) return;
        
        const sprite           = new Sprite();
        sprite.bitmap          = new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight);
        if (param.UseNumberFont) {
            sprite.bitmap.fontFace = $gameSystem.numberFontFace();
        }
        sprite.bitmap.smooth   = true;
        sprite.bitmap.fontSize = param.StackFontSize || param.FontSize;
        
        // Position based on StackCountPosition parameter
        switch (param.StackCountPosition) {
            case 0: // Replace turn count
                sprite.x = param.TurnCountX + param.StackCountX;
                sprite.y = param.TurnCountY + param.StackCountY;
                break;
            case 1: // Above turn count
                sprite.x = param.TurnCountX + param.StackCountX;
                sprite.y = param.TurnCountY + param.StackCountY - (param.StackFontSize || param.FontSize) - 2;
                break;
            case 2: // Below turn count
                sprite.x = param.TurnCountX + param.StackCountX;
                sprite.y = param.TurnCountY + param.StackCountY + (param.FontSize || 24) + 2;
                break;
        }
        
        this._stackSprite = sprite;
        this.addChild(this._stackSprite);
    };

    Sprite_StateIconChild.prototype.setRingPosition = function(radian) {
        this.x       = Math.cos(radian) * param.RadiusX;
        this.y       = Math.sin(radian) * param.RadiusY;
        this.visible = true;
    };

    Sprite_StateIconChild.prototype.setNormalPosition = function(index, max) {
        this.x       = ((-max + 1) / 2 + index) * this.getIconWidth();
        this.y       = 0;
        this.visible = true;
    };

    Sprite_StateIconChild.prototype.getIconWidth = function() {
        return ImageManager.iconWidth * this.getScaleX();
    };
})();