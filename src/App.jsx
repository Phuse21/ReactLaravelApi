import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Layout from './Pages/layout'
import Home from './Pages/home'
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


