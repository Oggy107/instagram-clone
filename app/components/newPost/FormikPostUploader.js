import React from 'react'
import { Image, StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'

import { ThemeContext } from '../themeContext'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('URL is required'),
    caption: Yup.string().max(2200, 'Caption jas reached the character limit')
})

const placeholderImgUrl = "https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg"

const FormikPostUploader = () => {
    return (
        <View style={styles.container}>
            <Form/>
        </View>
    )
}

const Form = () => {
    const [thumbnailUrl, setThumbnailUrl] = React.useState(placeholderImgUrl)
    const {theme} = React.useContext(ThemeContext)

    const themeStyle = {
        color: theme === "dark" ? "#fff" : "#000"
    }

    return (
        <Formik initialValues={{caption: '', imageUrl: ''}} onSubmit={(values) => {console.log(values); setThumbnailUrl(values.imageUrl)}} validationSchema={uploadPostSchema} validateOnMount={true}>
            {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => {
                return (
                    <>
                        <View style={styles.minorContainer}>
                            <Image style={styles.imagePreview} source={{uri: thumbnailUrl ? thumbnailUrl : placeholderImgUrl}}/>
                            <View style={styles.captionInputContainer}>
                                <TextInput
                                    style={themeStyle}
                                    placeholder="Write a caption..."
                                    placeholderTextColor="gray"
                                    multiline
                                    onChange={handleChange('caption')}
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