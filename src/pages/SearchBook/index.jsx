import React, {useEffect, useState} from 'react';
import Text from '../../components/atoms/Text';
import {FlatList, StyleSheet, View, useWindowDimensions} from 'react-native';
import InputWithSearch from '../../components/atoms/InputWithSearch';
import BookComponent from '../../components/atoms/BookComponent';
import {getBookDataByList} from '../../services/home';

const SearchBook = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [masterData, setMasterData] = useState([]);
  const {width} = useWindowDimensions();
  const getSearchBook = async val => {
    const {data} = await getBookDataByList(val);
    if (data?.docs?.length) {
      setMasterData(data.docs);
    } else {
      setMasterData([]);
    }
  };
  useEffect(() => {
    let search = setTimeout(() => {
      if (searchText.length) {
        getSearchBook(searchText);
      }
    }, 500);
    return () => {
      clearTimeout(search);
    };
  }, [searchText]);
  const renderBookData = ({item, index}) => {
    return (
      <View key={index + 1} style={{width: (width - 40) / 2}}>
        <BookComponent data={item} navigation={navigation} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <InputWithSearch
          placeholder="Search for book ..."
          onChange={val => {
            if (val) {
              setSearchText(val);
            } else {
              setSearchText(val);
              setMasterData([]);
              // getSearchBook('');
            }
          }}
          value={searchText}
          onIconPress={() => {
            getSearchBook(searchText);
          }}
        />
      </View>
      <View style={styles.flatContainer}>
        {Boolean(masterData?.length) && (
          <FlatList
            data={masterData}
            renderItem={renderBookData}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
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
  flatContainer: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default SearchBook;
