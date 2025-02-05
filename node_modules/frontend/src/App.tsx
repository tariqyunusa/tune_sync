import './App.css'
import { useEffect, useState } from 'react'
import {  handleDeezerAuth, handleSoundcloudAuth, handleYoutubeAuth, handleAmazonMusicAuth } from './utils/auth'
import {useSongContext} from './contexts/songContext'
import { useNavigate } from 'react-router-dom'
import { SiYoutubemusic, SiAmazonmusic } from "react-icons/si";
import  {ClipLoader}  from 'react-spinners'
import { useLoaderContext } from './contexts/loaderContext'


const App: React.FC = () => {
  const [targetLink, setTargetLink] = useState('')
  const [platform, setPlatform] = useState<string | undefined>(undefined)
  const [color, setColor] = useState("#d1d1d1")
 const {loading, setIsLoading} = useLoaderContext()
  const navigate = useNavigate()

  const {setPlaylistName, setSongs} = useSongContext()
  

  const verifyPlatform = (link: string) => {
    // spotify 
    if (link.includes("spotify.com")) {
      setPlatform("Spotify")
      return "Spotify"
    }
    // youtube music
    else if(link.includes("music.youtube.com")) {
      setPlatform("Youtube Music")
      setColor("#FF0000")
      return "Youtube Music"
    }
    // amazion music
    else if(link.includes("music.amazon.com")){
      setPlatform("Amazon Music")
      setColor("#25d1da")
      return "Amazon Music"
    }
    // soundcloud
    else if(link.includes("soundcloud.com")) {
      setPlatform("Soundcloud")
      return "Soundcloud"
    }
    // deezer
    else if(link.includes("deezer.com")) {
      setPlatform("Deezer")
      return "Deezer"
    }
    else {
      setPlatform(undefined)
      return undefined
    }
    
  }
  const handleAuth =  () => {
    setIsLoading(true)
      switch (platform) {
        case "Spotify": return "Cannot Convert Spotify to Spotify"
        break
        case "Youtube Music": 
        handleYoutubeAuth(targetLink).then((response) => {
          setSongs(response.allItems);
          setPlaylistName(response.playlistName);
          setIsLoading(false)
          navigate("/verify")
        })
        break
        case "Soundcloud": handleSoundcloudAuth()
        break
        case "Deezer": handleDeezerAuth()
        break
        case "Amazon Music" : handleAmazonMusicAuth(targetLink)
        break
        default: return
       
    }
  }
  useEffect(() => {
    verifyPlatform(targetLink)
  }, [targetLink])

  return (
    <div className='tune__sync_wrapper'>
        <h1 className='tune__sync_header'>Tune Sync</h1>
        <p className='tune__sync_paragraph'>Listen to music without borders, no more gate-keeping, enjoy borderless music experience.</p>
      <div className='tune__sync_content'>
        <div className='tune_sync_platform'>
          <input type="text" name="link" className='input__link' placeholder='input playlist link' onChange={(e) => setTargetLink(e.target.value)}/>
          {platform ? <div className='tune__sync_cross_platform' style={{backgroundColor: color}}><span>{platform === "Youtube Music" && <SiYoutubemusic /> || platform === "Amazon Music" && <SiAmazonmusic />}</span><p>{platform ? platform : "paste link"}</p></div> : <div></div> }
          <button className='button_cta' onClick={handleAuth} disabled={loading}>Proceed {loading && <ClipLoader speedMultiplier={1} color='#fff' size={18} loading/>}</button>
        </div>
      </div>
    </div>
  )
}


export default App
