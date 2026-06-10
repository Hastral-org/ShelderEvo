//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_6] v0.1.2 ShelderEvo_Colonization
 * @author Matheraptor
 * 
 * @help
 * v0.1.1 SHELDER EVOLUTION - COLONIZATION (SHELCOL)
 * 
 * 
 * -----------------------------------------------------------------------
 * CHANGELOG
 * -----------------------------------------------------------------------
 * v0.1.2 
 * - MAGPIE_SYS v0.11.2 conformity update
 * 
 * v0.1.1 - plugin structure redesign
 * 
 * v0.1.0 - initial build
 */
//#endregion







//-----------------------------------------------------------------------------------------------
//#region INIT
var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.11.2";
MAGPIE.ShelderEvo.version = MAGPIE.ShelderEvo.version || "0.4.7";
MAGPIE.ShelderEvo.Colonization = {};
MAGPIE.ShelderEvo.Colonization.version = "0.1.2"; 
MAGPIE.ShelderEvo.Colonization.tier = 6;
MAGPIE.ShelderEvo.Colonization.pluginName = "ShelderEvo_Colonization";
MAGPIE.ShelderEvo.Colonization.meta = {
	name: "Shelder Evolution: Colonization",
	isAddon: true,
	firmware: "20251105",
	firmwareFile: `${MAGPIE.ShelderEvo.Colonization.pluginName}.js`
};
//#endregion






//-----------------------------------------------------------------------------------------------
//#region CODE

SHELDEX.SHELCOL = {};
SHELDEX.SHELCOL.meta = {
	isCypher: true, 
	name: MAGPIE.ShelderEvo.Colonization.meta.name
};

//#endregion





//------------------------------------------------------------------------
//#region COMMODITY

MAGPIE.ShelderEvo.Colonization.Commodity = {};
MAGPIE.ShelderEvo.Colonization.Commodity.meta = {
	isAddon: true,
	name: "Commodity expansion"
};

//#region propulsion
MAGPIE.CODE.COMMODITY.MODULE.PROPULSION = {};
MAGPIE.CODE.COMMODITY.MODULE.PROPULSION.meta = {isModule: true, properties: [
	"input/propellants [[RESOURCE.ID, L/s]]",
	"output/exhaust [[RESOURCE.ID, L/s]]",
	"force in N",
	"idle throttle in %",
	"spool in s",
	"specific impulse in s",
	"thrust in N"
]}
function Commodity_Propulsion(data = {})
{
	this.initialize(data);
}
Commodity_Propulsion.prototype = Object.create(Commodity_Engine.prototype);
Commodity_Propulsion.prototype.constructor = Commodity_Propulsion;
Commodity_Propulsion.prototype.initialize = function(data)
{
	Commodity_Engine.prototype.initialize.call(this, data);
	this._properties.concat(data?.SI, data?.thrust)
}
//#endregion





//------------------------------------------------------------------------
//#region vessel

MAGPIE.CODE.COMMODITY.MODULE.VESSEL = {};
MAGPIE.CODE.COMMODITY.MODULE.VESSEL.meta = {isModule: true, properties: []}
function Commodity_Vessel(data = {})
{
	this.initialize(data);
}
Commodity_Vessel.prototype = Object.create(Commodity_Vehicle.prototype);
Commodity_Vessel.prototype.constructor = Commodity_Vessel;
Commodity_Vessel.prototype.initialize = function(data)
{
	Commodity_Vehicle.prototype.initialize.call(this, data);
}
Commodity_Vessel.prototype.thrust = function()
{
	let thrust = 0;
	this.engines().forEach((e, index) => {
		if(this._properties[2][index][2] === 0)
			thrust += e._module.propulsion.thrust()
	})
	return thrust
}
Commodity_Vessel.prototype.TWR = function(g = 0)
{
	const t = this.thrust();
	const M = this._properties[1];
	const G = $ShelderEvo.SHELGEO.g(g)
	return t / (M * G)
}

Commodity_Vessel.prototype.acceleration = function(throttle = 1, g = 0)
{
	return throttle * this.TWR(g) * $ShelderEvo.SHELGEO.g(g)
}

Commodity_Vessel.prototype.dV = function(g = 0)
{
	const ISP = this.ISP();
	const G = $ShelderEvo.SHELGEO.g(g);
	const M1 = this.wetMass();
	const M2 = M1 - this.propMass();
	return Math.floor(ISP * G * Math.log(M1 / M2))
}

Commodity_Vessel.prototype.burnTime = function(rate = 1)
{
	return this.dV() / this.acceleration()
}
//#endregion





//------------------------------------------------------------------------
//#region Newton Nav
MAGPIE.CODE.COMMODITY.MODULE.NNAV = {};
MAGPIE.CODE.COMMODITY.MODULE.NNAV.meta = {isModule: true, properties: [
	"name",
	"tech"
]}
function Commodity_NNav(data = {})
{
	this.initialize(data);
}
Commodity_NNav.prototype = Object.create(Commodity_Module.prototype);
Commodity_NNav.prototype.constructor = Commodity_NNav;
Commodity_NNav.prototype.initialize = function(data)
{
	Commodity_Module.prototype.initialize.call(this, data);
	this._properties.push(data?.tech);
}

Commodity_NNav.prototype.tech = function()
{
	return $MAGPIE.RESOURCE.getElementByID(this._properties[1])
}

Commodity_NNav.prototype.orbit = function()
{
	const orbit = this.owner()?._position[2]
	if(!orbit || orbit.constructor.name !== "Game_Orbit") return
	return orbit
}

Commodity_NNav.prototype.standardBurnTime = function(dV, TWR, g = 0)
{
	return Math.round(dV / (TWR * $ShelderEvo.SHELGEO.g(g)))
}

Commodity_NNav.prototype.BrachiTripDuration = function(trip, cruise)
{
	const D = trip;
	const T = cruise;
	return Math.round(Math.sqrt((D * 4) / T))
}

Commodity_NNav.prototype.BrachiTripDV = function(trip, cruise)
{
	const d = trip;
	const T = cruise;
	return Math.round(d * T)
}

/**
	 * Calculates the velocity required for a perfect circular orbit at a given radius r.
	 * @param {number} r - Radial distance (meters).
	 * @returns {number} Circular velocity (m/s).
*/
Commodity_NNav.prototype.calculateCircularVelocity = function(r, orbit)
{
	if(r <= 0) return 0
	return Math.sqrt(orbit._mu / r)
}

/**
	 * Calculates the Delta-V needed to circularize the orbit at the current position.
	 * NOTE: This assumes the burn is instantaneous and perfectly tangential to the flight path.
	 * @returns {number} The required Delta-V (m/s).
*/
Commodity_NNav.prototype.calculateCircularizeDeltaV = function(orbit)
{
	const r_current = orbit._r.mag();
	const V_current = orbit._v.mag();
	const V_circular = this.calculateCircularVelocity(r_current, orbit);
	// The required Delta-V is the absolute difference between the two speeds.
	return Math.abs(V_circular - V_current)
}

Commodity_NNav.prototype.calculateVisVivaVelocity = function(r, a, mu)
{
	// Check for non-physical parameters (like negative semi-major axis for a closed orbit)
	if(r <= 0 || a <= 0) return 0;

	// Check for edge case (like parabolic/hyperbolic, where 1/a may be zero or negative)
		// For a closed orbit: 2/r - 1/a must be > 0
	const term = (2 / r) - (1 / a);
	// If term is negative, it implies a hyperbolic orbit where the velocity would be imaginary
	// At this point, you'd calculate hyperbolic velocity, but for now we return 0 for simplicity.
	if(term < 0) return 0
	return Math.sqrt(mu * term)
}

/**
     * Calculates the total Delta-V required for a Hohmann Transfer between two circular orbits.
     * * NOTE: This assumes the current orbit is perfectly circular (e=0) with radius r1.
     * If the current orbit is elliptical, you must perform the burn at periapsis/apoapsis
     * to ensure the burn is purely tangential.
     * * @param {number} r_target - The radius of the final, circular target orbit (meters).
     * @returns {{deltaV_total: number, deltaV1: number, deltaV2: number}} The required Delta-V values.
*/
Commodity_NNav.prototype.calculateHohmannDeltaV = function(r_target)
{
	const orbit = this.orbit();
	const r1 = orbit._r.mag();
	const mu = orbit._mu;
	//
	// 1. Calculate the Semi-Major Axis of the elliptical transfer orbit
	const a_transfer = (r1 + r_target) / 2;
	//
	//2. Calculate the required velocity for the first burn (Burn 1 - V_transfer at r1)
	const V_circ_1 = this.calculateCircularVelocity(r1, orbit);
	const V_transfer_1 = this.calculateVisVivaVelocity(r1, a_transfer, mu);
	//
	//Delta V 1: Burn to enter the transfer ellipse
	const dV_1 = Math.abs(V_transfer_1 - V_circ_1);
	//
	//3. Calculate the required velocity for the second burn (Burn 2 - V_transfer at r_target)
	const V_circ_2 = this.calculateCircularVelocity(r_target, orbit);
	const V_transfer_2 = this.calculateVisVivaVelocity(r_target, a_transfer, mu);
	//
	//Delta V 2: burn to circularize at the target orbit radius	
	const dV_2 = Math.abs(V_circ_2 - V_transfer_2);
	//
	const dV_total = dV_1 + dV_2;

	return {
		total: dV_total,
		outbound: dV_1,
		inbound: dV_2 
	}
}

/**
     * Convenience method to get the velocity of the current orbit at a specific radius.
     * @param {number} r - Radial distance from the central body (meters).
     * @returns {number} The velocity of the current orbit at radius r (m/s).
*/
Commodity_NNav.prototype.getOrbitVelocityAtRadius = function(r)
{
	const mu = this.orbit()._mu;
	const a = this.orbit()._a;
	return this.calculateVisVivaVelocity(r, a, mu)
}

/**
     * Calculates the Delta-V needed to circularize the orbit at the specified burn radius.
     * This is typically used at Apoapsis (r_a) or Periapsis (r_p).
     * Delta-V = |V_circular - V_current_orbit|
     * @param {number} r_burn - The radius at which the burn will occur (meters).
     * @returns {number} The required Delta-V (m/s).
*/
Commodity_NNav.prototype.calculateCircularizeAtRadiusDeltaV = function(r_burn)
{
	const orbit = this.orbit();
	const mu = orbit._mu;
	//
	//1. calculate the velocity of the CURRENT orbit at the burn radius
	const V_orbit = this.getOrbitVelocityAtRadius(r_burn);
	//
	//2. calculate the velocity required for a CIRCULAR orbit at the burn radius
	const V_circular = this.calculateCircularVelocity(r_burn, orbit);
	//
	//3. delta-V is the absolute difference between the two speeds
	return Math.abs(V_circular - V_orbit)
}

/**
     * Calculates the Delta-V needed to change the inclination of the orbit.
     * Formula: Delta-V = 2 * V_burn * sin(Delta_i / 2)
     * Note: This is most efficient at the highest point (Apoapsis) where V is minimum.
     * @param {number} target_inc - The desired final inclination (degrees).
     * @param {number} r_burn - The radius (distance from center) at which the burn occurs (meters).
     * @returns {number} The required Delta-V (m/s).
*/
Commodity_NNav.prototype.calculateInclinationChangeDeltaV = function(target_inc, r_burn)
{
	//1. calculate the current velocity at the burn radius (V)
	const orbit = this.orbit();
	const V_burn = this.getOrbitVelocityAtRadius(r_burn)
	//
	//2. calculate the change in inclination (Delta_i)
	const current_inc = orbit._inc;
	const delta_i = Math.abs(target_inc - current_inc);
	//
	//3. convert delta_i to radians
	const delta_i_rad = delta_i * (Math.PI / 180);
	//
	//4. apply the delta_V formula
	//Delta_V = 2 * V_burn * sin(Delta_i / 2)
	const dV = 2 * V_burn * Math.sin(delta_i_rad / 2);
	//
	return dV
}

/**
     * Calculates the Delta-V needed for a combined change in Inclination (i) and RAAN (Omega, Ω)
     * at a single, specified burn radius.
     * Formula: Delta-V = 2 * V_burn * sin(Delta_theta / 2), where Delta_theta is the total plane angle change.
     * * @param {number} target_inc - The desired final inclination (degrees).
     * @param {number} target_raan - The desired final RAAN (degrees).
     * @param {number} r_burn - The radius (distance from center) at which the burn occurs (meters).
     * @returns {number} The required Delta-V (m/s).
*/
Commodity_NNav.prototype.calculateCombinedPlaneChangeDeltaV = function(target_inc, target_raan, r_burn)
{
	//convert current/target elements to radians
	const kep = this.orbit().getKeplerianElements();
	//
	const i1_rad = kep.i_rad;
	const o1_rad = kep.raan;
	const i2_rad = target_inc * (Math.PI / 180);
	const o2_rad = target_raan * (Math.PI / 180);
	//
	//1. calculate the angle between the two orbit planes (delta theta)
	//cos(delta_theta) = cos(i1)cos(i2) + sin(i1)sin(i2)cos(o2 - o1)
	const delta_omega_rad = o2_rad - o1_rad;
	const cost_delta_theta = (
		Math.cos(i1_rad) * Math.cos(i2_rad) + 
		Math.sin(i1_rad) * Math.sin(i2_rad) * Math.cos(delta_omega_rad)
	);
	//
	//clamp the value
	const clamped_cos_delta_theta = Math.max(-1, Math.min(1, cost_delta_theta));
	const delta_theta_rad = Math.acos(clamped_cos_delta_theta);
	//
	//2. calculate the current velocity at the burn radius (V_burn)
	const V_burn = this.getOrbitVelocityAtRadius(r_burn);
	//
	//3. apply the general plane change dV formula
	const dV = 2 * V_burn * Math.sin(delta_theta_rad / 2);
	return dV
}


/**
     * Calculates the Delta-V needed for a single burn to target a new Apoapsis or Periapsis
     * while the burn radius remains fixed.
     * @param {number} r_burn - The radius at which the burn occurs (meters). This radius is fixed.
     * @param {number} r_target - The desired new radius for the opposite side of the orbit (meters).
     * @returns {number} The required Delta-V (m/s).
*/
Commodity_NNav.prototype.calculateTargetRadiusDeltaV = function(r_burn, r_target)
{
	const orbit = this.orbit();
	const mu = orbit._mu;
	//
	//1. calculate the semi-major axis of the NEW orbit (a_new)
	const a_new = (r_burn + r_target) / 2;
	//
	//2. calculate the required velocity for the NEW orbit at the burn radius (V_new)
	//V_new uses the Vis-Viva equation with the new semi-major axis (a_new)
	const V_new = this.calculateVisVivaVelocity(r_burn, a_new, mu);
	//
	//3. calculate the velocity of the CURRENT orbit at the burn radius (V_current)
	const V_current = this.getOrbitVelocityAtRadius(r_burn);
	//
	//4. Delta-V is the absolute difference between the two speeds
	return Math.abs(V_new - V_current)
}

Commodity_NNav.prototype.dVforApoChange = function(ra_new)
{
	const orbit = this.orbit();
	const mu = orbit._mu;
	const rp_old = orbit._peri;
	//1. calculate a
	const a_old = orbit._a;
	const a_new = (ra_new + rp_old) / 2;
	//
	//2. calculate the old V at burn
	const v_p_old = Math.sqrt(mu * ((2 / rp_old) - (1 / a_old)));
	//
	//3. calculate the new V required at burn
	const v_p_new = Math.sqrt(mu * ((2 / rp_old) - (1 / a_new)));
	//
	//4. dV is the absolute difference in V
	return Math.abs(v_p_new - v_p_old)
}

Commodity_NNav.prototype.dVforPeriChange = function(rp_new)
{
	const orbit = this.orbit();
	const mu = orbit._mu;
	const ra_old = orbit._apo;
	//1. calculate a
	const a_old = orbit._a;
	const a_new = (ra_old + rp_new) / 2;
	//
	//2. calculate the old velocity at burn
	const v_a_old = Math.sqrt(mu * ((2 / ra_old) - (1 / a_old)));
	//
	//3. calculate the new V required at burn
	const v_a_new = Math.sqrt(mu * ((2 / ra_old) - (1 / a_new)));
	//
	//4. dV is the absolute difference
	return Math.abs(v_a_new - v_a_old)
}

//#endregion







//------------------------------------------------------------------------
//#region Newton Planner

MAGPIE.CODE.COMMODITY.MODULE.NPLANNER = {};
MAGPIE.CODE.COMMODITY.MODULE.NPLANNER.meta = MAGPIE.CODE.COMMODITY.MODULE.NNAV.meta;

function Commodity_NPlanner(data = {})
{
	this.initialize(data);
}
Commodity_NPlanner.prototype = Object.create(Commodity_NNav.prototype);
Commodity_NPlanner.prototype.constructor = Commodity_NPlanner;
Commodity_NPlanner.prototype.initialize = function(data)
{
	Commodity_NNav.prototype.initialize.call(this, data);
}

//#region rendezvous
/**
     * Calculates the time taken to traverse an elliptical transfer orbit, usually half the period.
     * @param {number} r1 - Starting radius (meters).
     * @param {number} r2 - Ending radius (meters).
     * @returns {number} The half-period of the transfer orbit (seconds).
*/
Commodity_NPlanner.prototype.calculateTransferTime = function(r1, r2)
{
	const orit = this.orbit();
	//semi-major axis of the transfer ellipse
	const a_transfer = (r1 + r2) / 2;
	//
	// Transfer time
	return Math.PI * Math.sqrt(Math.pow(a_transfer, 3) / mu)
}

/**
     * Calculates the required phase angle (angular lead) of the target for a successful
     * Hohmann intercept. Assumes co-planar circular orbits.
     * Formula: Required Lead Angle = PI - (n_target * t_transfer)
     * @param {number} target - the target object
     * @returns {number} The required angular separation (lead) of the target in radians [0, 2*PI).
*/
Commodity_NPlanner.prototype.calculateRendezvousPhaseAngle = function(target)
{
	const orbit = this.orbit();
	const r_target = target._orbit._a;
	const n_target = target._orbit._n;
	//
	const r1 = orbit._r.mag(); //start radius (assumed circular)
	//
	//1. calculate the time taken for the spacecraft to complete the transfer
	const t_transfer = this.calculateTransferTime(r1, r_target);
	//
	//2. calculate the angle the target will travel during the transfer time
	const angle_travel = n_target * t_transfer;
	//
	//3. the target must *lead* the spacecraft's starting burn point by enough
	//angle such that its position + the angle it travels lands it exactly on
	// the other side (PI radians)
	let required_lead_angle = Math.PI - angle_travel;
	//
	//4. normalize the result to the range
	let normalized_angle = required_lead_angle % (2 * Math.PI);
	if(normalized_angle < 0) normalized_angle += 2 * Math.PI;
	return normalized_angle
}

/**
     * Calculates the Delta-V needed for an immediate, full velocity match (i.e., final rendezvous or capture burn).
     * This requires matching both speed and direction of the target.
     * Delta-V = |V_target - V_current| (vector magnitude)
     * @param {Vector3} target_v - The target's velocity vector (m/s).
     * @returns {number} The required Delta-V (m/s).
*/
Commodity_NPlanner.prototype.calculateVelocityMathDeltaV = function(target_v)
{
	const orbit = this.orbit();
	//V_current is the velocity of the spacecraft at the current position
	const V_current = orbit._v;
	//dV vector is the difference: V_target - V_current
	const dV_vector = target_v.subtract(V_current);
	//the required burn is the magnitude of this difference vector
	return dV_vector.mag()
}

/**
     * Calculates the full Delta-V and timing required for a Hohmann Rendezvous transfer, 
     * combining all necessary information for mission planning.
     * @param {number} target - the target object
     * @returns {{deltaV_total: number, deltaV1: number, deltaV2: number, t_transfer: number, required_phase_rad: number}} 
     * The required Delta-V and timing values.
*/
Commodity_NPlanner.prototype.calculateRendezvousDeltaV = function(target)
{
	const r_target = target._orbit._a;
	//1. calculate hohmann delta V costs
	const hohmann_dV = this.calculateHohmannDeltaV(r_target);
	//
	//2. calculate timing
	const orbit = this.orbit();
	const r_start = orbit._r.mag();
	const t_transfer = this.calculateTransferTime(r_start, r_target);
	const required_phase_rad = this.calculateRendezvousPhaseAngle(target);
	//
	return {
		...hohmann_dV, 
		transfer_time: t_transfer, 
		phase_angle: required_phase_rad 
	}
}

/**
     * Calculates the **OPTIMAL** Delta-V and timing (True Anomaly) for a combined plane change
     * by finding the exact intersection point of the current and target planes.
     * The Delta-V cost is calculated at this specific intersection radius (r_burn).
     * * @param {number} target_inc - The desired final inclination (degrees).
     * @param {number} target_raan - The desired final RAAN (degrees).
     * @returns {{deltaV_optimal: number, nu_burn_deg: number, r_burn_m: number}} 
     * The required Delta-V, the True Anomaly (degrees) to burn at, and the burn radius (meters).
*/
Commodity_NPlanner.prototype.planPlaneChange = function(target_inc, target_raan)
{
	const kep = this.orbit().getKeplerianElements();
	const i1_rad = kep.i_rad;
	const o1_rad = kep.raan;
	const i2_rad = target_inc * (Math.PI / 180);
	const o2_rad = target_raan * (Math.PI / 180);
	//
	//1. Find the true anomaly and the total plane change angle (delta_theta)
	const { nu_burn_rad, delta_theta_rad } = this.getOptimalPlaneChangeTiming(i2_rad, o2_rad, i1_rad, o1_rad);
	if(delta_theta_rad < 1e-6) return {
		dV_optimal: 0, 
		nu_burn_deg: 0, 
		r_burn_m: this.orbit()._r.mag()
	}
	//
	//2. calculate the radial distane (r) at this optimal true anomaly (nu_burn)
	const r_burn_m = this.getRadialDistanceAtTrueAnomaly(nu_burn_rad);
	//
	//3. calculate the velocity (V) at this burn radius using Vis-Viva
	const V_burn = this.getOrbitVelocityAtRadius(r_burn_m);
	//
	//4. calculate the final dV
	const dV_optimal = 2 * V_burn * Math.sin(delta_theta_rad / 2);
	//
	//5. convert timing for output
	const nu_burn_deg = nu_burn_rad * (180 / Math.PI);
	return {
		dV_optimal: dV_optimal,
		nu_burn_deg: nu_burn_deg,
		r_burn_m: r_burn_m
	}
}

/**
     * Calculates the True Anomaly (v) of the intersection line (I) between the two planes.
     * The position is calculated relative to the current orbit's Ascending Node (N).
     * u_I is the angle from N to I (Argument of Latitude of Intersection).
     * @param {number} i2_rad - Target inclination (radians).
     * @param {number} o2_rad - Target RAAN (Right Ascension of the Ascending Node) (radians).
     * @param {number} i1_rad - Current inclination (radians).
     * @param {number} o1_rad - Current RAAN (radians).
     * @returns {{nu_burn_rad: number, delta_theta_rad: number}} True Anomaly (nu) to burn at and the plane rotation angle (delta_theta).
*/
Commodity_NPlanner.prototype.getOptimalPlaneChangeTiming = function(i2_rad, o2_rad, i1_rad, o1_rad)
{
	const kep = this.orbit().getKeplerianElements();
	const omega1_rad = kep.aop;
	const delta_omega = o2_rad - o1_rad;
	//
	//1. calculate the required plane rotation angle (delta_theta)
	const cost_delta_theta = (
		Math.cos(i1_rad) * Math.cos(i2_rad) +
		Math.sin(i1_rad) * Math.sin(i2_rad) * Math.cos(delta_omega)
	);
	const clamped_cos_delta_theta = Math.max(-1, Math.min(1, cost_delta_theta));
	const delta_theta_rad = Math.acos(clamped_cos_delta_theta);
	//
	//handle co-planar case (no change needed)
	if(delta_theta_rad < 1e-6) return {nu_burn_rad: 0, delta_theta_rad: 0}
	//
	//2. calculate u_I: argument of latitude of the intersection node (I)
	//spherical law of cosines for the angle u_I on the spherical triangle:
	//cos(i2) = cos(i1)cos(delta_theta) + sin(i1)sin(delta_theta)cos(u_I)
	const cos_ui_num = Math.cos(i2_rad) - Math.cos(i1_rad) * Math.cos(delta_theta_rad);
	const cos_ui_denom = Math.sin(i1_rad) * Math.sin(delta_theta_rad);
	let u_I_rad = 0;
	if(Math.abs(cos_ui_denom) > 1e-9)
	{
		const cos_ui = cos_ui_num / cos_ui_denom;
		u_I_rad = Math.acos(Math.max(-1, Math.min(1, cos_ui)));
	}
	else
	{
		u_I_rad = 0;
	}
	//
	//3. determine quadrant for u_I using the spherical law of sines
	//sin(delta_RAAN) is proportional to sin(u_I) -> (o2 - o1) is related to u_I quadrant
	if(delta_omega < 0) u_I_rad = 2 * Math.PI - u_I_rad;
	//
	//4. calculate true anomaly (nu) of the burn point
	//note: u_I is angle from N to I. omega1 is angle from N to P
	let nu_burn_rad = u_I_rad - omega1_rad;
	//
	//normalize nu_burn to [0, 2*PI)
	nu_burn_rad = nu_burn_rad % (2 * Math.PI);
	if(nu_burn_rad < 0) nu_burn_rad += 2 * Math.PI;
	//
	return { nu_burn_rad, delta_theta_rad }
}

/**
     * Calculates the radial distance (r) from the central body given the True Anomaly (v).
     * r = (a * (1 - e^2)) / (1 + e * cos(v))
     * @param {number} nu_rad - True Anomaly (radians).
     * @returns {number} Radial distance (meters).
*/
Commodity_NPlanner.prototype.getRadialDistanceAtTrueAnomaly = function(nu_rad)
{
	const a = this.orbit()._a;
	const e = this.orbit()._e;
	if(a === Infinity || a <= 0) return this.orbit()._r.mag();
	//semi-lotus rectum (p) = a * (1 - e^2)
	const p = a * (1 - e * e);
	//denominator
	const denom = 1 + e * Math.cos(nu_rad);
	if(Math.abs(denom) < 1e-9) return Infinity
	return p / denom
}

//#region TMI
/**
     * Calculates the initial burn (TMI) and timing required to send the spacecraft 
     * from the current planetary parking orbit to intercept the moon's orbit.
     * This is based on a tangential burn at periapsis to raise apoapsis to the moon's radius.
     * @param {number} moon - the target moon.
     * @returns {{deltaV_tmi: number, t_flight_s: number, moon_lead_rad: number, r_burn_m: number, r_target_m: number}} 
     * TMI Delta-V, Time of Flight, and the required Moon Lead Angle (phase angle).
*/
Commodity_NPlanner.prototype.planTransMunarInjection = function(moon)
{
	const orbit = moon._orbit;
	const r_target_m = orbit._a;
	const n_moon_rad = orbit._n;
	//
	//1. CALCULATE TANGENTIAL BURN (Hohman dV_1) and time
	const hohman_results = this.calculateHohmannDeltaV(r_target_m);
	const r_burn_m = this.orbit()._peri;
	const t_flight_s = this.calculateTransferTime(r_burn_m, r_target_m);
	//
	//2. CALCULATE PHASE TIMING (Moon Lean and Wait Time)
	const kep = orbit.getKeplerianElements();
	const current_moon_phase = kep.v;
	const moon_lead = this.calculateRendezvousPhaseAngle(moon);
	//
	let wait_angle = moon_lead - current_moon_phase;
	wait_angle = (wait_angle % 2 * Math.PI);
	if(wait_angle < 0) wait_angle += 2 * Math.PI;
	let t_wait_s = 0;
	if(n_moon_rad > 1e-9) t_wait_s = wait_angle / n_moon_rad;
	else t_wait_s = Infinity;
	const moon_period = 2 * Math.PI / n_moon_rad;
	if(t_wait_s > moon_period - 1e-3) t_wait_s = 0;
	//
	//3. CALCULATE PLANE CHANGE COST
	const target_i = orbit._inc;
	const target_raan = kep.raan * (180 / Math.PI);
	//
	//calculate the plane change dV required at the TMI burn radius (r_burn_m)
	const { dV: dV_pc, delta_theta_rad } = this.calculateCombinedPlaneChangeDeltaV(
		target_i,
		target_raan,
		r_burn_m
	);
	//
	//4. RETURN the comprehensive plan
	return {
		dV_tmi_tang_meta: `TMI burn (Hohmann) component only. 
		The total burn is a vector sum of this and the plane correction`,
		dV_tmi_tangential: hohman_results.dV_1,
		dV_pc_meta: `The dV required for the plane change component 
		at the burn radius`,
		dV_plane_correction: dV_pc,
		dT_meta: `The total angle between the two orbit planes`,
		delta_theta_rad: delta_theta_rad,
		t_flight_s: t_flight_s,
		moon_lead_rad: moon_lead,
		t_wait_s: t_wait_s,
		r_burn_m: r_burn_m,
		r_target_m: r_target_m
	}
}
//#endregion
//#endregion

//#endregion






//------------------------------------------------------------------------
//#region AstroMiner

MAGPIE.CODE.COMMODITY.MODULE.ASTROMINER = {}
MAGPIE.CODE.COMMODITY.MODULE.ASTROMINER.meta = {isModule: true, properties: [
	"name",
	"tech"
]}

function Commodity_Astrominer(data = {})
{
	this.initialize(data);
}
Commodity_Astrominer.prototype = Object.create(Commodity_Module.prototype);
Commodity_Astrominer.prototype.constructor = Commodity_Astrominer;
Commodity_Astrominer.prototype.initialize = function(data)
{
	Commodity_Module.prototype.initialize.call(this, data);
	this._properties.push(data?.tech);
}
Commodity_Astrominer.prototype.asteroidYield = function(aType, mass, rate)
{
	const data = $MAGPIE.RESOURCE.getElementByID(aType)._contents.Composition;
	let results = [];
	let amount = 100;
	data.forEach(r => {
		const yield = this.resourceYield([r[1], r[2]])
		results.push([r[0], yield * mass]);
		amount -= yield;
	});
	if(amount < 0) amount = 0;
	results.push(["estimated mining time", (mass / 2.5) / rate]);
	results.push(["other non-mineables", amount, amount * mass])
	return results
}

Commodity_Astrominer.prototype.resourceYield = function(range)
{
	const resource = Math.random() * (range[1] - range[0]) + range[0];
	return resource
}
//#endregion





//#endregion








//#endregion

//end of plugin