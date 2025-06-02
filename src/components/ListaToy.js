// screens/ListaToy.jsx
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import FundoCarrinho from '../components/FundoCarrinho.js';
import ToyCard from '../components/ToyCard';

const ListaToy = ({ brinquedos, onEdit, onDelete, onLike, onUnlike, onView }) => {
  return (
    <View style={styles.container}>
      <FundoCarrinho />

      <ScrollView contentContainerStyle={styles.scrollContainer} >
        {brinquedos.map((toy, index) => (
          <ToyCard
            key={toy.toyId || index}
            toy={toy}
            onEdit={() => onEdit(toy)}
            onDelete={() => onDelete(toy)}
            onLike={() => onLike(toy.toyId)}
            onUnlike={() => onUnlike(toy.toyId)}
            onView={() => onView(toy.toyId)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 40,
  },
});

export default ListaToy;