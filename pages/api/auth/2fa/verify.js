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
    const {token} = req.body
    try{
        const result = await auth(req, res)
        const user = result.User
        const data = await twofactor.findOne({ user })
        const {base32:secret} = data
    
        const verified = speakeasy.totp.verify({
            secret, encoding: 'base32', token: token, window: 1 
        })
       
        console.log(verified)
        if(verified) {
            res.json({verified: true})
        } else {
            res.json({verified: false})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({Status: "Error generating the secret..."})
    }
}