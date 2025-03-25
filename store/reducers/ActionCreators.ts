import {createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL} from "@/constants/baseURL";


export const fetchBalance = createAsyncThunk(
    "balance/fetchBalance",
    async (_, thunkAPI) => {
        try {
            console.log('2')
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log('3')
            if (data.success) {
                console.log('4')
                return data;
            } else {
                console.error("Ошибка при получении данных:", data.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }
)
