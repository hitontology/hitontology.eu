import { COMPETENCE_AREAS, SOFTWARE_VALUES, COMPETENCE_VALUES } from "./competence.js";

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

export function copy() {
	const text = document.getElementById("text");
	text.select();
	text.setSelectionRange(0, 99999);
	navigator.clipboard.writeText(text.value);
	text.selectionStart = text.selectionEnd;
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
		if (!area.levels) console.error("no levels on area", area);
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

async function rowEles(area, useLevels) {
	// describe a new product so we don't want to reference an existing one
	if (!useLevels && area.label === "Software Product") return [];

	const label = document.createElement("label");
	label.classList.add("competence-label");
	const input = document.createElement("select");
	input.classList.add("competence-select");
	//input.setAttribute("multiple",true);
	label.innerText = area.label;
	input.append(emptyOption("Select " + area.label));

	const bindings = await select(area.query, area.endpoint);
	for (let b of bindings) {
		const option = document.createElement("option");
		option.classList.add("competence-option");
		option.value = b.x.value;
		//option.value = b.l.value;
		option.innerText = b.l.value;
		input.append(option);
	}
	// when not using levels create an empty placeholder element to keep the grid layout intact
	const levelInput = useLevels ? levelSelect(area) : document.createElement("span");

	const addButton = document.createElement("button");
	{
		addButton.innerText = "Add";
		addButton.type = "button";
		addButton.classList.add("add-button");
		addButton.addEventListener("click", () => {
			const label = input.options[input.selectedIndex].text;
			if (useLevels) {
				// code path for Job Ad Builder
				if ((input.value == 0 && !levelInput.value.includes("$")) || levelInput.value == 0) return;
				text.value += " * " + levelInput.value.replace("§", label).replace("$", area.plural) + "\n";
				levelInput.value = 0;
			} else {
				// code path for Software Product Describer
				if (input.value == 0) return;
				const prefix = " * " + area.label + ": ";
				// Add to existing line.
				// There could theoretically be edge cases that misdetect something due to string overlap.
				// However a theoretically perfect solution would require refactoring the whole input process.
				// So unless such an error actually occurs, use this string replacement based approach for now,
				// as this is just a research prototype and not some mission critical software.
				area.selected = area.selected || new Set();
				area.selected.add(input.value);
				if (text.value.includes(prefix)) {
					if (!text.value.includes(label)) {
						text.value = text.value.replace(prefix, prefix + label + ", ");
					}
				}
				// Does not exist yet, add new line.
				else text.value += prefix + label + "\n";
			}
			input.value = 0;
		});
	}
	return [label, input, levelInput, addButton];
}

//<input name="hito:competency" type="resource" value="hito:Competency" arguments='{"pid":"{pid}"}' multiple />
async function main(values, useLevels) {
	const container = document.getElementById("competenceContainer");
	const text = document.getElementById("text");
	const title = document.getElementById("title");
	console.log("adding schmädding padding");
	title.addEventListener("change", (event) => {
		event.preventDefault();
		console.log("trigger");
		const newtitle = title.value;
		if (newtitle == "") return;
		const oldad = text.value;
		text.value = newtitle + "\n" + oldad;
		//title.value = "";
		//return false; // don't clear title field
	});
	(await Promise.all(values.map((area) => rowEles(area, useLevels)))).forEach((eles) => container.append(...eles));
}

export async function buildJobAd() {
	console.log(COMPETENCE_VALUES);
	await main(COMPETENCE_VALUES, true);
}

export async function describeSoftware() {
	await main(SOFTWARE_VALUES, false);
}
