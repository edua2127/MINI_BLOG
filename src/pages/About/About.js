import React from "react";
import style from "./About.module.css";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <div className={style.about}>
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>Este Projeto consiste em React no frontend e firebase no backend</p>
      <Link to="/post/create" className="btn">
        Criar Post
      </Link>
    </div>
  );
};

export default About;
