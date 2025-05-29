// screens/ListaToy.jsx
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import FundoCarrinho from '../components/FundoCarrinho';
import ToyCard from '../components/ToyCard';

const ListaToy = ({ brinquedos }) => {
  return (
    <View style={styles.container}>
      <FundoCarrinho />

      <ScrollView contentContainerStyle={styles.scrollContainer} >
        {brinquedos.map((toy, index) => (
          <ToyCard
            key={index}
            toy={toy}
            onEdit={() => console.log('Editar', toy.name)}
            onDelete={() => console.log('Excluir', toy.name)}
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
