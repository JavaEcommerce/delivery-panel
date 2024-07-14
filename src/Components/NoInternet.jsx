import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import typography from '../Contants/fonts';

export default function NoInternet() {
    return (
        <>
            <View style={styles.noInternetContainer}>
                <Text style={styles.noInternetText}>No Internet Connection 😓</Text>
                <Text style={styles.noInternetText}>Check Your Internet Connection</Text>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    noInternetContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noInternetText: {
        color: 'Black',
        fontWeight: typography.heading.fontWeight,
    },
});
