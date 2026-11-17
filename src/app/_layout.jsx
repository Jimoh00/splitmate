import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Baloo2_700Bold, Baloo2_600SemiBold } from '@expo-google-fonts/baloo-2'
import { WorkSans_400Regular, WorkSans_500Medium, WorkSans_600SemiBold, WorkSans_700Bold } from '@expo-google-fonts/work-sans';


export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Baloo2_700Bold,
        Baloo2_600SemiBold,
        WorkSans_400Regular,
        WorkSans_500Medium,
        WorkSans_600SemiBold,
        WorkSans_700Bold,
    })

    if (!fontsLoaded) return null;

    return (
        <>
            <StatusBar style='dark' />

            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' />
                <Stack.Screen name='group' />
                <Stack.Screen name='otp' />
                <Stack.Screen name='addExpense' />
                <Stack.Screen name='group/[groupId]' />
            </Stack>
        </>
    )
}