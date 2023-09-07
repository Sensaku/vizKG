import React, { useState, useEffect} from 'react';
import styles from "./css/GrapheQuery.module.css";
import NetworkChart from '../composant/NetworkChart';
import qc from '../util_functions/qc_queries';
import  { sparqlRequest, sparqlConvertNetwork } from '../util_functions/utility';
import sparql_endpoint from '../util_functions/config';

const DisplaySection = ({question, graph}) => {
    const title = `QC${question.number} - ${question.question}`
    const objectif = `${question.about.objectif}`
    const reformulation = `${question.about.reformulation}`
    const restriction = `${question.about.restriction}`
    const note =  `${question.about.note}`
    const sortie = ` ${question.about.sortie}`
    const [gMark, setGMark] = useState(<div></div>)

    useEffect(() => {
        const dataFetch = async () => {
            const data = await sparqlRequest(sparql_endpoint, question.sparql).then(({head, results}) => {
                return results.bindings 
            })

            let constraintTable = []
            if ("nodesConstraint" in question) {
                constraintTable = question.nodesConstraint
            }

            const g = await sparqlConvertNetwork(
                data,
                question.labelViz,
                question.nodeParameters,
                question.linkEdge,
                constraintTable
            )
            setGMark(<NetworkChart key={`graph_canvas_${question.number}`} graph={g} question={question}/>)
        }
        dataFetch()
    }, [])

    return <section className={styles["query-row"]}>
        <div className={styles["left-about"]}>
            <h3>{title}</h3>
            <p><b><u>Objectif</u></b> : {objectif}</p>
            <p><b><u>Reformulation</u></b> : {reformulation}</p>
            <p><b><u>Restriction</u></b> : {restriction}</p>
            <p><b><u>Note</u></b> : {note}</p>
            <p><b><u>Sortie</u></b> : {sortie}</p>
        </div>
        <div className={styles["right-canvas"]}>
            {gMark}
        </div>
    </section>
}


const GraphModule = () => {
    const [sectionList, setSectionList] = useState([]);

    useEffect(() => {
        const sList = []
        const qc_load = (qc_obj) => {
            sList.push(<DisplaySection key={`section_qc_${qc_obj.number}`} question={qc_obj}/>)
            setSectionList(sList)
        }
        qc.forEach(qc_obj => {
            qc_load(qc_obj)
        })
    }, [])

    

    return <div className={styles["content"]}>
        <h1>Module SPARQL result to Graph vizualisation</h1>  
        {sectionList}
    </div>
}

export default GraphModule;
