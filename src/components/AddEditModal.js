import React from 'react';
import { 
  Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddEditModal = ({ visible, setVisible, newToy, setNewToy, onSave, isEditing }) => {

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

   const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  quality: 1,
  allowsEditing: true,
  aspect: [4, 3],
});

if (!result.canceled) {
  const asset = result.assets[0];
  setNewToy({
    ...newToy,
    toyMultipartFile: {
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      fileName: asset.fileName || asset.uri.split('/').pop(),
    },
    toyImageUri: asset.uri,
  });
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

              <TouchableOpacity style={styles.buttonSave} onPress={onSave}>
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
