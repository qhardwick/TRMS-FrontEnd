import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Messages from './pages/Messages'
import Forms from './pages/Forms'
import NewFormRequest from './components/NewRequestForm'
import NewFormAttachments from './components/NewFormAttachments'

function App() {

  return (
    <main>
      <BrowserRouter basename='/'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forms' element={<Forms />}>
            <Route path='new' element={<NewFormRequest />} />
            <Route path='new-attachments' element={<NewFormAttachments />} />
          </Route>
          <Route path='/messages' element={<Messages />} />
          <Route path='*' element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  )
}

export default App
