//#region META


/*:
 * @target MZ
 * @plugindesc [Tier_4] v0.1.1 ShelderEvo HOC
 * @author Matheraptor
 * 
 * @help
 * 
 * 
 * -----------------------------------------------------------------------
 * CHANGELOG
 * -----------------------------------------------------------------------
 * v0.1.1 - plugin structure redesign
 * 
 * v0.1.0 - initial build
 */

//#endregion







//#region INIT

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.5.1";
MAGPIE.HOC = {};
MAGPIE.HOC.version = "0.1.1";
MAGPIE.HOC.meta = {
    desc: "HIMS-compatible Omniarch Cybernetics Implanted Microchip",
    tags: ["HIMS-compatible", "Omniarch", "Cybernetics", "Implant", "Microchip"],
    aliases: ["Heart of Chocolate", "Chocolate Chip", "Chip"],
    type: "Operating system",
    function: "Digital Mind",
    subject: "'HOC' cybernetic implant"
};



//#endregion









//-----------------------------------------------------------------------------------------------
//#region Controller

function HOC_Controller()
{
    this.initialize(...arguments)
}

HOC_Controller.prototype.initialize = function()
{
    this.isLoaded = true;
    this._guests = [];
    this.isActive = true;
    this.update = setInterval(() => this.refresh(), 60)
}

HOC_Controller.prototype.refresh = function()
{
    if(!this.isActive) return false
    this._guests?.forEach(g => g.refresh());
}

HOC_Controller.prototype.adopt = function(guest)
{
    this._guests.push(guest)
}

HOC_Controller.prototype.release = function(guest)
{
    let index = this._guests.findIndex(guest);
    this._guests.splice(index, 1);
}

//#endregion







//-----------------------------------------------------------------------------------------------
//#region OS







//#region HOC Core

function HOC_Mind(name = "")
{
    this.initialize(name);
}

HOC_Mind.prototype.initialize = function(name)
{
    this.core = {version: MAGPIE.HOC.version, meta: MAGPIE.HOC.meta};
    this.mod = {
        desc: "Modular Expansion",
        type: "container",
        subject: "HOC_module"
    };
    this.part = {
        desc: "Hardware Structure",
        type: "component",
        subject: "Microchip"
    };
    this.data = {
        desc: "Default Data",
        type: "database",
        subject: "Preload"
    };
    this.identity = {
        desc: "HOC Identity",
        type: "HOC_Mind",
        subject: "Identity",
        name: name
    };
    this._memory = []
    this._memory[0] = new HOC_Memory_Hash();
    this.initMood();
}

HOC_Mind.prototype.refresh = function()
{
    console.log(this.identity.name + " refreshed.");
    //update mood
}

//#region Mood

function HOC_MoodBase()
{
    this._current = undefined;
    this._emotions = [];
}

HOC_Mind.prototype.initMood = function()
{
    this._mood = new HOC_MoodBase();
}

const MOOD = {};
MOOD.BORED = 0;
MOOD.CONFIDENT = 1;
MOOD.MELLOW = 2;
MOOD.AGGRESSIVE = 3;
MOOD.SCARED = 4;
MOOD.SAD = 5;

//#endregion


//#region Emotion

function Emotion(name = "")
{
    this.initialize(name)
}

Emotion.prototype.initialize = function(name)
{
    this.name = name;
}

//#region Unitary

//#region Guilt
function Emotion_Guilt(name = "Guilt")
{
    this.initialize(name)
}
Emotion_Guilt.prototype = Object.create(Emotion.prototype);
Emotion_Guilt.prototype.constructor = Emotion_Guilt;
Emotion_Guilt.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Embarassment
function Emotion_Embarassment(name = "Embarassment")
{
    this.initialize(name)
}
Emotion_Embarassment.prototype = Object.create(Emotion.prototype);
Emotion_Embarassment.prototype.constructor = Emotion_Embarassment;
Emotion_Embarassment.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Relief
function Emotion_Relief(name = "Relief")
{
    this.initialize(name)
}
Emotion_Relief.prototype = Object.create(Emotion.prototype);
Emotion_Relief.prototype.constructor = Emotion_Relief;
Emotion_Relief.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Triumph
function Emotion_Triumph(name = "Triumph")
{
    this.initialize(name)
}
Emotion_Triumph.prototype = Object.create(Emotion.prototype);
Emotion_Triumph.prototype.constructor = Emotion_Triumph;
Emotion_Triumph.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Solidarity
function Emotion_Solidarity(name = "Solidarity")
{
    this.initialize(name)
}
Emotion_Solidarity.prototype = Object.create(Emotion.prototype);
Emotion_Solidarity.prototype.constructor = Emotion_Solidarity;
Emotion_Solidarity.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Impotence
function Emotion_Impotence(name = "Impotence")
{
    this.initialize(name)
}
Emotion_Impotence.prototype = Object.create(Emotion.prototype);
Emotion_Impotence.prototype.constructor = Emotion_Impotence;
Emotion_Impotence.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Hilarity
function Emotion_Hilarity(name = "Hilarity")
{
    this.initialize(name)
}
Emotion_Hilarity.prototype = Object.create(Emotion.prototype);
Emotion_Hilarity.prototype.constructor = Emotion_Hilarity;
Emotion_Hilarity.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Pride
function Emotion_Pride(name = "Pride")
{
    this.initialize(name)
}
Emotion_Pride.prototype = Object.create(Emotion.prototype);
Emotion_Pride.prototype.constructor = Emotion_Pride;
Emotion_Pride.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Tenderness
function Emotion_Tenderness(name = "Tenderness")
{
    this.initialize(name)
}
Emotion_Tenderness.prototype = Object.create(Emotion.prototype);
Emotion_Tenderness.prototype.constructor = Emotion_Tenderness;
Emotion_Tenderness.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Disgust
function Emotion_Disgust(name = "Disgust")
{
    this.initialize(name)
}
Emotion_Disgust.prototype = Object.create(Emotion.prototype);
Emotion_Disgust.prototype.constructor = Emotion_Disgust;
Emotion_Disgust.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Surprise
function Emotion_Surprise(name = "Surprise")
{
    this.initialize(name)
}
Emotion_Surprise.prototype = Object.create(Emotion.prototype);
Emotion_Surprise.prototype.constructor = Emotion_Surprise;
Emotion_Surprise.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Anger
function Emotion_Anger(name = "Anger")
{
    this.initialize(name)
}
Emotion_Anger.prototype = Object.create(Emotion.prototype);
Emotion_Anger.prototype.constructor = Emotion_Anger;
Emotion_Anger.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Boredom
function Emotion_Boredom(name = "Boredom")
{
    this.initialize(name)
}
Emotion_Boredom.prototype = Object.create(Emotion.prototype);
Emotion_Boredom.prototype.constructor = Emotion_Boredom;
Emotion_Boredom.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Fear
function Emotion_Fear(name = "Fear")
{
    this.initialize(name)
}
Emotion_Fear.prototype = Object.create(Emotion.prototype);
Emotion_Fear.prototype.constructor = Emotion_Fear;
Emotion_Fear.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Shame
function Emotion_Shame(name = "Shame")
{
    this.initialize(name)
}
Emotion_Shame.prototype = Object.create(Emotion.prototype);
Emotion_Shame.prototype.constructor = Emotion_Shame;
Emotion_Shame.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Interest
function Emotion_Interest(name = "Interest")
{
    this.initialize(name)
}
Emotion_Interest.prototype = Object.create(Emotion.prototype);
Emotion_Interest.prototype.constructor = Emotion_Interest;
Emotion_Interest.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Sorrow
function Emotion_Sorrow(name = "Sorrow")
{
    this.initialize(name)
}
Emotion_Sorrow.prototype = Object.create(Emotion.prototype);
Emotion_Sorrow.prototype.constructor = Emotion_Sorrow;
Emotion_Sorrow.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion

//#region Joy
function Emotion_Joy(name = "Joy")
{
    this.initialize(name)
}
Emotion_Joy.prototype = Object.create(Emotion.prototype);
Emotion_Joy.prototype.constructor = Emotion_Joy;
Emotion_Joy.prototype.initialize = function(name)
{
    Emotion.prototype.initialize.call(this, name);
}
//#endregion
//#endregion





//#region definitions
const EMOTION = {};
EMOTION.GUILT = new Emotion_Guilt();
EMOTION.EMBARASSMENT = new Emotion_Embarassment();
EMOTION.RELIEF = new Emotion_Relief();
EMOTION.TRIUMPH = new Emotion_Triumph();
EMOTION.SOLIDARITY = new Emotion_Solidarity();
EMOTION.IMPOTENCE = new Emotion_Impotence();
EMOTION.HILARITY = new Emotion_Hilarity();
EMOTION.PRIDE = new Emotion_Pride();
EMOTION.TENDERNESS = new Emotion_Tenderness();
EMOTION.DISGUST = new Emotion_Disgust();
EMOTION.SURPRISE = new Emotion_Surprise();
EMOTION.ANGER = new Emotion_Anger();
EMOTION.BOREDOM = new Emotion_Boredom();
EMOTION.FEAR = new Emotion_Fear();
EMOTION.SHAME = new Emotion_Shame();
EMOTION.INTEREST = new Emotion_Interest();
EMOTION.SORROW = new Emotion_Sorrow();
EMOTION.JOY = new Emotion_Joy();
//#endregion
//#endregion






//#region Memory

HOC_Mind.prototype.memory = function(emote)
{
    return this._memory.filter(m => m._emote.includes(emote))
}

function HOC_Memory(GRAVITY = undefined, EMOTES = [], SWITCHES = [], VARIABLES = [])
{
    this.initialize(GRAVITY, EMOTES, SWITCHES, VARIABLES)
}

HOC_Memory.prototype.initialize = function(GRAVITY, EMOTES, SWITCHES, VARIABLES)
{
    this.meta = {gravity: GRAVITY, switches: SWITCHES, variables: VARIABLES}
    this._emote = EMOTES;
    this.related = undefined;
}

function HOC_Memory_Hash(GRAVITY = undefined, EMOTES = [], SWITCHES = [], VARIABLES = [])
{
    this.initialize(GRAVITY, EMOTES, SWITCHES, VARIABLES)
}

HOC_Memory_Hash.prototype = Object.create(HOC_Memory.prototype);
HOC_Memory_Hash.prototype.constructor = HOC_Memory_Hash;
HOC_Memory_Hash.prototype.initialize = function(GRAVITY, EMOTES, SWITCHES, VARIABLES)
{
    HOC_Memory.prototype.initialize.call(this, GRAVITY, EMOTES, SWITCHES, VARIABLES);
    this._memories = [];
}
//#endregion

//#endregion





//#region Type I

function HOC_Type_I(name)
{
    this.initialize(name)
}

HOC_Type_I.prototype = Object.create(HOC_Mind.prototype);
HOC_Type_I.prototype.constructor = HOC_Type_I;
HOC_Type_I.prototype.initialize = function(name)
{
    HOC_Mind.prototype.initialize.call(this, name);
    this.part._chip = {desc: "Physical Microchip Implant type I", isPhysical: true, isImplant: true, type: 1};
    this.part._isCrentralized = true;
}
//#endregion







//#region Type II

function HOC_Type_II(name)
{
    this.initialize(name)
}

HOC_Type_II.prototype = Object.create(HOC_Mind.prototype);
HOC_Type_II.prototype.constructor = HOC_Type_II;
HOC_Type_II.prototype.initialize = function(name)
{
    HOC_Mind.prototype.initialize.call(this, name);
}

//#endregion







//#region Type III

function HOC_Type_III(name)
{
    this.initialize(name)
}

HOC_Type_III.prototype = Object.create(HOC_Mind.prototype);
HOC_Type_III.prototype.constructor = HOC_Type_III;
HOC_Type_III.prototype.initialize = function(name)
{
    HOC_Mind.prototype.initialize.call(this, name);
}

//#endregion





//#endregion











//-----------------------------------------------------------------------------------------------
//#region Default Data



//#endregion









//-----------------------------------------------------------------------------------------------
//#region Imported Mind



//#endregion










//-----------------------------------------------------------------------------------------------
//#region Default Minds

const Chippy = new HOC_Type_I("Chippy");

//#endregion