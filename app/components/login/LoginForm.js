import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Pressable,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import {firebase} from "../../firebase";

const loginFromSchema = Yup.object().shape({
  email: Yup.string().email().required("An email is required"),
  password: Yup.string()
    .required()
    .min(6, "Your password has to have at least 6 characters"),
});

const LoginForm = ({navigation}) => {
    const onLogin = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error) {
            Alert.alert("Error!", error.message + " \n\nsign up if you want to create new account" , [
              {
                text: "ok",
                onPress: () => {}
              },
              {
                text: "sign up",
                onPress: () => {navigation.push("SignupScreen")}
              }
            ])
        }
    }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={loginFromSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          values,
          isValid,
        }) => {
          return (
            <>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor:
                      values.email && !Validator.validate(values.email)
                        ? "red"
                        : "#a8a5a2",
                  },
                ]}
                placeholder="Phone number, username or email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    marginBottom: 6,
                    borderColor:
                      errors.password && values.password ? "red" : "#a8a5a2",
                  },
                ]}
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <View>
                <Text
                  style={{
                    textAlign: "right",
                    color: "skyblue",
                    marginBottom: 25,
                  }}
                >
                  Forgot password?
                </Text>
              </View>
              <Button
                title="Log in"
                onPress={handleSubmit}
                disabled={!isValid}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 35,
                  justifyContent: "center",
                }}
              >
                <Text>Don't have an account? </Text>
                <Pressable onPress={() => navigation.push('SignupScreen')}>
                  <Text style={{ color: "skyblue" }}>Sign Up</Text>
                </Pressable>
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default LoginForm;

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
});
