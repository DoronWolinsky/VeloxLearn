import { z } from 'zod'

const answerSchema = z.object({
    body: z.string().trim().min(1).max(500),
    isCorrect: z.boolean(),
})

const questionSchema = z.object({
    body: z.string().trim().min(1).max(1000),
    answers: z
        .array(answerSchema)
        .length(4, 'Each question must have exactly 4 answers')
        .refine(
            answers => answers.filter(a => a.isCorrect).length === 1,
            'Each question must have exactly one correct answer'
        ),
})

export const createTextSchema = z.object({
    title: z.string().trim().min(1).max(200),
    body: z.string().trim().min(1).max(100000).refine(
        val => !/<[^>]*>/.test(val),
        'Text body must not contain HTML tags'
    ),
    direction: z.enum(['ltr', 'rtl']),
    questions: z.array(questionSchema).min(1).max(50),
})

export type CreateTextInput = z.infer<typeof createTextSchema>
