import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import GrapheQuery from "./pages/GrapheQuery";
import QuestionsCompetences from "./pages/QuestionsCompetences";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPages";
import BookDisplay from './pages/BookDisplay';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="QuestionsCompetences" element={<QuestionsCompetences />}/>
          <Route path="GrapheQuery" element={<GrapheQuery />}/>
          <Route path="BookDisplay" element={<BookDisplay />}/> 
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/*root.render(
    <App />
);*/


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
