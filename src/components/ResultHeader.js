import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import colors from './common/colorPalette';

export default class ResultHeader extends Component {  
  backToHomeScreen() {
    Actions.homeScreen();
  }
  
  backToScanner() {
    Actions.scanner();
  }

  render() {
    const goodColors = ['#92DE8F', '#7AD699', '#6CD19F', '#5ACBA7'];
    const badColors = ['#EA384D', '#EA384D'];
    const { emptyContainerStyle, headerContainerStyle, navButtonStyle,productNameStyle } = styles;

    return (
      <LinearGradient colors={this.props.isNestle ? badColors : goodColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <View style={headerContainerStyle}>
          <TouchableOpacity
            onPress={this.backToHomeScreen.bind(this)}
            activeOpacity={0.9}
          >
            <Text style={navButtonStyle}>HOME</Text>
          </TouchableOpacity>
          <Text style={productNameStyle}>{this.props.productName}</Text>
          <TouchableOpacity
            onPress={this.backToScanner.bind(this)}
            activeOpacity={0.9}
          >
            <Text style={navButtonStyle}>SCAN</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  }
}

const styles = {
  headerContainerStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    marginTop: 35,
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  navButtonStyle: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 14,
    width: 85,
    padding: 7,
    borderWidth: 1,
    borderColor: '#FFF',
    fontWeight: '500',
    color: colors.textLight,
    textAlign: 'center'
  },
  productNameStyle: {
    marginTop: '10%',
    marginBottom: 75,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    // paddingBottom: 20,
    fontSize: 24,
    flexGrow: 1,
    fontWeight: '500',
    color: colors.textLight,
    textAlign: 'center'
  },
};
