import { useContext } from "react"
import ToyMobileContext from "../context/ToyMobileContext/ToyMobileContext"

export const ToyMobileHook = ()=>{
    return useContext(ToyMobileContext)
}