import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
    return (
        <div className="h-screen bg-gray-900 flex items-center justify-center">
            <button className="px-20 py-20 rounded-full bg-purple-600 text-purple-100 text-2xl font-semibold hover:bg-purple-700 transition">
                Start
            </button>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)