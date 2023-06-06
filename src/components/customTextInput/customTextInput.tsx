import {PureComponent} from 'react';
import {TextInput, TextStyle, View, ViewStyle} from 'react-native';
import styles from './styles';

interface Props {
  value: string;
  testID: string;
  placeholder: string;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  placeholderTextColor?: string;
  onChangeText: (arg: string) => void;
}

export default class CustomTextInput extends PureComponent<Props> {
  render() {
    const {
      value,
      testID,
      onChangeText,
      placeholder,
      placeholderTextColor,
      inputStyle,
      containerStyle,
    } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          value={value}
          testID={testID}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={[styles.inputStyle, inputStyle]}
        />
      </View>
    );
  }
}
