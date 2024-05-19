import React from 'react';
import {render} from '@testing-library/react-native';
import Text from '../src/components/atoms/Text';

describe('Text Component', () => {
  test('renders correctly with default styles', () => {
    const {getByText} = render(<Text>Default Text</Text>);

    const textElement = getByText('Default Text');

    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toMatchObject({
      color: '#252525',
      fontFamily: 'Poppins-Regular',
    });
  });

  test('merges additional styles correctly', () => {
    const additionalStyles = {fontSize: 20, fontWeight: 'bold'};
    const {getByText} = render(
      <Text style={additionalStyles}>Styled Text</Text>,
    );

    const textElement = getByText('Styled Text');

    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toMatchObject({
      color: '#252525',
      fontFamily: 'Poppins-Regular',
      fontSize: 20,
      fontWeight: 'bold',
    });
  });
});
