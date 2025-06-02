import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import Header from "../components/Header";
import FilterButtons from "../components/FilterButtons";
import AddEditModal from "../components/AddEditModal";
import DeleteModal from "../components/DeleteModal";
import ListaToy from "../components/ListaToy.js";
import sunIcon from "../../src/assets/Component 3.png";
import api from "../services/api";
import { ToyMobileHook } from "../hooks/ToyMobileHook";

// Componente ThemeToggle
// const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => (
//   // <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)} style={styles.themeToggle}>
//   //   <Image source={sunIcon} style={styles.themeIcon} />
//   // </TouchableOpacity>
// );

const HomePages = () => {
  const { toyList, setToyList, isLoading, setIsLoading, getMyListToys } = ToyMobileHook();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentToy, setCurrentToy] = useState(null);
  const [newToy, setNewToy] = useState({
    toyName: "",
    toyObjective: "",
    toyCondition: "",
    toyPrice: 0,
    toyMultipartFile: null,
    toyImageUri: null,
  });

  // Adicionando log para verificar toyList
  console.log("toyList in HomePages:", toyList);

  // Filtragem com validação
  const filteredToyList = toyList.filter((toy) => {
    if (!toy || !toy.toyName) {
      console.error("Toy inválido encontrado:", toy);
      return false;
    }
    const matchesSearch = toy.toyName.toLowerCase().includes(search.toLowerCase());
    let matchesFilter = true;
    switch (filter) {
      case "Em Alta":
        matchesFilter = (toy.toyLikes || 0) > 5;
        break;
      case "Mais Populares":
        matchesFilter = (toy.toyPopularity || 0) > 7;
        break;
      case "Mais Visitados":
        matchesFilter = (toy.toyViews || 0) > 10;
        break;
      default:
        matchesFilter = true;
    }
    return matchesSearch && matchesFilter;
  });

  const sortedToyList = filteredToyList.length > 0 
    ? [...filteredToyList].sort((a, b) => {
        switch (filter) {
          case "Em Alta":
            return (b.toyLikes || 0) - (a.toyLikes || 0);
          case "Mais Populares":
            return (b.toyPopularity || 0) - (a.toyPopularity || 0);
          case "Mais Visitados":
            return (b.toyViews || 0) - (a.toyViews || 0);
          default:
            return 0;
        }
      })
    : [];

  // Função para adicionar ou editar brinquedo
  const handleAddOrEditToy = async () => {
    try {
      if (!newToy.toyName.trim()) {
        alert("O nome do brinquedo é obrigatório");
        return;
      }
      if (!newToy.toyObjective.trim()) {
        alert("O objetivo do brinquedo é obrigatório");
        return;
      }
      if (!newToy.toyCondition) {
        alert("A condição do brinquedo é obrigatória");
        return;
      }
      if (!newToy.toyPrice || newToy.toyPrice <= 0) {
        alert("O preço do brinquedo deve ser maior que zero");
        return;
      }

      setIsLoading(true);
      const formData = new FormData();
      formData.append("toyName", String(newToy.toyName).trim());
      formData.append("toyObjective", String(newToy.toyObjective).trim());
      formData.append("toyCondition", String(newToy.toyCondition));
      formData.append("toyPrice", String(newToy.toyPrice));
      formData.append("toyLikes", "0");
      formData.append("toyViews", "0");
      formData.append("toyPopularity", "0");

      if (newToy.toyMultipartFile && newToy.toyMultipartFile.uri) {
        const imageFile = {
          uri: newToy.toyMultipartFile.uri,
          type: newToy.toyMultipartFile.type || "image/jpeg",
          name: newToy.toyMultipartFile.fileName || "image.jpg",
        };
        formData.append("toyMultipartFile", imageFile);
      }

      if (currentToy) {
        await api.put(`/toy/update/${currentToy.toyId}`, formData);
        await getMyListToys();
        alert("Brinquedo atualizado com sucesso!");
      } else {
        await api.post("/toy/create", formData);
        await getMyListToys();
        alert("Brinquedo criado com sucesso!");
      }

      setModalVisible(false);
      setNewToy({
        toyName: "",
        toyObjective: "",
        toyCondition: "",
        toyPrice: 0,
        toyMultipartFile: null,
        toyImageUri: null,
      });
      setCurrentToy(null);
    } catch (error) {
      console.error("Erro ao salvar brinquedo:", error);
      alert(`Erro ao ${currentToy ? "atualizar" : "criar"} brinquedo: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para deletar brinquedo
  const handleDeleteToy = async () => {
    try {
      if (!currentToy || !currentToy.toyId) {
        alert("Nenhum brinquedo selecionado para deletar");
        return;
      }
      setIsLoading(true);
      await api.delete(`/toy/delete/${currentToy.toyId}`);
      await getMyListToys();
      setDeleteModalVisible(false);
      setCurrentToy(null);
    } catch (error) {
      console.error("Erro ao deletar brinquedo:", error);
      alert("Erro ao deletar brinquedo");
    } finally {
      setIsLoading(false);
    }
  };

  // Funções de interação
  const handleViewToy = async (toyId) => {
    try {
      const currentToyData = toyList.find((toy) => toy && toy.toyId === toyId);
      if (!currentToyData) {
        console.error("Brinquedo não encontrado para visualização:", toyId);
        return;
      }

      const formData = new FormData();
      formData.append("toyName", currentToyData.toyName);
      formData.append("toyObjective", currentToyData.toyObjective);
      formData.append("toyCondition", currentToyData.toyCondition);
      formData.append("toyPrice", String(currentToyData.toyPrice));

      await api.put(`/toy/update/${toyId}?view=true`, formData);
      await getMyListToys();
    } catch (error) {
      console.error("Erro ao registrar visualização:", error);
    }
  };

  const handleLikeToy = async (toyId) => {
    try {
      const currentToyData = toyList.find((toy) => toy && toy.toyId === toyId);
      if (!currentToyData) {
        console.error("Brinquedo não encontrado para like:", toyId);
        return;
      }

      const formData = new FormData();
      formData.append("toyName", currentToyData.toyName);
      formData.append("toyObjective", currentToyData.toyObjective);
      formData.append("toyCondition", currentToyData.toyCondition);
      formData.append("toyPrice", String(currentToyData.toyPrice));

      await api.put(`/toy/update/${toyId}?like=true`, formData);
      setToyList(
        toyList.map((toy) =>
          toy && toy.toyId === toyId
            ? {
                ...toy,
                toyLikes: (toy.toyLikes || 0) + 1,
                toyPopularity: (toy.toyPopularity || 0) + 1,
              }
            : toy
        )
      );
      await getMyListToys();
    } catch (error) {
      console.error("Erro ao dar like:", error);
    }
  };

  const handleUnlikeToy = async (toyId) => {
    try {
      const currentToyData = toyList.find((toy) => toy && toy.toyId === toyId);
      if (!currentToyData) {
        console.error("Brinquedo não encontrado para unlike:", toyId);
        return;
      }

      const formData = new FormData();
      formData.append("toyName", currentToyData.toyName);
      formData.append("toyObjective", currentToyData.toyObjective);
      formData.append("toyCondition", currentToyData.toyCondition);
      formData.append("toyPrice", String(currentToyData.toyPrice));

      await api.put(`/toy/update/${toyId}?unlike=true`, formData);
      setToyList(
        toyList.map((toy) =>
          toy && toy.toyId === toyId
            ? {
                ...toy,
                toyLikes: Math.max(0, (toy.toyLikes || 0) - 1),
                toyPopularity: Math.max(0, (toy.toyPopularity || 0) - 1),
              }
            : toy
        )
      );
      await getMyListToys();
    } catch (error) {
      console.error("Erro ao remover like:", error);
    }
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.containerDark : styles.containerLight]}>
      {/* <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /> */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <Header search={search} setSearch={setSearch} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <FilterButtons filter={filter} setFilter={setFilter} />
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Os Melhores</Text>
          <Text style={styles.sectionSubtitle}>Colaborações populares!</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setCurrentToy(null);
            setNewToy({
              toyName: "",
              toyObjective: "",
              toyCondition: "",
              toyPrice: 0,
              toyMultipartFile: null,
              toyImageUri: null,
            });
            setModalVisible(true);
          }}
          disabled={isLoading}
        >
          <Image
            source={require("../../src/assets/circulo-de-historia-retangular-mais 1.png")}
            style={styles.addIcon}
          />
          <Text style={styles.addButtonText}>{isLoading ? "Carregando..." : "Adicionar"}</Text>
        </TouchableOpacity>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={[styles.noDataText, isDarkMode && styles.textDark]}>
              Carregando brinquedos...
            </Text>
          </View>
        ) : sortedToyList.length > 0 ? (
          <ListaToy
            brinquedos={sortedToyList}
            onEdit={(toy) => {
              if (!toy || !toy.toyName) {
                console.error("Toy inválido para edição:", toy);
                return;
              }
              setCurrentToy(toy);
              setNewToy({
                toyName: toy.toyName,
                toyObjective: toy.toyObjective || "",
                toyCondition: toy.toyCondition || "",
                toyPrice: toy.toyPrice || 0,
                toyMultipartFile: null,
                toyImageUri: toy.toyFileUrl || null,
              });
              setModalVisible(true);
            }}
            onDelete={(toy) => {
              if (!toy || !toy.toyName) {
                console.error("Toy inválido para deleção:", toy);
                return;
              }
              setCurrentToy(toy);
              setDeleteModalVisible(true);
            }}
            onLike={handleLikeToy}
            onUnlike={handleUnlikeToy}
            onView={handleViewToy}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.noDataText, isDarkMode && styles.textDark]}>
              Nenhum brinquedo disponível.
            </Text>
          </View>
        )}
      </ScrollView>
      <AddEditModal
        visible={modalVisible}
        setVisible={setModalVisible}
        newToy={newToy}
        setNewToy={setNewToy}
        onSave={handleAddOrEditToy}
        onCancel={() => setModalVisible(false)}
        isEditing={!!currentToy}
      />
      <DeleteModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onDelete={handleDeleteToy}
        toyName={currentToy?.toyName || ""}
      />
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  containerLight: {
    backgroundColor: '#ffffff',
  },
  containerDark: {
    backgroundColor: '#1F2937',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 45,
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
  textDark: {
    color: '#ffffff',
  },
  sectionSubtitle: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: '#f20089',
    opacity: 0.64,
    marginBottom: 12,
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
    resizeMode: 'contain',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noDataText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
});

export default HomePages;