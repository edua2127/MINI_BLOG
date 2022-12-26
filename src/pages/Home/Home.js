import React from "react";
import style from "./Home.module.css";

import { useNavigate, Link } from "react-router";
import { useState } from "react";
const Home = () => {
  //quarta a sua pesquisa
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="busque por tags.." value={query} onChange={(e)=> setQuery(e)} />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        <h1> Posts </h1>
      </div>
    </div>
  );
};

export default Home;
