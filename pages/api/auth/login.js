import connectdb from "../../../utils/connectdb"
import Users from "../../../models/userModel"
import valid from '../../../utils/valid'
import {createAccessToken, createRefreshToken} from '../../../utils/generateTokens'


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

        const passwordHash = await bcrypt.hash(password, 12)

        const matchpw = await bcrypt.compare(password, user.password)
        if(!matchpw) return res.status(400).json({err: 'This password is incorrect'})

        const accesstoken = createAccessToken({id: user._id})
        const refreshtoken = createRefreshToken({id: user._id})

        res.json({
          msg: "Login Success!",
          refreshtoken,
          accesstoken,
          user: {
            username: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            root: user.root
          }
        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
