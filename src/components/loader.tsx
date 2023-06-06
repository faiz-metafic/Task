import React, {Component, ReactPropTypes} from 'react';
import {ActivityIndicator, ViewStyle, StyleSheet, View} from 'react-native';

interface Props {
  testID?: string;
  containerStyle?: ViewStyle;
}

export default class Loader extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const {containerStyle, testID} = this.props;
    return (
      <View style={[styles.loader, containerStyle]} testID={testID}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    width: '100%',
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
