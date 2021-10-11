import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { ThemeContext } from '../themeContext'

const Header = () => {
    const {theme, setTheme} = React.useContext(ThemeContext)

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {theme === "dark" ? setTheme("light") : setTheme("dark")}}>
                <Image style={styles.logo} resizeMode="contain" source={theme === "dark" ? require('../../assets/header-logo-white.png') : require('../../assets/header-logo-dark.png')}/>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={{uri: theme === "dark" ? "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png" : "https://img.icons8.com/fluency-systems-regular/60/000000/plus-2-math.png"}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={{uri: theme === "dark" ? "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png" : "https://img.icons8.com/fluency-systems-regular/60/000000/like--v1.png"}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={{uri: theme === "dark" ? "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png" : "https://img.icons8.com/fluency-systems-regular/60/000000/facebook-messenger.png"}}/>
                    <View style={styles.unreadBadge}>
                        <Text style={{color: "#fff"}}>11</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    logo: {
        width: 110,
        height: "100%",
    },
    iconContainer: {
        width: 110,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    icon: {
        width: 30,
        height: 30
    },
    unreadBadge: {
        position: "absolute",
        backgroundColor: "#ff3250",
        width: 25,
        height: 20,
        right: -5,
        top: -10,
        borderRadius: 10,
        alignItems: "center",
    }
})
