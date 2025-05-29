import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ToyCard = ({ toy, onEdit, onDelete, onLike }) => {
  return (
    <View style={styles.card}>
      <Image source={toy.image} style={styles.image} />

      {/* Botão curtir com imagem */}
      <TouchableOpacity style={styles.likeButton} onPress={onLike}>
        <Image
          source={require('../../src/assets/rede-social 1.png')}
          style={styles.iconImage}
        />
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{toy.name}</Text>
        <Text style={styles.description}>{toy.description}</Text>
        <Text style={styles.category}>{toy.category}</Text>
        <Text style={styles.price}>{toy.price}</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={onEdit}>
            <Image
              source={require('../../src/assets/lapis 2.png')}
              style={styles.iconImage}
            />
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
            <Image
              source={require('../../src/assets/excluir.png')}
              style={styles.iconImage}
            />
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#c7c7c7',
    marginBottom: 20,
    padding: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 15,
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconImage: {
    width: 20,
    height: 20,
    marginRight: 6,
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: '#333',
    marginBottom: 2,
  },
  category: {
    fontSize: 10,
    fontWeight: '500',
    color: '#777',
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7b2cbf',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#6a1b9a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ToyCard;
