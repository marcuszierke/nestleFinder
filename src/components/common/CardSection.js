import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
	return (
		<View style={[styles.containerStyle, props.style]}>
			{props.children}
		</View>
	);
};

const styles = {
	containerStyle: {
		paddingBottom: 21,
		flexDirection: 'row',
		borderColor: '#ddd',
		position: 'relative',
		// backgroundColor: 'white'
	}
};

export { CardSection };