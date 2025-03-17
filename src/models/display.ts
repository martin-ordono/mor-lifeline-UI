
export interface Display {
    data: DisplayCategory[];
};

export interface DisplayCategory {
    id: number;
    name: string;
    description: string;
    isNumeric: boolean;
    isStr: boolean;
    entries: DisplayEntry[];
}

export interface DisplayEntry {
    date: number; // Stores as yyyyMMdd (e.g., 20250311)
    valueStr?: string;
    valueNum?: number;
}