import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const categories = [
  {
    id: 'Em Alta',
    name: 'Em Alta',
    icon: require('../../src/assets/Vector.png'),
    bgColor: '#023E8A',
  },
  {
    id: 'Mais Populares',
    name: 'Mais Populares',
    icon: require('../../src/assets/podio 1.png'),
    bgColor: '#7BB8F7',
  },
  {
    id: 'Mais Visitados',
    name: 'Mais Visitados',
    icon: require('../../src/assets/olhos-cruzados 1.png'),
    bgColor: '#FFAFCC',
  },
];

const FilterButtons = ({ filter, setFilter }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma categoria</Text>
      <Text style={styles.subtitle}>Permitimos filtrar brinquedos por:</Text>

      <View style={styles.filterRow}>
        {categories.map((cat) => (
          <View key={cat.id} style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: cat.bgColor },
                filter === cat.id && styles.selected,
              ]}
              onPress={() => setFilter(cat.id)}
              activeOpacity={0.7}
            >
              <Image source={cat.icon} style={styles.icon} />
            </TouchableOpacity>
            <Text
              style={[
                styles.buttonText,
                filter === cat.id ? styles.selectedText : styles.unselectedText,
              ]}
            >
              {cat.name}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Os Melhores</Text>
        <Text style={styles.sectionSubtitle}>Colaborações populares!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.6,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24, // mais espaçamento entre botões para o texto ficar legível
    marginBottom: 24,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: 73,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  buttonText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedText: {
    color: '#000000', // texto preto para selecionado
  },
  unselectedText: {
    color: '#555555', // cinza para não selecionado, opcional
  },
  section: {
    paddingHorizontal: 6,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  sectionSubtitle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#f20089',
    opacity: 0.64,
  },
});

export default FilterButtons;
