import { View } from "react-native";
import { colors } from "../theme";

export default function ContainerCard({ children, customStyle }) {
    return (
        <View
            style={[{
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.border,
                padding: 16,
                borderRadius: 12,
            }, customStyle]}
        >
            {children}
        </View>
    )
}