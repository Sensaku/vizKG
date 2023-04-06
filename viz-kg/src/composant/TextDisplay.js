import React from 'react';
import styles from "./TextDisplay.module.css";

const texts = []

for (let i = 100; i < 150; i++){
    texts.push({
        paragraph : i,
        text : `Texte du paragraphe ${i}.`
    })
}

const TextRow = ({element}) => {
    return <div className={styles['row-text-display']}>
        <p className={styles['p-paragraph']}>{element.paragraph}</p>
        <p className={styles['p-text']}>{element.text}</p>
    </div>
}

const TextDisplay = () => {
    const textRows = []

    texts.forEach(element => {
        textRows.push(<TextRow element={element} key={element.paragraph}/>)
    })

    return <section className={styles['section-text']}>
        <h2 className={styles['h2-text']}>Chapter 8</h2>
        <div className={styles['row-text-display']}>
            <p className={styles['p-paragraph']}>Paragraph number</p>
            <p className={styles['p-text']}>Text</p>
        </div>
        {textRows}
    </section>
}

export default TextDisplay;