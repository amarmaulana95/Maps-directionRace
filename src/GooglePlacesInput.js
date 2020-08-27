import React, { useState, useEffect } from 'react';
import { Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { YellowBox } from 'react-native';
const API_KEY = 'AIzaSyBM9-QJhHTP_yCndkOE8hW4OdfjULyv_MY';

function GooglePlacesInput({ navigation, route }) {

  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);

  const Onsubmit = (data, details = null) => {
    route.params.onPlaceChosen(route.params.id, details.formatted_address, details.geometry);
    navigation.goBack();
  };

  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} 
      autoFocus={false}
      fetchDetails={true}
      returnKeyType="search" 
      keyboardAppearance='light' 
      listViewDisplayed='auto' 
      renderDescription={row => row.description} 
      onPress={Onsubmit}

      getDefaultValue={() => ''}

      query={{
        key: API_KEY,
        language: 'en', 
      }}

      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}

      nearbyPlacesAPI='GooglePlacesSearch' 
      GoogleReverseGeocodingQuery={{
      }}
      GooglePlacesSearchQuery={{
        rankby: 'distance',
        type: 'cafe'
      }}

      GooglePlacesDetailsQuery={{
        fields: 'formatted_address,geometry',
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}

      debounce={200}
    />
  );
}


export default GooglePlacesInput;