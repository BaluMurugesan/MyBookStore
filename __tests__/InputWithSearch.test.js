import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import InputWithSearch from '../src/components/atoms/InputWithSearch';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

describe('InputWithSearch Component', () => {
  test('renders correctly with default props', () => {
    const {getByPlaceholderText} = render(
      <InputWithSearch placeholder="Search" />,
    );

    expect(getByPlaceholderText('Search')).toBeTruthy();
  });

  test('calls onChange when text is entered', () => {
    const handleChange = jest.fn();
    const {getByPlaceholderText} = render(
      <InputWithSearch onChange={handleChange} placeholder="Search" />,
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'new text');

    expect(handleChange).toHaveBeenCalledWith('new text');
  });

  test('calls handleSearchPress when search icon is pressed', () => {
    const handleSearchPress = jest.fn();
    const {getByTestId} = render(
      <InputWithSearch
        handleSearchPress={handleSearchPress}
        placeholder="Search"
      />,
    );

    const searchIcon = getByTestId('search-icon');
    fireEvent.press(searchIcon);

    expect(handleSearchPress).toHaveBeenCalled();
  });

  test('applies custom styles correctly', () => {
    const customStyle = {backgroundColor: 'yellow'};
    const {getByPlaceholderText} = render(
      <InputWithSearch style={customStyle} placeholder="Search" />,
    );

    const input = getByPlaceholderText('Search');
    expect(input.props.style).toContainEqual(customStyle);
  });

  test('renders with secureTextEntry', () => {
    const {getByPlaceholderText} = render(
      <InputWithSearch secureTextEntry placeholder="Password" />,
    );

    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(true);
  });
});
