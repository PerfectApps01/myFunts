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

export interface categoryType {
    category:
        'car'
        | 'family'
        | 'bank'
        | 'restaurant'
        | 'leisure'
        | 'transport'
        | 'products'
        | 'pets'
        | 'health'
        | 'shopping'
        | 'presents'
        | 'others'
}
