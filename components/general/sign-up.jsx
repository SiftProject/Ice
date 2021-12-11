import {useState, useContext, useEffect} from 'react'
import React from 'react'
import valid from '../utils/valid'
import {postData} from '../utils/fetchdata'

const Register = () => {
  const originalState = {username: '', email: '' , password: '', cf_password: ''}
  const [userData, setUserData] = useState(originalState)
  const {username, email, password, cf_password} = userData

const handleInputchange = e => {
  const {name, value} = e.target
  setUserData({...userData, [name]:value})

}

const handlereg = async e => {
 e.preventDefault()
 const errMsg = valid(username,email,password,cf_password)
 if (errMsg) console.log(errMsg)

const res = await postData('auth/register', userData)
if(res.err) return console.log(res.err)


}

  return (
    <div>
    <h1>Sign up test</h1>
    <form onSubmit={handlereg}>
    <input
    type="text"
    id="username"
    name="username"
    value={username} onChange={handleInputchange}
     />
     <br />
        <input
        type="text"
        name="email"
        id="email"
        value={email} onChange={handleInputchange}
         />

         <br />
          <input
        type="password"
        name="password"
        id="password"
        value={password} onChange={handleInputchange}         />
         <br />
         <input
       type="password"
       name="cf_password"
       id="cf_password"
       value={cf_password} onChange={handleInputchange}
        />
        <br />
        <button type="submit" value="Register">Register</button>

    </form>
    </div>
  )
}

export default Register
