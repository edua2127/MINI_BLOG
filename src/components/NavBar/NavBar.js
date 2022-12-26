import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/authContext";
const NavBar = () => {
  const { auth } = useAuthentication();
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav className={style.navbar}>
      <NavLink to="/" className={style.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={style.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cadastro"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Cadastro
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/post/create"
                className={({ isActive }) => (isActive ? style.active : "")}
              >
                Criar Post
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? style.active : "")}
          >
            About
          </NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
