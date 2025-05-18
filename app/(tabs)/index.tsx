import {StyleSheet, Text, View, SafeAreaView, Button, Pressable} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchBalance, updateBalance, updateStartBalance} from "../../store/reducers/ActionCreators";
import categories from '../../constants/CategoriesData.json';
import CategoryItem from "../../components/categoryItem/CategoryItem";
import {icons} from '../../constants/CategoryIcons';
import CategoryPrompt from "../../components/modal/modal";
import UpdateBalanceModal from "@/components/modal/UpdateBalanceModal";
import DonutChart from "@/components/chart/chart";
import {addCategoryColor} from "@/utils/addCategoryColor";
import {CategoryColors} from "@/constants/CategoryColors";

export default function HomeScreen() {
    const dispatch = useAppDispatch();
    const {balanceData, isLoading} = useAppSelector(state => state.balanceReducer);
    const {balance, totals} = balanceData

    const totalsWithColors = addCategoryColor(totals, CategoryColors).filter(item => item.total > 0)

    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');

    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch]);

    const handleCategory = async (input: number) => {
        dispatch(updateBalance({category: currentCategory, amount: input}));
    };

    const categoryHandler = useCallback((name: string) => {
        setVisible(true);
        setCurrentCategory(name);
    }, []);

    const handleUpdateBalance = (amount: number, action: "add" | "subtract" | "set") => {
        dispatch(updateStartBalance({amount, action}));
    };

    return (
        <SafeAreaView style={styles.home}>
            <View style={styles.header}>
                <Text style={styles.date}>{new Date().toLocaleDateString("ru-RU")}</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.balance}>
                    <Pressable onPress={() => {
                        setModalVisible(true)
                    }}>
                        <DonutChart
                            data={totalsWithColors}
                            spent={balance.startBalance}
                            budget={balance.currentBalance}
                            isLoading={isLoading}
                        />
                    </Pressable>
                </View>
                <View style={styles.categories}>
                    {categories.categories.map((category, index) => (
                        <CategoryItem
                            key={category.id}
                            id={category.id}
                            name={category.name}
                            icon={icons[category.id]}
                            categoryColor={category.bgIconColor}
                            handler={categoryHandler}
                            total={totals[index] ? totals[index].total : '0'}
                            budget={totals[index] ? totals[index].budget : '0'}
                            isHome={true}
                        />
                    ))}
                </View>
            </View>
            <CategoryPrompt
                visible={visible}
                onSubmit={handleCategory}
                onClose={() => setVisible(false)}
                isBudget={false}
            />

            <UpdateBalanceModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleUpdateBalance}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1
    },
    header: {
        height: '10%',
        backgroundColor: '#3651ba',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    date: {
        color: 'white'
    },
    main: {
        height: '85%',
        backgroundColor: 'white'
        //#2C2C2E
    },
    balance: {
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10
    },
    chart: {
        width: 130,
        height: 130,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    button_block: {
        marginTop: 5
    }
});
