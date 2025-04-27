import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home-page";
import Productbybrand from "./pages/product-by-brand";
import Productcategory from "./pages/product-by-category";
import Productkeyword from "./pages/product-by-keyword";
import ProductDetails from "./pages/product-details";
import AboutPage from "./pages/about-page";
import RefundPage from "./pages/refund-page";
import HowToBuy from "./pages/how-to-buy";
import ComplainPage from "./pages/complain=page";

import LoginPage from "./pages/Login-page";
import OtpPage from "./pages/otp-page";
import ProfilePage from "./pages/profile-page";
import WishPage from "./skeleton/wish-page";
import CartPage from "./pages/cart-page";
import InvoicePage from "./pages/invoice-page";
import OrderPage from "./pages/order-page";
import PrivacyPage from './pages/privacy-page';
import ContactPage from "./pages/contact-page";












const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/by-brand/:id" element={<Productbybrand />} />
          <Route path="/by-category/:id" element={<Productcategory />} />
          <Route path="/by-brand/:id" element={<Productkeyword />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/refund" element={<RefundPage />} />
          
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<AboutPage />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/complain" element={<ComplainPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/wish" element={<WishPage />}/>
          <Route path="/cart" element={<CartPage />}/>

          <Route path="/orders" element={<OrderPage />}/>

          <Route path="/invoice/:id" element={<InvoicePage/>}/>

          
          

          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
