import React, { useState, useEffect} from 'react';
import styles from "./TextDisplay.module.css";

const endpoint = "http://54.36.123.165:8890/sparql/"
const query = `PREFIX oa:     <http://www.w3.org/ns/oa#>
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
async function sparql(endpoint, query){
    const url = endpoint + 
    '?query=' + encodeURIComponent(query) + 
    '&format=json';
    
    return await fetch(url).then((response) => response.json()).then((data) => {
        return data
    })
}

const TextRow = ({element}) => {
    return <div className={styles['row-text-display']}>
        <p className={styles['p-paragraph']}>{element.paragraph}</p>
        <p className={styles['p-text']}>{element.text}</p>
    </div>
}

const TextDisplay = () => {
    let [textRows, setTextRows] = useState([]);

    useEffect(() => {
        const dataFetch = async  () => {
            const data = await sparql(endpoint, query).then(({head, results}) => {
                console.log(results.bindings)
                return results.bindings
            })
            
            let resultBindings = []
            data.forEach(elt => {
                let element = {
                    paragraph : elt.paragraph.value,
                    text: elt.name_animal.value
                }
                console.log(element)
                resultBindings.push(<TextRow element={element}/>)
            })
            setTextRows(resultBindings)

        }
        dataFetch()
    }, [])

    return <section className={styles['section-text']}>
        <h2 className={styles['h2-text']}>Chapter 8</h2>
        <div className={styles['row-text-display']}>
            <p className={styles['p-paragraph']}>Paragraph number</p>
            <p className={styles['p-text']}>Text</p>
        </div>
        {textRows}
    </section>
}

export default TextDisplay;