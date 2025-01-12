import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import FAB from '@/components/FAB';

export default function Chats() {
    const actions = [
        {
            text: "Map",
            icon: <Ionicons name="map-outline" size={24} color="black" />,
            name: "Map",
            position: 1
        },
        {
            text: "Location",
            icon: <Ionicons name="location-outline" size={24} color="black" />,
            name: "Location",
            position: 2
        }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Chats</Text>
            <FAB actions={actions} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B141B',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
});