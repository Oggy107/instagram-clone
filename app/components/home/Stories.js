import React from 'react'
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native'

import { ThemeContext } from '../themeContext'
import USERS from '../../assets/dummyUsers'

const Stories = () => {
    const {theme} = React.useContext(ThemeContext)
    const themeStyle = {
        color: theme === "dark" ? '#fff' : '#000',
    }

    return (
        <View style={styles.container}>
            <ScrollView  horizontal showsHorizontalScrollIndicator={false}>
                {
                    USERS.map((user, index) => {
                        return (
                            <View key={index} style={styles.storyContainer}>
                                <View style={styles.story}>
                                    <Image style={styles.storyImg} resizeMode="cover" source={{uri: user.image}}/>
                                </View>
                                <Text style={[styles.userName, themeStyle]}>{user.user.length > 9 ? user.user.slice(0, 8) + '...': user.user}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Stories

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderStyle: "solid",
        borderColor: "#a8a5a2"
    },
    storyContainer: {
        width: 80,
        alignItems: "center"
    },
    story: {
        width: 60,
        height: 60,
        borderRadius: 50,
        overflow: "hidden",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "red",
    },
    storyImg: {
        width: "100%",
        height: 80,
    },
    userName: {
        textAlign: "center",
    }
})