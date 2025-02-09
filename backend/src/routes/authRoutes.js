import dotenv from 'dotenv'
import express from 'express'
import axios from 'axios'
import session from 'express-session'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import GithubStratergy from 'passport-github'
import {User} from '../models/User.js'

const router = express.Router()

router.use(passport.initialize())
router.use(passport.session())

passport.use(new GithubStratergy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
},async (accessToken, refreshToken, profile, done)=>{
    try{
        let user = await User.findOne({githubId: profile.id })
        if(!user){
            user = new User({
                githubId: profile.id,
                username: profile.username,
                email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
                avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
                profile:{
                    bio: profile._json && profile._json.bio ? profile._json.bio : '',
                    displayName: profile.displayName || '',
                    skills: [],
                    location: ''
                },
                account:{
                    isActive:true
                }
            })
            await user.save();
        }

        return done(null, user)
    }catch(err){
        return done(err, null);
    }
})
)




passport.serializeUser((user, done)=> done(null, user.id))
passport.deserializeUser(async (id, done)=>{
    try{
        const user = await User.findById({id})
        done(null, user)
    }catch(err){
        done(err, null)
    }
})


const generateToken = (user) => {
    return jwt.sign({id:user.id, username:user.username}, process.env.JWT_SECRET, {expiresIn: '200h'})
}


router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', {failureRedirect:'/login'}),
    (req, res)=>{
        const token = generateToken(req.user);
        res.json({token})
    }
)


router.get('/me', async (req, res)=>{
    const token = await req.headers.token;
    console.log(token)
    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({user:decoded})
    }catch(err){
        res.status(401).json({message: 'Invalid token'})
    }
})

export default router