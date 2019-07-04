import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
// import { Card, CardSection, Button } from './common';
import LinearGradient from 'react-native-linear-gradient';

export default class HomeScreen extends Component {
	onScannerClick() {
		Actions.scanner();
	}

	render() {
		return (
			<LinearGradient colors={['#00d2ff', '#3a7bd5']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.headerCardSection}>
				<Text style={styles.headlineStyle}>Product Scanner</Text>
				<TouchableOpacity onPress={this.onScannerClick.bind(this)}>
					<View style={styles.scanButtonStyle}>
						<Image
							source={require('../../assets/images/scanIcon.png')}
							style={{height: 55, width: 55, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}
							/>
					</View>
				</TouchableOpacity>
			</LinearGradient>
		);
	}
}

const styles = {
	headerCardSection: {
		height: '100%',
		dislay: 'flex',
		alignItems: 'center',
		// justifyContent: 'space-evenly',
		zIndex: -1
		// marginBottom: 100,
		// width: '100%',
		// borderBottomLeftRadius: 150,
		// borderBottomRightRadius: 350,
	},
	headlineStyle: {
		fontSize: 32,
		letterSpacing: 1,
		fontWeight: '600',
		color: 'white',
		textAlign: 'center',
		marginTop: '30%',
		marginBottom: '75%'
	},
	scanButtonStyle: {
		backgroundColor: 'white',
		borderWidth: 3,
		borderColor: '#00ADCC',
		height: 100,
		width: 100,
		borderRadius: 50
	}
}