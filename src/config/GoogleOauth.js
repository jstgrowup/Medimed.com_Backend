
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const UserModel = require("../models/User.model");

require("dotenv").config()
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,

    // callbackURL: "http://localhost:8080/auth/google/callback"

    callbackURL: "https://medimedcom-backend-production.up.railway.app/auth/google/callback"


},
    async function (accessToken, refreshToken, profile, done) {
        const { given_name, family_name, email, picture } = profile._json
        try {
            const check = await UserModel.find({ email: email })
            if (check) done(null, check)
            const user = await UserModel.create({ firstName: given_name, lastName: family_name, email: email, imageURL: picture })
            done(null, user)
        } catch (error) {
            done(null, error)
        }
    }
));
passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})
module.exports = passport
