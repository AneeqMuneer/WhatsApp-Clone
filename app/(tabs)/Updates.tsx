import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Updates() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Updates</Text>
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