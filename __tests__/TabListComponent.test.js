import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TabListComponent from '../src/components/atoms/TabListComponent';

describe('TabListComponent', () => {
  const sampleList = [
    {id: '1', title: 'Tab 1', imageUrl: 'https://example.com/image1.jpg'},
    {id: '2', title: 'Tab 2', imageUrl: 'https://example.com/image2.jpg'},
  ];

  test('renders correctly with the list of items', () => {
    const {getByText} = render(<TabListComponent list={sampleList} />);

    expect(getByText('Tab 1')).toBeTruthy();
    expect(getByText('Tab 2')).toBeTruthy();
  });

  test('selects the default tab correctly', () => {
    const defaultSelected = {id: '2'};
    const {getByText} = render(
      <TabListComponent list={sampleList} defaultSelected={defaultSelected} />,
    );

    const selectedTab = getByText('Tab 2');
    const selectedTabStyles = selectedTab.props.style;
    const selectedColorStyle = selectedTabStyles && selectedTabStyles.color;

    expect(selectedColorStyle).toBe('#ed5f64');
  });

  test('calls onTabPress when a tab is pressed', () => {
    const handleTabPress = jest.fn();
    const {getByText} = render(
      <TabListComponent list={sampleList} onTabPress={handleTabPress} />,
    );

    const tabToPress = getByText('Tab 2');
    fireEvent.press(tabToPress);

    expect(handleTabPress).toHaveBeenCalledWith(sampleList[1]);
  });

  test('applies active and inactive styles correctly', () => {
    const {getByText} = render(<TabListComponent list={sampleList} />);

    const activeTab = getByText('Tab 1');
    const inactiveTab = getByText('Tab 2');

    const activeTabStyles = activeTab.props.style;
    const inactiveTabStyles = inactiveTab.props.style;

    const activeColorStyle = activeTabStyles && activeTabStyles.color;
    const inactiveColorStyle = inactiveTabStyles && inactiveTabStyles.color;

    expect(activeColorStyle).toBe('#ed5f64');
    expect(inactiveColorStyle).not.toBe('#ed5f64');
  });

  test('changes the selected tab on press', () => {
    const {getByText} = render(<TabListComponent list={sampleList} />);

    const tab1 = getByText('Tab 1');
    const tab2 = getByText('Tab 2');

    // Initial state
    const tab1InitialStyles = tab1.props.style;
    const tab2InitialStyles = tab2.props.style;

    const tab1InitialColorStyle = tab1InitialStyles && tab1InitialStyles.color;
    const tab2InitialColorStyle = tab2InitialStyles && tab2InitialStyles.color;

    expect(tab1InitialColorStyle).toBe('#ed5f64');
    expect(tab2InitialColorStyle).not.toBe('#ed5f64');

    // Press Tab 2
    fireEvent.press(tab2);

    // After pressing Tab 2
    const tab1NewStyles = tab1.props.style;
    const tab2NewStyles = tab2.props.style;

    const tab1NewColorStyle = tab1NewStyles && tab1NewStyles.color;
    const tab2NewColorStyle = tab2NewStyles && tab2NewStyles.color;

    expect(tab1NewColorStyle).not.toBe('#ed5f64');
    expect(tab2NewColorStyle).toBe('#ed5f64');
  });
});
