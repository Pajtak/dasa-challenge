import api from "./api";

export interface Category {
  category_id: number;
  category_name: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>("/categories");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};

export const fetchCategoryById = async (id: number): Promise<Category> => {
  try {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch category with id ${id}`, error);
    throw error;
  }
};

export const fetchCategoryByName = async (name: string): Promise<Category> => {
  try {
    const response = await api.get<Category>(`/categories/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch category with name ${name}`, error);
    throw error;
  }
};

export const createCategory = async (
  categoryData: Omit<Category, "category_id">,
): Promise<Category> => {
  try {
    const response = await api.post<Category>("/categories", categoryData);
    return response.data;
  } catch (error) {
    console.error("Failed to create category", error);
    throw error;
  }
};

export const updateCategory = async (
  id: number,
  categoryData: Partial<Category>,
): Promise<Category> => {
  try {
    const response = await api.put<Category>(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update category with id ${id}`, error);
    throw error;
  }
};

export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await api.delete(`/categories/${id}`);
  } catch (error) {
    console.error(`Failed to delete category with id ${id}`, error);
    throw error;
  }
};
