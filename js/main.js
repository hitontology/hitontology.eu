/** @module */
import * as sparql from "./sparql.js";

const propertyQuery =
`SELECT ?p STR(SAMPLE(?l)) as ?l ?range ?type
{
 ?p rdfs:domain hito:SoftwareProduct;
    rdfs:range ?range;
    a ?type.
 OPTIONAL {?p rdfs:label ?l.}
}`;

const instanceQuery =
`SELECT ?p ?i STR(SAMPLE(?l)) as ?l
{
  ?p rdfs:domain hito:SoftwareProduct;
    rdfs:range ?range.
  ?i a ?range.
  OPTIONAL {?i rdfs:label ?l.}
}`;

const labelForResource = new Map();

/** Fetch or generate the label for a resource. */
function getLabel(uri)
{
  if(!labelForResource.has(uri))
  {
    labelForResource.set(uri,uri.replace(/.*\//,""));
  }
  return labelForResource.get(uri);
}

/** entry point */
async function main()
{
  const form = document.getElementById("form");
  //form.innerHTML+="Hello World";

  const pBinds = await sparql.select(propertyQuery);
  const iBinds = await sparql.select(instanceQuery);
  iBinds.forEach(b=>{labelForResource.set(b.i.value,b.l.value);});
  const iKeys = [...new Set(iBinds.map(b=>b.p.value))];
  const instancesForProperty = new Map(iKeys.map(k=>[k,new Set(iBinds.filter(b=>b.p.value===k).map(b=>b.i.value))]));

  for(const b of pBinds)
  {
    const p = b.p.value;
    labelForResource.set(p,b.l.value);
    if(!instancesForProperty.has(p)) {continue;}
    const label = document.createElement("label");
    label.for= p;
    label.innerText = b.l.value;
    form.appendChild(label);
    const select = document.createElement("select");
    form.appendChild(select);
    select.style.display="block";
    select.name = p;
    select.setAttribute("multiple","");
    for(const i of instancesForProperty.get(p))
    {
      const option = document.createElement("option");
      select.appendChild(option);
      option.value = i;
      option.innerText = getLabel(i);
    }
  }
}

document.addEventListener("DOMContentLoaded",main);
