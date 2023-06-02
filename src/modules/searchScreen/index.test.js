import {render, fireEvent, act} from '@testing-library/react-native';
import SearchScreen from '.';
import {Alert} from 'react-native';
import Strings from '../../utils/Strings';
import {getAstroidData} from './action';
import {getRandomAstroid} from './action';

jest.mock('./action');

describe('Search Screen', () => {
  it('renders the component without errors', () => {
    const navigationMock = {navigate: jest.fn()};
    render(<SearchScreen navigation={navigationMock} />);
  });

  it('disables the search button when the input is empty', async () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByPlaceholderText, getByTestId} = render(
      <SearchScreen navigation={navigationMock} />,
    );
    const input = getByPlaceholderText(Strings.enterId);
    const searchButton = getByTestId('searchButton');

    expect(searchButton.props.accessibilityState.disabled).toBe(true);

    fireEvent.changeText(input, '21312');

    expect(searchButton.props.accessibilityState.disabled).toBe(false);
  });

  it('navigates to InfoScreen on successful search', async () => {
    const navigateMock = jest.fn();
    const navigationMock = {navigate: navigateMock};
    const {getByPlaceholderText, getByTestId} = render(
      <SearchScreen navigation={navigationMock} />,
    );
    const input = getByPlaceholderText(Strings.enterId);
    const searchButton = getByTestId('searchButton');
    const responseData = {name: 'Astroid 123'};

    getAstroidData.mockImplementationOnce((id, successCallback) => {
      successCallback(responseData);
    });

    fireEvent.changeText(input, '123');
    fireEvent.press(searchButton);

    expect(getAstroidData).toHaveBeenCalledWith(
      '123',
      expect.any(Function),
      expect.any(Function),
    );

    expect(navigateMock).toHaveBeenCalledWith('InfoScreen', {
      data: responseData,
    });
  });

  it('shows an alert on search failure', async () => {
    const alertMock = jest.spyOn(Alert, 'alert');
    const {getByPlaceholderText, getByTestId} = render(<SearchScreen />);
    const input = getByPlaceholderText(Strings.enterId);
    const searchButton = getByTestId('searchButton');

    getAstroidData.mockImplementationOnce(
      (id, successCallback, failureCallback) => {
        failureCallback();
      },
    );

    fireEvent.changeText(input, '123');
    fireEvent.press(searchButton);

    expect(getAstroidData).toHaveBeenCalledWith(
      '123',
      expect.any(Function),
      expect.any(Function),
    );

    expect(alertMock).toHaveBeenCalledWith(
      'OOPS',
      'Astroid with id 123 not Found',
    );

    alertMock.mockRestore();
  });

  it('navigates to InfoScreen on random astroid press', async () => {
    const navigateMock = jest.fn();
    const navigationMock = {navigate: navigateMock};
    const {getByTestId} = render(<SearchScreen navigation={navigationMock} />);
    const randomButton = getByTestId('randomButton');
    const responseData = {name: 'Random Astroid'};

    getRandomAstroid.mockImplementationOnce(successCallback => {
      successCallback(responseData);
    });

    fireEvent.press(randomButton);

    expect(getRandomAstroid).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
    );

    expect(navigateMock).toHaveBeenCalledWith('InfoScreen', {
      data: responseData,
    });
  });

  it('shows an alert on random astroid press failure', async () => {
    const alertMock = jest.spyOn(Alert, 'alert');
    const {getByTestId} = render(<SearchScreen />);
    const randomButton = getByTestId('randomButton');

    getRandomAstroid.mockImplementationOnce(
      (successCallback, failureCallback) => {
        failureCallback();
      },
    );

    fireEvent.press(randomButton);

    await act(async () => {
      expect(getRandomAstroid).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
      );

      expect(alertMock).toHaveBeenCalledWith('Something Went Wrong');
    });

    alertMock.mockRestore();
  });
});
