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

export {sparqlRequest, emptyAboutValue};