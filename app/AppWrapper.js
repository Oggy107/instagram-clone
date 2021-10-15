import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar, SafeAreaView } from 'react-native'

import { ThemeContext } from './components/themeContext'
import AuthNavigation from './AuthNavigation'

const setStatusbarStyle = async (dark) => {
    if (dark)
    {
        StatusBar.setBarStyle("light-content")
        StatusBar.setBackgroundColor("#000")
    }
    else
    {
        StatusBar.setBarStyle("dark-content")
        StatusBar.setBackgroundColor("#fff")
    }
}

const AppWrapper = () => {
    const {theme} = React.useContext(ThemeContext)

    theme === "dark" ? setStatusbarStyle(true) : setStatusbarStyle(false)

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AuthNavigation />
        </SafeAreaView>
    )
}

export default AppWrapper

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
})
