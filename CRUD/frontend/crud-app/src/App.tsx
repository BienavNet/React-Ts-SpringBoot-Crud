import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from 'react-redux'
import store from './store/store'

import { RegisterComponent } from './components/RegisterComponent'
import { ListComponent } from './components/ListComponent'
import { UpdateComponent } from './components/UpdateComponent'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ListComponent/>} />
          <Route path='/register' element={<RegisterComponent/>}/>
          <Route path='/update/:id' element={<UpdateComponent />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
