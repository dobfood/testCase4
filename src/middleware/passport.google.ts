// import GoogleStrategy from 'passport-google-oauth20'
// import passport from 'passport';
// import User from "../schemas/user.model";
//
//
// passport.serialize((user, done) => {
//     done(null, user)
// })
// passport.deserializeUser((user, done) => {
//     User.findById(id).then(user => {
//         done(null, user)
//     })
//         .catch(err => {
//             console.log(err.message)
//         })
// })
// passport.use(new GoogleStrategy({
//         clientID: '199278386394-15vbs31qh1ev1mi88779c0ebj4olfo3h.apps.googleusercontent.com',
//         clientSecret: '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',
//         callbackURL: 'http://localhost:2212/auth/google/callback',
//         passReqToCallback: true
//     },
// ))