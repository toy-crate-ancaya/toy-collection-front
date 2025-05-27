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
  const { toyList, setToyList, isLoading, setIsLoading, getMyListToys } = ToyMobileHook();
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

  const filteredToyList = toyList.filter((toy) => {
    // Primeiro aplica o filtro de busca por nome
    const matchesSearch = toy.toyName.toLowerCase().includes(search.toLowerCase());

    // Depois aplica os filtros de categoria
    let matchesFilter = true;
    switch (filter) {
      case 'Em Alta':
        matchesFilter = (toy.toyLikes || 0) > 5; // Brinquedos com mais de 5 likes
        break;
      case 'Mais Populares':
        matchesFilter = (toy.toyPopularity || 0) > 7; // Brinquedos com popularidade maior que 7
        break;
      case 'Mais Visitados':
        matchesFilter = (toy.toyViews || 0) > 10; // Brinquedos com mais de 10 visualizações
        break;
      default:
        matchesFilter = true; // Caso 'Todos', não aplica filtro adicional
    }

    return matchesSearch && matchesFilter;
  });

  // Ordena a lista filtrada
  const sortedToyList = [...filteredToyList].sort((a, b) => {
    switch (filter) {
      case 'Em Alta':
        return (b.toyLikes || 0) - (a.toyLikes || 0);
      case 'Mais Populares':
        return (b.toyPopularity || 0) - (a.toyPopularity || 0);
      case 'Mais Visitados':
        return (b.toyViews || 0) - (a.toyViews || 0);
      default:
        return 0; // Mantém a ordem original
    }
  });

  const handleAddOrEditToy = async () => {
    try {
      // Validações básicas
      if (!newToy.toyName.trim()) {
        alert('O nome do brinquedo é obrigatório');
        return;
      }
      if (!newToy.toyObjective.trim()) {
        alert('O objetivo do brinquedo é obrigatório');
        return;
      }
      if (!newToy.toyCondition) {
        alert('A condição do brinquedo é obrigatória');
        return;
      }
      if (!newToy.toyPrice || newToy.toyPrice <= 0) {
        alert('O preço do brinquedo deve ser maior que zero');
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      
      // Garantindo que os dados são strings
      formData.append('toyName', String(newToy.toyName).trim());
      formData.append('toyObjective', String(newToy.toyObjective).trim());
      formData.append('toyCondition', String(newToy.toyCondition));
      formData.append('toyPrice', String(newToy.toyPrice));
      formData.append('toyLikes', '0');
      formData.append('toyViews', '0');
      formData.append('toyPopularity', '0');
      
      // Adicionando a imagem se existir
      if (newToy.toyMultipartFile && newToy.toyMultipartFile.uri) {
        const imageFile = {
          uri: newToy.toyMultipartFile.uri,
          type: newToy.toyMultipartFile.type || 'image/jpeg',
          name: newToy.toyMultipartFile.fileName || 'image.jpg'
        };
        formData.append('toyMultipartFile', imageFile);
      }

      console.log('FormData sendo enviado:', formData);

      if (currentToy) {
        await api.put(`/toy/update/${currentToy.toyId}`, formData);
        await getMyListToys(); // Atualiza a lista após editar
        alert('Brinquedo atualizado com sucesso!');
      } else {
        await api.post('/toy/create', formData);
        await getMyListToys(); // Atualiza a lista após criar
        alert('Brinquedo criado com sucesso!');
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
      console.error('Erro detalhado ao salvar brinquedo:', error);
      console.error('Resposta do servidor:', error.response?.data);
      alert(`Erro ao ${currentToy ? 'atualizar' : 'criar'} brinquedo: ${error.response?.data?.message || error.message || 'Erro desconhecido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteToy = async () => {
    try {
      setIsLoading(true);
      await api.delete(`/toy/delete/${currentToy.toyId}`);
      await getMyListToys(); // Atualiza a lista após deletar
      setDeleteModalVisible(false);
      setCurrentToy(null);
    } catch (error) {
      console.error('Erro ao deletar brinquedo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewToy = async (toyId) => {
    try {
      const currentToyData = toyList.find(toy => toy.toyId === toyId);
      if (!currentToyData) return;

      const formData = new FormData();
      formData.append('toyName', currentToyData.toyName);
      formData.append('toyObjective', currentToyData.toyObjective);
      formData.append('toyCondition', currentToyData.toyCondition);
      formData.append('toyPrice', String(currentToyData.toyPrice));

      console.log('Enviando dados de visualização:', { toyId, formData });
      const response = await api.put(`/toy/update/${toyId}?view=true`, formData);
      console.log('Resposta da visualização:', response.data);
      await getMyListToys();
    } catch (error) {
      console.error('Erro ao registrar visualização:', error);
      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
      }
    }
  };

  const handleLikeToy = async (toyId) => {
    try {
      const currentToyData = toyList.find(toy => toy.toyId === toyId);
      if (!currentToyData) return;

      const formData = new FormData();
      formData.append('toyName', currentToyData.toyName);
      formData.append('toyObjective', currentToyData.toyObjective);
      formData.append('toyCondition', currentToyData.toyCondition);
      formData.append('toyPrice', String(currentToyData.toyPrice));

      console.log('Enviando dados de like:', { toyId, formData });
      const response = await api.put(`/toy/update/${toyId}?like=true`, formData);
      console.log('Resposta do like:', response.data);
      
      // Atualiza a lista imediatamente
      const updatedToyList = toyList.map(toy => {
        if (toy.toyId === toyId) {
          return {
            ...toy,
            toyLikes: (toy.toyLikes || 0) + 1,
            toyPopularity: (toy.toyPopularity || 0) + 1
          };
        }
        return toy;
      });
      setToyList(updatedToyList);
      
      // Atualiza com o servidor
      await getMyListToys();
    } catch (error) {
      console.error('Erro ao dar like:', error);
      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
      }
    }
  };

  const handleUnlikeToy = async (toyId) => {
    try {
      const currentToyData = toyList.find(toy => toy.toyId === toyId);
      if (!currentToyData) return;

      const formData = new FormData();
      formData.append('toyName', currentToyData.toyName);
      formData.append('toyObjective', currentToyData.toyObjective);
      formData.append('toyCondition', currentToyData.toyCondition);
      formData.append('toyPrice', String(currentToyData.toyPrice));

      console.log('Enviando dados de unlike:', { toyId, formData });
      const response = await api.put(`/toy/update/${toyId}?unlike=true`, formData);
      console.log('Resposta do unlike:', response.data);
      
      // Atualiza a lista imediatamente
      const updatedToyList = toyList.map(toy => {
        if (toy.toyId === toyId) {
          return {
            ...toy,
            toyLikes: Math.max(0, (toy.toyLikes || 0) - 1),
            toyPopularity: Math.max(0, (toy.toyPopularity || 0) - 1)
          };
        }
        return toy;
      });
      setToyList(updatedToyList);
      
      // Atualiza com o servidor
      await getMyListToys();
    } catch (error) {
      console.error('Erro ao remover like:', error);
      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
      }
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
        data={sortedToyList}
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
        onRefresh={getMyListToys}
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
