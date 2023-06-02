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
    const {
      absolute_magnitude_h,
      designation,
      is_potentially_hazardous_asteroid,
      name,
      id,
    } = params?.data;
    return (
      <Wrapper containerStyle={styles.wrappercontainer}>
        <View style={styles.container}>
          <Pressable
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
              <Text style={styles.lineValue}>{name}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.lineKey}>{'ID :'}</Text>
              <Text style={styles.lineValue}>{id}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.lineKey}>{'Absolute Magnitude :'}</Text>
              <Text style={styles.lineValue}>{absolute_magnitude_h}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.lineKey}>{'Designation :'}</Text>
              <Text style={styles.lineValue}>{designation}</Text>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.lineKey}>{'Is Potentially Hazardous :'}</Text>
              <Text style={styles.lineValue}>
                {is_potentially_hazardous_asteroid ? 'YES' : 'No'}
              </Text>
            </View>
          </View>
        </View>
      </Wrapper>
    );
  }
}
