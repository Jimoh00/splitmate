import { Pressable, Text, StyleSheet } from "react-native";
import Icon from "./Icon";
import { colors, fonts } from "../theme";

export default function Cta({ type='primary', icon=false, title, onPress=() => {}, customStyle }) {
    return (
        <>
            {type === 'primary' && 
                <Pressable style={[styles.btn, styles.primaryBtn, customStyle]} onPress={onPress}>
                    <Text style={styles.primaryBtnText} >{title}</Text>
                </Pressable>
            }

            {type === 'secondary' && 
                <Pressable style={[styles.secondaryBtn, styles.btn, customStyle]} onPress={onPress}>
                    <Text style={styles.secondaryBtnText} >{title}</Text>
                </Pressable>
            }

            {type === 'accent' && 
                <Pressable style={[styles.btn, styles.accentBtn, customStyle]} onPress={onPress}>
                    <Text style={styles.accentBtnText}>{title}</Text>
                </Pressable>
            }
        </>
    )
}

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 12,
        borderRadius: 16,
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    primaryBtn: {
        fontFamily: fonts.main,
        backgroundColor: colors.primary,
    }, 
    primaryBtnText: {
        color: colors.white,
        fontFamily: fonts.bold,
        fontSize: 16,
    },
    secondaryBtn: {
        backgroundColor: colors.mainText,
    },
    secondaryBtnText: {
        fontFamily: fonts.main,
        fontSize: 16,
        color: colors.white,
    },
    accentBtn: {
        backgroundColor: colors.lightCream,
        borderWidth: 1,
        borderColor: colors.border, 
    },
    accentBtnText: {
        fontFamily: fonts.main,
        fontSize: 16,
        color: colors.mainText,
    }
})