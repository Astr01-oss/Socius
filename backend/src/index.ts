import  express from "express";
import cors from 'cors'
import userRoutes from './routes/uesr.routes'
import matchRoutes from './routes/match.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', userRoutes)
app.use('/mathces', matchRoutes)

app.listen(3000, () => {
  console.log(`Server started, on port: 3000`)
})