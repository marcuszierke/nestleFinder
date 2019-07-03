import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Tooltip } from 'react-native-elements';
import { CardBox } from './common';
import colors from './common/colorPalette';

const colorPicker = [['#11998e', '#38ef7d'], ['#38ef7d', '#ffe259'], ['#ffe259', '#F09819'], ['#F09819', '#FF512F'], ['#FF512F', '#EA384D']];
let nutriScore = undefined;
let novaScore = undefined;
let scoreColorIndex = undefined;

nutriColorFinder = (nutri) => {
  if (nutri === 'low') {
    return { borderBottomColor: '#5ACBA7' }
  }
  if (nutri === 'moderate') {
    return { borderBottomColor: '#F09819' }
  }
  if (nutri === 'high') {
    return { borderBottomColor: '#EA384D' }
  }
}

getNutritionValue = (value) => {
  switch (true) {
    case value < 0:
      return ['A', 0];
    case 0 <= value && value < 3:
      return ['B', 1];
    case 3 <= value && value < 10:
      return ['C', 2];
    case 10 <= value && value < 18:
      return ['D', 3];
    case value > 18:
      return ['E', 4];
    default:
      return [0, null];
  }
}

export const Nutriments = props => {
  const nutriLevels = props.nutriLevels;
  const nutriments = props.nutriments;
  
  if (
    props.nutriments.sugars !== undefined &&
    props.nutriments.fat !== undefined &&
    props.nutriments.salt !== undefined &&
    props.nutriments['saturated-fat'] !== undefined
    ) {
    return (
      <CardBox>
        <View style={[styles.nutriScoreLineStyle, this.nutriColorFinder(nutriLevels.fat)]}><Text>Fat</Text><Text>{nutriments.fat}g</Text></View>
        <View style={[styles.nutriScoreLineStyle, this.nutriColorFinder(nutriLevels['saturated-fat'])]}><Text>Saturated fat</Text><Text>{nutriments['saturated-fat']}g</Text></View>
        <View style={[styles.nutriScoreLineStyle, this.nutriColorFinder(nutriLevels.salt)]}><Text>Salt</Text><Text>{nutriments.salt}g</Text></View>
        <View style={[styles.nutriScoreLineStyle, this.nutriColorFinder(nutriLevels.sugars)]}><Text>Sugar</Text><Text>{nutriments.sugars}g</Text></View>
      </CardBox>
    );
  } else {
    return (
      <CardBox>
        <View>
          <Text style={{ textAlign: 'center' }}>Unfortunately there is no information available.</Text>
        </View>
      </CardBox>
    );
  }
}

export const NutriScore = props => {
  let nutriScorePoints = Number(props.nutriments['nutrition-score-fr']);
  const [nutriScoreValue, scoreColorIndex] = getNutritionValue(nutriScorePoints);

  if (nutriScoreValue !== 0) {
    return (
      <View>
        <Tooltip
          popover={
            <Text>
              <Text style={{ fontWeight: 'bold', lineHeight: 20 }}>What is Nutri-Score?{"\n"}</Text>
              <Text style={{ lineHeight: 20, marginTop: 10, marginBottom: 10 }}>The Nutri-Score is a logo that shows the nutritional quality of food products with A to E grades. With the NutriScore, products can be easily and quickly compared.{"\n"}</Text>
              <Text style={{ fontWeight: 'bold', lineHeight: 20 }}>How is Nutri-Score computed?</Text>{"\n"}
              The Nutri-Score grade is determined by the amount of healthy and unhealthy nutrients:{"\n"}
              <Text style={{ fontWeight: 'bold', lineHeight: 20 }}>Positive Points:</Text> the proportion of fruits, vegetables and nuts, fibers and proteins (high levels are considered good for health).{"\n"}
              <Text style={{ fontWeight: 'bold', lineHeight: 20 }}>Negative Points:</Text> energy, saturated fat, sugars, sodium (high levels are considered unhealthy).{"\n"}
            </Text>
          }
          height={385}
          width={240}
          backgroundColor={'#F7DC81'}
        >
          <Text style={styles.textStyle}>Nutri-Score &#9432;</Text>
        </Tooltip>

        <CardBox style={styles.scoreContainerStyle}>
          <View style={{ display: 'flex', justiftContent: 'center', alignItems: 'center' }}>
            <LinearGradient
              colors={colorPicker[scoreColorIndex]}
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
  } else {
    return null;
  }
}

export const NovaScore = props => {
  const novaScoreValue = props.nutriments['nova-group'];

  if (novaScoreValue !== undefined) {
    return (
      <View>
        <Tooltip
          popover={
            <Text>
              <Text style={{ fontWeight: 'bold', lineHeight: 20 }}>Nova groups for food processing{"\n"}</Text>
              <Text style={{ lineHeight: 20, marginTop: 10, marginBottom: 10 }}>A classification in 4 groups to highlight the degree of processing of foods
            The NOVA classification assigns a group to food products based on how much processing they have been through:{"\n"}</Text>
              <Text style={{ fontWeight: 'bold', lineHeight: 20 }}>Group 1</Text> - Unprocessed or minimally processed foods{"\n"}
              <Text style={{ fontWeight: 'bold', lineHeight: 20 }}>Group 2</Text> - Processed culinary ingredients{"\n"}
              <Text style={{ fontWeight: 'bold', lineHeight: 20 }}>Group 3</Text> - Processed foods{"\n"}
              <Text style={{ fontWeight: 'bold', lineHeight: 20 }}>Group 4</Text> - Ultra-processed food and drink products{"\n"}
            </Text>
          }
          height={350}
          width={225}
          backgroundColor={'#F7DC81'}
        >
          <Text style={styles.textStyle}>Nova-Score &#9432;</Text>
        </Tooltip>
        <CardBox style={styles.scoreContainerStyle}>
          <View style={{ display: 'flex', justiftContent: 'center', alignItems: 'center' }}>
            <LinearGradient colors={colorPicker[Number(novaScoreValue)]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ borderRadius: 5, width: 70, height: 70, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 56, color: 'white' }}>{novaScoreValue}</Text>
            </LinearGradient>
          </View>
        </CardBox>
      </View>
    );
  } else {
    return null;
  }
}

const styles = {
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
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: colors.black,
    backgroundColor: colors.textLight
  },
};