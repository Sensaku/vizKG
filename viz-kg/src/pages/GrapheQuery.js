import React, { useState, useEffect, useRef} from 'react';
import styles from "./css/GrapheQuery.module.css";
import NetworkChart from '../composant/NetworkChart';
import qc from '../util_functions/qc_queries';
import  { sparqlRequest, emptyAboutValue, sparqlConvertNetwork } from '../util_functions/utility';
import sparql_endpoint from '../util_functions/config';

const DisplaySection = ({question, graph}) => {
    const title = `QC${question.number} - ${question.question}`
    const about = `${question.about.description} ${question.about.reformulation} ${question.about.sortie}`

    return <section className={styles["query-row"]}>
        <div className={styles["left-about"]}>
            <h3>{title}</h3>
            <p>{about}</p>
        </div>
        <div className={styles["right-canvas"]}>
            <NetworkChart key={`graph_canvas_${question.number}`} graph={graph} question={question}/>
        </div>
    </section>
}


const GrapheQuery = () => {
    const [sectionList, setSectionList] = useState([]);

    useEffect(() => {
        const sList = []
        const dataFetch = async (question) => {
            const data = await sparqlRequest(sparql_endpoint, question.sparql).then(({head, results}) => {
                return results.bindings 
            })

            const g = await sparqlConvertNetwork(
                data,
                question.labelViz,
                question.nodeParameters,
                question.linkEdge
            )
            sList.push(<DisplaySection key={`section_qc_${question.number}`} graph={g} question={question}/>)
            setSectionList(sList)
        }
        qc.forEach((qc_obj) => {
            dataFetch(qc_obj)
        })
        

        /*qc.forEach((qc_object) => {
            dataFetch(qc_object)
        })*/
    }, [])

    

    return <div className={styles["content"]}>
        <h1>This is the graph query vizualisation</h1>  
        {sectionList}
    </div>
}

export default GrapheQuery;

/*
D3 svg ref

import * as d3 from "d3";

    const svgRef = useRef(null);
    const svgWidth = 700;
    const svgHeight = 500;

    useEffect(() => { 
        d3.select(svgRef.current)
            .append('rect')
            .attr('width', 100)
            .attr('height', 100)
            .attr("fill", 'blue')
    },[])
//<svg ref={svgRef} width={svgWidth} height={svgHeight} /> 
*/