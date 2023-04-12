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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/QuestionsCompetences">Question de compétences</Link>
          </li>
          <li>
            <Link to="/GrapheQuery">Graphe Query</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
};

export default Layout;