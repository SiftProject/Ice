import mongoose from 'mongoose'

const CasesSchema = new mongoose.Schema({
  caseId: {
    type: String
  },
  caseName: {
    type: String,
    required: true
  },
  casePrice: {
    type: Number,
    required: true
  },
  caseImage: {
    type: String,
    required: true
  },
  caseItems: {
      type: Array,
      required: true
  },
  caseType: {
    type: Array
  },
  isHot: {
    type: Boolean
  },


 }, {
     timestamps: true
 })

 let Dataset2 = mongoose.models.cases || mongoose.model('cases', CasesSchema)
 export default Dataset2
