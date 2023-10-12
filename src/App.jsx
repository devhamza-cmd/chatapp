
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Authpage from './pages/auth'
import Home from './pages/home'
import { HashRouter } from 'react-router-dom'
function App() {
  return (
    <HashRouter>
    <Routes>
      <Route path='/' element={<Authpage/>}></Route>
      <Route path='home' element={<Home/>}></Route>
    </Routes>
    </HashRouter>
  )
}

export default App
