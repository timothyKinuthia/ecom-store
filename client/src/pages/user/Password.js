import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

import { Spin } from 'antd';

const Password = () => {
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = async evt => {
        evt.preventDefault();

        setLoading(true)

        await auth.currentUser.updatePassword(password)
        .then(() => {
            setLoading(false);
            toast.success('Password updated successfully')
            setPassword('');
        })
        .catch(err => {
            setLoading(false)
            toast.error(err.message);
        })
    }

    const passwordUpdateForm = () => <form onSubmit={handleSubmit}>
        <div>
            <label>Your Password</label>
            <input type="password" value={password} onChange={evt => setPassword(evt.target.value)} className="form-control" placeholder="Enter new password" disable={loading} />
            <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>Submit</button>
        </div>
    </form>
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="colmd-2">
                    <UserNav/>
                </div>
                <div className="col">
                    {loading ? <Spin size="large"/> : <h4>Update Password</h4> }
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
}

export default Password;