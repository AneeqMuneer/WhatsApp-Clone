import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Maps = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
    const [mapRegion , setMapRegion] = useState<{latitude: number , longitude: number , latitudeDelta: number , longitudeDelta: number} | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
                return;
            }

            const locationEnabled = await Location.hasServicesEnabledAsync();
            if (!locationEnabled) {
                console.log("Location services are not enabled.");
                return;
            }

            try {
                let locationData = await Location.getCurrentPositionAsync({});
                console.log(`Current position found: ${locationData.coords.latitude} ${locationData.coords.longitude}`)
                setLocation(locationData.coords);
                setMapRegion({
                    latitude: locationData.coords.latitude,
                    longitude: locationData.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
                console.log("Map region to current location set")
            } catch (error) {
                console.error("Error fetching location:", error);
                Alert.alert("Error", "Unable to fetch location. Please try again.");
            }
        }

        getCurrentLocation();
    }, []);

    const handlePlaceSelect = (data: any, details: any) => {
        if (details?.geometry?.location) {
            const { lat, lng } = details.geometry.location;

            // Update selected place
            setDestination({ latitude: lat, longitude: lng });

            // Move map to the selected place
            setMapRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            console.log("Map region set to selected region chosen as destination");
        }
    };

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder="Search for a place"
                onPress={handlePlaceSelect}
                query={{
                    key: 'AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk',
                    language: 'en',
                }}
                styles={{
                    container: {
                        flex: 0,
                        position: "absolute",
                        width: "90%",
                        top: 20,
                        alignSelf: "center",
                        zIndex: 1,
                    },
                    textInput: {
                        height: 40,
                        backgroundColor: "#FFFFFF",
                        borderRadius: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: "#ccc",
                    },
                    listView: {
                        backgroundColor: "#FFFFFF",
                        borderRadius: 5,
                    },
                }}
            />

            <MapView 
                style={styles.map}
                region={mapRegion}
            >

                {/* Marker for my location */}
                {
                    location && (
                        <Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title="My Location"
                            description="This is a marker for my location"
                        />
                    )
                }

                {/* Marker for my destination */}
                {
                    destination && (
                        <Marker
                            coordinate={{
                                latitude: destination.latitude,
                                longitude: destination.longitude,
                            }}
                            title="My Destination"
                            description="This is a marker to where I need to go"
                        />
                    )
                }

                {/* Directions from my location to my destination */}
                {
                    location && destination && (
                        <MapViewDirections
                            origin={location}
                            destination={destination}
                            apikey="AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk"
                            strokeWidth={3}
                            strokeColor="blue"
                        />
                    )
                }
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default Maps;