import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';


const Register = ({history}) => {

    const [email, setEmail] = useState('');

    const { user } = useSelector(state => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push('/');
    }, [user, history])
 
    const handleSubmit = async evt => {
        try {
            evt.preventDefault();
            const config = {
                url: 'http://localhost:3000/register/complete',
                handleCodeInApp: true
            }
            await auth.sendSignInLinkToEmail(email, config);
    
            toast.success(`Email has been sent to ${email}. Click to the link to complete registration.`)
    
            window.localStorage.setItem("emailForRegistration", email);
            setEmail('');
        } catch (err) {
            return toast.error('Something went wrong. Please try again');
        }
    }

   const registerForm = () => <form onSubmit={handleSubmit}>
       <input type="email" value={email} className="form-control" onChange={evt => setEmail(evt.target.value)} autoFocus placeholder='your email'/>
       <br/>
       <button type="submit" className="btn btn-raised">Register</button>
    </form>

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register
