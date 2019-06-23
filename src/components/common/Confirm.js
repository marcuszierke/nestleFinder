import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
	const { containerStyle, textStyle, cardSectionStyle } = styles;
	return (
		<Modal
			visible={visible}
			transparent
			animationType='slide'
			onRequestClose={() => {}}
		>
			<View style={containerStyle}>
				<CardSection style={cardSectionStyle}>
					<Text style={textStyle}>
						{children}
					</Text>
				</CardSection>
				<CardSection>
					<Button onPress={onAccept}>YES</Button>
					<Button onPress={onDecline}>NO</Button>
				</CardSection>
			</View>
		</Modal>
	)
};

const styles = {
	cardSectionStyle: {
		justifyContent: 'center'
	},
	textStyle: {
		justifyContent: 'center',
		fontSize: 18,
		lineHeight: 40,
		textAlign: 'center',
		flex: 1
	},
	containerStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		position: 'relative',
		flex: 1,
		justifyContent: 'center'
	}
};

export { Confirm };