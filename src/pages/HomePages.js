import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import ToyCard from '../components/ToyCard';
import AddEditModal from '../components/AddEditModal';
import DeleteModal from '../components/DeleteModal';
import sunIcon from '../../src/assets/Component 3.png';
import api from '../services/api';
import { ToyMobileHook } from '../hooks/ToyMobileHook';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => (
  <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={styles.themeToggle}>
    <Image source={sunIcon} style={styles.themeIcon} />
  </TouchableOpacity>
);

const HomePages = () => {
  const { toyList, setToyList, isLoading, setIsLoading } = ToyMobileHook();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentToy, setCurrentToy] = useState(null);
  const [newToy, setNewToy] = useState({
    toyName: '',
    toyObjective: '',
    toyCondition: '',
    toyPrice: 0,
    toyMultipartFile: null,
    toyImageUri: null, // para preview da imagem local
  });

  const filteredToyList = toyList.filter((toy) =>
    toy.toyName.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'Todos' || toy.toyCondition === filter)
  );

  const handleAddOrEditToy = async () => {
    console.log("batatao")
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('toyName', newToy.toyName);
      formData.append('toyObjective', newToy.toyObjective);
     
       if (newToy.toyMultipartFile && newToy.toyMultipartFile.uri) {
  formData.append('toyMultipartFile', {
    uri: newToy.toyMultipartFile.uri,
    type: newToy.toyMultipartFile.type || 'image/jpeg',
    name: newToy.toyMultipartFile.fileName || 'photo.jpg',
  });
} else {
  console.warn("Nenhuma imagem selecionada.");
}
      
      formData.append('toyCondition', newToy.toyCondition);
      formData.append('toyPrice', newToy.toyPrice);
      formData.append('toyLikes', 0);
      formData.append('toyViews',0);
      formData.append('toyPopularity', 0);
    

      if (currentToy) {
        const response = await api.put(`/toy/update/${currentToy.toyId}`, formData);
        setToyList(toyList.map((toy) => (toy.toyId === currentToy.toyId ? response.data : toy)));
      } else {
        const response = await api.post('/toy/create', formData);
        setToyList([...toyList, response.data]);
      }

      setModalVisible(false);
      setNewToy({
        toyName: '',
        toyObjective: '',
        toyCondition: '',
        toyPrice: 0,
        toyMultipartFile: null,
        toyImageUri: null,
      });
      setCurrentToy(null);
    } catch (error) {
      console.error('Erro ao salvar brinquedo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteToy = async () => {
    try {
      setIsLoading(true);
      await api.delete(`/toy/delete/${currentToy.toyId}`);
      setToyList(toyList.filter((toy) => toy.toyId !== currentToy.toyId));
      setDeleteModalVisible(false);
      setCurrentToy(null);
    } catch (error) {
      console.error('Erro ao deletar brinquedo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeToy = async (toyId) => {
    try {
      const response = await api.put(`/toy/update/${toyId}?like=true`, new FormData());
      setToyList(toyList.map((toy) => (toy.toyId === toyId ? response.data : toy)));
    } catch (error) {
      console.error('Erro ao dar like:', error);
    }
  };

  const handleUnlikeToy = async (toyId) => {
    try {
      const response = await api.put(`/toy/update/${toyId}?unlike=true`, new FormData());
      setToyList(toyList.map((toy) => (toy.toyId === toyId ? response.data : toy)));
    } catch (error) {
      console.error('Erro ao remover like:', error);
    }
  };

  const handleViewToy = async (toyId) => {
    try {
      await api.put(`/toy/update/${toyId}?view=true`, new FormData());
    } catch (error) {
      console.error('Erro ao registrar visualização:', error);
    }
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Header search={search} setSearch={setSearch} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <FilterButtons filter={filter} setFilter={setFilter} />

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Os Melhores</Text>
        <Text style={styles.sectionSubtitle}>Colaborações populares!</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setCurrentToy(null);
            setNewToy({
              toyName: '',
              toyObjective: '',
              toyCondition: '',
              toyPrice: 0,
              toyMultipartFile: null,
              toyImageUri: null,
            });
            setModalVisible(true);
          }}
          disabled={isLoading}
        >
          <Text style={styles.addButtonText}>{isLoading ? 'Carregando...' : '+ Adicionar'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredToyList}
        renderItem={({ item }) => (
          <ToyCard
            toy={item}
            onEdit={() => {
              setCurrentToy(item);
              setNewToy({
                toyName: item.toyName,
                toyObjective: item.toyObjective,
                toyCondition: item.toyCondition,
                toyPrice: item.toyPrice,
                toyMultipartFile: null,
                toyImageUri: null,
              });
              setModalVisible(true);
            }}
            onDelete={() => {
              setCurrentToy(item);
              setDeleteModalVisible(true);
            }}
            onLike={() => handleLikeToy(item.toyId)}
            onUnlike={() => handleUnlikeToy(item.toyId)}
            onView={() => handleViewToy(item.toyId)}
          />
        )}
        keyExtractor={(item) => item.toyId.toString()}
        style={styles.list}
        refreshing={isLoading}
        onRefresh={() => {}}
      />

      <AddEditModal
        visible={modalVisible}
        setVisible={setModalVisible}
        newToy={newToy}
        setNewToy={setNewToy}
        onSave={handleAddOrEditToy}
        isEditing={!!currentToy}
      />
      <DeleteModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onDelete={handleDeleteToy}
        toyName={currentToy?.toyName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, paddingTop: 24 },
  containerLight: { backgroundColor: '#ffffff' },
  containerDark: { backgroundColor: '#1F2937' },
  themeToggle: { position: 'absolute', top: 40, right: 45, zIndex: 1 },
  themeIcon: { width: 40, height: 40 },
  sectionHeader: { marginBottom: 12 },
  sectionTitle: { fontSize: 24, fontWeight: '500', fontFamily: 'Poppins-Medium', color: '#000', marginBottom: 6 },
  textDark: { color: '#ffffff' },
  sectionSubtitle: { fontSize: 10, fontFamily: 'Poppins-Medium', color: '#f20089', opacity: 0.64, marginBottom: 12 },
  addButton: {
    backgroundColor: '#7b2cbf',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 15, fontWeight: '500', fontFamily: 'Poppins-Medium' },
  list: { flex: 1 },
});

export default HomePages;
