import { createContext, useEffect, useState } from "react";
import api from "../../services/api";
import { Text, View } from "react-native";

const ToyMobileContext = createContext();

export function ToyMobileProvider({ children }) {
  const [toyList, setToyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMyListToys = async () => {
    try {
      setIsLoading(true);
      const responseMobile = await api.get("/toy/list");
      console.log("Resposta da API /toy/list:", responseMobile.data);
      // Valida se a resposta é um array
      if (!Array.isArray(responseMobile.data)) {
        console.error("Resposta da API não é um array:", responseMobile.data);
        setToyList([]);
        return;
      }
      // Valida se cada item tem toyName
      const validToys = responseMobile.data.filter(
        (toy) => toy && typeof toy.toyName === "string"
      );
      console.log("Lista de brinquedos válidos:", validToys);
      setToyList(validToys);
    } catch (e) {
      console.error("Erro ao buscar brinquedos:", e.message);
      setToyList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyListToys();
  }, []);

  return (
    <ToyMobileContext.Provider value={{ toyList, setToyList, isLoading, setIsLoading, getMyListToys }}>
      {isLoading && (
        <View
          style={{
            position: "absolute",
            zIndex: 1000,
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Carregando...</Text>
        </View>
      )}
      {children}
    </ToyMobileContext.Provider>
  );
}

export default ToyMobileContext;