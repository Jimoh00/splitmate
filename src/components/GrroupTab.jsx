import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, fonts } from "../theme";


export default function GroupTab({ tabs, active, onPress = () => {} }) {
    return (
        <View style={styles.wrapper}>
            {tabs.map((i) => (
                <Pressable
                    key={i}
                    style={[styles.tabBtn, i === active && styles.tabBtnActive]}
                    onPress={() => onPress(i)}
                >
                    <Text style={styles.tabLabel}>{i}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.bg,
        padding: 6,
        gap: 4,
        borderRadius: 8,
        marginTop: 12,
    },
    tabBtn: {
        padding: 6,
        width: '32%',
        borderRadius: 6
    },
    tabLabel: {
        textAlign: 'center',
        fontFamily: fonts.semi,
    },
    tabBtnActive: {
        backgroundColor: colors.white,
    }
})