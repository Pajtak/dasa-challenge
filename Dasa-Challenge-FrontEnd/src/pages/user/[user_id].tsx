"use client";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { User, fetchUserById } from "../../services/userService";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user_id } = router.query; // Aqui você obtém o user_id da query da rota

  useEffect(() => {
    if (!user_id) {
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await fetchUserById(Number(user_id));
        setUser(userData);
      } catch (error) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user_id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Usuário não encontrado</p>;
  }

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <p>ID: {user.user_id}</p>
      <p>Nome: {user.user_name}</p>
      <p>Email: {user.user_email}</p>
      <p>Role: {user.user_role}</p>
      {/* Exemplo de como exibir uma imagem, se for uma string base64 */}
      {user.user_image && (
        <img src={`data:image/jpeg;base64,${user.user_image}`} alt="User" />
      )}
    </div>
  );
};

export default UserProfile;
