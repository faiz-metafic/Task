import React, {PureComponent, ReactNode} from 'react';
import {ImageBackground, ImageStyle, StatusBar} from 'react-native';
import LocalImages from '../../utils/LocalImages';
import styles from './styles';
import Colors from '../../utils/Colors';

interface Props {
  children: ReactNode;
  containerStyle?: ImageStyle;
}

export default class Wrapper extends PureComponent<Props> {
  render() {
    const {children} = this.props;

    return (
      <React.Fragment>
        <StatusBar translucent backgroundColor={Colors.transparent} />
        <ImageBackground
          source={LocalImages.backgroundImage}
          style={styles.container}
          blurRadius={4}
          resizeMode={'cover'}>
          {children}
        </ImageBackground>
      </React.Fragment>
    );
  }
}
