import React, { useState, useEffect, useRef} from 'react';
import styles from "./css/GrapheQuery.module.css";
import NetworkChart from '../composant/NetworkChart';

const DisplaySection = () => {
    const title = "QC1 : Inférence possible"
    const about = "Visualisation de l'inférence"

    return <section className={styles["query-row"]}>
        <div className={styles["left-about"]}>
            <h3>{title}</h3>
            <p>{about}</p>
        </div>
        <div className={styles["right-canvas"]}>
            <NetworkChart key={1} graph={{}} options={{}} events={{}}/>
        </div>
    </section>
}


const GrapheQuery = () => {
    const sectionList = [<DisplaySection key={"section_query_1"} />, <DisplaySection key={"section_query_2"} />];

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