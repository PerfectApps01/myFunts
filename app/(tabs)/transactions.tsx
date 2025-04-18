import {StyleSheet, Image, Platform, View, Text, Button, SafeAreaView} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {useEffect} from "react";
import {deleteTransaction, fetchBalance} from "@/store/reducers/ActionCreators";

export default function Transactions() {
    const dispatch = useAppDispatch();
    const {isLoading, balanceData} = useAppSelector(state => state.balanceReducer)
    const {transactions} = balanceData

    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch]);

    const handleDelete = (transactionDate: string, transactionCategory: string, transactionAmount: string) => {
        dispatch(deleteTransaction({ date: transactionDate, category: transactionCategory, amount: transactionAmount}));
        dispatch(fetchBalance());
    };

    return (
        <SafeAreaView>
            {isLoading || !transactions ? (
                <Text>Загрузка...</Text>
            ) : (transactions.map((transaction, index) => (
                <View style={styles.item} key={index}>
                    <View>
                        <Text>
                            {transaction.category}
                        </Text>
                    </View>
                    <View>
                        <Text>{transaction.amount}</Text>
                    </View>
                    <View>
                        <Button onPress={() => handleDelete(transaction.date, transaction.category, transaction.amount)} title={'Delete'}/>
                    </View>
                </View>
            )))}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        margin: 3
    },
});
