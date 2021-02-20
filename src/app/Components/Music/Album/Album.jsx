import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useRouteMatch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AlbumForm from './AlbumForm';

const Album = () => {
    const initialValuesUser = {
        _id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        typeAdmin: ''
    }

    const match = useRouteMatch();

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

    const [albums, setAlbums] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const initialArtistV = {
        _id: '',
        fullname: '',
        age: '',
        city: '',
        image: ''
    }

    const [artist, setArtist] = useState(initialArtistV);
    
    const AddOrEditAlbum = async (objectAlbum) => {
        if(currentId === ''){
            const postAlbum = await axios.post('http://localhost:4000/api/albums', objectAlbum);
            const message = postAlbum.data.message;
            if(message.msgError){
                toast(message.msgBody, {
                    type: 'error'
                });
            } else {
                toast(message.msgBody, {
                    type: 'success'
                });
            }
            getAlbum(match.params.id);
        } else {
            const updateData = await axios.put(`http://localhost:4000/api/album/${currentId}`, objectAlbum);
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
            getAlbum(match.params.id);
        }
    }

    const deleteAlbum = async (id) => {
        const deleteData = await axios.delete(`http://localhost:4000/api/album/${id}`);
        const message = deleteData.data.message;
        if(message.msgError){
            toast(message.msgBody, {
                type: 'error'
            });
        } else {
            toast(message.msgBody, {
                type: 'info'
            });
        }
        getAlbum(match.params.id);
    }

    const getArtist= async (id) => {
        const getArtist1 = await axios.get(`http://localhost:4000/api/artist/${id}`);
        const dataArtiist = {
            _id: getArtist1.data._id,
            fullname: getArtist1.data.fullname,
            age: getArtist1.data.age,
            city: getArtist1.data.city,
            image: getArtist1.data.image
        }
        console.log(dataArtiist);
        setArtist(dataArtiist);
    }

    const getAlbum = async (id) => {
        const getAlbum1 = await axios.get(`http://localhost:4000/api/albums/${id}`);
        console.log(getAlbum1.data.albums);
        setAlbums(getAlbum1.data.albums);
    }

    useEffect(() => {
        getUser();
        getArtist(match.params.id);
        getAlbum(match.params.id);
    }, []);

    return(
        <div>
            <div className="row p-5">
                <div className="col col-xxl-11 col-sm-11 col-md-11 mx-auto">
                    <div className="card">
                        <div className="card-header" style={{backgroundColor: 'rgb(0, 170, 228)'}}>
                            <h3 className="card-title text-center" style={{color: 'white'}}>
                                Album of {artist.fullname}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            {user.typeAdmin === 1 ? <AlbumForm {...{AddOrEditAlbum, currentId, albums}} /> : ''}
            <div className="row p-5">
                {
                    albums.map(album => (
                        <div className="col col-xxl-3 col-md-4 col-sm-4" key={album._id}>
                            <div className="card">
                                <div className="card-header" style={{backgroundColor: 'rgb(229,26,76)'}}>
                                    <h3 className="card-title text-center" style={{color: 'white'}}>
                                        {album.title}
                                    </h3>
                                </div>
                                <div className="card-body" style={{backgroundColor: '#696969'}}>
                                    <div className="d-flex justify-content-center" style={{width: '100%'}}>
                                        <img src={'../img/' + album.image} alt={album.image} style={{width: '150px', height: '150px', borderRadius: '50%'}} />
                                    </div><br/>
                                    <p className="text-center" style={{color: 'white'}}>Description: {album.description}</p>
                                    <p className="text-center" style={{color: 'white'}}>Tag: {album.tag}</p>
                                    { user.typeAdmin === 1 ? <p className="text-center" style={{color: 'white'}}>Album_Artist: {album.albumArtist}</p> : ''}
                                    { user.typeAdmin === 1 ? 
                                        <div className="d-flex justify-content-center mt-4" style={{width: '100%'}}>
                                            <button type="button" className="btn btn-success" onClick={() => setCurrentId(album._id)}>Edit</button>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteAlbum(album._id)}>Delete</button>
                                        </div> : ''
                                    }
                                    <Link to={`/sing/${album._id}`} className="btn btn-primary btn-block mt-3">Views Sings</Link> 
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Album;