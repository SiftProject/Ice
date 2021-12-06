import connectdb from "../../../utils/connectdb"
import Users from "../../../models/userModel"
import valid from '../../../utils/valid'
import {createAccessToken, createRefreshToken} from '../../../utils/generateTokens'
import bcrypt from 'bcrypt'
import requestIp from 'request-ip'
import { withSecureHeaders } from "next-secure-headers";




connectdb()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await login(req, res)
            break;
    }
}


const login = async (req, res) => {
    try{
        const { username, password } = req.body


        const user = await Users.findOne({ username })
        if(!user) return res.status(400).json({err: 'This username does not exist!'})


        const matchpw = await bcrypt.compare(password, user.password)
        if(!matchpw) return res.status(400).json({err: 'Oops something went wrong...'})

        const accesstoken = createAccessToken({User: user.username, Id: user._id})
        const refreshtoken = createRefreshToken({User: user.username, Id: user._id})

        res.json({
          Status: "Login success!",
          AuthToken: accesstoken,
          RefreshToken: refreshtoken,
          user: {
            username: user.username,
            email: user.email
          }
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
