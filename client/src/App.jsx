import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/main";
import Bill from "./pages/Bill";
import Cart from "./pages/Cart";



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
         
          <Route path="/bill" element={<Bill />} /> 
          <Route path="/cart" element={<Cart />} /> 
          <Route path="/home" element={<Home />} />
         
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
