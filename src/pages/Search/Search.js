import React from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail/PostDetail";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts, loading } = useFetchDocuments("posts", search);
  return (
    <div className={styles.search_container}>
      <h1>Pesquisa</h1>
      <p>Termo pesquisado: {search}</p>

      {loading && <p>Carregando...</p>}
      {posts && posts.length === 0 && (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts a partir da sua busca</p>
          <Link to={"/"} className="btn btn-dark">
            Voltar
          </Link>
        </div>
      )}
      <div>
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
