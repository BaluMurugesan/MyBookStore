import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const InputWithSearch = ({
  value = '',
  onChange = () => {},
  height = 40,
  keyboardType = 'default',
  onIconPress = () => {},
  secureTextEntry = false,
  placeholder = '',
  autoCapitalize = 'none',
  autoCorrect = false,
  style,
  handleSearchPress = () => {},
  ...props
}) => {
  const {width} = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      height: height,
      width: width - 70,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: '#462B1780',
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      height: height,
      color: '#000',
      width: width,
      paddingHorizontal: 10,
    },
    mainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput
          style={[styles.input, style]}
          onChangeText={onChange}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor="#462B1790"
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          autoComplete="off"
          {...props}
        />
      </View>
      <TouchableOpacity onPress={handleSearchPress}>
        <Icon name="search-circle" size={50} color="#ed5f64" />
      </TouchableOpacity>
    </View>
  );
};

export default InputWithSearch;
