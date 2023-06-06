import {StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292525',
  },
  itemContainer: {
    backgroundColor: 'black',
    marginHorizontal: vw(10),
    marginBottom: vh(10),
    padding: vw(10),
    justifyContent: 'center',
    borderRadius: vw(10),
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tagListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemText: {
    fontSize: vw(13),
    marginVertical: vh(2),
    fontWeight: '500',
    color: 'white',
  },
  tagText: {
    color: 'white',
    fontStyle: 'italic',
  },
  urlText: {
    width:'95%',
    color: 'lightblue',
    textDecorationLine: 'underline',
  },
  listContentContainer: {
    marginBottom: vh(10),
  },
  loading: {
    position: 'relative',
    top: 0,
  },
  searchContainer: {
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: 'black',
    width: '95%',
  },
  flatlist: {
    marginTop: 10,
  },
});

export default styles;
