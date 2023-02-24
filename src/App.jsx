import './App.css';
import { ShoppingCart } from './components/shopping-cart/ShoppingCart';
import { TopMenu } from './components/navbar/TopMenu';
import { Footer } from './components/footer/Footer';
import { Login } from './components/login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './components/search/SearchPage';

function App() {
  return (
    <div className="App bg-gray-200 flex flex-col min-h-screen justify-between">
      <BrowserRouter>
        <TopMenu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="login" element={<Login />} />
          <Route path="search" element={<SearchPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
