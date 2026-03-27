import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import cardRoutes from './routes/card.routes'
import matchRoutes from './routes/match.routes'
import 'dotenv/config'

const app = express()

app.use(cors())
app.use(cookieParser());
app.use(express.json())

app.use('/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/cards', cardRoutes)
app.use('/matches', matchRoutes) 

app.listen(3000, () =>{
  console.log('Сервер запущен на 3000ом порту')
})