import React, { useState, useEffect} from 'react';
import styles from "./TextDisplay.module.css";
import sparqlRequest from '../util_functions/utility';
import qc1 from '../util_functions/qc_queries';
import sparql_endpoint from '../util_functions/config';

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
    let query = qc1

    useEffect(() => {
        const dataFetch = async  () => {
            const data = await sparqlRequest(sparql_endpoint, query).then(({head, results}) => {
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