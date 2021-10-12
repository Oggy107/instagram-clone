import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Posts from '../components/home/Posts'
import BottomTabs from '../components/home/BottomTabs'

const HomeScreen = () => {
    return (
        <View style={{flex: 1}}>
            <Header />
            <Stories />
            <Posts />
            <BottomTabs />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
