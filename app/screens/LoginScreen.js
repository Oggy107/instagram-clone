import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import LoginForm from '../components/login/LoginForm'

const instaLogo = "http://clipart-library.com/images_k/instagram-png-transparent/instagram-png-transparent-1.png"

const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={{uri: instaLogo}}/>
            </View>
            <LoginForm navigation={navigation}/>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        height: 250,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200
    }
})
