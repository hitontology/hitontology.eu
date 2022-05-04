const ENDPOINT_HITO = "https://hitontology.eu/sparql";
const ENDPOINT_SNIK = "https://www.snik.eu/sparql";

const COMPETENCE_AREAS = {
	ast: {
		label: "Application system type",
		query: `SELECT ?x (STR(?label) AS ?l) {?x hito:astClaFrom hito:MbApplicationSystemTypeCatalogue; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		endpoint: ENDPOINT_HITO,
		property: "hito:competencyAstCla",
	},
	swp: {
		label: "Software Product",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:SoftwareProduct; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		endpoint: ENDPOINT_HITO,
		property: "hito:competencySoftwareProduct",
	},
	interoperability: {
		label: "Interoperability",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:Interoperability; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		endpoint: ENDPOINT_HITO,
		property: "hito:competencyInteroperability",
	},
	// use static HITO copy of relevant dbo:ProgrammingLanguage instances
	programminglanguage: {
		label: "Programming Language",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a <http://dbpedia.org/ontology/ProgrammingLanguage>; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		property: "hito:competencyProgrammingLanguage",
		endpoint: ENDPOINT_HITO,
	},
	db: {
		label: "Database System",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:DatabaseSystem; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		property: "hito:competencyDb",
		endpoint: ENDPOINT_HITO,
	},
	enterpriseFunction: {
		label: "Enterprise Function",
		query: `SELECT ?x (STR(?label) AS ?l) {?x a hito:EnterpriseFunctionClassified; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		property: "hito:competencyEfCla",
		endpoint: ENDPOINT_HITO,
	},
	role: {
		label: "Role",
		//query: `SELECT ?x (STR(?label) AS ?l) FROM <http://www.snik.eu/ontology/bb> {?x a meta:Role; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
		query: `SELECT ?x (STR(?label) AS ?l) FROM <http://www.snik.eu/ontology/bb> {?x rdfs:subClassOf* bb:HospitalStaff; rdfs:label ?label. FILTER(LANGMATCHES(LANG(?label),"en"))}`,
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

function levelOption(i) {
	const levels = ["knows", "understands", "applies", "analyses", "evaluates", "creates"];
	const option = document.createElement("option");
	option.value = levels[i - 1];
	option.innerText = i + ") " + levels[i - 1];
	return option;
}

async function row(area) {
	const div = document.createElement("div");
	const label = document.createElement("label");
	label.classList.add("competence-label");
	const input = document.createElement("select");
	input.classList.add("competence-select");
	const bindings = await select(area.query, area.endpoint);
	label.innerText = area.label;
	input.append(emptyOption("Select " + area.label));
	for (let b of bindings) {
		const option = document.createElement("option");
		//option.value = b.x.value;
		option.value = b.l.value;
		option.innerText = b.l.value;
		input.append(option);
	}
	const levelInput = document.createElement("select");
	levelInput.append(emptyOption("Select competence level"));
	for (let i = 1; i < 7; i++) {
		levelInput.append(levelOption(i));
	}
	const addButton = document.createElement("button");
	{
		addButton.innerText = "Add";
		addButton.type = "button";
		addButton.addEventListener("click", () => {
			if (input.value == 0 || levelInput.value == 0) return;
			jobad.value += " * " + levelInput.value + " " + area.label + ": " + input.value + "\n";
			input.value = 0;
			levelInput.value = 0;
		});
	}
	div.append(label, input, levelInput, addButton);
	const title = document.getElementById("jobtitle");
	title.addEventListener("change", (event) => {
		const newtitle = title.value;
		if (newtitle == "") return;
		const oldad = jobad.value;
		jobad.value = newtitle + "\n" + oldad;
		title.value = "";
	});
	return div;
}

//<input name="hito:competency" type="resource" value="hito:Competency" arguments='{"pid":"{pid}"}' multiple />
async function main() {
	const container = document.getElementById("competenceContainer");
	const jobad = document.getElementById("jobad");
	for (let area of Object.values(COMPETENCE_AREAS)) {
		container.append(await row(area));
	}
}
