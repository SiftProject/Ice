import mongoose from 'mongoose'

const CasesSchema = new mongoose.Schema({
  caseName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  caseImage: {
    type: String,
    required: true
  },
  content: {
      type: Array,
      required: true
  }

 }, {
     timestamps: true
 })

 let Dataset = mongoose.models.case || mongoose.model('Cases', CasesSchema)
 export default Dataset
