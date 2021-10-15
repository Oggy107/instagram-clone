import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { ThemeContext } from '../themeContext'

const backBtn = {
    light: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
    dark: "https://img.icons8.com/ios-glyphs/90/000000/back.png"
}

const Header = ({navigation}) => {
    const {theme, setTheme} = React.useContext(ThemeContext)

    const themeStyle = {
        color: theme === "dark" ? "#fff" : "#000"
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{position: 'absolute', left: 10}} onPress={() => {navigation.goBack()}}>
                <Image style={styles.btn} source={{uri: theme === "dark" ? backBtn.light : backBtn.dark}}/>
            </TouchableOpacity>
            <Text style={[themeStyle, {fontSize: 20, fontWeight: "bold"}]}>New Post</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        width: 30,
        height: 30,
    }
})
