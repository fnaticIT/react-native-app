import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
// import Video from 'react-native';
// import video from './video.mp4';
const Display = props => {
  const {name, role, desc, company_name} = props.route.params;
  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <View style={{marginHorizontal: 15, marginTop: 20, flex: 1}}>
      <Text
        style={{
          textTransform: 'capitalize',
          fontSize: 30,
          color: 'black',
        }}>
        {name}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 10,
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginBottom: 20,
          paddingBottom: 20,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
          {company_name} ,{' '}
        </Text>
        <Text style={{fontSize: 20, color: 'black', fontStyle: 'italic'}}>
          {role}
        </Text>
      </View>
      <ScrollView style={{marginBottom: 10}}>
        <Text style={{color: 'black', fontSize: 15}}>{desc}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Display;
