const handleSpotifyAuth = async () => {
  const response = await fetch('http://localhost:5000/auth')
  const data = await response.json()
    window.location
}
const handleYoutubeAuth = async () => {
 
}
const handleSoundcloudAuth = async () => {
  
}
const handleDeezerAuth = async () => {
  
}

export { handleSpotifyAuth, handleYoutubeAuth, handleSoundcloudAuth, handleDeezerAuth }