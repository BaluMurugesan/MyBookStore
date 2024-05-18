import {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../Text';

const TabListComponent = ({
  onTabPress = () => {},
  list = [], //[{id:1,title:""}]
  defaultSelected = null,
  itemStyle = {},
}) => {
  const [selectedTab, setSelectedTab] = useState(null);
  const flatListRef = useRef();
  useEffect(() => {
    if (list?.length) {
      if (
        defaultSelected &&
        list.find(item => item.id === defaultSelected.id)
      ) {
        setSelectedTab(defaultSelected.id);
      } else {
        setSelectedTab(list[0]?.id);
      }
    }
  }, [list, defaultSelected]);
  const styles = StyleSheet.create({
    tabStyle: {
      // width: 150,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 25,
      // marginRight: 5,
      paddingHorizontal: 15,
      paddingVertical: 3,
    },
    activeTabStyle: {
      borderBottomWidth: 2,
      borderBottomColor: '#ed5f64',
      lineHeight: 15,
    },
    inActiveTabStyle: {
      lineHeight: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#CAB097',
    },
    image: {
      height: 50,
      width: 50,
      borderRadius: 10,
    },
  });
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.tabStyle,
        selectedTab === item.id
          ? styles.activeTabStyle
          : styles.inActiveTabStyle,
        itemStyle,
      ]}
      onPress={() => {
        onTabPress(item);
        setSelectedTab(item.id);
      }}>
      <Image source={{uri: item?.imageUrl}} style={styles.image} />
      <Text
        style={{
          fontFamily:
            selectedTab === item.id ? 'Poppins-Bold' : 'Poppins-Regular',
          ...(selectedTab == item.id && {
            color: '#ed5f64',
          }),
          fontSize: 12,
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        marginBottom: 5,
      }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        ref={flatListRef}
        getItemLayout={(data, index) => {
          return {length: 150, offset: 150 * index, index};
        }}
      />
    </View>
  );
};

export default TabListComponent;
