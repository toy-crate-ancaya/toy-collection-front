import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';

const FilterButtons = ({ filter, setFilter }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma categoria</Text>
      <Text style={styles.subtitle}>Permitimos filtrar brinquedos por:</Text>
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[
            styles.button,
            filter === 'Em Alta' && styles.selected,
            { backgroundColor: '#1e3a8a' }, // Cor ajustada para azul escuro
          ]}
          onPress={() => setFilter('Em Alta')}
        >
          <Ionicons name="bulb" size={20} color="#fff" />
          <Text style={[styles.buttonText, { color: '#fff' }]}>Em Alta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            filter === 'Mais Populares' && styles.selected,
            { backgroundColor: '#7bb8f7' },
          ]}
          onPress={() => setFilter('Mais Populares')}
        >
          <MaterialIcons name="leaderboard" size={20} color="#fff" />
          <Text style={styles.buttonText}>Mais Populares</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            filter === 'Mais Visitados' && styles.selected,
            { backgroundColor: '#ffafcc' },
          ]}
          onPress={() => setFilter('Mais Visitados')}
        >
          <Entypo name="eye-with-line" size={20} color="#fff" />
          <Text style={styles.buttonText}>Mais Visitados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'rgba(1, 1, 1, 0.7)',
    marginBottom: 12,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    paddingHorizontal: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buttonText: {
    marginLeft: 6,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#fff',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#7b2cbf',
  },
});

export default FilterButtons;