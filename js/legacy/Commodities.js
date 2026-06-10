const SECTOR = {};
SECTOR.RESOURCE = 0;
const CAT = {};
CAT.COMMUNITY = 7;
const RESOURCE = {};
RESOURCE.data = [
    {
        name: "Adolescent",
        sector: SECTOR.RESOURCE,
        category: CAT.COMMUNITY,
        requirements: ["Habitat", "Alignment"],
        components: [],
        recipes: ["Person"],
        development: [],
        predecessors: [],
        upgrades: [],
    },
    {
        name: "Adult",
        sector: SECTOR.RESOURCE,
        category: CAT.COMMUNITY,
        requirements: ["Habitat", "Alignment"],
        components: [],
        recipes: ["Person"],
        development: ["Blue Pill", "Lupo", "Ratto", "Fauno", "Fanatico", "Narcisista", "Pedopredatore"],
        predecessors: [],
        upgrades: [],
    },
    {
        name: "Asteroid",
        sector: SECTOR.RESOURCE,
        category: CAT.COSMOS,
        requirements: [],
        components: [],
        recipes: ["Rock"],
        development: [],
        predecessors: [],
        upgrades: ["C-type Asteroid", "S-type Asteroid", "M-type Asteroid", "V-type Asteroid", "P-type Asteroid"],
    }
]
