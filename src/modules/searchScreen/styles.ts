import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {vh, vw} from '../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    paddingTop: vh(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: Colors.white40,
  },
  buttonContainer: {
    marginVertical: vh(20),
  },
  buttonTextColor: {},
  randombuttonTextColor: {
    color: Colors.black,
  },
  randomButtonContainer: {
    marginVertical: 0,
    borderRadius: vw(30),
    backgroundColor: Colors.white40,
  },
});

export default styles;
