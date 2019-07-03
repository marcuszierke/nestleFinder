import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Spinner = ({ size }) => {

	return (
		<LinearGradient colors={['#00d2ff', '#3a7bd5']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.container}>
			<ActivityIndicator size={size || 'large'} color={'#FFF'} style={styles.spinnerStyle}/>
			<Text style={{ color: 'white', marginBottom: '75%'}}>Loading the results</Text>
		</LinearGradient>
	);
};

const styles = {
	container: {
		height: '100%',
		display: 'flex',
		// justifyContent: 'center',
		alignItems: 'center',
	},
	spinnerStyle: {
		paddingBottom: 20,
		marginTop: '100%',
		// marginBottom: '75%'
	}
};

export { Spinner };