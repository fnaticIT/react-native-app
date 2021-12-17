import React, {useEffect, useState} from 'react';
import {Text, Modal, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import {Pressable} from 'react-native';
import {StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import I from 'react-native-vector-icons/Ionicons';
import I2 from 'react-native-vector-icons/MaterialIcons';
const HomeScreen = props => {
  const [email, setemail] = useState('');
  const [list, setlist] = useState([]);
  //const [user, setUser] = useState({});
  const getuser = async () => {
    try {
      console.log('email ->', email);

      const u = await axios.get(
        'https://project-se-db.herokuapp.com/users/getuser/' + email,
      );
      console.log(u.data);
    } catch (err) {}
  };
  const [showWarning, SetshowWarning] = useState(false);
  const getemail = () => {
    try {
      AsyncStorage.getItem('email').then(value => {
        if (value !== null) {
          setemail(value);
        }
      });
    } catch (err) {}
  };

  const getlist = async () => {
    try {
      const users = await axios.get(
        'https://project-se-db.herokuapp.com/users/users',
      );
      setlist(users.data);
    } catch (err) {}
  };

  useEffect(() => {
    getemail();

    getlist();

    props.navigation.setOptions({
      headerShown: false,
      headerTitle: 'Home',
      headerStyle: {
        backgroundColor: 'rgba(72,61,139,1)',
      },
      headerTitleStyle: {
        color: 'white',
      },

      // headerLeft: () => (
      //   <Icon
      //     name={'menu'}
      //     size={25}
      //     color="black"
      //     style={{width: '11%'}}
      //     onPress={() => props.navigation.openDrawer()}
      //   />
      // ),
    });
  }, []);
  const logout = props => {
    AsyncStorage.removeItem('token').then(() => {
      props.navigation.replace('login');
    });
    console.log(props.navigation);
  };
  function on() {
    console.log('clicked');
    SetshowWarning(true);
  }
  return (
    <View style={{backgroundColor: 'rgba(72,61,139,0.95)', flex: 1}}>
      <Icon
        name={'menu'}
        size={38}
        color="white"
        style={{position: 'absolute', top: 10, left: 10}}
        onPress={() => props.navigation.openDrawer()}
      />
      <I2
        name={'logout'}
        size={35}
        color="white"
        style={{position: 'absolute', top: 10, right: 4}}
        onPress={() => logout(props)}
      />
      <View
        style={{
          position: 'absolute',
          top: '10%',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',

          width: '100%',
        }}>
        <I
          name="logo-capacitor"
          size={160}
          color="white"
          style={[styles.cc, {alignSelf: 'center'}]}
        />
        <Text
          style={{
            marginTop: '10%',
            fontSize: 30,
            color: 'white',
            alignSelf: 'center',
          }}>
          To Connect We Strive !!
        </Text>
        <View
          style={{
            display: 'flex',
            width: 150,
            marginTop: '25%',
            alignSelf: 'flex-end',
            right: '-10%',
          }}>
          <View
            style={{
              borderBottomWidth: 3,
              borderBottomColor: 'pink',
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
              backgroundColor: 'white',
              height: 40,
              transform: [{rotate: '-20deg'}],
            }}></View>
          <View
            style={{
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
              backgroundColor: 'white',
              height: 40,
              transform: [{rotate: '-20deg'}],
            }}></View>
        </View>
        <View
          style={{
            display: 'flex',
            width: 150,
            marginTop: '10%',
            alignSelf: 'flex-start',
            left: '-10%',
          }}>
          <View
            style={{
              borderBottomWidth: 3,
              borderBottomColor: 'pink',
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: 'white',
              height: 40,
              transform: [{rotate: '20deg'}],
            }}></View>
          <View
            style={{
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              backgroundColor: 'white',
              height: 40,
              transform: [{rotate: '20deg'}],
            }}></View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          display: 'flex',
          backgroundColor: 'rgba(0,0,0,0.5)',
          width: '100%',
          padding: 10,
        }}>
        <Text style={{fontSize: 25, color: 'white', alignSelf: 'center'}}>
          NITW CONNECT
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000030',
  },
  warning_modal: {
    position: 'absolute',
    top: 25,
    right: 10,
    width: 200,
    height: 100,
    // backgroundColor: '#ffffff',
    // borderWidth: 1,
    borderColor: '#000',
    elevation: 5,
  },

  warning_body: {
    height: 100,
    margin: 10,
  },
  item: {
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 3,
  },
  text: {
    color: '#000000',
    fontSize: 25,
    fontStyle: 'italic',
    margin: 10,
  },
  cc: {},
});
export default HomeScreen;
