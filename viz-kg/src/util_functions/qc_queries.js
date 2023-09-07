const qc = [
    {
        number: 1,
        question: "Quels sont les animaux qui construisent un habitat ?",
        about: {
            objectif : `Cette question exprime le besoin du chercheur à cibler les passages dans le texte où l'auteur mentionne un animal et la construction d'un habitat.`,
            reformulation: `Reformulation: Les annotations qui mentionnent un animal et une construction d'habitation étant dans le même paragraphe.`,
            restriction : `Pour restreindre les résultats et apporté de la cohérence entre les deux concepts, l'apparition des deux concepts mentionnés plus haut doivent faire partie du même paragraphe.`,
            note: `Note: généralisation de l'animal faisant parti de la collection "Archéotaxon" ("Ancient class" en anglais).`,
            sortie: "Sortie: Le paragraphe, l'animal (concept), le texte mentionnant l'animal, la construction (concept), le texte mentionnant la construction."
        },
        sparql: `PREFIX oa:     <http://www.w3.org/ns/oa#>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX schema:  <http://schema.org/>
    SELECT DISTINCT ?paragraph ?text ?name_animal ?mention_animal ?name_construction ?mention_construction WHERE {
        ?annotation1 oa:hasBody ?animal ; oa:hasTarget [ oa:hasSource ?paragraph; oa:hasSelector [ oa:exact ?mention_animal]].
        ?animal skos:prefLabel ?name_animal.
        ?animal_collection a skos:Collection;
            skos:prefLabel "Ancient class"@en;
            skos:member ?animal.
        
        ?annotation2 oa:hasBody ?construction;
                oa:hasTarget [oa:hasSource ?paragraph;
                    oa:hasSelector [oa:exact ?mention_construction]].
        ?paragraph schema:text ?text.
        
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
            {from: "name_animal", to: "name_construction", name: ""}
        ],
        nodeParameters: {
            "name_animal" : "red",
            "name_construction" : "blue"
        }
    },
    {
        number:2,
        question: "Quelles anecdotes mettent en relation un homme et un animal ?",
        about: {
            objectif : `Cette question exprime le besoin du chercheur à cibler les passages dans le texte où l'auteur mentionne une relation entre un animal et l'homme. Cette relation est décrite au travers d'une anecdote. Les relations comme la chasse et autres ne sont pas attendu. Uniquement les situations individuelles.`,
            reformulation:`La reformulation de la requête SPARQL est très complexe. Pour étudier les possibilités offertes, la requête sera décomposé en plusieurs requêtes portant sur différent concept.`,
            restriction : `Pour restreindre les résultats et apporté de la cohérence entre les deux concepts, l'apparition des concepts mentionnés plus haut doivent faire partie du même paragraphe.`,
            note: "Une anecdote est un concept très difficile à caractériser. La définition proposée est la suivante: une anecdote est un évènemment unique, daté mettant en relation un antroponyme et un animal dans un lieu précisé. Toutes ces informations peuvent ne pas apparaitre dans le texte. De plus, il est possible que lors de l'annotation, le concept d'anecdote n'ait pas été renseigné.",
            sortie: "L'anecdote, l'animal, l'homme, la relation homme animal, le lieu et la date."
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
        question: "Quelles anecdotes mettent en relation un homme et un animal (Uniquement les proximité anecdote et animal dans le paragraphe)?",
        about: {
            objectif : `Cette question exprime le besoin du chercheur à cibler les passages dans le texte où l'auteur mentionne une relation entre un animal et l'homme. Cette relation est décrite au travers d'une anecdote. Les relations comme la chasse et autres ne sont pas attendu. Uniquement les situations individuelles.`,
            reformulation:`Reformulation: Les annotation mentionnant une anecdote, une relation homme/animal et un animal faisant parti du même paragraphe.`,
            restriction : `Pour restreindre les résultats et apporté de la cohérence entre les deux concepts, l'apparition des concepts mentionnés plus haut doivent faire partie du même paragraphe.`,
            note:"Note: Je me suis restreint à des relations spéciales (prédation, enmity, friendship)",
            sortie: "L'anecdote, l'animal et la relation homme/animal."
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
            objectif : `Cette question exprime le besoin des chercheurs à identifier les passages dans le texte où il est question des espèces d'oiseaux qui sont utilisées dans la gastronomie.`,
            reformulation: `cette question s'exprime très facilement en SPARQL et revient à chercher : (1) une annotation ayant un concept animal descendant du concept oiseau et (2) un concept descendant du concept "animaux dans la nourriture humaine".`,
            restriction : `La mention du concept de gastronomie et la mention du concept animal doivent faire partie du même paragraphe.`,
            note: `Le concept générique "Oiseau" ne couvrent pas l'ensemble des concepts d'oiseau du thésaurus. D'autre hierarchie existe pour qualifier certaines espèces d'oiseau (oiseau palmipède, oiseau avec griffe etc). Par conséquent, il faut prendre en compte tous ces concepts dans la recherche. Une solution possible pour "corriger" ce problème est de reconsidérer la place du concept "OISEAU" dans la hiérarchie sachant que les autres sont, en soit, généralisable comme étant des oiseaux.
            L'absence de résultat entre les deux versions de ZooKG s'explique par l'absence du concept "cooking" ignoré lors de la génération car étant ambiguë (55 occurences). Cette ambiguité a été réglé dans la nouvelle version du thésaurus.`,
            sortie: "Les oiseaux consommés"
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
        question: `Quels sont les usages thérapeutiques des parties d'animaux ?`,
        about: {
            objectif : `Cette question est dérivé de la question originelle "Quels sont les remèdes (thérapeutiques) qui incluent une langue animale (ou un morceau de langue)?" qui ne pouvait être exprimer en SPARQL à cause de l'absence d'annotation relatif aux remèdes et l'absence du concept même dans le thesaurus. Ce concept sera ajouté lors de l'annotation des livres 28 à 30 qui traitent des remèdes et utilisation médicale des animaux.`,
            reformulation: `Cette question s'exprime en SPARQL en recherchant : (1) un concept animal et (2) un concept descendant du concept "utilisation médical de l'animal".`,
            restriction : `La mention de l'animal et du concept de l'utilisation animal doivent faire partie du même paragraphe.`,
            note: `Note: Difficile de trouver le concept "remède thérapeutique" ou "remède". Dans la hiérarchie, il existe remède vétérinaire (erreur dans l'accent utilisé dans le thésaurus). https://opentheso.huma-num.fr/opentheso/?idc=105552&idt=th310 Tentative d'utilisation "medical use of animal", "medical use of animal parts". Résultat basé sur le concept générique "medical use of animal" et inclue tous les descendant.
            La partie animal n'est pas précisé.`,
            sortie: `L'animal et le concept d'utilisation de cette animal`
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
            {from: "name_animal", to: "name_use", name:""}
        ],
        nodeParameters: {
            "name_animal" : "red",
            "name_use" : "blue"
        }
    },
    {
        number: 5,
        question: `Quels sont les animaux qui communiquent entre eux ?`,
        about: {
            objectif:`Cette requête exprime le besoin des chercheurs à identifier les animaux capables de communiquer au sein de la même espèces.`,
            reformulation: `Pour représenter cette question en SPARQL, nous cherchons les paragraphes qui mentionnent : (1) un concept d'animal et (2) un concept de parole ou "capacité linguistique".`,
            restriction: `La mention de l'animal et de la communication doivent faire partie du même paragraphe.`,
            note: `Ce sont bien des communications intra-espèce et non inter-espèce qui intéresse le chercheur dans ce cas-ci. Le concept "capacité linguistique" est trop générique et inclu les espèces qui sont capables de reproduire des sonorités humaines. Cela de veut pas dire que ces espèces communiquent.`,
            sortie: `Les animaux qui communiquent entre eux.`
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
    {
        number: 6,
        question: `Quels sont les animaux capables de jeûner, quelles sont les informations sur les rythmes de repas (fréquence)?`,
        about: {
            objectif : `L'intention derrière cette requête est d'étudier le rythme alimentaire des animaux.`,
            reformulation: `Pour représenter cette question en SPARQL, nous cherchons les paragraphes qui mentionnent : (1) un concept d'animal et (2) le concept de jeûne (fasting).`,
            restriction : `L'animal, la mention du jeûne et le rythme des repas doivent faire partie du même paragraphe.`,
            note: `Aucune mention du concept "fasting" n'est présente dans les annotations. Par conséquent, cette requête n'a pas de résultat. Il se trouve que le concept "special diet" a été utilisé dans les annotations manuelles mais n'a pas de correspondance dans le thésaurus TheZoo. Il est peut-être nécessaire de modifier cette annotation.`,
            sortie: `Le paragraphe et l'animal qui jeûne.`
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
    },
    {
        number: 7,
        question: `Quelles sont les données transmises sur le temps de gestation des animaux?`,
        about: {
            objectif : `L'intention du chercheur derrière cette requête est de synthétiser les connaissances sur la gestation des animaux se trouvant dans la littérature antique.`,
            reformulation: `Pour représenter cette question en SPARQL, nous cherchons les paragraphes qui mentionnent : (1) un concept d'animal et (2) le concept "length of pregnancy".`,
            restriction : `La mention de la gestation et de l'animal doivent faire partie du même paragraphe.`,
            note: `Il n'existe pas de concept représentant la "valeur" du temps de gestion. Voir ce qu'on peut faire (une collection de valeur ?)`,
            sortie: `Les paragraphes et l'animal`
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
            objectif : `L'intention derrière cette requête est de cibler les textes où une éxpérimentation sur les animaux est décrite et de dégager la ou les tendances expérimentales de l'époque.`,
            reformulation: `L'expression de cette requête en SPARQL revient à trouver les annotations qui mentionnent (1) un animal et (2) un concept d'expérimentation.`,
            restriction : `Le concept d'expérimentation, l'animal et la description doivent faire partie du même paragraphe.`,
            note: `Pas de concept expérimentations. On peut éventuellement se trouver dans le cadre d'une "utilisation de l'animal", cependant il n'y a pas de concept expriment l'utilisation pour la science ou autre. Peut être que ça rentre dans "l'utilisation médical" ou "technique" ?`,
            sortie: `Le paragraphe, l'animal et l'expérimentation.`
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
            {from: "name_animal", to: "name_use", name: ""}
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