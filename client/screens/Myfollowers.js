import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, RefreshControl} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Pressable} from 'react-native';
import I from 'react-native-vector-icons/Entypo';

const Myfollowers = props => {
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [toggle, setToggle] = useState(false);
  //   const getfriends = async () => {
  //     const f = await axios.get('https://project-se-db.herokuapp.com/users/friends/' + user._id);
  //     setFriends(f.data);
  //   };
  const getuser = async email => {
    try {
      console.log('email ->', email);
      const u = await axios.get(
        'https://project-se-db.herokuapp.com/users/getuser/' + email,
      );
      setUser(u.data);
      console.log('user ->', user);
      //   getfriends();
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

  //const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          'https://project-se-db.herokuapp.com/users/followers/' + user._id,
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
  const fetch = async () => {
    setToggle(true);
    console.log('fetch');
    const friendList = await axios.get(
      'https://project-se-db.herokuapp.com/users/friends/' + user._id,
    );
    setFriends(friendList.data);
    setTimeout(() => {
      setToggle(false);
    }, 2000);
  };
  function handle(useremail) {
    console.log(useremail);
    props.navigation.navigate('user', {
      email: useremail,
    });
  }
  return user !== '' ? (
    <ScrollView style={{backgroundColor: 'rgba(72,61,139,0.9)', flex: 1}}>
      <View style={{zIndex: 1}}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={toggle} onRefresh={fetch} />
          }
          keyExtractor={(item, index) => index.toString()}
          data={friends}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => {
                  handle(item.email);
                }}>
                <View style={{marginHorizontal: 30, marginTop: 15}}>
                  <View style={styles.container}>
                    <Icon name="account-group" size={50} color="black" />
                    <Text
                      style={{
                        fontSize: 30,
                        color: 'white',
                        textTransform: 'capitalize',
                      }}>
                      {item.username}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          }}
          style={{padding: 10}}
        />
      </View>
    </ScrollView>
  ) : (
    <ActivityIndicator size="large" color="#0000ff" />
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: 'darkslateblue',
    backgroundColor: 'pink',
    flex: 1,
    elevation: 5,
    borderRadius: 20,
    padding: 15,
  },
});

export default Myfollowers;
