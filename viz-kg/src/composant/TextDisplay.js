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
async function sparqlRequest(endpoint, query){
    const url = endpoint + 
    '?query=' + encodeURIComponent(query) + 
    '&format=json';
    
    return await fetch(url).then((response) => response.json()).then((data) => {
        return data
    })
}

const TextRow = ({element}) => {
    const sparqlRender = []

    function eltToTable(){
        let label = Object.keys(element)
        label.forEach(variable => {
            let value = element[variable].value
            sparqlRender.push(<td className={styles["row"]}>{value}</td>)
        })
    }
    eltToTable()

    return <tr className={styles["row"]}>
        {sparqlRender}
    </tr>
}

const TextDisplay = () => {
    let [textRows, setTextRows] = useState([])
    let [labelRows, setLabelRows] = useState([])

    useEffect(() => {
        const dataFetch = async  () => {
            const data = await sparqlRequest(endpoint, query).then(({head, results}) => {
                return results.bindings
            })

            let resulatLabel = []
            Object.keys(data[0]).forEach(label => {
                resulatLabel.push(<th className={styles["row"]}>{label}</th>)
            })
            let resultBindings = []
            data.forEach(elt => {
                resultBindings.push(<TextRow element={elt}/>)
            })
            setTextRows(resultBindings)
            setLabelRows(resulatLabel)

        }
        dataFetch()
    }, [])

    return <section className={styles['section-text']}>
        <table>
            <thead>
                <tr>
                    {labelRows}
                </tr>
            </thead>
            <tbody>
                {textRows}
            </tbody>   
        </table>
        
    </section>
}

export default TextDisplay;