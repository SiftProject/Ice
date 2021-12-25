import connectdb from "../../../utils/connectdb"
import auth from '../../../middle/auth'



connectdb()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await checkbalance(req, res)
            break;
    }
}

const checkbalance = async (req, res) => {
    try{
        const result = await auth(req, res)
        const user = result.balance
        res.json({Balance: user

        })



    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
