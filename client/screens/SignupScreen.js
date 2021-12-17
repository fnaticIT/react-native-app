/*import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignupScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const sendCred = async props => {
    fetch('https://project-se-db.herokuapp.com/signup', {
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
        console.log(data);
        await AsyncStorage.setItem('token', data.token);
        props.navigation.replace('home');
      });
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
              color: 'blue',
            }}>
            Create a new account
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
            style={{
              marginLeft: 18,
              marginRight: 18,
              marginTop: 18,
              backgroundColor: '#ffb3b3',
              marginTop: 80,
            }}
            mode="contained"
            
            onPress={() => sendCred(props)}>
            signup
          </Button>
          <View style={{flexDirection:"row",marginTop:50}}>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                marginTop: 20,
              }}>
              Already have an account ?
            </Text>
            <TouchableHighlight>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 18,
                  marginTop: 20,
                  color: 'blue',
                }}
                onPress={() => props.navigation.replace('login')}>
                Login
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignupScreen;
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
//import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const SignupScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [username, setUsername] = useState('');
  const [club, setClub] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const handleClick = async e => {
    e.preventDefault();
    if (passwordAgain !== password) {
      return;
    } else {
      const user = {
        username: username,
        email: email,
        password: password,
        isClub: club,
      };
      console.log(user);
      try {
        await axios.post(
          'https://project-se-db.herokuapp.com/auth/register',
          user,
        );

        console.log(user);
        //await AsyncStorage.setItem('user',JSON.stringify( user));
        props.navigation.replace('login');
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-10}>
        <StatusBar
          backgroundColor="rgb(255, 230, 230)"
          barStyle="dark-content"
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{padding: 20, marginTop: 10}}>
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
                marginTop: 14,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                marginLeft: 18,
                marginTop: 20,
                color: 'blue',
              }}>
              Create a new account
            </Text>
            <TextInput
              placeholder="Username"
              mode="outlined"
              style={{
                marginLeft: 18,
                marginRight: 18,
                marginTop: 20,
                borderBottomWidth: 1,
                fontSize: 20,
              }}
              theme={{colors: {primary: 'blue'}}}
              onChangeText={text => setUsername(text)}
              value={username}
            />
            <TextInput
              placeholder="Email"
              mode="outlined"
              style={{
                marginLeft: 18,
                marginRight: 18,
                marginTop: 20,
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
                marginTop: 10,
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
                style={{borderBottomWidth: 1, marginTop: 31, marginRight: 18}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TextInput
                placeholder="Password"
                mode="outlined"
                secureTextEntry={true}
                onChangeText={text => setPasswordAgain(text)}
                value={passwordAgain}
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
                style={{borderBottomWidth: 1, marginTop: 31, marginRight: 18}}
              />
            </View>
            <TextInput
              placeholder="Club user - true / false"
              mode="outlined"
              style={{
                marginLeft: 18,
                marginRight: 18,
                marginTop: 20,
                borderBottomWidth: 1,
                fontSize: 20,
              }}
              theme={{colors: {primary: 'blue'}}}
              onChangeText={text => setClub(text)}
              value={club}
            />
            <Button
              style={{
                marginLeft: 18,
                marginRight: 18,

                backgroundColor: '#ffb3b3',
                marginTop: 40,
              }}
              mode="contained"
              onPress={handleClick}>
              signup
            </Button>
            <View style={{flexDirection: 'row', marginTop: 50}}>
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 20,
                  marginTop: 20,
                }}>
                Already have an account ?
              </Text>
              <TouchableHighlight>
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 18,
                    marginTop: 20,
                    color: 'blue',
                  }}
                  onPress={() => props.navigation.replace('login')}>
                  Login
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
