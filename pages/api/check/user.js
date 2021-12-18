import connectdb from "../../../utils/connectdb"
import auth from '../../../middle/auth'

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await checkuser(req, res)
            break;
    }
}

const checkuser = async (req, res) => {
    try{
        const result = await auth(req, res)
        const user = result.User
        res.json({Username: user

        })
        



    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

