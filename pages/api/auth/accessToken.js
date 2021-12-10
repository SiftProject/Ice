import connectdb from "../../../utils/connectdb"
import Users from "../../../models/userModel"
import {createAccessToken, createRefreshToken} from '../../../utils/generateTokens'
import jwt from 'jsonwebtoken'
import {createAccessToken} from '../../../utils/generateTokens'
import { withSecureHeaders } from "next-secure-headers";


connectdb()


export default async(req,res) => {
  try{
    const rf_token = req.cookies.refreshtoken;
    if(!rf_token) return res.status(400).json({err: 'Please login!!!'})

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
      if(!result) return res.status(400).json({err: 'Your token is incorrect or has expired!'})

      const user = await Users.findbyId(result.username)
      if(!user) return res.status(400).json({err: 'User does not exist...'})

      const accesstoken = createAccessToken({username: user.username})
      res.json({
        accesstoken,
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          root: user.root
        }
      })
}catch(err) {
  return res.status(500).json({err: err.message})

  }
}
