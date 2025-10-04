import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const Middleware = async (req, res, next) => {

    try {
        console.log("middleware")
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if (!token) {
            return res.status(401).json({ success: false, message: "unauthorized(token not present)" })
        }
        const decoded = jwt.verify(token, 'secretkeyofnoteapp');
        console.log(decoded)

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Wrong token cant access" })
        }
        const user = await User.findById({ _id: decoded.id })

        if (!user) {
            return res.status(404).json({ success: false, message: "No user found" })
        }
        const newUser = { name: user.name, id:user._id}
        req.user = newUser  
        next()
    } catch (err) {
        return res.status(500).json({ success: false, message: err })
    }
}
export default Middleware