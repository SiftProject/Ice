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
  }
 }, {
     timestamps: true
 })

 let Dataset3 = mongoose.models.twoauth || mongoose.model('twoauth', userSchema)
 export default Dataset3
