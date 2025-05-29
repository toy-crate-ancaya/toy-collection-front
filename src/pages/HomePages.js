import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import FilterButtons from '../components/FilterButtons';
import AddEditModal from '../components/AddEditModal';
import DeleteModal from '../components/DeleteModal';
import ListaToy from '../components/ListaToy'; 

const HomePages = () => {
  const [toys, setToys] = useState([
    {
      id: '1',
      name: 'Tobias',
      description: 'Um brinquedo que serve mais algo que eu não sei',
      category: 'Em Alta',
      price: 'R$ 7,89',
      image: require('../../src/assets/tobias.png'),
    },
    {
      id: '2',
      name: 'Marquinhos',
      description: 'Full mid-tempo funky groove with flute e trombone',
      category: 'Mais Populares',
      price: 'R$ 9,89',
      image: require('../../src/assets/c.png'),
    },
    {
      id: '3',
      name: 'T3ddy',
      description: 'Simplicidade e transparência, procedure administrative',
      category: 'Mais Visitados',
      price: 'R$ 1149,89',
      image: require('../../src/assets/coel.png'),
    },
  ]);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Em Alta');
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentToy, setCurrentToy] = useState(null);
  const [newToy, setNewToy] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    image: null,
  });

  const filteredToys = toys.filter(
    (toy) =>
      toy.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === 'Em Alta' || toy.category === filter)
  );

  const handleAddOrEditToy = () => {
    if (currentToy) {
      setToys(
        toys.map((toy) =>
          toy.id === currentToy.id ? { ...toy, ...newToy } : toy
        )
      );
    } else {
      setToys([...toys, { id: Date.now().toString(), ...newToy }]);
    }
    setModalVisible(false);
    setNewToy({
      name: '',
      description: '',
      category: '',
      price: '',
      image: null,
    });
    setCurrentToy(null);
  };

  const handleCancelModal = () => {
    setModalVisible(false);
    setNewToy({
      name: '',
      description: '',
      category: '',
      price: '',
      image: null,
    });
    setCurrentToy(null);
  };

  const handleDeleteToy = () => {
    setToys(toys.filter((toy) => toy.id !== currentToy.id));
    setDeleteModalVisible(false);
    setCurrentToy(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Header search={search} setSearch={setSearch} />
      <FilterButtons filter={filter} setFilter={setFilter} />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setCurrentToy(null);
          setNewToy({
            name: '',
            description: '',
            category: '',
            price: '',
            image: null,
          });
          setModalVisible(true);
        }}
      >
        <Image
          source={require('../../src/assets/circulo-de-historia-retangular-mais 1.png')}
          style={styles.addIcon}
        />
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      {/* ✅ Substitui os cards por ListaToy */}
      <ListaToy
        brinquedos={filteredToys}
        onEdit={(toy) => {
          setCurrentToy(toy);
          setNewToy(toy);
          setModalVisible(true);
        }}
        onDelete={(toy) => {
          setCurrentToy(toy);
          setDeleteModalVisible(true);
        }}
      />

      {modalVisible && (
        <AddEditModal
          toyData={newToy}
          setToyData={setNewToy}
          onSave={handleAddOrEditToy}
          onCancel={handleCancelModal}
        />
      )}

      <DeleteModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onDelete={handleDeleteToy}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  addIcon: {
    width: 25,
    height: 25,
    marginRight: 2,
    resizeMode: 'contain',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7b2cbf',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
    width: 200,
    height: 55,
    marginTop: 20,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default HomePages;
