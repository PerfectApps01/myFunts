import {createSlice} from "@reduxjs/toolkit";
import {fetchBalance, updateBalance, updateStartBalance} from "../../store/reducers/ActionCreators";

interface Transaction {
    date: string;
    category: string;
    amount: number;
    newBalance: number | string;
}

interface totals {
    category: string;
    total: string;
}

interface BalanceData {
    success: boolean;
    balance: {
        startBalance: number;
        currentBalance: number;
        lastUpdate: string;
    };
    transactions: Transaction[];
    totals: totals[];
}

interface BalanceState {
    balanceData: BalanceData;
    isLoading: boolean;
    error: string | null;
}

const initialState: BalanceState = {
    balanceData: {
        success: false,
        balance: {
            startBalance: 0,
            currentBalance: 0,
            lastUpdate: "",
        },
        transactions: [],
        totals: []
    },
    isLoading: false,
    error: null,
};

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalance.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.balanceData = action.payload;
            })
            .addCase(fetchBalance.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateBalance.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBalance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.balanceData = action.payload;
            })
            .addCase(updateBalance.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateStartBalance.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateStartBalance.fulfilled, (state, action) => {
                if (action.payload) {
                    state.balanceData.balance.startBalance = action.payload;
                }
            })
            .addCase(updateStartBalance.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default balanceSlice.reducer;
