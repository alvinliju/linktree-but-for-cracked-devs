import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import ErrorHandler from './middlewares/ErrorHandler.js';
import authRoutes from './routes/authRoutes.js';


const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));
  
  // Initialize Passport and use session
  app.use(passport.initialize());
  app.use(passport.session());

app.get('/health', (req, res, next)=>{
    try{
        
    }catch(err){
        next(err)
    }
    
})

//auth routes
app.use('/api', authRoutes)


// app.use(ErrorHandler)

export default app;