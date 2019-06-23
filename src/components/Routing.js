import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Scanner from './Scanner';
import HomeScreen from './HomeScreen';
import Result from './Result';
import colors from './common/colorPalette';

export default class Routing extends Component {
	render() {
		return (
			<Router {...styles.sceneConfig}>
				<Scene>
					<Scene 
						key="homeScreen"
						component={HomeScreen}
						title="Home"
						hideNavBar 
						initial
					/>
					<Scene key="scanner" component={Result} title="Scanner" hideNavBar />
					<Scene 
						key="result" component={Result} 
						hideNavBar
						// initial
					/> 
				</Scene>
			</Router>
		);
	}
}

const styles = {
	sceneConfig: {
		cardStyle: {
			backgroundColor: 'white',
		}
	},
	resultsTitle: {
		color: colors.textLight,
		fontSize: 24,
		paddingBottom: 'auto',
		paddingTop: 'auto'
	},
	navBarStyle: {
		height: 65,
		backgroundColor: colors.buttonBlue,
		borderBottomColor: colors.buttonBlue
	},
	resultsSceneStyle: {
		fontSize: 20,
		letterSpacing: 1,
		color: colors.textLight,
		marginTop: 15,
		fontWeight: '300'
	}
}