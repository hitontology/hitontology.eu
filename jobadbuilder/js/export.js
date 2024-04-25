import { COMPETENCE_AREAS } from "./competence.js";

export function rdfExport() {
	const REPO = "https://github.com/hitontology/ontology";
	const label = document.getElementById("title").value;
	const suffix = label.replaceAll(/[^A-Za-z]/g, "");
	const issuetitle = `Add new Software Product '${label}'`;
	// TODO: clean/escape label
	let turtle = "hito:" + suffix + '\n  rdfs:label "' + label + '";\n';
	turtle +=
		Object.values(COMPETENCE_AREAS)
			.filter((a) => a.selected)
			.map(
				(a) =>
					` ${a.property} ${Array.from(a.selected)
						.map((p) => "<" + p + ">")
						.reduce((a, b) => `${a}, ${b}`)}`,
			)
			.reduce((s, t) => s + ";\n" + t) + ".";
	console.log(turtle);
	let encodedBody = encodeURIComponent("```turtle\n" + turtle + "```");
	window.open(`${REPO}/issues/new?title=${encodeURIComponent(issuetitle)}&body=${encodedBody}`);
}
