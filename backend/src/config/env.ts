import { z } from 'zod'

const schema = z.object({
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    API_KEY: z.string().min(1, 'API_KEY is required'),
    PORT: z.coerce.number().default(3000),
})

const parsed = schema.safeParse(process.env)

if (!parsed.success) {
    console.error('Missing or invalid environment variables:')
    console.error(parsed.error.flatten().fieldErrors)
    process.exit(1)
}

export const env = parsed.data
