import React, { useState, useEffect} from 'react';
import styles from "./TextDisplay.module.css";
import  { sparqlRequest } from '../util_functions/utility';
import qc from '../util_functions/qc_queries';
import sparql_endpoint from '../util_functions/config';

let i = 0;

const QcElement = ({question}) => {
    const title = `QC${question.number} - ${question.question}`
    const objectif = `${question.about.objectif}`
    const reformulation = `${question.about.reformulation}`
    const restriction = `${question.about.restriction}`
    const note =  `${question.about.note}`
    const sortie = ` ${question.about.sortie}`

    return <section className={styles["query-row"]}>
        <h2>{title}</h2>
        <p><b><u>Objectif</u></b> : {objectif}</p>
        <p><b><u>Reformulation</u></b> : {reformulation}</p>
        <p><b><u>Restriction</u></b> : {restriction}</p>
        <p><b><u>Note</u></b> : {note}</p>
        <p><b><u>Sortie</u></b> : {sortie}</p>
        <details>
            <summary className={styles["summary"]}>Afficher le résultat</summary>
            <TableRender question={question} />
        </details>
    </section>
}

const TableRender = ({question}) => {
    const [textRows, setTextRows] = useState([])
    const [labelRows, setLabelRows] = useState([])

    useEffect(() => {
        const dataFetch = async () => {
            const data = await sparqlRequest(sparql_endpoint, question.sparql).then(({head, results}) => {
                return results.bindings
            })

            let resulatLabel = []
            Object.keys(data[0]).forEach(label => resulatLabel.push(<th className={styles["row"]}>{label}</th>))

            let resultBindings = []
            data.forEach(elt => resultBindings.push(<TextRow element={elt}/>))

            setTextRows(resultBindings)
            setLabelRows(resulatLabel)

        }
        dataFetch()
    }, [])

    return <table>
        <thead>
            <tr>
                {labelRows}
            </tr>
        </thead>
        <tbody className={styles["content"]}>
            {textRows}
        </tbody>   
    </table>
}

const TextRow = ({element}) => {
    const sparqlRender = []

    function eltToTable(){
        let label = Object.keys(element)
        label.forEach(variable => {
            let value = element[variable].value
            i++
            sparqlRender.push(<td key={i++} className={styles["row"]}>{value}</td>)
        })
    }
    eltToTable()

    return <tr className={styles["row"]}>
        {sparqlRender}
    </tr>
}

const TextDisplay = () => {
    const [qcs, setQcs] = useState([])

    useEffect(() => {
        const toGenerate = []
        qc.forEach(qc_obj => toGenerate.push(<QcElement question={qc_obj}/>))
        setQcs(toGenerate)
    },[])

    

    return <section className={styles['section-text']}>
    <h1>Module SPARQL result to Table vizualisation</h1>
        {qcs}
    </section>
}

export default TextDisplay;