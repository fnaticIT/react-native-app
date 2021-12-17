import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
const Imagez = () => {
  const [photo, setPhoto] = useState(
    'https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg',
  );

  const selectPhotoTapped = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      const uri = image.path;
      const type = image.mime;
      const name = image.filename;
      const source = {
        uri,
        type,
        name,
      };
      cloudinaryUpload(source);
    });
  };
  const cloudinaryUpload = photo => {
    console.log(photo.uri);
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'authdb');
    data.append('cloud_name', 'dr2gwffqb');
    fetch('https://api.cloudinary.com/v1_1/dr2gwffqb/image/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPhoto(data.url);
      })
      .catch(err => {
        Alert.alert('An Error Occured While Uploading');
      });
  };

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={{uri: photo}} style={styles.backgroundImage} />
      </View>
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadContainerTitle}>
          ImagePicker to Cloudinary
        </Text>
        <TouchableOpacity
          onPress={selectPhotoTapped}
          style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#fe5b29',
    height: Dimensions.get('window').height,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  uploadContainer: {
    backgroundColor: '#f6f5f8',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 200,
  },
  uploadContainerTitle: {
    alignSelf: 'center',
    fontSize: 25,
    margin: 20,
    fontFamily: 'Roboto',
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: '#fe5b29',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 20,
    fontFamily: 'Roboto',
  },
});
export default Imagez;
