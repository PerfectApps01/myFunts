import {format} from 'date-fns';

export const groupTransactionsByDate = (data) => {
    return data.reduce((acc, transaction) => {
        const dateKey = format(new Date(transaction.date), 'yyyy-MM-dd');
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(transaction);
        return acc;
    }, {});
};