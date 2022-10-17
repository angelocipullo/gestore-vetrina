import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowcaseRenderer from './screens/ShowcaseRender';
import AdminPanel from './screens/AdminPanel';

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
