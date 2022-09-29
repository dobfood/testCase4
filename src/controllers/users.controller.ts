import jwt from 'jsonwebtoken'
import User from '../schemas/user.model'

class UserController {
    static async homeUser(req, res) {
        let data = await req.headers.cookie
        console.log(data)
        if (data) {
            let accessToken = data.split("=")[1]
            jwt.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
                if (err) {
                    return res.json({message: err.message})
                } else {
                    let payload = decoded;
                    const listUser = await User.find({username: {$nin: [`${decoded.username}`]}});
                    data = {
                        payload: payload,
                        listUser: listUser
                    }
                    res.render("./users/homeUser", {data: data})
                }
            })
        } else {
            res.redirect('/err/error')
        }
    }

    static async privateUser(req, res) {
        let datTa = req.headers.cookie
        if (datTa) {
            let accessToken = await datTa.split('=')[1]
            jwt.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
                if (err) {
                    return res.json({message: err.message})
                } else {
                    let payload = decoded
                    let iUser = payload.user_id;
                    const name = req.params.username
                    const userSelect = await User.findOne({username: name});
                    const listUser = await User.find({username: {$nin: [`${decoded.username}`]}});
                    if (payload.username == req.params.username) {
                        let data = {
                            name: payload.username,
                            block: "block",
                            iUser: iUser,
                            listUser: listUser
                        }
                        res.render('./user/privateUser', {data: data})
                    }
                }
            })
        }
    }

    static async homeAdmin(req, res) {
        let data = await req.headers.cookie
        if (data) {
            let accessToken = data.split('=')[1]
            jwt.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
                    if (err) {
                        return res.json({message: err.message})
                    } else {
                        let payload = decoded
                        const nameAdmin = payload.username
                        const listUser = await User.find({
                            $and: [{username: {$nin: [`${decoded.username}`]}}, {admin: false}]
                        })
                        let data = {
                            payload: payload,
                            listUser: listUser,
                            nameAdmin: nameAdmin,
                            display: "block"
                        }
                        res.render("./users/homeAdmin", {data: data})
                    }

                })
        }
        else{
            res.redirect('./err/error')
        }
    }
}

export default UserController