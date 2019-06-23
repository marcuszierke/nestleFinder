import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

const Spinner = ({ size }) => {

	return (
		<View style={styles.spinnerStyle}>
			<Image
				source={require('../../../assets/images/placeholderGiraffe.jpg')}
				style={{ height: 125, width: 125, marginBottom: 20}}
				resizeMode='contain'
			/>
			<ActivityIndicator size={size || 'large'} color={'#000'} />
			{/* <Text style={{ color: 'black'}}>Let's see what we got here</Text> */}
		</View>
	);
};

const styles = {
	spinnerStyle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
};

export { Spinner };