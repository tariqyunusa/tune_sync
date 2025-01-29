import {useSongContext} from '../contexts/songContext'
import logo from '../../public/logo.png'
import '../index.css'
import { Link } from 'react-router-dom'
const Verify = () => {
    const {songs, playListName} = useSongContext()
    console.log("verifying songs", songs);
    console.log("verifying name", playListName);
    
    return(
        <div className='verify__page_wrapper'>
            <div className='verify__portfolio'>
                <div className='verify__header_meta'><div className='img__logo_header_meta'><img src={logo} alt="logo" /></div> <h1>{playListName}</h1></div>
                <div className='verify__songs_meta'>
                    {songs.length > 0 && songs.map((song, idx) => {
                        const artist = song.snippet.videoOwnerChannelTitle.replace(/- Topic$/, '').trim();
                        return(
                            <div key={idx} className='verify__catalog'>
                                <h3>{song.snippet.title}</h3>
                                <p>{artist}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Link className='button__cta_verify' to='/confirm'>Convert</Link>
        </div>
    )
}

export default Verify;