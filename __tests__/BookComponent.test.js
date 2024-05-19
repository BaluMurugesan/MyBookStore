import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import BookComponent from '../src/components/atoms/BookComponent';

const mockNavigate = jest.fn();
const mockNavigation = {navigate: mockNavigate};

describe('BookComponent', () => {
  const sampleData = {
    cover_i: 12345,
    title: 'Sample Book Title',
    author_name: ['Author One', 'Author Two'],
  };

  test('renders correctly', () => {
    const {getByText, getByTestId} = render(
      <BookComponent data={sampleData} navigation={mockNavigation} />,
    );

    expect(getByText('Sample Book Title')).toBeTruthy();
    expect(getByText('Author One,Author Two')).toBeTruthy();
    const image = getByTestId('book-cover-image');
    expect(image.props.source.uri).toBe(
      'https://covers.openlibrary.org/b/id/12345-L.jpg',
    );
  });

  test('navigates to ViewBook on press', () => {
    const {getByTestId} = render(
      <BookComponent data={sampleData} navigation={mockNavigation} />,
    );

    const touchable = getByTestId('book-cover-image').parent;
    fireEvent.press(touchable);

    expect(mockNavigate).toHaveBeenCalledWith('ViewBook', {
      bookData: sampleData,
      type: 'add',
      index: undefined,
    });
  });

  test('renders with custom type and index', () => {
    const {getByTestId} = render(
      <BookComponent
        data={sampleData}
        navigation={mockNavigation}
        type="edit"
        index={2}
      />,
    );

    const touchable = getByTestId('book-cover-image').parent;
    fireEvent.press(touchable);

    expect(mockNavigate).toHaveBeenCalledWith('ViewBook', {
      bookData: sampleData,
      type: 'edit',
      index: 2,
    });
  });
});
