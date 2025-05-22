import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ search, setSearch }) => {
  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#999"
        />
        <Ionicons name="search" size={15} color="#fbbf24" style={styles.searchIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ffaf08',
    borderWidth: 2,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 5,
    paddingHorizontal: 22,
    paddingVertical: 11,
    width: 244,
    backgroundColor: '#fff',
    shadowColor: '#ffaf09',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    opacity: 0.5,
  },
  searchIcon: {
    marginLeft: 8,
  },
});

export default Header;