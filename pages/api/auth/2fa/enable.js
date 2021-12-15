import speakeasy from 'speakeasy'
import connectdb from "../../../../utils/connectdb"
import auth from '../../../../middle/auth'
import twofactor from '../../../../models/twoauthmodel'

connectdb()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await enableauth(req, res)
            break;
    }
}


const enableauth = async (req, res) => {
    try{
    const result = await auth(req, res)
    const user = result.User
    const newSecret = speakeasy.generateSecret({ name: "Icecase", account: user });
    const enabled = new twofactor({
        username: user, ascii: newSecret.ascii, hex: newSecret.hex, base32: newSecret.base32, otpauth_url: newSecret.otpauth_url
    })
    enabled.save()
    res.json({
        Status: "Twoauth enabled!",
        Secret: newSecret.base32
      }) 


}catch(err){
    console.log(err)
    return res.status(500).json({Status: "Error generating the secret..."})

}
}