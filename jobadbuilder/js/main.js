import { COMPETENCE_AREAS } from "./competence.js";

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
					}, {}),
				),
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
	for (let i = 0; i < 6; i++) {
		for (let level of area.levels[i]) {
			let sublevels = [level];
			if (level.includes("*")) sublevels = [level.replace("*", "§"), level.replace("*", "$")];
			for (let l of sublevels) {
				const option = document.createElement("option");
				option.classList.add("level-option");
				option.value = l;
				if (!option.value.match(/[$*§]/)) option.value += " §";
				option.innerText = ["I", "II", "III", "IV", "V", "VI"][i] + " " + l.replace("§", "...").replace("$", area.plural) + "\n";
				levelInput.append(option);
			}
		}
	}
	return levelInput;
}

async function rowEles(area) {
	const label = document.createElement("label");
	label.classList.add("competence-label");
	const input = document.createElement("select");
	input.classList.add("competence-select");
	label.innerText = area.label;
	input.append(emptyOption("Select " + area.label));

	const bindings = await select(area.query, area.endpoint);
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
			if ((input.value == 0 && !levelInput.value.includes("$")) || levelInput.value == 0) return;
			jobad.value += " * " + levelInput.value.replace("§", input.value).replace("$", area.plural) + "\n";
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

window.addEventListener("load", main);
