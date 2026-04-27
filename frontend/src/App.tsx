import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import HomePage from './pages/HomePage'
import SetupPage from './pages/SetupPage'
import ReaderPage from './pages/ReaderPage'
import ComprehensionPage from './pages/ComprehensionPage'
import ResultPage from './pages/ResultPage'

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/setup" element={<SetupPage />} />
                    <Route path="/read" element={<ReaderPage />} />
                    <Route path="/comprehension" element={<ComprehensionPage />} />
                    <Route path="/result" element={<ResultPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App