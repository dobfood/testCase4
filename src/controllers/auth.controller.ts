import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import User from '../schemas/user.model'
import bcrypt from 'bcrypt'

class AuthController {
    static async login(req, res) {
        let cookieClient = cookie.parse(req.headers.cookie || "")
        if (cookieClient.cookie_user) {
            jwt.verify(cookieClient.cookie_user, process.env.NUMBER_SECRET_TOKEN, (err, decoded) => {

                if (err) {

                    return res.json({message: err.message})

                } else {

                    // if (decoded.admin === true) {

                    //     res.redirect('/auth/admin')

                    // } else {

                    //     res.redirect('/auth/user')

                    // }

                }
            })

        }
        await res.render('./login/login', {
            registerSuccess: 'none',
            wrongPassword: 'none'
        })
    }

    static async logout(req, res) {
        res.cookie("cookie_user", '')
        return res.render('./login/login', {registerSuccess: 'none', wrongPassword: 'none'})
    }

    static async register(req, res) {
        if (req.method === 'GET') {
            return res.render('./login/register', {
                passwordIncorrect: 'none',
                userExist: "none"
            })
        } else {
            const user = await User.findOne({username: req.body.username})
            if (!user) {
                let arrayPass = req.body.password
                if (arrayPass[0] === arrayPass[1])  {
                    const passwordHash = await bcrypt.hash(req.body.password[0], 10)
                    let userData = {username: req.body.username, password: passwordHash}
                    const newUser = await User.create(userData)
                    return res.render('./login/login', {
                        registerSuccess: 'block',
                        wrongPassword: 'none'

                    })
                } else {
                    res.render('./login/register', {
                        passwordIncorrect: 'block',
                        userExist: 'none'
                    })

                }
            } else {
                res.render('./login/register', {
                    passwordIncorrect: 'none',
                    userExist: 'block'
                })
            }
        }

    }

    static async error(req, res) {
        res.render('./user/error')
    }

    static async grantAdminOrUser(req, res) {
        if (req.body.Admin === 'choose') {
            res.render('/auth/admin')
        } else {
            await User.updateOne({username: req.body.nameuser,}, {admin: req.body.Admin})
            res.render('/auth/admin')
        }
    }

    static async createTokenAndSetCookie(req, res, payload) {
        const token = jwt.sign(payload, process.env.NUMBER_SECRET_TOKEN, {expiresIn: 99999})
        res.cookie("cookie_user", token)
    }

    static async OlderTravel(req, res) {

    }
}

export default AuthController