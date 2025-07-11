import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPostsPage from "./pages/AllPostsPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AllPostsPage />}  />
        </Routes>
      </Router>
    </>
  );
}

export default App;
