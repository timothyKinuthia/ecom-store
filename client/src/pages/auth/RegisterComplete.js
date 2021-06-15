import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import createUdateUser from "./createUpdateUser";

const RegisterComplete = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();


  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      return toast.error("Email and Password are required!");
    }

    if (password.length < 6) {
      return toast.error("Password must not be too short");
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");

        let user = await auth.currentUser;

        await user.updatePassword(password);

        const idTokenResult = await user.getIdTokenResult();

        const res = await createUdateUser(idTokenResult.token);
          

        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            name: res.data.newUser.name,
            email: res.data.newUser.email,
            token: idTokenResult.token,
            role: res.data.newUser.role,
            _id: res.data.newUser._id,
          },
        });

        history.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} className="form-control" disabled />

      <input
        type="password"
        value={password}
        className="form-control"
        onChange={(evt) => setPassword(evt.target.value)}
        placeholder="password"
        autoFocus
      />

      <button on type="submit" className="btn btn-raised">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md offset-md-3">
          <h4>Complete Registration</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
