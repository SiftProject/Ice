import { useState, useContext, useEffect } from "react";
import React from "react";
import { postData } from "../../utils/fetchdata";
import {validsignup} from "../../utils/valid";
import { useDispatch } from "react-redux";
import styles from '../../styles/sign-up.module.sass'

const SignUp = () => {
  const dispatch = useDispatch();
  const originalState = {
    username: "",
    email: "",
    password: "",
    cf_password: "",
  };
  const [userData, setUserData] = useState(originalState);
  const { username, email, password, cf_password } = userData;

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const errMsg = validsignup(username, email, password, cf_password);
      if (errMsg) throw new Error(errMsg);
      console.log(userData);
       const res = await postData("/auth/register", userData);
      if (res.err) throw new Error(res.err);
    } catch (err) {
      //TODO: slide Error with the err.message
      console.log(err.message);
    }
  };

  const closePop = () => dispatch({ type: "CLOSE_SIGNUP" })

  return (
    <div className={styles.signParent}  onMouseDown={closePop}>
      <div className={styles.signPop}  onMouseDown={(e) => e.stopPropagation()}>
        <span className={styles.x} onClick={closePop}>✕</span>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputSet}>
            <label>Username</label>
            <input name="username" value={username} onChange={handleInputchange} />
          </div>

          <div className={styles.inputSet}>
            <label>Email</label>
            <input name="email" value={email} onChange={handleInputchange} />
          </div>
          
          <div className={styles.inputSet}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputchange}
            />
          </div>

          <div className={styles.inputSet}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="cf_password"
              value={cf_password}
              onChange={handleInputchange}
            />
          </div>
          <button type="submit" value="Register">Sign up</button>
        </form>
        <p>Already have an account? <span>Login</span></p>
      </div>
    </div>
  );
};

export default SignUp;
