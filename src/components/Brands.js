import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardBox } from './common';

export default class Brands extends Component {
  render() {
    return (
      <CardBox>
        <View style={styles.brandNamesContainerStyle}>
          {this.props.brands.split(',').map(name => <Text key={name}>{name}</Text>)}
        </View>
      </CardBox>
    );
  }
}

styles = {
  brandNamesContainerStyle: {
    display: 'flex',
    flexDirection: 'column'
  }
};