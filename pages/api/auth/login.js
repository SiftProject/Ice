import connectdb from "../../../utils/connectdb"
import Users from "../../../models/userModel"
import valid from '../../../utils/valid'
import {createAccessToken, createRefreshToken} from '../../../utils/generateTokens'
import bcrypt from 'bcrypt'
import requestIp from 'request-ip'
import { withSecureHeaders } from "next-secure-headers";
import Wallet from '../../../models/transactionModel'




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

        const accesstoken = createAccessToken({User: user.username, Balance: user.balance})
        const refreshtoken = createRefreshToken({User: user.username, Balance: user.balance})

        res.json({
          Status: "Login success!",
          AccessToken: accesstoken,
          RefreshToken: refreshtoken,
          user: {
            username: user.username,
            email: user.email,
            role: user.role,
            balanace: user.balance
          }
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
