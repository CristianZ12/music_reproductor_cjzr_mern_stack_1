import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateUser = () => {

    const initialValuesUser = {
        _id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    }

    const history = useHistory();
    const match = useRouteMatch();

    const [userV, setUserV] = useState(initialValuesUser);

    const onChangeInputs = (e) => {
        const { name, value } = e.target;
        setUserV({...userV, [name]: value}); 
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const updateValues = {
            firstName: userV.firstName,
            lastName: userV.lastName,
            username: userV.username,
            email: userV.email,
            password: userV.password
        };
        const updateData = await axios.put(`http://localhost:4000/api/user/${userV._id}`, updateValues);
        const message = updateData.data.message;
        if(message.msgError){
            toast(message.msgBody, {
                type: 'error'
            });
        } else {
            toast(message.msgBody, {
                type: 'info'
            });
            return history.push('/profile');
        }
    }

    const getUserId = async () => {
        if(match.params.id){
            console.log(match.params.id);
            const user = await axios.get(`http://localhost:4000/api/user/${match.params.id}`);
            const userData = {
                _id: user.data._id,
                firstName: user.data.firstName,
                lastName: user.data.lastName,
                username: user.data.username,
                email: user.data.email,
                password: ''
            }
            setUserV(userData);
        }
    }

    useEffect(() => {
        getUserId();
    },[]);

    return(
        <div className="row p-5">
            <div className="col col-xxl-4 col-md-9 col-sm-9 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title text-center">REGISTER</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handlerSubmit}> 
                            <div className="mt-3 mb-3">
                                <input type="text" className="form-control" placeholder="First Name" name="firstName" value={userV.firstName} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Last Name" name="lastName" value={userV.lastName} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="User Name" name="username" value={userV.username} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Email" name="email" value={userV.email} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Password" name="password" value={userV.password} onChange={onChangeInputs} />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary btn-block">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;