import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

const Search = props => {
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const getlist = async () => {
    try {
      const users = await axios.get(
        'https://project-se-db.herokuapp.com/users/users',
      );
      setFilteredDataSource(users.data);
      setMasterDataSource(users.data);
    } catch (err) {}
  };

  useEffect(() => {
    getlist();

    props.navigation.setOptions({
      headerTitle: 'Home',
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
  }, []);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.username
          ? item.username.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item

      <Text style={styles.itemStyle} onPress={() => getItem(item.email)}>
        {item.username.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = useremail => {
    props.navigation.navigate('user', {
      email: useremail,
    });
  };

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />
      <ScrollView style={{marginHorizontal: 6, marginTop: 40}}>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1.6,
    margin: 1,
    color: 'white',
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: 'gray',
    color: 'white',
  },
});

export default Search;
