import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from "morgan"
import ErrorHandler from './middlewares/ErrorHandler.js'

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

app.get('/health', (req, res, next)=>{
    try{
        
    }catch(err){
        next(err)
    }
    
})

app.get('/error', (req, res, next) => {
    try {
      throw new Error('This is a test error');
    } catch (err) {
      next(err);
    }
  });


app.use(ErrorHandler)

export default app;