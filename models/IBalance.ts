export interface IBalance {
    success: boolean;
    balance: balanceType;
    transactions: transactionType[]
}

export interface balanceType {
    currentBalance: number;
    lastUpdate: string;
    startBalance: number
}

export interface transactionType {
    Category: string;
    Date: string;
    Rest: number;
    Sum: number;
}