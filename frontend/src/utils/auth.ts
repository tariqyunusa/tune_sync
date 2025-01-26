import axios from 'axios';

const handleYoutubeAuth = async (targetLink: string) => {
    try {
        const url = new URL(targetLink);
        const playlistId = url.searchParams.get('list');
        if (!playlistId) {
            throw new Error("no playlist id found");
        }

        let allItems: any = [];
        let nextPageToken = '';
        const apiKey = 'AIzaSyAoga9r-m1uJwrXlxflb_JR-p1a-YWpIQM';

        do {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
                params: {
                    part: 'snippet',
                    playlistId: playlistId,
                    maxResults: 50, 
                    pageToken: nextPageToken,
                    key: apiKey
                }
            });

            allItems = allItems.concat(response.data.items);
            nextPageToken = response.data.nextPageToken;
        } while (nextPageToken);
        console.log(allItems)
        return allItems;
    } catch (error) {
        console.error("error in handleYoutubeAuth", error);
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