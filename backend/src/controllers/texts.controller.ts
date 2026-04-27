import { Request, Response, NextFunction } from 'express'
import { createTextSchema } from '../schemas/texts.schemas'
import { createText, listTexts, getTextById } from '../services/texts.service'

export async function handleCreateText(req: Request, res: Response, next: NextFunction) {
    try {
        const parsed = createTextSchema.safeParse(req.body)
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.flatten() })
            return
        }
        const text = await createText(parsed.data)
        res.status(201).json({ text })
    } catch (err) {
        next(err)
    }
}

export async function handleListTexts(req: Request, res: Response, next: NextFunction) {
    try {
        const texts = await listTexts()
        res.json({ texts })
    } catch (err) {
        next(err)
    }
}

export async function handleGetText(req: Request, res: Response, next: NextFunction) {
    try {
        const text = await getTextById(req.params.id as string)
        if (!text) {
            res.status(404).json({ error: 'Text not found' })
            return
        }
        res.json({ text })
    } catch (err) {
        next(err)
    }
}
