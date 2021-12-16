import speakeasy from 'speakeasy'
import connectdb from "../../../../utils/connectdb"
import twofactor from '../../../../models/twoauthmodel'

connectdb()

export default async (req, res) => {
    switch(req.method){
        case "POST":
            await validate(req, res)
            break;
    }
}

export const validate = async (req, res) => {
    const {token,username} = req.body
    try{
      
        const data = await twofactor.findOne({ username })
        const {base32:secret} = data
    
        const validated = speakeasy.totp.verify({
            secret, encoding: 'base32', token: token, window: 1 
        })
       
        if(validated) {
            res.json({validated: true})
        } else {
            res.json({validated: false})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({Status: "Error generating the secret..."})
    }
}

