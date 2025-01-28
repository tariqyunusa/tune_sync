import React, { createContext, useContext, useState } from "react";

interface SongContextType {
    songs: any[];
    setSongs: React.Dispatch<React.SetStateAction<any[]>>;
    playListName: any;
    setPlaylistName: React.Dispatch<React.SetStateAction<any>>;
}

const songContext = createContext<SongContextType | undefined>(undefined);

export const SongsProvider = ({children} : any) => {
    const [songs, setSongs] = useState<any[]>([])
    const [playListName, setPlaylistName] = useState<any>('')
    
    return(
        <songContext.Provider value={{songs, setSongs, playListName, setPlaylistName }}>
            {children}
        </songContext.Provider>
    )
}

export const useSongContext = () => {
    const context = useContext(songContext);
    if(!context){
        throw new Error("useSongContext must be used within a SongsProvider")
    }
    return context;  
}