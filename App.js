/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import applyConveter from 'axios-case-converter';
import MockAdapter from 'axios-mock-adapter';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

const responseInterceptor = (response: any) => response.data;
const responseErrorInterceptor = error => Promise.reject(error);

const client = applyConveter(axios.create());
client.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

const mock = new MockAdapter(client);
mock.onPost('/test').reply(200, [{ test_test: 'foo', check: 'bar' }]);

type Props = {};
export default class App extends Component<Props> {
  async componentDidMount() {
    try {
      const response = await client.post('/test');
    } catch (err) {
      console.warn(err.message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
