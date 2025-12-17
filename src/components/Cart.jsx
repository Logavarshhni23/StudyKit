import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartItems from "./CartItems";
const Cart = () => {
    const [cart,setCart] = useState([])
    const fetchData = async() => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await fetch(`http://localhost:3000/cart`, {
                headers: { Authorization: token }
            })
            if (!response.ok) {
                setCart([]);
                return;
            }
            const json = await response.json()

            const normalized = json.map((it) => {
                const prod = it.product || it;
                return { ...prod, quantity: it.quantity ?? prod.quantity ?? 1 };
            });
            setCart(normalized)
        } catch (err) {
            console.error('failed to fetch cart', err);
            setCart([]);
        }
    }

    useEffect(()=>{
        fetchData();
        window.addEventListener('authChange', fetchData);
        return () => window.removeEventListener('authChange', fetchData);
    },[])

    const total = cart.reduce((sum,item)=> sum + (item.sellingprice * item.quantity), 0)
    const originalTotal = cart.reduce((sum,item)=> sum + (item.originalprice * item.quantity), 0)
    const discount = originalTotal-total;
    const navigate = useNavigate();
    
    const handleCheckout = async () => {
        if (cart.length === 0) {
            toast.info("Your cart is empty");
            return;
        }

        try {
            const token = sessionStorage.getItem("token");
            const res = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: token } : {}),
                },
                body: JSON.stringify({ items: cart, total }),
            });

            if (!res.ok) throw new Error("Checkout failed");
            const data = await res.json();
            // clear local cart for UX
            setCart([]);
            toast.success("Order placed successfully");
            navigate('/orders');
        } catch (err) {
            console.error(err);
            toast.error("Failed to place order");
        }
    };
    
        return (
            <div className="max-w-6xl mx-auto p-6 mt-10 mb-16">
                <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

                {cart.length === 0 ? (
                    <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                        <p className="text-gray-600 text-xl font-medium">Your cart is empty</p>
                        <p className="text-gray-400 mt-2">Browse products and add them to your cart.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Items ({cart.length})</h2>
                                <p className="text-sm text-gray-500">{cart.length} product(s)</p>
                            </div>
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                                {cart.map((item, index) => (
                                    <CartItems key={item.id || item._id || index} index={index} item={item} cart={cart} setCart={setCart} />
                                ))}
                            </div>
                        </div>

                        <aside className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold text-rose-800 mb-4">Order Summary</h3>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">₹{originalTotal}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Discount</span>
                                <span className="text-green-600">-₹{discount}</span>
                            </div>
                            <div className="border-t pt-4 mt-3">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-2xl font-extrabold">₹{total}</span>
                                </div>
                                <button onClick={handleCheckout} className="w-full bg-rose-800 text-white py-3 rounded-md font-semibold hover:bg-rose-700 transition">Proceed to Checkout</button>
                                <button onClick={() => navigate('/products')} className="w-full mt-3 border border-gray-200 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition">Continue Shopping</button>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        );
};

export default Cart;
