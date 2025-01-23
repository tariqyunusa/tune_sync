import './App.css'
import { useState } from 'react'
import logo from '../public/logo.png'
import { handleSpotifyAuth, handleDeezerAuth, handleSoundcloudAuth, handleYoutubeAuth } from './utils/auth'

const App: React.FC = () => {
  const [targetLink, setTargetLink] = useState('')
  const [platform, setPlatform] = useState<string | undefined>(undefined)

  const verifyPlatform = (link: string) => {
    // spotify 
    if (link.includes("spotify.com")) {
      setPlatform("Spotify")
      return "Spotify"
      
    }
    // youtube music
    else if(link.includes("youtube.com")) {
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
  const handleAuth = () => {
      switch (platform) {
        case "Spotify": handleSpotifyAuth()
        break
        case "Youtube Music": handleYoutubeAuth()
        break
        case "Soundcloud": handleSoundcloudAuth()
        break
        case "Deezer": handleDeezerAuth()
        break
        default: return
    }
  }

  return (
    <div className='tune__sync_wrapper'>
      <div>
        <h1>Tune Sync</h1>
        <div>
          <input type="text" name="link" className='input__link' placeholder='input playlist link'/>
          <div>{platform}</div>
          <button className='button_cta'><span><img src={logo} alt="logo" /></span>Login to proceed</button>
        </div>
      </div>
    </div>
  )
}


export default App
