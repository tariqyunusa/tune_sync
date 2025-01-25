import axios from 'axios';
const handleYoutubeAuth = async (targetLink: string) => {
    try{
        const url = new URL(targetLink)
        const playlistId = url.searchParams.get('list')
        if(!playlistId){
            throw new Error("no playlist id found");
        }
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=AIzaSyAoga9r-m1uJwrXlxflb_JR-p1a-YWpIQM`)
        console.log(response.data);   
    }catch(error) {
        console.error("error in handleYoutubeAuth", error);
    }
}
const handleSoundcloudAuth = async () => {
  
}
const handleDeezerAuth = async () => {
  
}

export {handleDeezerAuth, handleSoundcloudAuth, handleYoutubeAuth}