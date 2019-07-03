import React, { Component } from 'react';
import { Text, Image, View, Linking, TouchableOpacity } from 'react-native';
import colors from './common/colorPalette';
import { CardSection } from './common';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

export default class NonFoodErrorMessage extends Component {
  backToHomeScreen() {
    Actions.homeScreen();
  }

  backToScanner() {
    Actions.scanner();
  }

  render() {
    const { 
      emptyContainerStyle,
      productNameStyle,
      containerStyle,
      errorMessageImageStyle,
      errorMessageTextStyle,
      monkeyImageStyle,
      navButtonStyle,
      headerContainerStyle
    } = styles;

    return (
      <View>
        <LinearGradient colors={['#ffe259', '#F09819']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
          <CardSection style={{emptyContainerStyle}}>
            <View style={headerContainerStyle}>
              <TouchableOpacity
                onPress={this.backToHomeScreen.bind(this)}
                activeOpacity={0.9}
              >
                <Text style={styles.navButtonStyle}>HOME</Text>
              </TouchableOpacity>
              <Text style={productNameStyle}>SOMETHING WENT WRONG</Text>
              <TouchableOpacity
                onPress={this.backToScanner.bind(this)}
                activeOpacity={0.9}
              >
                <Text style={navButtonStyle}>SCAN</Text>
              </TouchableOpacity>
            </View>
          </CardSection>
        </LinearGradient>
        <CardSection style={containerStyle}>
          <Image
            source={require('../../assets/images/hamster.png')}
            style={[errorMessageImageStyle, monkeyImageStyle]}
            resizeMode='contain'
          />
          <Text style={errorMessageTextStyle}>Are you sure you can drink or eat what you just tried to scan? {'\n'}Well if that's the case than there is a bunch of information still missing. Why don't you help adding them!? Check it out
            <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://world.openfoodfacts.org')}> here </Text>
          !
				  </Text>
        </CardSection>
      </View>
    )
  }
}

const styles = {
  emptyContainerStyle: {
    height: 175,
    display: 'flex',
    alignItems: 'center'
  },
  containerStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: -10,
    backgroundColor: colors.lightBackground,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  productNameStyle: {
    // marginBottom: '5%',
    marginTop: '15%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 15,
    paddingBottom: 10,
    fontSize: 24,
    flexGrow: 1,
    fontWeight: '500',
    color: colors.textLight,
    textAlign: 'center'
  },
  errorMessageImageStyle: {
    height: '30%',
    width: '100%',
    // marginTop: '10%'
  },
  errorMessageTextStyle: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: '10%',
    marginBottom: '10%',
    marginLeft: '20%',
    marginRight: '20%',
    textAlign: 'center'
  },
  monkeyImageStyle: {
    marginTop: '25%'
  },
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
  }
};