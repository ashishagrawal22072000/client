import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Chat } from './pages/chat';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SetAvatar } from './pages/setAvatar';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Chat />} />
        <Route path="/set-avatar" element={<SetAvatar />} />
      </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
