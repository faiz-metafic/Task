import React, {Component} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomTextInput from '../../components/customTextInput/customTextInput';
import Wrapper from '../../components/wrapperComponent';
import styles from './styles';
import {LoginStackParamList} from '../../utils/types';
import Strings from '../../utils/Strings';
import Colors from '../../utils/Colors';
import {Alert, Pressable, TouchableOpacity, View} from 'react-native';
import CustomButton from '../../components/customButton';
import Loader from '../../components/loader';
import ScreenNames from '../../utils/ScreenNames';
import {getAstroidData, getRandomAstroid} from './action';

type SearchScreenNavigationProp =
  NativeStackNavigationProp<LoginStackParamList>;

interface State {
  searchValue: string;
  loading: boolean;
}
interface Props {
  navigation: SearchScreenNavigationProp;
}

export default class SearchScreen extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      searchValue: '',
      loading: false,
    };
  }

  onChangeText = (text: string) => {
    this.setState({searchValue: text});
  };

  onSearchPress = () => {
    this.setState({loading: true});
    getAstroidData(
      this.state.searchValue,
      (data: any) => {
        this.setState({loading: false, searchValue: ''});
        this.props.navigation.navigate(ScreenNames.infoScreen, {
          data,
        });
      },
      () => {
        this.setState({loading: false});
        Alert.alert(
          'OOPS',
          `Astroid with id ${this.state.searchValue} not Found`,
        );
      },
    );
  };

  onRandomPress = () => {
    this.setState({loading: true});
    getRandomAstroid(
      (data: any) => {
        this.setState({loading: false, searchValue: ''});
        this.props.navigation.navigate(ScreenNames.infoScreen, {
          data,
        });
      },
      () => {
        this.setState({loading: false});
        Alert.alert('Something Went Wrong');
      },
    );
  };

  render() {
    let loader = null;
    if (this.state.loading) {
      loader = <Loader testID={'Loader'} />;
    }
    return (
      <Wrapper>
        <View style={styles.container}>
          <CustomTextInput
            placeholder={Strings.enterId}
            containerStyle={styles.inputContainer}
            placeholderTextColor={Colors.black}
            value={this.state.searchValue}
            onChangeText={this.onChangeText}
          />
          <CustomButton
            testID={'searchButton'}
            title={Strings.search}
            onPress={this.onSearchPress}
            disabled={this.state.searchValue === ''}
            textStyle={styles.buttonTextColor}
            containerStyle={styles.buttonContainer}
          />
          <CustomButton
            testID={'randomButton'}
            title={Strings.random}
            onPress={this.onRandomPress}
            textStyle={styles.randombuttonTextColor}
            containerStyle={styles.randomButtonContainer}
          />
          {loader}
        </View>
      </Wrapper>
    );
  }
}
