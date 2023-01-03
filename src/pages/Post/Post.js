import styles from "./Post.module.css";

import { useParams } from "react-router";
import { useFetchDocument } from "../../hooks/useFetchDocument";
const Post = () => {
  const { id } = useParams();
  const { document: post, loading, error } = useFetchDocument("posts", id);
  return (
    <div className={styles.post_container}>
      {loading && <div>Carregando</div>}
      {error && <div>{error}</div>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>
            Este post se trata sobre:
            <div className={styles.tags}>
              {post.tagsArray &&
                post.tagsArray.map((tag) => (
                  <p key={tag}>
                    <span>#</span>
                    {tag}
                  </p>
                ))}
            </div>
          </h3>
        </>
      )}
    </div>
  );
};

export default Post;
