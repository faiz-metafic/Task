import {render, fireEvent} from '@testing-library/react-native';
import InfoScreen from '.';

describe('Test cases for RawJSON Component', () => {
  it('renders correct asteroid information', () => {
    const asteroidData = {
      absolute_magnitude_h: 5.8,
      designation: 'ABC123',
      is_potentially_hazardous_asteroid: true,
      name: 'Asteroid 123',
      id: '123456789',
    };
    const navigation = {};
    const route = {params: {data: asteroidData}};
    const {getByText, getByTestId} = render(
      <InfoScreen navigation={navigation} route={route} />,
    );

    expect(getByText('Name :')).toBeTruthy();
    expect(getByTestId('Name')).toBeTruthy();
    expect(getByText('ID :')).toBeTruthy();
    expect(getByTestId('id')).toBeTruthy();
    expect(getByText('Absolute Magnitude :')).toBeTruthy();
    expect(getByTestId('magnitude')).toBeTruthy();
    expect(getByText('Designation :')).toBeTruthy();
    expect(getByTestId('designation')).toBeTruthy();
    expect(getByText('Is Potentially Hazardous :')).toBeTruthy();
    expect(getByTestId('hazardouse')).toBeTruthy();
  });

  it('back button press triggers navigation.goBack()', () => {
    const goBackMock = jest.fn();
    const navigation = {goBack: goBackMock};
    const route = {};
    const {getByTestId} = render(
      <InfoScreen navigation={navigation} route={route} />,
    );

    fireEvent.press(getByTestId('backButton'));

    expect(goBackMock).toHaveBeenCalled();
  });
});
