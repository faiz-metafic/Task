import React, {PureComponent} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Wrapper from '../../components/wrapperComponent';
import styles from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoginStackParamList} from '../../utils/types';
import {RouteProp} from '@react-navigation/native';
import LocalImages from '../../utils/LocalImages';

type InfoScreenNavigationProp = NativeStackNavigationProp<LoginStackParamList>;
type InfoScreenRoutes = RouteProp<LoginStackParamList>;

interface Props {
  navigation: InfoScreenNavigationProp;
  route: InfoScreenRoutes;
}
export default class InfoScreen extends PureComponent<Props> {
  constructor(props: any) {
    super(props);
  }

  onBackPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    const params: any = this.props.route.params;

    return (
      <Wrapper containerStyle={styles.wrappercontainer}>
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
          <View style={styles.innerContainer}>
            <View style={styles.lineContainer}>
              <Text style={styles.lineKey}>{'Name :'}</Text>
              <Text testID="Name" style={styles.lineValue}>
                {params?.data?.name}
              </Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.lineKey}>{'ID :'}</Text>
              <Text testID="id" style={styles.lineValue}>
                {params?.data?.id}
              </Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.lineKey}>{'Absolute Magnitude :'}</Text>
              <Text testID="magnitude" style={styles.lineValue}>
                {params?.data?.absolute_magnitude_h}
              </Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.lineKey}>{'Designation :'}</Text>
              <Text testID="designation" style={styles.lineValue}>
                {params?.data?.designation}
              </Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.lineKey}>{'Is Potentially Hazardous :'}</Text>
              <Text testID="hazardouse" style={styles.lineValue}>
                {params?.data?.is_potentially_hazardous_asteroid ? 'YES' : 'No'}
              </Text>
            </View>
          </View>
        </View>
      </Wrapper>
    );
  }
}
