import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {PureComponent, ReactPropTypes} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {ListStackParamList} from '../../utils/types';
import LocalImages from '../../utils/LocalImages';
import {vh, vw} from '../../utils/Dimensions';

interface State {}
type RawJSONScreenNavigationProp =
  NativeStackNavigationProp<ListStackParamList>;
type RawJSONScreenRoutes = RouteProp<ListStackParamList>;

interface Props extends ReactPropTypes {
  navigation: RawJSONScreenNavigationProp;
  route: RawJSONScreenRoutes;
}

export default class RawJSON extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  onBackPress = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <Pressable
          testID="backButton"
          style={styles.backButtonContainer}
          onPress={this.onBackPress}>
          <Image
            source={LocalImages.backButton}
            style={styles.backButton}
            resizeMode="contain"
          />
        </Pressable>
        <Text>{JSON.stringify(this.props.route?.params?.data)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flex: 1,
  },
  backButtonContainer: {
    height: vh(30),
    width: vw(25),
    marginVertical: vh(10),
    marginHorizontal: vw(10),
  },
  backButton: {
    height: '100%',
    width: '100%',
  },
});
