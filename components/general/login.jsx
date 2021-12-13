import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import styles from '../../styles/login.module.sass'

const Login = () => {
    const dispatch = useDispatch();
    const originalState = { email: "", password: "" };
    const [userData, setUserData] = useState(originalState);
    const { email, password } = userData;

    const handleInputchange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('login sumitted')
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
                            <label>Email</label>
                            <input name="email" value={email} onChange={handleInputchange} />
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
