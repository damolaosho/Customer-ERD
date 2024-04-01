import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import CategoriesPage from './pages/Categories';
import CartPage from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import CustomerRatingPage from './pages/Rating';
import Checkout from './pages/Checkout';
import PrivateRoutes from './components/PrivateRoutes';
import ViewAllReviewsPage from './pages/ViewRatings';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/rating" element={<CustomerRatingPage />} />
        </Route>
        <Route path="/view-ratings" element={<ViewAllReviewsPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
