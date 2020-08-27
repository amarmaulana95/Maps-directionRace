import _ from 'lodash';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, Text } from 'react-native';
import MapsViewHeader from './MapsViewHeader';

function MapsView(props) {
  const API_KEY = 'AIzaSyBM9-QJhHTP_yCndkOE8hW4OdfjULyv_MY';
  const { width, height } = Dimensions.get('window');
  const mapView = useRef();
  const [distance, setDistance] = useState()
  const [coordinates, setCoordinates] = useState([
    {
      latitude: -6.3213622,
      longitude: 106.8683152,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    },
    {
      latitude: -6.3213622,
      longitude: 106.8683152,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    },
  ]);

  const setKordinat = (waypoints) => {
    const res = [];
    _.forEach(waypoints, waypoint => {
      if (waypoint.geometry && waypoint.geometry.location) {
        res.push({
          latitude: waypoint.geometry.location.lat,
          longitude: waypoint.geometry.location.lng,
        });
      }
    });
    setCoordinates(res);
  };

  return (
    <View style={styles.container}>
      <View style={{flex:1}}>
      <MapView 
        style={{flex: 1, width: '100%'}}
        ref={mapView}>
        {coordinates.map((coordinate, index) =>
        <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} /> )}
        <MapViewDirections
          apikey={API_KEY}
          origin={coordinates[0]}
          waypoints={coordinates}
          destination={coordinates[coordinates.length - 1]}
          strokeWidth={3}
          strokeColor="red"
          optimizeWaypoints={true}
          onStart={(params) => {
            console.log(`From "${params.origin}" dan "${params.destination}"`);
          }}
          onReady={result => {
              setDistance(result.distance)
              console.log(`set, jarak: ${result.distance} `);
              mapView.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: (width / 20),
                bottom: (height / 20),
                left: (width / 20),
                top: (height / 20),
              }
            });
          }}
          onError={(errorMessage) => {
           console.log(setKordinat);
          }}
        />
      </MapView>
        <View style={{ position:"absolute", width:'100%'}}>
          <MapsViewHeader onChange={(waypoints) => setKordinat(waypoints)} navigation={props.navigation} />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 8,
            elevation: 2,
            marginHorizontal:3,
            marginVertical:10,
            borderColor:"transparent",
            borderWidth:3
          }}
        >
            <Text style={{color:'white'}}>Jarak</Text>
        <Text style={{fontWeight:'bold',fontSize:16}}>{distance} km</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  

});

export default MapsView;
