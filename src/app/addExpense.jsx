import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSplit } from "../store";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fonts } from "../theme";
import Cta from '../components/Cta';


const formatNumber = (value) => {
    if (value == null || !Number.isFinite(Number(value))) {
        return '-';
    }

    return Number(value).toLocaleString('en-US');
}

export default function AddExpense () {
    const { groupId } = useLocalSearchParams();
    const group = useSplit((s) => s.groups.find((g) => g.id === groupId));
    const router = useRouter();
    const addExpense = useSplit((s) => s.addExpense);

    const [title, setTitle] = useState('');
    const [amt, setAmt] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [splitType, setSplitType] = useState('equal');
    const [customAmounts, setCustomAmounts] = useState({});  

    if (!group) return <Text>Group not found</Text>;

    const total = Number(amt) || 0;

    const shared = group.members.reduce(
        (sum, m) => sum + (Number(customAmounts[m]) || 0),
        0
    );

    const remaining = total - shared;
    const matches = total > 0 && shared === total;

    const count = group.members.length;
    const share = Math.round(Number(amt) / count);

    
    const saveExpense = () => {
        const total = Number(amt);
        if (!title.trim() || !total) return;

        let splits;
        if (splitType === 'equal') {
            splits = Object.fromEntries(group.members.map((m) => [m, share]));
        } else {
            splits = Object.fromEntries(
                group.members.map((m) => [m, Number(customAmounts[m]) || 0])
            );
            const sum = Object.values(splits).reduce((a, b) => a + b, 0);
            if (sum !== total) return;   
        }

        addExpense(groupId, {
            id: String(Date.now()),
            title: title.trim(),
            amount: total,
            category,
            paidBy: "You",
            date,
            splitType,
            splits,
        });
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    style={{ width: '32%' }}
                    onPress={() => router.back()}
                >
                    <Text 
                        style={{ 
                            fontFamily: fonts.semi, 
                            color: colors.accentText,
                            fontSize: 16,
                        }}
                    >
                        Cancel
                    </Text>
                </Pressable>
                <Text style={{ fontFamily: fonts.labels, fontSize: 20, width: '32%' }}>Add Expense</Text>
                <View />
            </View>

            <View style={{ marginTop: 16, gap: 12, marginBottom: 8, }}>
                <TextInput 
                    placeholder="Expense title..."
                    placeholderTextColor={colors.accentText}
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />

                <TextInput 
                    placeholder="Amount..."
                    placeholderTextColor={colors.accentText}
                    style={styles.input}
                    value={amt}
                    onChangeText={setAmt}
                    keyboardType="number-pad"
                />

                <TextInput 
                    placeholder="Category..."
                    placeholderTextColor={colors.accentText}
                    style={styles.input}
                    value={category}
                    onChangeText={setCategory}
                />

                <TextInput 
                    placeholder="Date..."
                    placeholderTextColor={colors.accentText}
                    style={styles.input}
                    value={date}
                    onChangeText={setDate}
                />

                <View style={styles.wrapper}>
                    <Cta
                        type={splitType === 'equal' ? 'secondary' : 'accent'}
                        title={'Equal'}
                        customStyle={{ width: '49%' }}
                        onPress={() => setSplitType('equal')}
                    />
                    <Cta
                        type={splitType === 'custom' ? 'secondary' : 'accent'}
                        title={'Custom'}
                        customStyle={{ width: '49%' }}
                        onPress={() => setSplitType('custom')}
                    />
                </View>
            </View>

            {splitType === 'equal' ? (
                <Text style={{ fontFamily: fonts.semi, color: colors.accentText }}>Each of {count} members pays ₦{formatNumber(share)}</Text>
            ) : (
                <View style={{ gap: 10 }}>
                    {group.members.map((m) => (
                        <View key={m} style={styles.memberRow}>
                            <Text style={{ fontFamily: fonts.semi }}>{m}</Text>

                            <TextInput
                                placeholder="0"
                                placeholderTextColor={colors.accentText}
                                style={[styles.input, styles.customInput]}
                                value={customAmounts[m] ?? ''}
                                onChangeText={(t) => setCustomAmounts({ ...customAmounts, [m]: t })}
                                keyboardType="number-pad"
                            />
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.footer}>
                {splitType === 'custom' && amt ? (
                    <Text 
                        style={{
                            textAlign: 'center',
                            fontFamily: fonts.labels,
                            color: colors.primary,
                            marginBottom: 4,
                        }}
                    >Running total: ₦{formatNumber(shared)} / ₦{formatNumber(amt)} </Text>
                ) : (
                    <Text></Text>
                )}
                <Cta title={'Save expense'} customStyle={{ paddingVertical: 16, }} onPress={saveExpense}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    input: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1%'
    },
    memberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    customInput: {
        width: '30%',
        padding: 10,
        textAlign: 'right',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0, right: 0,
        borderTopWidth: 1,
        borderColor: colors.border,
        paddingTop: 16,
        paddingHorizontal: 18,
        paddingBottom: 32,
    }
})