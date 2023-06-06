import {
  FlatList,
  Pressable,
  Text,
  View,
  Linking,
  StyleSheet,
} from 'react-native';
import {PureComponent, ReactPropTypes} from 'react';
import axios from 'axios';
import styles from './styles';
import moment from 'moment';
import Loader from '../../components/loader';
import {ListStackParamList} from '../../utils/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ScreenNames from '../../utils/ScreenNames';
import CustomTextInput from '../../components/customTextInput/customTextInput';

interface State {
  page: number;
  listData: Array<any>;
  storedData: Array<any>;
  search: string;
}
interface Props extends ReactPropTypes {
  navigation: SearchScreenNavigationProp;
}

type SearchScreenNavigationProp = NativeStackNavigationProp<ListStackParamList>;

export default class ListScreen extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
      listData: [],
      storedData: [],
      search: '',
    };
  }

  private interval: number = 0;

  componentDidMount(): void {
    this.initialFetch();
    this.interval = setInterval(this.fetchData, 10000);
  }
  initialFetch = async () => {
    await this.fetchData();
    this.setState({listData: [...this.state.storedData]});
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchData = async () => {
    try {
      const response = await axios(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.page}`,
      );
      if (response.status === 200) {
        this.setState({
          storedData: [...this.state.storedData, ...response?.data?.hits],
          page: this.state.page + 1,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  renderTags = ({item}: {item: string}) => {
    return <Text style={styles.tagText}>{`${item}, `}</Text>;
  };
  onItemPress = (item: any) => {
    this.props.navigation.navigate(ScreenNames.rawJson, {data: item});
  };

  onUrlPress = async (url: string) => {
    await Linking.openURL(url);
  };

  renderItem = ({item}: any) => {
    const {author, url, title, created_at, _tags} = item;
    return (
      <Pressable
        testID="ItemContainer"
        onPress={() => this.onItemPress(item)}
        style={styles.itemContainer}>
        <Text
          testID="Author"
          style={styles.itemText}>{`Author: ${author}`}</Text>
        <Text testID="Title" style={styles.itemText}>{`Title: ${title}`}</Text>
        <View testID="Url" style={styles.tagsContainer}>
          <Text style={styles.itemText}>{'Url: '}</Text>
          <Text
            testID="ItemURL"
            onPress={() => this.onUrlPress(url)}
            style={styles.urlText}>
            {url}
          </Text>
        </View>
        <Text testID="CreatedAt" style={styles.itemText}>{`CreatedAt: ${moment(
          created_at,
        ).format('MMMM Do YYYY, h:mm:ss a')}`}</Text>
        <View testID="TagList" style={styles.tagsContainer}>
          <Text style={styles.itemText}>{'Tags: '}</Text>
          <FlatList
            data={_tags}
            renderItem={this.renderTags}
            style={styles.tagListContainer}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Pressable>
    );
  };

  onEndReached = () => {
    if (this.state.listData.length < this.state.storedData.length) {
      let temp = this.state.storedData.slice(
        this.state.listData.length,
        this.state.listData.length + 20,
      );
      this.setState({listData: [...this.state.listData, ...temp]});
    }
  };

  listFooterComponent = () => {
    if (
      this.state.listData.length < this.state.storedData.length &&
      this.state.search === ''
    )
      return <Loader testID="Loader" containerStyle={styles.loading} />;
    return null;
  };

  listEmptyComponent = () => {
    return <Loader />;
  };

  onChangeText = (text: string) => {
    this.setState({search: text});
  };

  getListData = () => {
    const {search, listData} = this.state;
    if (search !== '') {
      return listData.filter((item: any) => {
        const {author, title} = item;
        return (
          author.toLowerCase().includes(search.toLowerCase()) ||
          title.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    return listData;
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomTextInput
          placeholder="Search"
          testID={'Search'}
          containerStyle={styles.searchContainer}
          value={this.state.search}
          placeholderTextColor="white"
          onChangeText={this.onChangeText}
        />
        {this.state.listData.length !== 0 ? (
          <FlatList
            testID="FlatList"
            data={this.getListData()}
            renderItem={this.renderItem}
            style={styles.flatlist}
            contentContainerStyle={styles.listContentContainer}
            onEndReachedThreshold={0.5}
            onEndReached={this.onEndReached}
            ListFooterComponent={this.listFooterComponent}
          />
        ) : (
          this.listEmptyComponent()
        )}
      </View>
    );
  }
}
