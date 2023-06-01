import {Platform, StatusBar, StyleSheet} from 'react-native';
import {vh} from '../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? vh(30) : StatusBar.currentHeight,
  },
});

export default styles;
