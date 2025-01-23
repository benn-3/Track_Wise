import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Trainers from './pages/Trainers/Trainers'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar />
        <div className="main-container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trainers" element={<Trainers />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
