import React, {useContext, useEffect, useState} from 'react';
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
import {ArrayContext} from '../../context/ArrayContext';
import {getDescription} from '../../services/home';

const ViewBook = ({navigation, route}) => {
  const {bookData, type, index} = route.params;
  const {width} = useWindowDimensions();
  const [description, setDescription] = useState('');
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
    btncenter: {
      alignItems: 'center',
    },
  });
  const {addItem, removeItem} = useContext(ArrayContext);

  const handleBtnPress = () => {
    if (type == 'remove') {
      removeItem(index);
    } else {
      addItem(bookData);
    }
    navigation.goBack();
  };
  const getDescriptionsData = async () => {
    if (bookData?.key) {
      const id = bookData?.key?.split('/')[2].toString();
      if (id) {
        const {data} = await getDescription(id);
        if (data) {
          if (typeof data.description == 'string') {
            setDescription(data.description);
          } else {
            setDescription(
              data?.description?.value ? data?.description?.value : '',
            );
          }
        }
      }
    }
  };
  useEffect(() => {
    getDescriptionsData();
  }, [bookData]);
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
        </View>
        <View style={[styles.rowCenter, styles.center]}>
          <Image
            style={styles.image}
            source={{
              uri: `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg`,
            }}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.bottomConatiner}>
        <ScrollView contentContainerStyle={{padding: 10}}>
          <Text style={styles.headerText}>{bookData?.title}</Text>
          <Text>
            <Text style={styles.headerAuthors}>Authors : </Text>
            <Text numberOfLines={2} style={styles.authors}>
              {bookData?.author_name?.join(',')}
            </Text>
          </Text>
          <View style={styles.box}>
            <View style={styles.subBox}>
              <Text>{bookData?.number_of_pages_median}</Text>
              <Text>Pages</Text>
            </View>
            <View style={styles.subBox}>
              <View style={styles.rowCenter}>
                <Icon name="star" size={15} color="#ffc635" />
                <Text>{bookData?.ratings_average}</Text>
              </View>
              <Text>Rating</Text>
            </View>
            <View style={styles.lastBox}>
              <Text>{bookData?.ratings_count}</Text>
              <Text>Ratings Count</Text>
            </View>
          </View>
          <Text style={styles.content}>{description.toString()}</Text>
        </ScrollView>
        <View style={styles.btncenter}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              handleBtnPress();
            }}>
            <Text style={styles.btnText}>
              {type == 'remove' ? 'Remove from favorite' : 'Add to favorite'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ViewBook;
