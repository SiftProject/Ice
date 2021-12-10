import connectdb from "../../utils/connectdb"
import Cases from "../../models/casesModel"
import auth from '../../middle/auth'

connectdb()


export default async (req, res) => {
    switch(req.method){
        case "POST":
            await createcase(req, res)
            break;
    }
}

const createcase = async (req, res) => {
    try{
        const result = await auth(req, res)
        if(result.role !== 'admin') 
        return res.status(400).json({err: 'Authentication is not valid.'})
        const { name, price , content, image} = req.body


        const case3 = await Cases.findOne({ name })
        if(case3) return res.status(400).json({err: 'This case already exists.'})
      

        const newcases = new Cases({
             name, price, content , image
        })

        await newcases.save()



        res.json({
          Status: "Success! new case was created"

        })

    }catch(err){
        return res.status(500).json({err: err.message})
    }
}

