import React, {useState, useEffect} from 'react';
import HomeScreen from './HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import Social from './Social';
import Interview from './Interview';
import Clubs from './Clubs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Events from './Events';
const Homenav = props => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const getuser = async email => {
    try {
      console.log('email ->', email);
      const u = await axios.get(
        'https://project-se-db.herokuapp.com/users/getuser/' + email,
      );
      setUser(u.data);
      console.log('user ->', user);
    } catch (err) {}
  };
  useEffect(() => {
    AsyncStorage.getItem('email').then(email => {
      setEmail(email);
      if (user === '' && email !== '') {
        console.log('go', email);
        console.log('go', user);
        getuser(email);
      }
    });
  }, [user]);

  return (
    <Drawer.Navigator
      initialRouteName="interview"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'rgba(72,61,139,0.8)',
          width: 240,
        },
        drawerLabelStyle: {
          color: 'white',
          fontSize: 18,
        },
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* <Drawer.Screen name="Interview Corner" component={Interview} /> */}
      {user.isClub ? (
        <Drawer.Screen name="Manage Events" component={Events} />
      ) : (
        <Drawer.Screen name="Interview Corner" component={Interview} />
      )}
      <Drawer.Screen name="Social Corner" component={Social} />
      <Drawer.Screen name="Clubs " component={Clubs} />
    </Drawer.Navigator>
  );
};

export default Homenav;
