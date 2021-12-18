import speakeasy from 'speakeasy'
import connectdb from "../../../../utils/connectdb"
import twofactor from '../../../../models/twoauthmodel'

connectdb()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await verifyauth(req, res)
            break;
    }
}

const verifyauth = async (req, res) => {
    const {token,user} = req.body
    try{
        const data = await twofactor.findOne({ user })
        const {base32:secret} = data
    
        const verified = speakeasy.totp.verify({
            secret, encoding: 'base32', token: token, window: 1 
        })
       
        console.log(verified)
        if(verified) {
            const confirmed = new twofactor({
                username: user, ascii: data.ascii, hex: data.hex, base: data, otpauth_url: data.otpauth_url
            })
            res.json({verified: true})
        } else {
            res.json({verified: false})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({Status: "Error generating the secret..."})
    }
}