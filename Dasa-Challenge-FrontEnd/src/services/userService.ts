import api from "./api";

export interface User {
  user_id: number;
  user_name: string;
  user_email: string;
  user_password: string;
  user_role: number;
  user_image: Blob;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/users");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users", error);
    throw error;
  }
};

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get<User>(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user with id ${id}`, error);
    throw error;
  }
};
export const fetchUserByName = async (name: string): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get<User>(`/user/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user with name ${name}`, error);
    throw error;
  }
};

export const createUser = async (
  userData: Omit<User, "user_id">,
): Promise<User> => {
  try {
    const response = await api.post<User>("/user", userData);
    return response.data;
  } catch (error) {
    console.error("Failed to create user", error);
    throw error;
  }
};

export const updateUser = async (
  id: number,
  userData: Partial<User>,
): Promise<User> => {
  try {
    const response = await api.put<User>(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update user with id ${id}`, error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete(`/user/${id}`);
  } catch (error) {
    console.error(`Failed to delete user with id ${id}`, error);
    throw error;
  }
};
