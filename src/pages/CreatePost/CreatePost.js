import style from "./CreatePost.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthValue } from "../../context/authContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { insertDocument, response } = useInsertDocument("posts");
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

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });
    navigate("/");
  };

  return (
    <div className={style.create_post}>
      <h2>Criar Post</h2>
      <p>Escreve sobre o que quiser e compartilhe o seu conhecimento</p>
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
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
