import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
         type: String,
         required: true,
         unique: true
     },
     password: {
         type: String,
         required: true
     },
     balance: {
       type: String,
       value: "0$"
     },
     role: {
         type: String,
         default: 'user'
     },
     admin: {
         type: Boolean,
         default: false
     },
     avatar: {
         type: String,
         default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
     }
 }, {
     timestamps: true
 })

 let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
 export default Dataset
