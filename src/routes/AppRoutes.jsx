import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

function Home() {
  return <h1>Welcome to PostMarket</h1>;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}