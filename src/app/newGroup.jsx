import { useSplit } from "../store";
import { useState    } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fonts } from "../theme";
import Cta from "../components/Cta";
import Icon from "../components/Icon";

export default function NewGroup() {
    const router = useRouter();
    const [groupName, setGroupName] = useState('');
    const [member, setMember] = useState('');
    const [members, setMembers] = useState([]);
    const addGroup = useSplit((s) => s.addGroup);

    const addMember = () => {
        if (!member.trim()) return;
        setMembers([...members, member.trim()]);
        setMember("");
    };

    const removeMember = (index) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    const onSave = () => {
        if (groupName && members) {
            addGroup({
                id: String(Date.now()),
                name: groupName,
                members: ["You", ...members],
                expenses: [],
                headline: "All settled",
                balances: Object.fromEntries(["You", ...members].map((m) => [m, 0])),
                suggestedSettlements: [],
            });
            console.log("GROUPS NOW:", useSplit.getState().groups.length);
            router.back();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                >
                    <Text style={{ fontFamily: fonts.semi, color: colors.accentText, }}>
                        Cancel
                    </Text>
                </Pressable>

                <Text style={{ fontFamily: fonts.labels, fontSize: 20 }}>New Group</Text>

                <Pressable onPress={onSave}>
                    <Text style={{ fontFamily: fonts.semi, color: colors.primary }}>
                        Create
                    </Text>
                </Pressable>
            </View>

            <TextInput 
                placeholder="Group Name"
                placeholderTextColor={colors.accentText}
                style={styles.input}
                value={groupName}
                onChangeText={setGroupName}
            />

            <View 
                style={{
                    flexDirection: 'row',
                    marginTop: 12,
                    alignItems: 'center',
                    gap: 4,
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                <TextInput 
                    placeholder="invite by email"
                    placeholderTextColor={colors.accentText}
                    style={[styles.input, { flex: 1, }]}
                    value={member}
                    onChangeText={setMember}
                />

                <Cta type="accent" title={'Add'} onPress={addMember} />
            </View>

            <View style={styles.membersList}>
                {members.map((m, index) => (
                    <View key={index} style={styles.member}>
                        <Text>{m}</Text>

                        <Pressable onPress={() => removeMember(index)}>
                            <Icon name={'close'} size={12} color={colors.mainText} />
                        </Pressable>
                    </View>
                ))}
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
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    input: {
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    membersList: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    member: {
        backgroundColor: colors.lightCream,
        borderRadius: 100,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    }
})