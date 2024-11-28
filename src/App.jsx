import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import QuoteCreation from "./pages/quote-creation";
import QuoteListing from "./pages/quote-listing";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quote-creation" element={<QuoteCreation />} />
        <Route path="/quote-listing" element={<QuoteListing />} />
      </Routes>
    </>
  );
}

export default App;
