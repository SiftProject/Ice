import mongoose from 'mongoose'

const CasesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  content: {
      type: String,
      required: true
  },
  image: {
      type: Array,
      required: true
  }
 }, {
     timestamps: true
 })

 let Dataset = mongoose.models.case || mongoose.model('Cases', CasesSchema)
 export default Dataset
