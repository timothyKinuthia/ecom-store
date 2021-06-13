import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';

const AdminRoute = ({ ...rest }) => {

    const [ok, setOk] = useState(false);

    const { user } = useSelector(state => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token).then(res => {
                setOk(true);
            }).catch(err => {
                setOk(false);
            })
        }
    })

    return ok ? (
        <Route {...rest}/>
    ) : (<LoadingToRedirect/>)
 };

export default AdminRoute