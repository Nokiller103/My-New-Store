import React, {useState, useEffect} from 'react';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import {Routes, Route} from 'react-router-dom';
import NavSection from './component/NavSection';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "black" : "white";
    document.body.style.color = isDarkMode ? "white" : "black";
  }, [isDarkMode]);
 return(
  <div>
    <NavSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
    <Routes>
      <Route path="/" element={<HomePage isDarkMode={isDarkMode} /> }/>
      <Route path="/create" element={<CreatePage isDarkMode={isDarkMode} />}/>
    </Routes>
    <ToastContainer 
        position="bottom-center" 
        autoClose={3000} 
        hideProgressBar 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light" 
      />

      {/* Toast Container for Success Messages */}
      <ToastContainer 
        enableMultiContainer 
        containerId="success" 
        position="bottom-center" 
        autoClose={2000} 
        theme="success" 
      />

      {/* Toast Container for Error Messages */}
      <ToastContainer 
        enableMultiContainer 
        containerId="error" 
        position="bottom-center" 
        autoClose={4000} 
        theme="dark" 
      />
  </div>
 )
}

export default App
