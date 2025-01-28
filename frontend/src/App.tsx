import './App.css'
import { useEffect, useState } from 'react'
import {  handleDeezerAuth, handleSoundcloudAuth, handleYoutubeAuth } from './utils/auth'
import {useSongContext} from './contexts/songContext'
import { Link } from 'react-router-dom'


const App: React.FC = () => {
  const [targetLink, setTargetLink] = useState('')
  const [platform, setPlatform] = useState<string | undefined>(undefined)
  const {songs, setSongs} = useSongContext()
  

  const verifyPlatform = (link: string) => {
    // spotify 
    if (link.includes("spotify.com")) {
      setPlatform("Spotify")
      return "Spotify"
    }
    // youtube music
    else if(link.includes("music.youtube.com")) {
      setPlatform("Youtube Music")
      return "Youtube Music"
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
      switch (platform) {
        case "Spotify": return "Cannot Convert Spotify to Spotify"
        break
        case "Youtube Music": 
        handleYoutubeAuth(targetLink).then((songs) => setSongs(songs))
        console.log("all tracks state", songs)
        break
        case "Soundcloud": handleSoundcloudAuth()
        break
        case "Deezer": handleDeezerAuth()
        break
        default: return
    }
  }
  useEffect(() => {
    verifyPlatform(targetLink)
  }, [targetLink])

  return (
    <div className='tune__sync_wrapper'>
      <div>
        <h1>Tune Sync</h1>
        <div>
          <input type="text" name="link" className='input__link' placeholder='input playlist link' onChange={(e) => setTargetLink(e.target.value)}/>
          <div>{platform}</div>
          <Link className='button_cta' onClick={handleAuth} to='/verify' ><span></span>Proceed</Link>
        </div>
      </div>
    </div>
  )
}


export default App
