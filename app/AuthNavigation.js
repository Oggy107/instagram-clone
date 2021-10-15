import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { SignedInStack, SignedOutStack } from './screens/Navigation'
import {firebase} from './firebase'

const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = React.useState(null)

    const userHandler = (user) => {
        user ? setCurrentUser(user) : setCurrentUser(null)
    }

    React.useEffect(() => {
        return firebase.auth().onAuthStateChanged((user) => userHandler(user))
    })
    
    return (
        <>
            {currentUser ? <SignedInStack /> : <SignedOutStack />}
        </>
    )
}

export default AuthNavigation

const styles = StyleSheet.create({})
