import React from 'react'
import { Image, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import validUrl from 'valid-url'

import { ThemeContext } from '../themeContext'
import { db, firebase } from '../../firebase'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit')
})

const placeholderImgUrl = "https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg"

const FormikPostUploader = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Form navigation={navigation}/>
        </View>
    )
}

const Form = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = React.useState(placeholderImgUrl)
    const [currentLoggedInUser, setCurrentLoggedInUser] = React.useState(null)

    const {theme} = React.useContext(ThemeContext)

    const getUserName = () => {
        const user = firebase.auth().currentUser
        const unsubscribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1).onSnapshot(snapshot => snapshot.docs.map(doc => {setCurrentLoggedInUser({username: doc.data().username, profilePicture: doc.data().profile_picture})}))
        return unsubscribe
    }
    
    React.useEffect(() => {
        getUserName()
    }, [])

    const uploadPostToFire = (imageUrl, caption) => {
        const unsubscribe = db.collection('users').doc(firebase.auth().currentUser.email).collection('posts').add({
            imageUrl: imageUrl,
            user: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profilePicture,
            owner_uid: firebase.auth().currentUser.uid,
            owner_email: firebase.auth().currentUser.email,
            caption: caption,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            likes_by_users: [],
            comments: []
        }).then(() => navigation.goBack())

        return unsubscribe
    }

    const themeStyle = {
        color: theme === "dark" ? "#fff" : "#000"
    }

    return (
        <Formik initialValues={{caption: '', imageUrl: ''}} onSubmit={(values) => {uploadPostToFire(values.imageUrl, values.caption)}} validationSchema={uploadPostSchema} validateOnMount={true}>
            {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => {
                return (
                    <>
                        <View style={styles.minorContainer}>
                            <Image style={styles.imagePreview} source={{uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : placeholderImgUrl}}/>
                            <View style={styles.captionInputContainer}>
                                <TextInput
                                    style={themeStyle}
                                    placeholder="Write a caption..."
                                    placeholderTextColor="gray"
                                    multiline
                                    onChangeText={handleChange('caption')}
                                    onBlur={handleBlur('caption')}
                                    value={values.caption}
                                />
                            </View>
                        </View>

                        <TextInput
                            style={[themeStyle, styles.urlInput]}
                            onChange={({nativeEvent}) => {setThumbnailUrl(nativeEvent.text)}}
                            placeholder="Enter Image Url..."
                            placeholderTextColor="gray"
                            onChangeText={handleChange('imageUrl')}
                            onBlur={handleBlur('imageUrl')}
                            value={values.imageUrl}
                            multiline
                        />
                        <View style={{height: 40}}>
                            {
                                errors.imageUrl && (
                                    <Text style={{color: 'red', padding: 15, textAlign: "center"}}>
                                        {errors.imageUrl}
                                    </Text>
                                )
                            }
                        </View>
                        <TouchableOpacity style={styles.btn}>
                            <Button title="Upload" onPress={handleSubmit} disabled={!isValid} />
                        </TouchableOpacity>
                    </>
                )
            }}
        </Formik>
    )
}

export default FormikPostUploader

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    imagePreview: {
        width: 120,
        height: 120,
        borderRadius: 10
    },
    minorContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderBottomWidth: 0.2,
        borderStyle: "solid",
        borderColor: "#a8a5a2",
        paddingBottom: 15,
    },
    captionInputContainer: {
        width: 200,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "#a8a5a2",
        borderRadius: 10,
        overflow: "hidden",
        padding: 5,
    },
    urlInput: {
        marginTop: 20,
        width: "100%",
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "#a8a5a2",
        padding: 5,
        paddingLeft: 10,
        borderRadius: 20
    },
    btn: {
        width: 100,
        alignSelf: "center",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 10,
    }
})