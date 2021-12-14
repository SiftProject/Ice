import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import styles from '../../styles/login.module.sass'
import {validlogin} from '../../utils/valid'
import { postData } from "../../utils/fetchdata";

const Login = () => {
    const dispatch = useDispatch();
    const originalState = { username: "", password: "" };
    const [userData, setUserData] = useState(originalState);
    const { username, password } = userData;

    const handleInputchange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errMsg = validlogin(username,password)
    if (errMsg) console.log(errMsg)
        console.log('login submitted...')
    const res = await postData("/auth/login", userData);
   
      };
    
    const closePop = () => dispatch({ type: "CLOSE_LOGIN" })

    return (
        <div className={styles.loginPopParent} onMouseDown={closePop}>
            <div className={styles.loginPop} onMouseDown={(e) => e.stopPropagation()}>
                <span className={styles.x} onClick={closePop}>✕</span>
                <div className={styles.popLeft}>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputHolder}>
                            <label>Username</label>
                            <input name="username" value={username} onChange={handleInputchange} />
                        </div>
                        <div className={styles.inputHolder}>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleInputchange}
                            />
                        <small>Forgot password?</small>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <p>Already have an account? <span>Sign up</span></p>
                </div>
               <div className={styles.popRight}>
                    <p>OR login with...</p>
                    <div className={styles.buttonsHolder}>
                        <button className={styles.googleBtn}>Google</button>
                        <button className={styles.steamBtn}>Steam</button>
                        <button className={styles.fbBtn}>Facebook</button>
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default Login;
