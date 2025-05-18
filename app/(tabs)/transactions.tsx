import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Pressable,
    ScrollView
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import React, {useEffect} from 'react';
import {deleteTransaction, fetchBalance} from '@/store/reducers/ActionCreators';
import DeleteIcon from '@/components/Common/DeleteIcon';
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';

export default function Transactions() {
    const dispatch = useAppDispatch();
    const {isLoading, balanceData} = useAppSelector((state) => state.balanceReducer);
    const {transactions} = balanceData;

    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch]);

    const handleDelete = (
        transactionDate: string,
        transactionCategory: string,
        transactionAmount: string
    ) => {
        dispatch(deleteTransaction({date: transactionDate, category: transactionCategory, amount: transactionAmount}));
        dispatch(fetchBalance());
    };

    const groupByDate = (data) => {
        return data.reduce((acc, transaction) => {
            const dateKey = format(new Date(transaction.date), 'yyyy-MM-dd');
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(transaction);
            return acc;
        }, {});
    };

    const grouped = groupByDate(transactions);
    const groupedArray = Object.entries(grouped).sort(([a], [b]) => (a < b ? 1 : -1)); // новые даты выше

    return (
        <SafeAreaView style={styles.main}>
            <View style={styles.title}>
                <Text style={styles.textBold}>Список расходов</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 74 }}>
                <View style={styles.items}>
                    {isLoading || !transactions ? (
                        <Text>Загрузка...</Text>
                    ) : (
                        groupedArray.map(([date, items]) => (
                            <View key={date} style={{width: '100%'}}>
                                <Text style={styles.dateLabel}>
                                    {format(new Date(date), 'd MMMM yyyy', {locale: ru})}
                                </Text>
                                {items.map((transaction, index) => (
                                    <View
                                        style={[styles.item, index % 2 === 0 ? styles.even : styles.odd]}
                                        key={`${transaction.date}-${transaction.category}-${index}`}
                                    >
                                        <View style={styles.itemContent}>
                                            <View>
                                                <Text style={[styles.itemCategory, styles.textBold]}>
                                                    {transaction.category}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.textBold}>{transaction.amount} €</Text>
                                            </View>
                                        </View>
                                        <Pressable
                                            onPress={() =>
                                                handleDelete(transaction.date, transaction.category, transaction.amount)
                                            }
                                            style={styles.deleteButton}
                                        >
                                            <DeleteIcon width={17} height={18} fill={'#000000'}/>
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    title: {
        marginTop: 30,
        marginBottom: 20,
    },
    items: {
        backgroundColor: '#f2f2f2',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    item: {
        height: 53,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemContent: {
        width: '50%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    deleteButton: {},
    even: {
        backgroundColor: 'white',
    },
    odd: {
        backgroundColor: '#e2e6e8',
    },
    itemCategory: {
        marginRight: 30,
    },
    textBold: {
        fontWeight: 'bold',
    },
    dateLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
});
