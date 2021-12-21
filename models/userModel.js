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
     role: {
         type: String,
         default: 'user'
     },
     ipaddress: {
         type: String,
         required: true
     },
     realtimeipaddress: {
        type: String
     },
     balance: {
         type: Number,
         default: 0,
     },
     avatar: {
         type: String,
         default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
     },
     twoauth: {
        type: Boolean,
        default: false
    },
    emailToken: {
        type: String
    },
    confirmed: {
        type: Boolean
    }
 }, {
     timestamps: true
 })

 let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
 export default Dataset
