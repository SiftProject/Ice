import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
     balance: {
       type: Number,
       default: 0
     }
 }, {
     timestamps: true
 })

 let Dataset2 = mongoose.models.wallet || mongoose.model('Transactions', TransactionSchema)
 export default Dataset2
