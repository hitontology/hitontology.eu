const ENDPOINT_HITO = "https://hitontology.eu/sparql";
const ENDPOINT_SNIK = "https://www.snik.eu/sparql";

const COMPETENCE_AREAS = {
	ast: {
		label: "Application system type",
		query: `SELECT ?x (STR(?label) AS ?l) {?x hito:astClaFrom hito:MbApplicationSystemTypeCatalogue; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["has basic knowledge of"],
			["has advanced knowledge of", "has expert knowledge of"],
			[
				"basic skills in",
				"advanced skills in",
				"expert skills in",
				"experienced with ... at basic level",
				"experienced with ... at advanced level",
				"experienced with ... at master level",
				"practical experience with",
				"hands-on experience with",
				"safe handling of",
				"experienced handling of",
				"administrates",
			],
			["analyzes", "tests", "maintains", "administrates", "provide first level support for", "provide second level support for", "provide third level support for", "user support for"],
			["evaluates", "assesses", "manages quality of"],
			["plans use of", "creates", "creates a vision about the use of", "decides about ... use", "develops", "provides trainings for"],
		],
		endpoint: ENDPOINT_HITO,
		property: "hito:competencyAstCla",
	},
	swp: {
		label: "Software Product",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:SoftwareProduct; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["has basic knowledge of"],
			["has advanced knowledge of", "has expert knowledge of"],
			["basic skills in", "advanced skills in", "expert skills in", "experienced with ... at basic level", "experienced with ... at advanced level", "experienced with ... at master level"],
			["analyzes", "selects", "tests", "maintains", "provide first level support for", "provide second level support for", "provide third level support for"],
			["evaluates the use of", "assesses the use of"],
			["plans the use of", "creates", "creates a vision about the use of", "decides about the use of"],
		],
		endpoint: ENDPOINT_HITO,
		property: "hito:competencySoftwareProduct",
	},
	interoperability: {
		label: "Interoperability",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:Interoperability; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["is interested in", "has basic knowledge of"],
			["has advanced knowledge of", "has expert knowledge of"],
			["basic skills in", "advanced skills in", "expert skills in"],
			["analyzes applicability of ... in a given scenario", "selects", "tests"],
			["evaluates the use of", "assesses the use of"],
			["plans the use of", "creates", "creates a vision about the use of"],
		],
		endpoint: ENDPOINT_HITO,
		property: "hito:competencyInteroperability",
	},
	// use static HITO copy of relevant dbo:ProgrammingLanguage instances
	programminglanguage: {
		label: "Programming Language",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a <http://dbpedia.org/ontology/ProgrammingLanguage>; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["has basic knowledge of"],
			["has advanced knowledge of", "has expert knowledge of"],
			[
				"basic skills in",
				"advanced skills in",
				"expert skills in",
				"experienced with ... at basic level",
				"experienced with ... at advanced level",
				"experienced with ... at master level",
				"practical experience with",
				"hands-on experience with",
				"safe handling of",
				"experienced handling of",
				"administrates",
			],
			[/*"analyzes applicability of programming languages in a given scenario",*/ "selects", "tests ... code"],
			["evaluates the use of", "assesses the use of"],
			["plans the use of", "creates", "creates a vision about the use of", "decides about ... use", "develops", "provides trainings for"],
		],
		property: "hito:competencyProgrammingLanguage",
		endpoint: ENDPOINT_HITO,
	},
	language: {
		label: "Language",
		query: `SELECT ?x (REPLACE(STR(?label)," language","") AS ?l) {?x a <http://dbpedia.org/ontology/Language>; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [["A1 Basic User: Breakthrough"], ["A2 Basic User: Waystage"], ["B1 Independent User: Threshold"], ["B2 Independent User: Vantage"], ["C1 Proficient User: Advanced"], ["C2 Proficient User: Mastery"]],
		property: "hito:competencyLanguage",
		endpoint: ENDPOINT_HITO,
	},
	db: {
		label: "Database System",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:DatabaseSystem; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["has basic knowledge of"],
			["has advanced knowledge of", "has expert knowledge of"],
			["applies", "basic skills in", "advanced skills in", "expert skills in", "experienced with ... at basic level", "experienced with ... at advanced level", "experienced with ... at master level"],
			["analyzes", "tests", "administrates", "provide first level support for", "provide second level support for", "provide third level support for"],
			["evaluates the use of", "assesses the use of", "manage the quality of"],
			["plans the use of", "creates", "creates a vision about the use of", "decides about the use of"],
		],
		property: "hito:competencyDb",
		endpoint: ENDPOINT_HITO,
	},
	enterpriseFunction: {
		label: "Enterprise Function",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:EnterpriseFunctionClassified; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		levels: [
			["is interested in", "has basic knowledge of"],
			["has advanced knowledge of", "has expert knowledge of"],
			["under construction"],
			["analyzes processes related to", "models processes related to", "provide first level support for", "provide second level support for", "provide third level support for"],
			["evaluates processes related to", "assesses processes related to", "evaluates the use of application systems for", "assesses the use of application systems for", "manages quality of"],
			["creates processes related to", "designs processes related to", "provides trainings for"],
		],
		property: "hito:competencyEfCla",
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

async function select(query, endpoint, graph) {
	if (!endpoint) endpoint = "https://hitontology.eu/sparql";
	let url = endpoint + "?query=" + encodeURIComponent(query) + "&format=json";
	if (graph) {
		url += "&default-graph-uri=" + encodeURIComponent(graph);
	}
	try {
		const response = await fetch(url);
		const json = await response.json();
		const bindings = json["results"].bindings;

		console.groupCollapsed("SPARQL " + query.split("\n", 1)[0] + "...");
		if (bindings.length < 100) {
			console.table(
				bindings.map((b) =>
					Object.keys(b).reduce((result, key) => {
						result[key] = b[key].value;
						return result;
					}, {})
				)
			);
		}
		console.debug(query);
		console.debug(url);
		console.groupEnd();

		return bindings;
	} catch (err) {
		console.error(err);
		console.error(`Error executing SPARQL query:\n${query}\nURL: ${url}\n\n`);
		return [];
	}
}

const classes = {
	"hito:snikRole": {
		query: 'select ?x (STR(?label) AS ?l) FROM <http://www.snik.eu/ontology/bb> {?x a meta:Role; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))} ',
	},
};

function copy() {
	const jobad = document.getElementById("jobad");
	jobad.select();
	jobad.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(jobad.value);
	jobad.selectionStart = jobad.selectionEnd;
}

function emptyOption(text) {
	const emptyOption = document.createElement("option");
	emptyOption.setAttribute("disabled", "");
	emptyOption.setAttribute("selected", "");
	emptyOption.innerText = text;
	emptyOption.value = 0;
	return emptyOption;
}

function levelSelect(area) {
	const levelInput = document.createElement("select");
	levelInput.classList.add("level-select");
	levelInput.append(emptyOption("Select competence level"));
	for (let i = 1; i < 7; i++) {
		for (let l of area.levels[i - 1]) {
			const option = document.createElement("option");
			option.classList.add("level-option");
			option.value = l;
			if (!option.value.includes("...")) option.value += " ...";
			option.innerText = i + ") " + l;
			levelInput.append(option);
		}
	}
	return levelInput;
}

async function rowEles(area) {
	const label = document.createElement("label");
	label.classList.add("competence-label");
	const input = document.createElement("select");
	input.classList.add("competence-select");
	const bindings = await select(area.query, area.endpoint);
	label.innerText = area.label;
	input.append(emptyOption("Select " + area.label));
	for (let b of bindings) {
		const option = document.createElement("option");
		option.classList.add("competence-option");
		//option.value = b.x.value;
		option.value = b.l.value;
		option.innerText = b.l.value;
		input.append(option);
	}
	const levelInput = levelSelect(area);

	const addButton = document.createElement("button");
	{
		addButton.innerText = "Add";
		addButton.type = "button";
		addButton.classList.add("add-button");
		addButton.addEventListener("click", () => {
			if (input.value == 0 || levelInput.value == 0) return;
			jobad.value += " * " + levelInput.value.replace("...", input.value) + "\n";
			input.value = 0;
			levelInput.value = 0;
		});
	}
	const title = document.getElementById("jobtitle");
	title.addEventListener("change", (event) => {
		const newtitle = title.value;
		if (newtitle == "") return;
		const oldad = jobad.value;
		jobad.value = newtitle + "\n" + oldad;
		title.value = "";
	});
	return [label, input, levelInput, addButton];
}

//<input name="hito:competency" type="resource" value="hito:Competency" arguments='{"pid":"{pid}"}' multiple />
async function main() {
	const container = document.getElementById("competenceContainer");
	const jobad = document.getElementById("jobad");
	(await Promise.all(Object.values(COMPETENCE_AREAS).map((area) => rowEles(area)))).forEach((eles) => container.append(...eles));
}
