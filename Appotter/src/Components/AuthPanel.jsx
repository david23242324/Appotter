import { useState } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../../firebaseConfig";

const AuthPanel = () => {
  const [isRegister, setIsRegister] =
    useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }
  };

  const handleRegister = async () => {
    try {
      setError("");

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (err) {
      setError("No se pudo crear la cuenta");
    }
  };

  return (
    <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl">

      <h1 className="text-3xl font-bold text-yellow-400 text-center mb-2">
        {isRegister ? "Registro" : "Login"}
      </h1>

      <p className="text-gray-400 text-sm text-center mb-6">
        Hogwarts Character App
      </p>

      <div className="space-y-4">

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        {error && (
          <p className="text-red-400 text-sm text-center">
            {error}
          </p>
        )}

        {isRegister ? (
          <button
            onClick={handleRegister}
            className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl hover:bg-yellow-300 transition-colors"
          >
            Crear cuenta
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl hover:bg-yellow-300 transition-colors"
          >
            Ingresar
          </button>
        )}

        <button
          onClick={() =>
            setIsRegister(!isRegister)
          }
          className="w-full text-gray-400 text-sm underline"
        >
          {isRegister
            ? "Ya tengo cuenta"
            : "Crear cuenta"}
        </button>

      </div>
    </div>
  );
};

export default AuthPanel;