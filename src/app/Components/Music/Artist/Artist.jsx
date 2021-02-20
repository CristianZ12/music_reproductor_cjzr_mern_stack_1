import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

import ArtistForm from './ArtistForm';

const Artist = () => {

    const initialValuesUser = {
        _id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        typeAdmin: ''
    }

    const [user, setUser] = useState(initialValuesUser);

    const getUser = () => {
        let token = localStorage.usertoken;
        const decoded = jwtDecode(token);
        getUser2(decoded._id);
    }

    const getUser2 = async (id) => {
        const userData = await axios.get(`http://localhost:4000/api/user/${id}`);
        const userVT = {
            _id: userData.data._id,
            firstName: userData.data.firstName,
            lastName: userData.data.lastName,
            username: userData.data.username,
            email: userData.data.email,
            typeAdmin: userData.data.typeAdmin
        }
        setUser(userVT);
    }

    const [artistV, setArtistV] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const AddOrEdditArtist = async (objectArtist) => {
        if(currentId === ''){
            const addData = await axios.post('http://localhost:4000/api/artists', objectArtist);
            const message = addData.data.message;
            if(message.msgError){
                toast(message.msgBody, {
                    type: 'error'
                });
            } else {
                toast(message.msgBody, {
                    type: 'success'
                });
            }
            getArtists();  
        } else {
            const updateData = await axios.put(`http://localhost:4000/api/artist/${currentId}`, objectArtist);
            const message = updateData.data.message;
            if(message.msgError){
                toast(message.msgBody, {
                    type: 'error'
                });
            } else {
                toast(message.msgBody, {
                    type: 'info'
                });
            }
            setCurrentId('');
            getArtists();
        }
    }

    const deleteArtist = async (id) => {
        const deleteData = await axios.delete(`http://localhost:4000/api/artist/${id}`);
        const message = deleteData.data.message;
        if(message.msgError){
            toast(message.msgBody, {
                type: 'error'
            });
        } else {
            toast(message.msgBody, {
                type: 'success'
            });
        }
        getArtists();
    }

    const getArtists = async () => {
        const usersData = await axios.get('http://localhost:4000/api/artists');
        console.log(usersData.data.artists);
        setArtistV(usersData.data.artists);
    }

    useEffect(() => {
        getUser();
        getArtists();
    }, []);

    return(
        <div>
            <div className="row p-5">
                <div className="col col-xxl-11 col-sm-11 col-md-11 mx-auto">
                    <div className="card">
                        <div className="card-header" style={{backgroundColor: 'rgb(0, 170, 228)'}}>
                            <h3 className="card-title text-center" style={{color: 'white'}}>
                                SINGERS
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            {user.typeAdmin === 1 ? <ArtistForm {...{AddOrEdditArtist, currentId, artistV}} /> : ''}
            <div className="row m-5">
                {
                    artistV.map(artist => (
                        <div className="col col-xxl-3 col-md-4 col-sm-4" key={artist._id}>
                            <div className="card">
                                <div className="card-header" style={{backgroundColor: 'rgb(229,26,76)'}}>
                                    <h3 className="card-title text-center" style={{color: 'white'}}>
                                        {artist.fullname}
                                    </h3>
                                </div>
                                <div className="card-body" style={{backgroundColor: '#696969'}}>
                                    <div className="d-flex justify-content-center" style={{width: '100%'}}>
                                        <img src={'img/' + artist.image} alt={artist.image} style={{width: '150px', height: '150px', borderRadius: '50%'}} />
                                    </div><br/>
                                    <p className="text-center" style={{color: 'white'}}>Age: {artist.age}</p>
                                    <p className="text-center" style={{color: 'white'}}>City: {artist.city}</p>
                                    { user.typeAdmin === 1 ? 
                                    <div className="d-flex justify-content-center" style={{width: '100%'}}>
                                        <button type="button" className="btn btn-success" onClick={() => setCurrentId(artist._id)}>Edit</button>
                                        <button type="button" className="btn btn-danger" onClick={() => deleteArtist(artist._id)}>Delete</button>
                                    </div> : '' }
                                    <Link to={`/album/${artist._id}`} className="btn btn-primary btn-block mt-3">Views Albums</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Artist;