import { Request, Response, NextFunction } from 'express'
import { env } from '../config/env'

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
    const key = req.headers['x-api-key']
    if (!key || key !== env.API_KEY) {
        res.status(401).json({ error: 'Unauthorized' })
        return
    }
    next()
}
