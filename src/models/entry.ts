export interface Entry {
    id: number;
    date: number; // Stores as yyyyMMdd (e.g., 20250311)
    category: number;
    valueStr: string;
    valueNum: number;
}