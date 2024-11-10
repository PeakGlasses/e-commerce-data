import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import {
    About,
    Home,
    ProductList,
    ProductDetails,
    Cart,
    Contact,
    FAQs,
    Returns,
    Shipping,
    Careers,
    Blog,
    Checkout,
    CheckoutReturn,
} from "./pages";

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route
                            path="/products/:id"
                            element={<ProductDetails />}
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faqs" element={<FAQs />} />
                        <Route path="/returns" element={<Returns />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/return" element={<CheckoutReturn />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
