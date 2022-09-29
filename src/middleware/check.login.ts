import User from '../schemas/user.model'
import bcrypt from 'bcrypt'
import AuthController from "../controllers/auth.controller";
import wrapperError from "../containErr/err";

class checkLogin {
    static async checkUserOrAdminRouter(req, res, next) {

        const user = await User.findOne({username: req.body.username})
        if (user) {
            const comparePass = await bcrypt.compare(req.body.password, user.password);
            if (!comparePass) {

                return res.render('./login/login',
                    {
                        registerSuccess: 'none',
                        wrongPassword: 'block'
                    })

            }
            console.log(user.admin)
            let payload = {
                user_id: user.id,
                username: user.username,
                admin: user.admin,
                google_id: user.google_id
            }
            console.log(user.admin)
            await AuthController.createTokenAndSetCookie(req, res, payload)

            if (user.admin === true) {
                res.redirect("/auth/admin")
            } else {
                res.redirect("/auth/user")
            }
        } else {
            return res.json({error: "wrong User"})
        }
    }
}

export default checkLogin