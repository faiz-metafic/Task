import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {vh} from '../utils/Dimensions';

export default class Loader extends Component {
  render() {
    return (
      <View style={styles.loader}>
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
