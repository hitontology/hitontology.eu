import { COMPETENCE_AREAS } from "./competence.js";

export function rdfExport() {
	let s = "";
	for (let a of Object.values(COMPETENCE_AREAS)) {
		s += a.property + "\n";
	}
	console.log(s);
	const REPO = "https://github.com/hitontology/ontology";
	const title = `Add new Software Product '${document.getElementById("title").value}'`;
	let encodedBody = encodeURIComponent(s);
	window.open(`${REPO}/issues/new?title=${encodeURIComponent(title)}&body=${encodedBody}`);
}
