import { Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductEdit from './pages/ProductEdit';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} /> 
      <Route path="/products" element={<ProductList />} /> 
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/products/:id/edit" element={<ProductEdit />} />
    </Routes>
  );
};

export default App;
