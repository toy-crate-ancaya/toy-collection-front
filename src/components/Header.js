import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Component3 from './Component3.js';

const Header = ({search, setSearch, isDarkMode, setIsDarkMode }) => {
  return (
    <View style={styles.wrapper}>
      <Component3 isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite aqui..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons name="search" size={16} color="#ffaf08" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 29,
    marginBottom: 19,
    alignItems: 'center',
  },
  searchBar: {
    width: 280,
    height: 49,
    borderRadius: 50,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 5,
    borderWidth: 2,
    borderColor: '#ffaf08',
    paddingHorizontal: 22,
    paddingVertical: 11,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#ffaf08',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#000',
    marginLeft: 8,
    padding: 0,
  },
  icon: {
    marginLeft: 8,
  },
});

export default Header;