import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function HomePage() {
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="min-h-screen bg-[#f5f4f0] dark:bg-[#0f0f18] flex flex-col items-center justify-center relative transition-colors duration-300">
            <button
                onClick={toggleTheme}
                className="absolute top-5 right-5 px-4 py-2 rounded-full text-sm font-medium border border-[#1a1a2e]/20 dark:border-white/10 text-[#1a1a2e] dark:text-[#e8e8f0] hover:opacity-70 transition-opacity"
            >
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>

            <div className="flex flex-col items-center gap-6">
                <h1 className="text-9xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent">
                    Learn
                </h1>
                <p className="text-lg tracking-widest text-[#1a1a2e]/50 dark:text-[#e8e8f0]/50 uppercase">
                    Read faster. Think deeper.
                </p>
                <button
                    onClick={() => navigate('/setup')}
                    className="mt-6 px-12 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#a855f7] hover:opacity-90 active:scale-95 transition-all duration-150 shadow-lg shadow-[#7c3aed]/30"
                >
                    Start
                </button>
            </div>
        </div>
    )
}

export default HomePage
