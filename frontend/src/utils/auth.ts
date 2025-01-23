import axios from 'axios';
const handleYoutubeAuth = async (targetLink: string) => {
const response  = await axios.get(`${targetLink}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
console.log(response.data)
}
const handleSoundcloudAuth = async () => {
  
}
const handleDeezerAuth = async () => {
  
}

export {handleDeezerAuth, handleSoundcloudAuth, handleYoutubeAuth}