"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/authService";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/register");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { token, user_role } = await login(email, password);
      localStorage.setItem("token", token);

      if (user_role === 1) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("Login falhou. Verifique suas credenciais e tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
      <button type="button" onClick={handleRedirect}>
        Criar Conta
      </button>
    </form>
  );
};

export default LoginForm;
