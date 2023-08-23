import './App.css'
import Navbar from './components/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Vid from './components/vid_page'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ 
                <div>
                    <Navbar />
                    <h1>Welcome!</h1>
                </div> } />
                <Route path="/main" element={<Vid />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
