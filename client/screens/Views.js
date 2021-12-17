import React, {useEffect, useState} from 'react';
import {Text, Modal, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import {Pressable} from 'react-native';
import {StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {FlatList} from 'react-native';

const Views = props => {
  const [list, setlist] = useState([]);

  const getlist = async () => {
    try {
      const users = await axios.get('https://project-se-db.herokuapp.com/exp/');
      setlist(users.data);
    } catch (err) {}
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'View',
      headerStyle: {
        backgroundColor: 'rgba(72,61,139,1)',
      },
      headerTitleStyle: {
        color: 'white',
      },
    });

    getlist();
  });
  return (
    <>
      <FlatList
        style={{backgroundColor: 'black', padding: 10, flex: 1}}
        keyExtractor={(item, index) => index.toString()}
        data={list}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              props.navigation.navigate('display', {
                name: item.name,
                role: item.role,
                desc: item.desc,
                company_name: item.company_name,
              });
            }}>
            <View style={styles.item}>
              <Text style={styles.text}>{item.name}</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={styles.text}>{item.company_name} ,</Text>
                <Text style={styles.text}>{item.role}</Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },

  item: {
    margin: 10,
    backgroundColor: 'darkslateblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 15,
  },
});
export default Views;
