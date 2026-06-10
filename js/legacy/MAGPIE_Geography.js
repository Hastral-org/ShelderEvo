//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_3] v0.4.0 MAGPIE_Geography
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-pdl-geography
 * 
 * @help
 * (MAGPIE PDL) GEOGRAPHY SYSTEM (Tier 5)
 * Extend the MAGPIE_PDL functionality with templates and functions to manage 
 * large-scale geographic data  
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.4.0 2025 11 14
 * - added: basic Orbital mechanics logic with propagation
 * 
 * v0.3.1 2025 08 24
 * - MAGPIE.SYS v0.9.0 conformity update
 * 
 * v0.3.0 2025 08 23
 * - NEW: function to export star system to .json
 * - various bugfixes to streamline celestial creation 
 * 
 * v0.2.0 2025 08 22
 * - NEW: Game_Location is a half-step between Game_Territory and Game_Habitat
 * 
 * - Territory deck is now in actuality the Location deck, while the territory
 *   works as a spatial container for the locations
 * 
 * - Creatures with enough navigation ability can navigate locations spatially
 * 
 * - Creatures can move through habitats in the location deck just like they
 *   used to with territory deck, and, with enough navigation ability, they
 *   can get shortcuts to specific habitats
 * 
 * v0.1.0 2025 08 19
 * - initial build
 */
//#endregion





//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.11.2";
MAGPIE.PDL = MAGPIE.PDL || {};
if(!MAGPIE.PDL?.isInstalled) 
    console.warn("MAGPIE_Geography ERROR: MAGPIE_PDL is not installed!");
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.Geography = {};
MAGPIE.addons.Geography.version = "0.4.0";
MAGPIE.addons.Geography.tier = 3;
MAGPIE.addons.Geography.pluginName = "MAGPIE_Geography";
MAGPIE.addons.Geography.meta = {
	name: "M.A.G.P.I.E. Geography system",
	isAddon: true,
	firmware: "20251114",
	firmwareFile: `${MAGPIE.addons.Geography.pluginName}.js`
}
MAGPIE.addons.Geography.parameters = PluginManager
    .parameters(MAGPIE.addons.Geography.pluginName);


MAGPIE.PDL.GEOGRAPHY = {};
MAGPIE.PDL.GEOGRAPHY.STAR = "star";
MAGPIE.PDL.GEOGRAPHY.PLANET = "planet";
MAGPIE.PDL.GEOGRAPHY.ASTEROID = "asteroid";
MAGPIE.PDL.GEOGRAPHY.MOON = "moon";
MAGPIE.PDL.GEOGRAPHY.AU = 149597870700;
/**
 * @desc SI (when using m instead of km)
 */
MAGPIE.PDL.GEOGRAPHY.G = 6.67430e-11; 
MAGPIE.PDL.GEOGRAPHY.MASS = {};
MAGPIE.PDL.GEOGRAPHY.MASS.SOL = 1.989e+30;
MAGPIE.PDL.GEOGRAPHY.MASS.EARTH = 5.972e+24;
MAGPIE.PDL.GEOGRAPHY.RADIUS = {};
MAGPIE.PDL.GEOGRAPHY.RADIUS.EARTH = 6371;
MAGPIE.PDL.GEOGRAPHY.RADIUS.SUN = 657629;
MAGPIE.PDL.GEOGRAPHY.GRAVITY = {};
MAGPIE.PDL.GEOGRAPHY.GRAVITY.EARTH = 9.81;
MAGPIE.PDL.GEOGRAPHY.VELOCITY = {};
MAGPIE.PDL.GEOGRAPHY.VELOCITY.EARTH = 11.186;
MAGPIE.PDL.GEOGRAPHY.K = new Game_Vector({x: 0, y: 0, z: 1});

MAGPIE.PDL.GEOGRAPHY.BIOME = {};
MAGPIE.PDL.GEOGRAPHY.BIOME.ENEMY = {};
MAGPIE.PDL.GEOGRAPHY.BIOME.ENEMY.STEPPE = 1;
MAGPIE.PDL.GEOGRAPHY.BIOME.ENEMY.WOODS = 1;
MAGPIE.PDL.GEOGRAPHY.BIOME.ENEMY.FOREST = 1;
MAGPIE.PDL.GEOGRAPHY.BIOME.ENEMY.SWAMP = 1;
MAGPIE.PDL.GEOGRAPHY.BIOME.ENEMY.LSO = 1;

MAGPIE.PDL.GEOGRAPHY.CLIMATE = {};
MAGPIE.PDL.GEOGRAPHY.CLIMATE.VOID = -10;
MAGPIE.PDL.GEOGRAPHY.CLIMATE.GLACIAL = -3;
MAGPIE.PDL.GEOGRAPHY.CLIMATE.FRIGID = -2;
MAGPIE.PDL.GEOGRAPHY.CLIMATE.COLD = -1;
MAGPIE.PDL.GEOGRAPHY.CLIMATE.MILD = 0;
MAGPIE.PDL.GEOGRAPHY.CLIMATE.WARM = 1;
MAGPIE.PDL.GEOGRAPHY.CLIMATE.HOT = 2;
MAGPIE.PDL.GEOGRAPHY.CLIMATE.TORRID = 3;

MAGPIE.PDL.GEOGRAPHY.HUMIDITY = {};
MAGPIE.PDL.GEOGRAPHY.HUMIDITY.VOID = 0;
MAGPIE.PDL.GEOGRAPHY.HUMIDITY.DRY = 1;
MAGPIE.PDL.GEOGRAPHY.HUMIDITY.ARID = 2;
MAGPIE.PDL.GEOGRAPHY.HUMIDITY.HUMID = 3;
MAGPIE.PDL.GEOGRAPHY.HUMIDITY.DAMP = 4;
MAGPIE.PDL.GEOGRAPHY.HUMIDITY.WET = 5;
MAGPIE.PDL.GEOGRAPHY.HUMIDITY.SOAK = 6;

MAGPIE.PDL.GEOGRAPHY.HABITAT = {};
MAGPIE.PDL.GEOGRAPHY.HABITAT.SHRUB = "shrub";
MAGPIE.PDL.GEOGRAPHY.HABITAT.MEADOW = "meadow";
MAGPIE.PDL.GEOGRAPHY.HABITAT.TREE = "tree";
MAGPIE.PDL.GEOGRAPHY.HABITAT.REEDS = "reeds";
MAGPIE.PDL.GEOGRAPHY.HABITAT.UNDEGROWTH = "undergrowth";
MAGPIE.PDL.GEOGRAPHY.HABITAT.POND = "pond";
//#endregion






//------------------------------------------------------------------------
//#region SETTINGS

MAGPIE.PDL.GEOGRAPHY.SETTINGS = {};

MAGPIE.PDL.GEOGRAPHY.SETTINGS.ORBIT_PERTURBATION = MAGPIE.addons.Geography.parameters?.orbit_perturbation || 1;

//#endregion





//------------------------------------------------------------------------
//#region GEOGRAPHY





//#region habitat
function Game_Habitat(data = {type: 0})
{
	this.initialize(data);
}

Game_Habitat.prototype.initialize = function(data)
{
	this.meta = "Game_Habitat";
	this._type = data.type;
	this.ID = data?.ID;
	this._territoryID = data?.territoryID;
	this._location = data?.location;
}

Game_Habitat.prototype.type = function()
{
	return this.skillCard().name
}

Game_Habitat.prototype.id = function()
{
	return this.skillCard().id
}

Game_Habitat.prototype.stateId = function()
{
	return this.skillCard().stateId
}

Game_Habitat.prototype.skillCard = function()
{
	return $dataSkills[this._type]
}

Game_Habitat.prototype.territory = function()
{
	return $PDL.territory[this._territoryID]
}

Game_Habitat.prototype.location = function()
{
	return this.territory().location(this._location)
}
//#endregion





//#region location
function Game_Location(data = {x: 0, y: 0, habitats: [], territoryID: -1})
{
    this.initialize(data);
}

Game_Location.prototype.initialize = function(data)
{
    this._x = data?.x;
    this._y = data?.y;
	this._type = data?.type;
    this._habitats = data?.habitats;
    this._territoryID = data?.territoryID;
}

Game_Location.prototype.open = function()
{
	this.setupHabitats();
}

Game_Location.prototype.close = function()
{
	this._habitats = [];
}

Game_Location.prototype.territory = function()
{
	if(this._territoryID < 0) return false
	return $PDL.territory.getElementByID(this._territoryID)
}

Game_Location.prototype.setupHabitats = function()
{
    if(this._habitats?.length > 0 || !this._territoryID) return
	for(let i = 0; i < 100; i++)
    {
        const type = this.pickHabitat();
		this.addHabitat(type);
    }
}

Game_Location.prototype.addHabitat = function(type)
{
	const ID = this._habitats.length;
	this._habitats.push(new Game_Habitat({
		type: type,
		ID: ID,
		territoryID: this._territoryID,
		location: [this._x, this._y]
	}))
	return this._habitats[ID]
}

Game_Location.prototype.pickHabitat = function() //@todo pickHabitat
{
	let die = Math.ceil(Math.random() * 100);
	let biome = this.territory().biome();
	let habitats = [
		biome.commonHabitat, 
		biome.uncommonHabitat, 
		biome.rareHabitat, 
		biome.uniqueHabitat
	];
	let landform = this.territory()._landform;
	let seeds = this.territory()._seeds;
	let dCommon = 50;
	let dUncommon = 26;
	let dRare = 13;
	let dUnique = 8;
	let dLandform = 3;
	if(die < 9) return habitats[3];
	if(die < 22) return habitats[2];
	if(die < 49) return habitats[1];
	return habitats[0]
}

Game_Location.prototype.habitat = function(ID)
{
	if(this._habitats.length < 1) return
	return this._habitats.find(h => h?.ID === ID)
}
//#endregion





//#region territory
function Game_Territory(data = {name: ""})
{
	this.initialize(data)
}

Game_Territory.prototype.initialize = function(data)
{
	this.meta = "Game_Territory";
    this._name = data?.name;
	this._region = data?.region;
	this._coords = data?.coords || [0,0];
	this._biome = data?.biome;
	this._locations = data?.locations;
	this._landform = data?.landform;
	this._seeds = data?.seeds;
	this.ID = $PDL.territory.add(this).ID;
}

Game_Territory.prototype.open = function()
{
	this.setupLocations();
}

Game_Territory.prototype.close = function()
{
	let quadrant = [];
	let row = [];
	this._locations.forEach(ROW => {
		row = [];
		ROW.forEach(element => {
			row.push(element._type)
		})
		quadrant.push(row);
	})
	this._locations = quadrant;
}

Game_Territory.prototype.pack = function()
{
	this._locations = [];
}

Game_Territory.prototype.unpack = function()
{
	let quadrant = [];
	let row = [];
	for(let y = 0; y < 100; y++)
	{
		row = [];
		for(let x = 0; x < 100; x++)
		{
			row.push(this.pickLocationType());
		}
		quadrant.push(row);
	}
	this._locations = quadrant;
}

Game_Territory.prototype.pickLocationType = function()
{
	return 
}
Game_Territory.prototype.setupLocations = function()
{
    let quadrant = [];
    let row = [];
    for(let y = 0; y < 100; y++)
    {
        row = [];
        for(let x = 0; x < 100; x++)
        {
            row.push(new Game_Location({
				x: x, 
				y: y,
				type: this._locations[y][x], 
				territoryID: this.ID
			}));
        }
        quadrant.push(row);
    }
    this._locations = quadrant;
}

Game_Territory.prototype.location = function(location = [0,0])
{
	let x = location[0];
	let y = location[1];
	return this._locations[y][x]
}

Game_Territory.prototype.region = function()
{
	return $PDL.region.getElementByID(this._region)
}

Game_Territory.prototype.biome = function()
{
	return MAGPIE.PDL.GEOGRAPHY.BIOME[this._biome.toUpperCase()]
}
//#endregion





//#region biome

function Game_Biome(data = {name: ""})
{
	this.initialize(data);
}

Game_Biome.prototype.initialize = function(data)
{
	this._name = data.name;
	this._climate = data?.climate;
	this._humidity = data?.humidity;
	this._battleback = data?.battleback;
	this.commonHabitat = data?.commonHabitat;
	this.uncommonHabitat = data?.uncommonHabitat;
	this.rareHabitat = data?.rareHabitat;
	this.uniqueHabitat = data?.uniqueHabitat;
	this.enemyID = data?.enemyID;
}

Game_Biome.prototype.setEnemy = function()
{
	$gameTroop.members()[0].transform(this.enemyID);
	$gameTroop.makeUniqueNames();
}
//#endregion





//#region region
function Game_Region(data = {name: "", territories: []})
{
	this.initialize(data);
}

Game_Region.prototype.initialize = function(data)
{
	this.meta = "Game_Region";
	this._name = data?.name;
	this._mapID = data?.mapID;
	this._territories = data?.territories;
	this._parent = data?.parent;
}

Game_Region.prototype.parent = function()
{
	let type = this._parent[0];
	let ID = this._parent[1];
	return $PDL[type]?.getElementByID(ID)
}

Game_Region.prototype.territory = function(territoryID)
{
	return $PDL.territory.getElementByID(territoryID)
}

Game_Region.prototype.coords = function(x, y)
{
	this._territories[y][x]
}

// Game_Region.prototype.setupTerritories = function()
// {
// 	let quadrant = [];
// 	let row = [];
// 	for(let y = 0; y < 100; y++)
// 	{
// 		row = [];
// 		for(let x = 0; x < 100; x++)
// 		{
// 			row.push()
// 		}
// 		quadrant.push(row)
// 	}
// 	this._territories = quadrant;
// }
//#endregion





//#region celestial
/**
 * 
 * @param {obj} data 
 * @param {obj} atmosphere can add a 'Game_Atmosphere' object or leave 'false'
 * @param {Number} mass in kg (can use a x * MAGPIE.PDL.GEOGRAPHY.MASS[SOL,EARTH])
 * @param {Number} CMF % 
 * Input the Core Mass Fraction—the percentage of your planet's 
 * mass contained within its iron core—here.For habitable Earth-like planets, 
 * it is recommended to chose a CMF value close to Earth's CMF (~35%). 
 * This will ensure that your planets is capable of generating a 
 * sufficiently protective magnetic field, thus making your planet 
 * habitable.
 * @param {Number} axialTilt in °
 * @param {obj} orbit use 'Orbit_Data'
 * @param {Array} parent ["type", ID, "name"]
 * @param {Number} rotationPeriod in EarthHours
 * @param {Array} regions
 * @param {String} type star / planet / moon / celestial / asteroid / territory
 */
function Celestial_Data(data = {
	meta: "",
	name: "",
	atmosphere: false,
	mass: 0,
	CMF: 35,
	axialTilt: 0,
	orbit: {SMA: 0, ecc: 0, inc: 0, direction: true, period: 0},
	parent: ["", -1, ""],
	rotationPeriod: 0,
	regions: [],
	type: ""
})
{
	Object.keys(data).forEach(k => this[k] = data[k])
}

function Game_Celestial(data = {name: "", regions: []})
{
	this.initialize(data);
}

Game_Celestial.prototype.initialize = function(data)
{
	this.meta = "Game_Celestial";
	this._name = data.name;
	this._type = data?.type || "celestial";
	this._regions = data?.regions || [];
	let orbit = data?.orbit || 
		{parent: [data?.type, data?.ID, data?.name], AU: data?.AU, ecc: data?.ecc};
	this._orbit = new Game_Orbit(orbit);
	this._parent = data?.parent;
	this._mass = data?.mass;
	this._density = this.calculateDensity();
	this._radius = this.calculateRadius();
	this._gravity = this.calculateGravity();
	this._escapeV = this.calculateEscapeVelocity();
	this._axialTilt = data?.axialTilt;
	this._rotationPeriod = data?.rotationPeriod;
	this._satellites = data?.satellites;
	setTimeout(() => {
		if(!this._orbit._parent[1])
			this._orbit._parent[1] = this?.ID
	}, 1000);
}

Game_Celestial.prototype.convertEarthMass = function()
{
	return Number((this._mass / MAGPIE.PDL.GEOGRAPHY.MASS.EARTH).toFixed(3))
}

Game_Celestial.prototype.convertEarthRadius = function()
{
	return Number((this._radius / MAGPIE.PDL.GEOGRAPHY.RADIUS.EARTH).toFixed(3))
}

Game_Celestial.prototype.convertEarthVelocity = function()
{
	return Number((this._escapeV / MAGPIE.PDL.GEOGRAPHY.VELOCITY.EARTH).toFixed(3))
}

Game_Celestial.prototype.calculateDensity = function()
{
	//result in g/cm³
	const M = MAGPIE.PDL.GEOGRAPHY.MASS.EARTH;
	const Mmin = 0.6 * M;
	const Mx = this._mass / M;
	const Ms = 5.51 * Math.pow(Mx,0.189) / Math.pow(1.07 - 0.21 * (this._CMF / 100), 3);
	const Mm = 3.5 + 4.37 * (this._CMF / 100);
	let result = 0;
	if(Mx > Mmin)
	{
		result = Ms;
	}
	else if(Ms > Mm)
	{
		result = Ms
	}
	else
	{
		result = Mm
	}
	return Number(result.toFixed(3))
}

Game_Celestial.prototype.calculateRadius = function()
{
	//result in Rearth
	const M = MAGPIE.PDL.GEOGRAPHY.MASS.EARTH;
	const Mx = this._mass / M;
	const result = Math.pow(Mx / (this._density / 5.51), 1 / 3)
	return Number((result * MAGPIE.PDL.GEOGRAPHY.RADIUS.EARTH).toFixed(3))
}

Game_Celestial.prototype.calculateGravity = function()
{
	//result in m/s²
	const Mx = this._mass / MAGPIE.PDL.GEOGRAPHY.MASS.EARTH;
	const R = this._radius / MAGPIE.PDL.GEOGRAPHY.RADIUS.EARTH;
	const g = MAGPIE.PDL.GEOGRAPHY.GRAVITY.EARTH;
	const result = Mx / Math.pow(R, 2);
	return Number((result * g).toFixed(3))
}

Game_Celestial.prototype.calculateEscapeVelocity = function()
{
	//result in km/s
	const Mx = this.convertEarthMass();
	const Rx = this.convertEarthRadius();
	const result = Math.sqrt(Mx / Rx);
	return Number((result * MAGPIE.PDL.GEOGRAPHY.VELOCITY.EARTH).toFixed(3))
}

Game_Celestial.prototype.getSatellite = function(index = 0)
{
	return this.findElementByField("satellites", index)
}

Game_Celestial.prototype.satellite = function(index = 0)
{
	let prop = this._satellites[index][0];
	let ID = this._satellites[index][1];
	return $PDL[prop]?.getElementByID(ID);
}

Game_Celestial.prototype.findElementByField = function(field, name = "", index = 0)
{
	let prop = `_${field}`;
	if(!this[prop] || this[prop].length < 1) return
	let child = [];
	if(name.length < 1 && index > 0)
		child = this[prop][index -1];
	else child = this[prop].find(child => child[2] == name || child[2].match(name));
	return $PDL[child[0]]?.getElementByID(child[1])
}

Game_Celestial.prototype.filterFieldByType = function(field, type)
{
	let prop = `_${field}`;
	if(!this[prop] || this[prop].length < 1) return
	let children = this[prop].filter(child => child[0] === type);
	return children
}

Game_Celestial.prototype.moon = function(name = "", index = 0)
{
	let moons = this.filterFieldByType("satellites", "moon");
	if(name.length < 1 && index > 0)
		return $PDL.moon.getElementByID(moons[index - 1][1])
	return $PDL.moon.getElementByName(name)
}

Game_Celestial.prototype.region = function(name = "", index = 0)
{
	return this.findElementByField("regions", name, index)
}

Game_Celestial.prototype.addRegion = function(data)
{
	let region = $PDL.region.add(new Game_Region(data));
	this._regions.push(["region", region.ID, region._name]);
	return region.ID
}

Game_Celestial.prototype.parent = function()
{
	if(!this._parent) 
		{console.warn(`Celestial body ${this._name} has no parent!`); return false} 
	return $PDL[this._parent[0]]?.getElementByID(this._parent[1])
}

Game_Celestial.prototype.makeExportData = function()
{
	let atmosphere = false;
	if(this._atmosphere)
		atmosphere = {
			parent: this._atmosphere._parent,
			pressure: this._atmosphere._pressure,
			composition: this._atmosphere._composition,
			density: this._atmosphere._density,
			cells: this._atmosphere._cells
		};
	const orbit = {
		parent: [this._type, this.ID, this._name],
		SMA: this._orbit._semiMajorAxis,
		inc: this._orbit._inc,
		ecc: this._orbit._ecc,
		period: this._orbit._period,
		direction: this._orbit._direction
	};
	const data = new Celestial_Data({
		meta: this.meta, 
		name: this._name, 
		atmosphere: atmosphere, 
		axialTilt: this._axialTilt, 
		mass: this._mass, 
		orbit: orbit, 
		parent: this._parent, 
		rotationPeriod: this._rotationPeriod, 
		regions: this._regions,
		satellites: this._satellites, 
		type: this._type
	});
	return data
}

Game_Celestial.prototype.conform = function()
{
	if(!this?._satellites)
		this._satellites = [];
	if(this?._celestials)
	{
		this._celestials.forEach(c => this._satellites.push(c));
		delete this._celestials;
	}
	if(this?._moons)
	{
		this._moons.forEach(m => this._satellites.push(m));
		delete this._moons;
	}
	if(this?._parentType)
	{
		const parent = [this._parentType, this._parentID, this._parent];
		this._parent = parent;
		delete this._parentType;
		delete this._parentID;
	}
	if(this._orbit?._parentType)
	{
		this._orbit._parent = [this._type, this.ID, this._name];
		delete this._orbit._parentType;
		delete this._orbit._parentID;
	}
	if(this._atmosphere?._parentType)
	{
		this._atmosphere._parent = [this._type, this.ID, this._name];
		delete this._atmosphere._parentType;
		delete this._atmosphere._parentID;
	}
	if(this?._parentType)
	{
		const parent = [this._parentType, this._parentID, this._parent];
		this._parent = parent;
		delete this._parentType;
		delete this._parentID;
	}
}

Game_Celestial.prototype.oblatenessCoeff = function()
{
	if(!this?._J2) this.estimateJ2fromRotation();
	return this._J2
}

/**
 * Estimates the J2 oblateness coefficient assuming the central body is in hydrostatic equilibrium,
 * based on its rotation rate and physical properties.
 *
 * Formula: J2 ≈ q / 3
 * where q (dynamic oblateness) = (omega^2 * R^3) / mu
 * @returns {number} The estimated J2 coefficient (unitless).
 */
Game_Celestial.prototype.estimateJ2fromRotation = function()
{
	const R_m = this?._radius * 1000;
	const mu = MAGPIE.PDL.GEOGRAPHY.G * this?._mass;
	const T = this?._rotationPeriod;
	if(T <= 0) return this._J2 = 0
	//1. calculate angular velocity (omega) in rad/s
	const omega = (2 * Math.PI) / T;
	//
	//2. calculate dynamic oblateness (q)
	const omega_2 = Math.pow(omega, 2);
	const R_cubed = Math.pow(R_m, 3);
	const q = (omega_2 * R_cubed) / mu;
	//
	//3. estimate J2 (Hydrostatic Equilibrium Approximation)
	const eJ2 = q / 3;
	return this._J2 = eJ2
}

Game_Celestial.prototype.propagate = function(dt)
{
	if(!this?._parent) return
	this._orbit.refreshOrbit(dt);
	if(this._satellites.length < 1) return
	this._satellites.forEach((c, index) => this.satellite(index).refresh(dt))
}

Game_Celestial.prototype.refresh = function(dt)
{
	this._orbit.refreshOrbit(dt)
}
// Game_Celestial.prototype.makeExportData = function()
// {
// 	let data = {};
// 	Object.keys(this).forEach(k => {
// 		key = k.replace("_", "");
// 		data[key] = this[k];
// 	})
// 	return data
// }

// Game_Celestial.prototype.makeExportData = function()
// {
// 	let atmosphere = undefined;
// 	if(this?._atmosphere === null) atmosphere = null;
// 	if(this?._atmosphere) 
// 		atmosphere = new Atmosphere_Data({
// 			composition: this._atmosphere._composition,
// 			pressure: this._atmosphere._pressure,
// 			density: this._atmosphere._density,
// 			cells: this._atmosphere._cells
// 		})
// 	let orbit = null;
// 	if(this?._orbit)
// 		orbit = new Orbit_Data({
// 			SMA: this._orbit._semiMajorAxis / MAGPIE.PDL.GEOGRAPHY.AU,
// 			ecc: this._orbit._ecc,
// 			inc: this._orbit._inc,
// 			direction: this._orbit._direction,
// 			period: this._orbit._period
// 		})
// 	let data = {};
// 	data.meta = this.meta;
// 	data.name = this._name;
// 	data.atmosphere = atmosphere;
// 	data.axialTilt = this?._axialTilt;
// 	data.mass = this?._mass;
// 	data.orbit = orbit;
// 	data.radius = this._radius;
// 	data.rotationPeriod = this._rotationPeriod;
// 	data.regions = this._regions;
// 	data.type = this._type;
// 	if(this?._celestials && this._celestials.length > 0) 
// 	{
// 		data.celestials = [];
// 		this._celestials.forEach((c, index) => data.celestials
// 			.push(this.child(index + 1).makeExportData()));
// 	}
// 	if(this?._moons && this._moons.length > 0) 
// 	{
// 		data.moons = [];
// 		this._moons.forEach(m => data.moons
// 			.push($PDL.moon.getElementByID(m[1]).makeExportData()));
// 	}
// 	return new Celestial_Data(data)
// }


//#endregion





//#region Atmosphere
MAGPIE.PDL.GEOGRAPHY.ATMOSPHERE = {};
MAGPIE.PDL.GEOGRAPHY.ATMOSPHERE.meta = {};
function Atmosphere_Data(data = {
	composition: {},
	density: 0,
	pressure: 0,
	cells: [[0,90]]
})
{
	Object.keys(data).forEach(k => this[k] = data[k])
}
function Game_Atmosphere(data)
{
	this.initialize(data);
}
Game_Atmosphere.prototype.initialize = function(data)
{
	this._parent = data?.parent;
	this._parentType = data?.parentType;
	this._pressure = data?.pressure;
	this._composition = data?.composition;
}

Game_Atmosphere.prototype.parent = function()
{
	return $PDL[this._parentType].getElementByID(this._parentID)
}

Game_Atmosphere.prototype.setupParent = function()
{
	this._parentID = $PDL[this._parentType].getElementByName(this._parent).ID;
}


//#endregion





//#region orbit
function Orbit_Data(data = {
	parent: ["type", "#ID", "name"],
	SMA: 0,
	inc: 0,
	ecc: 0,
	direction: true,
	period: 0,
	AU: undefined
})
{
	Object.keys(data).forEach(k => this[k] = data[k])
}

function Game_Orbit(data = {})
{
	this.initialize(data);
}
Game_Orbit.prototype.initialize = function(data)
{
	this.meta = "Game_Orbit";
	this._parent = data?.parent;
	this._owner = data?.owner;
	if(data?.AU) 
		data.a = Math.abs(data.AU * MAGPIE.PDL.GEOGRAPHY.AU)
	else if(data?.SMA) data.a = data.SMA;
	this.self_check(data);
}

Game_Orbit.prototype.parent = function()
{
	return Game_Celestial.prototype.parent.call(this)
}

Game_Orbit.prototype.owner = function()
{
	return $PDL.ENTITY.getElementByID(this._owner)
}

Game_Orbit.prototype.setupAU = function(au, ecc = 0)
{
	const AU = MAGPIE.PDL.GEOGRAPHY.AU;
	this._apo = AU * au;
	this._peri = AU * au;
	//ecc
}

Game_Orbit.prototype.semiMajorAxis = function()
{
	return Number(((this._apo + this._peri) / 2).toFixed(3))
}

Game_Orbit.prototype.SMA = function()
{
	return Number((this.semiMajorAxis() / 
		MAGPIE.PDL.GEOGRAPHY.AU).toFixed(3))
}

Game_Orbit.prototype.AU = function()
{
	return Number((this._apo / MAGPIE.PDL.GEOGRAPHY.AU).toFixed(3))
}

Game_Orbit.prototype.getPeri = function()
{
	return this._semiMajorAxis * (1 - this._ecc)
}

Game_Orbit.prototype.getApo = function()
{
	return this._semiMajorAxis * (1 + this._ecc)
}

Game_Orbit.prototype.period = function(a = null)
{
	//result in seconds
	a = this.a(a);
	const mu = this._mu || this.mu();
	const P = 2 * Math.PI * Math.sqrt(Math.pow(a / 1000, 3) / mu)
	return Number(P.toFixed(2))
}

Game_Orbit.prototype.printPeriod = function(C = 0, IF = false)
{
	const S = this.period();
	return MAGPIE_Runtime.prototype.readableTime.call(this, S, C, IF)
}




//#region math

Game_Orbit.prototype.centralBody = function()
{
	return $PDL.universe.Shel.star()
}

Game_Orbit.prototype.calculateDirection = function()
{
	//prograde = true
	return this._i <= (Math.PI / 2)
}

/**
 * 
 * @param {Vector3} h specific angular momentum
 * @returns {Number} i (radians)
 */
Game_Orbit.prototype.calculateInclinationRadians = function(h = 0)
{
	// const h_mag = this._h.mag();
	// if(h_mag === 0) return 0
	// const cos_i = this._h._z / h_mag;
	// const clamped_cos_i = Math.max(-1, Math.min(1, cos_i));
	// return this._i = Math.acos(clamped_cos_i)
	if(!h) h = this.calculateSpecificAngularMomentum();
	const h_mag = h.mag();
	if(h_mag === 0) return 0;
	const cos_i = h._z / h_mag;
	return Math.acos(this.clampValue(cos_i));
}

/**
 * 
 * @param {Vector3} r 
 * @param {Vector3} v 
 * @returns {Number} epsilon
 */
Game_Orbit.prototype.calculateSpecificOrbitalEnergy = function(r = 0, v = 0)
{
	r = this.r(r);
	v = this.v(r);
	const v_mag = v.mag();
	const r_mag = r.mag();
	return (v_mag * v_mag / 2) - (this._mu / r_mag);
}

/**
     * Calculates the True Anomaly (nu) from the Eccentric Anomaly (E).
     * @param {number} E_rad - Eccentric Anomaly (radians).
     * @param {number} e - Eccentricity.
     * @returns {number} True Anomaly (nu) in radians.
*/
Game_Orbit.prototype.calculateTrueAnomaly = function(E_rad, e)
{
	// const nu_half = Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E_rad / 2));
	// return nu_half * 2
	//
	//calculate the constant factor
	const factor = Math.sqrt((1 + e) / (1 - e));
	//
	//calculate the right side of the tan(nu/2) equation
	const tan_nu_2 = factor * Math.tan(E_rad / 2);
	//
	//calculate nu/2 using the arctangent function (atan)
	const nu2 = Math.atan(tan_nu_2);
	//
	//multiply by 2 to get t he full True Anomaly (nu)
	const nu = 2 * nu2;
	//
	//normalize nu to be between 0 and 2*PI, matching the convention of M and E
	if(nu < 0) return nu + 2 * Math.PI
	return nu
}

/**
 * Calculate True Anomaly from T1
 * @param {Number} T1 effective orbital time (s)
 * @returns {Number} nu (rad)
 */
Game_Orbit.prototype.TrueAnomaly = function(T1 = null)
{
	if(isNaN(T1)) T1 = this.progress();
	const M = this.calculateMeanAnomaly(T1);
	const e = this.ecc();
	const E = this.NRkeplerSolver(M, e)
	return this.calculateTrueAnomaly(E, e)
}

/**
 * Calculates the radius (r), the distance from the central body (Earth)
 * to the satellite's position, using the polar equation for an ellipse.
 *
 * Formula: r = (a * (1 - e^2)) / (1 + e * cos(nu))
 *
 * @param {number} a - Semi-major axis (meters or kilometers, depending on input unit).
 * @param {number} e - Eccentricity (unitless).
 * @param {number} nu - True Anomaly (in radians).
 * @returns {number} The radius (r) in the same units as 'a'.
 */
Game_Orbit.prototype.calculateRadius = function(a, e, nu)
{
	const numerator = a * (1 - e * e);
	const denominator = 1 + e * Math.cos(nu);
	return numerator / denominator
}

/**
 * Calculates the final Earth-Centered Inertial (ECI) position coordinates (X, Y, Z)
 * by rotating the in-plane coordinates (r, nu) using the Euler angles.
 *
 * @param {number} r - Radius (distance from center of Earth).
 * @param {number} nu - True Anomaly (radians).
 * @param {number} i - Inclination (radians).
 * @param {number} omega - Argument of Periapsis (radians).
 * @param {number} raan - Right Ascension of the Ascending Node (Omega) (radians).
 * @returns {{x: number, y: number, z: number}} An object containing the ECI coordinates.
 */
Game_Orbit.prototype.calculateECIposition = function(r, nu, i, omega, raan)
{
	//u is the argument of latitude, the angle from the ascending node to the satellite
	const u = nu + omega;
	const cos_u = Math.cos(u);
	const sin_u = Math.sin(u);
	//
	const cos_raan = Math.cos(raan);
	const sin_raan = Math.sin(raan);
	//
	const cos_i = Math.cos(i);
	const sin_i = Math.sin(i);
	//
	//the transformation matrix applied to the orbital plane (P, Q) vector
	//P = r * cos(nu), Q = r * sin(nu) rotated by omega, i, and RAAN
	//
	//X-coordinate
	const x = r * (cos_u * cos_raan - sin_u * sin_raan * cos_i);
	//
	//Y-coordinate
	const y = r * (cos_u * sin_raan + sin_u * cos_raan * cos_i);
	//
	//Z-coordinate
	const z = r * (sin_u * sin_i);
	//
	return { x, y, z }
}

/**
 * Transforms a position vector from the Inertial Frame (ECI) to the Body-Fixed Frame (ECEF).
 * * ECEF_vector = Rz(-theta) * ECI_vector
 * where Rz(-theta) is the rotation matrix around the Z-axis by the angle theta.
 * @param {obj} ECI - Inertial Frame X,Y,Z position object (e.g., meters).
 * @param {number} theta_rad - The body's current rotation angle (Sidereal Angle, e.g., GST) in RADIANS.
 * @returns {{x: number, y: number, z: number}} The Body-Fixed position vector.
 */
Game_Orbit.prototype.calculateECEFfromECI = function(ECI, theta_rad)
{
	const cost_theta = Math.cos(theta_rad);
	const sin_theta = Math.sin(theta_rad);
	//
	const r_bf_x = ECI.x * sin_theta + ECI.y * cost_theta;
	//
	const r_bf_y = -ECI.x * sin_theta + ECI.y * cost_theta;
	//
	const r_bf_z = ECI.z;
	//
	return { x: r_bf_x, y: r_bf_y, z: r_bf_z }
}

/**
 * Transforms a velocity vector from the Inertial Frame (ECI) to the Body-Fixed Frame (ECEF).
 * V_ECEF = Rz(-theta) * V_ECI - omega_ECEF x R_ECEF
 * * @param {obj} ECI
 * @param {obj} ECEF
 * @param {number} theta_rad - The body's current rotation angle (Sidereal Angle) in RADIANS.
 * @param {number} omega_rad_s - The body's constant angular rotation rate around the Z-axis in RADIANS/SECOND.
 * @returns {{x: number, y: number, z: number}} The Body-Fixed velocity vector.
 */
Game_Orbit.prototype.calculateECEFvelocity = function(ECI, ECEF, theta_rad, omega_rad_s)
{
	const cost_theta = Math.cos(theta_rad);
	const sin_theta = Math.sin(theta_rad);
	//
	//1. rotate the intertial velocity vector (V1)
	const v1x = ECI.x * cost_theta + ECI.y * sin_theta;
	//
	const v1y = -ECI.x * sin_theta + ECI.y * cost_theta;
	//
	const v1z = ECI.z;
	//
	//2. calculate the angular velocity cross product term (omega x R_ECEF)
	const v_cross_x = omega_rad_s * ECEF.y;
	const v_cross_y = omega_rad_s * ECEF.x;
	const v_cross_z = 0;
	//
	//3. subtrack the cross product term (V_ECEF = V1 - V_cross)
	const V_x = v1x - v_cross_x;
	const V_y = v1y - v_cross_y;
	const V_z = v1z - v_cross_z;
	//
	return { x: V_x, y: V_y, z: V_z }
}

/**
 * Calculates the total angular rotation (theta) in radians for a body since its epoch.
 *
 * @param {Date} epoch_date - The JavaScript Date object representing the time when the body's rotation angle (theta) was defined as 0 radians (e.g., J2000 for Earth).
 * @param {Date} current_date - The JavaScript Date object for which to calculate the current angle.
 * @param {number} angular_rate_rad_s - The constant angular rotation rate of the body in RADIANS per SECOND.
 * @returns {number} The current rotation angle in RADIANS (0 to 2*PI).
 */
Game_Orbit.prototype.calculateSiderealTimeRad = function(epoch_date, current_date, angular_rate_rad_s)
{
	//1. calculate time difference
	const dT = current_date.totalSeconds() - epoch_date.totalSeconds();
	//
	//2. calculate total rotation angle (Angle = Rate * Time)
	const total_angle_rad = angular_rate_rad_s * dT;
	//
	//3. normalized the angle to the 0 to 2*PI range
	const TWO_PI = 2 * Math.PI;
	let angle = total_angle_rad % TWO_PI;
	//
	//ensure the angle is positive
	if(angle < 0)
		angle += TWO_PI;
	return angle
}

/**
 * Calculates the angular rotation rate (omega) in radians per second.
 *
 * @param {number} period_seconds - The time duration (in seconds) for one full rotation of the body (e.g., sidereal day length).
 * @returns {number} The angular rotation rate in RADIANS per SECOND.
 */
Game_Orbit.prototype.calculateAngularRatePerSecond = function(period_seconds)
{
	if(period_seconds <= 0)
		return 0
	//
	const TWO_PI = 2 * Math.PI;
	//
	const rad_s = TWO_PI / period_seconds;
	return rad_s
}

/**
 * Calculates the time since epoch (t - t0) required for the standard orbital
 * equation, based on the Mean Anomaly at Epoch (M0) and Mean Motion (n).
 *
 * This version uses the following units:
 * - M0 in Degrees (input, internally converted to radians)
 * - n in Radians per Second (input)
 * - Time Since Periapsis in Seconds (input)
 * - Time Since Epoch in Seconds (output)
 *
 * @param {number} meanAnomalyAtEpoch_deg The Mean Anomaly at Epoch (M0) in degrees.
 * @param {number} meanMotion_radPerSecond The Mean Motion (n) in radians per second.
 * @param {number} timeSincePeriapsis_seconds The time elapsed since the last periapsis passage (t - tp) in seconds.
 * @returns {number | null} The total time since epoch (t - t0) in seconds, or null if an error occurs.
 */
Game_Orbit.prototype.calculateTimeSinceEpoch = function(
	meanAnomalyAtEpoch_deg,
	meanMotion_radPerSecond,
	timeSincePeriapsis_seconds
)
{
	//1. convert M0 from degrees to radians
	const M0_rad = meanAnomalyAtEpoch_deg * (Math.PI / 180);
	//
	//check for 0 mean motion
	if(meanMotion_radPerSecond === 0) return null
	//
	//2. calculate Delta T (between Epoch and Periapsis)
	const dT = M0_rad / meanMotion_radPerSecond;
	//
	//3. calculate time since Epoch(T - T0)
	const T = timeSincePeriapsis_seconds - dT;
	return T
}



/**
 * Calculates the J2 perturbation rates for Right Ascension of the Ascending Node (RAAN)
 * and Argument of Perigee (omega).
 *
 * @param {number} J2 - The central body's oblateness coefficient (unitless).
 * @param {number} R - The central body's mean equatorial radius (meters).
 * @param {number} mu - The central body's gravitational parameter (GM) (m^3/s^2).
 * @param {number} a - The satellite's semi-major axis (meters).
 * @param {number} e - The satellite's orbital eccentricity (unitless).
 * @param {number} i_rad - The satellite's orbital inclination (radians).
 * @returns {{
 * omega_dot_rad_s: number,
 * raan_dot_rad_s: number   
 * }}
 * @desc returns: a => Rate of change of Argument of Perigee (d(omega)/dt) in rad/s
 * @desc b => Rate of change of RAAN (d(Omega)/dt) in rad/s }
 */
Game_Orbit.prototype.calculateJ2PerturbationRates = function(J2, R, mu, a, e, i_rad)
{
	//1. calculate Mean Motion (n)
	const n = Math.sqrt(mu / Math.pow(a, 3));
	//
	//2. calculate the common factor (C) found in both equations
	const C = (3 / 2) * J2 * Math.pow(R / a, 2) / Math.pow(1 - Math.pow(e, 2), 2);
	//
	//3. calculate RAAN rate (Omega-dot)
	const raan_dot_rad_s = -1 * C * n * Math.cos(i_rad);
	//
	//4. calculate argument of periapsis rate (omega-dot)
	const sin_i_2 = Math.pow(Math.sin(i_rad), 2);
	const omega_dot_rad_s = C * n * (2 - 2.5 * sin_i_2);
	//
	return { 
		omega_dot_rad_s: omega_dot_rad_s,
		raan_dot_rad_s: raan_dot_rad_s
	}
}

/**
 * Calculates the total change (delta) in RAAN and Argument of Perigee over a time interval.
 *
 * @param {{omega_dot_rad_s: number, raan_dot_rad_s: number}} rates - The calculated perturbation rates.
 * @param {number} dT - The time interval in seconds over which to integrate.
 * @returns {{delta_omega_rad: number, delta_raan_rad: number}}
 * @desc returns:
 * @desc a: Total change in Argument of Periapsis (radians)
 * @desc b: Total change in RAAN (radians)
 */
Game_Orbit.prototype.calculatePerturbationChange = function(rates, dT)
{
	return { 
		delta_omega_rad: rates.omega_dot_rad_s * dT,
		delta_raan_rad: rates.raan_dot_rad_s * dT
	} 
}

Game_Orbit.prototype.J2Perturbations = function()
{
	const parent = this.mainBody();
	if(!parent?._radius) return
	const J2 = parent.oblatenessCoeff();
	const R = parent._radius * 1000;
	const mu = parent._orbit._mu
	return this.calculateJ2PerturbationRates(J2, R, mu, this._a, this._ecc, this._i);
}

Game_Orbit.prototype.applyPerturbations = function(raan, aop, dT)
{
	// const J2 = this.J2Perturbations();
	// const P2 = 2 * Math.PI;
	// let raan_new = (J2.raan_dot_rad_s * dT + raan) % P2;
	// let aop_new = (J2.omega_dot_rad_s * dT + aop) % P2;
	// if(raan_new < 0) raan_new = P2 + raan_new;
	// if(aop_new < 0) aop_new = P2 + aop_new;
	// return { raan: raan_new, aop: aop_new }
	return { raan: raan, aop: aop}
}




/**
     * Calculates the position and velocity in the **Perifocal Frame** (where X axis points to periapsis).
     * @param {number} E_rad - Eccentric Anomaly (radians).
     * @param {number} nu_rad - True Anomaly (radians).
     * @returns {{r_mag: number, r_perifocal: Vector3, v_perifocal: Vector3}}
*/
Game_Orbit.prototype.getPerifocalStateVectors = function(E_rad, nu_rad)
{
	const a = this._a;
	const e = this._ecc;
	const mu = this._mu;
	//handle non-elliptical/circular orbits
	if(e >= 1 || a === Infinity)
	{
		return {
			r_mag: this._r.mag(),
			r_perifocal: this._r,
			v_perifocal: this._v
		}
	}
	//
	//1. Position components in Perifocal Frame
	const r_mag = a * (1 - e * Math.cos(E_rad)); //radial distance
	const x_p = r_mag * Math.cos(nu_rad);
	const y_p = r_mag * Math.sin(nu_rad);
	//z_p is zero in the perifocal frame
	const r_perifocal = new Game_Vector({x: x_p, y: y_p, z: 0});
	//
	//2. Velocity components in perifocal frame
	//v_x = sqrt(mu/p) * sin(nu)
	//v_y = sqrt(mu/p) * (e + cos(nu))
	const p = a * (1 - e * e); //semi-latus rectum
	const h_mag = Math.sqrt(mu * p); //magnitude of specific angular momentum
	//
	//radial velocity component (along r_perifocal)
	const v_r = (mu / h_mag) * e * Math.sin(nu_rad);
	//Transverse velocity component (perp to r_perifocal)
	const v_theta = (mu / h_mag) * (1 + e * Math.cos(nu_rad));
	//
	//Velocity vector in perifocal frame: V = v_r * (r/|r|) + v_theta * (t/|t|)
	const term = Math.sqrt(mu / p);
	const vx_p = -term * Math.sin(nu_rad);
	const vy_p = term * (e + Math.cos(nu_rad));
	//
	const v_perifocal = new Game_Vector({x: vx_p, y: vy_p, z: 0});
	//
	return { r_mag, r_perifocal, v_perifocal }
}

/**
 * 
 * @param {Number} T1 effective time (s)
 * @returns {Number} M
 */
Game_Orbit.prototype.calculateMeanAnomaly = function(T1 = null)
{
	if(isNaN(T1)) T1 = this.progress();
	const period = this._period;
	if(!period) return 0
	const meanAngularMotion = (2 * Math.PI) / period;
	return meanAngularMotion * T1
}


/**
 * Step 4: Transforms the state vectors from the perifocal frame (PQW) to the
 * Earth-Centered Inertial (ECI/IJK) frame using the three Euler angles (omega, i, raan).
 *
 * @param {obj} PQW - from PQW
 * @param {number} raan - Right Ascension of the Ascending Node (Omega) in radians.
 * @param {number} i - Inclination (i) in radians.
 * @param {number} omega - Argument of Periapsis (omega) in radians.
 * @returns {{r_eci: obj, v_eci: obj}} State vectors [I, J, K] in ECI frame.
 */
Game_Orbit.prototype.PQW_ECI = function(PQW, raan, i, aop)
{
	const c_O = Math.cos(raan);
	const s_O = Math.sin(raan);
	const c_i = Math.cos(i);
	const s_i = Math.sin(i);
	const c_w = Math.cos(aop);
	const s_w = Math.cos(aop);
	//
	const R = [
		[c_O * c_w - s_O * s_w * c_i, -c_O * s_w - s_O * c_w * c_i, s_O * s_i],
		[s_O * c_w + c_O * s_w * c_i, -s_O * s_w + c_O * c_w * c_i, -c_O * s_i],
		[s_w * s_i, c_w * s_i, c_i]
	];
	//
	const r_eci = new Game_Vector({
		x: R[0][0] * PQW.r._x + R[0][1] * PQW.r._y + R[0][2] * PQW.r._z,
		y: R[1][0] * PQW.r._x + R[1][1] * PQW.r._y + R[1][2] * PQW.r._z,
		z: R[2][0] * PQW.r._x + R[2][1] * PQW.r._y + R[2][2] * PQW.r._z
	});
	//
	const v_eci = new Game_Vector({
		x: R[0][0] * PQW.v._x + R[0][1] * PQW.v._y + R[0][2] * PQW.v._z,
		y: R[1][0] * PQW.v._x + R[1][1] * PQW.v._y + R[1][2] * PQW.v._y,
		z: R[2][0] * PQW.v._x + R[2][1] * PQW.v._y + R[2][2] * PQW.v._z
	});
	//
	return { r: r_eci, v: v_eci }
}

/**
 * Step 3 & 4: Calculates the state vectors (position and velocity) from Eccentric Anomaly (E).
 * The vectors are calculated in the perifocal coordinate system (P-Q frame), where P is along
 * the periapsis vector and Q is 90 degrees away in the orbit plane.
 *
 * @param {number} a - Semi-major axis (meters).
 * @param {number} e - Eccentricity (unitless).
 * @param {number} E - Eccentric Anomaly (radians).
 * @param {number} mu - Gravitational parameter (m^3/s^2).
 * @returns {{r: number[], v: number[]}} Object containing [P, Q] position and velocity vectors.
 */
Game_Orbit.prototype.PQW = function(a, e, E, mu)
{
	const r = a * (1 - e * Math.cos(E));
	//
	//Position Vector in perifocal frame
	const r_P = r * Math.cos(E);
	const r_Q = r * Math.sqrt(1 - e * e) * Math.sin(E);
	const r_vec = new Game_Vector({x: r_P, y: r_Q, z: 0});
	//
	//Mean Motion (n)
	const n = Math.sqrt(mu / Math.pow(a, 3));
	//
	//Velocity vector (v_p, v_q) in perifocal frame
	const v_P = (a * n / r) * Math.sin(E) * (-1);
	const v_Q = (a * n / r) * Math.sqrt(1 - e * e) * Math.cos(E);
	const v_vec = new Game_Vector({x: v_P, y: v_Q, z: 0});
	//
	return { r: r_vec, v: v_vec }
}

Game_Orbit.prototype.r = function(r = 0)
{
	if(!r) r = this?._r;
	if(!r) r = new Game_Vector();
	return r
}

Game_Orbit.prototype.v = function(v = 0)
{
	if(!v) v = this?._v;
	if(!v) v = new Game_Vector();
	return v
}

//@todo


Game_Orbit.prototype.mainBody = function()
{
	const body = this.parent()?.parent();
	if(body?._radius) return body
	const position = this.parent()?._position;
	if(position[2]?.constructor?.name === "Game_Orbit") return this.parent().getPosition()  
}

//------------------------------------------------------------------------
//#region parameters

//#endregion
/**
 * 
 * @returns {Number} n (m/s)
 */
Game_Orbit.prototype.meanMotion = function()
{
	const a = this.a();
	const μ = this.mu();
	if(a <= 0 || a === Infinity) return 0
	return Math.sqrt(μ / a**3)
}

/**
 * 
 * @returns {Number} P (s)
 */
Game_Orbit.prototype.calculatePeriod = function()
{
	const n = this.n();
	if(n <= 0) return Infinity
	const P = 2 * Math.PI / n;
	return P
}

/**
 * Periapsis radius
 * @returns {Number} Rp (m)
 */
Game_Orbit.prototype.calculatePeriapsis = function()
{
	// r_p = a * (1 - e)
	const e = this.ecc();
	const a = this.a();
	// For non-closed orbits, periapsis is the current distance
	if(e >= 1) return this._r.mag();
	return a * (1 - e)
}

/**
 * Apoapsis radius
 * @returns {Number} Ra (m)
 */
Game_Orbit.prototype.calculateApoapsis = function()
{
	// r_a = a * (1 + e)
	const e = this.ecc();
	const a = this.a();
	// For parabolic/hyperbolic, apoapsis is infinite
	if(e >= 1) return Infinity
	return a * (1 + e)
}

Game_Orbit.prototype.direction = function()
{
	// Prograde (true) if Inclination < 90 degrees (pi/2 radians)
	const i = this.i();
	return i <= (Math.PI / 2)
}

/**
     * Finds the Eccentric Anomaly (E) by iteratively solving Kepler's Equation.
     * @param {number} M - Mean Anomaly (radians).
     * @param {number} e - Eccentricity (0 <= e < 1).
     * @returns {number} Eccentric Anomaly (E) in radians.
*/
Game_Orbit.prototype.solveKepler = function(M, e)
{
	const MAX_ITERATIONS = 10;
	const TOLERANCE = 1e-8;
	// Initial guess for E: E0 = M (a good starting point)
	let E = M;
	for(let i = 0; i < MAX_ITERATIONS; i++)
	{
		// Function f(E) = E - e * sin(E) - M
		const f = E - e * Math.sin(E) - M;

		// Derivative f'(E) = 1 - e * cos(E)
		const f_prime = 1 - e * Math.cos(E);

		// Newton's Method: E_new = E - f(E) / f'(E)
		const E_new = E - f / f_prime;

		// Check for convergence
		if(Math.abs(E_new - E) < TOLERANCE)
			return E_new
		E = E_new;
	}
	// Return the best approximation after max iterations
	return E
}

/**
     * Calculates the position vector (x, y) in the 2D orbital plane
     * after a given time 't' has passed since periapsis passage.
     * * NOTE: The coordinates are in the 2D orbital frame (x points to periapsis).
     * @param {number} Tp - Time since periapsis passage (seconds).
     * @returns {Vector2} Position and distance.
*/
Game_Orbit.prototype.getPositionAtTime = function(Tp = 0) 
{
	if(isNaN(Tp)) Tp = 0;
	//1. Check for non-elliptical orbit
	const e = this.ecc();
	const a = this.a();
	const n = this.n()
	const i = this.i();

	//handle hyperbolic/parabolic trajectory here (more complex)
	if(e >= 1 || a <= 0)
		return {x: 0, y: 0, r: 0}

	//2. Calculate Mean Anomaly (M). M0 is assumed to be 0 (started at periapsis)
	const M = n * Tp;

	//3. Solve Kepler's Equation for Eccentric Anomaly (E)
	const E = this.NRkeplerSolver(M, e);

	//4. Calculate 2D Orbital Plane Coordinates (x points to periapsis)
	const x_orb = a * (Math.cos(E) - e);
	const y_orb = a * Math.sqrt(1 - e * e) * Math.sin(E);

	//The Z component is zero because it's in the 2D plane
	let p_orb_2d = new Game_Vector({x: x_orb, y: y_orb, z: 0});

	//5. Rotate the 2D position into 3D space using Inclination
	// We assume: 
        // a) The periapsis (x_orb axis) is aligned with the global X-axis.
        // b) The Ascending Node (where the orbit crosses the equator) is at the Y-axis.
        // c) The Inclination is a simple rotation around the X-axis.
	const final_position = p_orb_2d.rotateX(i)

	return final_position
}

/**
 * Keplerian Elements to State Vectors Converter
 *
 * Converts a set of Keplerian Orbital Elements (KEOs), in SI units, into Cartesian
 * Position (r) and Velocity (v) State Vectors in the inertial ECI frame.
 *
 * @param {number} a - Semi-major axis (meters).
 * @param {number} e - Eccentricity (unitless).
 * @param {number} i - Inclination (radians).
 * @param {number} raan - Longitude of the Ascending Node (RAAN) (radians).
 * @param {number} aop - Argument of Periapsis (radians).
 * @param {number} nu - True Anomaly (radians) - the current position.
 * @returns {{r: obj, v: obj, nu: number}} - Position (m) and Velocity (m/s) vectors.
 */
Game_Orbit.prototype.keplerianToStateVectors = function(a, e, i, raan, aop, nu)
{
	const mu = this._mu;
	//
	//2. calculate vectors in the orbital frame (perifocal/PQW Frame)
	//calculate distance (radius) from central body
	const r_mag = (a * (1 - e**2)) / (1 + e * Math.cos(nu));
	//
	//position vector in PQW FGrame
	const r_p = r_mag * Math.cos(nu);
	const r_q = r_mag * Math.sin(nu);
	const r_orb = [r_p, r_q, 0];
	//
	//angular momentum magnitude (h)
	const h = Math.sqrt(mu * a * (1 - e**2));
	//
	//velocity vector in PQW frame
	const v_p = (mu / h) * e * Math.sin(nu);
	const v_q = (mu / h) * (1 + e * Math.cos(nu));
	const v_orb = [-v_p, v_q, 0];
	//
	//3. construct rotation matrix 
	const cos_O = Math.cos(raan);
	const sin_O = Math.sin(raan);
	const cos_o = Math.cos(aop);
	const sin_o = Math.sin(aop);
	const cos_i = Math.cos(i);
	const sin_i = Math.sin(i);
	//
	//Matrix elements (row-major order for R_PQW_to_ECI)
	const R11 = cos_O * cos_o - sin_O * sin_o * cos_i;
	const R12 = -cos_O * sin_o - sin_O * cos_o * cos_i;
	const R13 = sin_O * sin_i;
	const R21 = sin_O * cos_o + cos_O * sin_o * cos_i;
	const R22 = -sin_O * sin_o + cos_O * cos_o * cos_i;
	const R23 = -cos_O * sin_i;
	const R31 = sin_o * sin_i;
	const R32 = cos_o * sin_i;
	const R33 = cos_i;
	//
	//4. rotate to intertial frame (ECI Frame)
	//
	//
	const r_vec = new Game_Vector({
		x: R11 + r_orb[0] + R12 * r_orb[1] + R13 * r_orb[2],
		y: R21 * r_orb[0] + R22 * r_orb[1] + R23 * r_orb[2],
		z: R31 * r_orb[0] + R32 * r_orb[1] + R33 * r_orb[2]
	});
	const v_vec = new Game_Vector({
		x: R11 * v_orb[0] + R12 * v_orb[1] + R13 * v_orb[2],
		y: R21 * v_orb[0] + R22 * v_orb[1] + R23 * v_orb[2],
		z: R31 * v_orb[0] + R32 * v_orb[1] + R33 * v_orb[2]
	})
	return { r: r_vec, v: v_vec, nu: nu}
}

Game_Orbit.prototype.convertSItoAU = function(i, raan, aop, nu)
{
	results = {};
	const elements = [i, raan, aop, nu];
	elements.forEach(e => results[e] = this.convertRadToDeg(e));
	return results
}

Game_Orbit.prototype.convertAUtoSI = function(i, raan, aop, nu)
{
	results = {};
	const elements = [i, raan, aop, nu];
	elements.forEach(e => results[e] = this.convertDegToRad(e));
	return results
}

Game_Orbit.prototype.convertDegToRad = function(value)
{
	return MAGPIE_Firmware.prototype.convertDegToRad.call(this, value)
}

Game_Orbit.prototype.convertRadToDeg = function(value)
{
	return MAGPIE_Firmware.prototype.convertRadToDeg.call(this, value)
}



//#endregion






//#region propagator

/**
 * Propagates the orbit for a given time step (dt).
 * @param {obj} elements a, e, i, raan, aop, M
 * @param {number} dt The time step to propagate forward (seconds)
 * @returns {object} The new state, including vectors and updated elements.
 */
Game_Orbit.prototype.propagateOrbit = function(elements, dt)
{
	const kep = elements;
	const t0 = this._epoch;
	const P = this._period;
	const perturbations = $ShelderEvo.SHELGEO?.SETTINGS?.ORBIT_PERTURBATION || 0;
	const t_p = t0 * perturbations;
	const M0 = kep.M || this.calculateMeanAnomaly((t0 - dt) % P);
	const J2 = this.applyPerturbations(kep.raan, kep.aop, t_p);
	const a = kep.a;
	const e = kep.e;
	const i = kep.i;
	//
	//1. calculate Mean motion (n) and propagate Mean Anomaly (M)
	const n = this.n();
	//
	const M1 = M0 + n * dt;
	//
	//2. propagate perturbed angles
	const raan = J2.raan;
	const aop = J2.aop;
	// const raan = kep.raan;
	// const aop = kep.aop;
	//
	//3. solve for Eccentric Anomaly (E)
	// const E = this.solveKepler(M1, e);
	const E = this.NRkeplerSolver(M1, e);
	if(isNaN(E))
	{
		console.warn(`${this.constructor.name} propagation failed: E = NaN`);
		return { state: {r: this._r, v: this._v}, elements: kep}
	}
	// const nu = this.calculateTrueAnomaly(E, e);
	const nu = this.EtoNu(E, e);
	//
	//4. convert to Cartesian Vectors using E
	const elements1 = { a, e, i, raan, aop, nu };
	const state = this.keplerianToVectors(elements1)
	const elements2 = { a, e, i, raan, aop, M: M1 }
	//
	//
	return { state: state, elements: elements2}
}

Game_Orbit.prototype.autoSolveKepler = function()
{
	const M = this.calculateMeanAnomaly(this.progress());
	return this.solveKepler(M, this._ecc)
}

/**
 * 
 * @param {Number} a semi-major axis
 * @param {Number} e eccentricity (dimensionless)
 * @param {Vector3} r position vector
 * @param {Vector3} v velocity vector
 * @returns {Number} E
 */
Game_Orbit.prototype.calculateEccentricAnomaly = function(a = 0, e = 0, r = 0, v = 0)
{
	r = this.r(r);
	v = this.v(v);
	a = this.a(a);
	e = this.ecc(e);
	const r_mag = r.mag();
	//
	const E_term = (a * (1 - e**2) / r_mag - 1) / e;
	const E_cos = Math.acos(this.clampValue(E_term));
	//
	const r_dot_v = r.dot(v);
	let E1 = 0;
	if(r_dot_v < 0)
	{
		E1 = 2 * Math.PI - E_cos;
	}
	else
	{
		E1 = E_cos;
	}
	return E1
}

//------------------------------------------------------------------------
//#region self-check


//------------------------------------------------------------------------
//#region static
/**
 * 
 * @param {Number} a semi-major axis
 * @param {Number} epsilon specific orbital energy
 * @return {Number} a
 */
Game_Orbit.prototype.a = function(a = null, epsilon = null)
{
	// const ε = this.ε();	
	// if(Math.abs(2 * ε) < 1e-9) return Infinity
	// const a = -this.mu() / (2 * ε);
	// if(isNaN(a)) return this.semiMajorAxis() || this._semiMajorAxis
	// return a
	if(isNaN(a)) a = this?._a;
	if(isNaN(a)) 
	{
		if(isNaN(epsilon)) 
		{
			epsilon = this.epsilon();
		}
		a = this.calculateSemiMajorAxis(epsilon);
		this._a = a;
	}
	return a
}

/**
 * 
 * @param {Vector3} e 
 * @param {Vector3} r 
 * @param {Vector3} v 
 * @param {Vector3} h 
 * @returns {Vector3} e_vec
 */
Game_Orbit.prototype.e = function(e = 0, r = 0, v = 0, h = 0)
{
	if(!e) 
	{
		r = this.r(r);
		v = this.v(v);
		h = this.h(h);
		e = this.calculateEccentricityVector(r, v, h);
	}
	return e
}

/**
 * 
 * @param {Number} i - check if 'i' is provided
 * @returns {Number} i (radians)
 */
Game_Orbit.prototype.i = function(i = null)
{
	if(isNaN(i)) i = this.calculateInclinationRadians();
	return i
}

/**
 * 
 * @param {Number} inc inclination (°) 
 * @returns {Number} i (°)
 */
Game_Orbit.prototype.inc = function(inc = null, i = null)
{
	if(isNaN(inc)) inc = this?._inc;
	if(isNaN(inc)) 
	{
		this.i(i) * (180 / Math.PI); 
		this._inc = inc;
	}
	return inc
}

/**
 * 
 * @param {Number} epsilon Specific Orbital Energy (m/s)
 * @returns {Number} epsilon (m/s)
 */
Game_Orbit.prototype.epsilon = function(epsilon = null)
{
	if(isNaN(epsilon)) epsilon = this?._epsilon;
	if(isNaN(epsilon)) 
	{
		epsilon = this.calculateSpecificOrbitalEnergy();
		this._epsilon = epsilon;
	}
	return epsilon
}

/**
 * 
 * @returns {Number} mu
 */
Game_Orbit.prototype.mu = function(mu = 0)
{
	if(!mu) mu = this?._mu;
	if(!mu) 
	{
		const Mp = this.mainBody()?._mass || this.centralBody()._mass;
		const Mc = this.parent()?._mass || 0;
		const G = MAGPIE.PDL.GEOGRAPHY.G;
		mu = G * (Mp + Mc);
	}
	if(!this?._mu) this._mu = mu;
	return mu
}

/**
 * 
 * @param {Number} ecc eccentricity (°) 
 * @returns {Number} e (°)
 */
Game_Orbit.prototype.ecc = function(ecc = null)
{
	if(isNaN(ecc) || ecc > 1) ecc = this?._ecc;
	if(isNaN(ecc) || ecc > 1) ecc = this.e().mag();
	if(!this?._ecc) this._ecc = ecc;
	return ecc
}

/**
 * 
 * @param {Number} raan (rad) 
 * @returns {Number} raan (rad)
 */
Game_Orbit.prototype.raan = function(raan = null)
{
	if(isNaN(raan)) raan = this?._raan;
	if(isNaN(raan)) raan = this.calculateUpperOmega();
	if(!this?._raan) this._raan = raan;
	return raan
}

/**
 * 
 * @param {Number} aop Argument of Periapsis (radians) 
 * @returns {Number} aop (rad)
 */
Game_Orbit.prototype.aop = function(aop = null)
{
	if(isNaN(aop)) aop = this?._aop;
	if(isNaN(aop)) aop = this.argumentOfPeriapsis();
	if(!this?._aop) this._aop = aop;
	return aop
}
//#endregion







//------------------------------------------------------------------------
//#region dynamic
/**
 * 
 * @param {Vector3} h Specific Angular Momentum
 * @param {Vector3} r position 
 * @param {Vector3} v velocity
 * @returns {Vector3} h 
 */
Game_Orbit.prototype.h = function(h = 0, r = 0, v = 0)
{
	if(!h) 
	{
		r = this.r(r);
		v = this.v(v);
		h = this.calculateSpecificAngularMomentum(r, v);
	}
	return h
}

/**
 * 
 * @param {Number} n Mean motion 
 * @returns {Number} n (m/s)
 */
Game_Orbit.prototype.n = function(n = null)
{
	if(isNaN(n)) n = this?._n;
	if(isNaN(n)) 
	{
		n = this.meanMotion(); 
		this._n = n;
	}
	return n
}

/**
 * 
 * @param {Number} nu (radians) 
 * @returns {Number} nu (rad)
 */
Game_Orbit.prototype.nu = function(nu = null)
{
	if(isNaN(nu)) nu = this.TrueAnomaly();
	return nu
}

Game_Orbit.prototype.M = function(M = null)
{
	if(isNaN(M)) M = this.calculateMeanAnomaly();
	return M
}
//#endregion


//#endregion


Game_Orbit.prototype.calculateUpperOmega = function(r = 0, v = 0)
{
	if(!r) r = this._r;
	if(!v) v = this._v;
	const n = this.calculateNodeVector(r, v);
	const Ny = n._y;
	const Nx = n._x;
	const n_cos = Math.acos(Nx / n.mag());
	const P2 = 2 * Math.PI;
	const EPSILON = 1e-9;
	return Ny > EPSILON ? n_cos : P2 - n_cos
}

/**
 * Calculates the Node Vector (N), which points towards the Ascending Node (where the orbit crosses 
 * the equatorial plane going from South to North).
 * N = k x h (k is the Z-axis unit vector: [0, 0, 1])
 * @param {Vector3} r position vector
 * @param {Vector3} v velocity vector
 * @param {Vector3} h specific angular momentum
 * @returns {Vector3} n_vec 
 */
Game_Orbit.prototype.calculateNodeVector = function(r = 0, v = 0, h = 0)
{
	r = this.r(r);
	v = this.v(v);
	if(!h) h = this.calculateSpecificAngularMomentum(r, v);
	//k is the unit vector along the Z-axis
	const k = MAGPIE.PDL.GEOGRAPHY.K;
	// N  = k x h
	return k.cross(h)
}

Game_Orbit.prototype.calculateRAAN = function() //@todo
{
	const n_vec = this.calculateNodeVector();
	const n_mag = n_vec.mag();
	return this.raan(n_mag, n_vec)
}

Game_Orbit.prototype.argumentOfPeriapsis = function(n_vec, e_vec, n_mag, e)
{
	const TOLERANCE = 1e-9;
	const P2 = 2 * Math.PI;
	//
	if(e < TOLERANCE) return 0
	if(n_mag < TOLERANCE) return Math.atan2(e_vec._y, e_vec._x)
	const cos_w = n_vec.dot(e_vec) / (n_mag * e);
	const clamped_cos_w = this.clampValue(cos_w);
	let aop = Math.acos(clamped_cos_w);	
	//
	if(e_vec._z < 0) aop = P2 - aop;
	if(aop < 0) aop += P2;
	return aop
}

Game_Orbit.prototype.clampValue = function(value, clamp = 1)
{
	return Math.max(-clamp, Math.min(clamp, value))
}

/**
 * Solves Kepler's equation M = E - e*sin(E) for the eccentric anomaly E.
 * Uses Newton-Raphson iteration.
 * @param {number} M Mean anomaly (rad).
 * @param {number} e Eccentricity.
 * @returns {number} Eccentric anomaly E (rad).
 */
Game_Orbit.prototype.NRkeplerSolver = function(M, e)
{
	//normalize M to [-PI, PI]
	M = this.normalizeM(M);
	//initial guess for E
	let E = (e < 0.8) ? M : Math.PI;
	if(M > 0) E = M + e * Math.sin(M);
	else M = M - e * Math.sin(M);
	//
	let f = E - e * Math.sin(E) - M;
	let iter = 0;
	const TOLERANCE = 1e-12;
	const MAX_ITERATIONS = 100;
	//
	while (Math.abs(f) > TOLERANCE && iter < MAX_ITERATIONS)
	{
		let f_prime = 1 - e * Math.cos(E);
		E = E - f / f_prime;
		f = E - e * Math.sin(E) - M;
		iter++;
	}
	return E
}

/**
 * Converts Eccentric Anomaly (E) to True Anomaly (nu) using the robust atan2 method.
 * Ensures nu is calculated in the full 360-degree range.
 * @param {number} E Eccentric Anomaly (rad).
 * @param {number} ecc Eccentricity.
 * @returns {number} True Anomaly nu (rad) in [0, 2*PI).
 */
Game_Orbit.prototype.EtoNu = function(E, ecc)
{
	const cos_E = Math.cos(E);
	const sin_E = Math.sin(E);
	//
	//NUmerator of cos(nu) and sin(nu) equations
	const cos_nu_num = cos_E - ecc;
	const sin_nu_num = Math.sqrt(1 - ecc**2) * sin_E;
	//
	//Denominator of both equations (r/a)
	const denom = 1 - ecc * cos_E;
	//
	//True Anomaly nu using atan2(sin(nu), cos(nu))
	let nu = Math.atan2(sin_nu_num / denom, cos_nu_num / denom);
	//
	//Normalize to [0, 2PI)
	if(nu < 0) nu += 2 * Math.PI;
	//
	return nu
}

Game_Orbit.prototype.normalizeM = function(M)
{
	const P2 = 2 * Math.PI;
	M = M % P2;
	if(M > Math.PI) M -= P2;
	if(M < -Math.PI) M += P2;
	return M
}

/**
 * Converts Keplerian elements to state vectors (r, v) using True Anomaly.
 * @param {object} elements (a, e, i, raan, aop, nu).
 * @returns {object} The state vectors {r, v}.
 */
Game_Orbit.prototype.keplerianToVectors = function(elements)
{
	const { a, e, i, raan, aop, nu } = elements;
	const mu = this._mu;
	//
	//2. True Anomaly
	const cos_nu = Math.cos(nu);
	const sin_nu = Math.sin(nu);
	//
	//3. calculate position (r_p) and velocity (v_p) PQW
	const p = a * (1 - e**2); //semi-latus rectum
	const r_mag = p / (1 + e * cos_nu);
	//
	//position vector in PQW
	const p_x = r_mag * cos_nu;
	const p_y = r_mag * sin_nu;
	const r_p = new Game_Vector({x: p_x, y: p_y, z: 0});
	//
	//velocity components in PQW
	const h_mag = Math.sqrt(mu * p); 
	//
	const v_x = (mu / h_mag) * (-sin_nu);
	const v_y = (mu / h_mag) * (e * cos_nu);
	const v_p = new Game_Vector({x: v_x, y: v_y, z: 0});
	//
	//4. transformation matrix (PQW to ECI)
	const cos_o = Math.cos(raan);
	const sin_o = Math.sin(raan);
	const cos_i = Math.cos(i);
	const sin_i = Math.sin(i);
	const cos_w = Math.cos(aop);
	const sin_w = Math.sin(aop);
	//
	//Direction cosine Matrix (DCM) elements
	const R11 = cos_o * cos_w - sin_o * sin_w * cos_i;
	const R12 = -cos_o * sin_w - sin_o * cos_w * cos_i;
	//
	const R21 = sin_o * cos_w + cos_o * sin_w * cos_i;
	const R22 = -sin_o * sin_w + cos_o * cos_w * cos_i;
	//
	const R31 = sin_w * sin_i;
	const R32 = cos_w * sin_i;
	//
	//Rotation: r_ECI = R * r_p
	const r = new Game_Vector({
		x: R11 * r_p._x + R12 * r_p._y,
		y: R21 * r_p._x + R22 * r_p._y,
		z: R31 * r_p._x + R32 * r_p._y
	});
	//
	//Rotation: v_ECI = R * v_p
	const v = new Game_Vector({
		x: R11 * v_p._x + R12 * v_p._y,
		y: R21 * v_p._x + R22 * v_p._y,
		z: R31 * v_p._x + R32 * v_p._y
	});
	//
	return { r, v }
}

/**
 * Converts state vectors (r, v) to Keplerian elements with robust singularity and numerical stability checks.
 * @param {Vector3} r Position vector (km).
 * @param {Vector3} v Velocity vector (km/s).
 * @returns {object} { a, e, i, raan, aop, M }.
 */
Game_Orbit.prototype.vectorsToKeplerian = function(r = 0, v = 0)
{
	r = this.r(r);
	v = this.v(v);
	//
	//1. specific angular momentum (h)
	const h = this.calculateSpecificAngularMomentum(r, v);
	//
	//2. semi-major axis (a)
	const epsilon = this.calculateSpecificOrbitalEnergy(r, v);
	const a = this.calculateSemiMajorAxis(epsilon);
	//
	//3. eccentricity vector (e_vec) and eccentricity (e)
	const e_vec = this.calculateEccentricityVector(r, v, h)
	const e = e_vec.mag();
	//
	//4. inclination (i)
	const i = this.calculateInclinationRadians(h);
	//
	//5. Right Ascension of ascending node (RAAN / Omega)
	const raan = this.calculateUpperOmega(r, v);
	//
	//6. Argument of Periapsis (aop)
	const n_vec = this.calculateNodeVector(r, v, h);
	const n_mag = n_vec.mag();
	const aop = this.argumentOfPeriapsis(n_vec, e_vec, n_mag, e);
	//
	//7. Eccentric Anomaly (E)
	const E = this.calculateEccentricAnomaly(a, e, r, v);
	//
	//8. Mean Anomaly (M)
	const M = this.calculateMeanAnomalyFromE(E, e);
	//
	return { a, e, i, raan, aop, M }
}

/**
 * 
 * @param {Vector3} r 
 * @param {Vector3} v 
 * @returns {Vector3} h
 */
Game_Orbit.prototype.calculateSpecificAngularMomentum = function(r = 0, v = 0)
{
	if(!r) r = this._r;
	if(!v) v = this._v;
	return r.cross(v)
}

/**
 * 
 * @param {Vector3} r 
 * @param {Vector3} v 
 * @param {Vector3} h 
 * @returns {Vector3} e_vec
 */
Game_Orbit.prototype.calculateEccentricityVector = function(r = 0, v = 0, h = 0)
{
	if(!r) r = this._r;
	if(!v) v = this._v;
	if(!h) h = this.calculateSpecificAngularMomentum(r, v);
	const mu = this.mu();
	const r_hat = r.clone().normalize();
	const e_vec_term1 = new Game_Vector().crossVectors(v, h).multiplyScalar(1 / mu);
	return e_vec_term1.sub(r_hat)
}

/**
 * 
 * @param {Number} epsilon specific orbital energy 
 * @returns {Number} a 
 */
Game_Orbit.prototype.calculateSemiMajorAxis = function(epsilon = null)
{
	const mu = this.mu();
	if(isNaN(epsilon)) epsilon = this.epsilon();
	if(Math.abs(2 * epsilon) < 1e-9) return Infinity
	return -mu / (2 * epsilon)
}

/**
 * 
 * @param {Number} e dimensionless
 * @param {obj} e_vec Vector3
 * @param {obj} r Vector3
 * @param {Number} r_mag 
 * @param {obj} r_dot_v Vector3
 * @returns {Number} nu
 */
Game_Orbit.prototype.calculateTrueAnomalyFromVectors = function(e, e_vec, r, r_mag, r_dot_v)
{
	let nu = 0;
	const TOLERANCE = 1e-6;
	if(e > TOLERANCE)
	{
		nu = Math.acos(e_vec.dot(r)) / (e * r_mag);
		if(r_dot_v < 0) nu = 2 * Math.PI - nu;
	}
	else
	{
		nu = Math.acos(r._x / r_mag);
		if(r._y < 0) nu = 2 * Math.PI - nu;
	}
	return nu
}

/**
 * 
 * @param {Number} E Eccentric Anomaly {calculateEccentricAnomaly} 
 * @param {Number} e eccentricity (dimensionless)
 * @returns {Number} M
 */
Game_Orbit.prototype.calculateMeanAnomalyFromE = function(E, e)
{
	return E - e * Math.sin(E)
}
//#endregion








//#region management
/**
     * Refreshes the body's position and velocity vectors by propagating the orbit 
     * forward in time by 'dt' seconds.
     * @param {number} dt - The time step (seconds).
*/
Game_Orbit.prototype.refreshOrbit = function(dt = 0)
{
	this.self_check();
	let E0 = this.getOrbitalParameters();
	if(this._update) 
	{
		E0 = this.vectorsToKeplerian();
	}
	//1. advance the time
	this._epoch += dt;
	//
	//2. use the orbit's propagation function to get the new state
	const { state, E1 } = this.propagateOrbit(E0, dt);
	//
	//3. update the state
	this._r = state.r;
	this._v = state.v;
	if(this._update) this.updateOrbit();
	//
	// NOTE: For simplicity, we are assuming the orbit parameters (this.currentOrbit) 
	// DO NOT change unless a maneuver is performed. For true accuracy, you'd 
	// re-calculate the orbit object periodically, but for constant 'a' and 'e' orbits,
	// using the initial orbit object is correct.
	return E1
}

/**
 * Get current orbital parameters
 * @returns {object} { a, e, i, raan, aop, M }
 */
Game_Orbit.prototype.getOrbitalParameters = function()
{
	const kep = {
		a: this.a(), 
		e: this.ecc(),
		i: this.i(),
		raan: this.raan(),
		aop: this.aop(),
		M: this.M(),
	}
	return kep
}

Game_Orbit.prototype.updateOrbit = function()
{
	this.updateOrbitalParameters();
	this._update = false
}

Game_Orbit.prototype.updateOrbitalParameters = function()
{
	const kep = this.vectorsToKeplerian();
	this._a = kep.a;
	this._ecc = kep.e;
	this._raan = kep.raan;
	this._aop = kep.aop;
	this._inc = this.inc(null, kep.i);
	this._epsilon = this.calculateSpecificOrbitalEnergy(); 
	this._n = this.meanMotion();
	this._apo = this.calculateApoapsis();
	this._peri = this.calculatePeriapsis();
	this._period = this.calculatePeriod();
}

Game_Orbit.prototype.setupOrbit = function(kep = {})
{
	if(Object.entries(kep) < 1)
	{
		kep.a = this.a() || 0;
		kep.ecc = this.ecc() || 0;
		kep.inc = this.inc() || 0;
		kep.raan = this.raan() || 0;
		kep.aop = this.aop() || 0;
	}
	if(this?.t_since_periapsis) 
	{
		this._epoch = this.t_since_periapsis;
		delete this.t_since_periapsis;
	}
	if(!this?._epoch) this._epoch = kep?.epoch || 0;
	const a = kep.a;
	this._period = this.period(a);
	const e = kep.ecc;
	const i = kep.inc;
	const raan = kep.raan;
	const aop = kep.aop;
	const M = this.calculateMeanAnomaly();
	const E0 = [a, e, i, raan, aop, M];
	const E1 = this.keplerianToVectors(E0);
	this._r = E1.r;
	this._v = E1.v;
	this.updateOrbit();
}

Game_Orbit.prototype.self_check = function(kep = {})
{
	const p = {}
	p.a = this?._a;
	p.r = this?._r;
	p.v = this?._v;
	p.e = this?._e;
	p.epoch = this?._epoch;
	const invalid = Object.values(p).some(v => !v)
	if(!invalid) return true
	const inv = Object.entries(p).filter(e => !e[1]);
	console.log(`${this._parent} ${this.constructor.name} ${inv} invalid. Setting up...`);
	this.setupOrbit(kep);
}
//#endregion







//#region methods
/**
     * Re-initializes the orbit object after a maneuver (e.g., a thruster burn).
     * @param {Vector3} dv_vector - The Delta-V vector applied (m/s).
*/
Game_Orbit.prototype.performManeuver = function(dv_vector)
{
	//update velocity
	this._v = this._v.add(dv_vector);
	//
	//recalculate the orbit based on the new state vectors (r and v)
	this.updateOrbit();
}

/**
 * 
 * @param {Number} epoch [orbit._epoch] t₀ total time (s)
 * @param {Number} period [orbit._period] P (s)
 * @returns 
 */
Game_Orbit.prototype.getEffectiveTime = function(epoch, period)
{
	return epoch % period
}

/**
 * 
 * @returns {Number} T1 (s)
 */
Game_Orbit.prototype.progress = function()
{
	const T0 = this._epoch;
	const P = this._period;
	return this.getEffectiveTime(T0, P)
}

Game_Orbit.prototype.fraction = function()
{
	return Number((this.progress() / this._period).toFixed(3))
}

Game_Orbit.prototype.timeToApo = function()
{
	const t = this.progress();
	const T = this._period;
	const Mc = this.calculateMeanAnomaly(t);
	const Ma = Math.PI;
	let Mt = (Ma - Mc + 2 * Math.PI) % (2 * Math.PI);
	const Tr = (Mt / (2 * Math.PI)) * T;
	return Tr
}

Game_Orbit.prototype.timeToPeri = function()
{
	const t = this.progress()
	const T = this._period;
	if(T <= 0) return 0
	const Mc = this.calculateMeanAnomaly(t);
	const Mp = 2 * Math.PI;
	let Mt = (Mp - Mc) % Mp;
	const Tr = (Mt / Mp) * T;
	return Tr
}

Game_Orbit.prototype.apoapsis = function()
{
	const R = this.mainBody()._radius * 1000;
	return Math.ceil(this._apo - R)
}

Game_Orbit.prototype.periapsis = function()
{
	const R = this.mainBody()._radius * 1000;
	return Math.ceil(this._peri - R)
}

Game_Orbit.prototype.full_apse = function(apse)
{
	const R = this.mainBody()._radius * 1000;
	return Math.round(apse + R)
}
//#endregion


//#endregion







//#region planet

function Game_Planet(data = {})
{
	this.initialize(data);
}
Game_Planet.prototype = Object.create(Game_Celestial.prototype);
Game_Planet.prototype.constructor = Game_Planet;
Game_Planet.prototype.initialize = function(data)
{
	data.type = "planet";
	Game_Celestial.prototype.initialize.call(this, data);
	this.meta = "Game_Planet";
	this._type = data.type;
	this._satellites = data?.satellites || []
}

Game_Planet.prototype.addMoon = function(data)
{
	data.parent = [this._type, this.ID, this._name];
	let moon = $PDL.moon.add(new Game_Moon(data));
	this.satellites.push(["moon", moon.ID, moon._name]);
	return this.satellites[this._satellites.length - 1]
}

Game_Planet.prototype.star = function()
{
	return Game_Celestial.prototype.call(this)
}

Game_Planet.prototype.latitudes = function()
{
	let tropics = [0,this._axialTilt];
	let polar = [90 - this._axialTilt,90];
	return {tropics: tropics, polarCircle: polar}
}
//#endregion







//#region satellite
function Game_Satellite(data)
{
	this.initialize(data);
}
Game_Satellite.prototype.initialize = function(data)
{
	this._name = data?.name;
	this._type = data?.type;
	this._parent = data?.parent || [undefined, undefined, undefined];
}
//#endregion






//#region Moon
function Game_Moon(data = {})
{
	this.initialize(data);
}
Game_Moon.prototype = Object.create(Game_Celestial.prototype);
Game_Moon.prototype.constructor = Game_Moon;
Game_Moon.prototype.initialize = function(data)
{
	Game_Celestial.prototype.initialize.call(this, data);
	this.meta = "Game_Moon";
	this._type = "moon";
	if(!this._parent) console.warn(`No parent set for moon '${this._name}'`)
}
//#endregion






//#region asteroid

function Game_Asteroid(data = {name: ""})
{
	this.initialize(data);
}
Game_Asteroid.prototype = Object.create(Game_Celestial.prototype);
Game_Asteroid.prototype.constructor = Game_Asteroid;
Game_Asteroid.prototype.initialize = function(data)
{
	data.type = "asteroid";
	Game_Celestial.prototype.initialize.call(this, data);
	this.meta = "Game_Asteroid";
	this._type = data.type;
}

//#endregion







//#region asteroid belt

function Game_AsteroidBelt(data)
{
	this.initialize(data);
}
Game_AsteroidBelt.prototype = Object.create(Game_Celestial.prototype);
Game_AsteroidBelt.prototype.constructor = Game_AsteroidBelt;
Game_AsteroidBelt.prototype.initialize = function(data)
{
	Game_Celestial.prototype.initialize.call(this, data);
	this.meta = "Game_AsteroidBelt";
	this._celestials = [];
}

Game_AsteroidBelt.prototype.addAsteroid = function(data)
{
	let asteroid = new Game_Asteroid(data);
	let ID = $PDL.asteroid.add(asteroid).ID;
	return this._celestials.push(["asteroid", ID, asteroid._name])
}
//#endregion





//#region kuiper belt

function Game_KuiperBelt(data)
{
	this.initialize(data);
}
Game_KuiperBelt.prototype = Object.create(Game_AsteroidBelt.prototype);
Game_KuiperBelt.prototype.constructor = Game_KuiperBelt;
Game_KuiperBelt.prototype.initialize = function(data)
{
	Game_AsteroidBelt.prototype.initialize.call(this, data);
	this.meta = "Game_KuiperBelt";
}

Game_KuiperBelt.prototype.addComet = function(data)
{
	let comet = new Game_Comet(data);
	let cometID = $PDL.asteroid.add(comet).ID
	this._satellites.push([comet._type, cometID, comet._name]);
}

Game_KuiperBelt.prototype.comets = function()
{
	if(this._satellites.length < 1) return
	return this._satellites.filter(c => c[0] === "comet")
}

Game_KuiperBelt.prototype.comet = function(index)
{
	let comet = this.comets()[index - 1];
	if(!comet) return
	return $PDL.asteroid.getElementByID(comet[1])
}

Game_KuiperBelt.prototype.addPlanetoid = function(data)
{
	let planetoid = new Game_Planet(data)
	let ID = $PDL.planet.add(planetoid).ID;
	return this._satellites.push(["planetoid", ID, planetoid._name])
}

Game_KuiperBelt.prototype.planetoids = function()
{
	if(this._satellites.length < 1) return
	return this._satellites.filter(c => c[0] === "planet")
}

Game_KuiperBelt.prototype.planetoid = function(index)
{
	let planetoid = this.planetoids()[index]
	if(!planetoid) return
	return $PDL.planet.getElementByID(planetoid[1])
}

//#endregion





//#region comet

function Game_Comet(data)
{
	this.initialize(data);
}
Game_Comet.prototype = Object.create(Game_Asteroid.prototype);
Game_Comet.prototype.constructor = Game_Comet;
Game_Comet.prototype.initialize = function(data)
{
	Game_Asteroid.prototype.initialize.call(this, data);
	this.meta = "Game_Comet";
}

//#endregion





//#region star
function Game_Star(data = {})
{
	this.initialize(data);
}
Game_Star.prototype = Object.create(Game_Celestial.prototype);
Game_Star.prototype.constructor = Game_Star;
Game_Star.prototype.initialize = function(data)
{
	Game_Celestial.prototype.initialize.call(this, data);
	this.meta = "Game_Star";
	this._type = "star";
}

Game_Star.prototype.system = function()
{
	return $PDL.universe[this._name]
}
//#endregion





//#region starSystem
function Game_StarSystem(data = {name: "", celestials: []})
{
	this.initialize(data);
}

Game_StarSystem.prototype.initialize = function(data)
{
	this.meta = "Game_StarSystem";
	this._name = `${data.name} system`;
	this._celestials = data.celestials || [];
	if(this._celestials.length < 1) 
	{
		let ID = $PDL.star.add(new Game_Star({name: data.name})).ID;
		this._celestials[0] = [SHELDEX.GEO.STAR, ID, data.name];
	}
}

Game_StarSystem.prototype.star = function()
{
	return this.celestial(0)
}

Game_StarSystem.prototype.addCelestial = function(element, index)
{
	let type = element._type;
	let ID = $PDL[element._type].add(element).ID;
	this._celestials[index] = [type, ID, element._name];
	return this._celestials[index]
}

Game_StarSystem.prototype.addPlanet = function(planet, index)
{
	if(this.planet(index)) 
	{
		console.warn(`${this._name} already has a planet at index ${index}!`);
		return false
	} 
	planet._parent = this._name;
	planet._parentID = this.ID;
	planet._parentType = "star";
	let ID = $PDL.planet.add(planet).ID;
	let type = planet._type;
	if(this._celestials.length > 1 && this._celestials[index])
	{
		console.warn(`${this._name} already has a celestial at index ${index}!`)
	}
	this._celestials[index] = [type, ID, planet._name];
	return this._celestials[index]
}

Game_StarSystem.prototype.celestial = function(index)
{
	let type = this._celestials[index][0];
	let ID = this._celestials[index][1];
	return $PDL[type].getElementByID(ID)
}

Game_StarSystem.prototype.planets = function()
{
	return this._celestials
		.filter(c => c[0] === "planet")
}

Game_StarSystem.prototype.planet = function(index)
{
	if(this._celestials.length < 1) return false
	if(!this.planets()[index - 1]) return false
	let ID = this.planets()[index - 1][1];
	if(isNaN(ID)) return false
	return $PDL.planet.getElementByID(ID)
}

Game_StarSystem.prototype.export = function(filename)
{
	let system_data = []
	for(let i = 0; i < this._celestials.length; i++)
	{
		let data = this.celestial(i).makeExportData();
		system_data.push(data);
	}
	MAGPIE.SYS.data.writeJSON(filename, system_data);
}

Game_StarSystem.prototype.setupSystem = function()
{
	this._celestials.forEach((c, index) => {
		const body = this.celestial(index);
		body._orbit.setupOrbit();
		if(body._satellites.length > 0)
			body._satellites.forEach((s, index) => {
				body.satellite(index)._orbit.setupOrbit()
			})

	})
}

/**
     * Propagates all bodies in the system forward by a time step dt.
     * @param {number} dt - Time step in seconds.
*/
Game_StarSystem.prototype.propagate = function(dt)
{
	this.currentTime += dt;
	this._celestials.forEach((c, index) => this.celestial(index).propagate(dt));
}
//#endregion





//#region universe
function Game_Universe()
{
	this.initialize(...arguments);
}
Game_Universe.prototype.initialize = function()
{
	this.meta = "Game_Universe";
}

Game_Universe.prototype.propagate = function(dt)
{
	Object.entries(this).forEach(e => {
		if(e[1]?.constructor?.name === "Game_StarSystem") this[e[0]].propagate(dt);
	})
	this.totalT += dt
}

Game_Universe.prototype.refresh = function()
{
	this.propagate($TIME.timescale)
}

Game_Universe.prototype.reset = function()
{
	this.totalT = $PDL.universe.Shel.celestial(0)._orbit._epoch;
	this.propagate(-this.totalT);
	const dt = Math.ceil($TIME.accurateGameday() * 24 * 60 * 60);
	this.propagate(dt)
}

// Game_Universe.prototype.importSystem = function(filename)
// {
// 	let data = MAGPIE.SYS.readJSON(filename);
// 	if(data?.meta == "Game_StarSystem") 
// 	{
// 		let star = data._celestials[0]._name;
// 		this[star] = data;
// 	}
// }
//#endregion






//#endregion







//------------------------------------------------------------------------
//#region SYSTEM

function HIMS_Geography()
{
	this.initialize(...arguments);
}
HIMS_Geography.prototype = Object.create(HIMS_GameSystem.prototype);
HIMS_Geography.prototype.constructor = HIMS_Geography;
HIMS_Geography.prototype.initialize = function()
{
	HIMS_GameSystem.prototype.initialize.call(this);
	this.meta = MAGPIE.addons.Geography.meta;
	this.meta.isGuest = true;
	this._name = "MAGPIE_Geography";
	this.isInit = true;
	this.isActive = false;
	this.SETTINGS = MAGPIE.PDL.GEOGRAPHY.SETTINGS || {};
}

HIMS_Geography.prototype.here = function()
{
	const territory = $gameVariables.value(SHELDEX.VARIABLE.TERRITORY);
	return $PDL.territory.getElementByID(territory)
}

HIMS_Geography.prototype.celestial = function()
{
	return this.here().region().parent()
}

HIMS_Geography.prototype.g = function(g = 0)
{
	if(!g) return this.celestial()._gravity
	return g
}

HIMS_Geography.prototype.refresh = function()
{
	// console.time(`${this._name}_cycle`);
	if(!this.isInit) return false
	$PDL.universe.refresh();
	// console.timeEnd(`${this._name}_cycle`)
	return true
}

HIMS_Geography.prototype.awake = function()
{
	try {
		MAGPIE_Firmware.prototype.awake.call(this);
		this.isActive = true;
		this.refresh();
		const proxy = this.proxyUp();
		if(!this.isActive) return
		$MAGPIE.RUNTIME.addGuest(MAGPIE.CODE.RUNTIME.GUEST.SUPER, proxy)
	} catch (error) {
		console.warn(error)
	}
}
//#endregion





//------------------------------------------------------------------------
//#region RUNTIME





//#region Biomes

MAGPIE.PDL.GEOGRAPHY.BIOME.STEPPE = new Game_Biome({
	name: "steppe",
	climate: MAGPIE.PDL.GEOGRAPHY.CLIMATE.MILD, 
	humidity: MAGPIE.PDL.GEOGRAPHY.HABITAT.ARID,
	battleback: MAGPIE.PDL.GEOGRAPHY.BIOME.ENEMY.STEPPE,
	commonHabitat: MAGPIE.PDL.GEOGRAPHY.HABITAT.SHRUB,
	uncommonHabitat: MAGPIE.PDL.GEOGRAPHY.HABITAT.MEADOW,
	rareHabitat: MAGPIE.PDL.GEOGRAPHY.HABITAT.TREE,
	uniqueHabitat: MAGPIE.PDL.GEOGRAPHY.HABITAT.REEDS,
	enemyID: MAGPIE.PDL.GEOGRAPHY.BIOME.ENEMY.STEPPE
});

MAGPIE.PDL.GEOGRAPHY.BIOME.WOODS = new Game_Biome({
	name: "woods",
	climate: MAGPIE.PDL.GEOGRAPHY.CLIMATE.MILD,
	humidity: MAGPIE.PDL.GEOGRAPHY.HABITAT.HUMID,
	battleback: MAGPIE.PDL.GEOGRAPHY.BIOME.ENEMY.WOODS,
	commonHabitat: MAGPIE.PDL.GEOGRAPHY.HABITAT.TREE,
	uncommonHabitat: MAGPIE.PDL.GEOGRAPHY.HABITAT.SHRUB,
	rareHabitat: MAGPIE.PDL.GEOGRAPHY.HABITAT.UNDEGROWTH,
	uniqueHabitat: MAGPIE.PDL.GEOGRAPHY.HABITAT.MEADOW,
	enemyID: MAGPIE.PDL.GEOGRAPHY.BIOME.ENEMY.WOODS
});

//#endregion




MAGPIE.PDL.GEOGRAPHY._Game_System_initialize = Game_System
	.prototype.initialize;
Game_System.prototype.initialize = function()
{
	MAGPIE.PDL.GEOGRAPHY._Game_System_initialize.call(this);
	MAGPIE.PDL.GEOGRAPHY.isInit = true;
}

MAGPIE.PDL.GEOGRAPHY._Runtime_awake = MAGPIE_Runtime.prototype.awake;
MAGPIE_Runtime.prototype.awake = function()
{
	MAGPIE.PDL.GEOGRAPHY._Runtime_awake.call(this);
	if($ShelderEvo?.SHELGEO)
		$ShelderEvo.SHELGEO.awake();
}

//#endregion



//end of plugin