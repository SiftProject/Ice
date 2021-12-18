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

 let Dataset2 = mongoose.models.cases || mongoose.model('cases', CasesSchema)
 export default Dataset2
