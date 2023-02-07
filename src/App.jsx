import './App.css';
import ShoppingCart from './components/ShoppingCart';
import TopMenu from './components/TopMenu';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App bg-gray-200 flex flex-col min-h-screen justify-between">
      <TopMenu/>
      <ShoppingCart/>
      <Footer/>
    </div>
  );
}

export default App;
