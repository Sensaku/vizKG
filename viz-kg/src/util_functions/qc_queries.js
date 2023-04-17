const qc = [
    {
        number: 1,
        question: "Quels sont les animaux qui construisent un habitat (textes où l’on parle de cette construction)",
        about: {
            reformulation: `Reformulation: Les annotations qui mentionnent un animal et une construction d'habitation étant dans le même paragraphe.`,
            note: `Note: généralisation de l'animal faisant parti de la collection "Archéotaxon" ("Ancient class" en anglais)`,
            sortie: "Sortie: Le paragraphe, l'animal (concept), le texte mentionnant l'animal, la construction (concept), le texte mentionnant la construction"
        },
        sparql: `PREFIX oa:     <http://www.w3.org/ns/oa#>
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

        FILTER NOT EXISTS {?x  skos:broader ?animal}
        FILTER (lang(?name_animal) = "en")
        FILTER (lang(?name_construction) = "en")
        }
        ORDER BY ?paragraph
        `,
        labelViz : ["name_animal", "name_construction"],
        linkEdge : [
            {from: "name_animal", to: "name_construction", name: "construction"}
        ],
        nodeParameters: {
            "name_animal" : "red",
            "name_construction" : "blue"
        }
    },
    {
        number:2,
        question: "Quelles anecdotes mettant en relation un homme et un animal (pas toutes les relations hommes/animaux, comme la chasse, etc., mais seulement les situations individuelles, qui seront probablement marquées par un nom propre, ou un nom de lieu, etc.)",
        about: {
            reformulation:`Reformulation: Les annotation mentionnant une anecdote, une relation homme/animal faisant parti du même paragraphe.`,
            note:"Note: Je me suis restreint à des relations spéciales (prédation, enmity, friendship)",
            sortie: ""
        },
        sparql: `PREFIX oa:     <http://www.w3.org/ns/oa#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX schema:  <http://schema.org/>
        PREFIX paragraph: <http://www.zoomathia.com/>
        
        SELECT DISTINCT ?paragraph ?name_animal ?name_relation ?name_anthro ?anthro_collection_name WHERE {
        ?annotation1 oa:hasBody ?animal; oa:hasTarget [ oa:hasSource ?paragraph; oa:hasSelector [oa:exact ?mention_animal]].
        ?annotation2 oa:hasBody ?relation; oa:hasTarget [ oa:hasSource ?paragraph; oa:hasSelector [oa:exact ?mention_relation]].
        
        ?annotation3 oa:hasBody ?anthro;
                oa:hasTarget ?target3.
        ?target3 oa:hasSource ?paragraph;
            oa:hasSelector ?selector3.
        ?selector3 oa:exact ?mention_anthro.
        
        ?animal a skos:Concept;
            skos:prefLabel ?name_animal.
            
        ?animal_collection a skos:Collection;
            skos:prefLabel "Ancient class"@en;
            skos:member ?animal.
        
        ?relation skos:prefLabel ?name_relation;
                            skos:broader+ ?relation_generique.
        ?relation_generique skos:prefLabel  "special relationship"@en.
        
        ?anthro skos:prefLabel ?name_anthro.
        ?anthro_collection skos:prefLabel ?anthro_collection_name;
            skos:member ?anthro.

        FILTER (lang(?name_animal) = "en").
        FILTER (lang(?name_relation) = "en")
        FILTER (lang(?name_anthro) = "en")
        FILTER (?anthro_collection_name in ("Place"@en, "Anthroponym"@en))
        FILTER NOT EXISTS {?x  skos:broader ?animal}
        }
        ORDER BY ?paragraph`,
        labelViz : ["name_animal", "name_anthro"],
        linkEdge : [
            {from: "name_animal", to: "name_anthro", name: "name_relation"}
        ],
        nodeParameters: {
            "name_animal" : "red",
            "name_anthro" : "blue"
        },
        nodesConstraint : [
            {
                variable : {
                    label : "name_anthro",
                    variableConstraint: "anthro_collection_name",
                    constraintStr: "Place",
                    color : "purple"
                }
            }
        ]
    },
    {
        number:"2_bis",
        question: "Quelles anecdotes mettant en relation un homme et un animal (pas toutes les relations hommes/animaux, comme la chasse, etc., mais seulement les situations individuelles, qui seront probablement marquées par un nom propre, ou un nom de lieu, etc.)",
        about: {
            reformulation:`Reformulation: Les annotation mentionnant une anecdote, une relation homme/animal faisant parti du même paragraphe.`,
            note:"Note: Je me suis restreint à des relations spéciales (prédation, enmity, friendship)",
            sortie: ""
        },
        sparql: `PREFIX oa:     <http://www.w3.org/ns/oa#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX schema:  <http://schema.org/>
        PREFIX paragraph: <http://www.zoomathia.com/>
        
        SELECT DISTINCT ?paragraph ?name_animal ?name_relation ?name_anthro ?anthro_collection_name WHERE {
        ?annotation1 oa:hasBody ?animal; oa:hasTarget [ oa:hasSource ?paragraph; oa:hasSelector [oa:exact ?mention_animal]].
        ?annotation2 oa:hasBody ?relation; oa:hasTarget [ oa:hasSource ?paragraph; oa:hasSelector [oa:exact ?mention_relation]].
        
        ?annotation3 oa:hasBody ?anthro;
                oa:hasTarget ?target3.
        ?target3 oa:hasSource ?paragraph;
            oa:hasSelector ?selector3.
        ?selector3 oa:exact ?mention_anthro.
        
        ?animal a skos:Concept;
            skos:prefLabel ?name_animal.
            
        ?animal_collection a skos:Collection;
            skos:prefLabel "Ancient class"@en;
            skos:member ?animal.
        
        ?relation skos:prefLabel ?name_relation;
                            skos:broader+ ?relation_generique.
        ?relation_generique skos:prefLabel  "special relationship"@en.
        
        ?anthro skos:prefLabel ?name_anthro.
        ?anthro_collection skos:prefLabel ?anthro_collection_name;
            skos:member ?anthro.

        FILTER (lang(?name_animal) = "en").
        FILTER (lang(?name_relation) = "en")
        FILTER (lang(?name_anthro) = "en")
        FILTER (?anthro_collection_name in ("Place"@en, "Anthroponym"@en))
        FILTER NOT EXISTS {?x  skos:broader ?animal}
        }
        ORDER BY ?paragraph`,
        labelViz : ["name_animal", "name_anthro", "name_relation"],
        linkEdge : [
            {from: "name_animal", to: "name_anthro", name: ""},
            {from: "name_animal", to: "name_relation", name: ""}
        ],
        nodeParameters: {
            "name_animal" : "red",
            "name_anthro" : "blue",
            "name_relation" : "green"
        },
        nodesConstraint : [
            {
                variable : {
                    label : "name_anthro",
                    variableConstraint: "anthro_collection_name",
                    constraintStr: "Place",
                    color : "purple"
                }
            }
        ]
    },
    {
        number: 3,
        question: "Quels sont les oiseaux qui sont consommés (gastronomie)",
        about: {
            reformulation: "Reformulation: Les annotations mentionnant un oiseau et une gastronomie faisant parti du même paragraphe",
            note: "Note: L'insertion d'une collection Oiseau serait intéressante.",
            sortie: ""
        },
        sparql: `PREFIX oa:     <http://www.w3.org/ns/oa#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX schema:  <http://schema.org/>
        
        SELECT DISTINCT ?paragraph ?name_animal ?mention_animal ?name_conso ?mention_conso WHERE {
          ?annotation1 a oa:Annotation;
                      oa:hasBody ?animal;
                      oa:hasTarget ?target1.
          ?target1 oa:hasSource ?paragraph;
             oa:hasSelector ?selector.
            
          ?selector oa:exact ?mention_animal.
        
          ?animal a skos:Concept;
               skos:prefLabel ?name_animal;
               skos:broader+ ?animal_generique.
            
          ?animal_generique a skos:Concept;
               skos:prefLabel ?name_animal_generique.
        
          ?annotation2 oa:hasBody ?conso;
                oa:hasTarget ?target2.
          ?target2 oa:hasSource ?paragraph;
              oa:hasSelector ?selector2.
          ?selector2 oa:exact ?mention_conso.
        
          ?conso skos:prefLabel ?name_conso;
                             skos:broader+ ?conso_generique.
          ?conso_generique skos:prefLabel ?name_conso_generique.
        
          FILTER (str(?name_animal_generique) in ("BIRD","BIRD WITH CLAW","BIRD WITH TOES","WATERBIRD","NIGHT BIRD","MIGRATORY BIRD", "PALMIPED BIRD")).
          FILTER (str(?name_conso_generique) = "animal in human nourishing").
          FILTER (lang(?name_animal) = "en").
          FILTER (lang(?name_conso) = "en")
          FILTER NOT EXISTS {?x  skos:broader ?animal}
        }
        ORDER BY ?paragraph`,
        labelViz : ["name_animal"],
        linkEdge : [
            //{from: "name_animal", to: "name_conso", name: ""}
        ],
        nodeParameters: {
            "name_animal" : "red",
            "name_conso" : "blue"
        }
    },
    {
        number: 4,
        question: `Quels sont les remèdes (thérapeutiques) qui incluent une langue animale (ou un morceau de langue)?`,
        about: {
            reformulation: `Reformulation: Les annotations qui mentionnent un remède , une langue et un animal faisant parti du même paragraphe`,
            note: `Note: Difficile de trouver le concept "remède thérapeutique" ou "remède". Dans la hiérarchie, il existe remède vétérinaire (erreur dans l'accent utilisé dans le thésaurus). https://opentheso.huma-num.fr/opentheso/?idc=105552&idt=th310 Tentative d'utilisation "medical use of animal", "medical use of animal parts". Résultat basé sur le concept générique "medical use of animal" et inclue tous les descendant.`,
            sortie: ``
        },
        sparql: `PREFIX oa:     <http://www.w3.org/ns/oa#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX schema:  <http://schema.org/>
        
        SELECT DISTINCT ?paragraph ?name_animal ?mention1 ?name_use ?mention2 WHERE {
          ?annotation1 a oa:Annotation;
                      oa:hasBody ?animal;
                      oa:hasTarget ?target1.
          ?target1 oa:hasSource ?paragraph;
             oa:hasSelector ?selector1.
        
        ?annotation2 a oa:Annotation;
                      oa:hasBody ?use;
                      oa:hasTarget ?target2.
          ?target2 oa:hasSource ?paragraph;
             oa:hasSelector ?selector2.
            
          ?selector1 oa:exact ?mention1.
          ?selector2 oa:exact ?mention2.
        
          ?animal a skos:Concept;
               skos:prefLabel ?name_animal.
            
          ?animal_collection a skos:Collection;
               skos:prefLabel ?name_animal_collection;
               skos:member ?animal.
        
          ?use skos:prefLabel ?name_use;
            skos:broader+ ?use_generique.
          ?use_generique skos:prefLabel ?name_use_generique.
        
          FILTER (str(?name_animal_collection) = "Ancient class").
          FILTER (str(?name_use_generique) = "medical use of animal").
          FILTER (lang(?name_animal) = "en").
          FILTER (lang(?name_use) = "en")
          FILTER NOT EXISTS {?x  skos:broader ?animal}
        }
        ORDER BY ?paragraph`,
        labelViz : ["name_animal", "name_use"],
        linkEdge : [
            {from: "name_animal", to: "name_use", name:"utilisation"}
        ],
        nodeParameters: {
            "name_animal" : "red",
            "name_use" : "blue"
        }
    },
    {
        number: 5,
        question: `Quels sont les animaux qui communiquent entre eux (textes où il est question de mode de communication, de langage, etc.)?`,
        about: {
            reformulation: `Remarque: Pas de concept spécifique qui représente ce comportement dans "comportement social". Le Concept le plus proche de communication est "Parole". Possibilité de chercher comportement social général et parole au sein d'un même paragraphe (Pas de résultat).`,
            note: `Solution: On se concentre uniquement sur le concept de parole. Ce qui inclue les mimiques, la compréhension de la parole humaine, etc...`,
            sortie: ``
        },
        sparql: `PREFIX oa:     <http://www.w3.org/ns/oa#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX schema:  <http://schema.org/>
        
        SELECT DISTINCT ?paragraph ?name_animal ?mention_animal ?name_social ?mention_social WHERE {
          ?annotation1 a oa:Annotation;
                      oa:hasBody ?animal;
                      oa:hasTarget ?target1.
          ?target1 oa:hasSource ?paragraph;
             oa:hasSelector ?selector.
            
          ?selector oa:exact ?mention_animal.
        
          ?animal a skos:Concept;
               skos:prefLabel ?name_animal.
            
          ?animal_collection a skos:Collection;
               skos:prefLabel ?name_animal_collection;
               skos:member ?animal.
        
          ?annotation2 oa:hasBody ?social;
                oa:hasTarget ?target2.
          ?target2 oa:hasSource ?paragraph;
              oa:hasSelector ?selector2.
          ?selector2 oa:exact ?mention_social.
        
          ?social skos:prefLabel ?name_social.
        
          FILTER (str(?name_animal_collection) = "Ancient class").
          FILTER (str(?name_social) = "speech").
          FILTER (lang(?name_animal) = "en").
          FILTER (lang(?name_social) = "en")
          FILTER NOT EXISTS {?x  skos:broader ?animal}
        }
        ORDER BY ?paragraph`,
        labelViz : ["name_animal"],
        linkEdge : [
            //{from: "name_animal", to: "name_social", name: "communique"}
        ],
        nodeParameters: {
            "name_animal" : "red",
            "name_social" : "blue"
        }
    },
 /*   {
        number: 6,
        question: `Sur le rythme alimentaire des animaux : quels sont les animaux capables de jeûner, quelles sont les informations sur les rythmes de repas (fréquence)?`,
        about: {
            reformulation: `Reformulation: une annotation mentionnant un animal et une annotation mentionnant le jeune dans le même paragraphe.`,
            note: `Note: Jeûne en anglais se dit "Fast" ou "Fasting". Peut être renommer le concept en Fasting pour éviter toutes confusion. (se trouve dans vie quotidienne)`,
            sortie: ``
        },
        sparql: `PREFIX oa:     <http://www.w3.org/ns/oa#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX schema:  <http://schema.org/>
        
        SELECT DISTINCT ?paragraph ?mention_fasting WHERE {
          ?annotation2 oa:hasBody ?fasting;
                oa:hasTarget ?target2.
          ?target2 oa:hasSource ?paragraph;
              oa:hasSelector ?selector2.
          ?selector2 oa:exact ?mention_fasting.
        
          ?fasting skos:prefLabel ?name_fasting.
        
          FILTER (str(?name_fasting) = "fast")
          FILTER (lang(?name_fasting) = "en")
        }
        ORDER BY ?paragraph`
    },*/
    {
        number: 7,
        question: `Quelles sont les données transmises sur le temps de gestation des animaux?`,
        about: {
            reformulation: `Remarque: Il n'existe pas de concept représentant la "valeur" du temps de gestion. Voir ce qu'on peut faire (une collection de valeur ?)`,
            note: ``,
            sortie: ``
        },
        sparql: `PREFIX oa:     <http://www.w3.org/ns/oa#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX schema:  <http://schema.org/>
        
        SELECT DISTINCT ?paragraph ?name_animal ?mention_animal ?mention_pregnancy WHERE {
        ?annotation1 a oa:Annotation;
                      oa:hasBody ?animal;
                      oa:hasTarget ?target1.
          ?target1 oa:hasSource ?paragraph;
             oa:hasSelector ?selector.
            
          ?selector oa:exact ?mention_animal.
        
          ?animal a skos:Concept;
               skos:prefLabel ?name_animal.
            
          ?animal_collection a skos:Collection;
               skos:prefLabel ?name_animal_collection;
               skos:member ?animal.
        
          ?annotation2 oa:hasBody ?pregnancy;
                oa:hasTarget ?target2.
          ?target2 oa:hasSource ?paragraph;
              oa:hasSelector ?selector2.
          ?selector2 oa:exact ?mention_pregnancy.
        
          ?pregnancy skos:prefLabel ?name_pregnancy.
        
          FILTER (str(?name_pregnancy) = "length of pregnancy").
          FILTER (lang(?name_pregnancy) = "en")
          FILTER (str(?name_animal_collection) = "Ancient class").
          FILTER (lang(?name_animal) = "en").
          FILTER NOT EXISTS {?x  skos:broader ?animal}
        }
        ORDER BY ?paragraph`,
        labelViz : ["name_animal"],
        linkEdge : [
        ],
        nodeParameters: {
            "name_animal" : "red",
        }
    },
    {
        number: 8,
        question: `Quelles sont les expérimentations faites sur les animaux (contexte, description…)?`,
        about: {
            reformulation: `Remarque: Pas de concept expérimentations. On peut éventuellement se trouver dans le cadre d'une "utilisation de l'animal", cependant il n'y a pas de concept expriment l'utilisation pour la science ou autre. Peut être que ça rentre dans "l'utilisation médical" ou "technique" ?`,
            note: ``,
            sortie: ``
        },
        sparql: `PREFIX oa:     <http://www.w3.org/ns/oa#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX schema:  <http://schema.org/>
        
        SELECT DISTINCT ?paragraph ?name_animal ?mention_animal ?name_use ?mention_use WHERE {
        ?annotation1 a oa:Annotation;
                      oa:hasBody ?animal;
                      oa:hasTarget ?target1.
          ?target1 oa:hasSource ?paragraph;
             oa:hasSelector ?selector.
            
          ?selector oa:exact ?mention_animal.
        
          ?animal a skos:Concept;
               skos:prefLabel ?name_animal.
            
          ?animal_collection a skos:Collection;
               skos:prefLabel ?name_animal_collection;
               skos:member ?animal.
        
          ?annotation2 oa:hasBody ?use;
                oa:hasTarget ?target2.
          ?target2 oa:hasSource ?paragraph;
              oa:hasSelector ?selector2.
          ?selector2 oa:exact ?mention_use.
        
          ?use skos:prefLabel ?name_use.
        
          FILTER (str(?name_use) = "technical use").
          FILTER (lang(?name_use) = "en")
          FILTER (str(?name_animal_collection) = "Ancient class").
          FILTER (lang(?name_animal) = "en").
          FILTER NOT EXISTS {?x  skos:broader ?animal}
        }
        ORDER BY ?paragraph`,
        labelViz : ["name_animal", "name_use"],
        linkEdge : [
            {from: "name_animal", to: "name_use", name: "utilisation"}
        ],
        nodeParameters: {
            "name_animal" : "red",
            "name_use" : "blue"
        }
    }

]
export default qc;
/*`
{
    number: ,
    question: ``,
    about: {
        reformulation: ``,
        note: ``,
        sortie: ``
    },
    sparql: ``
}
`
*/