import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css';  
import App from './App'
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(
  <>
      <ToastContainer/>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
  </>
)
