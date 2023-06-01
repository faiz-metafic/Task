import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {vw} from '../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: vw(10),
  },
  inputStyle: {
    paddingHorizontal: vw(16),
  },
});

export default styles;
