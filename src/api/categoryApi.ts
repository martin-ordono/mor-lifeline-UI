import { Category } from "../models/category";
import { categoryList, randomIntFromInterval } from "../utils/sampleData";
import { apiManager } from "./api";

const CATEGORY_BASE_URL = "/categories";

export const getAllCategories = async () => {
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

export const getAllCategoriesDemo = async () => {
    return await new Promise<Category[]>((resolve) => {
        setTimeout(() => { resolve(categoryList); }, 100);
    });
}

export const createCategoryDemo = async (category: Category) => {
    return await new Promise<Category>((resolve) => {
        setTimeout(() => { resolve({...category, id: randomIntFromInterval(100, 99999)}); }, 100);
    });
}

export const deleteCategoryDemo = async (id: number) => {
    return await new Promise<any>((resolve) => {
        setTimeout(() => { resolve({deleted: true}); }, 100);
    });
}