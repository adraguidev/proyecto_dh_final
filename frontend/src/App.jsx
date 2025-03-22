import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import AdminPanel from './pages/Admin/AdminPanel';
import AddProduct from './pages/Admin/AddProduct';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="app">
        <Header logoSrc="/logo.svg" lema="Tu destino ideal para reservas" />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/agregar-producto" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
