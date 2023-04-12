import React, { useState, useEffect} from 'react';
import styles from "./TextDisplay.module.css";
import  { sparqlRequest, emptyAboutValue } from '../util_functions/utility';
import qc from '../util_functions/qc_queries';
import sparql_endpoint from '../util_functions/config';

let i = 0;

const QcElement = ({question}) => {
    const reformulation = emptyAboutValue(question.about.reformulation)
    const note = emptyAboutValue(question.about.note)
    const sortie = emptyAboutValue(question.about.sortie)

    return <details>
        <summary className={styles["summary"]}>QC{question.number} : {question.question}</summary>
        <h2>QC{question.number} : {question.question}</h2>
        {reformulation}
        {note}
        {sortie}
        <TableRender question={question} />
    </details>
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
        {qcs}
    </section>
}

export default TextDisplay;