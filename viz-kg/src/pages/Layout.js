import { Outlet, Link } from "react-router-dom";
import styles from "./css/Layout.module.css";

const Layout = () => {
  return <>
      <nav className={styles["menu-box"]}>
        <div>
            <h2>Viz-KG</h2>
        </div>
        <ul className={styles["menu-block"]}>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/QuestionsCompetences">SPARQL Table Vizualisation</Link>
          </li>
          <li>
            <Link to="/GrapheQuery">SPARQL Graph Vizualisation</Link>
          </li>
          <li>
            <Link to="/BookDisplay">Book Display</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
};

export default Layout;