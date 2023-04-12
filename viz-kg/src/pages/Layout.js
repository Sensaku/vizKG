import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return <>
      <nav>
        <ul>
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