import React from 'react';
import { View } from 'react-native';
import colors from '../common/colorPalette';

const CardBox = (props) => {
	return (
		<View style={[styles.containerStyle, props.style]}>
			{props.children}
		</View>
	);
};

const styles = {
	containerStyle: {
		width: '90%',
		selfAlign: 'stretch',
		flexDirection: 'column',
		position: 'relative',
		paddingTop: 25,
		paddingBottom: 25,
		paddingLeft: 30,
		paddingRight: 30,
		marginBottom: 10,
		borderRadius: 5,
		shadowOffset: { height: 5 },
		shadowOpacity: 0.15,
		shadowRadius: 30,
		shadowColor: colors.buttonShadow,
		backgroundColor: colors.textLight
	}
};

export { CardBox };