import { useState, useContext, useEffect } from "react";
import React from "react";
import valid from "../../utils/valid";
import { postData } from "../../utils/fetchdata";
import { useDispatch } from "react-redux";

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
      const errMsg = valid(username, email, password, cf_password);
      if (errMsg) throw new Error(errMsg);
      console.log(userData);
      // const res = await postData("/api/auth/register", userData);
      // if (res.err) throw new Error(res.err);
    } catch (err) {
      //TODO: slide Error with the err.message
      console.log(err.message);
    }
  };

  return (
    <div style={{ backgroundColor: "pink" }}>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" value={username} onChange={handleInputchange} />
        <br />
        <input name="email" value={email} onChange={handleInputchange} />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputchange}
        />
        <br />
        <input
          type="password"
          name="cf_password"
          value={cf_password}
          onChange={handleInputchange}
        />
        <br />
        <button type="submit" value="Register">
          Sign up
        </button>
      </form>
      <button onClick={() => dispatch({ type: "CLOSE_SIGNUP" })}>close</button>
    </div>
  );
};

export default SignUp;
