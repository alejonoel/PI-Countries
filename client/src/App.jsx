import './App.css'
import { Routes , Route , BrowserRouter } from 'react-router-dom'
import Home from './Views/Home/Home'
import Details from './Views/Details/Details'
import Form from './Views/Form/Form'
import Landing from './Views/Landing/Landing'
import NavBar from './Components/NavBar/NavBar'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path={"/nav"} element={<NavBar/>}/>
            <Route exact path={"/"} element={<Landing/>}/>
            <Route path={"/home"} element={<Home/>}/>
            <Route path={"/form"} element={<Form/>}/>
            <Route path={"/details/:id"} element={<Details/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
