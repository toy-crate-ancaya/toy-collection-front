import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Switch, StyleSheet } from 'react-native';
import HomePage from './src/pages/HomePages';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <HomePage />
    </View>
  );
}