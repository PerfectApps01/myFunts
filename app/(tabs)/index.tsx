import {StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import categories from '../../constants/CategoriesData.json'
import CategoryItem from "../../components/categoryItem/CategoryItem";
import {icons} from '../../constants/CategoryIcons'
import {useEffect, useState} from "react";
import CategoryPrompt from "../../components/modal/modal";
import {useAppDispatch, useAppSelector} from "@/hooks/redux";
import {fetchBalance} from "@/store/reducers/ActionCreators";


export default function HomeScreen() {
    const dispatch = useAppDispatch();
    console.log('6')
    const {balanceData} = useAppSelector(state => {
        console.log('7 state', state)
      return state.balanceReducer
    });

    const {balance} = balanceData
    const API_URL = "https://script.google.com/macros/s/AKfycby7M1bpXHiiYuvt-9649OEFOCz8nsRqsX2f_syABJgf_Yp6DKJujiY2rB6fDcxFLCzHfA/exec";

    const date = new Date();
    const formattedDate = date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const [visible, setVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');
    //const [transactions, setTransactions] = useState([]);
    //const [balance, setBalance] = useState({startBalance: 0, currentBalance: 0, lastUpdate: ""});
    //const {startBalance, currentBalance} = balance
    //console.log('transactions', transactions)
    //console.log('balance', balance)

    useEffect(() => {
        //fetchData().then(r => r);
        console.log('1')
        dispatch(fetchBalance())
    }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch(API_URL);
    //         const data = await response.json();
    //         console.log('from component', data);
    //         if (data.success) {
    //             // setTransactions(data.transactions);
    //             // setBalance(data.balance);
    //         } else {
    //             console.error("Ошибка при получении данных:", data.message);
    //         }
    //     } catch (error) {
    //         console.error("Ошибка:", error);
    //     }
    // };

    const handleCategory = async (input: number) => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    category: currentCategory,
                    amount: input,
                    date: new Date().toLocaleDateString("ru-RU", {})
                }),
            });

            const data = await response.json();

            if (data.success) {
                //await fetchData(); // Обновляем данные после добавления транзакции
                await dispatch(fetchBalance());
            } else {
                console.error("Ошибка при добавлении данных:", data.message);
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const categoryHandler = (name: string) => {
        setVisible(true)
        setCurrentCategory(name)
    }

    return (
        <SafeAreaView style={styles.home}>
            <View style={styles.header}>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.balance}>
                    <View style={styles.chart}>
                        <Text>
                            {`Было: ${balance.startBalance}`}
                        </Text>
                        <Text>
                            {`Стало: ${balance.currentBalance}`}
                        </Text>
                    </View>
                    <View style={styles.button_block}>
                        <Button title={'Update initial capitel'}></Button>
                    </View>
                </View>
                <View style={styles.categories}>
                    {categories.categories.map(category => {
                        return <CategoryItem
                            style={styles.category}
                            name={category.name}
                            key={category.id}
                            icon={icons[category.name]}
                            handler={categoryHandler}
                        >1</CategoryItem>
                    })}
                </View>
            </View>
            <CategoryPrompt
                visible={visible}
                onClose={() => setVisible(false)}
                onSubmit={handleCategory}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
    },
    header: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        height: '15%',
        backgroundColor: '#3651ba',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 20,
        position: 'relative'
    },
    date: {
        color: 'white',
    },
    main: {
        height: '85%',
        backgroundColor: 'white',
    },
    balance: {
        height: '42%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
    },
    categories: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', /* 3 колонки */
        gridTemplateRows: 'repeat(4, 1fr)', /* 4 ряда */
        //gap: 1,
        backgroundColor: '#ddd',
        width: '100%',
        //justifyContent: 'center',
        //alignItems: 'center',
        padding: 10,
        boxSizing: 'border-box',
        height: 'calc(65% - 40px)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
    },
    category: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        width: '70px',
        height: '70px',
        borderRadius: 30,
    },
    chart: {
        width: '150px',
        height: '150px',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '150px',
        height: '150px',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        position: 'absolute',
        top: '50%',
        left: '30%',
        backgroundColor: 'white'
    },
    button_block: {
        width: 'auto',
        height: 'auto'
    },

});
