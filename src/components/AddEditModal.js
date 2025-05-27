import React from 'react';
import { 
  Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddEditModal = ({ visible, setVisible, newToy, setNewToy, onSave, isEditing }) => {

  const handleImagePick = async () => {
    try {
      console.log('Iniciando seleção de imagem...');
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log('Status da permissão:', status);
      
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Permissão para acessar a galeria é necessária!');
        return;
      }

      console.log('Abrindo seletor de imagem...');
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
        maxWidth: 1000,
        maxHeight: 1000,
      });

      console.log('Resultado da seleção:', result);

      if (!result.canceled) {
        const asset = result.assets[0];
        console.log('Asset selecionado:', asset);
        
        try {
          console.log('Iniciando fetch da imagem...');
          const response = await fetch(asset.uri);
          console.log('Response do fetch:', response);
          
          console.log('Convertendo para blob...');
          const blob = await response.blob();
          console.log('Tamanho do blob:', blob.size);
          
          const fileSize = blob.size;
          
          if (fileSize > 5 * 1024 * 1024) {
            Alert.alert(
              'Arquivo muito grande',
              'Por favor, selecione uma imagem menor que 5MB'
            );
            return;
          }

          const fileExtension = asset.uri.split('.').pop()?.toLowerCase();
          console.log('Extensão do arquivo:', fileExtension);
          
          const allowedExtensions = ['jpg', 'jpeg', 'png'];

          if (!allowedExtensions.includes(fileExtension)) {
            Alert.alert(
              'Formato inválido',
              'Por favor, selecione uma imagem no formato JPG ou PNG'
            );
            return;
          }

          console.log('Atualizando estado do newToy...');
          const newToyData = {
            ...newToy,
            toyMultipartFile: {
              uri: asset.uri,
              type: `image/${fileExtension}`,
              fileName: `toy_image_${Date.now()}.${fileExtension}`,
            },
            toyImageUri: asset.uri,
          };
          console.log('Novo estado do toyMultipartFile:', newToyData.toyMultipartFile);
          
          setNewToy(newToyData);
          console.log('Estado atualizado com sucesso');
          
        } catch (blobError) {
          console.error('Erro ao processar blob:', blobError);
          Alert.alert(
            'Erro no processamento',
            'Não foi possível processar a imagem selecionada'
          );
        }
      } else {
        console.log('Seleção cancelada pelo usuário');
      }
    } catch (error) {
      console.error('Erro detalhado na seleção de imagem:', error);
      console.error('Stack trace:', error.stack);
      Alert.alert(
        'Erro',
        'Não foi possível selecionar a imagem. Detalhes: ' + error.message
      );
    }
  };

  const handleSave = () => {
    try {
      console.log('Iniciando validações para salvar...');
      console.log('Estado atual do newToy:', newToy);
      
      if (!newToy.toyName?.trim()) {
        Alert.alert('Erro', 'O nome do brinquedo é obrigatório');
        return;
      }
      if (!newToy.toyObjective?.trim()) {
        Alert.alert('Erro', 'O objetivo do brinquedo é obrigatório');
        return;
      }
      if (!newToy.toyCondition?.trim()) {
        Alert.alert('Erro', 'A condição do brinquedo é obrigatória');
        return;
      }
      if (!newToy.toyPrice || newToy.toyPrice <= 0) {
        Alert.alert('Erro', 'O preço deve ser maior que zero');
        return;
      }
      if (!isEditing && !newToy.toyMultipartFile) {
        Alert.alert('Erro', 'Por favor, selecione uma imagem');
        return;
      }

      console.log('Todas as validações passaram, chamando onSave...');
      onSave();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      Alert.alert(
        'Erro ao salvar',
        'Ocorreu um erro ao tentar salvar o brinquedo: ' + error.message
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.title}>{isEditing ? 'Editar Brinquedo' : 'Adicionar Brinquedo'}</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={newToy.toyName}
              onChangeText={(text) => setNewToy({ ...newToy, toyName: text })}
              placeholder="Nome do brinquedo"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Objetivo</Text>
            <TextInput
              style={styles.input}
              value={newToy.toyObjective}
              onChangeText={(text) => setNewToy({ ...newToy, toyObjective: text })}
              placeholder="Objetivo do brinquedo"
              placeholderTextColor="#999"
              multiline
            />

            <Text style={styles.label}>Condição</Text>
            <TextInput
              style={styles.input}
              value={newToy.toyCondition}
              onChangeText={(text) => setNewToy({ ...newToy, toyCondition: text })}
              placeholder="Condição (ex: Novo, Usado)"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Preço</Text>
            <TextInput
              style={styles.input}
              value={newToy.toyPrice?.toString()}
              onChangeText={(text) => setNewToy({ ...newToy, toyPrice: Number(text) })}
              placeholder="Preço"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
              <Text style={styles.imagePickerText}>
                {newToy.toyImageUri ? 'Alterar Imagem' : 'Selecionar Imagem'}
              </Text>
            </TouchableOpacity>

            {newToy.toyImageUri && (
              <Image
                source={{ uri: newToy.toyImageUri }}
                style={styles.previewImage}
                resizeMode="contain"
              />
            )}

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.buttonCancel} onPress={() => setVisible(false)}>
                <Text style={styles.buttonCancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
                <Text style={styles.buttonSaveText}>{isEditing ? 'Salvar' : 'Adicionar'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '90%',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  imagePicker: {
    backgroundColor: '#7b2cbf',
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 15,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: 180,
    marginBottom: 20,
    borderRadius: 6,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonCancel: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 14,
    backgroundColor: '#ccc',
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonCancelText: {
    color: '#444',
    fontWeight: '600',
  },
  buttonSave: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 14,
    backgroundColor: '#7b2cbf',
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonSaveText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default AddEditModal;
