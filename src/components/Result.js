import React, { Component } from 'react';
import { Text, Image, ScrollView, View, TouchableOpacity } from 'react-native';
// import { Tooltip } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { CardSection, CardBox, Spinner } from './common';
import colors from './common/colorPalette';
import LinearGradient from 'react-native-linear-gradient';
import NoDatabaseMatchErrorMessage from './NoDatabaseMatchErrorMessage';
import NonFoodErrorMessage from './NonFoodErrorMessage';
import Brands from './Brands';
import { directive } from '@babel/types';

export default class Result extends Component {  
	state = {
		status: 0,
		data: undefined,
		isFood: undefined,
		isNestle: false,
		loading: false
	};
	
	backToHomeScreen() {
		Actions.homeScreen();
	}

	backToScanner() {
		Actions.scanner();
	}
	
	componentDidMount() {
		this.getApiData();
		// this.searchProductInNestleList();
	}
	
	async getApiData() {
		const loading = !this.state.loading;
		this.setState({ loading });
		// const eanCode = this.props.eanCode; // live
		// const eanCode = '1234567891012'; // no data
		// const eanCode = '1111111111'; // random number
		// const eanCode = '5000426171518'; // after eight
		// const eanCode = '8002270014901'; // san pellegrino
		// const eanCode = '4008400404127'; // nutella
		// const eanCode = '5038862161503'; // innocent
		// const eanCode = '3068320113708'; // evian
		// const eanCode = '3228024010134'; // camembert
		const eanCode = '4040900101366'; // no nutri score && n0 nova score
		// const eanCode = '9783406727863'; // book
		// const eanCode = '4003171059842'; // infinite runtime
		// const eanCode = '4001568200518'; // infinite runtime (Vita Malz)
		// const eanCode = '4062800008941'; // infinite runtime (Sahen)
		// const eanCode = '8424372021500'; // infinite runtime (wasser)
		// const eanCode = '8411002101503'; // infinite runtime (nestle wasser)
		// const eanCode = '8429359000004'; // infinite runtime (wasser)

		const url = `https://world.openfoodfacts.org/api/v0/product/${eanCode}.json`;
		const response = await fetch(url);
		let data = undefined;
		if(response.status == 200) {
			const responseJson = await response.json();
			if (responseJson.status === 1) {
				const status = responseJson.status;
				this.setState({ status });
				// if (responseJson.product !== undefined && !responseJson.product.categories.includes('Non')) {
				if (responseJson.product !== undefined) {
					const isFood = true;
					const data = await responseJson.product;
					const loading = !this.state.loading;
					this.setState({ isFood, data, loading });
					await this.searchProductInNestleList();
				} else {
					const isFood = false;
					const loading = !this.state.loading;
					this.setState({ isFood, loading });
				}
			} else {
				const status = responseJson.status;
				const loading = !this.state.loading;
				this.setState({ status, loading });
			}
		}
	}

	async searchProductInNestleList() {
		// const loading = !this.state.loading;
		// this.setState({ loading });
		const nestleBrandsApi = await fetch('https://en.wikipedia.org/w/api.php?action=parse&page=List_of_Nestl%C3%A9_brands&format=json');
		const nestleBrands = await nestleBrandsApi.json();
		const nestleBrandsList = nestleBrands.parse.links;
		const productBrands = this.state.data.brands;
		
		if (productBrands !== undefined) {	
			nestleBrandsList.forEach((brand) => {
				const brandName = brand['*'].toLowerCase();
				const brands = productBrands.split(',');
				brands.forEach((brand) => {
					const brandLow = brand.toLowerCase();
					if (brandName.includes(brandLow) || brandLow.includes('nestle') || brandLow.includes('nestlé')) {
						this.setState({ isNestle: true });
						return;
					}
				});
			});
		}
		// loading = !this.state.loading;
		// this.setState({ loading });
	}

	nutriColorFinder = (nutri) => {
		if(nutri === 'low') {
			return { borderBottomColor: '#5ACBA7'}
		}
		if(nutri === 'moderate') {
			return { borderBottomColor: '#F09819'}
		}
		if(nutri === 'high') {
			return { borderBottomColor: '#EA384D'}
		}
	}
	
	render() {
		let result = undefined;
		const { 
			containerStyle,
			emptyContainerStyle,
			productImageStyle,
			textStyle,
			// iconStyle,
			buttonStyle,
			buttonTextStyle,
			titleStyle,
			containerStyleExtended,
			// headlineStyle,
			productNameStyle,
			scoreContainerStyle,
			navButtonStyle,
			headerContainerStyle,
			brandNamesContainerStyle
		} = styles;

		if (this.state.loading) {
			return <Spinner />
		}
		if (this.state.status === 0) {
			result = <NoDatabaseMatchErrorMessage />;
		} else {
			if (this.state.isFood) {
				// const imageSizes = this.state.data.images['1'].sizes['400'];
				const image = this.state.data.image_front_url;
				const brands = this.state.data.brands;
				const productName = this.state.data.product_name;
				const goodColors = ['#92DE8F', '#7AD699', '#6CD19F', '#5ACBA7'];
				const badColors = ['#EA384D', '#EA384D'];
				const nutriLevels = this.state.data.nutrient_levels;
				const nutriments = this.state.data.nutriments;
				const allergens = this.state.data['allergens_tags'];
				let nutriScoreValue = Number(nutriments['nutrition-score-fr']);
				let novaScoreValue = nutriments['nova-group'];

				const colors = [['#11998e', '#38ef7d'], ['#38ef7d', '#ffe259'], ['#ffe259', '#F09819'], ['#F09819', '#FF512F'], ['#FF512F', '#EA384D']];
				let nutriScore = undefined;
				let novaScore = undefined;
				let allergenList = undefined;
				let scoreColorIndex = undefined;
				let nutrimentsInfo = undefined;

				switch (true) {
					case nutriScoreValue < 0:
						nutriScoreValue = 'A';
						scoreColorIndex = 0;
						break;
						case 0 <= nutriScoreValue && nutriScoreValue < 3:
						nutriScoreValue = 'B';
						scoreColorIndex = 1;
						break;
						case 3 <= nutriScoreValue && nutriScoreValue < 10:
						nutriScoreValue = 'C';
						scoreColorIndex = 2;
						break;
						case 10 <= nutriScoreValue && nutriScoreValue < 18:
						nutriScoreValue = 'D';
						scoreColorIndex = 3;
						break;
						case nutriScoreValue > 18:
						nutriScoreValue = 'E';
						scoreColorIndex = 4;
						break;
					default:
					nutriScoreValue = 0;
						break;
				}

				if (allergens.length !== 0) {
					allergenList = (
						<CardBox>
							<View style={brandNamesContainerStyle}>
								{allergens.map(name => <Text key={name}>{name.slice(3)}</Text>)}
							</View>
						</CardBox>
					);
				} else {
					allergenList = (
						<CardBox>
							<View style={brandNamesContainerStyle}>
								<Text style={{textAlign: 'center'}}>Unfortunately there is no information available.</Text>
							</View>
						</CardBox>
					);
				}

				if (
					nutriments.sugars !== undefined &&
					nutriments.fat !== undefined &&
					nutriments.salt !== undefined &&
					nutriments['saturated-fat'] !== undefined
				) {
					nutrimentsInfo = (
						<CardBox>
							<View style={[styles.nutriScoreLineStyle, this.nutriColorFinder(nutriLevels.fat)]}><Text>Fat</Text><Text>{nutriments.fat}g</Text></View>
							<View style={[styles.nutriScoreLineStyle, this.nutriColorFinder(nutriLevels['saturated-fat'])]}><Text>Saturated fat</Text><Text>{nutriments['saturated-fat']}g</Text></View>
							<View style={[styles.nutriScoreLineStyle, this.nutriColorFinder(nutriLevels.salt)]}><Text>Salt</Text><Text>{nutriments.salt}g</Text></View>
							<View style={[styles.nutriScoreLineStyle, this.nutriColorFinder(nutriLevels.sugars)]}><Text>Sugar</Text><Text>{nutriments.sugars}g</Text></View>
						</CardBox>
					);
				} else {
					nutrimentsInfo = (
						<CardBox>
							<View style={brandNamesContainerStyle}>
								<Text style={{ textAlign: 'center' }}>Unfortunately there is no information available.</Text>
							</View>
						</CardBox>
					);
				}

				if (nutriScoreValue !== 0) {
					nutriScore = (
						<View>		
							<Text style={textStyle}>Nutri-Score</Text>
								<CardBox style={scoreContainerStyle}>
									<View style={{ display: 'flex', justiftContent: 'center', alignItems: 'center' }}>
										<LinearGradient 
											colors={colors[scoreColorIndex]}
											start={{ x: 0, y: 0 }} 
											end={{ x: 1, y: 0 }} 
											style={{ borderRadius: 5, width: 70, height: 70, display: 'flex', justifyContent: 'center', alignItems: 'center' }} 
										>
											<Text style={{ color: '#FFF', fontSize: 56 }}>{nutriScoreValue}</Text>
										</LinearGradient>
									</View>
							</CardBox>
						</View>
					);
				}

				if (novaScoreValue !== undefined) {
					novaScore = (
						<View>
							<Text style={textStyle}>Nova-Score</Text>
							<CardBox style={scoreContainerStyle}>
								<View style={{ display: 'flex', justiftContent: 'center', alignItems: 'center'}}>
									<LinearGradient colors={colors[Number(novaScoreValue)]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ borderRadius: 5, width: 70, height: 70, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
										<Text style={{ fontSize: 56, color: 'white' }}>{novaScoreValue}</Text>
									</LinearGradient>
								</View>
							</CardBox>
						</View>
					);
				}

				let brandsOverview = undefined;
				if (this.state.data.brands !== undefined) {
					brandsOverview = (
						<Brands brands={brands} />
					);
				}

				result = (
					<View>
						<LinearGradient colors={this.state.isNestle ? badColors : goodColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
							<CardSection style={{emptyContainerStyle}}>
								<View style={headerContainerStyle}>
									<TouchableOpacity 
										onPress={this.backToHomeScreen.bind(this)}
										activeOpacity={0.9}
									>
										<Text style={styles.navButtonStyle}>HOME</Text>
									</TouchableOpacity>
									<Text style={styles.productNameStyle}>{productName}</Text>
									<TouchableOpacity 
										onPress={this.backToScanner.bind(this)}
										activeOpacity={0.9}	
									>
										<Text style={styles.navButtonStyle}>SCAN</Text>
									</TouchableOpacity>
								</View>
							</CardSection>
						</LinearGradient>
						<CardSection style={containerStyle}>
							<Image 
								source={{ uri: image }} 
								style={productImageStyle}
								resizeMode='cover'
							/>
							<Text style={textStyle}>Brands</Text>
							{brandsOverview}
							<Text style={textStyle}>Allergens</Text>
							{allergenList}
							<Text style={textStyle}>Nutrient Levels (100g)</Text>
							{nutrimentsInfo}
							<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
								{nutriScore}
								{novaScore}
							</View>
						</CardSection>
					</View>
				);
			} else {
				result = <NonFoodErrorMessage />;
			}
		}
		
		return (
			<ScrollView>
				{result}
			</ScrollView>
		);
	}
}

const styles = {
	emptyContainerStyle: {
		height: 175,
		display: 'flex',
		alignItems: 'center'
	},
	titleStyle: {
		fontSize: 20,
		letterSpacing: 1,
		color: colors.textLight,
		textAlign: 'center',
		width: '100%',
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
	scoreContainerStyle: {
		width: 150,
		height: 150,
		selfAlign: 'stretch',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
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
	},
	productNameStyle: {
		marginTop: '10%',
		marginBottom: '5%',
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingTop: 15,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 30,
		fontSize: 24,
		flexGrow: 1,
		fontWeight: '500',
		color: colors.textLight,
		textAlign: 'center'
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
	},
	emptyContainerError: {
		marginBottom: '-6%',
		marginTop: '5%'
	},
	productImageStyle: {
		marginTop: -75,
		marginBottom: 20,
		width: 150,
		height: 150,
		borderRadius: 75
	},
	textStyle: {
		marginLeft: '5%',
		marginRight: '5%',
		marginBottom: '5%',
		marginTop: '5%',
		fontSize: 18,
		fontWeight: '600',
		color: colors.textDark,
		width: '90%',
	},
	nutriInfoBox: { 
		borderWidth: 1,
		borderColor: colors.infoBoxBorder,
		marginLeft: '5%',
		marginRight: '5%'
	},
	lightTextStyle: {
		marginLeft: '10%',
		marginRight: '10%',
		marginTop: '5%',
		marginBottom: '5%',
		fontSize: 18,
		color: colors.shadowColor,
		textAlign: 'center'
	},
	// iconStyle: {
	// 	marginTop: '10%',
	// 	height: 75,
	// 	width: 75
	// },
	buttonContainerStyle: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '5%',
		marginLeft: '8%',
		marginRight: '8%',
		alignItems: 'center'
	},
	buttonStyle: {
		borderColor: colors.buttonBorder,
		borderWidth: 1,
		marginTop: '9%',
	},
	buttonTextStyle: {
		fontSize: 20,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 13,
		paddingBottom: 17,
		color: colors.buttonBorder
	},
	// headlineStyle: {
	// 	marginTop: '10%',
	// 	marginBottom: '2%',
	// 	marginLeft: '5%',
	// 	marginRight: '5%',
	// 	fontWeight: '500',
	// 	fontSize: 22,
	// 	textAlign: 'center'
	// },
	nutriScoreImageStyle: {
		width: 200,
		height: 75,
		marginTop: '2%',
		marginBottom: '4%',
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	productInfoContainer: {
		display: 'flex',
		flexDirection: 'column'
	},
	nutriScoreLineStyle: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		borderBottomWidth: 1.5,
		paddingTop: 17,
		paddingBottom: 8,
		paddingLeft: '3%',
		paddingRight: '3%',
		marginTop: 10
	}
}