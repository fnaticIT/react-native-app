import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import image from '../assets/images/image1.png';
import {Image} from 'react-native';
const Splash = props => {
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [isloggedin, setLogged] = useState(null);

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isloggedin) {
        props.navigation.navigate('start');
      } else {
        props.navigation.navigate('login');
      }
    }, 3000);
  });
  return (
    <View>
      <Image style={{width: '100%', height: '100%'}} source={image} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Splash;
