import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const Profile = () => {
    
    const initialValuesUser = {
        _id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        typeAdmin: ''
    }

    const history = useHistory();

    const [userV, setUserV] = useState(initialValuesUser);
    
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
        setUserV(userVT);
    }

    const deleteUser = async (id) => {
        const deleteData = await axios.delete(`http://localhost:4000/api/delete/${id}`);
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
        localStorage.removeItem('usertoken');
        history.push('/');
    }
    
    useEffect(() => {
        getUser();
    }, []);

    return(
        <div>
            <div className="row p-5">
                <div className="col col-xxl-7 col-md-9 col-sm-9 mx-auto">
                    <div className="card">
                        <div className="card-body" style={{backgroundColor: '#696969'}}>
                            <h2 className="card-title text-center" style={{color: 'white'}}>
                            { userV.firstName + ' ' + userV.lastName }
                            </h2>
                            <p className="text-center mt-4" style={{color: 'white'}}>
                                Account: { userV.typeAdmin === 1 ? 'Admin' : 'Current' }
                            </p>
                            <p className="card-title text-center" style={{color: 'white'}}>
                                { userV.username }
                            </p>
                            <p className="card-title text-center mt-3" style={{color: 'white'}}>
                                Email: { userV.email }
                            </p>
                            <div className="btn-group d-flex justify-content-center mt-3" role="group" aria-label="Basic example">
                                <Link to={`/update/user/${userV._id}`} className="btn btn-primary">Edit</Link>
                                <button type="button" className="btn btn-danger" onClick={() => deleteUser(userV._id)}>Delete</button>
                            </div>
                            { userV.typeAdmin === 1 ? <Link to="/users" className="btn btn-success btn-block">Users</Link> : ''}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col col-xxl-7 col-md-10 col-sm-10 mx-auto">
                    <div className="card">
                        <div className="card-header" style={{backgroundColor: 'rgb(229,26,76)'}}>
                            <h3 className="card-title text-center" style={{color: 'white'}}>
                                MP3 REPRODUCTOR
                            </h3>
                        </div>
                        <div className="card-body">
                            <p>Your Welcome {userV.firstName + ' ' + userV.lastName} to MP3 REPRODUCTOR, this is an application of Music that will permit hear to Artist Favorite.... Please Get Sarted!</p>
                            <Link to="/artist" className="btn btn-primary btn-block">Started</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile; 