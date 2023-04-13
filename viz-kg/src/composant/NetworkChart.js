import React, { useState, useEffect, useRef} from 'react';
import ReactDom from "react-dom";
import Graph from 'react-graph-vis';
import styles from "./NetworkChart.module.css";

const NetworkChart = () => {
    const [graph, setGraph] = useState({});
    const [options, setOptions] = useState({});
    const [events, setEvents] = useState({});
    const toRender = [];
  
    useEffect(() => {
        const newGraph = {
            nodes: [
              { id: 1, label: "Node 1", title: "node 1 tootip text" , color: "red"},
              { id: 2, label: "Node 2", title: "node 2 tootip text" },
              { id: 3, label: "Node 3", title: "node 3 tootip text" },
              { id: 4, label: "Node 4", title: "node 4 tootip text" },
              { id: 5, label: "Node 5", title: "node 5 tootip text" }
            ],
            edges: [
              { from: 1, to: 2 , label: "test"},
              { from: 1, to: 3 },
              { from: 2, to: 4 },
              { from: 2, to: 5 }
            ]
        };

        setGraph(newGraph)

        const newOptions = {
            layout: {
              hierarchical: false
            },
            nodes:{
                shape: 'circle'
            },
            edges: {
              arrows: 'to',
              color: "#000000"
            },
            height: "500px",
        };

        setOptions(newOptions)

        const newEvents = {
            select: function(event) {
              var { nodes, edges } = event;
            }
        };

        setEvents(newEvents)

    },[])

    if(!(Object.keys(graph).length === 0 && graph.constructor === Object)){
        toRender.push(<Graph 
            key={1}
            graph={graph}
            options={options}
            events={events}
            getNetwork={network => {
    
            }}
        />)
    }

    return <div className={styles["canvas"]}>
        {toRender}
    </div>

    
}

export default NetworkChart;