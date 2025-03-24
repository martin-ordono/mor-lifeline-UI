import { Category } from "../models/category";
import { apiManager } from "./api";

const CATEGORY_BASE_URL = "/categories";

export const getAll = async () => {
    return await apiManager.get<Category[]>(CATEGORY_BASE_URL);
}

export const getByName = async (name: string) => {
    return await apiManager.get<Category>(CATEGORY_BASE_URL+`/byName/${name}`);
}

export const createCategory = async (category: Category) => {
    return await apiManager.post<Category>(CATEGORY_BASE_URL, category);
}

export const deleteCategory = async (name: string) => {
    return await apiManager.delete<Category>(CATEGORY_BASE_URL+`/${name}`);
}