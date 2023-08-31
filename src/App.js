import './App.css'
import Navbar from './components/navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/login'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ 
                <div>
                    <Navbar />
                    <h1>Welcome!</h1>
                    <Login />
                </div> } />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
