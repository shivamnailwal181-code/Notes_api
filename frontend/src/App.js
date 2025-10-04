import './App.css'
import SignUp from './Mycomponent/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Mycomponent/Home'
import Login from './Mycomponent/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<SignUp />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
