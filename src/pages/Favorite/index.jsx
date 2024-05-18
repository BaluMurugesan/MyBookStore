import React, {useContext} from 'react';
import Text from '../../components/atoms/Text';
import {ArrayContext} from '../../context/ArrayContext';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import BookComponent from '../../components/atoms/BookComponent';
import Icon from 'react-native-vector-icons/Ionicons';

const Favorite = ({navigation}) => {
  const {dataArray, removeItem} = useContext(ArrayContext);
  const {width} = useWindowDimensions();
  const renderBookData = ({item, index}) => {
    return (
      <View key={index + 1} style={{width: (width - 40) / 2}}>
        <BookComponent
          data={item}
          navigation={navigation}
          type="remove"
          index={index}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.rowCenter}>
          <Icon name="arrow-back-circle-outline" size={30} color="#ed5f64" />
          <Text style={styles.header}>Favorite List</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        {Boolean(dataArray?.length) ? (
          <FlatList
            data={dataArray}
            renderItem={renderBookData}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150570252.jpg?t=st=1716044920~exp=1716048520~hmac=54066539fa85b83f12c1d6ac2e4ca738f61178cdc0890c200ec40ec1134f1b8b&w=826',
              }}
              style={{
                height: 300,
                aspectRatio: 1 / 1,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  main: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Favorite;
