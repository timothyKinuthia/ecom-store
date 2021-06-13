import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';

//antd
import { Spin } from 'antd';
import { toast } from 'react-toastify';

const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector(state => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push('/');
    }, [user, history])

    const handleSubmit = async evt => {
        evt.preventDefault();
        setLoading(true);

        const config = {
            url: 'http://localhost:3000/login',
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config).then(() => {
            setEmail('');
            setLoading(false);
            toast.success("Check your email for password reset link");
        }).catch(err => {
            console.log(err);
            toast.error(err.message);
            setLoading(false);
        })
    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? <h4 className="text-danger">Loading</h4> : <h4>Forgot Password</h4>}

            <form onSubmit={handleSubmit}>
                <input type="email" className="form-control" value={email} onChange={evt => setEmail(evt.target.value)} placeholder="Type your email" />
                <br />
                <button className="btn btn-raised" disabled={!email || loading}>{loading ? <Spin size="default"/> : "Submit"}</button>
            </form>
            
        </div>
    )
}

export default ForgotPassword
