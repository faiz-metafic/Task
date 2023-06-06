import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import RawJSON from '.';

describe('RawJSON component', () => {
  it('renders the JSON data correctly', () => {
    const data = {foo: 'bar'};
    const route = {params: {data}};
    const navigation = {};

    const {getByText} = render(
      <RawJSON navigation={navigation} route={route} />,
    );

    const jsonDataElement = getByText(JSON.stringify(data));
    expect(jsonDataElement).toBeDefined();
  });

  it('back button press triggers navigation.goBack()', () => {
    const navigation = {
      goBack: jest.fn(),
    };

    const {getByTestId} = render(<RawJSON navigation={navigation} />);

    const backButton = getByTestId('backButton');

    fireEvent.press(backButton);

    expect(navigation.goBack).toBeCalled();
  });
});
