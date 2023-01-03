import style from "./EditPost.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthValue } from "../../context/authContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const { updateDocument, response } = useUpdateDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validação da imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !body || !tagsArray || !image) {
      setFormError("Por favor preencha todos os campos");
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }
    
    updateDocument(id, data);
    
    navigate("/dashboard");
  };

  return (
    <div className={style.edit_post}>
      {post && (
        <>
          <h2>Editando Post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Digite o titulo do seu post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <span>URL:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Digite a URL da imagem"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <p className={style.preview_title}>Preview da Imagem: </p>
            <img
              className={style.preview_image}
              src={post.image}
              alt={post.title}
            />
            <label>
              <span>Conteúdo:</span>
              <textarea
                type="text"
                name="body"
                required
                placeholder="Digite o conteúdo do post"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </label>
            <label>
              <span>Tags:</span>
              <textarea
                type="text"
                name="tags"
                required
                placeholder="Digite as tags do post separadas por virgula"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </label>
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
