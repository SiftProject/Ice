import jwt from 'jsonwebtoken'
import connectdb from "../../../utils/connectdb"
import Users from "../../../models/userModel"
import nodemailer from 'nodemailer'
import {createAccessToken, createRefreshToken} from '../../../utils/generateTokens'
import crypto from 'crypto'





export default async  (req, res) => {
    switch(req.method){
        case "POST":
            await reset(req, res)
            break;
    }
}

const transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS, 
    },
  });

const reset = async (req, res) => {
    try{
        connectdb()
        const { email } = req.body
        const useremail = await Users.findOne({ email })
        
        if(!useremail) return res.status(400).json({err: 'This email does not exist!'})

        const pwtoken = createAccessToken({Email: email, Id: crypto.randomBytes(12).toString('hex') })

        const newUser = new Users({
           username: useremail.username,password: useremail.password, email: useremail, resetpwtoken: pwtoken, ipaddress: useremail.ipaddress
        })

        newUser.save()

        var mailOptions = {
            from: '"Password Reset" noreply@icecase.net',
            to: email.username,
            subject: 'IceCase - Password Reset',
            html: `<h2> ${newUser.username}! You have requested to reset your password.. </h2>
              <h4>If you didn't request a password reset then ignore this! </h4>
              <a href="http://${req.headers.host}/api/passwordreset/verify?token=${newUser.resetpwtoken}">Reset password</a>
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
            Status: "Success, password reset has been sent, please check your email!" })

    } catch(err) {
        console.log(err)
    }
}