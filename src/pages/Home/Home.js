import React from "react";
import style from "./Home.module.css";

import { useNavigate, Link } from "react-router";
import { useState } from "react";
const Home = () => {
  //quarta a sua pesquisa
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    
  }

  return (
    <div>
      <h1>Veja os nossos posts mais recentes</h1>
      <form>
        <input type="text" placeholder="busque por tags.." />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
    </div>
  );
};

export default Home;
