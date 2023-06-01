import {StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/Dimensions';
import Colors from '../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'dodgerblue',
    borderRadius: vw(10),
    alignItems: 'center',
    paddingVertical: vh(10),
  },
  textStyle: {
    color: Colors.white,
  },
});

export default styles;
