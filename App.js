import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import Deck from './components/Deck';
import { lightBlue } from './utils/colors';
import { setLocalNotification } from './utils/notifications';
import Router from './router'

export default class App extends React.Component {

  componentDidMount () {
    setLocalNotification();
  }

  render() {
    const store = createStore(reducer, {}, applyMiddleware(thunk));

    return (
      <Provider store={store}>
        <View style={styles.container} >
          <View style={{ backgroundColor:lightBlue, height: Constants.statusBarHeight }}>
            <StatusBar translucent barStyle='light-content' />
          </View>
          <Router />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6d6d6',
  },
});
