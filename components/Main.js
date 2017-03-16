import React, {Component} from 'React';
import {
  StyleSheet,
  TextInput,
  ListView,
  StatusBar,
  View,
  Text
} from 'react-native';
import {debounce} from 'lodash';
import ListItem from './ListItem.js';
import NavigatorBar from './NavigatorBar.js';
import clrs from '../utils/clrs.js';
import {searchFor} from '../utils/fetcher.js';

export default class Main extends Component {
  constructor(props){
    super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1,r2)=>(r1 !== r2)});
      const data = ['row1','row2','row2','row2','row2','row2','row2','row2','row2','row2','row2','row2','row2','row2','row2'];
      //this.state = {artists: ds};
      this.state = {artists: ds.cloneWithRows(data)};
  }

  renderRow = (artist, id) => {
    const {navigator} = this.props;
    const ARTIST_STATE = {
      id: 'ARTIST_DETAIL',
      title: artist.name,
      url: artist.external_urls.spotify,
    };

    const imageUrl = artist.images[0] ? artist.images[0].url : null;

    return (
      <ListItem index={id}
        text={artist.name}
        imageUrl={imageUrl}
        navState={ARTIST_STATE}
        navigator={navigator} />
    );
  };

  makeQuery = debounce((query) => {
    searchFor(query)
    .then((result) => {
        this.setState({artists: this.state.artists.cloneWithRows(result)});
        //this.setState({artists: ds.cloneWithRows(result)});
        //this.state = {artists: ds.cloneWithRows(result)};
    })
  },400);

  render() {
    const {artists} = this.state;
    return (
      <View style={ styles.container }>
        <StatusBar style={ styles.searchBox } barStyle="light-content" />
        <TextInput style={ styles.searchBox }
          onChangeText={this.makeQuery}
        />
        <ListView dataSource={artists} style={styles.listView}
        renderRow= {this.renderRow}
        />
      </View>
    );
  }
}

Main.propTypes = {
  navigator: React.PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: clrs.white,
  },
  searchBox: {
    height: 40,
    width: 325,
    borderColor: clrs.black,
    borderWidth: 2,
    margin: 16,
    paddingLeft: 10,
    fontWeight: '800',
  },
  listView: {
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: 10,
  },
});
