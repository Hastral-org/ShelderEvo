//#region META
/*:
 * @target MZ
 * @plugindesc [Tier_6] v0.2.0 MAGPIE_Intelligence
 * @author Matheraptor
 * @url https://matheraptor.itch.io/magpie-intelligence
 * 
 * @help
 * 
 * 
 * ----------------------------------------------------------------------------
 * CHANGELOG
 * ----------------------------------------------------------------------------
 * v0.2.0 2025 11 01
 * - added: MAGPIE_Hive as a MAGPIE_Runtime class for hosting 
 *      MAGPIE_Intelligence instances
 * 
 * v0.1.1 2025 09 31
 * - MAGPIE_SYS 0.11.1 conformity update
 * 
 * v0.1.0 2025 09 25
 * - initial build
 */
//#endregion





//------------------------------------------------------------------------
//#region INDEX

var MAGPIE = MAGPIE || {};
MAGPIE.version = MAGPIE.version || "0.11.2";
MAGPIE.addons = MAGPIE.addons || {};
MAGPIE.addons.Intelligence = {};
MAGPIE.addons.Intelligence.version = "0.2.0";
MAGPIE.addons.Intelligence.tier = 6;
MAGPIE.addons.pluginName = "MAGPIE_Intelligence";
MAGPIE.addons.Intelligence.meta = {
	name: "MAGPIE Intelligence addon",
	isAddon: true,
	firmare: "20251101",
	firmwareFile: `${MAGPIE.addons.pluginName}.js`
};

const MAGEXP = {};
MAGEXP.meta = {
	name: "M.A.G.P.I.E. Intelligence framework",
	isOS: true,
	firmware: MAGPIE.addons.Intelligence.meta.firmare,
	firmwareFile: MAGPIE.addons.Intelligence.meta.firmwareFile
}

//#endregion






//------------------------------------------------------------------------
//#region CODE

MAGPIE.CODE.INT = {};

MAGPIE.CODE.EMOTE = {};

MAGPIE.CODE.EMOTE.STATE = {};
MAGPIE.CODE.EMOTE.STATE.DEAD = 0;
MAGPIE.CODE.EMOTE.STATE.IMPAIRED = 1;
MAGPIE.CODE.EMOTE.STATE.INACTIVE = 11;
MAGPIE.CODE.EMOTE.STATE.ACTIVE = 21;
MAGPIE.CODE.EMOTE.STATE.BUSY = 31;
MAGPIE.CODE.EMOTE.STATE.OVERLOAD = 41;

MAGPIE.CODE.EMOTE.OUTPUT = {};
MAGPIE.CODE.EMOTE.OUTPUT.PRIDE = {};
MAGPIE.CODE.EMOTE.OUTPUT.JOY = {};
MAGPIE.CODE.EMOTE.OUTPUT.ANGER = {};
MAGPIE.CODE.EMOTE.OUTPUT.FEAR = {};
MAGPIE.CODE.EMOTE.OUTPUT.SHAME = {};

MAGPIE.CODE.EMOTE.INPUT = {};
MAGPIE.CODE.EMOTE.INPUT.INTEREST = {};
MAGPIE.CODE.EMOTE.INPUT.RELIEF = {};
MAGPIE.CODE.EMOTE.INPUT.DISGUST = {};
MAGPIE.CODE.EMOTE.INPUT.SURPRISE = {};
MAGPIE.CODE.EMOTE.INPUT.SORROW = {};

MAGPIE.CODE.EMOTE.MEMORY = {};

MAGPIE.CODE.MEMA = {};

SHELDEX.CREATURE.GENDER = {};
SHELDEX.CREATURE.GENDER.AGENDER = {code: 0, pronouns: null};
SHELDEX.CREATURE.GENDER.FEMALE = {code: 1, pronouns: MAGPIE.CODE.LANG.PRONOUNS.FEMALE};
SHELDEX.CREATURE.GENDER.MALE = {code: 2, pronouns: MAGPIE.CODE.LANG.PRONOUNS.MALE};
SHELDEX.CREATURE.GENDER.NON_BINARY = {code: 3, pronouns: MAGPIE.CODE.LANG.PRONOUNS.NON_BINARY};

//1. pride
//2. joy
//3. anger
//4. fear
//5. sorrow
//6. interest
//7. boredom
//8. disgust
//9. shame
//10. guilt
//11. solidarity
//12. tenderness
//13. triumph
//14. embarrassment
//15. hilarity
//16. impotence
//17. relief
//18. surprise


//#endregion





//------------------------------------------------------------------------
//#region CLASS
//------------------------------------------------------------------------







//#region State sync
MAGEXP.STATE = {};
MAGEXP.STATE.meta = {isState: true, isWorking: false};
//#endregion







//#region Trait sync
MAGEXP.TRAIT = {};
MAGEXP.TRAIT.meta = {isTrait: true, isWorking: false};
//#endregion









//#region EXP sync
MAGEXP.EXP = {};
MAGEXP.EXP.meta = {isExp: true, isWorking: false};
//#endregion








//#region Emote sync
MAGEXP.EMOTE = {};
MAGEXP.EMOTE.meta = {isEmote: true, isWorking: false};
//#endregion







//------------------------------------------------------------------------
//#region EXP base
function MAGPIE_Exp(data = {
	state: {id: "stateId", intensity: 1},
	emote: "skillId",
	target: "creatureID"
})
{
	this.initialize(data)
}
MAGPIE_Exp.prototype.initialize = function(data)
{
	this._id = Symbol("EXP_ID");
	this._state = data?.state;
	this._emote = data?.emote;
	this._target = data?.target;
}

MAGPIE_Exp.prototype.getState = function()
{
	return $dataStates[this._state.id]
}

MAGPIE_Exp.prototype.getSkill = function()
{
	return $dataSkills[this._emote]
}

MAGPIE_Exp.prototype.getTarget = function()
{
	return $PDL.creature.getElementByID(this._target)
}

//#endregion







//------------------------------------------------------------------------
//#region Event_exp
MAGPIE.CODE.EXP = {};
MAGPIE.CODE.EXP.meta = {isCypher: true};
MAGPIE.CODE.EXP.FACT = {};
MAGPIE.CODE.EXP.TEMPLATE = {
	fact: MAGPIE.CODE.EXP.FACT,
	incipit: "b.result()",
	input: "b.addState(stateId)",
	subject: "a",
	relation: "b.creature().relation(a.creature())",
	reaction: "post-processing",
	response: "chosen response skillId",
	aftermath: "after action eval: b.result",
	output: "b.addState(stateId)"
}
function Event_Exp(data = {})
{
	this.initialize(data);
}
Event_Exp.prototype.initialize = function(data)
{
	this.ID = Symbol("EXP_ID");
	this.fact = data?.fact;
	this.incipit = data?.incipit;
	this.input = data?.input;
	this.subject = data?.subject;
	this.relation = data?.relation;
	this.reaction = data?.reaction;
	this.response = data?.response;
	this.aftermath = data?.aftermath;
	this.output = data?.output;
}

Event_Exp.prototype.inputState = function()
{
	return this.input
}

//#endregion





//------------------------------------------------------------------------
//#region Personality
//------------------------------------------------------------------------

MAGPIE.CODE.MEMA.meta = {
	isTraits: true, 
	name: "M.A.G.P.I.E. EXP Mbft Augmentation"
}
MAGPIE.CODE.MEMA.TEXT = 0;
MAGPIE.CODE.MEMA.SELECTION = 1;
MAGPIE.CODE.MEMA.SCALE = 2;
MAGPIE.CODE.MEMA.OPTION = 3;
MAGPIE.CODE.MEMA.STRATEGY = 4;
MAGPIE.CODE.MEMA.STRATEGY_META = {
	0: "Survival",
	1: "Competition",
	2: "Interaction",
	3: "Adaptation"
}
MAGPIE.CODE.MEMA.SCALE_META = {
	0: "Never",
	1: "Only if I need to",
	2: "I'll think about it",
	3: "Even when I don't need to",
	4: "Always"
}
MAGPIE.CODE.MEMA.ANAG = {};

//------------------------------------------------------------------------
//#region ANAG
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.ANAG.meta = {name: "Anagraphic data"};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.ANAG.NAME = {
	name: "Perceived name",
	question: "What is your name?",
	type: MAGPIE.CODE.MEMA.TEXT
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.ANAG.SEX_ID_A = {
	name: "Sexual Identity A",
	question: "Which gender do you most identify with?",
	type: MAGPIE.CODE.MEMA.SELECTION,
	selection: [
		"Agender (no pronouns)",
		"Female (she, her, hers)",
		"Male (he, him, his)",
		"Non-binary (they, them, theirs)"
	]
}

//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.ANAG.SEX_ID_B = {
	name: "Sexual Identity B",
	question: "Which peers do you feel most comfortable spending time with?",
	type: MAGPIE.CODE.MEMA.SELECTION,
	selection: [
		"Females only",
		"Females mostly",
		"I don't mind",
		"Males mostly",
		"Males only"
	]
}

//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.ANAG.SEX_ORI_A = {
	name: "Sexual Orientation A",
	question: "Do you feel sexually active?",
	type: MAGPIE.CODE.MEMA.SELECTION,
	selection: [
		"No / I don't care",
		"Barely",
		"Sometimes",
		"Often",
		"A lot"
	]
}

//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.ANAG.SEX_ORI_B = {
	name: "Sexual Orientation B",
	question: `Choose any genders that you feel attracted to`,
	type: MAGPIE.CODE.MEMA.OPTION,
	options: [
		"Agenders",
		"Females",
		"Males",
		"Non-binaries"
	]
}

//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.ANAG.SEX_ORI_C = {
	name: "Sexual Orientation C",
	question: "Choose any aspects of sexuality that you seek in others",
	type: MAGPIE.CODE.MEMA.OPTION,
	options: [
		"Their sexual identity",
		"Their sexual orientation",
		"Their reproductive traits (genitalia)",
		"Their physical sexual expression (how they look)"
	]
}
//#endregion
//------------------------------------------------------------------------




/**
 * Rigidity or Elasticity?
 * Diligence or Displine?
 * Salience
 * Compliance
 * Sensitivity
 */
MAGPIE.CODE.MEMA.PERS = {};
//------------------------------------------------------------------------
//#region PERS
/**
 * {@link MAGPIE.CODE.MEMA.STATE.meta}
 */
MAGPIE.CODE.MEMA.PERS.meta = {name: "Personality data"};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.RIGIDITY_A = {
	name: "Rigidity A - Familiarity",
	question: "Do you relocate your home?",
	type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.RIGIDITY_B = {
	name: "Rigidity B - Compatibility",
	question: "Do you seek others different from you?",
	type: MAGPIE.CODE.MEMA.SCALE
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.RIGIDITY_C = {
	name: "Rigidity C - Wanderlust",
	question: "Do you travel?",
	type: MAGPIE.CODE.MEMA.SCALE
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.RIGIDITY_D = {
name: 'Rigidity D - Curiosity',
question: 'Do you spend time to learn about the world and others?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.DILIGENCE_A = {
name: 'Diligence A - Endurance',
question: 'Do you work at tasks that cause you discomfort or disgust?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.DILIGENCE_B = {
name: 'Diligence B - Persistence',
question: 'Do you complete previously-started tasks even when tired?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.DILIGENCE_C = {
name: 'Diligence C - Composure',
question: 'Do you tolerate crowded, cluttered, and noisy places?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.DILIGENCE_D = {
name: 'Diligence D - Hardiness',
question: `Do you tolerate the elements, getting wet, dirty, sweaty, 
or approaching sources of discomfort and disgust?`,
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.SALIENCE_A = {
name: 'Salience A - Solitude',
question: 'Do you spend time alone?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.SALIENCE_B = {
name: 'Salience B - Sociability',
question: 'Do you seek relationships with your peers?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.SALIENCE_C = {
name: 'Salience C - Generosity',
question: 'Do you share your food with others?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.SALIENCE_D = {
name: 'Salience D - Communalism',
question: 'Do you share your home with others?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.COMPLIANCE_A = {
name: 'Compliance A - Altruism',
question: 'Do you donate others your surplus commodities?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.COMPLIANCE_B = {
name: 'Compliance B - Concession',
question: 'Do you tolerate the decisions of your peers?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.COMPLIANCE_C = {
name: 'Compliance C - Forgiveness',
question: 'Do you accept apologies?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.COMPLIANCE_D = {
name: 'Compliance D - Loyalty',
question: 'Do you take risks to help a friend?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.SENSITIVITY_A = {
name: 'Sensitivity A - Expression',
question: 'Do you let others know how you feel?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.SENSITIVITY_B = {
name: 'Sensitivity B - Empathy',
question: 'Do you ask others how they feel?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.SENSITIVITY_C = {
name: 'Sensitivity C - Impulsivity',
question: 'Do you interrupt your current task if it makes you sad?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PERS.SENSITIVITY_D = {
name: 'Sensitivity D - Vulnerability',
question: 'Do you change your plan based on your feelings?',
type: MAGPIE.CODE.MEMA.SCALE
};
//#endregion
//------------------------------------------------------------------------


MAGPIE.CODE.MEMA.MEMORY = {};
//------------------------------------------------------------------------
//#region MEMORY
MAGPIE.CODE.MEMA.MEMORY.meta = {name: "Memory data"};
//------------------------------------------------------------------------
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.EXP_ID_A = {
name: 'Experienced Identity A - Self-concept',
question: 'Do you have a solid idea of who you are?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.EXP_ID_B = {
name: 'Experienced Identity B - Integrity',
question: 'Do you abide by your principles?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.EXP_ID_C = {
name: 'Experienced Identity C - Autonomy',
question: 'Do you trust your own feelings?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.EXP_ID_D = {
name: 'Experienced Identity D - Competence',
question: 'Are you confident in your own abilities?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.EMOTE_A = {
name: 'Emotionality A - Self-perception',
question: 'Do you recognize your emotions as they express?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.EMOTE_B = {
name: 'Emotionality B - Impressionability',
question: 'Do you let your emotions guide your actions?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.EMOTE_C = {
name: 'Emotionality C - Discernment',
question: 'Do you identify emotions in others?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.EMOTE_D = {
name: 'Emotionality D - Resonance',
question: 'Do you let the emotions of others influence your own?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.RATION_A = {
name: 'Rationality A - Introspection',
question: 'Do you spend time to think about yourself and your own identity?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.RATION_B = {
name: 'Rationality B - Deliberation',
question: 'Do you stop to think about your situation before you act?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.RATION_C = {
name: 'Rationality C - Social Analysis',
question: `Do you spend time to think about the identity of your peers 
and your relationship to them?`,
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.RATION_D = {
name: 'Rationality D - Forethought',
question: `Do you stop to think about the effects of your decisions 
on others before you act?`,
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.TRUST_A = {
name: 'Trust A - Authority',
question: 'Did you obey your parents?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.TRUST_B = {
name: 'Trust B - Peer',
question: 'Did you believe the promises of your friends?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.TRUST_C = {
name: 'Trust C - Boundaries',
question: 'Did you let strangers come near or inside your home?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.TRUST_D = {
name: 'Trust D - Faith',
question: 'Do you follow your friend to an unknown place?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.PRIVACY_A = {
name: 'Privacy A - Aversion',
question: 'Are you afraid of the outside?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.PRIVACY_B = {
name: 'Privacy B - Security',
question: 'Do you feel safe at home?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.PRIVACY_C = {
name: 'Privacy C - Confidentiality',
question: 'Do you eat the food offered by a friend?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.PRIVACY_D = {
name: 'Privacy D - Proximity',
question: 'Do you tolerate a stranger peacefully sitting next to you?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.PASSION_A = {
name: 'Passion A - Intensity',
question: 'Do you invest 100% effort in what you do?',
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.PASSION_B = {
name: 'Passion B - Temperance',
question: `Do you spend energy in activities that aren't immediately 
useful to our survival but you feel like doing anyway?`,
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.PASSION_C = {
name: 'Passion C - Vicariousness',
question: `Do you participate in activities that your friends feel 
enthusiastic about even when you don't?`,
type: MAGPIE.CODE.MEMA.SCALE
};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.MEMORY.PASSION_D = {
name: 'Passion D - Priority',
question: `Which activity are you most attracted to?`,
type: MAGPIE.CODE.MEMA.SELECTION,
selection: [
	"Home / Self improvement",
	"Playing and competing with others",
	"Travelling and exploring",
	"Leisure and pleasure"
]
};
//#endregion




MAGPIE.CODE.MEMA.PRINCIPLES = {};
//------------------------------------------------------------------------
//#region PRINCIPLES
MAGPIE.CODE.MEMA.PRINCIPLES.meta = {name: "Principles"};
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.PERC_ID_A = {
	name: "Perceived Identity A - Self-concept",
	question: `Define yourself in a single word`,
	type: MAGPIE.CODE.MEMA.TEXT
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.PERC_ID_B = {
	name: "Perceived Identity B - Self-concept",
	question: `Define your personality with a single adjective`,
	type: MAGPIE.CODE.MEMA.TEXT
}
MAGPIE.CODE.MEMA.PRINCIPLES.PERC_ID_C = {
	name: "Perceived Identity C - Self-narrative",
	question: `Choose an option that best defines the story of your life so far`,
	type: MAGPIE.CODE.MEMA.SELECTION,
	selection: [
		"Boring",
		"Empty",
		"Troubled",
		"Peaceful",
		"Exciting",
		"Dark",
		"Happy",
		"Tragic",
		"Swinging",
		"Adventurous",
		"Exhausting",
		"Interesting"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.PERC_ID_D = {
	name: "Perceived Identity D - Relationships",
	question: `Choose any one or more option that relates to who you are`,
	type: MAGPIE.CODE.MEMA.OPTION,
	options: [
		"I remember my mother",
		"I remember my father",
		"I have siblings",
		"I remember my grandparents",
		"My uncle and/or auntie spent time with me",
		"I spent time with my cousins",
		"I had a childhood best friend",
		"I am still friend with my childhood best friend",
		"I remember the place where I grew up",
		"I know my way back home"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.SURV_A = {
	name: "Survival A - Personal space",
	question: `Your home is under attack:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I have a safe room to hide in",
		"I stand my ground and fight off the intruders",
		"I flee through my escape hatch",
		"I call my allies to help me"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.SURV_B = {
	name: "Survival B - Evasion",
	question: `During your trip, you meet an enemy travelling the 
	opposite direction:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I retreat to a safer spot until the coast is clear",
		"I keep going and prepare for battle",
		"I take my route B the long way around to avoid the threat",
		"I let them pass peacefully"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.SURV_C = {
	name: "Survival C - Morality",
	question: `There is a dangerous storm outside and you don't have 
	enough food for both you and your loved one:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"We ration the food, even if it makes us both weaker",
		"I take my chances fighting them to get all the food",
		"We both take our chances to go look for food outside",
		"I risk my life to go out looking for more food while they stay safe"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.SURV_D = {
	name: "Survival D - Altruism",
	question: `Your loved one is under attack by a much more 
	powerful enemy that you can take on:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I give up my loved one and save myself",
		"I die for my loved one",
		`I risk my loved one as bait while I figure out a way to flank the enemy`,
		"I risk both my loved one and myself by taking the enemy on together"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.COMP_A = {
	name: "Competition A - Avoidance",
	question: `You and your enemy converge on the same treasure:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I play it safe waiting and collect the leftovers later",
		"I fight to the death to get the treasure",
		"I go look for another treasure",
		`I probe the enemy at a safe distance to try and dissuade them away`
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.COMP_B = {
	name: "Competition B - Dominance",
	question: `A bunch of you in the same peer group are competing 
	for the attention of a love interest:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I don't risk fighting and just show them what I am capable of",
		"I must show everyone that I am the best choice, even if I risk humiliation",
		"I look for another love interest somewhere else",
		`I avoid the fight and find out what the love interest likes most`
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.COMP_C = {
	name: "Competition C - Deprivation",
	question: `Food is running low because the enemy is hoarding it with 
	the help of allies:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I don't risk becoming their prey and just collect the scraps",
		`I train myself to become stronger and prepare to risk my life to defeat them`,
		"I take my chances to relocate somewhere free of enemies",
		"I play it safe while I make friends and build my own stronger army"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.COMP_D = {
	name: "Competition D - Authority",
	question: `Your group is arguing for a solution to a crisis:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I avoid the argument and pursue my own secret solution",
		"I impose my argument over others even if I risk humiliation",
		"I avoid the argument and try to solve the crisis on my own",
		"I try to get to an agreement with the others"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.INTER_A = {
	name: "Interaction A - Navigation",
	question: `There are multiple routes to your destination:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I take the safest route, even if it's longer",
		"I take the fastest route, even if it's dangerous",
		"I risk the unknown to come up with a custom route",
		"I ask my peers for advice"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.INTER_B = {
	name: "Interaction B - Novelty",
	question: `During your food commute, you discover a cave with an 
	opening at the other side:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I don't risk it and continue my familiar route",
		"I take my chances in the cave, hoping for treasure",
		"I spend time to figure out where the cave leads",
		"I ask my peers for advice"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.INTER_C = {
	name: "Interaction C - Planning",
	question: `You're about to go on a trip:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I planned a route in detail",
		"I will improvise and face whatever obstacle head on",
		"I planned a general direction, but I expect diversions",
		"I ask my peers for advice"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.INTER_D = {
	name: "Interaction D - Reliance",
	question: `You must take shelter from an incoming storm:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I had previously spent time and energy to built a shelter",
		"I invade someone else's shelter",
		"I have options that I discovered in my previous travels",
		"I count on my peers to help me with the shelter"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.ADAPT_A = {
	name: "Adaptation A - Territoriality",
	question: `You must share your home turf with many different species:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I play it safe in my own limited but private space",
		"I force myself on others to maximize my own space",
		"I search for an emptier place",
		"I try to integrate within the group"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.ADAPT_B = {
	name: "Adaptation B - Risk bias",
	question: `You made it this far in life thanks mostly to:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"avoiding useless risks by being content with frugal loot",
		"boldly taking risks to achieve the most treasure",
		"taking time and energy in travelling to find rare loot",
		"the help of my friends and the strength in numbers"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.ADAPT_C = {
	name: "Adaptation C - Specialization",
	question: `You struggle to find food in your home area because 
	everyone is better at it than you:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"I master a reliable method to get me enough food",
		"I fight others to steal their food",
		"I learn a bit of everything so I am ready for any opportunity I get",
		"I build my own group of allies so we can share food"
	]
}
//------------------------------------------------------------------------
MAGPIE.CODE.MEMA.PRINCIPLES.ADAPT_D = {
	name: "Adaptation D - Philosophy",
	question: `The best lesson you learn in life so far is:`,
	type: MAGPIE.CODE.MEMA.STRATEGY,
	selection: [
		"'slow and steady wins the race'",
		`'survival of the fittest'`,
		"'one door closes, another opens'",
		"'sharing is caring'"
	]
}

//#endregion





//#region MEMA Data

function MEMA_Data(data = {})
{
	this.initialize(data);
}
MEMA_Data.prototype.initialize = function(data)
{
	this._parent = data?.parent ?? "undefined";
	Object.keys(data).forEach(k => {
		if(k !== "parent") this[k] = data[k];
	})
	// this.ANAG = {};
	// Object.keys(MAGPIE.CODE.MEMA.ANAG)
	// 	.forEach(k => {
	// 		if(k !== "meta")
	// 			this.ANAG[k] = MAGPIE.CODE.MEMA.ANAG[k]
	// 	})
	// this.PERS = {};
	// Object.keys(MAGPIE.CODE.MEMA.PERS)
	// 	.forEach(k => {
	// 		if(k !== "meta")
	// 			this.PERS[k] = undefined
	// 	});
	// this.MEMORY = {};
	// Object.keys(MAGPIE.CODE.MEMA.MEMORY)
	// 	.forEach(k => {
	// 		if(k !== "meta")
	// 			this.MEMORY[k] = undefined
	// 	})
	// this.PRINCIPLES = {};
	// Object.keys(MAGPIE.CODE.MEMA.PRINCIPLES)
	// 	.forEach(k => {
	// 		if(k !== "meta")
	// 			this.PRINCIPLES[k] = undefined
	// 	});
}

MEMA_Data.prototype.parent = function()
{
	return $PDL.creature.getElementByID(this._parent)
}

MEMA_Data.prototype.personalityTest = function()
{
	this._quiz = [];
	const MEMA = MAGPIE.CODE.MEMA;
	Object.keys(MEMA.ANAG)
		.forEach(k => {if(k !== "meta") this._quiz.push(MEMA.ANAG[k])});
	Object.keys(MEMA.PERS)
		.forEach(k => {if(k !== "meta") this._quiz.push(MEMA.PERS[k])});
	Object.keys(MEMA.MEMORY)
		.forEach(k => {if(k !== "meta") this._quiz.push(MEMA.MEMORY[k])});
	Object.keys(MEMA.PRINCIPLES)
		.forEach(k => {if(k !== "meta") this._quiz.push(MEMA.PRINCIPLES[k])});
	this._question = 0;
	this.personalityQuiz()
}

MEMA_Data.prototype.personalityQuiz = function()
{
	if(this._question >= this._quiz.length) 
	{
		console.log("Test finished. Processing answers...")
		return this.processAnswers()
	}
	// console.log(`Processing question ${this._question}... `);
	setTimeout(() => {this.personalityQuizEntry(this._question)}, 500)
}

MEMA_Data.prototype.personalityQuizEntry = async function(number)
{
	const entry = this._quiz[number];
	if(entry.type === 0)
	{
		entry._answer = await $HIMS.MESSAGE
			.question(`\\{${number}: ${entry.name}\\}\n${entry.question}`);
		console.log(`${number} - ${entry.question}: ${entry._answer}`)
	}
	else
	{
		$HIMS.MESSAGE.console(`\\{${number}: ${entry.name}\\}\n${entry.question}`)
	}
	if(entry.type === 1)
	{
		await $HIMS.MESSAGE
			.choices(entry.selection, this.selection);
		await $HIMS.MESSAGE.waitWindow("_messageWindow"); 
		entry._answer = $HIMS.MESSAGE._answer;
		console.log(`${number} - ${entry.question}: ${entry.selection[entry._answer]}`)
	}
	if(entry.type === 2)
	{
		await $HIMS.MESSAGE
			.choices(Object.values(MAGPIE.CODE.MEMA.SCALE_META), this.selection);
		await $HIMS.MESSAGE.waitWindow("_messageWindow");
		entry._answer = $HIMS.MESSAGE._answer;
		console.log(`${this._question} - ${entry.question}: 
			${MAGPIE.CODE.MEMA.SCALE_META[entry._answer]}`)
	}
	if(entry.type === 3)
	{
		// await $HIMS.MESSAGE.waitWindow("_messageWindow");
		const answer = await $HIMS.MESSAGE.options(entry.options);
		entry._answer = [];
		answer.forEach((a, index) => {
			if(a.contains("▣")) entry._answer.push(index)
		})
		console.log(`${number} - ${entry.question}: ${answer}`)
	}
	if(entry.type === 4)
	{
		await $HIMS.MESSAGE.choices(entry.selection, this.selection);
		await $HIMS.MESSAGE.waitWindow("_messageWindow");
		entry._answer = $HIMS.MESSAGE._answer;
		console.log(`${number} - ${entry.question}: ${entry.selection[entry._answer]}`)
	}
	this._question++;
	setTimeout(() => {this.personalityQuiz()}, 500)
}

MEMA_Data.prototype.selection = function(choice)
{
	// console.log(choice);
	$HIMS.MESSAGE._answer = choice;
}

MEMA_Data.prototype.processAnswers = function()
{
	const MEMA = MAGPIE.CODE.MEMA;
	const ANAG = Object.keys(MEMA.ANAG).filter(k => k !== "meta").length;
	const PERS = Object.keys(MEMA.PERS).filter(k => k !== "meta").length;
	const MEMORY = Object.keys(MEMA.MEMORY).filter(k => k !== "meta").length;
	this.ANAG = this.mapAnswers(this._quiz.splice(0, ANAG))
	this.PERS = this.mapAnswers(this._quiz.splice(0, PERS));
	this.MEMORY = this.mapAnswers(this._quiz.splice(0, MEMORY));
	this.PRINCIPLES = this.mapAnswers(this._quiz);
	delete this._quiz;
	delete this._question;
	delete $HIMS.MESSAGE._answer;
	console.log(`Subject${this._parent}_${this.constructor.name} test completed.`)
}

MEMA_Data.prototype.mapAnswers = function(results)
{
	// const map = new Map();
	// results.map(e => map.set(e.name, e._answer))
	const map = results.map(e => e._answer)
	return map
}
//#endregion
//#endregion


//#endregion







//------------------------------------------------------------------------
//#region Intelligence

/**
 * @property {Array} owner [false (ENTITY) / true (creature), #ID]
 * @property {String} parent if undefined, default to $MAGPIE.HIVE
 * @property {Array} memory MAGPIE_Exp
 */
MAGEXP.EXP.Intelligence_Data = {
	owner: "ID",
	traits: {},
	memory: []
}

function MAGPIE_Intelligence(data = {})
{
	this.initialize(data);
}
MAGPIE_Intelligence.prototype = Object.create(MAGPIE_Firmware.prototype);
MAGPIE_Intelligence.prototype.constructor = MAGPIE_Intelligence;
MAGPIE_Intelligence.prototype.initialize = function(data)
{
	this._owner = data?.owner;
	this.meta = {isGuest: true, isMIND: true};
	if(data?.parent) this._parent = data.parent;
	this.ANAG = data?.ANAG;
	this.PERS = data?.PERS;
	this.MEMORY = data?.MEMORY;
	this.PRINCIPLES = data?.PRINCIPLES;
	this._memory = [];
}

MAGPIE_Intelligence.prototype.meta = function()
{
	return MAGEXP.meta
}

MAGPIE_Intelligence.prototype.parent = function()
{
	if(this?._parent) return eval(this._parent)
	return $MAGPIE.HIVE
}

MAGPIE_Intelligence.prototype.owner = function()
{
	if(isNaN(this._owner)) return
	return $PDL.creature.getElementByID(this._owner)
}

Game_Battler.prototype.mind = function()
{
	return this.creature()?.MIND
}

//#region MEMA

MAGPIE_Intelligence.prototype.name = function()
{
	return this.ANAG[0]
}

MAGPIE_Intelligence.prototype.genderIdentity = function()
{
	const a = this.ANAG[1];
	const gender = Object.keys(SHELDEX.CREATURE.GENDER)[a];
	return SHELDEX.CREATURE.GENDER[gender]
}

MAGPIE_Intelligence.prototype.genderPreference = function()
{
	const a = this.ANAG[2];
	return MAGPIE.CODE.MEMA.ANAG.SEX_ID_B.selection[a]
}

MAGPIE_Intelligence.prototype.genderTolerance = function(gender)
{
	const a = this.ANAG[2];
	let tolerance = 0;
	switch (a) {
		case 0:
			if(gender === 1) tolerance = 3;			
			break;
		case 1:
			if(gender === 1) tolerance = 2
			else tolerance = 1
			break;
		case 2:
			tolerance = 2;
			break;
		case 3: 
			if(gender === 2) tolerance = 2
			else tolerance = 1
			break;
		case 5:
			if(gender === 2) tolerance = 3;
			break;
	}
	return tolerance
}

MAGPIE_Intelligence.prototype.sexual_drive = function()
{
	const a = this.ANAG[3];
	return a
}

MAGPIE_Intelligence.prototype.sexual_orientation = function()
{
	const a = this.ANAG[4];
	let answer = [];
	a.forEach(n => answer.push(MAGPIE.CODE.MEMA.ANAG.SEX_ORI_B.options[n]))
	return answer
}

MAGPIE_Intelligence.prototype.sexual_attraction = function()
{
	const a = this.ANAG[5];
	let answer = [];
	a.forEach(n => answer.push(MAGPIE.CODE.MEMA.ANAG.SEX_ORI_C.options[n]));
	return answer
}

MAGPIE_Intelligence.prototype.check_sexual_attraction = function(sex, trait)
{
	const a = this.sexual_orientation().contains(sex);
	const b = this.sexual_attraction().contains(trait);
	if(a && b) return true
	return false
}

MAGPIE_Intelligence.prototype.personalityScore = function(area)
{
	let result = 0;
	this[area]().forEach(n => result += (n * 20));
	return result
}

MAGPIE_Intelligence.prototype.rigidity = function()
{
	return this.PERS.slice(0,4)
}

MAGPIE_Intelligence.prototype.diligence = function()
{
	return this.PERS.slice(4,8)
}

MAGPIE_Intelligence.prototype.salience = function()
{
	return this.PERS.slice(8,12)
}

MAGPIE_Intelligence.prototype.compliance = function()
{
	return this.PERS.slice(12,16)
}

MAGPIE_Intelligence.prototype.sensitivity = function()
{
	return this.PERS.slice(16,20)
}

MAGPIE_Intelligence.prototype.selfConcept = function()
{
	return this.MEMORY.slice(0,4)
}

MAGPIE_Intelligence.prototype.emotionality = function()
{
	return this.MEMORY.slice(4,8)
}

MAGPIE_Intelligence.prototype.rationality = function()
{
	return this.MEMORY.slice(8,12)
}

MAGPIE_Intelligence.prototype.trust = function()
{
	return this.MEMORY.slice(12,16)
}

MAGPIE_Intelligence.prototype.privacy = function()
{
	return this.MEMORY.slice(16,20)
}

MAGPIE_Intelligence.prototype.passion = function()
{
	return this.MEMORY.slice(20,24)
}

MAGPIE_Intelligence.prototype.narrative = function()
{
	return this.PRINCIPLES.slice(0,4)
}

MAGPIE_Intelligence.prototype.survival = function()
{
	return this.PRINCIPLES.slice(4,8)
}

MAGPIE_Intelligence.prototype.competition = function()
{
	return this.PRINCIPLES.slice(8,12)
}

MAGPIE_Intelligence.prototype.interaction = function()
{
	return this.PRINCIPLES.slice(12,16)
}

MAGPIE_Intelligence.prototype.adaptation = function()
{
	return this.PRINCIPLES.slice(16,20)
}
//#endregion





//#region memory
MAGEXP.MEMORY = {};
MAGEXP.MEMORY.meta = {isMemory: true, isWorking: false};
MAGPIE_Intelligence.prototype.getExpBySymbol = function(symbol)
{
	return this._memory.find(exp => exp._id === symbol)
}

MAGPIE_Intelligence.prototype.getExpByState = function(stateId)
{
	return this._memory.filter(exp => exp._state.id === stateId)
}

MAGPIE_Intelligence.prototype.filterExpByEmote = function(skillId)
{
	return this._memory.filter(exp => exp._emote === skillId)
}

MAGPIE_Intelligence.prototype.filterExpByTarget = function(creatureID)
{
	return this._memory.filter(exp => exp._target === creatureID)
}

MAGPIE_Intelligence.prototype.recordExp = function(data = {})
{
	this._memory.push(new MAGPIE_Exp(data))
}

MAGPIE_Intelligence.prototype.consolidate = function(memoryIndex1, memoryIndex2)
{
	const exp1 = this._memory[memoryIndex1];
	const int2 = this._memory[memoryIndex2]._state.intensity;
	let int1 = exp1._state.intensity;
	if(int1 < 5)
	{
		int1 += Math.min(int2, 5 - int1)
	}
	this._memory.splice(memoryIndex2, 1);
}
//#endregion





//#region perception

MAGPIE_Intelligence.prototype.refresh = function(event = false)
{
	this.status();
	if(event) this.process(event);
	return this.idle()
}

MAGPIE_Intelligence.prototype.ID = function()
{
	return this._owner[1];
}

MAGPIE_Intelligence.prototype.awake = function()
{
	const TICK = "_guests";
	this.parent().addGuest(TICK, this.ID());
}

/**
 * @desc If the queue is empty, and the creature isn't forced to react 
 * instantly, use Forethought and Strategy to generate the best long-term plan.
 * @returns 
 */
MAGPIE_Intelligence.prototype.idle = function()
{
	//1. execution priority
	//is the creature currently busy?
	//if actionQueue is NOT empty, execute the next action and return
	//
	//2. planning trigger
	//does the creature need a new plan?
	//if max_urgency is above the planning threshold, call the GOAP
	//planning engine
	//
	//3. GOAP search
	//search memory for a multi-objective plan
	//this is where the goal_flair array is used to award utility bonuses
	//and apply cost penalties to potential exp/actions that satisfy
	//multiple problems simultaneously
	//
	//4. plan commitment
	//commit to the best action sequence
	//back to idle
	return true
}

MAGPIE_Intelligence.prototype.GOAPsearch = function()
{
	//Action score = (Base utility + flair bonus) - (Final cost x laziness multiplier)
	//1. utility
	//A. base utility (dominant goal)
	//- primary reward: how much the action reduces the dominant goal state
	//- calculation: directly proportional to urgency score of the state reduced
	//B. flair bonus (efficienty)
	//- measure the bonus for multi-objective efficiency ("slot" system)
	//- calculation: for every goal flair that the action's orbserved effects also
	//satifies, a bonus is added. This bonus should be weighted by the creature's adaptation
	//strategy
	//- example: the "approach friend eating" action gets a flair bonus because
	//it satisfies both loneliness and hunger
	//
	//2. defining cost (effort)
	//A. final cost (the expenditure)
	//- this is the standard, objective effort, modified by the creature's 
	//physical traits
	//- calculation: base action cost + E(trait modifiers)
}

/**
 * @desc Output a prioritized list of problems Goal array) 
 * and prime the Intelligence with the current emotional/cognitive capacity.
 * @returns 
 */
MAGPIE_Intelligence.prototype.status = function()
{
	//self-check
	//1. urgency scan
	let urgency = [];
	const states = this.states();
	if(states.length < 1) return
	const set = new Set(states);
	set.forEach(stateId => urgency.push(this.urgencyScan(stateId)));
	urgency.sort((a,b) => a[1] - b[1]);
	const maxFlairs = this.level();
	this._priorities = urgency.slice(0,maxFlairs);
}

MAGPIE_Intelligence.prototype.urgencyScan = function(stateId)
{
	//get state's raw priority score
	//priority score is a function of intensity (state stack) *
	//trait-sourced sensitivity
	//
	//1. group states by stack
	const states = this.states();
	const stack = states.filter(id => id === stateId);
	//
	//2. apply trait modifiers
	const trait = this.stateModifier(stateId);
	//
	//3. apply memory modifiers
	const memory = this.stateModifier(stateId, "memory");
	//
	//return urgency
	return [stateId, stack * (trait + memory)]
}

MAGPIE.CODE.MEMA.STATE = {};
MAGPIE.CODE.MEMA.STATE.meta = {isCypher: true};
/**
 * {@link MAGPIE.CODE.MEMA.PERS.meta}
 * @param {number} stateId 
 */
MAGPIE_Intelligence.prototype.stateModifier = function(stateId, type = "trait")
{
	//check state against type
	const data = eval($dataStates[stateId].meta?.[type + "MOD"]);
	if(!data) return
	let modifier = [];
	data.forEach(e => {if(eval(e[0])) modifier.push(e[1])});
	if(modifier.length < 1) return
	let result = 0;
	modifier.forEach(e => result += eval(e));
	return result
}

/**
 * @desc React to an event (Exp), update states, and potentially 
 * interrupt the planning process if the event demands an Immediate Action.
 * @param {*} event 
 */
MAGPIE_Intelligence.prototype.process = function(event)
{
	//1. event relevance
	//is the event relevant to the current problems?
	//check if the event's facts (e.g. "See Peer") intersect with the
	//prioritized goal array (e.g. loneliness). Use Salience micro-traits
	//to filter
	const relevance = this.relevance(event);
	//
	//2. state update
	//update the creature's internal states based on the event's effects
	//if the creature sees food, s_hunger might instantly spike from 69 to 95
	//
	//3. immediate action check
	//does the updated state trigger an immediate response?
	//if any state now has urgency > immediate threshold (e.g. S_panic hits
	// 95 after seeing a predator) the refresh() loop queues the single, 
	//instinctual action (e.g. A_flee), and returns
}

MAGPIE_Intelligence.prototype.relevance = function(event)
{
	return this._priorities.contains(id => id === event.inputState())
}

MAGPIE_Intelligence.prototype.states = function()
{
	const states_c = this.owner().states();
	//filter out irrelevant states
	const R = SHELDEX.STATE.RESOURCE.ALL;
	const states_i = states_c.filter(id => id !== 3 && id < R[0] || id > R[R.length - 1]);
	return states_i
}

MAGPIE_Intelligence.prototype.getState = function(stateId)
{
	return $dataStates[stateId]
}

MAGPIE_Intelligence.prototype.getTrait = function(traitId)
{
	return $dataArmors[traitId]
}

MAGPIE_Intelligence.prototype.newExp = function(b_result)
{
	const data = {};
	data.fact = this.owner().battler().lastAction();
	data.incipit = b_result;
	data.subject = 
	this._exp = new Event_Exp(data);
}

MAGPIE_Intelligence.prototype.AAR = function(a_result)
{
	//call latest event_exp, update it with the response result
	//and archive it into short-term memory
	const exp = this?._exp;
	if(!exp) return
	exp.aftermath = a_result;
}
//#endregion






//#region Concept
MAGEXP.CONCEPT = {};
MAGEXP.CONCEPT.meta = {isConcept: true, isWorking: false};
//#endregion





//#region Expression
MAGEXP.EXPRESSION = {};
MAGEXP.EXPRESSION.meta = {isExpression: true, isWorking: false};
//#endregion

//#endregion


//#endregion








//------------------------------------------------------------------------
//#region HIVE

function MAGPIE_Hive(data)
{
	this.initialize(data);
}
MAGPIE_Hive.prototype = Object.create(MAGPIE_Runtime.prototype);
MAGPIE_Hive.prototype.constructor = MAGPIE_Hive;
MAGPIE_Hive.prototype.initialize = function(data)
{
	MAGPIE_Runtime.prototype.initialize.call(this, data);
	this.meta = {isGuest: true, isHive: true};
	this._parent = data?.parent || "$MAGPIE.RUNTIME";
}

MAGPIE_Hive.prototype.grantSentience = function(ID, data = {})
{
	$PDL.creature.getElementByID(ID).MIND = new MAGPIE_Intelligence(data);
}

MAGPIE_Hive.prototype.guest = function(index, TICK = "_guests")
{
	return $PDL.creature.getElementByID(this[TICK][index]).MIND
}

MAGPIE_Hive.prototype.awake = function()
{
	MAGPIE_Firmware.prototype.awake.call(this);
	this.isActive = true;
	this.refresh();
	const proxy = this.proxyUp();
	if(!this.isActive) return
	$MAGPIE.RUNTIME.addGuest(MAGPIE.CODE.RUNTIME.SYS, proxy)
}

//#region Guests
MAGPIE_Hive.prototype.addGuest = function(TICK = "_guests", guestID)
{
	this[TICK].push(guestID);
}
//#endregion


//#endregion







//------------------------------------------------------------------------
//#region RUNTIME

MAGEXP.RUNTIME = {};
MAGEXP.RUNTIME._DataManager_createSave = DataManager.createGameObjects;
DataManager.createGameObjects = function()
{
	MAGEXP.RUNTIME._DataManager_createSave.call(this);
	const data = $MAGPIE.DATA.readJSON("MAGPIE/MAGPIE_Hive", "warn") || {};
	$MAGPIE.HIVE = new MAGPIE_Hive(data);
}

MAGEXP.RUNTIME._DataManager_makeSave = DataManager.makeSaveContents;
DataManager.makeSaveContents = function()
{
	const contents = MAGEXP.RUNTIME._DataManager_makeSave.call(this);
	contents.HIVE = $MAGPIE.HIVE;
	return contents
}

MAGEXP.RUNTIME._saveDevelopmentData = MAGPIE.SYS.data._saveDevelopmentData;
MAGPIE.SYS.data._saveDevelopmentData = function()
{
	MAGEXP.RUNTIME._saveDevelopmentData.call(this);
	$MAGPIE.DATA.writeJSON("MAGPIE/MAGPIE_Hive", $MAGPIE.HIVE, "warn");
}

MAGEXP.RUNTIME._DataManager_loadSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents)
{
	MAGEXP.RUNTIME._DataManager_loadSave.call(this, contents);
	$MAGPIE.HIVE = contents.HIVE;
}

MAGEXP.RUNTIME._runtime_awake = MAGPIE_Runtime.prototype.awake;
MAGPIE_Runtime.prototype.awake = function()
{
	MAGEXP.RUNTIME._runtime_awake.call(this);
	$MAGPIE?.HIVE?.awake();
}



//#endregion





//end of plugin