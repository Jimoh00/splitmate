import { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fonts } from '../theme'
import Logo from "../components/Logo";
import Cta from "../components/Cta";

export default function Home() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')

    const login = () => {
        if (email && password) {
            router.replace('/group')
        }
    }

    const signup = () => {
        if (fullName && email && password) {
            router.replace('/otp')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Logo />

            <Text
                style={{
                    marginBlock: 16,
                    fontFamily: fonts.main,
                    fontSize: 24,
                }}
            >
                {isLogin ? 'Welcome back' : 'Create account'}
            </Text>


            {isLogin ? 
                (
                    <View style={{ gap: 16, marginBottom: 20 }}>
                        <TextInput 
                            placeholder="Email"
                            placeholderTextColor={colors.accentText}
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                        />

                        <TextInput 
                            placeholder="Password"
                            placeholderTextColor={colors.accentText}
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                        />

                    </View>
                ) : (
                    <View style={{ gap: 16, marginBottom: 20 }}>
                        <TextInput 
                            placeholder="Full name"
                            placeholderTextColor={colors.accentText}
                            style={styles.input}
                            onChangeText={setFullName}
                            value={fullName}
                        />

                        <TextInput 
                            placeholder="Email"
                            placeholderTextColor={colors.accentText}
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                        />
        
                        <TextInput 
                            placeholder="Password"
                            placeholderTextColor={colors.accentText}
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                        />
                    </View>
                )
            }


            <Cta 
                title={isLogin ? 'Log in' : 'Create account'}
                onPress={isLogin ? login : signup}
            />
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    justifyContent: 'center',
                    marginTop: 12,
                }}
            >
                <Text style={{ color: colors.accentText }}>
                    {isLogin ? 'No account?' : 'Already have one?'}
                </Text>
                <Pressable
                    onPress={() => setIsLogin(!isLogin)}
                >
                    <Text style={{
                        fontFamily: fonts.bold,
                        color: colors.primary
                    }}>{isLogin ? 'Create one' : 'Log in'}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.bg,
    },
    input: {
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    }
})