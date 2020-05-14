---
layout: post
title: Quality Check
tags: [snik, ontology, label,length]
#date: 2017-06-01
use_sgvizler: true
use_sgvizler_table: true
---
<div id="accordion">
<h3>Undefined Objects</h3>
<div>
<h4>Situation</h4>
If a concept is used as the object in some triple, then it should have its own attributes (occur as a subject).
<h4>Problem</h4>
Sometimes concepts occur as only as an object but not as a subject.
<h4>Solution</h4>
The responsible extractors for the respective subontologies need to add statements for the objects listed below.
<br/>
<input type="button" id="sgvizler-button-undefinedobject" value="List Classes with Undefined Restriction Object" />
<div id="sgvizler-div-undefinedobject"
         data-sgvizler-query="
select distinct ?targetNode
FROM <http://hitontology.eu/ontology>
{
 ?resource      a owl:Class.
 filter not exists { ?targetNode    a owl:Class.}
 filter(regex(str(?targetNode),'http://hitontology.eu/ontology/'))
 {
  ?resource     rdfs:subClassOf ?restriction.
  ?restriction  a owl:Restriction;
                owl:onProperty ?p.
  {?restriction owl:someValuesFrom ?targetNode.} UNION {?restriction owl:allValuesFrom ?targetNode.}
 }
 UNION
 {
  ?p            rdfs:domain ?resource.
  ?p            rdfs:range ?targetNode.
}
} order by asc(?targetNode)

">
</div>
</div>

<h3>Domain Violation</h3>
<div>
<h4>Situation</h4>
Each HITO property has a domain that defines allowed subjects.
<h4>Problem</h4>
Some classes are used as a subject for a triple without being a direct or transitive subclass of the defined domain of the property.
<h4>Solution</h4>
The offending triples should be removed or remodelled to conform to the domain.
<br/>
<input type="button" id="sgvizler-button-domain" value="List Domain Violations" />
<div id="sgvizler-div-domain"
         data-sgvizler-query="
select *
FROM <http://hitontology.eu/ontology>
{
 ?p rdfs:domain ?domain.
 filter(?domain!=meta:Top) 
 ?s ?p ?o.                                                                                                                                                                                                         
 minus {?s a|rdfs:subClassOf*|meta:subTopClass ?domain.}
} order by ?p ?s
">
</div>
</div>

<h3>Range Violation</h3>
<div>
<h4>Situation</h4>
Each HITO property has a range that defines allowed objects.
<h4>Problem</h4>
Some classes are used as an object for a triple  without being a direct or transitive subclass of the defined range of the property.
<h4>Solution</h4>
The offending triples should be removed or remodelled to conform to the range.
<br/>
<input type="button" id="sgvizler-button-range" value="List Range Violations" />
<div id="sgvizler-div-range"
         data-sgvizler-query="
select *
FROM <http://hitontology.eu/ontology>                                                                                                                                                                                 
{
 ?p rdfs:range ?range.
 filter(!strstarts(str(?range),'http://www.w3.org/2001/XMLSchema#'))
 ?s ?p ?o.
 minus {?o a?/rdfs:subClassOf*|meta:subTopClass ?range.}
} order by ?p ?s
">
</div>
</div>

<h3>Subclass Cycles</h3>
<div>
<h4>Situation</h4>
Classes are sets of individuals and can be subclasses (subsets) of other classes.
<h4>Problem</h4>
Subclass cycles (A subclass of B ... subclass of A) collapse all members of the cycle to the same set, which is assumed to be unintentional.
<h4>Solution</h4>
Find subclass cycles below and and manually remove at least one of them.
Because of the limitiations of SPARQL 1.1 property paths, we cannot select the full cycle but only give all pairs of classes on a cycle.
<br/>
<input type="button" id="sgvizler-button-cycle" value="List Classes on Subclass Cycles" />
<div id="sgvizler-div-cycle"
         data-sgvizler-query="
select distinct ?class ?class2
FROM <http://hitontology.eu/ontology>
{
 owl:Class ^a ?class,?class2.
 ?class rdfs:subClassOf+ ?class2.
 ?class2 rdfs:subClassOf+ ?class.
}
">
</div>
</div>


<h3>Class URL Naming Convention Violations</h3>
<div>
<h4>Situation</h4>
Class URLs should conform to UpperCamelCase.
<h4>Problem</h4>
Naming conventions weren't clearly set from the beginning and some pecularities are not widely known, for example abbreviations such as IbmMachine, not IBMMachine.
<h4>Solution</h4>
Manually correct offending class URLs.
<br/>
<input type="button" id="sgvizler-button-naming" value="List Class Naming Convention Violations" />
<div id="sgvizler-div-naming"
         data-sgvizler-query="
select ?class
FROM <http://hitontology.eu/ontology>
{
 ?class a owl:Class.
 filter(!regex(str(?class),'([A-Z0-9][a-z0-9]+)+'))
}
">
</div>
</div>

<h3>Property URL Naming Convention Violations</h3>
<div>
<h4>Situation</h4>
Property URLs should conform to lowerCamelCase.
<h4>Problem</h4>
Naming conventions weren't clearly set from the beginning and some pecularities are not widely known, for example abbreviations such as updatesAtm, not updatesATM.
<h4>Solution</h4>
Manually correct offending property URLs.
<br/>
<input type="button" id="sgvizler-button-naming" value="List Property Naming Convention Violations" />
<div id="sgvizler-div-naming"
         data-sgvizler-query="
select ?property
FROM <http://hitontology.eu/ontology>
{
 {?property a owl:ObjectProperty.} UNION {?property a owl:DatatypeProperty.}
 filter(!regex(str(?property),'^[a-z]+([A-Z][a-z0-9]+)*'))
}
">
</div>
</div>
<!--
<h3>Isolated Individuals</h3>
<div>
<h4>Situation</h4>
Every individual in HITO should be connected to at least one other individual.
<h4>Problem</h4>
Some don't.
<h4>Solution</h4>
Find unconnected ones.
<br/>
<input type="button" id="sgvizler-button-definition" value="List Classes with Missing Definition" />
<div id="sgvizler-div-definition"
         data-sgvizler-query="
select ?class
FROM <http://hitontology.eu/ontology>
{
 ...
}
">
</div>
</div>
-->
<!--
<h3>Missing Definition</h3>
<div>
<h4>Situation</h4>
Every class should have a definition from the book.
<h4>Problem</h4>
Some don't.
<h4>Solution</h4>
Try to find a definition in the source.
<br/>
<input type="button" id="sgvizler-button-definition" value="List Classes with Missing Definition" />
<div id="sgvizler-div-definition"
         data-sgvizler-query="
select ?class
FROM <http://hitontology.eu/ontology>
{
 ?class a owl:Class.
 OPTIONAL {?class skos:definition ?def.}
 FILTER(!BOUND(?def) OR str(?def)='')
}
">
</div>
</div>

<h3>Literals with Semicolons</h3>
<div>
<h4>Situation</h4>
We use semicolons for multiple properties in our extraction tables to hold multiple values.
<h4>Problem</h4>
Semicolons are rarely used in the textbooks, especially for short strings and outside of definitions.
Thus they hint at semicolons being used at the wrong place or at errors in the conversion script.
<h4>Solution</h4>
Generate all literals containing semicolons except those from definitions of more than 100 characters.
<br/>
<input type="button" id="sgvizler-button-semicolon" value="List Literals with Semicolons" />
<div id="sgvizler-div-semicolon"
         data-sgvizler-query="
select ?class ?property ?literal
FROM <http://hitontology.eu/ontology>
{

 ?class ?property ?literal.
 filter(!(?property=skos:definition AND strlen(?literal)>100))
 FILTER(regex(str(?literal),';'))
}
">
</div>
</div>
-->
<!--
<h3>No Restriction</h3>
<div>
<h4>Situation</h4>
Classes are connected to other classes mostly by the subclass hierarchy and by restrictions.
<h4>Problem</h4>
Some classes are isolated from all others, limiting their use and preventing them from being connected to the vizualization graph.
<h4>Solution</h4>
List all classes that are not connected to other classes by restrictions.
Because we already covered the hierarchy, we are not taking it into account here.
Because there are over 1000 of those cases, we only list the first 100.
They are not necessarily faulty but it may be worthy to investigate if they can be connected in some way.
<br/>
<input type="button" id="sgvizler-button-isolated" value="List Unrestricted Classes" />
<div id="sgvizler-div-isolated"
         data-sgvizler-query="
select ?class
FROM <http://hitontology.eu/ontology>
{
 ?class a owl:Class.
 filter not exists
 {
  ?class2 a owl:Class.
  {?class rdfs:subClassOf [a owl:Restriction; ?p ?class2].} UNION
  {?class2 rdfs:subClassOf [a owl:Restriction; ?p ?class].}
 }
}
">
</div>
</div>
-->

<h3>Non-HTTP URI</h3>
<div>
<h4>Situation</h4>
Our URIs begin with http://...
<h4>Problem</h4>
Tools like the OntoWiki sometimes fail to expand a prefix and thus create URIs that have an incorrect prefix.
<h4>Solution</h4>
List all triples with URIs that are neither HTTP URIs nor blanknodes.
<br/>
<input type="button" id="sgvizler-button-non-http" value="List Non-HTTP URIs" />
<div id="sgvizler-div-non-http"
         data-sgvizler-query="
select ?x
FROM <http://hitontology.eu/ontology>
{
{?x ?p ?o.} UNION {?s ?x ?o}. filter(!regex(str(?x),'http://')&&!regex(str(?x),'nodeID')).
}
">
</div>
</div>


<h3>OWL 2 DL: Undefined Properties</h3>
<div>
<h4>Situation</h4>
Some URIs are used in the property position of a triple but are neither declared as owl:ObjectProperty, nor as owl:DataTypeProperty.
<h4>Problem</h4>
This violates the <a href="https://www.w3.org/TR/owl2-syntax/#Typing_Constraints_of_OWL_2_DL">typing constraints of OWL 2 DL</a>.
<h4>Solution</h4>
List all URIs are used in the property position of a triple but are neither declared as owl:ObjectProperty, nor as owl:DataTypeProperty.
Exclude those defined in vocabularies like RDF, RDFS, OWL and so on.
<br/>
<input type="button" id="sgvizler-button-undefined-property" value="Undefined Properties" />
<div id="sgvizler-div-undefined-property"
         data-sgvizler-query="
select distinct(?p) from <http://hitontology.eu/ontology>
{
 ?x ?p ?y.
 filter(!(strstarts(str(?p),'http://www.w3.org/1999/02/22-rdf-syntax-ns#')))
 filter(!(strstarts(str(?p),'http://www.w3.org/2000/01/rdf-schema#')))
 filter(!(strstarts(str(?p),'http://www.w3.org/2002/07/owl#')))
 filter(!(strstarts(str(?p),'http://purl.org/dc/terms/')))
 filter(!(strstarts(str(?p),'http://purl.org/ontology/bibo/')))
 filter(!(strstarts(str(?p),'http://purl.org/vocab/vann/')))
 filter(!(strstarts(str(?p),'http://open.vocab.org/terms/')))
 filter(!(strstarts(str(?p),'http://schema.org/')))
 filter(!(strstarts(str(?p),'http://www.w3.org/2004/02/skos/core#')))
 filter(!(strstarts(str(?p),'http://xmlns.com/foaf/0.1/')))
 filter(!(strstarts(str(?p),'http://rdfs.org/sioc/ns#')))

 MINUS {?p a owl:DatatypeProperty. filter(!isIRI(?y))}
 MINUS {?p a owl:ObjectProperty. filter(isIRI(?y))}
} order by ?p
">
</div>
</div>

<h3>OWL 2 DL: Multiply Defined Properties</h3>
<div>
<h4>Situation</h4>
Some URIs may be defined as more than one of owl:ObjectProperty, owl:DatatypeProperty and owl:AnnotationProperty.
<h4>Problem</h4>
This violates the <a href="https://www.w3.org/TR/owl2-syntax/#Typing_Constraints_of_OWL_2_DL">typing constraints of OWL 2 DL</a>.
<h4>Solution</h4>
List all URIs that are defined as more than one of owl:ObjectProperty, owl:DatatypeProperty and owl:AnnotationProperty.
<br/>
<input type="button" id="sgvizler-button-multi-property" value="Multiply Defined Properties" />
<div id="sgvizler-div-multi-property"
         data-sgvizler-query="
select distinct(?x) from <http://hitontology.eu/ontology>
{
 {?x a owl:DatatypeProperty,owl:ObjectProperty.} UNION
 {?x a owl:ObjectProperty,owl:AnnotationProperty.} UNION
 {?x a owl:AnnotationProperty,owl:DatatypeProperty.}
}
">
</div>
</div>

<!--
<h3>Accordion Section</h3>
<div>
<h4>Situation</h4>
<h4>Problem</h4>
<h4>Solution</h4>
<br/>
<input type="button" id="sgvizler-button-..." value="..." />
<div id="sgvizler-div-..."
         data-sgvizler-query="
...
">
</div>
</div>
-->

</div>

Note: No table is shown when there is an empty result.
