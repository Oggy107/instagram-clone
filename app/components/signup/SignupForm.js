import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, Pressable, Alert } from 'react-native'
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import {firebase, db} from '../../firebase'

const signupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    username: Yup.string().required().min(2, 'A username has to have at least 2 characters'),
    password: Yup.string().required().min(6, 'Your password has to have at least 6 characters')
})

const SignupForm = ({navigation}) => {

    const onSignup = async (email, password, username) => {
        try {
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)

            db.collection('users').doc(authUser.user.email).set({owner_uid: authUser.user.uid, username: username, profile_picture: await getRandomProfilePic()})
        } catch (error) {
            Alert.alert('Error',error.message)
        }
    }

    const getRandomProfilePic = async () => {
        const res = await fetch('https://randomuser.me/api')
        const data = await res.json()
        return data.results[0].picture.large
    }

    return (
        <View style={styles.container}>
            <Formik initialValues={{email: '', username: '', password: ''}} onSubmit={(values) => {onSignup(values.email, values.password, values.username)}} validationSchema={signupFormSchema} validateOnMount={true}>
                {({handleChange, handleBlur, handleSubmit, values, isValid, errors}) => {
                    return (
                        <>
                            <TextInput style={[styles.input, {borderColor: (values.email && !Validator.validate(values.email)) ? "red" : "#a8a5a2"}]} placeholder="Email" autoCapitalize="none" autoCorrect={false} keyboardType="email-address" textContentType="emailAddress" autoFocus={true} onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
                            <TextInput style={[styles.input, {borderColor: (values.username && errors.username) ? "red" : "#a8a5a2"}]} placeholder="Username" autoCapitalize="none" autoCorrect={false} onChangeText={handleChange('username')} onBlur={handleBlur('username')} value={values.username} />
                            <TextInput style={[styles.input, {marginBottom: 50, borderColor: (values.password && errors.password) ? "red" : "#a8a5a2"}]} placeholder="Password" autoCapitalize="none" autoCorrect={false} textContentType="password" secureTextEntry={true} onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
                            <Button title="Sign Up" onPress={handleSubmit} disabled={!isValid}/>
                            <View style={{flexDirection: 'row', marginTop: 40, justifyContent: 'center'}}>
                                <Text>Already have an account? </Text>
                                <Pressable onPress={() => navigation.goBack()}><Text style={{color: "skyblue"}}>Log in</Text></Pressable>
                            </View>
                        </>
                    )
                }}
            </Formik>
        </View>
    )
}

export default SignupForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
      },
      input: {
        padding: 7,
        marginBottom: 15,
        borderWidth: 1.5,
        borderStyle: "solid",
        borderRadius: 10,
      },
})
