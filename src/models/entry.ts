import { Category } from "./category";

export interface Entry {
    id?: number;
    date: number; // Stores as yyyyMMdd (e.g., 20250311)
    category: Category;
    valueStr?: string;
    valueNum?: number;
}