import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import DetailsPage from "./pages/DetailsPage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;