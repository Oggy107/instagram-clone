import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar, SafeAreaView } from 'react-native'

import Home from './screens/Home'
import { ThemeContext, ThemeProvider } from './components/themeContext'

const darkStatusBar = () => {
    StatusBar.setBarStyle("light-content")
    StatusBar.setBackgroundColor("#000")
}

const lightStatusBar = () => {
    StatusBar.setBarStyle("dark-content")
    StatusBar.setBackgroundColor("#fff")
}

const AppWrapper = () => {
    const {theme, setTheme} = React.useContext(ThemeContext)

    const background = {
        backgroundColor: theme === "dark" ? "#000" : "#fff",
    }

    theme === "dark" ? darkStatusBar() : lightStatusBar()

    return (
        <SafeAreaView style={[styles.mainContainer, background]}>
            <Home />
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
