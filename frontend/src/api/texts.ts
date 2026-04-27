import { apiClient } from './client'

export interface TextSummary {
    id: string
    title: string
    wordCount: number
    direction: string
    createdAt: string
}

export interface TextFull {
    title: string
    body: string
    dir: 'ltr' | 'rtl'
    questions: {
        question: string
        answers: { text: string; correct: boolean }[]
    }[]
}

interface RawText {
    title: string
    body: string
    direction: string
    questions: {
        body: string
        answers: { body: string; isCorrect: boolean }[]
    }[]
}

function transformText(raw: RawText): TextFull {
    return {
        title: raw.title,
        body: raw.body,
        dir: raw.direction as 'ltr' | 'rtl',
        questions: raw.questions.map(q => ({
            question: q.body,
            answers: q.answers.map(a => ({
                text: a.body,
                correct: a.isCorrect,
            })),
        })),
    }
}

export const textsApi = {
    list: () => apiClient.get<{ texts: TextSummary[] }>('/texts'),
    get:  async (id: string) => {
        const data = await apiClient.get<{ text: RawText }>(`/texts/${id}`)
        return transformText(data.text)
    },
}
