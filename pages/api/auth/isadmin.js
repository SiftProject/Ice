import connectdb from "../../../utils/connectdb"
import Users from "../../../models/userModel"
import { withSecureHeaders } from "next-secure-headers";


connectdb()


export default async (req, res) => {
    switch(req.method){
        case "POST":
            await checkrole(req, res)
            break;
    }
}



const checkrole = async (req, res) => {
    try{
        const { username } = req.body
        const user = await Users.findOne({ username })
        const admin = user.admin
        if (admin == false) {
        return   res.json({RoleCheck: user.username + " is not admin."})
    } else {
        res.json({RoleCheck: user.username + " is admin."})
    }






    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
