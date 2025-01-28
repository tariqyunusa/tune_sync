import {useSongContext} from '../contexts/songContext'
const Verify = () => {
    const {songs, playListName} = useSongContext()
    console.log("verifying songs", songs);
    console.log("verifying name", playListName);
    
    return(
        <div>
            <div>
                <h1>{playListName}</h1>
                <div>
                    {songs.length > 0 && songs.map((song, idx) => <p key={idx}>{song.snippet.title}</p>)}
                </div>
            </div>
        </div>
    )
}

export default Verify;