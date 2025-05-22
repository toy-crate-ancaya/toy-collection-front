import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddEditModal = ({ visible, setVisible, newToy, setNewToy, onSave }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar / Adicionar Brinquedo</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Nome"
            value={newToy.name}
            onChangeText={text => setNewToy({ ...newToy, name: text })}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Descrição"
            value={newToy.description}
            onChangeText={text => setNewToy({ ...newToy, description: text })}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Categoria"
            value={newToy.category}
            onChangeText={text => setNewToy({ ...newToy, category: text })}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Preço"
            value={newToy.price}
            onChangeText={text => setNewToy({ ...newToy, price: text })}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={onSave}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '85%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontFamily: 'Poppins-Regular',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#7b2cbf',
  },
  cancelButton: {
    backgroundColor: '#9CA3AF',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});

export default AddEditModal;