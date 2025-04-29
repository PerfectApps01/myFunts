import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL} from "@/constants/baseURL";
import axios from "axios";

export const fetchBalance = createAsyncThunk(
    "balance/fetchBalance",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, {
                headers: {
                    Accept: "application/json",
                },
            });

            const data = response.data;
            if (!data.success) {
                throw new Error("Ошибка при получении данных");
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateBalance = createAsyncThunk(
    "balance/updateBalance",
    async ({category, amount}: { category: string; amount: number }, {rejectWithValue}) => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    actionType: 'addSpend',
                    category,
                    amount,
                    date: new Date(),
                }),
            });
            const data = await response.json();
            if (!data.success) {
                throw new Error("Ошибка при обновлении данных");
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Обновление стартового баланса (увеличение, уменьшение, новая сумма)
export const updateStartBalance = createAsyncThunk(
    "balance/updateStartBalance",
    async ({amount, action}: { amount: number; action: "add" | "subtract" | "set" }, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    actionType: 'updateBalance',
                    action,
                    amount,
                }),
            });
            const data = await response.json();
            if (!data.success) {
                throw new Error("Ошибка при обновлении стартового баланса");
            }
            dispatch(fetchBalance()); // Обновляем баланс после корректировки
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    "balance/deleteTransaction",
    async ({ date, category, amount }: { date: string, category: string, amount: string }, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    actionType: "deleteTransaction",
                    date,
                    category,
                    amount
                }),
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error("Ошибка при удалении транзакции");
            }

            dispatch(fetchBalance()); // Обновим данные
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateBudget = createAsyncThunk(
    "balance/updateBudget",
    async ({category, amount, budget}: { category: string; amount: number, budget: string }, {rejectWithValue}) => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    actionType: 'updateBudget',
                    category,
                    amount,
                    budget,
                    date: new Date(),
                }),
            });
            const data = await response.json();
            if (!data.success) {
                throw new Error("Ошибка при обновлении данных");
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

