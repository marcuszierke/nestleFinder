import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import colors from './colorPalette';

const Button = ({onPress, children}) => {
 	const { buttonStyle, textStyle } = styles;

	return (
		<TouchableOpacity 
			onPress={onPress}
			style={buttonStyle}
			activeOpacity={0.8}
		>			
			<Text style={textStyle}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

const styles = {
	textStyle: {
		alignSelf: 'center',
		color: colors.textLight,
		fontSize: 24,
		fontWeight: '600',
		lineHeight: 30
	},
	buttonStyle: {
		flex: 1,
		alignSelf: 'stretch',
		paddingBottom: 15,
		paddingTop: 15,
		borderColor: colors.buttonBlue,
		backgroundColor: colors.buttonBlue,
		borderRadius: 15,
		borderWidth: 1,
		marginLeft: '8%',
		marginRight: '8%',
		shadowOffset: { width: 4, height: 5 },
		shadowOpacity: 0.75,
		shadowRadius: 5,
		shadowColor: colors.buttonShadow
	}
}

export { Button };