import connectdb from "../../../utils/connectdb";
import Users from "../../../models/userModel";
import {validsignup} from "../../../utils/valid";
import bcrypt from "bcrypt";
import {createAccessToken, createRefreshToken} from '../../../utils/generateTokens'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS, 
  },
});

const register = async (req, res) => {
    try{
      connectdb();
        const { username, email, password, cf_password } = req.body

        const errMsg = validsignup(username, email, password, cf_password)
        if(errMsg) return res.status(400).json({err: errMsg})

        const user = await Users.findOne({ email })
        if(user) return res.status(400).json({err: 'This email already exists.'})
        const user2 = await Users.findOne({ username })
        if(user2) return res.status(400).json({err: 'This username already exists.'})
        
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new Users({
            username, email, password: passwordHash, cf_password, confirmed: false, emailToken: crypto.randomBytes(64).toString('hex')
        })
       
        await newUser.save()


        const accesstoken = createAccessToken({User: username})
        const refreshtoken = createRefreshToken({User: username})
        var mailOptions = {
          from: '"Verify your email" testingicecasemail@gmail.com',
          to: newUser.email,
          subject: 'IceCase - Verify your email',
          html: `<h2> ${newUser.username}! Thanks for registering on IceCase </h2>
            <h4>Please verify your email to use our website! </h4>
            <a href="http://${req.headers.host}/api/email/verify?token=${newUser.emailToken}">Verify</a>
          `
        }
        transporter.sendMail(mailOptions, function(error,info) { 
        if(error) {
          console.log(error)
        } else {
          console.log('Verfication email has been sent')
        }
        
        })

        res.json({
          Status: "Success!",
          AccessToken: accesstoken,
          RefreshToken: refreshtoken

        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}
