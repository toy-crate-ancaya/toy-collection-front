import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DeleteModal = ({ visible, setVisible, onDelete }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.blurOverlay}>
        <View style={styles.modal}>
          <Text style={styles.textModal}>Tem certeza que deseja excluir este item?</Text>
          <View style={styles.containerButton}>
            <TouchableOpacity onPress={() => setVisible(false)} style={[styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancelar</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={[styles.deleteButton]}>
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    elevation: 5,
    alignItems: 'center',
  },
  textModal: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 30,
  },
  cancelButton: {
    backgroundColor: 'black',
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#EF233C',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 26,
    paddingVertical: 10,
  },
});

export default DeleteModal;