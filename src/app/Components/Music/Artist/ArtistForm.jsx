import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ArtistForm = (props) => {

    const initialValuesArtist = {
        fullname: '',
        age: '',
        city: '',
        image: ''
    }

    const [artistF, setArtistF] = useState(initialValuesArtist);

    const onChangeInputs = (e) => {
        const { name, value } = e.target;
        setArtistF({...artistF, [name]: value});
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        props.AddOrEdditArtist(artistF);
        setArtistF(initialValuesArtist);
    }

    const getArtistById = async (id) => {
        const getArtist = await axios.get(`http://localhost:4000/api/artist/${id}`);
        console.log(getArtist.data);
        const arts = {
            fullname: getArtist.data.fullname,
            age: getArtist.data.age,
            city: getArtist.data.city,
            image: getArtist.data.image
        }
        setArtistF(arts);
    }

    useEffect(() => {
        if(props.currentId === ''){
            setArtistF(initialValuesArtist);
        } else {
            console.log(props.currentId);
            getArtistById(props.currentId);
        }
    }, [props.currentId]);

    return(
        <div className="row">
            <div className="col col-xxl-5 col-md-8 col-sm-8 mx-auto">
                <div className="card">
                    <div className="card-header" style={{backgroundColor: 'rgb(0, 170, 228)'}}>
                        <h3 className="card-title text-center" style={{color: 'white'}}>
                            { props.currentId === '' ? 'Insert Singer' : 'Update Singer'}
                        </h3>
                    </div>
                    <div className="card-body" style={{backgroundColor: '#696969'}}>
                        <form onSubmit={handlerSubmit}>
                            <div className="mb-3 mt-3">
                                <input type="text" className="form-control" name="fullname" placeholder="Full Name" value={artistF.fullname} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="age" placeholder="Age" value={artistF.age} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="city" placeholder="City" value={artistF.city} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" name="image" placeholder="Name of Image" value={artistF.image} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-block btn-primary">
                                    { props.currentId === '' ? 'Add Album' : 'Update Album' }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistForm;