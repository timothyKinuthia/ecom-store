import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, googleAuthProvider } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import createUpdateUser from './createUpdateUser';

//antd
import {MailOutlined, GoogleOutlined} from '@ant-design/icons';
import { Button, Spin } from 'antd';
import { toast } from 'react-toastify';


const Login = ({ history }) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { user } = useSelector(state => ({ ...state }));

    const roleBasedRedirect = res => {
        const intended = history.location.state;
        if (intended) {
            history.push(intended.from);
        } else {
            if (res.data.user.role === 'admin') {
                history.push('/admin/dashboard');
            } else {
                history.push('/user/history');
            }
        }
    }

    useEffect(() => {
        if (history.location.state) {
            return;
        } else {
            if (user && user.token) history.push('/');
        }
    }, [user, history])
    
 
    const handleSubmit = async evt => {
        evt.preventDefault();

        setLoading(true);

        try {
            const { user } = await auth.signInWithEmailAndPassword(email, password);

            const idTokenResult = await user.getIdTokenResult()
    
            //console.log(idTokenResult.token);
    
            createUpdateUser(idTokenResult.token).then(res => {
                dispatch({
                    type: 'LOGGED_IN_USER', payload: {
                        name: res.data.user.name,
                        email: res.data.user.email,
                        token: idTokenResult.token,
                        role: res.data.user.role,
                        _id: res.data.user._id
                    }
                })
    
                roleBasedRedirect(res)
    
    
            }).catch(err => console.log(err))
        } catch (err) {
            setLoading(false);
            setEmail('');
            setPassword('');
            toast.error(err.message)
        }
                          
    }

   const loginForm = () => <form onSubmit={handleSubmit}>
       <div className="form-group">
            <input type="email" value={email} className="form-control" onChange={evt => setEmail(evt.target.value)} placeholder='your email' />
       </div>
       
        <div className="form-group">
            <input type="password" value={password} className="form-control" onChange={evt => setPassword(evt.target.value)} placeholder='password'/>
        </div>
       
       <br/>
       <Button onClick={handleSubmit} size="large" type="primary" block shape="round" icon={<MailOutlined />} className="mb-3" disabled={!email || password.length < 6}>{loading ? <Spin/> : "Login with Email/Password"}</Button>
    </form>

    const googleLogin = async () => {
        //setLoading(true);
        auth.signInWithPopup(googleAuthProvider).then(async result => {
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult(); 
            createUpdateUser(idTokenResult.token).then(res => {
                dispatch({
                    type: 'LOGGED_IN_USER', payload: {
                        name: res.data.user.name,
                        email: res.data.user.email,
                        token: idTokenResult.token,
                        role: res.data.user.role,
                        _id: res.data.user._id
                    }
                })
    
                roleBasedRedirect(res)
    
    
            }).catch(err => console.log(err))
    
            history.push('/');
        }).catch(err => {
            console.log(err);
            toast.error(err.message);
        })

    }

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md offset-md-3">
                    {loading ? <h4 className="text-danger">Wait...</h4> : <h4>Login</h4>}
                    {loginForm()}
                    <Button onClick={googleLogin} size="large" type="danger" block shape="round" icon={<GoogleOutlined />} className="mb-3">Login in with google</Button>

                    <Link to='/forgot/password' className="float-right text-danger">forgot password?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
