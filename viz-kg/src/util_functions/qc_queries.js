const qc1 = `PREFIX oa:     <http://www.w3.org/ns/oa#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX schema:  <http://schema.org/>
SELECT DISTINCT ?paragraph ?name_animal ?mention_animal ?name_construction ?mention_construction WHERE {
    ?annotation1 oa:hasBody ?animal ; oa:hasTarget [ oa:hasSource ?paragraph; oa:hasSelector [ oa:exact ?mention_animal]].
    ?animal skos:prefLabel ?name_animal.
    ?animal_collection a skos:Collection;
           skos:prefLabel "Ancient class"@en;
           skos:member ?animal.
    
      ?annotation2 oa:hasBody ?construction;
            oa:hasTarget [oa:hasSource ?paragraph;
                oa:hasSelector [oa:exact ?mention_construction]].
    
      ?construction skos:prefLabel ?name_construction;
                         skos:broader+ ?construction_generique.
      ?construction_generique skos:prefLabel "house building"@en.
    
      FILTER (lang(?name_animal) = "en")
      FILTER (lang(?name_construction) = "en")
    }
    ORDER BY ?paragraph
`

export default qc1;