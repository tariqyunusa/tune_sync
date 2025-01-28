import axios from 'axios';


const handleYoutubeAuth = async (targetLink: string) => {
    try {
        const url = new URL(targetLink);
        const playlistId = url.searchParams.get('list');
        if (!playlistId) {
            throw new Error("No playlist ID found in the URL");
        }

        const apiKey = 'AIzaSyAoga9r-m1uJwrXlxflb_JR-p1a-YWpIQM';

       
        const playlistMetadataResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlists`,
            {
                params: {
                    part: 'snippet',
                    id: playlistId,
                    key: apiKey,
                },
            }
        );

        const playlistName = playlistMetadataResponse.data.items?.[0]?.snippet?.title;

        if (!playlistName) {
            throw new Error("Unable to fetch the playlist name.");
        }

        let allItems: any = [];
        let nextPageToken = '';

        do {
            const params = {
                part: 'snippet',
                playlistId: playlistId,
                maxResults: 50,
                pageToken: nextPageToken,
                key: apiKey,
            };

            console.log("Requesting YouTube API with params:", params);

            const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
                params,
            });

            allItems = allItems.concat(response.data.items);
            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);

        return { playlistName,  allItems };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error in handleYoutubeAuth:", error.message);
            console.error("Response data:", error.response?.data);
        } else {
            console.error("Unexpected error in handleYoutubeAuth:", error);
        }
        throw error;
    }
};
const handleSoundcloudAuth = async () => {
    // Soundcloud authentication logic
};

const handleDeezerAuth = async () => {
    // Deezer authentication logic
};

export { handleDeezerAuth, handleSoundcloudAuth, handleYoutubeAuth };