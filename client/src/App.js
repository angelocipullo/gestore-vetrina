import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowcaseRenderer from './screens/NewRenderScreen';
import AdminPanel from './screens/AdminScreen';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowcaseRenderer />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter >
    </div>
  );
}

export default App;
