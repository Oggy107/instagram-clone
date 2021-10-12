import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Header from '../components/newPost/Header'
import FormikPostUploader from '../components/newPost/FormikPostUploader'

const NewPostScreen = () => {
    return (
        <View>
            <Header />
            <FormikPostUploader />
        </View>
    )
}

export default NewPostScreen

const styles = StyleSheet.create({})
