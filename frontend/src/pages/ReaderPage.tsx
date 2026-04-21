import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface TextData {
    title: string
    body: string
    dir: 'ltr' | 'rtl'
}

interface LocationState {
    text: TextData
    wpm: number
    wordsPerWindow: number
    blurAmount: number
}

interface Chunk {
    globalStart: number
    globalEnd: number
}

interface ParagraphData {
    words: string[]
    startIndex: number
}

function buildData(body: string, wordsPerWindow: number): { chunks: Chunk[], paragraphs: ParagraphData[] } {
    const paragraphTexts = body.split(/\n\n+/)
    const chunks: Chunk[] = []
    const paragraphs: ParagraphData[] = []
    let globalIndex = 0

    for (const para of paragraphTexts) {
        const words = para.split(/\s+/).filter(Boolean)
        paragraphs.push({ words, startIndex: globalIndex })
        for (let i = 0; i < words.length; i += wordsPerWindow) {
            const end = Math.min(i + wordsPerWindow, words.length)
            chunks.push({ globalStart: globalIndex + i, globalEnd: globalIndex + end - 1 })
        }
        globalIndex += words.length
    }

    return { chunks, paragraphs }
}

function ReaderPage() {
    const navigate = useNavigate()
    const { state } = useLocation() as { state: LocationState }
    const { text, wpm, wordsPerWindow, blurAmount } = state

    const { chunks, paragraphs } = useRef(buildData(text.body, wordsPerWindow)).current
    const [index, setIndex] = useState(0)
    const [done, setDone] = useState(false)
    const activeRef = useRef<HTMLSpanElement>(null)

    const intervalMs = (wordsPerWindow / wpm) * 60 * 1000
    const progress = Math.round((index / chunks.length) * 100)
    const currentChunk = chunks[index]
    const blurStyle = { filter: `blur(${blurAmount}px)` }

    useEffect(() => {
        activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, [index])

    useEffect(() => {
        if (done) return
        const timer = setInterval(() => {
            setIndex(prev => {
                if (prev + 1 >= chunks.length) {
                    clearInterval(timer)
                    setDone(true)
                    return prev
                }
                return prev + 1
            })
        }, intervalMs)
        return () => clearInterval(timer)
    }, [done, intervalMs])

    return (
        <div className="min-h-screen bg-[#f5f4f0] dark:bg-[#0f0f18] text-[#1a1a2e] dark:text-[#e8e8f0] flex flex-col transition-colors duration-300">
            <div className="w-full h-1 bg-[#1a1a2e]/10 dark:bg-white/10 shrink-0">
                <div
                    className="h-full bg-gradient-to-r from-[#7c3aed] to-[#a855f7] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <button
                onClick={() => navigate('/setup')}
                className="absolute top-5 left-5 px-4 py-2 rounded-full text-sm font-medium border border-[#1a1a2e]/20 dark:border-white/10 hover:opacity-70 transition-opacity z-10"
            >
                ← Back
            </button>

            {done ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <p className="text-xl opacity-50">You finished the text.</p>
                    <button
                        onClick={() => navigate('/comprehension', { state: { text } })}
                        className="px-12 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#a855f7] hover:opacity-90 active:scale-95 transition-all duration-150 shadow-lg shadow-[#7c3aed]/30"
                    >
                        See results
                    </button>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto px-8 py-24 flex justify-center">
                    <div dir={text.dir} className="max-w-2xl w-full text-xl leading-relaxed">
                        {paragraphs.map((para, pIdx) => {
                            const paraEnd = para.startIndex + para.words.length - 1
                            const isActivePara = currentChunk.globalStart >= para.startIndex && currentChunk.globalStart <= paraEnd

                            if (!isActivePara) {
                                return (
                                    <p key={pIdx} className="mb-6 opacity-20" style={blurStyle}>
                                        {para.words.join(' ')}
                                    </p>
                                )
                            }

                            const localStart = currentChunk.globalStart - para.startIndex
                            const localEnd = currentChunk.globalEnd - para.startIndex
                            const before = para.words.slice(0, localStart)
                            const active = para.words.slice(localStart, localEnd + 1)
                            const after = para.words.slice(localEnd + 1)

                            return (
                                <p key={pIdx} className="mb-6">
                                    {before.length > 0 && (
                                        <span className="opacity-20" style={blurStyle}>
                                            {before.join(' ')}{' '}
                                        </span>
                                    )}
                                    <span
                                        ref={activeRef}
                                        className="bg-[#7c3aed]/15 text-[#7c3aed] rounded-sm"
                                    >
                                        {active.join(' ')}
                                    </span>
                                    {after.length > 0 && (
                                        <span className="opacity-20" style={blurStyle}>
                                            {' '}{after.join(' ')}
                                        </span>
                                    )}
                                </p>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReaderPage