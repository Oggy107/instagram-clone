import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { ThemeContext } from '../components/themeContext'
import Header from '../components/newPost/Header'
import FormikPostUploader from '../components/newPost/FormikPostUploader'

const NewPostScreen = ({navigation}) => {
    const {theme} = React.useContext(ThemeContext)

    const background = {
        backgroundColor: theme === "dark" ? "#000" : "#fff",
    }

    return (
        <View style={[{flex: 1}, background]}>
            <Header navigation={navigation}/>
            <FormikPostUploader navigation={navigation}/>
        </View>
    )
}

export default NewPostScreen

const styles = StyleSheet.create({})
