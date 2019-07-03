import React from 'react';
import { Text, View } from 'react-native';
import colors from './common/colorPalette';

export default AllergenList = props => {
  const allergens = props.data['allergens_tags'];
  let allergenList = undefined;

  if (allergens !== undefined && allergens.length !== 0) {
    allergenList = (
        <View>
          {allergens.map(name => <Text key={name}>{name.slice(3)}</Text>)}
        </View>
    );
  } else {
    allergenList = (
        <View>
          <Text style={{ textAlign: 'center' }}>Unfortunately there is no information available.</Text>
        </View>
    );
  }
  
  return (
    <View style={styles.containerStyle}>
      {allergenList}
    </View>
  )
}

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
    // shadowOffset: { height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowColor: colors.black,
    backgroundColor: colors.textLight
  }
};