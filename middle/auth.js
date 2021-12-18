import jwt from 'jsonwebtoken'
import Users from '../models/userModel'


const auth = async (req, res) => {
    const token = req.headers.authorization;
    if(!token) return res.status(400).json({err: 'Invalid Auth.'})

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if(!decoded) return res.status(400).json({err: 'Invalid Auth.'})

    const user = await Users.findOne({username: decoded.User})
    const balance = user.balance
    return {User: user.username, role: user.role, root: user.root, balance: balance};
}


export default auth