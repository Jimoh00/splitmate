import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fonts } from "../theme";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Cta from "../components/Cta";

export default function Otp() {
    const [code, setCode] = useState('')
    const [seconds, setSeconds] = useState(30);
    const router = useRouter()

    useEffect(() => {
        if (seconds === 0) return;
        const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        return () => clearTimeout(timer);
    }, [seconds])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>Verify your email</Text>
            <Text style={styles.bodyText}>Enter the 6-digit code we emailed you.</Text>

            <View style={styles.row}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <View key={i} style={styles.box}>
                        <Text style={styles.digit}>{code[i]}</Text>
                    </View>
                ))}

                <TextInput
                    style={styles.hiddenInput}
                    value={code}
                    onChangeText={(t) => setCode(t.replace(/[^0-9]/g, ""))}
                    maxLength={6}
                    keyboardType="number-pad"
                    autoFocus
                />

            </View>
            <Cta title={'Verify & continue'} onPress={() => {if (code.length === 6) router.replace('/group')}}/>
            <View 
                style={{
                    flexDirection: 'row',
                    gap: 4,
                    justifyContent: 'center',
                    marginTop: 8,
                    alignItems: 'center'
                }}
            >
                <Text style={{ fontFamily: fonts.body, color: colors.accentText }}>Didn't get it?</Text>
                <Pressable>
                    <Text  style={{ fontFamily: fonts.body, color: colors.accentText }}>
                        {seconds ? 
                            `Resend in ${seconds}s`
                            :
                            (
                                <Text style={{ fontFamily: fonts.semi, color: colors.indigo }}>Resend</Text>
                            )
                        }
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 16,
        backgroundColor: colors.bg
    },
    headerText: {
        fontSize: 24,
        fontFamily: fonts.main,
    },
    bodyText: {
        fontFamily: fonts.body,
        color: colors.accentText,
        marginTop: 4,
    }, 
    row: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
        marginBlock: 18
    },
    box: {
        width: 42,
        height: 52,
        backgroundColor: colors.white,
        borderWidth: 1, 
        borderColor: colors.border,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    digit: {
        fontFamily: fonts.main,
        fontSize: 24,
        color: colors.mainText,
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%'
    }
})