import React, {useEffect} from 'react';
import {Text, Pressable, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Interview = props => {
  useEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: 'rgba(72,61,139,1)',
      },
      headerTitleStyle: {
        color: 'white',
      },
    });
  }, []);
  return (
    <ScrollView style={{flex: 1,backgroundColor:"rgba(72,61,139,0.5)"}} contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Pressable
          style={[
            styles.box,
            {
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{rotate: '-20deg'}],
              borderColor: 'white',
              borderWidth: 4,
              backgroundColor: 'rgba(72,61,139,0.8)',
            },
          ]}
          onPress={() => {
            props.navigation.navigate('add');
          }}>
          <Text style={{color: 'white', fontStyle: 'italic', fontSize: 50}}>
            Add
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.box,
            {
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{rotate: '20deg'}],
              marginTop: 20,
              borderColor: 'white',
              borderWidth: 4,
              backgroundColor: 'rgba(72,61,139,0.9)',
            },
          ]}
          onPress={() => {
            props.navigation.navigate('view');
          }}>
          <Text style={{color: 'white', fontStyle: 'italic', fontSize: 50}}>
            View
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    display: 'flex',
    marginHorizontal: 25,
    flex: 1,
  },
  box: {
    borderWidth: 0,

    height: '42%',
    width: '85%',
    borderRadius: 15,
    elevation: 2,
    alignItems: 'center',
  },
});

export default Interview;
