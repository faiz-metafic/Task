import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import {vh, vw} from '../../utils/Dimensions';

const styles = StyleSheet.create({
  wrappercontainer: {},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '80%',
    borderRadius: vw(10),
    paddingVertical: vh(10),
  },
  lineContainer: {
    flexDirection: 'row',
    width: '90%',
    paddingVertical: vh(10),
    alignItems: 'center',
  },
  lineKey: {
    color: Colors.white40,
    fontSize: vw(16),
    marginHorizontal: 10,
    fontWeight: '600',
    lineHeight: vh(18),
  },
  lineValue: {
    fontSize: vw(12),
    color: Colors.white40,
    fontWeight: '500',
    lineHeight: vh(14),
  },
  backButtonContainer: {
    height: vh(30),
    width: vw(25),
    position: 'absolute',
    top: vh(20),
    left: vw(30),
  },
  backButton: {
    height: '100%',
    width: '100%',
  },
});

export default styles;
