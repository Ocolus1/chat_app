import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';
import { LinearGradient } from 'expo-linear-gradient';


const image = { uri: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/slider-2.jpg' };

function Login({ login, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async () => {

    let theMsg = await login(email, password)
    if (theMsg == "failed") {
      setError("Email or Password Incorrect") 
    }
  };


  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <LinearGradient

        colors={['rgba(146, 135, 187, 0.8)', 'rgba(0,0,0,0.6)']}
        start={{
          x: 0,
          y: 0
        }}
        end={{
          x: 1,
          y: 1
        }}
        style={styles.login}>
        <View>
          <Image
            source={
              require('../assets/check_mark.png')
            }
            style={styles.centerImage}
          />
          <Text style={styles.error}>{error}</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.textInput}
            theme={{
              colors: {
                text: 'white',
              }
            }}
            placeholderTextColor='rgb(255, 255, 255)'
            activeUnderlineColor='#FF3366'
            left={<TextInput.Icon color="white" name="account" />}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.textInput}
            secureTextEntry={true}
            theme={{
              colors: {
                text: 'white',
              }
            }}
            placeholderTextColor='rgb(255, 255, 255)'
            activeUnderlineColor='#FF3366'
            left={<TextInput.Icon color="white" name="key" />}
          />

          <Button mode="contained" style={styles.btn} onPress={() => onSubmit()}>
            Sign in
          </Button>
          <View style={styles.BottomView}>
            <Text style={styles.BottomText}>Don't have an account? <Text
              style={styles.SignUp}
              onPress={() => navigation.navigate('Signup')}>Sign up</Text></Text>
          </View>
        </View>
      </LinearGradient>
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  centerImage: {
    width: "100%",
    height: 164,
    margin: 16
  },
  textInput: {
    backgroundColor: "transparent",
    margin: 16,
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
    marginLeft: 42,
  },
  SignUp: {
    color: "#fff",
  },
  login: {
    margin: 32,
    padding: 16
  },
  error: {
    margin: 16,
    color: "#FF3366",
  }
});


export default connect(null, {login })(Login);