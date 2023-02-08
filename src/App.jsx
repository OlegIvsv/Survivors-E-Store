import './App.css';
import ShoppingCart from './components/ShoppingCart';
import TopMenu from './components/TopMenu';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className="App bg-gray-200 flex flex-col min-h-screen justify-between">
      <BrowserRouter>
        <TopMenu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
