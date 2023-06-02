import React, {PureComponent} from 'react';
import {Pressable, Text, TextStyle, View, ViewStyle} from 'react-native';
import styles from './styles';

interface Props {
  testID: string;
  title: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  disabled?: boolean;
}

export default class CustomButton extends PureComponent<Props> {
  render() {
    const {
      testID,
      title,
      containerStyle,
      textStyle,
      onPress,
      disabled = false,
    } = this.props;
    return (
      <Pressable
        testID={testID}
        disabled={disabled}
        style={[styles.container, containerStyle]}
        onPress={onPress}>
        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
      </Pressable>
    );
  }
}
