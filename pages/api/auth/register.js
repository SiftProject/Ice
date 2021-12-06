import connectdb from "../../../utils/connectdb"
import Users from "../../../models/userModel"
import valid from '../../../utils/valid'
import bcrypt from 'bcrypt'
import { withSecureHeaders } from "next-secure-headers";


connectdb()


export default async (req, res) => {
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try{
        const { username, email, password, cf_password } = req.body

        const errMsg = valid(username, email, password, cf_password)
        if(errMsg) return res.status(400).json({err: errMsg})

        const user = await Users.findOne({ email })
        if(user) return res.status(400).json({err: 'This email already exists.'})
        const user2 = await Users.findOne({ username })
        if(user2) return res.status(400).json({err: 'This username already exists.'})

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new Users({
            username, email, password: passwordHash, cf_password
        })

        await newUser.save()



        res.json({
          Status: "Success!"

        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
