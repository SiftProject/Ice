import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true,
    },
    ipaddress: {
      type: String
    }
   }, {
       timestamps: true
   })
  
   let Dataset3 = mongoose.models.ipaddresses || mongoose.model('ipaddresses', userSchema)
   export default Dataset3