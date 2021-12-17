import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Text} from 'react-native';
const Add = props => {
  const [name, setName] = useState('');
  const [companyname, setCompanyname] = useState('');
  const [role, setRole] = useState('');
  const [desc, setDesc] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');

  const getemail = async () => {
    try {
      const em = await AsyncStorage.getItem('email');
      setEmail(em);
    } catch (err) {}
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Add',
    });
    getemail();
  }, []);

  const handleClick = async e => {
    e.preventDefault();
    console.log(email);

    const exp = {
      userId: '111',
      name: name,
      company_name: companyname,
      role: role,
      desc: desc,
    };
    try {
      await axios.post('https://project-se-db.herokuapp.com/exp', exp);
      alert('Submitted successfully!');
      //window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 30,
          marginLeft: 18,
          marginTop: '6%',
          color: 'darkslateblue',
        }}>
        Share Your Experience
      </Text>
      <TextInput
        placeholder="Name"
        style={{
          marginLeft: 18,
          marginRight: 18,
          marginTop: 18,
          flex: 1,
          borderBottomWidth: 1,
          fontSize: 20,
        }}
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="Comapny Name"
        style={{
          marginLeft: 18,
          marginTop: 18,
          marginRight: 18,
          flex: 1,
          borderBottomWidth: 1,
          fontSize: 20,
        }}
        onChangeText={text => setCompanyname(text)}
        value={companyname}
      />
      <TextInput
        placeholder="Role"
        style={{
          marginLeft: 18,
          marginTop: 18,
          marginRight: 18,
          flex: 1,
          borderBottomWidth: 1,
          fontSize: 20,
        }}
        onChangeText={text => setRole(text)}
        value={role}
      />
      <TextInput
        multiline={true}
        placeholder="Description"
        style={{
          marginLeft: 18,
          marginTop: 18,
          marginRight: 18,
          flex: 1,
          borderBottomWidth: 1,
          fontSize: 20,
        }}
        onChangeText={text => setDesc(text)}
        value={desc}
        selectTextOnFocus={true}
      />
      <Button
        style={{
          marginLeft: 18,
          marginRight: 18,
          marginTop: 18,
          backgroundColor: '#ffb3b3',
          marginTop: 80,
        }}
        onPress={handleClick}>
        Submit
      </Button>
    </ScrollView>
  );
};

export default Add;
