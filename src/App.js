import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
//components
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

//context
import { AuthProvider } from "./context/authContext";
import Search from "./pages/Search/Search";
import Post from "./pages/Post/Post";
import EditPost from "./pages/EditPost/EditPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  // toda vez que o auth mudar ele vai verificar se o usuário está logado
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/cadastro"
                element={user ? <Navigate to="/" /> : <Cadastro />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/post/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />
              <Route
                path="/post/edit/:id"
                element={user ? <EditPost /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
