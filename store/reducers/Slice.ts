import {IBalance} from "../../models/IBalance";
import {createSlice} from "@reduxjs/toolkit";
import {fetchBalance} from "@/store/reducers/ActionCreators";

interface balanceState {
    balanceData: IBalance;
    isLoading: boolean;
    error: string;
}

const initialState: balanceState = {
    balanceData: {
        success: false,
        balance: {
            currentBalance: 0,
            lastUpdate: '',
            startBalance: 0,
        },
        transactions: [
            {
                Category: 'Pets',
                Date: '',
                Rest: 0,
                Sum: 2,
            },
            {
                Category: 'Car',
                Date: '',
                Rest: 0,
                Sum: 3,
            },
        ]
    },
    isLoading: false,
    error: ''
}

export const slice = createSlice({
    name: 'balance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalance.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                console.log('5')
                state.isLoading = false;
                state.balanceData = action.payload;
            })
            .addCase(fetchBalance.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }})

export default slice.reducer