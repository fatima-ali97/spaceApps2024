import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Co2budgets from './pages/Co2budgets';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" element={<Layout />}>
        <Route index element={<Co2budgets />} />
      </Route>
    </BrowserRouter>
  );
}

export default App;
