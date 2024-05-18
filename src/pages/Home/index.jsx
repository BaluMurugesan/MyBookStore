import React, {useEffect, useState} from 'react';
import Text from '../../components/atoms/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import InputWithSearch from '../../components/atoms/InputWithSearch';
import TabListComponent from '../../components/atoms/TabListComponent';
import {getBookDataByList} from '../../services/home';
import BookComponent from '../../components/atoms/BookComponent';

const tabList = [
  {
    id: 1,
    title: 'Harry Potter',
    imageUrl:
      'https://img.freepik.com/free-vector/lovely-witch-with-hand-drawn-style_23-2147693061.jpg?t=st=1716025864~exp=1716029464~hmac=4fc380453aa085972bbb7d2351eecd9e07928cf90dd9228db2edfb8b8e2351f3&w=740',
  },
  {
    id: 2,
    title: 'Flowers',
    imageUrl:
      'https://img.freepik.com/premium-photo/there-is-bouquet-flowers-sitting-top-book-generative-ai_900833-73976.jpg?w=740',
  },
  {
    id: 3,
    title: 'Mathematics',
    imageUrl:
      'https://img.freepik.com/free-vector/mathematics-concept-illustration_114360-3972.jpg?t=st=1716026277~exp=1716029877~hmac=9fff71673a3247ed925537df8fc20dcb838018386edd94fba41d0cce66791f3b&w=740',
  },
  {
    id: 4,
    title: 'Software',
    imageUrl:
      'https://img.freepik.com/free-vector/engineer-developer-with-laptop-tablet-code-cross-platform-development-cross-platform-operating-systems-software-environments-concept-bright-vibrant-violet-isolated-illustration_335657-312.jpg?t=st=1716026372~exp=1716029972~hmac=02421351920d79ef2409aa87753b507699678ddc755003f651a9677d60cec763&w=826',
  },
  {
    id: 5,
    title: 'Money',
    imageUrl:
      'https://img.freepik.com/free-vector/indian-rupee-money-bag_23-2147998532.jpg?t=st=1716026473~exp=1716030073~hmac=dd051c3561548b01cb7a9fd32544b7ee425e0725092190fde4cdf04eeee2ddd5&w=740',
  },
  {
    id: 6,
    title: 'World',
    imageUrl:
      'https://img.freepik.com/free-photo/full-shot-woman-travel-concept_23-2149153259.jpg?t=st=1716026534~exp=1716030134~hmac=b8d6db1f07684ea6b823b6ca91e893164f8efd9a8b7ffad4338aa121316a3de3&w=740',
  },
];

const Home = ({navigation}) => {
  const {width} = useWindowDimensions();
  const [masterData, setMasterData] = useState([]);
  const [selectedTab, setSelectedTab] = useState({
    id: 1,
    title: 'Harry Potter',
    imageUrl:
      'https://img.freepik.com/free-vector/lovely-witch-with-hand-drawn-style_23-2147693061.jpg?t=st=1716025864~exp=1716029464~hmac=4fc380453aa085972bbb7d2351eecd9e07928cf90dd9228db2edfb8b8e2351f3&w=740',
  });
  const getListData = async () => {
    const {data} = await getBookDataByList(selectedTab?.title);
    if (data?.items?.length) {
      setMasterData(data.items);
    } else {
      setMasterData([]);
    }
  };
  useEffect(() => {
    if (selectedTab?.title) {
      getListData();
    }
    return () => {
      setMasterData([]);
    };
  }, [selectedTab]);
  const renderBookData = ({item, index}) => {
    return (
      <View key={index + 1} style={{width: (width - 40) / 2}}>
        <BookComponent data={item} navigation={navigation} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={[styles.userContainer, styles.mainContainer]}>
        <View style={styles.userContainer}>
          <Image
            source={{
              uri: 'https://cdn.dribbble.com/users/1675913/avatars/small/2bbe514fc75d8e8dc07cd216db56ecc0.jpeg?1644577548',
            }}
            style={styles.userImage}
          />
          <Text style={styles.userName}>Hi,Balu</Text>
        </View>
        <View>
          <Icon name="log-out-outline" size={30} color="#ed5f64" />
        </View>
      </View>
      <View style={styles.popular}>
        <Text style={styles.popularText}>Popular Book Lists</Text>
        <TabListComponent
          list={tabList}
          onTabPress={val => {
            setSelectedTab(val);
          }}
        />
      </View>
      <View style={styles.flatContainer}>
        {masterData && (
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
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  userName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {
    justifyContent: 'space-between',
  },
  popular: {
    marginTop: 10,
  },
  popularText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flatContainer: {
    flex: 1,
  },
});

export default Home;
