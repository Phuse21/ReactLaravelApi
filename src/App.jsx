import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Layout from './Pages/layout'
import Home from './Pages/home'
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import { useContext } from 'react';
import { AppContext } from './Pages/Context/AppContext';
import CreatePost from './Pages/Posts/CreatePost';
import ShowPost from './Pages/Posts/ShowPost';
import UpdatePost from './Pages/Posts/UpdatePost';

export default function App() {

  const {user} = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/createPost" element={user ? <CreatePost /> : <Login />} />
          <Route path="/posts/updatePost/:id" element={user ? <UpdatePost /> : <Login />} />
          <Route path='/posts/:id' element={<ShowPost />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}


