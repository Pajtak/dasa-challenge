import api from "./api";

export interface Product {
  product_id: number;
  product_name: string;
  category_id: number;
  price: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>("/products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products", error);
    throw error;
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}`, error);
    throw error;
  }
};

export const fetchProductByName = async (name: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${name}`, error);
    throw error;
  }
};

export const createProduct = async (
  productData: Omit<Product, "product_id">,
): Promise<Product> => {
  try {
    const response = await api.post<Product>("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Failed to create product", error);
    throw error;
  }
};

export const updateProduct = async (
  id: number,
  productData: Partial<Product>,
): Promise<Product> => {
  try {
    const response = await api.put<Product>(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update product with id ${id}`, error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error(`Failed to delete product with id ${id}`, error);
    throw error;
  }
};
