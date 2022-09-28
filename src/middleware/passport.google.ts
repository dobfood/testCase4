import GoogleStrategy from 'passport-google-oauth20'
import passport from 'passport';
import User from "../schemas/user.model";

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        console.log(err);
    })
});
passport.use(new GoogleStrategy({
        clientID: '252720753725-abbhvse06u3jo7l9hng0krpn7j6olvn5.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:2212/auth/google/callback',
        passReqToCallback: true
    },
    async function (request, accessToken, refreshToken, profile, done) {
        try {
            let user = await User.findOne({
                google_id: profile.id
            })
            if (!user) {
                let data = {
                    username: profile.displayName,
                    google_id: profile.id
                }
                let user = new User(data);
                await user.save()

            }
            return done(null, user)
        } catch (e) {
            return done(null, false)
        }
    }
))


export default passport