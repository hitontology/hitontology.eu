async function select(query, endpoint) {
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

async function main() {
	for (let clazz in Object.keys(classes)) {
		const input = document.getElementById(clazz);
		console.log(input);
	}
	$(".rdform").RDForm.defaultSettings.prefixes.hito = "http://hitontology.eu/ontology/";
	$(".rdform").RDForm({
		template: "templates/form.html",
		hooks: "js/hooks/hooks.js",
		debug: true,
		verbose: true,

		submit: function () {
			console.log(JSON.stringify(this, null, "\t"));
		},
	});
}
