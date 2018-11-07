import React, { Component } from 'react';
import { Platform } from 'react-native';

import Home from './src/components/Home'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Home/>
    );
  }
}
