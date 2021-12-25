import jwt from "jsonwebtoken"
import Users from "../../../../models/userModel"
import connectdb from "../../../../utils/connectdb";
import bcrypt from "bcrypt";

export default async (req, res) => {
    switch (req.method) {
      case "POST":
        await setpass(req, res);
        break;
    }
  };


  const setpass = async (req, res) => {
    try{
        connectdb()
        const {token,  email, password, cf_password } = req.body

        if(!token) return res.json({Error: "Token is missing" })

        const user = await Users.findOne({ email })
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if(!decoded) return res.json({Error: "Token incorrect or expired..." })

        if(decoded.Email === email) {
            user.resetpwtoken = null
            user.password = passwordHash
            user.cf_password = passwordHash
            await user.save()
            res.json({
                Status: "Success, password has been reset!" })
        } else {
            res.json({
                Error: "Something went wrong" })
        }


    
} catch(error) {
    res.json({Error: "Token either invalid or expired...." })}
}