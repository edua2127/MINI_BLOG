import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkifIsCancelled() {
    if (cancelled) {
      return;
    }
  }
  //register
  const createUser = async (data) => {
    checkifIsCancelled();
    setLoading(true);
    setError(null);
    try {
      // cria um usuario
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      //atualiza o nome do usuario
      await updateProfile(user, { displayName: data.displayName });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      let errorMessage = error.message;

      if (error.message.includes("Password")) {
        errorMessage = "A senha precisa ter no mínimo 6 caracteres";
      } else if (error.message.includes("email-already")) {
        errorMessage = "Este e-mail já está cadastrado";
      } else {
        errorMessage = "Erro ao criar o usuário, por favor tente mais tarde";
      }
      setLoading(false);
      setError(errorMessage);
    }
  };

  //logout
  function logout() {
    checkifIsCancelled();
    signOut(auth);
  }

  //login
  const login = async (data) => {
    checkifIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let errorMessage;

      if (error.message.includes("user-not-found")) {
        errorMessage = "Usuário não encontrado";
      } else if (error.message.includes("wrong-password")) {
        errorMessage = "Email ou senha incorretos";
      } else {
        errorMessage = "Ocorreu um erro no sistema, por favor tente mais tarde";
      }
      console.log(errorMessage);
      setError(errorMessage);
    }

    console.log(error);
    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    loading,
    error,
    logout,
    login,
  };
};
