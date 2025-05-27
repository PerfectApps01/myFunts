import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { registerForPushNotificationsAsync } from '@/utils/pushNotifications';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { setupStore } from "@/store/store";
import { useEffect, useRef } from 'react';
import { Provider } from "react-redux";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

// Настройка уведомлений: показать, воспроизвести звук и не менять badge
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

// Не скрываем splash до загрузки ресурсов
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();

            // Регистрируем пуш-уведомления
            registerForPushNotificationsAsync().then(token => {
                if (token) {
                    console.log('📨 Push Token:', token);
                    // Можно сохранить токен на сервер
                }
            });

            // Слушатель входящих уведомлений
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                console.log('📩 Уведомление получено:', notification);
            });

            // Слушатель нажатий по уведомлениям
            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log('👆 Нажатие по уведомлению:', response);
            });

            // Очистка слушателей при размонтировании
            return () => {
                if (notificationListener.current) {
                    Notifications.removeNotificationSubscription(notificationListener.current);
                }
                if (responseListener.current) {
                    Notifications.removeNotificationSubscription(responseListener.current);
                }
            };
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    const store = setupStore();

    return (
        <Provider store={store}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
            </ThemeProvider>
        </Provider>
    );
}
