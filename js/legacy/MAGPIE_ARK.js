//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_4] v0.1.0 MAGPIE_ARK
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-ark
 * 
 * @help
 * (MAGPIE) ARK HUMAN COLONIZATION SYSTEM (Tier 5)
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.1.0 2025 08 27
 * - initial build
 */
//#endregion





//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.9.0";
MAGPIE.ARK = {};
MAGPIE.ARK.version = "0.1.0";
MAGPIE.ARK.tier = 4;
MAGPIE.ARK.meta = {
    firmware: "20250827",
    name: "M.A.G.P.I.E. ARK Human Colonization System",
    isARK: true
};
MAGPIE.ARK.isInstalled = true;


//#endregion






//------------------------------------------------------------------------
//#region ARK

MAGPIE.ARK.NURSERY = {};
MAGPIE.ARK.NURSERY.CONTENTS = "$MAGPIE.ARK.NURSERY.start()";


function MAGPIE_Ark()
{
	this.initialize(...arguments)
}
MAGPIE_Ark.prototype = Object.create(MAGPIE_Firmware.prototype);
MAGPIE_Ark.prototype.constructor = MAGPIE_Ark;
MAGPIE_Ark.prototype.initialize = function()
{
	MAGPIE_Firmware.prototype.initialize.call(this);
	this.isInit = true;
	this.ID = this.generateID();
	this._name = "MAGPIE_ARK";
}

MAGPIE_Ark.prototype.start = function()
{
	$MAGPIE.DATA.state.ARK = {};
	$MAGPIE.DATA.state.ARK.isActive = true;
	let data = {
		name: "Gardia ARK",
		type: "MAGPIE Space Ark mk.I",
		parent: "MAGPIE SS Venture",
		receivers: "GEN-A1",
		meta: {
			embryos: 5000,
			embryo_data: {
				species: "Homo sapiens nexus",
				speciesID: 300,
                traits: [],
                gestation: 275 + Math.round(Math.random() * 30)
			}
		}
	}
	const GARDIA = $MAGPIE.ENTITY.add(new MAGPIE_Structure(data));
	data.name = "Hastral ARK";
	data.receivers = "GEN-B1";
	const HASTRAL = $MAGPIE.ENTITY.add(new MAGPIE_Structure(data));
	data.name = "Alow ARK";
	data.receivers = "GEN-C1";
	const ALOW = $MAGPIE.ENTITY.add(new MAGPIE_Structure(data));
	$MAGPIE.DATA.Log(`${this.name()} started.`);
	GARDIA._status = MAGPIE.CODE.ENTITY.STATUS.STAND_BY;
	HASTRAL._status = MAGPIE.CODE.ENTITY.STATUS.STAND_BY;
	ALOW._status = MAGPIE.CODE.ENTITY.STATUS.STAND_BY;
	$MAGPIE.DATA.state.ARK._ark = [GARDIA.ID, HASTRAL.ID, ALOW.ID];
	this.systemsCheck();
}

MAGPIE_Ark.prototype.systemsCheck = function()
{
	if(!this?.DATA)
		this.DATA = this.proxyUp($MAGPIE.DATA.state.ARK);
	if(!this.DATA?.isActive) return false
		return true
}

MAGPIE_Ark.prototype.Ark = function(index)
{
	return $MAGPIE.ENTITY.getElementByID(this.DATA._ark[index])
}

MAGPIE_Ark.prototype.requestThaw = function(arkIndex, amount)
{
	let spaceArk = this.Ark(arkIndex);
	let status = spaceArk.status() === MAGPIE.CODE.ENTITY.STATUS.STAND_BY
	let ark = spaceArk._meta;
	if(amount > ark.embryos) amount -= ark.embryos;
	let avail = amount > 0;
	let thaw = new Promise((resolve, reject) => {
		setTimeout(() => {
			if(status && avail)
				resolve(this.thaw(arkIndex, amount));
			else reject();
		}, 1000 * 10)
	})
	return thaw
}

MAGPIE_Ark.prototype.thaw = function(arkIndex, amount)
{
	let spaceArk = this.Ark(arkIndex);
	let ark = spaceArk._meta;
	ark.embryos -= amount;
	$MAGPIE.DATA.Log(`${spaceArk._name} thawed ${amount}x` + 
		` ${ark.embryo_data.species} embryos.`);
	if(ark.embryos < 5000 * .25) 
	{
		$MAGPIE.DATA.Log(`${ark.embryos} remaining in ${spaceArk._name}!`);
		spaceArk._status = MAGPIE.CODE.ENTITY.STATUS.DRAINING;
	}
	if(ark.embryos < 5000 * .05)
	{
		this.requestNewGen(arkIndex);
		if(ark.embryos > 0) $MAGPIE.DATA.Log(`${spaceArk._name} is low on embryos!`);
		if(ark.embryos < 1) $MAGPIE.DATA.Log(`${spaceArk._name} has ran out of embryos!`);
	}
	this.incubate(arkIndex, amount);
}

MAGPIE_Ark.prototype.incubate = function(arkIndex, amount)
{
	if(amount < 1) return
    let spaceArk = this.Ark(arkIndex);
	let ark = spaceArk._meta;
    let embryos = [];
    for(let i = 0; i < amount; i++)
    {
        embryos.push($PDL.creature.add(new Game_Creature({
            speciesID: ark.speciesID,
            firstName: this.generatePIDN(),
            breedID: spaceArk._receivers[0],
            traits: ark.traits
        }))).ID;
    }
    let data = {
        name: `${spaceArk._name} incubator`,
        contents: {
            embryo_data: ark.embryo_data,
            amount: amount,
            nursery: MAGPIE.ARK.NURSERY.CONTENTS
        },
        triggerType: MAGPIE.CBE.EVENT.MAGTIME,
        triggerID: MAGPIE.CBE.EVENT.NEWDAY,
        trigger: $TIME.gameday + ark.gestation
    }
    let incubator = $CBE.EVENT.add(data);
    $CBE.DATA.Log(`${spaceArk._name} incubator ${incubator} deployed...`);
    return 
}

MAGPIE_Ark.prototype.generatePIDN = function(arkIndex)
{
    let spaceArk = this.Ark(arkIndex);
    let ID = "";
    ID += spaceArk._receivers[0].slice(4);
    ID += `-${Math.ceil(Math.random() * 1000000000).toString().padStart(10)}`;
    return ID
}


//#endregion





//------------------------------------------------------------------------
//#region RUNTIME

var $MAGPIE = $MAGPIE || null;

MAGPIE.ARK._runtime = {};
MAGPIE.ARK._runtime._Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function()
{
    MAGPIE.ARK._runtime._Game_System_initialize.call(this);
    $MAGPIE.ARK = new MAGPIE_Ark();
}

//#endregion




//end of plugin