import connectdb from "../../../utils/connectdb"
import Users from "../../../models/userModel"
import valid from '../../../utils/valid'
import {createAccessToken, createRefreshToken} from '../../../utils/generateTokens'
import { withSecureHeaders } from "next-secure-headers";


connectdb()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await checkbalance(req, res)
            break;
    }
}

const checkbalance = async (req, res) => {
    try{
        const { username } = req.body
        const user = await Users.findOne({ username })
        const balance = user.balance[0]

        res.json({msg: user.username + " balance is "+balance})



    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
