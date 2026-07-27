import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  return <h1>Welcome to PostMarket</h1>;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}