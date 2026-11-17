import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSplit } from "../../store";
import Icon from "../../components/Icon";
import { colors, fonts } from "../../theme";
import GroupTab from "../../components/GrroupTab";
import ContainerCard from "../../components/ContainerCard";
import Cta from "../../components/Cta";

const formatNumber = (value) => {
    if (value == null || !Number.isFinite(Number(value))) {
        return '-';
    }

    return Number(value).toLocaleString('en-US');
}

const letterColors = { Y: colors.avatarPurple, A: colors.avatarAmber, K: colors.green, T: colors.avatarRose };
const avatarColors = [colors.avatarPurple, colors.avatarAmber, colors.green, colors.avatarRose];

export default function GroupDetails() {
    const router = useRouter();
    const { groupId } = useLocalSearchParams();
    console.log("PARAM:", groupId, "IDS:", useSplit.getState().groups.map((g) => g.id));
    const group = useSplit((s) => s.groups.find((g) => g.id === groupId));
    const [tab, setTab] = useState("Expenses")

    const tabs = ["Expenses", "Balances", "Members"]

    if (!group) return <Text>Group not found</Text>;

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                }}
            >
                <Pressable onPress={() => router.back()}>
                    <Icon name={'back'} size={24} color={colors.mainText} />
                </Pressable>
                <Text style={{
                    fontFamily: fonts.labels,
                    fontSize: 24,
                }}>{group.name}</Text>
            </View>

            <GroupTab 
                tabs={tabs} 
                onPress={setTab}
                active={tab}
            />


            {tab === 'Expenses' && (
                <View
                    style={{
                        gap: 12,
                        marginTop: 16,
                        flex: 1,
                    }}
                >
                    {group.expenses.map((e, index) => (
                        <ContainerCard key={index} customStyle={styles.card}>
                            <View>
                                <Text style={styles.cardTitle}>{e.title}</Text>
                                <Text style={styles.cardBody}>Paid by {e.paidBy}</Text>
                            </View>

                            <Text style={styles.cardAmt}>₦{formatNumber(e.amount)}</Text>
                        </ContainerCard>
                    ))}


                    <Pressable 
                        style={styles.fabBtn}
                        onPress={() => router.push({ pathname: '/addExpense', params: { groupId: group.id }})}
                    >
                        <Icon name={'add'} size={14} color={colors.white} width={3} />
                    </Pressable>
                </View>
            )}

            {tab === 'Balances' && (
                <View
                    style={{
                        gap: 12,
                        marginTop: 16,
                        flex: 1,
                    }}
                >
                    <Text style={styles.headline}>{group.headline}</Text>

                    <View
                        style={{
                            gap: 12,
                        }}
                    >
                        <Text style={styles.title}>SUGGESTED SETTLEMENTS</Text>

                        {group.suggestedSettlements.map((s, index) => (
                            <ContainerCard key={index} customStyle={styles.card}>
                                <View>
                                    <View style={styles.balanceHeader}>
                                        <Text>{s.from}</Text>
                                        <Icon name={'arrowRight'} size={12} width={1} /> 
                                        <Text>{s.to}</Text>
                                    </View>
                                    <Text style={{ fontFamily: fonts.labels, fontSize: 16 }}>₦{formatNumber(s.amount)}</Text>
                                </View>

                                <Cta title={'Settle'}  customStyle={{ backgroundColor: colors.green, borderRadius: 12, paddingVertical: 8, }}/>
                            </ContainerCard>
                        ))}
                    </View>

                </View>
            )}

            {tab === 'Members' && (
                <View
                    style={{
                        gap: 12,
                        marginTop: 16,
                        flex: 1,
                    }}
                >
                    {group.members.map((m) => {
                        const net = group.balances[m];
                        const letter = m.charAt(0).toUpperCase();
                        const bg = letterColors[letter] || avatarColors[letter.charCodeAt(0) % avatarColors.length];

                        return (
                            <ContainerCard key={m} customStyle={styles.memberRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <View style={[styles.profile, { backgroundColor: bg }]}>
                                        <Text style={{ color: colors.white, fontFamily: fonts.bold }}>{letter}</Text>
                                    </View>
                                    <Text style={{ fontFamily: fonts.semi }}>{m}</Text>
                                </View>

                                <Text style={{ fontFamily: fonts.bold, color: net >= 0 ? "#15803D" : "#C2410C" }}>
                                    {net >= 0 ? "+" : "-"}₦{Math.abs(net).toLocaleString()}
                                </Text>
                            </ContainerCard>
                        );
                    })}
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.lightCream
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
    },
    cardTitle: {
        fontFamily: fonts.labels,
        fontSize: 16,
        textTransform: 'capitalize',
    },
    cardBody: {
        fontSize: 12,
        fontFamily: fonts.body,
        color: colors.accentText
    },
    cardAmt: {
        fontFamily: fonts.main,
        fontSize: 18
    },
    fabBtn: {
        backgroundColor: colors.primary,
        width: 40,
        height: 40,
        borderRadius: '50%',
        position: 'absolute',
        bottom: 24,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headline: {
        fontFamily: fonts.main,
        fontSize: 24,
        color: colors.green,
    },
    title: {
        fontFamily: fonts.bold,
        color: colors.accentText
    },
    balanceHeader: {
        flexDirection: 'row',
        gap: 4,
        fontFamily: fonts.body,
        alignItems: 'center',
    },
    memberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: colors.border,
    },
    profile: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
})