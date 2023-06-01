import React, {Component} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomTextInput from '../../components/customTextInput/customTextInput';
import Wrapper from '../../components/wrapperComponent';
import styles from './styles';
import {LoginStackParamList} from '../../utils/types';
import Strings from '../../utils/Strings';
import Colors from '../../utils/Colors';
import {Alert, View} from 'react-native';
import CustomButton from '../../components/customButton';
import axios from 'axios';
import Loader from '../../components/loader';
import ScreenNames from '../../utils/ScreenNames';

type SearchScreenNavigationProp =
  NativeStackNavigationProp<LoginStackParamList>;

interface State {
  searchValue: string;
  loading: boolean;
}
interface Props {
  navigation: SearchScreenNavigationProp;
}

const apiKey = 'MSWldKcAiRtZK54zep5TMwddoF1BhaJwoofH2Ttl';

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

  onSearchPress = async () => {
    try {
      this.setState({loading: true});
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${this.state.searchValue}?api_key=${apiKey}`,
      );
      this.setState({loading: false, searchValue: ''});
      this.props.navigation.navigate(ScreenNames.infoScreen, {
        data: response?.data,
      });
    } catch (error) {
      this.setState({loading: false});
      Alert.alert(
        'OOPS',
        `Astroid with id ${this.state.searchValue} not Found`,
      );
    }
  };

  onRandomPress = async () => {
    try {
      this.setState({loading: true});
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`,
      );
      let randomNumber = Math.floor(Math.random() * 20);
      this.setState({loading: false, searchValue: ''});
      this.props.navigation.navigate(ScreenNames.infoScreen, {
        data: response?.data?.near_earth_objects[randomNumber],
      });
    } catch (error) {
      this.setState({loading: false});
      Alert.alert('Something Went Wrong');
    }
  };

  render() {
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
            title={Strings.search}
            onPress={this.onSearchPress}
            disabled={this.state.searchValue === ''}
            textStyle={styles.buttonTextColor}
            containerStyle={styles.buttonContainer}
          />
          <CustomButton
            title={Strings.random}
            onPress={this.onRandomPress}
            textStyle={styles.randombuttonTextColor}
            containerStyle={styles.randomButtonContainer}
          />
          {this.state.loading && <Loader />}
        </View>
      </Wrapper>
    );
  }
}
