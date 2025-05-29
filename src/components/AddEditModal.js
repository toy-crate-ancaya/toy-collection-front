import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const AddEditModal = ({ visible, toyData, setToyData, onSave, onCancel }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {toyData?.id ? 'Editar Item' : 'Adicionar Item'}
            </Text>
            <TouchableOpacity onPress={onCancel} style={styles.buttonClose}>
              <Text style={styles.x1}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Conteúdo do formulário */}
          <View style={styles.content}>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={toyData.name}
                onChangeText={text => setToyData({ ...toyData, name: text })}
                placeholder="Nome"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.inputSmall]}>
                <Text style={styles.label}>Preço</Text>
                <TextInput
                  style={styles.input}
                  value={toyData.price}
                  onChangeText={text => setToyData({ ...toyData, price: text })}
                  placeholder="R$ 0,00"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, styles.inputSmall]}>
                <Text style={styles.label}>Categoria</Text>
                <TextInput
                  style={styles.input}
                  value={toyData.category}
                  onChangeText={text => setToyData({ ...toyData, category: text })}
                  placeholder="Categoria"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={[styles.inputGroup, styles.inputSmall]}>
                <Text style={styles.label}>Condição</Text>
                <TextInput
                  style={styles.input}
                  value={toyData.condition}
                  onChangeText={text => setToyData({ ...toyData, condition: text })}
                  placeholder="Condição"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={toyData.description}
                onChangeText={text => setToyData({ ...toyData, description: text })}
                placeholder="Descrição"
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Botões */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity style={styles.buttonSave} onPress={onSave}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCancel} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    // backdropFilter não existe no RN, ignorar ou usar lib externa
  },
  modalContainer: {
    width: 320,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(111, 178, 246, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  buttonClose: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  x1: {
    fontSize: 18,
    color: '#000',
  },

  content: {
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 4,
  },
  input: {
    height: 35,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#000',
  },
  textArea: {
    height: 80,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputSmall: {
    width: 90,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonSave: {
    flex: 1,
    backgroundColor: '#7bb8f7',
    paddingVertical: 10,
    borderRadius: 6,
    marginRight: 10,
    alignItems: 'center',
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: '#7bb8f7',
    paddingVertical: 10,
    borderRadius: 6,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#4e00000',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
});

export default AddEditModal;
