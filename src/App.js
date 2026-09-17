import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Info from "./pages/Info";
function App() {
  // logic
    const [ingredients, setIngredients] = useState([]); // 사용자가 입력할 재료

  // view
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info sendIngredients={(data) => setIngredients(data)} />} />
      <Route path="/chat" element={<Chat ingredients={ingredients} />} />
    </Routes>
  );
}

export default App;
