"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "../../services/userService";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_role: 0,
    user_image: "" as unknown as Blob,
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/login");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createUser(formData);
      router.push("/");
    } catch (err) {
      console.log(err);
      setError(
        "Falha no registro. Verifique suas credenciais e tente novamente.",
      );
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        user_image: file,
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="user_password"
          value={formData.user_password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Imagem:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
      <button type="button" onClick={handleRedirect}>
        Login
      </button>
    </form>
  );
};

export default RegisterForm;
