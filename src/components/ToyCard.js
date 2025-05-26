import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ToyCard({ toy, onEdit, onDelete }) {
  return (
    <View style={styles.cardContainer}>
      {/* Botão de compartilhar no canto superior direito */}
      <TouchableOpacity style={styles.shareButton}>
        <Ionicons name="share-social-outline" size={20} color="#7b2cbf" />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Imagem do brinquedo */}
        <Image source={{uri:toy.toyFileUrl}} style={styles.image} />

        {/* Informações do brinquedo */}
        <View style={styles.info}>
          <Text style={styles.name}>{toy.toyName}</Text>
          <Text style={styles.description} numberOfLines={2}>{toy.toyObjective}</Text>
          <Text style={styles.label}>Novo</Text>
          <Text style={styles.category}>{toy.toyCondition}</Text>
          <Text style={styles.price}>{toy.toyPrice}</Text>

          {/* Botões Editar e Excluir */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.buttonEdit} onPress={onEdit}>
              <Ionicons name="pencil" size={15} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDelete} onPress={onDelete}>
              <Ionicons name="trash" size={15} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#c7c7c7',
    padding: 15,
    marginBottom: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#7b2cbf',
    borderRadius: 5,
    padding: 5,
    zIndex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40, // Bordas mais arredondadas para simular o Figma
    marginRight: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Gradiente sutil
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#9747ff',
    marginBottom: 5,
    lineHeight: 16,
  },
  label: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#9747ff',
    marginBottom: 5,
  },
  category: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#9747ff',
    marginBottom: 5,
  },
  price: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: '#7b2cbf',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  buttonEdit: {
    backgroundColor: '#7b2cbf',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: '#7b2cbf',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
  },
});
