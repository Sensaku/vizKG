import React, { useState, useEffect, useRef} from 'react';
import styles from "./css/GrapheQuery.module.css";
import * as d3 from "d3";
import NetworkChart from '../composant/NetworkChart';


const GrapheQuery = () => {
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

    return <div className={styles["content"]}>
        <h1>This is the graphe query vizualisation</h1>
        <svg ref={svgRef} width={svgWidth} height={svgHeight} />
        <NetworkChart />
    </div>
}

export default GrapheQuery;