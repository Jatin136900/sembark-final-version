import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CartPage from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id/details" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
