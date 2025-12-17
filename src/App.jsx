import { useState,useEffect } from "react";
import ProductList from "./components/ProductList";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import Cart from "./components/Cart";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "./api";


const App = () => {

  const [cart, setCart] = useState([]);

  const handleAddToCart = async (product) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.info("Please login to add items to cart");
      return;
    }

    try {
      const body = { productId: product._id || product.id, quantity: 1 };
      const res = await axios.post(`${BASE_URL}/cart`, body, {
        headers: { Authorization: token },
      });
      // backend returns the updated cart items array; update local state for UX
      setCart(res.data);
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

const [products,setProducts] = useState([])
    useEffect(()=>{
        const fetchData = async() => {
            const response = await fetch(`${BASE_URL}/products`)
            const json = await response.json()
            setProducts(json)
        }
        fetchData()
},[])
 

const addProducts = async (pname, url, sprice, oprice, category) => {
  const res = await axios.post(`${BASE_URL}/products`,{
      name: pname,
      image: url,
      sellingprice: Number(sprice),
      originalprice: Number(oprice),
      category: category,
  }) 
  setProducts((prev) => [...prev, res.data])

};

const deleteProduct = async (id)=>{
  await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  setProducts((prev) => prev.filter((p) => p.id !== id));
}

  return (
    <>
      <Routes>
        <Route element={<HomeLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList products={products} onAddToCart={handleAddToCart} deleteProduct={deleteProduct}/>} />
        <Route path="/cart"element={<Cart/>}/> 
        <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />

        <Route path="/admin" element={
            <AdminRoute>
              <Admin addProducts={addProducts}/>
            </AdminRoute>
          } 
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      </Routes>
      <ToastContainer position="top-right" />
    </>
  );
};

export default App;

