import React, { Component } from 'react';
import Navigator from 'react-native';
import Main from './Main.js';
import NavigatorBar from './NavigatorBar.js';
import Artist from './Artist.js';

export default class Root extends Component {
  renderScene(route, navigator){
    if (route.id === 'MAIN'){
      return <Main navigator={navigator} />;
    }
    return <Artist url={route.url} />;
  }
  render() {
    return (
      <Navigator style={{ flex: 1 }}
        initialRoute={{ id: 'MAIN', title: 'Spotify Artist Lookup' }}
        renderScene={ this.renderScene }
        navigationBar={ NavigatorBar }
      />
    );
  }
}
