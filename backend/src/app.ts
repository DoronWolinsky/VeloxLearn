import express from 'express'
import cors from 'cors'
import textsRouter from './routes/texts.routes'

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json())

app.use('/api/texts', textsRouter)

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
})

export default app
