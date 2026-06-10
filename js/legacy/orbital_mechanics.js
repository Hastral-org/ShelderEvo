const G = 6.67430e-20; // Gravitational Constant in km^3/(kg * s^2)

class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Helper method to get the magnitude (r or v)
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    
    // Helper method for the Dot Product (A . B)
    dot(other) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    // Helper method for the Cross Product (r x v)
    cross(other) {
        return new Vector3(
            this.y * other.z - this.z * other.y,
            this.z * other.x - this.x * other.z,
            this.x * other.y - this.y * other.x
        );
    }

    // Helper method for scalar multiplication (k * A)
    scale(k) {
        return new Vector3(this.x * k, this.y * k, this.z * k);
    }
    
    // Helper method for vector subtraction (A - B)
    subtract(other) {
        return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
}

class Orbit {
    constructor(r, v, M_parent) {
        // Initial State Vectors (Vector3 objects)
        this.r = r; // Position vector
        this.v = v; // Velocity vector
        this.M_parent = M_parent;

        // Step 1: Calculate constants of motion
        this.mu = this.calculateMu();
        this.h = this.calculateSpecificAngularMomentum();
        this.epsilon = this.calculateSpecificOrbitalEnergy();

        // Step 2: Calculate Size and Shape
        this.a = this.calculateSemiMajorAxis();
        this.e_vec = this.calculateEccentricityVector();
        this.e = this.e_vec.mag();
    }

    calculateMu() {
        // Approximating mu = G * M_parent (since m_child is usually negligible)
        return G * this.M_parent;
    }

    calculateSpecificAngularMomentum() {
        // h = r x v (Cross Product)
        return this.r.cross(this.v);
    }

    calculateSpecificOrbitalEnergy() {
        // Epsilon = (v^2 / 2) - (mu / r)
        const v_mag = this.v.mag();
        const r_mag = this.r.mag();
        return (v_mag * v_mag / 2.0) - (this.mu / r_mag);
    }

    // --- New Methods for Semi-Major Axis (a) and Eccentricity (e) ---

    calculateSemiMajorAxis() {
        // a = -mu / (2 * Epsilon)
        // Check for parabolic/hyperbolic cases where 2*Epsilon is near zero
        if (Math.abs(2 * this.epsilon) < 1e-9) {
            // Parabolic (Epsilon ≈ 0). a is infinite (represented by null or a large number)
            return Infinity; 
        }
        return -this.mu / (2 * this.epsilon);
    }

    calculateEccentricityVector() {
        // e_vec = (1/mu) * [ (v x h) ] - (r / r_mag)
        
        // 1. Calculate the first term: (1/mu) * [ v x h ]
        const v_cross_h = this.v.cross(this.h);
        const term1 = v_cross_h.scale(1 / this.mu);

        // 2. Calculate the second term: r / r_mag (this is the unit vector r-hat)
        const r_mag = this.r.mag();
        // Check for division by zero (shouldn't happen in a stable simulation)
        if (r_mag === 0) return new Vector3(0, 0, 0); 
        const r_unit = this.r.scale(1 / r_mag);
        
        // 3. Subtract the terms: term1 - r_unit
        return term1.subtract(r_unit);
    }
}

// Example Usage (Mock data for Earth orbit around the sun)
// r = [149598023, 0, 0] km (Position at 1 AU)
// v = [0, 29.78, 0] km/s (Velocity)
// M_sun = 1.989e30 kg
/*
const r_initial = new Vector3(149598023, 0, 0);
const v_initial = new Vector3(0, 29.78, 0);
const M_sun = 1.989e30;

const earthOrbit = new Orbit(r_initial, v_initial, M_sun);
console.log(`Calculated Mu: ${earthOrbit.mu}`);
console.log(`Angular Momentum (h): ${earthOrbit.h.mag()}`);
console.log(`Orbital Energy (Epsilon): ${earthOrbit.epsilon}`);
console.log(`Semi-Major Axis (a): ${earthOrbit.a}`);
console.log(`Eccentricity (e): ${earthOrbit.e}`);
*/