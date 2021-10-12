import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import { ThemeContext } from '../../themeContext'

const icons = [
    {
        name: 'Like',
        url: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
        darkUrl: "https://img.icons8.com/fluency-systems-regular/60/000000/like--v1.png",
        likedUrl: "https://img.icons8.com/fluency-systems-filled/48/fa314a/like.png"
    },
    {
        name: 'Comment',
        url: "https://img.icons8.com/material-outlined/60/ffffff/speech-bubble--v1.png",
        darkUrl: "https://img.icons8.com/material-outlined/60/000000/speech-bubble--v1.png",

    },
    {
        name: 'Share',
        url: "https://img.icons8.com/fluency-systems-regular/48/ffffff/sent.png",
        darkUrl: "https://img.icons8.com/fluency-systems-regular/48/000000/sent.png",
    },
    {
        name: 'Save',
        url: "https://img.icons8.com/fluency-systems-regular/48/ffffff/bookmark-ribbon--v1.png",
        darkUrl: "https://img.icons8.com/fluency-systems-regular/48/000000/bookmark-ribbon--v1.png",
    }
]

const PostFooter = ({post}) => {
    const {theme} = React.useContext(ThemeContext)

    let getDarkIcons = theme === "dark" ? false : true

    const themeStyle = {
        color: theme === "dark" ? "#fff" : "#000"
    }

    return (
        <View style={styles.container}>
            <Icons getDarkIcons={getDarkIcons}/>
            <View>
                <Text style={[themeStyle, {fontWeight: "bold"}]}>{post.likes} likes</Text>
            </View>
            <View>
                <Text style={themeStyle}>
                    <Text style={{fontWeight:"bold"}}>{post.user} </Text>
                    <Text>{post.caption}</Text>
                </Text>
            </View>
            <View>
                {
                    !!post.comments.length && (post.comments.length > 1 ? <Text style={{color: "#a8a5a2"}}>View all {post.comments.length} comments</Text> : <Text style={{color: "#a8a5a2"}}>View comment</Text>)
                }
            </View>
            <Comments post={post} themeStyle={themeStyle}/>
        </View>
    )
}

const Icons = ({getDarkIcons}) => {
    return (
        <View style={styles.iconContainer}>
            <View style={{flexDirection: "row"}}>
                <Image style={styles.icon} source={{uri: getDarkIcons ? icons[0].darkUrl : icons[0].url}}/>
                <Image style={styles.icon} source={{uri: getDarkIcons ? icons[1].darkUrl : icons[1].url}}/>
                <Image style={styles.icon} source={{uri: getDarkIcons ? icons[2].darkUrl : icons[2].url}}/>
            </View>
            <View>
                <Image style={styles.icon} source={{uri: getDarkIcons ? icons[3].darkUrl : icons[3].url}}/>
            </View>
        </View>
    )
}

const Comments = ({post, themeStyle}) => {
    return (
        <View>
            {
                post.comments.map((comment, index) => {
                    return (
                        <View key={index}>
                            <Text>
                                <Text style={[themeStyle, {fontWeight:"bold"}]}>{comment.user} </Text>
                                <Text style={themeStyle}>{comment.comment}</Text>
                            </Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default PostFooter

const styles = StyleSheet.create({
    container: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    }
})
