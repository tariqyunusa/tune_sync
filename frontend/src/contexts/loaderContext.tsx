import React, {createContext, useContext, useState} from 'react'

interface loaderContext {
    loading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<any>>
}
const LoaderContext = createContext<loaderContext | undefined>(undefined)

export const LoaderProvider = ({children} : any) => {
    const [loading, setIsLoading] = useState(false)


    return(
        <LoaderContext.Provider value={{loading, setIsLoading}} >
            {children}
        </LoaderContext.Provider>
    )

}

export const useLoaderContext = () => {
    const context = useContext(LoaderContext)
    if(!context) {
        throw new Error("useLoaderContext must be used within a LoaderProvider")
    }
    return context
}