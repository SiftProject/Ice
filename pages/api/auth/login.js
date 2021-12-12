import connectdb from "../../../utils/connectdb"
import Users from "../../../models/userModel"
import {validlogin} from "../../../utils/valid";
import {createAccessToken, createRefreshToken} from '../../../utils/generateTokens'
import bcrypt from 'bcrypt'




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

        const errMsg = validlogin(username, password)
        if(errMsg) return res.status(400).json({err: errMsg})


        const user = await Users.findOne({ username })
        if(!user) return res.status(400).json({err: 'This username does not exist!'})


        const matchpw = await bcrypt.compare(password, user.password)
        if(!matchpw) return res.status(400).json({err: 'Oops something went wrong...'})

        const accesstoken = createAccessToken({User: user.username})
        const refreshtoken = createRefreshToken({User: user.username})

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
