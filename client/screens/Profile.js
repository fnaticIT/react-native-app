import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from 'react-native-paper';
const Profile = props => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(
    'https://bootdey.com/img/Content/avatar/avatar6.png',
  );
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
    props.navigation.setOptions({
      headerShown: false,
    });
    AsyncStorage.getItem('email').then(email => {
      setEmail(email);
      if (user === '' && email !== '') {
        console.log('go', email);
        console.log('go', user);
        getuser(email);
      }
    });
  }, [user]);

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const logout = props => {
    AsyncStorage.removeItem('token').then(() => {
      props.navigation.navigate('login');
    });
  };
  function on() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  }

  const handle = async () => {
    const img = {
      image: image,
    };
    try {
      await axios.put(
        'https://project-se-db.herokuapp.com/users/updatePicture/' + user._id,
        img,
      );
    } catch (err) {}
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          // source={{uri: user.profilePicture ? user.profilePicture : image}}
          source={{uri: image}}
        />
        <Icon
          onPress={on}
          name="edit"
          size={24}
          style={{position: 'absolute', top: '121%', left: '58%'}}
        />
        <Button
          style={{position: 'absolute', top: '115%', left: '78%'}}
          onPress={handle}>
          Update
        </Button>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{user.username}</Text>
          <Text style={styles.info}>{user.isClub ? 'Club' : 'Student'}</Text>

          <View style={{flex: 1, width: '100%', marginTop: '10%'}}>
            <Pressable
              style={styles.buttonContainer1}
              onPress={() => {
                props.navigation.navigate('friends');
              }}>
              <Text>Friends</Text>
            </Pressable>
            <Pressable
              style={styles.buttonContainer1}
              onPress={() => {
                props.navigation.navigate('My Clubs');
              }}>
              <Text>My Clubs</Text>
            </Pressable>
            <Pressable
              style={styles.buttonContainer1}
              onPress={() => {
                props.navigation.navigate('My Followers');
              }}>
              <Text>My Followers</Text>
            </Pressable>
            <View
              style={{
                width: '100%',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: '10%',
              }}>
              <Pressable
                style={styles.buttonContainer}
                onPress={() => logout(props)}>
                <Text>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
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
    marginTop: 4,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 350,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  buttonContainer1: {
    height: 45,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    borderWidth: 0.1,
    width: '100%',

    elevation: 2,
  },
});

export default Profile;
