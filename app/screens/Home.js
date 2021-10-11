import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Header from '../components/home/Header'
import Stories from '../components/home/Stories'

const Home = () => {
    return (
        <View>
            <Header />
            <Stories />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})
