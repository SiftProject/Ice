import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  ascii: {
    type: String,
    required: true
  },
  hex: {
    type: String,
    required: true
  },
  base32: {
    type: String,
    required: true
  },
  otpauth_url: {
    type: String,
    required: true
  },
  secret: {
    type: String
  }
 }, {
     timestamps: true
 })

 let Dataset3 = mongoose.models.twoauths || mongoose.model('twoauths', userSchema)
 export default Dataset3