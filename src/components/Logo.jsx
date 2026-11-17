import { View, Text } from 'react-native'
import { colors, fonts } from '../theme'

export default function Logo(){
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
            }}
        >
            <View
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{ fontFamily: fonts.main, color: colors.white, fontSize: 16}}
                >S</Text>
            </View>

            <Text style={{
                color: colors.mainText,
                fontFamily: fonts.main,
                fontSize: 18
            }}>Splitmate</Text>
        </View>
    )
}