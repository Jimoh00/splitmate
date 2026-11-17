import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fonts } from "../theme";
import Icon from "../components/Icon";
import ContainerCard from '../components/ContainerCard';
import { useSplit } from "../store";


export default function Group() {
    const router = useRouter();
    const groups = useSplit((s) => s.groups); 
    const avatarColors = [
        colors.avatarPurple,
        colors.avatarAmber,
        colors.green,
        colors.avatarRose,
    ];

    const letterColors = { Y: colors.avatarPurple, A: colors.avatarAmber, K: colors.green, T: colors.avatarRose}

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Groups</Text>

                <Pressable style={styles.addBtn}
                    onPress={() => router.push('/newGroup')}
                >
                    <Icon name={'add'} color={colors.white} size={16} />
                </Pressable>
            </View>

            <View style={{ gap: 12, marginTop: 16 }}>
                {groups.map((group) => {
                    const net = group.balances.You;

                    let status = "All settled";
                    let statusColor = colors.accentText;
                    let bgColor = colors.bg;

                    if (net > 0) {
                        status = `You're owed ₦${net.toLocaleString()}`;
                        statusColor = "#15803D";
                        bgColor = colors.greenBg;
                    } else if (net < 0) {
                        status = `You owe ₦${Math.abs(net).toLocaleString()}`;
                        statusColor = "#C2410C";
                        bgColor = colors.oweBg;
                    }

                    return (
                        <ContainerCard key={group.id}>
                            <Pressable 
                                onPress={() => router.push({
                                    pathname: '/group/[groupId]',
                                    params: { groupId: group.id }
                                })}
                            >
                                <Text style={styles.gName}>{group.name}</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBlock: 8 }}>
                                    {group.members.map((m, index) => {
                                        const letter = m.charAt(0).toUpperCase();
                                        const bg = letterColors[letter] || avatarColors[letter.charCodeAt(0) % avatarColors.length];

                                        return (
                                            <View key={index} style={[styles.profile, { backgroundColor: bg }]}>
                                                <Text style={{ color: colors.white, fontFamily: fonts.bold }}>{letter}</Text>
                                            </View>
                                        );
                                    })}
                                </View>

                                <Text style={{ fontFamily: fonts.semi, color: statusColor, backgroundColor: bgColor, alignSelf: 'flex-start', paddingHorizontal: 12, borderRadius: 100, paddingVertical: 4, }}>{status}</Text>

                            </Pressable>
                        </ContainerCard>
                    );
                })}
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
    addBtn: {
        width: 32,
        height: 32,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        color: colors.mainText,
        fontSize: 32,
        fontFamily: fonts.main,
    },
    gName: {
        fontFamily: fonts.labels,
        fontSize: 18,
    },
    profile: {
        width: 32,
        height: 32,
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})