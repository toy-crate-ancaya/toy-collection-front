
import React from 'react'
import { ToyMobileProvider } from '../context/ToyMobileContext/ToyMobileContext'

export default function ToyMobileProviders({ children }) {
    return (
        <ToyMobileProvider>
            {children}
        </ToyMobileProvider>

    )
}
