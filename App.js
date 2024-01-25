//StAuth10244: I Young Sang Kwon, 000847777 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mapType, setMapType] = useState("standard"); // 지도 타입 상태
  const [region, setRegion] = useState({
    latitude: 43.2557,
    longitude: -79.8711,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState([]);
  const [distance, setDistance] = useState(null);

  const onMapPress = (e) => {
    if (markers.length >= 2) {
      setMarkers([]);
      setDistance(null);
    }
    setMarkers([...markers, e.nativeEvent.coordinate]);
    if (markers.length === 1) {
      setDistance(calculateDistance(markers[0], e.nativeEvent.coordinate));
    }
  };

  const calculateDistance = (start, end) => {
    const radlat1 = Math.PI * start.latitude / 180;
    const radlat2 = Math.PI * end.latitude / 180;
    const theta = start.longitude - end.longitude;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; // Kilometers
    return dist.toFixed(2);
  };

  const zoomIn = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    });
  };

  const zoomOut = () => {
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    });
  };

  const toggleMapType = () => {
    setMapType(mapType === "standard" ? "satellite" : "standard");
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onPress={onMapPress}
        customMapStyle={isDarkMode ? darkMapStyle : []}
        mapType={mapType} // 지도 타입
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker} />
        ))}
        {markers.length === 2 && (
          <Polyline coordinates={markers} strokeColor="#000" strokeWidth={3} />
        )}
      </MapView>
      <View style={styles.controls}>
        <Switch onValueChange={() => setIsDarkMode(!isDarkMode)} value={isDarkMode} />
        <Button title="Reset" onPress={() => { setMarkers([]); setDistance(null); }} />
        <Button title="ZoomIn" onPress={zoomIn} />
        <Button title="ZoomOut" onPress={zoomOut} />
        <Button title="Toggle" onPress={toggleMapType} />
      </View>
      {distance && (
        <View style={styles.distanceContainer}>
          <Text>Distance: {distance} km</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
  }
];


export default App;
