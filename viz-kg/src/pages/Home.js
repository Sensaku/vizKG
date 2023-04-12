import React, { useState, useEffect} from 'react';
import styles from "./css/Home.module.css"

const Home = () => {

    return <div className={styles["content"]}>
        <h1>Welcome on board</h1>
        <p>
            This pages is the application for vizualisation and usage of knowledge graphs.<br/>
            To navigate, please report to the menu above de content.
        </p>
    </div>
}

export default Home;