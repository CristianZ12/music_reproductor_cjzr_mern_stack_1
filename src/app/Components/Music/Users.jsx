import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

const Users = () => {

    const initialValuesUser = {
        _id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        typeAdmin: ''
    }

    const [users, setUsers] = useState([]);
    const [userV, setUserV] = useState(initialValuesUser);

    const deleteUser = async (id) => {
        const deleteUSer1 = await axios.delete(`http://localhost:4000/api/delete/${id}`);
        const message = deleteUSer1.data.message;
        if(message.msgError){
            toast(message.msgBody, {
                type: 'error'
            });
        } else {
            toast(message.msgBody, {
                type: 'success'
            });
        }
        getUsers();
    }

    const getUsers = async () => {
        const Data = await axios.get('http://localhost:4000/api/users');
        console.log(Data.data.users);
        setUsers(Data.data.users);
    }

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

    useEffect(() => {
        getUsers();
        getUser();
    }, []);

    return(
        <div>
            {
                userV.typeAdmin === 1 ? <div className="row p-5">
                <div className="col col-xxl-11 col-md-11 col-sm-11 mx-auto">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">TypeAdmin</th>
                                <th scope="col">CRUD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <th scope="row">{user._id}</th>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.typeAdmin === 1 ? 'Admin' : 'Current' }</td>
                                        <td>
                                            {
                                                userV._id === user._id ? '' : <button type="button" className="btn btn-danger" onClick={() => deleteUser(user._id)}>DELETE</button>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div> : 
            ''
            }
        </div>
    );
}

export default Users;