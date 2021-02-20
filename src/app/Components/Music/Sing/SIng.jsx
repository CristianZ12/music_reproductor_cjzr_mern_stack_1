import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import JWTDecoded from 'jwt-decode';
import SingForm from './SingForm';
import SingMusic from './SingMusic';

const Sing = () => {

    const match = useRouteMatch();

    const initialVUser = {
        _id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        typeAdmin: ''
    }

    const [user, setUser] = useState(initialVUser);

    const getUser = () => {
        let token = localStorage.usertoken;
        const decoded = JWTDecoded(token);
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

    const [sings, setSings] = useState([]);
    const [currentId, setCurrentId] = useState('');
    const [idMusic, setIdMusic] = useState('');

    const initialAlbum = {
        title: '',
        description: '',
        tag: '',
        image: ''
    }

    const [album, setAlbum] = useState(initialAlbum);

    const AddOrEditSing = async (singObject) => {
        if(currentId === ''){
            const postData = await axios.post('http://localhost:4000/api/singers', singObject);
            const message = postData.data.message;
            if(message.msgError){
                toast(message.msgBody, {
                    type: 'error'
                });
            } else {
                toast(message.msgBody, {
                    type: 'success'
                });
            }
            getSings(match.params.id);
        } else {
            const updateData = await axios.put(`http://localhost:4000/api/singer/${currentId}`, singObject);
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
            getSings(match.params.id);            
        }
    }

    const deleteSing = async (id) => {
        const deleteData = await axios.delete(`http://localhost:4000/api/singer/${id}`);
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
        getSings(match.params.id);
    }

    const getAlbum = async (id) => {
        const album1 = await axios.get(`http://localhost:4000/api/album/${id}`);
        console.log(album1.data);
        const albumD = {
            title: album1.data.title,
            description: album1.data.description,
            tag: album1.data.tag,
            image: album1.data.image
        }
        setAlbum(albumD);
    }

    const getSings = async (id) => {
        const sings1 = await axios.get(`http://localhost:4000/api/singers/${id}`);
        console.log(sings1.data.singers);
        setSings(sings1.data.singers); 
    }

    useEffect(() => {
        getUser();
        getAlbum(match.params.id);
        getSings(match.params.id);
    }, []);

    return(
        <div>
            <div className="row p-5">
                <div className="col col-xxl-11 col-sm-11 col-md-11 mx-auto">
                    <div className="card">
                        <div className="card-header" style={{backgroundColor: 'rgb(0, 170, 228)'}}>
                            <h3 className="card-title text-center" style={{color: 'white'}}>
                                Sing of {album.title}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            { user.typeAdmin === 1 ? 
                <SingForm {...{AddOrEditSing, currentId, album, sings}} /> : ''    
            }
            <div className="row p-5">
                {
                    sings.map(sing => (
                        <div className="col col-xxl-3 col-md-4 col-sm-4" key={sing._id}>
                            <div className="card">
                                <div className="card-header" style={{backgroundColor: 'rgb(229,26,76)'}}>
                                    <h3 className="card-title text-center" style={{color: 'white'}}>
                                        {sing.title}
                                    </h3>
                                </div>
                                <div className="card-body" style={{backgroundColor: '#696969'}}>
                                    <div className="d-flex justify-content-center" style={{width: '100%'}}>
                                        <img src={'../img/' + album.image} alt={album.image} style={{width: '150px', height: '150px', borderRadius: '50%'}} />
                                    </div><br/>
                                    <p className="text-center" style={{color: 'white'}}>Genre: {sing.genre}</p>
                                    { user.typeAdmin === 1 ? <p className="text-center" style={{color: 'white'}}>name: {sing.name}</p> : '' }
                                    { user.typeAdmin === 1 ? <p className="text-center" style={{color: 'white'}}>SA: {sing.singerAlbum}</p> : '' }
                                    { user.typeAdmin === 1 ? 
                                        <div className="d-flex justify-content-center mt-4" style={{width: '100%'}}>
                                            <button type="button" className="btn btn-success" onClick={() => setCurrentId(sing._id)}>Edit</button>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteSing(sing._id)}>Delete</button>
                                        </div> : ''
                                    }
                                    <button type="button" className="btn btn-primary btn-block mt-3" onClick={() => setIdMusic(sing._id)}>PLAY</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="row">
                <div className="col col-xxl-11 col-sm-11 col-md-11 mx-auto">
                    <div className="card">
                        <div className="card-header" style={{backgroundColor: 'rgb(0, 170, 228)'}}>
                            <h3 className="card-title text-center" style={{color: 'white'}}>
                                MUSIC REPRODUCTOR
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center p-5" style={{width: '100%'}}>
                { idMusic === '' ? '' :
                    <div>
                        <button type="button" className="btn btn-danger" onClick={() => setIdMusic('')}>Close</button>
                        <SingMusic {...{idMusic}} />
                    </div> 
                }
            </div>
        </div>
    );
}

export default Sing;