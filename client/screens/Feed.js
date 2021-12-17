import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Text, FlatList, RefreshControl} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'timeago.js';
import {ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import I from 'react-native-vector-icons/Fontisto';
import {TextInput} from 'react-native-paper';
import Button from 'react-native-paper';
const Feed = props => {
  //const [posts, setPosts] = useState([]);
  const [allposts, allsetPosts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [cclass, setClass] = useState('displayc');
  const [cmt, setcmt] = useState([]);
  const [d, setd] = useState([]);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const desc = useRef();
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
    const fetchPosts = async () => {
      console.log('fetch');
      const res = await axios.get(
        'https://project-se-db.herokuapp.com/posts/posts/all',
      );
      allsetPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }),
      );
    };
    fetchPosts();
  }, []);
  const fetch = async () => {
    setToggle(true);
    console.log('fetch');
    const res = await axios.get(
      'https://project-se-db.herokuapp.com/posts/posts/all',
    );
    allsetPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }),
    );
    setTimeout(() => {
      setToggle(false);
    }, 2000);
  };
  const handledelete = post => {
    console.log('delete');
    try {
      axios.delete(
        'https://project-se-db.herokuapp.com/posts/' + post._id,
        post,
      );
    } catch (err) {}
    // setToggle(true);

    setTimeout(() => {
      fetch();
    }, 2000);

    console.log('toggle', toggle);
  };
  function f(cmt) {
    const r = cmt;
    r.reverse();
    const r1 = r.slice(0, 1);
    setd(r1);
    setNaman(5);
  }

  const getComments = async () => {
    try {
      const friendList = await axios.get(
        'https://project-se-db.herokuapp.com/posts/comments/' + post._id,
      );

      setcmt(friendList.data);
      f(friendList.data);
    } catch (err) {
      console.log(err);
    }
  };
  function handlec() {
    const rev = cmt;

    const cmts = rev.slice(0, naman);
    setd(cmts);
    setNaman(naman + 5);
  }

  const handleClick = async e => {
    e.preventDefault();
    const newComment = {
      desc: desc.current.value,
    };

    try {
      await axios
        .put(
          'https://project-se-db.herokuapp.com/posts/comments/' + post._id,
          newComment,
        )
        .then(() => {
          getComments();
          const f = document.getElementById('ff');
          f.reset();
        });
    } catch (err) {}
  };

  function handle() {
    if (cclass === '') {
      setClass('displayc');
    } else {
      setClass('');
    }
  }
  return (
    <View style={{backgroundColor: '', flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={toggle} onRefresh={fetch} />
        }
        keyExtractor={(item, index) => index.toString()}
        data={allposts}
        extraData={toggle}
        renderItem={({item}) => (
          <View
            style={{
              margin: 2,
              padding: 10,
              borderWidth: 1,
              backgroundColor: 'rgba(72,61,139,0.95)',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>
                {item.createdby}
              </Text>
              <Text style={{fontSize: 15, color: 'white'}}>
                {format(item.createdAt)}
              </Text>
            </View>
            {item.img ? (
              <ImageBackground
                source={{
                  uri: item.img,
                }}
                style={{
                  width: '100%',
                  height: 200,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: 'white',
                }}
              />
            ) : (
              <Text></Text>
            )}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                marginTop: '7%',
              }}>
              {item.userId === user._id ? (
                <Icon
                  style={{alignSelf: 'flex-start'}}
                  name="delete"
                  size={30}
                  color="pink"
                  onPress={() => {
                    handledelete(item);
                  }}></Icon>
              ) : (
                <Text></Text>
              )}
              <I
                style={{alignSelf: 'flex-start'}}
                name="comment"
                size={25}
                color="pink"
                onPress={handle}></I>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Feed;
