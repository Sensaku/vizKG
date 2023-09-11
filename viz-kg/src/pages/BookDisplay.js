import React, { useState, useEffect} from 'react';
import styles from "./css/BookDisplay.module.css";
import  { sparqlRequest} from '../util_functions/utility';
import sparql_endpoint from '../util_functions/config';

const text_query = `PREFIX schema: <http://schema.org/>

SELECT ?p_number ?p_text WHERE {
?p schema:text ?p_text;
schema:identifier ?p_number;
schema:isPartOf ?chapter.

?chapter a schema:Book;
schema:identifier "8".
}
ORDER BY ?p_number
`

const makeParagraphQuery = (url) => {
    return `PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX oa: <http://www.w3.org/ns/oa#>
    
    SELECT DISTINCT ?concept ?label WHERE {
            ?annotation a oa:Annotation;
    oa:hasBody ?concept;
    oa:hasTarget [ oa:hasSource ${url}].
    
    ?concept skos:prefLabel ?label.
    FILTER(lang(?label) = "en")
    }`
}

const comparer = (a,b) => {
    return a[0] - b[0]
}

const AnnotationBlock = ({annotation_paragraph}) => {

    const [annotationList, setAnnotationList] = useState([])
    
    useEffect(() => {
        const res_list = []
        const annotation_data = async (annotation_paragraph) => {
            const data = await sparqlRequest(sparql_endpoint, makeParagraphQuery(annotation_paragraph)).then(({head, results}) => {
                return results.bindings
            })
            data.forEach(elt => {
                res_list.push(<li><a href={elt.concept.value} >{elt.label.value}</a></li>)
            })
            setAnnotationList(res_list)
        }
        annotation_data(annotation_paragraph)
    })

    return <>
        {annotationList}
    </>

}

const ParagraphBlock = ({p_number, p_text, p_url}) => {
    return <div id={p_number} key={p_number} className={styles["paragraph-block"]}>
        <div class={styles["paragraph-id"]}>
            <p className={styles["paragraph-number"]}>{p_number}</p>
        </div>
        <div class={styles["paragraph-content"]}>
            <p className={styles["paragraph-text"]}>{p_text.replaceAll("%22",'"')}</p>
        </div>
        <div class={styles["paragraph-concept"]}>
            <ul>
                <AnnotationBlock key={p_url} annotation_paragraph={p_url} />
            </ul>
        </div>
    </div>
}

const BookDisplay = () => {
    const [paragraphList, setParagraphList] = useState([]);

    useEffect(() => {
        const res_list = []
        const output_display = []
        const dataFetch = async (q) => {
            const data = await sparqlRequest(sparql_endpoint, q).then(({head, results}) => {
                return results.bindings
            })
            data.forEach(element => {
                res_list.push([parseInt(element.p_number.value), element.p_text.value])
            })
            res_list.sort(comparer)
            res_list.forEach(async (element) => {
                const paragraph_url = `<http://www.zoomathia.com/Pline/8/${element[0]}>`
                output_display.push(<ParagraphBlock key={element[0]} p_number={element[0]} p_text={element[1]} p_url={paragraph_url}/>)
            })
            setParagraphList(output_display)
        }
        dataFetch(text_query)
    })

    return <section id="book-section">
        <h2>Historia Naturalis - Livre 8</h2>
        {paragraphList}
    </section>
}

export default BookDisplay; 
export {ParagraphBlock};