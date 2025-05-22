import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Header from '../components/Header'; // Verify: exports default Header
import FilterButtons from '../components/FilterButtons'; // Verify: exports default FilterButtons
import ToyCard from '../components/ToyCard'; // Verify: exports default ToyCard
import AddEditModal from '../components/AddEditModal'; // Verify: exports default AddEditModal
import DeleteModal from '../components/DeleteModal'; 

import tobiasImg from '../../src/assets/img1.png'; // Verify path exists
import marquinhosImg from '../../src/assets/img.png'; // Verify path exists
import t3ddyImg from '../../src/assets/image 15.png'; // Verify path exists
import sunIcon from '../../src/assets/Component 3.png'; // Verify path exists

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={styles.themeToggle}>
      <Image source={sunIcon} style={styles.themeIcon} />
    </TouchableOpacity>
  );
};

const HomePages = () => {
  const [toys, setToys] = useState([
    {
      id: '1',
      name: 'Tobias',
      description: 'Um trique que faz algo que eu não sei pra que serve mais sei que é pra algo',
      category: 'Pelúcia',
      price: 'R$ 7,99',
      image: tobiasImg,
    },
    {
      id: '2',
      name: 'Marquinhos',
      description: 'Full mid-tempo funk groove with flute, trombone & crazy horn breaks',
      category: 'Carrinhos',
      price: 'R$ 3.319,99',
      image: marquinhosImg,
    },
    {
      id: '3',
      name: 'T3ddy',
      description: 'Simplicidade e transparência proporcionando o melhor',
      category: 'Pelúcia',
      price: 'R$ 1.149,99',
      image: t3ddyImg,
    },
  ]);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentToy, setCurrentToy] = useState(null);
  const [newToy, setNewToy] = useState({ name: '', description: '', category: '', price: '', image: null });

  const filteredToys = toys.filter(toy =>
    toy.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'Todos' || toy.category === filter)
  );

  const handleAddOrEditToy = () => {
    if (currentToy) {
      setToys(toys.map(toy => (toy.id === currentToy.id ? { ...toy, ...newToy } : toy)));
    } else {
      setToys([...toys, { id: Date.now().toString(), ...newToy }]);
    }
    setModalVisible(false);
    setNewToy({ name: '', description: '', category: '', price: '', image: null });
    setCurrentToy(null);
  };

  const handleDeleteToy = () => {
    setToys(toys.filter(toy => toy.id !== currentToy.id));
    setDeleteModalVisible(false);
    setCurrentToy(null);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Header search={search} setSearch={setSearch} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Os Melhores</Text>
        <Text style={styles.sectionSubtitle}>Colaborações populares!</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredToys}
        renderItem={({ item }) => (
          <ToyCard
            toy={item}
            onEdit={() => {
              setCurrentToy(item);
              setNewToy(item);
              setModalVisible(true);
            }}
            onDelete={() => {
              setCurrentToy(item);
              setDeleteModalVisible(true);
            }}
          />
        )}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <AddEditModal
        visible={modalVisible}
        setVisible={setModalVisible}
        newToy={newToy}
        setNewToy={setNewToy}
        onSave={handleAddOrEditToy}
      />

      <DeleteModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onDelete={handleDeleteToy}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 24,
  },
  containerLight: {
    backgroundColor: '#ffffff',
  },
  containerDark: {
    backgroundColor: '#1F2937',
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 15,
    zIndex: 1,
  },
  themeIcon: {
    width: 40,
    height: 40,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#f20089',
    opacity: 0.64,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#7b2cbf',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  list: {
    flex: 1,
  },
});

export default HomePages;