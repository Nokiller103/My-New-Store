import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom";

const Page = () => {
  return (
    <BrowserRouter>
     <App />
    </BrowserRouter>
  );
};

// Create a root using ReactDOM.createRoot()
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component into the root
root.render(<Page />);
