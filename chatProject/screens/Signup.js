import { View, Text, StyleSheet, Alert  } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper';
import { signup } from '../redux/actions/auth';
import { connect } from 'react-redux';


function Signup({ signup, navigation }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [re_password, setRePassword] = useState("");
    const [accountCreated, setAccountCreated] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async () => {

        if (password === re_password) {
            let theMsg = await signup(email, username, password, re_password);
            if (theMsg == "failed") {
                setError("Email or Username already exists!")
            }else {
                Alert.alert("Check your mail to activate your account")
                setAccountCreated(true);
            }
        }
    };

    if (accountCreated) {
        navigation.navigate("Login")
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>SIGN UP</Text>
                <Text style={styles.error}>{error}</Text>
                <TextInput
                    label="Email"
                    mode='outline'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.textInput}
                    activeUnderlineColor='#FF3366'
                    left={<TextInput.Icon color="white" name="email" />}
                />
                <TextInput
                    label="Username"
                    mode='outline'
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={styles.textInput}
                    activeUnderlineColor='#FF3366'
                    left={<TextInput.Icon color="white" name="account" />}
                />
                <TextInput
                    label="Password"
                    mode='outline'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.textInput}
                    secureTextEntry={true}
                    activeUnderlineColor='#FF3366'
                    left={<TextInput.Icon color="white" name="key" />}
                />
                <TextInput
                    label="Confirm Password"
                    mode='outline'
                    value={re_password}
                    onChangeText={text => setRePassword(text)}
                    secureTextEntry={true}
                    style={styles.textInput}
                    activeUnderlineColor='#FF3366'
                    left={<TextInput.Icon color="white" name="key" />}
                />
                <Button mode="contained" style={styles.btn} onPress={() => onSubmit()}>
                    Sign Up
                </Button>
                <View style={styles.BottomView}>
                    <Text style={styles.BottomText}>Already have an account? <Text
                        style={styles.logIn}
                        onPress={() => navigation.navigate('Login')}>LOG IN</Text></Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
    },
    textInput: {
        // backgroundColor: "transparent",
        margin: 16,
    },
    text: {
        fontSize: 19,
        marginTop: 32,
    },
    btn: {
        width: "100%",
        backgroundColor: "#FF3366",
        padding: 10,
        borderRadius: 16,
        marginTop: 32,
        marginBottom: 32
    },
    BottomText: {
        color: "#999999",
    },
    BottomView: {
        textAlign: "center",
        marginLeft: 64,
    },
    logIn: {
        color: "#000",
    },
    error: {
        margin: 16,
        color: "#FF3366",
      }
})



export default connect(null, { signup })(Signup);