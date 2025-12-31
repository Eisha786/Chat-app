import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Users from "./Components/Users";

import SignUp from "./Components/SignUp";
import Chat from "./Components/Chat";
import SignIn from "./Components/SignIn"

function App() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
const userId = storedUser?.id; 
// console.log("sd",userId);


  return (
    <>
    
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/chat" element={<Chat userId={userId} />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
