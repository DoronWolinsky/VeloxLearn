import { prisma } from '../lib/prisma'
import { CreateTextInput } from '../schemas/texts.schemas'

function computeWordCount(body: string): number {
    return body.split(/\s+/).filter(Boolean).length
}

export async function createText(input: CreateTextInput) {
    return prisma.text.create({
        data: {
            title: input.title,
            body: input.body,
            direction: input.direction,
            wordCount: computeWordCount(input.body),
            questions: {
                create: input.questions.map(q => ({
                    body: q.body,
                    answers: {
                        create: q.answers.map(a => ({
                            body: a.body,
                            isCorrect: a.isCorrect,
                        })),
                    },
                })),
            },
        },
        include: {
            questions: { include: { answers: true } },
        },
    })
}

export async function listTexts() {
    return prisma.text.findMany({
        select: {
            id: true,
            title: true,
            wordCount: true,
            direction: true,
            createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
    })
}

export async function getTextById(id: string) {
    return prisma.text.findUnique({
        where: { id },
        include: {
            questions: { include: { answers: true } },
        },
    })
}
