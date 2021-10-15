import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

import bottomTabIcons from '../../assets/BottomTabIcons'
import { ThemeContext } from '../themeContext'
import {firebase, db} from '../../firebase'

const BottomTabs = () => {
    const [active, setActive] = React.useState("Home")
    const [profilePic, setProfilePic] = React.useState("")
    const {theme} = React.useContext(ThemeContext)

    const getUserProfilePic = () => {
        const user = firebase.auth().currentUser
        const unsubscribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(snapshot => snapshot.docs.map(doc => {setProfilePic(doc.data().profile_picture)}))
        return unsubscribe
    }

    React.useEffect(() => {
        getUserProfilePic()
    }, [])

    return (
        <View style={styles.container}>
            {
                bottomTabIcons.map((icon, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => {setActive(icon.name)}}>
                            {
                                icon.name === "Profile" ? <Image style={styles.profileIcon} source={{uri: profilePic}}/> :
                                theme === "dark" ? <Image style={styles.icon} source={{uri: active === icon.name ? icon.light.active : icon.light.inactive}}/> : <Image style={styles.icon} source={{uri: active === icon.name ? icon.dark.active : icon.dark.inactive}}/>
                            }
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default BottomTabs

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderTopWidth: 0.5,
        borderStyle: "solid",
        borderColor: "#a8a5a2",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10,
        paddingLeft: 10,
    },
    icon: {
        width: 30,
        height: 30
    },
    profileIcon: {
        width: 35,
        height: 35,
        borderRadius: 100
    }
})
