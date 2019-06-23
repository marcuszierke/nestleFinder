import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
	return (
		<View style={styles.containerStyle}>
			{props.children}
		</View>
	);
};

const styles = {
	containerStyle: {
		// shadowRadius: 2,
		// elevation: 1,
		// marginLeft: 5,
		// marginRight: 5,
		// display: 'flex',
		// flex: 1
		// marginTop: 40,
	}
};

export { Card };