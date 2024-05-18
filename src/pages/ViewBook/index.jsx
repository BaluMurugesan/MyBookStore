import React from 'react';
import Text from '../../components/atoms/Text';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontisto from 'react-native-vector-icons/MaterialIcons';

const ViewBook = ({navigation, route}) => {
  const {bookData} = route.params;
  const {width} = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spacebetween: {
      justifyContent: 'space-between',
    },
    backText: {
      marginLeft: 5,
      fontWeight: '900',
    },
    bottomConatiner: {
      height: '60%',
      backgroundColor: '#fff',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    topConatiner: {
      height: '41%',
    },
    image: {
      height: '90%',
      aspectRatio: 1 / 1,
      borderRadius: 20,
      elevation: 10,
    },
    center: {
      justifyContent: 'center',
    },
    headerText: {
      color: '#462B17',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 24,
      marginTop: 15,
    },
    content: {
      color: '#838594',
      marginTop: 10,
      textAlign: 'center',
      paddingHorizontal: 10,
      lineHeight: 26,
    },
    authors: {
      color: '#ed5f64',
      fontSize: 13,
    },
    headerAuthors: {
      fontSize: 15,
    },
    box: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: StyleSheet.hairlineWidth,
      padding: 5,
      marginTop: 10,
    },
    subBox: {
      alignItems: 'center',
      flex: 1,
      borderRightWidth: StyleSheet.hairlineWidth,
    },
    lastBox: {
      alignItems: 'center',
      flex: 1,
    },
    btn: {
      backgroundColor: '#ed5f64',
      width: width - 40,
      padding: 10,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    btnText: {
      color: '#fff',
      fontSize: 17,
      fontWeight: 'bold',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.topConatiner}>
        <View style={[styles.rowCenter, styles.spacebetween]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.rowCenter}>
            <Icon name="arrow-back-circle-outline" size={30} color="#ed5f64" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <IconFontisto name="favorite-outline" size={30} color="#ed5f64" />
          </TouchableOpacity>
        </View>
        <View style={[styles.rowCenter, styles.center]}>
          <Image
            style={styles.image}
            source={{
              uri: bookData.volumeInfo.imageLinks.thumbnail,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.bottomConatiner}>
        <ScrollView contentContainerStyle={{padding: 10}}>
          <Text style={styles.headerText}>{bookData.volumeInfo.title}</Text>
          <Text>
            <Text style={styles.headerAuthors}>Authors : </Text>
            <Text numberOfLines={2} style={styles.authors}>
              {bookData?.volumeInfo?.authors?.join(',')}
            </Text>
          </Text>
          <View style={styles.box}>
            <View style={styles.subBox}>
              <Text>{bookData.volumeInfo.pageCount}</Text>
              <Text>Pages</Text>
            </View>
            <View style={styles.subBox}>
              <View style={styles.rowCenter}>
                <Icon name="star" size={15} color="#ffc635" />
                <Text>{bookData.volumeInfo.averageRating}</Text>
              </View>
              <Text>Rating</Text>
            </View>
            <View style={styles.lastBox}>
              <Text>{bookData.volumeInfo.ratingsCount}</Text>
              <Text>Ratings Count</Text>
            </View>
          </View>
          <Text style={styles.content}>{bookData.volumeInfo.description}</Text>
        </ScrollView>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Add to Favorite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewBook;
