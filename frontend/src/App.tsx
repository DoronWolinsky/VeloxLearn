import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SetupPage from './pages/SetupPage'
import ReaderPage from './pages/ReaderPage'
import ResultPage from './pages/ResultPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/setup" element={<SetupPage />} />
                <Route path="/read" element={<ReaderPage />} />
                <Route path="/result" element={<ResultPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App