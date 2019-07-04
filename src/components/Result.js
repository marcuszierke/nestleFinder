import React, { Component } from 'react';
import { Text, Image, ScrollView, View } from 'react-native';
import { CardSection, Spinner } from './common';
import colors from './common/colorPalette';
import NoDatabaseMatchErrorMessage from './NoDatabaseMatchErrorMessage';
import NonFoodErrorMessage from './NonFoodErrorMessage';
import Brands from './Brands';
import AllergenList from './AllergenList';
import { Nutriments, NutriScore, NovaScore } from './Nutriments';
import ResultHeader from './ResultHeader';

export default class Result extends Component {  
	state = {
		status: undefined,
		data: undefined,
		isNestle: false,
		loading: false
	};
	
	componentDidMount() {
		this.getApiData();
	}
	
	async getApiData() {
		let loading = !this.state.loading;		
		this.setState({ loading });
		// const eanCode = this.props.eanCode; // live
		// const eanCode = '1234567891012'; // no data
		// const eanCode = '1111111111'; // random number
		// const eanCode = '5000426171518'; // after eight
		// const eanCode = '8002270014901'; // san pellegrino
		// const eanCode = '4008400404127'; // nutella
		// const eanCode = '5038862161503'; // innocent
		// const eanCode = '3068320113708'; // evian
		// const eanCode = '4061458104265'; // Weidemlich (allergens length breaks app)
		// const eanCode = '4311501446454'; // lachsfilet (wird rot)
		// const eanCode = '3228024010134'; // camembert
		// const eanCode = '4040900101366'; // no nutri score && n0 nova score
		// const eanCode = '9783406727863'; // book
		// const eanCode = '4003171059842'; // infinite runtime (Hähnchenbrust)
		// const eanCode = '4001568200518'; // infinite runtime (Vita Malz)
		const eanCode = '4062800008941'; // infinite runtime (Sahne - keine Farben für Nutriments)
		// const eanCode = '8424372021500'; // infinite runtime (wasser)
		// const eanCode = '8429359000004'; // infinite runtime (wasser)
		
		const url = `https://world.openfoodfacts.org/api/v0/product/${eanCode}.json`;		
		const response = await fetch(url);		
		if (response.status == 200) {
			const responseJson = await response.json();			
			const status = await responseJson.status;	
			this.setState({ status });

			if (this.state.status === 0) {
				loading = !this.state.loading;
				this.setState({ loading });
			} else {
				const data = await responseJson.product;				
				this.setState({ data });
				await this.searchProductInNestleList();					
				loading = !this.state.loading;
				this.setState({ loading });
			}
		} else {
			this.setState({ loading: false, status: 0 });
		};
	}

	async searchProductInNestleList() {		
		const nestleBrandsApi = await fetch('https://en.wikipedia.org/w/api.php?action=parse&page=List_of_Nestl%C3%A9_brands&format=json');
		const nestleBrands = await nestleBrandsApi.json();
		const nestleBrandsList = nestleBrands.parse.links;
		const productBrands = this.state.data.brands;
		
		if (productBrands !== undefined && productBrands !== "") {	
			nestleBrandsList.forEach((brand) => {
				const brandName = brand['*'].toLowerCase();
				const brands = productBrands.split(',');
				if (!this.state.isNestle) {
					brands.forEach((brand) => {
						const brandLow = brand.toLowerCase();
						if (brandName.includes(brandLow) || brandLow.includes('nestle') || brandLow.includes('nestlé')) {
							this.setState({ isNestle: true });
							return;
						}
					});
				}
			});
		}
	}
	
	render() {
		let result = undefined;
		const { containerStyle,	productImageStyle, textStyle } = styles;

		if (this.state.loading) {
			result = <Spinner />;
		};

		if (!this.state.loading && this.state.status === 0) {
			result = <NoDatabaseMatchErrorMessage />;
		};
		
		if (!this.state.loading && this.state.status === 1 && this.state.data !== undefined) {
			const productName = this.state.data.product_name;
			const brands = this.state.data.brands;
			
			if (productName === undefined && brands === undefined || brands === '') {
				result = <NonFoodErrorMessage />
			} else {
				const image = this.state.data.image_front_url;

				result = (
					<View>
						<ResultHeader isNestle={this.state.isNestle} productName={productName} />
						<CardSection style={containerStyle}>
							<Image
								source={{ uri: image }}
								style={productImageStyle}
								resizeMode='cover'
							/>
							<Text style={textStyle}>Brands</Text>
							<Brands brands={brands} />
							<Text style={textStyle}>Allergens</Text>
							<AllergenList data={this.state.data} />
							<Text style={textStyle}>Nutrient Levels (100g)</Text>
							<Nutriments nutriments={this.state.data.nutriments} nutriLevels={this.state.data.nutrient_levels} />
							<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
								<NutriScore nutriments={this.state.data.nutriments} />
								<NovaScore nutriments={this.state.data.nutriments} />
							</View>
						</CardSection>
					</View>
				);
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
	containerStyle: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		marginTop: -10,
		backgroundColor: colors.lightBackground,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
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
	}
}