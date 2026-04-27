import { Router } from 'express'
import { requireApiKey } from '../middleware/apiKey'
import { handleCreateText, handleListTexts, handleGetText } from '../controllers/texts.controller'

const router = Router()

router.get('/', handleListTexts)
router.get('/:id', handleGetText)
router.post('/', requireApiKey, handleCreateText)

export default router
