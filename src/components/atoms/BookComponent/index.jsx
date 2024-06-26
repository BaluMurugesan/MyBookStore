import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from '../Text';

const BookComponent = ({data, navigation, type = 'add', index}) => {
  const styles = StyleSheet.create({
    image: {
      width: 130,
      aspectRatio: 1 / 1,
      borderRadius: 20,
      alignItems: 'center',
      elevation: 10,
      //   transform: [{rotate: '370deg'}],
    },
    title: {
      fontSize: 15,
      fontWeight: '500',
      marginTop: 10,
      color: '#80665d',
    },
    mainContainer: {
      marginBottom: 10,
    },
    authors: {
      color: '#ed5f64',
      fontSize: 13,
    },
  });
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        navigation.navigate('ViewBook', {
          bookData: data,
          type: type,
          index: index,
        });
      }}>
      <Image
        style={styles.image}
        source={{
          uri: `https://covers.openlibrary.org/b/id/${data.cover_i}-L.jpg`,
        }}
        resizeMode="contain"
        alt="Image"
        testID="book-cover-image"
      />
      <Text style={styles.title} numberOfLines={2}>
        {data?.title}
      </Text>
      <Text numberOfLines={2} style={styles.authors}>
        {data?.author_name?.join(',')}
      </Text>
    </TouchableOpacity>
  );
};

export default BookComponent;
