import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ToyCard({ toy, onEdit, onDelete, onLike, onUnlike, onView }) {
  if (!toy || !toy.toyName) {
    console.error('Toy inválido recebido:', toy);
    return null;
  }

  const handleCardPress = () => {
    if (onView) onView();
  };
  
  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.cardContainer}>
        {/* Botões de interação no canto superior direito */}
        <View style={styles.actionButtons}>
          {/* Botão de Like */}
          <TouchableOpacity style={styles.actionButton} onPress={onLike}>
            <Ionicons 
              name="heart" 
              size={20} 
              color="#ff4b6e"
            />
            <Text style={styles.actionText}>{toy.toyLikes || 0}</Text>
          </TouchableOpacity>

          {/* Botão de Unlike */}
          <TouchableOpacity style={styles.actionButton} onPress={onUnlike}>
            <Ionicons 
              name="heart-dislike" 
              size={20} 
              color="#666"
            />
          </TouchableOpacity>

          {/* Visualizações */}
          <View style={styles.actionButton}>
            <Ionicons name="eye-outline" size={20} color="#7b2cbf" />
            <Text style={styles.actionText}>{toy.toyViews || 0}</Text>
          </View>

          {/* Popularidade */}
          <View style={styles.actionButton}>
            <Ionicons name="star-outline" size={20} color="#7b2cbf" />
            <Text style={styles.actionText}>{toy.toyPopularity || 0}</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Imagem do brinquedo */}
          <View style={styles.imageWrapper}>
            <Image 
              source={{uri: toy.toyFileUrl || 'https://via.placeholder.com/80'}}
              style={styles.image}
              resizeMode="cover"
              onError={(e) => console.log('Erro ao carregar imagem:', e.nativeEvent.error)}
              onLoad={() => console.log('Imagem carregada com sucesso')}
            />
          </View>

          {/* Informações do brinquedo */}
          <View style={styles.info}>
            <Text style={styles.name}>{toy.toyName}</Text>
            <Text style={styles.description} numberOfLines={2}>{toy.toyObjective || 'Sem descrição'}</Text>
            <Text style={styles.label}>Novo</Text>
            <Text style={styles.category}>{toy.toyCondition || 'Não especificado'}</Text>
            <Text style={styles.price}>R$ {toy.toyPrice || 0}</Text>

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
    </TouchableOpacity>
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
    marginBottom: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionText: {
    fontSize: 12,
    color: '#7b2cbf',
    fontFamily: 'Poppins-Medium',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginRight: 15,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
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
