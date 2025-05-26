import { createContext, useEffect, useState } from "react";
import api from "../../services/api";
import { Text, View } from "react-native";

const ToyMobileContext = createContext()

export function ToyMobileProvider({ children }) {

    const [toyList, setToyList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getMyListToys = async () => {
        try {
            setIsLoading(true)
            const responseMobile = await api.get("/toy/list")
            console.log(responseMobile.data)
            setToyList(responseMobile.data)
        }
        catch (e) {
            console.log("Alguma coisa deu errado pegando os brinquedos :/ " + e)
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getMyListToys()
    }, [])

    return (
        <ToyMobileContext.Provider value={{ toyList, setToyList, isLoading, setIsLoading }}>
            {isLoading && <View style={{ 
                    display: 'flex',
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    color: 'white' }}>
                <Text>Carregando...</Text>

            </View>
            }
            {children}
        </ToyMobileContext.Provider>
    )

}
export default ToyMobileContext;