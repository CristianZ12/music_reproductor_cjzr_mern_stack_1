import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';

const SingMusic = (props) => {

    const initialVS = {
        title: '',
        name: '',
        genre: '',
    }

    const [sing, setSing] = useState(initialVS);

    const getSingById = async (id) => {
        const sing = await axios.get(`http://localhost:4000/api/singer/${id}`);
        console.log(sing.data);
        const singD = {
            title: sing.data.title,
            name: sing.data.name,
            genre: sing.data.genre,
        }
        setSing(singD);
    }
    
    useEffect(() => {
        if(props.idMusic === ''){
            setSing({...initialVS});
        } else {
            getSingById(props.idMusic);
        }
    }, [props.idMusic]);

    return(
        <div>
            <div className="card">
                <div className="card-header" style={{backgroundColor: 'rgb(229,26,76)'}}>
                    <h3 className="card-title text-center" style={{color: 'white'}}>
                        { sing.title }
                    </h3>
                </div>
                <div className="card-body" style={{backgroundColor: '#696969'}}>
                    <ReactAudioPlayer 
                        src={`../music/${sing.name}`}
                        autoPlay
                        controls    
                    />
                </div>
            </div>
        </div>
    );
}

export default SingMusic;