import React, {Component, ReactPropTypes} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

interface Props {
  testID?: string;
}

export default class Loader extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.loader} testID={this.props.testID}>
        <ActivityIndicator size={'large'} color={'white'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '200%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
