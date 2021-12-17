import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native-gesture-handler';
import {KeyboardAvoidingView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {TouchableHighlight} from 'react-native-gesture-handler';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
const Share = props => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState();
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
  const [desc, setDesc] = useState();
  const input = useRef();
  // const [file, setFile] = useState(null);

  const submitHandler = async () => {
    input.current.clear();
    setImage(null);
    const newPost = {
      userId: user._id,
      desc: desc,
      createdby: user.username,
      createdtype: user.isClub ? 'club' : 'none',
      img: image,
    };
    console.log('newPost ->', newPost);

    if (image) {
      try {
        await axios.post('https://project-se-db.herokuapp.com/upload', image);
      } catch (err) {}
    }

    // if (image) {
    //   const data = new FormData();
    //   const fileName = Date.now() + image;
    //   data.append('name', fileName);
    //   data.append('file', image);
    //   newPost.img = fileName;
    //   console.log(newPost);
    //   try {
    //     await axios.post('https://project-se-db.herokuapp.com/upload', data);
    //   } catch (err) {}
    // }

    try {
      await axios.post('https://project-se-db.herokuapp.com/posts', newPost);
    } catch (err) {}
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

  return user !== '' ? (
    <View style={{backgroundColor: 'darkslateblue', zIndex: -5, flex: 1}}>
      <ScrollView
        style={{
          elevation: 2,
          borderWidth: 0.1,
          padding: 10,
          margin: 10,
          height: '90%',
          backgroundColor: 'white',
        }}>
        <KeyboardAvoidingView behavior="">
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}>
            <View>
              <View>
                <View style={{margin: 20}}>
                  <Text
                    style={{
                      marginBottom: 30,
                      fontSize: 20,
                      color: 'darkslateblue',
                    }}>
                    Share Your Thoughts
                  </Text>

                  <TextInput
                    ref={input}
                    multiline
                    onChangeText={text => setDesc(text)}
                    style={{
                      color: 'white',
                      padding: 50,
                      fontSize: 20,
                      borderBottomColor: 'black',
                      backgroundColor: 'rgba(72,61,139,0.6)',
                      borderRadius: 10,
                    }}></TextInput>
                </View>
                <View style={{margin: 20}}>
                  <Text
                    style={{
                      marginBottom: 30,
                      fontSize: 20,
                      color: 'darkslateblue',
                    }}>
                    Choose a Photo
                  </Text>
                  <View>
                    <Button
                      mode="contained"
                      style={{
                        borderRadius: 10,
                        width: '50%',
                        backgroundColor: 'darkslateblue',
                      }}
                      onPress={() => {
                        on();
                      }}>
                      SELECT
                    </Button>
                    <ImageBackground
                      source={{
                        uri: image,
                      }}
                      style={{
                        height: 100,
                        width: 100,
                        marginTop: '-25%',
                        marginLeft: '60%',
                      }}
                      imageStyle={{borderRadius: 15}}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}></View>
                    </ImageBackground>
                    {image ? (
                      <Icon
                        name="circle-with-cross"
                        size={30}
                        onPress={() => {
                          setImage('');
                        }}
                        style={{left: 300, top: -50, position: 'absolute'}}
                      />
                    ) : (
                      <></>
                    )}
                  </View>
                  <Button
                    style={{
                      marginTop: '15%',
                      marginHorizontal: '10%',
                      opacity: 15,
                    }}
                    onPress={() => {
                      submitHandler();
                    }}>
                    <Text style={{fontSize: 16}}>SUBMIT</Text>
                  </Button>
                </View>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                width: 150,
                marginTop: '15%',
                alignSelf: 'flex-start',
                left: '-10%',
              }}>
              <View
                style={{
                  borderBottomWidth: 3,
                  borderBottomColor: 'pink',
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: 'darkslateblue',
                  height: 40,
                  transform: [{rotate: '20deg'}],
                }}></View>
              <View
                style={{
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: 'darkslateblue',
                  height: 40,
                  transform: [{rotate: '20deg'}],
                  marginBottom: '15%',
                }}></View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  ) : (
    <ActivityIndicator animating={true} color="blue" />
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
});

export default Share;

// import React, {useState} from 'react';
// import {View, Image, Button, Platform} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import ImageCropPicker from 'react-native-image-crop-picker';

// const SERVER_URL = 'http://localhost:3000';

// const Share = () => {
//   const [photo, setPhoto] = useState(null);

//   const handleChoosePhoto = () => {
//     // launchImageLibrary({noData: true}, response => {
//     //   // console.log(response);
//     //   if (response) {
//     //     setPhoto(response);
//     //   }
//     // });
//     ImageCropPicker.openPicker({
//       width: 300,
//       height: 400,
//       cropping: true,
//     }).then(image => {
//       console.log(image);
//     });
//   };

//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Button title="Choose Photo" onPress={handleChoosePhoto} />
//     </View>
//   );
// };

// export default Share;
// /*import React from 'react';
// import {View, StyleSheet} from 'react-native';

// const Share = () => {
//   return <View></View>;
// };

// const styles = StyleSheet.create({});

// export default Share;
// */
