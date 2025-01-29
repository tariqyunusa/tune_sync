import axios from "axios";
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || '';
const SCOPES = 'playlist-modify-public playlist-modify-private user-library-read user-read-email user-read-private';



export const getAuthUrl = () => {
    try{
        const params = new URLSearchParams({
            client_id: CLIENT_ID,
            response_type: 'code',
            redirect_uri: REDIRECT_URI,
            scope: SCOPES,
            show_dialog: "true"
        })
        const url = `https://accounts.spotify.com/authorize?${params.toString()}`
        return url
    }catch(error) {
        console.error("error generating url", error)
        throw error
    }
}