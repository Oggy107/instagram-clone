import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import { ThemeContext } from '../components/themeContext'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Posts from '../components/home/Posts'
import BottomTabs from '../components/home/BottomTabs'

const HomeScreen = ({navigation}) => {
    const {theme, setTheme} = React.useContext(ThemeContext)

    const background = {
        backgroundColor: theme === "dark" ? "#000" : "#fff",
    }

    return (
        <View style={[{flex: 1}, background]}>
            <Header navigation={navigation}/>
            <Stories />
            <Posts />
            <BottomTabs />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
