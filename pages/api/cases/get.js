import connectdb from "../../../utils/connectdb"
import Cases from "../../../models/casesModel"

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
          
    
            Cases.find().then((cases) => {
                res.json(cases);
              })
           
            
        
        } catch (err) {
            return res.status(500).json({err: err.message})
        }
    }