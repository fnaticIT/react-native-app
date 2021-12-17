import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
//import ImagePicker from 'react-native-image-crop-picker';
import {ActivityIndicator, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const User = props => {
  const {email} = props.route.params;
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [currentemail, setCurrentemail] = useState('');
  const [image, setImage] = useState(
    'https://bootdey.com/img/Content/avatar/avatar6.png',
  );
  let f = false;
  const getuser = async () => {
    try {
      console.log('email ->', email);
      const u = await axios.get(
        'https://project-se-db.herokuapp.com/users/getuser/' + email,
      );
      setUser(u.data);
      console.log('user ->', user);
    } catch (err) {}
  };

  const getCurrentUser = async email2 => {
    try {
      console.log('email ->', email);
      const u = await axios.get(
        'https://project-se-db.herokuapp.com/users/getuser/' + email2,
      );
      setCurrentUser(u.data);
      console.log('user ->', user);
    } catch (err) {}
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
    AsyncStorage.getItem('email').then(cemail => {
      setCurrentemail(cemail);
      if (user === '') {
        console.log('go', cemail);
        console.log('go', user);
        getuser();
        getCurrentUser(cemail);
      }
    });
  }, [currentUser]);
  const [followed, setFollowed] = useState(f);
  useEffect(() => {
    f = currentUser ? currentUser.followings.includes(user._id) : false;
    setFollowed(f);
    console.log(f);
  }, [currentUser]);

  const handleClick = async () => {
    try {
      if (followed === true) {
        await axios.put(
          `https://project-se-db.herokuapp.com/users/${user._id}/unfollow`,
          {
            userId: currentUser._id,
          },
        );
        setFollowed(!followed);
      } else {
        await axios.put(
          `https://project-se-db.herokuapp.com/users/${user._id}/follow`,
          {
            userId: currentUser._id,
          },
        );
        setFollowed(!followed);
      }
    } catch (err) {}
  };

  function follow() {}
  return user !== '' ? (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{uri: user.profilePicture !== '' ? user.profilePicture : image}}
      />

      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.info}>{user.isClub ? 'Club' : 'Student'}</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
            electram expetendis, omittam deseruisse consequuntur ius an,
          </Text>

          <Pressable
            style={styles.buttonContainer}
            onPress={() => handleClick()}>
            <Text> {followed === true ? 'Unfollow' : 'Follow'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  ) : (
    <ActivityIndicator size="large" color="#0000ff" />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00BFFF',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 20,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 20,
  },
  body: {
    marginTop: 55,
  },
  bodyContent: {
    alignItems: 'center',
    padding: 10,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 84,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});

export default User;
