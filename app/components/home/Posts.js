import React from 'react'
import { StyleSheet, ScrollView, View, Image } from 'react-native'

import PostHeader from './subComponents/PostHeader'
import PostFooter from './subComponents/PostFooter'
import { db } from '../../firebase'

const Posts = () => {
    const [posts, setPosts] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const getPosts = () => {
        return new Promise((resolve, reject) => {
            db.collectionGroup('posts').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
                setPosts(snapshot.docs.map(doc => (
                    {id: doc.id, ...doc.data()}
                    )))
            })
            resolve()
        })
    }

    React.useEffect(() => {
        // db.collectionGroup('posts').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
        //     setPosts(snapshot.docs.map(doc => (
        //         {id: doc.id, ...doc.data()}
        //         )))
        // })
        getPosts().then(setIsLoading(false))
    }, [])
    
    return (
        <ScrollView style={styles.container}>
            {
                posts.map((post, index) => {
                    return (
                        <View key={index} style={styles.postContainer}>
                                <PostHeader post={post}/>
                                <View style={{width: "100%", height: 450}}>
                                    <Image style={styles.postImg} resizeMode="cover" source={{uri: post.imageUrl}}/>
                                </View>
                                <PostFooter post={post}/>
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

export default Posts

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    postContainer: {
        marginBottom: 30,
    },
    postImg: {
        width: "100%",
        height: "100%",
    }
})
