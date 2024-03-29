const sparqlRequest = async (endpoint, query) => {
    const url = endpoint + 
    '?query=' + encodeURIComponent(query) + 
    '&format=json';
    
    return await fetch(url).then((response) => response.json()).then((data) => {
        return data
    })
}

const emptyAboutValue = (elt) => {
    if (elt === ""){
        return
    }
    return <p>{elt}</p>
}

const checkNodeAlreadyInList = (nodesArray, val) => {
    for(let i = 0; i < nodesArray.length; i++){
        if(nodesArray[i].id === val){
            return true;
        }
    }
    return false;
}

const sparqlConvertNetwork = async (resultBindings, labelToBind, nodesParameters, edgesDirection, constraintObject=[]) => {
    const graph = { nodes : [], edges : []}
    const nodes = [];
    const edges = [];
    //nodes : { id: 1, label: "Node 1", title: "node 1 tootip text" , color: "red"}
    //edges : { from: id_1, to: id_2 , label: "test"}

    resultBindings.forEach(row => {
        labelToBind.forEach(variable => {
            if(!(checkNodeAlreadyInList(nodes, row[variable].value))){

                let color = nodesParameters[variable]

                constraintObject.forEach(obj => {
                    if((obj.variable.label === variable) && (obj.variable.constraintStr === row[obj.variable.variableConstraint].value)){
                        color = obj.variable.color
                    }
                })
                
                const node = {
                    id: row[variable].value,
                    label:row[variable].value,
                    title:row[variable].value,
                    color: {
                        background: color,
                        hover : "#40E44D",
                        hightlight: "#40E44D"
                    },
                    font : {
                        color: "#ffffff",
                        size : 22,
                        bold: true
                    }
                }
                nodes.push(node)
            }
            
        })

        edgesDirection.forEach(obj => {
            let nameEdge = ""
            if (!(row[obj.name] === undefined)){
                nameEdge = row[obj.name].value
            }else{
                nameEdge = obj.name
            }
            const edge = {
                from: row[obj.from].value,
                to: row[obj.to].value,
                label: nameEdge
            }
            edges.push(edge)

        })        
    })

    graph.nodes = nodes
    graph.edges = edges

    return graph

    //graph.nodes.push({id: 1, label: resultBindings, title:resultBindings, color: nodesParameters[label].color})
    /**
     * nodesParameters : [{label : {color : "color"}}]
     * edgesDirection : [{from: node, to: node, name: "label"}]
    */

}

export {sparqlRequest, emptyAboutValue, sparqlConvertNetwork};