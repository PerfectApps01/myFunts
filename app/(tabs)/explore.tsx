import {StyleSheet, Image, Platform, View, Text} from 'react-native';
import {useAppSelector} from '../../hooks/redux'

export default function TabTwoScreen() {
    const {transactions} = useAppSelector(state => state.balanceReducer.balanceData)
    return (
        <View>
            {transactions.map((transaction, index) => (
                <View key={index}>
                    <View>
                        <Text>
                            {transaction.Category}
                        </Text>
                    </View>
                    <Text>
                        <View>{transaction.Sum}</View>
                    </Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
