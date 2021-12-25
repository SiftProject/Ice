import Users from "../../../models/userModel"
import jwt from "jsonwebtoken"


export default async (req, res) => {
    switch (req.method) {
      case "GET":
        await verify(req, res);
        break;
    }
  };


  const verify = async (req, res) => {
    try {
        const token = req.query.token
        const user = await Users.findOne({resetpwtoken: token})
        const decoded = jwt.verify(user.resetpwtoken, process.env.ACCESS_TOKEN_SECRET)
        if (decoded){
            res.redirect('/setpassword')
        } else {
             res.json({Err: 'Verification failed..'})
        }

    } catch(err) {
    console.log(err)
    }
}