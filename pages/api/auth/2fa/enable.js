import speakeasy from 'speakeasy'
import Users from "../../../../models/userModel"
import connectdb from "../../../../utils/connectdb"
import auth from '../../../../middle/auth'

connectdb()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await enableauth(req, res)
            break;
    }
}


const enableauth = async (req, res) => {
    const result = await auth(req, res)
    const user = result.User
    const x = user.twoauth
    const enabled = new Users({
        twoauth: false
    })
   
    console.log(user)
    const newSecret = speakeasy.generateSecret({ name: "Icecase", account: user });
    console.log(newSecret)
    enabled.save()
    res.json({
        Status: "Twoauth enabled!"
      })


}