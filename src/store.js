import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import data from "./data.json";

export const useSplit = create(
    persist(
        (set) => ({
            groups: data.groups,

            addExpense: (groupId, expense) =>
                set((s) => ({
                    groups: s.groups.map((g) =>
                        g.id === groupId
                            ? { ...g, expenses: [expense, ...g.expenses] }
                            : g
                    ),
                })),

            addGroup: (group) =>
                set((s) => ({
                    groups: [group, ...s.groups],
                })),
        }),
        { name: "split2", storage: createJSONStorage(() => AsyncStorage) }
    )
);