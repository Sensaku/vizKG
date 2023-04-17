import React, { useState, useEffect, useRef} from 'react';
import Graph from 'react-graph-vis';
import styles from "./NetworkChart.module.css";


const NetworkChart = ({graph, question}) => {
    const [options, setOptions] = useState({
        layout: {
          hierarchical: false
        },
        nodes:{
            shape: 'ellipse',
            widthConstraint : true,
        },
        edges: {
          arrows: 'to',
          color: "#000000",
          smooth: true,
          font : {
            size: 24
          }
        },
        height: "500px",
    });
    const [events, setEvents] = useState({
        select: function(event) {
          var { nodes, edges } = event;
        }
    });

    const  [toRender, setToRender] = useState([]);
    useEffect(() => {
        const newGraph = []
        newGraph.push(<Graph 
            graph={graph}
            options={options}
            events={events}
            getNetwork={network => {}} />)
        setToRender(newGraph)
    },[])
    
    return <div key={`div_canvas_${question.number}`} className={styles["canvas"]}>
        {toRender}
    </div>

    
}

export default NetworkChart;


/*
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
        */