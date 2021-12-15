import speakeasy from 'speakeasy'
import connectdb from "../../../../utils/connectdb"
import auth from '../../../../middle/auth'
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
    try{
        const result = await auth(req, res)
        const user = result.User
        const token = req.body
        const data = await twofactor.findOne({ user })
        const secret = data.base
        console.log(data)
        console.log(secret)
        const verified = speakeasy.totp.verify({
            secret, token 
        })

        if(verified) {
            const confirmed = new twofactor({
                username: user, ascii: data.ascii, hex: data.hex, base: data.base32, otpauth_url: data.otpauth_url
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