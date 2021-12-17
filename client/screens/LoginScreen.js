/*import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const sendCred = async props => {
    try {
      fetch('https://project-se-db.herokuapp.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then(res => res.json())
        .then(async data => {
          try {
            await AsyncStorage.setItem('token', data.token);
            props.navigation.replace('home');
          } catch (e) {
            console.log('error hai', e);
            Alert(e);
          }
        });
    } catch (err) {}
  };

  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <StatusBar
          backgroundColor="rgb(255, 230, 230)"
          barStyle="dark-content"
        />
        <View style={{padding: 20, marginTop: 40}}>
          <Text
            style={{
              fontSize: 30,
              marginLeft: 18,
              color: '#ff6666',
              textDecorationStyle: 'dotted',
              fontWeight: 'bold',
            }}>
            NITW CONNECT
          </Text>
          <View
            style={{
              borderBottomColor: '#ffb3b3',
              borderBottomWidth: 2,
              borderRadius: 10,
              marginLeft: 2,
              marginRight: 2,
              marginTop: 34,
            }}
          />
          <Text
            style={{
              fontSize: 20,
              marginLeft: 18,
              marginTop: 20,
              color:'blue'
            }}>
            Login with email
          </Text>
          <TextInput
            placeholder="Email"
            mode="outlined"
            value={email}
            style={{
              marginLeft: 18,
              marginRight: 18,
              marginTop: 38,
              borderBottomWidth: 1,
              fontSize: 20,
            }}
            theme={{colors: {primary: 'blue'}}}
            onChangeText={text => setEmail(text)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 18,
            }}>
            <TextInput
              placeholder="Password"
              mode="outlined"
              secureTextEntry={true}
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
              style={{
                marginLeft: 18,
                marginTop: 18,
                flex: 1,
                borderBottomWidth: 1,
                fontSize: 20,
              }}
              theme={{colors: {primary: 'blue'}}}
              secureTextEntry={hidePass ? true : false}
            />

            <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={45}
              color="grey"
              onPress={() => setHidePass(!hidePass)}
              style={{borderBottomWidth: 1, marginTop: 22, marginRight: 18}}
            />
          </View>

          <Button
            mode="contained"
            style={{
              marginLeft: 18,
              marginRight: 18,
              marginTop: 18,
              backgroundColor: '#ffb3b3',
              marginTop: 80,
            }}
            onPress={() => sendCred(props)}>
            Login
          </Button>
          <View style={{flexDirection:"row",marginTop:50}}>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                marginTop: 20,
              }}>
              Don't have an account ?
            </Text>
            <TouchableHighlight>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 18,
                  marginTop: 20,
                  color: 'blue',
                }}
                onPress={() => props.navigation.replace('signup')}>
                Create one
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 140,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
export default LoginScreen;
*/

import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
//import {loginCall} from '../apiCalls';
//import {AuthContext} from '../context/AuthContext';
//import {useContext} from 'react';
const SignupScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  //const {isFetching, dispatch} = useContext(AuthContext);
  const handleClick = async e => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    try {
      await axios.post('https://project-se-db.herokuapp.com/auth/login', user);

      console.log(user);
      await AsyncStorage.setItem('email', email);
      props.navigation.replace('start');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <StatusBar
          backgroundColor="rgb(255, 230, 230)"
          barStyle="dark-content"
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{padding: 20, marginTop: 40}}>
            <Text
              style={{
                fontSize: 30,
                marginLeft: 18,
                color: '#ff6666',
                textDecorationStyle: 'dotted',
                fontWeight: 'bold',
              }}>
              NITW CONNECT
            </Text>
            <View
              style={{
                borderBottomColor: '#ffb3b3',
                borderBottomWidth: 2,
                borderRadius: 10,
                marginLeft: 2,
                marginRight: 2,
                marginTop: 34,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                marginLeft: 18,
                marginTop: 20,
                color: 'blue',
              }}>
              Login with email
            </Text>

            <TextInput
              placeholder="Email"
              mode="outlined"
              style={{
                marginLeft: 18,
                marginRight: 18,
                marginTop: 38,
                borderBottomWidth: 1,
                fontSize: 20,
              }}
              theme={{colors: {primary: 'blue'}}}
              onChangeText={text => setEmail(text)}
              value={email}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 18,
              }}>
              <TextInput
                placeholder="Password"
                mode="outlined"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
                style={{
                  marginLeft: 18,
                  marginTop: 18,
                  flex: 1,
                  borderBottomWidth: 1,
                  fontSize: 20,
                }}
                theme={{colors: {primary: 'blue'}}}
                secureTextEntry={hidePass ? true : false}
              />

              <Icon
                name={hidePass ? 'eye-slash' : 'eye'}
                size={35}
                color="grey"
                onPress={() => setHidePass(!hidePass)}
                style={{borderBottomWidth: 1, marginTop: 32, marginRight: 18}}
              />
            </View>

            <Button
              style={{
                marginLeft: 18,
                marginRight: 18,
                marginTop: 18,
                backgroundColor: '#ffb3b3',
                marginTop: 80,
              }}
              mode="contained"
              onPress={handleClick}>
              LOGIN
            </Button>
            <View style={{flexDirection: 'row', marginTop: 50}}>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 20,
                  marginTop: 20,
                }}>
                Dont't have an account ?
              </Text>
              <TouchableHighlight>
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 18,
                    marginTop: 20,
                    color: 'blue',
                  }}
                  onPress={() => props.navigation.navigate('register')}>
                  Register
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignupScreen;
