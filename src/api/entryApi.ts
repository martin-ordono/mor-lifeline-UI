import { Entry } from "../models/entry";
import { apiManager } from "./api";

const ENTRY_BASE_URL = "/entries";


export const getEntriesBbyYear = async (year: number) => {
    return await apiManager.get<Entry[]>(ENTRY_BASE_URL+`/byYear/${year}`);
}

export const getEntriesByMonth = async (monthId: number) => {
    return await apiManager.get<Entry[]>(ENTRY_BASE_URL+`/byMonth/${monthId}`);
}

export const getEntriesByDay = async (dateId: number) => {
    return await apiManager.get<Entry[]>(ENTRY_BASE_URL+`/byDay/${dateId}`);
}

export const getEntriesByWeek = async (weekId: number) => {
    return await apiManager.get<Entry[]>(ENTRY_BASE_URL+`/byWeek/${weekId}`);
}

export const createEntry = async (entry: Entry) => {
    return await apiManager.post<Entry>(ENTRY_BASE_URL, entry);
}

export const deleteEntry = async (entry: Entry) => {
    return await apiManager.delete<Entry>(ENTRY_BASE_URL, entry);
}