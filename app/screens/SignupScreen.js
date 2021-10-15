import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import SignupForm from '../components/signup/SignupForm'

const instaLogo = "http://clipart-library.com/images_k/instagram-png-transparent/instagram-png-transparent-1.png"

const SignupScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={{uri: instaLogo}}/>
            </View>
            <SignupForm navigation={navigation}/>
        </View>
    )
}

export default SignupScreen

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
