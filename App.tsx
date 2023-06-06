import React, {PureComponent} from 'react';
import Routes from './src/routes';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default class App extends PureComponent {
  render() {
    return <Routes />;
  }
}
