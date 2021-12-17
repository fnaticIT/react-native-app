import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import axios from 'axios';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native';
//import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import { white } from 'react-native-paper/lib/typescript/styles/colors';
import I from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
const Clubs = props => {
  const [clubs, setClubs] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [post, setPost] = useState([]);

  function handle() {
    setToggle(toggle => !toggle);
  }
  const fetchPosts = async () => {
    const res = await axios.get(
      'https://project-se-db.herokuapp.com/posts/posts/a',
    );
    setPost(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }),
    );
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: 'rgba(72,61,139,1)',
      },
      headerTitleStyle: {
        color: 'white',
      },

      headerRight: () => (
        <I
          name="bells"
          size={25}
          style={{padding: 15}}
          onPress={() => handle()}
          color="white"
        />
      ),
    });

    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          'https://project-se-db.herokuapp.com/users/usersList',
        );
        setClubs(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    fetchPosts();
  }, []);
  function handle2(useremail) {
    console.log(useremail);
    props.navigation.navigate('user', {
      email: useremail,
    });
  }
  return (
    <ScrollView style={{backgroundColor: 'rgba(72,61,139,0.9)', flex: 1}}>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 15,
          display: toggle ? 'flex' : 'none',
          backgroundColor: 'rgba(0,0,0,0.08)',
          height: '100%',
          zIndex: 10,
        }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={post}
          renderItem={({item}) => {
            return (
              <View>
                <View style={styles.container}>
                  <Text
                    style={{
                      fontSize: 30,

                      textTransform: 'capitalize',
                    }}>
                    {item.createdby} posted today
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={{zIndex: 1}}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={clubs}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => {
                  handle2(item.email);
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
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: 'darkslateblue',
    backgroundColor: 'darkslateblue',
    flex: 1,
    elevation: 5,
    borderRadius: 20,
    padding: 15,
  },
});

export default Clubs;
