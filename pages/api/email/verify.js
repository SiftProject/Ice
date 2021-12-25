import Users from "../../../models/userModel"
import connectdb from "../../../utils/connectdb"



export default async (req, res) => {
    switch (req.method) {
      case "GET":
        await verify(req, res);
        break;
    }
  };


  const verify = async (req, res) => {
    try {
        const token = req.query.token
        const user = await Users.findOne({emailToken: token})
        if (user){
            user.emailToken = null
            user.confirmed = true
            await user.save()
            res.redirect('/')
        } else {
             res.json({Err: 'Verification failed..'})
        }

    } catch(err) {
    console.log(err)
    }
}