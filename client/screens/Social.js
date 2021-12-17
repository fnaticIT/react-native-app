import React, {useState} from 'react';
import {View, StyleSheet, Modal, Pressable, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Share from './Share';
import Feed from './Feed';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from './Profile';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import {Modal} from 'react-native';
//import {TouchableWithoutFeedback} from 'react-native';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Friends from './Friends';
import Search from './Search';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
const Social = props => {
  const [showWarning, SetshowWarning] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Social Corner',
      headerStyle: {
        backgroundColor: 'rgba(72,61,139,1)',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerRight: () => (
        <Icon
          name={'dots-three-vertical'}
          size={25}
          color="black"
          style={{width: '11%'}}
          onPress={() => on()}
        />
      ),
    });
  });
  function on() {
    console.log('clicked');
    SetshowWarning(true);
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'share') {
              iconName = 'cloud';
              size = focused ? 25 : 20;
              color = focused ? 'darkslateblue' : '#555';
            } else if (route.name === 'feed') {
              iconName = 'rss';
              size = focused ? 25 : 20;
              color = focused ? 'darkslateblue' : '#555';
            } else if (route.name === 'profile') {
              iconName = 'user';
              size = focused ? 25 : 20;
              color = focused ? 'darkslateblue' : '#555';
            } else if (route.name === 'search') {
              iconName = 'search';
              size = focused ? 25 : 20;
              color = focused ? 'darkslateblue' : '#555';
            }

            return (
              <FontAwesome5 name={iconName} size={size} color={color} regular />
            );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="share" component={Share} />
        <Tab.Screen name="feed" component={Feed} />

        <Tab.Screen name="search" component={Search} />
        <Tab.Screen name="profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default Social;
