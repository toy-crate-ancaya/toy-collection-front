import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Component3 = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../src/assets/img.icons8 2.png')}
        style={styles.sunImage}
      />
      <TouchableOpacity style={styles.moonButton} onPress={() => { /* toggleTheme ou outra ação */ }}>
        <Image
          source={require('../../src/assets/20a17badc5f50fda1a5cc45b21783026-removebg-preview 1.png')}
          style={styles.moonImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 301,
    height: 301,
    position: 'relative',
    marginBottom: -100,
    alignSelf: 'flex-end',
  },
  sunImage: {
    width: 260,
    height: 260,
    position: 'absolute',
    top: 0,
    right: -60,
    resizeMode: 'cover',
  },
  moonButton: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 150,
    left: -70,
  },
  moonImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});

export default Component3;
