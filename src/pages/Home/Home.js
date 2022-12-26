import React from "react";
import style from "./Home.module.css";

import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  //quarta a sua pesquisa
  const [query, setQuery] = useState("")
  const [posts] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={style.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={style.seach_form}>
        <input type="text" placeholder="busque por tags.." value={query} onChange={(e)=> setQuery(e)} />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        <h1> Posts </h1>
        {posts.length === 0 && (
          <div className={style.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">Crar primeiro post</Link>
          </div>
        )}
          
      </div>
    </div>
  );
};

export default Home;
