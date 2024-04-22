const ENDPOINT_HITO = "https://hitontology.eu/sparql";
const ENDPOINT_SNIK = "https://www.snik.eu/sparql";

const SOFTWARE_KEYS = ["ast", "interoperability", "programmingLanguage", "programmingLibrary", "language", "db", "feature", "enterpriseFunctionWhoDhi", "enterpriseFunctionBb", "userGroup", "organizationalUnit"];
const COMPETENCE_KEYS = ["ast", "swp", "interoperability", "programmingLanguage", "programmingLibrary", "language", "db", "enterpriseFunction", "userGroup", "role"];

// § in a level will be replaced with the chosen value in the text field.
// * in a level can be used for both a single value and for the type in general
// $ in a level is replaced with the type in general
// When there is neither of those symbols, it will be treated as if "§" is at the end.
export const COMPETENCE_AREAS = {
	ast: {
		label: "Application System Type",
		plural: "application system types",
		query: `SELECT ?x (STR(?label) AS ?l) {?x hito:astClaFrom hito:MbApplicationSystemTypeCatalogue; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["has basic knowledge of"],
			["has advanced knowledge of", "has expert knowledge of"],
			[
				"skills in §s",
				"experienced with §s at basic level",
				"experienced with §s at advanced level",
				"experienced with §s at master level",
				"practical experience with §s",
				"hands-on experience with §s",
				"safe handling of §s",
				"experienced handling of §s",
				"administrates §s",
			],
			["maintains the", "administrates the", "provide first level support for the", "provide second level support for the", "provide third level support for the", "user support for the"],
			["manages quality of"],
			["creates the", "creates a vision about the use of the", "decides about the use of the", "introduces the", "develops §s", "provides trainings for the"],
		],
		endpoint: ENDPOINT_HITO,
		property: "hito:competencyAstCla",
	},
	swp: {
		label: "Software Product",
		plural: "software products",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:SoftwareProduct; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["is interested in", "has basic knowledge of"],
			["has advanced knowledge of", "has expert knowledge of"],
			[
				"basic skills in",
				"advanced skills in",
				"expert skills in",
				"experienced with § at basic level",
				"experienced with § at advanced level",
				"experienced with § at master level",
				"practical experience with",
				"hands-on experience with",
				"safe handling of",
				"experienced handling of",
			],
			["analyzes", "selects", "tests", "maintains", "provide first level support for", "provide second level support for", "provide third level support for"],
			["evaluates the use of", "assesses the use of"],
			["plans the use of", "creates", "creates a vision about the use of", "decides about the use of"],
		],
		endpoint: ENDPOINT_HITO,
		property: "hito:competencySoftwareProduct",
	},
	interoperability: {
		label: "Interoperability",
		plural: "interoperability standards",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:Interoperability; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["is interested in *", "has basic knowledge of *"],
			["has advanced knowledge of *", "has expert knowledge of *"],
			[
				"basic skills in *",
				"advanced skills in *",
				"expert skills in *",
				"experienced with * at basic level",
				"experienced with * at advanced level",
				"experienced with * at master level",
				"practical experience with *",
				"hands-on experience with *",
				"safe handling of *",
				"experienced handling of *",
			],
			["analyzes applicability of $ in a given scenario", "selects $", "tests $"],
			["evaluates *", "assesses the use of *"],
			["plans the use of *", "creates $", "creates a vision about the use of *", "decides about the use of *", "develops $", "provides trainings for *"],
		],
		endpoint: ENDPOINT_HITO,
		property: "hito:competencyInteroperability",
	},
	// use static HITO copy of relevant dbo:ProgrammingLanguage instances
	programmingLanguage: {
		label: "Programming Language",
		plural: "programming languages",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a <http://dbpedia.org/ontology/ProgrammingLanguage>; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["is interested in *", "has basic knowledge of *"],
			["has advanced knowledge of *", "has expert knowledge of *"],
			[
				"basic skills in",
				"advanced skills in",
				"expert skills in",
				"experienced with § at basic level",
				"experienced with § at advanced level",
				"experienced with § at master level",
				"practical experience with",
				"hands-on experience with",
				"safe handling of",
				"experienced handling of",
				"tests § code",
			],
			["analyzes the applicability of $ in a given scenario", "selects $ in a given scenario"],
			["evaluates", "assesses the use of"],
			["plans the use of *", "creates $", "creates a vision about the use of", "decides about the use of *", "develops § applications", "provides trainings for"],
		],
		property: "hito:competencyProgrammingLanguage",
		endpoint: ENDPOINT_HITO,
	},
	programmingLibrary: {
		label: "Programming Library",
		plural: "programming libraries",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:ProgrammingLibrary; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		// we don't have any instances yet, so only use phrases with $ right now
		levels: [
			["is interested in", "has basic knowledge of"],
			["has advanced knowledge of", "has expert knowledge of"],
			[
				"basic skills in",
				"advanced skills in",
				"expert skills in",
				"experienced with § at basic level",
				"experienced with § at advanced level",
				"experienced with § at master level",
				"practical experience with",
				"hands-on experience with",
				"safe handling of",
				"experienced handling of",
			],
			["analyzes the applicability of $ in a given scenario", "selects $ in a given scenario"],
			["evaluates", "assesses the use of"],
			["plans the use of $", "creates $", "creates a vision about the use of", "decides about the use of $", "develops $", "provides trainings for *"],
		],
	},
	language: {
		label: "Language",
		plural: "languages",
		query: `SELECT ?x (REPLACE(STR(?label)," language","") AS ?l) {?x a <http://dbpedia.org/ontology/Language>; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [["Language Skills: § (level A1)"], ["Language Skills: § (level A2)"], ["Language Skills: § (level B1)"], ["Language Skills: § (level B2)"], ["Language Skills: § (level C1)"], ["Language Skills: § (level C2)"]],
		property: "hito:competencyLanguage",
		endpoint: ENDPOINT_HITO,
	},
	db: {
		label: "Database System",
		plural: "database systems",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:DatabaseManagementSystem; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["is interested in", "has basic knowledge of"],
			["has advanced knowledge of", "has expert knowledge of"],
			[
				"applies",
				"basic skills in",
				"advanced skills in",
				"expert skills in",
				"experienced with § at basic level",
				"experienced with § at advanced level",
				"experienced with § at master level",
				"practical experience with",
				"hands-on experience with",
				"safe handling of",
				"experienced handling of",
			],
			["analyzes", "tests", "administrates", "provide first level support for", "provide second level support for", "provide third level support for", "user support for"],
			["evaluates", "assesses the use of", "manage the quality of"],
			["plans the use of", "creates", "creates a vision about the use of", "decides about the use of", "develops", "provides trainings for"],
		],
		property: "hito:competencyDb",
		endpoint: ENDPOINT_HITO,
	},
	enterpriseFunction: {
		label: "Enterprise Function",
		plural: "enterprise functions",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:EnterpriseFunctionClassified; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["is interested in *", "has basic knowledge of *"],
			["has advanced knowledge of *", "has expert knowledge of *"],
			["basic skills in", "advanced skills in", "expert skills in", "experienced with § at basic level", "experienced with § at advanced level", "experienced with § at master level", "practical experience with", "hands-on experience with"],
			["analyzes processes related to", "models processes related to", "provide first level support for", "provide second level support for", "provide third level support for"],
			["evaluates processes related to", "assesses processes related to", "evaluates the use of application systems for", "assesses the use of application systems for", "manages quality of"],
			["creates processes related to", "designs processes related to", "provides trainings for"],
		],
		property: "hito:competencyEfCla",
		endpoint: ENDPOINT_HITO,
	},
	enterpriseFunctionWhoDhi: {
		label: "Enterprise Function from WHO DHI catalogue",
		plural: "enterprise functions",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:FeatureClassified; hito:fClaFrom hito:WhoDhiClientFeatureCatalogue; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: null,
		property: null,
		endpoint: ENDPOINT_HITO,
	},
	enterpriseFunctionBb: {
		label: "Enterprise Function from Blue Book catalogue",
		plural: "enterprise functions",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:FeatureClassified; hito:fClaFrom hito:BbFeatureCatalogue; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: null,
		property: null,
		endpoint: ENDPOINT_HITO,
	},
	feature: {
		label: "Feature",
		plural: "features",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:FeatureClassified; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: null,
		property: null,
		endpoint: ENDPOINT_HITO,
	},
	userGroup: {
		label: "User Group",
		plural: "user groups",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:UserGroupCitation; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["has basic knowledge of §s' user requirements", "has basic knowledge of requirements of $"],
			["has advanced knowledge of §s", "has expert knowledge of §s"],
			["practical experience with user group of §s", "hands-on experience with user group of §s", "practical experience with different $", "hands-on experience with different $"],
			["analyzes user requirements of §s", "analyzes system use of §s", "analyzes user requirements of different $", "analyzes system use of different $"],
			["evaluates user requirements of §s", "evaluates system use of §s", "evaluates user requirements of different $", "evaluates system use of different $"],
			["provides trainings for §s", "provides trainings for different $"],
		],
		property: "hito:competencyUserCit",
	},
	organizationalUnit: {
		label: "Organizational Unit",
		plural: "organizational units",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:OrganizationalUnitClassified; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: null,
		property: null,
		endpoint: ENDPOINT_HITO,
	},
	role: {
		label: "Role",
		//query: `SELECT ?x (STR(?label) AS ?l) FROM <http://www.snik.eu/ontology/bb> {?x a meta:Role; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		query: `SELECT ?x (STR(?label) AS ?l) FROM <http://www.snik.eu/ontology/bb> {?x rdfs:subClassOf* bb:HospitalStaff; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [["fills the role of"], [], [], [], [], []],
		property: "hito:competencyRole",
		endpoint: ENDPOINT_SNIK,
	},
};

export const SOFTWARE_VALUES = SOFTWARE_KEYS.map((x) => COMPETENCE_AREAS[x]);
export const COMPETENCE_VALUES = COMPETENCE_KEYS.map((x) => COMPETENCE_AREAS[x]);
