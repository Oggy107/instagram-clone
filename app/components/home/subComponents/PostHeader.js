import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import { ThemeContext } from '../../themeContext'

const PostHeader = ({post}) => {
    const {theme} = React.useContext(ThemeContext)

    const themeStyle = {
        color: theme === "dark" ? "#fff" : "#000"
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={styles.profilePicContainer}>
                    <Image style={styles.profilePic} source={{uri: post.profile_picture}}/>
                </View>
                <Text style={[{fontWeight: "bold", paddingLeft: 5}, themeStyle]}>{post.user}</Text>
            </View>
            <View>
                <Text style={[themeStyle, {fontSize: 25}]}>...</Text>
            </View>
        </View>
    )
}

export default PostHeader

const styles = StyleSheet.create({
    container: {
        height: 40,
        padding: 2,
        paddingLeft: 5,
        paddingRight: 10,
        marginBottom: 5,
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    profilePicContainer: {
        width: 40,
        height: 40,
        borderRadius: 50,
        overflow: "hidden",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "red",
    },
    profilePic: {
        width: "100%",
        height: 80,
    },
})
