import React from 'react'
import { StyleSheet, Text, View, Image, Button} from 'react-native'

import Header from '../components/profile/Header'
import { ThemeContext } from '../components/themeContext'
import {firebase, db} from '../firebase'

const ProfileScreen = ({navigation}) => {
    const {theme} = React.useContext(ThemeContext)
    const [profilePic, setProfilePic] = React.useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWeZj1SB4KzSbjx_oKlZpyrOLlEL9K9DW0JA&usqp=CAU")
    const [userName, setUserName] = React.useState("")
    const [userEmail, setUserEmail] = React.useState("")
    const [numOfPosts, setNumOfPosts] = React.useState(0)

    const setUserData = () => {
        db.collection('users').doc(firebase.auth().currentUser.email).onSnapshot((snapshot) => (setUserName(snapshot.get('username'))))
        setUserEmail(firebase.auth().currentUser.email)
        db.collection('users').doc(firebase.auth().currentUser.email).collection('posts').get().then((snap) => {setNumOfPosts(snap.size)})
    }

    const themeStyle = {
        color: theme === 'dark' ? "#fff" : "#000"
    }

    const getUserProfilePic = () => {
        const user = firebase.auth().currentUser
        const unsubscribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(snapshot => snapshot.docs.map(doc => {setProfilePic(doc.data().profile_picture)}))
        return unsubscribe
    }

    const handleSignOut = () => {
        try {
            firebase.auth().signOut()
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getUserProfilePic()
        setUserData()
    }, [])

    return (
        <View style={[styles.container, {backgroundColor: theme === 'dark' ? "#000" : "#fff"}]}>
            <Header navigation={navigation}/>
            <View style={styles.profilePicContainer}>
                <Image style={styles.profilePic} source={{uri: profilePic}} />
            </View>
            <View>
                <Text style={[styles.username, themeStyle]}>{userName}</Text>
                <Text style={[styles.email, themeStyle]}>{userEmail}</Text>
                <Text style={[styles.email, themeStyle]}>Total Posts:  {numOfPosts}</Text>
            </View>
            <View style={styles.btn}>
                <Button title="Log out" onPress={() => {handleSignOut()}}/>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profilePicContainer: {
        height: 250,
        justifyContent: "center",
        alignItems: "center"
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    username: {
        fontSize: 40,
        textAlign:"center"
    },
    email: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 20
    },
    btn: {
        width: 110,
        marginTop: 40,
        alignSelf: "center",
        borderRadius: 20,
        overflow: "hidden"
    }
})
