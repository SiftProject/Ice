import connectdb from "../../utils/connectdb"
import Cases from "../../models/casesModel"
import { withSecureHeaders } from "next-secure-headers";

connectdb()

export default async (req, res) => {
    switch(req.method){
        case "GET":
            await getcases(req, res)
            break;
    }
}



    const getcases = async (req, res) => {
        try {
            const features = new (Cases.find(req.query))
          
    
            const cases = await features.query
            
            res.json({
                status: 'success',
                result: cases.length,
                cases
            })
        } catch (err) {
            return res.status(500).json({err: err.message})
        }
    }