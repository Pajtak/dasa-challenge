import api from "./api";

interface LoginResponse {
  token: string;
  user_role: number;
}

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/login", {
    user_email: email,
    user_password: password,
  });
  return response.data;
};
