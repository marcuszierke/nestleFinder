import React from 'react';
import { Text, View } from 'react-native';
import colors from './common/colorPalette';

export default Brands = props => {
  let brandsOverview = undefined;

  if (props.brands !== undefined || props.brands === '') {
    brandsOverview = (
      <View>
        {props.brands.split(',').map(name => <Text key={name}>{name}</Text>)}
      </View>
    );
  } else {
    brandsOverview = (
        <View>
          <Text style={{ textAlign: 'center' }}>Unfortunately there is no information available.</Text>
        </View>
    );
  }

  return (
    <View style={styles.containerStyle}>
      {brandsOverview}
    </View>
  );
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